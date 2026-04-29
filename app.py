from fastapi import FastAPI, Request, Form, UploadFile, File, BackgroundTasks
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import uuid
import traceback
import stripe
from dotenv import load_dotenv

from db import (
    init_db,
    save_payment_session,
    mark_payment_paid,
    is_user_paid,
    get_payment_by_session_id,
    save_analysis_result,
    get_latest_analysis_by_user_id,
    get_recent_analysis_records,
    get_recent_payment_records,
    get_basic_stats,
)
from prompts import (
    PROFILE_SYSTEM_PROMPT,
    build_profile_user_prompt,
    PALM_IMAGE_ANALYSIS_PROMPT,
    PALM_IMAGE_QUALITY_CHECK_PROMPT,
    build_palm_report_prompt,
    normalize_lang,
    topic_label,
)
from openai_client import (
    generate_profile_report,
    analyze_palm_image,
    check_palm_image_quality,
)

load_dotenv()

app = FastAPI()

init_db()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
BASE_URL = os.getenv("BASE_URL", "http://127.0.0.1:8000")
PRICE_JPY = int(os.getenv("PRICE_JPY", "200"))
DEBUG_KEY = os.getenv("DEBUG_KEY", "")

stripe.api_key = STRIPE_SECRET_KEY

def parse_quality_check_result(text: str) -> dict:
    result = {}
    lines = text.splitlines()

    for line in lines:
        if ":" in line:
            key, value = line.split(":", 1)
            result[key.strip()] = value.strip()

    return result

def get_palm_quality_error_message(reason_code: str, lang: str) -> str:
    lang = normalize_lang(lang)

    messages = {
        "zh": {
            "not_palm": "上传的图片不是清晰的手掌正面，无法用于手相分析。",
            "too_blurry": "图片过于模糊，掌纹细节不足，暂时无法分析。",
            "too_dark": "图片过暗，细节不清晰，暂时无法分析。",
            "incomplete_palm": "手掌画面不完整，请上传手掌完整展开的照片。",
            "unclear_lines": "掌纹不够清晰，暂时无法进行稳定分析。",
            "other": "图片暂时不适合用于手相分析，请更换更清晰的手掌照片。",
            "ok": "图片适合分析",
        },
        "ja": {
            "not_palm": "アップロードされた画像は、手のひら正面の鮮明な画像として認識できず、手相分析に使用できません。",
            "too_blurry": "画像がぼやけており、手相の線が十分に確認できないため分析できません。",
            "too_dark": "画像が暗すぎて細部が確認できず、分析に適していません。",
            "incomplete_palm": "手のひら全体が写っていません。手のひら全体が開いた写真をアップロードしてください。",
            "unclear_lines": "手相の線が不明瞭なため、安定した分析ができません。",
            "other": "この画像は手相分析に適していません。より鮮明な手のひら写真をお試しください。",
            "ok": "画像は分析に適しています",
        },
        "en": {
            "not_palm": "The uploaded image is not recognized as a clear front-facing palm photo and cannot be used for palm reading.",
            "too_blurry": "The image is too blurry and the palm lines are not clear enough for analysis.",
            "too_dark": "The image is too dark and lacks enough visible detail for analysis.",
            "incomplete_palm": "The palm is not fully visible. Please upload a photo showing the whole palm clearly.",
            "unclear_lines": "The palm lines are not clear enough for a stable reading.",
            "other": "This image is not suitable for palm analysis. Please try a clearer palm photo.",
            "ok": "The image is suitable for analysis",
        }
    }

    return messages.get(lang, messages["zh"]).get(reason_code, messages[lang]["other"])

def check_debug_key(key: str) -> bool:
    return bool(DEBUG_KEY) and key == DEBUG_KEY

def build_preview_report(full_report: str, topic: str, lang: str = "zh") -> str:
    if not full_report:
        return ""

    lang = normalize_lang(lang)
    topic_text = topic_label(topic, lang)

    sections = [s.strip() for s in full_report.split("\n\n") if s.strip()]
    preview_parts = sections[:4] if len(sections) >= 4 else sections
    preview_text = "\n\n".join(preview_parts).strip()

    teaser_map = {
        "zh": f"""

—— 预览内容到此为止 ——

你刚刚看到的，只是这份专属报告的前半部分。

解锁完整版后，你还将继续查看：
• 关于「{topic_text}」更深层的解读
• 未来阶段的变化信号与转折提示
• 你最值得把握的机会窗口
• 当前最需要避开的误区与风险点
• 更具体、更有方向感的行动建议
""",
        "ja": f"""

—— プレビューはここまでです ——

ここまでご覧いただいた内容は、この専属レポートの前半部分です。

完全版を解放すると、さらに以下の内容を確認できます：
• 「{topic_text}」についてのより深い解釈
• これから先の変化のサインと転機のヒント
• 今つかむべきチャンスの流れ
• 今もっとも避けるべき誤解やリスク
• より具体的で方向性のある行動アドバイス
""",
        "en": f"""

—— End of preview ——

What you have just read is only the first half of your personalized report.

Unlock the full report to continue with:
• A deeper reading of your {topic_text}
• Upcoming changes and turning-point signals
• The opportunity window you should seize
• The blind spots and risks you should avoid
• More specific and directional action advice
"""
    }

    return preview_text + teaser_map[lang]

def safe_delete_file(file_path: str):
    try:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
            print(f"已删除临时图片文件: {file_path}")
    except Exception as e:
        print(f"删除图片文件失败: {file_path}, error={e}")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/health")
async def health():
    return {"status": "ok", "message": "fortune app running"}

@app.post("/analyze")
async def analyze(
    background_tasks: BackgroundTasks,
    mode: str = Form(...),
    lang: str = Form("zh"),
    name: str = Form(""),
    gender: str = Form(""),
    birthday: str = Form(""),
    star_sign: str = Form(""),
    topic: str = Form(""),
    palm_gender: str = Form(""),
    age_range: str = Form(""),
    palm_image: UploadFile = File(None)
):
    try:
        user_id = uuid.uuid4().hex
        image_path = ""

        if mode == "palm":
            if palm_image is None:
                return JSONResponse({
                    "success": False,
                    "message": "手相模式必须上传图片"
                }, status_code=400)

            ext = os.path.splitext(palm_image.filename)[1].lower()
            allowed_exts = [".jpg", ".jpeg", ".png", ".webp"]

            if ext not in allowed_exts:
                return JSONResponse({
                    "success": False,
                    "message": "只支持 jpg、jpeg、png、webp 图片"
                }, status_code=400)

            file_name = f"{uuid.uuid4().hex}{ext}"
            image_path = os.path.join(UPLOAD_DIR, file_name)

            with open(image_path, "wb") as f:
                content = await palm_image.read()
                f.write(content)

            quality_raw = check_palm_image_quality(
                image_path=image_path,
                prompt=PALM_IMAGE_QUALITY_CHECK_PROMPT
            )

            quality_data = parse_quality_check_result(quality_raw)

            is_usable = quality_data.get("is_usable", "").lower()
            reason_code = quality_data.get("reason_code", "other").lower()

            if is_usable != "yes":
                localized_reason = get_palm_quality_error_message(reason_code, lang)

                background_tasks.add_task(safe_delete_file, image_path)   # 这里先删文件

                return JSONResponse({
                    "success": False,
                    "message": localized_reason
                }, status_code=400)

            palm_features = analyze_palm_image(
                image_path=image_path,
                prompt=PALM_IMAGE_ANALYSIS_PROMPT
            )

            palm_report_prompt = build_palm_report_prompt(
                palm_features=palm_features,
                gender=palm_gender,
                age_range=age_range,
                topic=topic,
                lang=lang
            )

            full_report = generate_profile_report(
                PROFILE_SYSTEM_PROMPT,
                palm_report_prompt
            )

            if not full_report:
                background_tasks.add_task(safe_delete_file, image_path)   # 这里先删文件
                return JSONResponse({
                    "success": False,
                    "message": "手相分析结果为空"
                }, status_code=500)

            demo_free_report = build_preview_report(full_report, topic, lang)
            demo_paid_report = full_report

            background_tasks.add_task(safe_delete_file, image_path)
        else:
            user_prompt = build_profile_user_prompt(
                name=name,
                gender=gender,
                birthday=birthday,
                star_sign=star_sign,
                topic=topic,
                lang=lang
            )

            full_report = generate_profile_report(
                PROFILE_SYSTEM_PROMPT,
                user_prompt
            )

            if not full_report:
                return JSONResponse({
                    "success": False,
                    "message": "模型返回内容为空"
                }, status_code=500)

            demo_free_report = build_preview_report(full_report, topic, lang)
            demo_paid_report = full_report

        save_analysis_result(
            user_id=user_id,
            mode=mode,
            name=name,
            gender=gender if mode == "profile" else palm_gender,
            birthday=birthday,
            star_sign=star_sign,
            topic=topic,
            image_path=image_path,
            free_report=demo_free_report,
            paid_report=demo_paid_report,
        )

        return JSONResponse({
            "success": True,
            "free_report": demo_free_report,
            "paid_report": demo_paid_report,
            "is_paid": False,
            "image_path": image_path,
            "user_id": user_id
        })

    except Exception as e:
        print("====== /analyze 接口报错 ======")
        traceback.print_exc()
        print("====== 报错结束 ======")

        background_tasks.add_task(safe_delete_file, image_path)
        return JSONResponse({
            "success": False,
            "message": f"后端异常：{str(e)}"
        }, status_code=500)

@app.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()
        user_id = data.get("user_id", "")
        lang = data.get("lang", "zh")

        if not user_id:
            return JSONResponse({
                "success": False,
                "message": "缺少 user_id"
            }, status_code=400)

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "jpy",
                    "product_data": {
                        "name": "AI Fortune Full Report"
                    },
                    "unit_amount": PRICE_JPY,
                },
                "quantity": 1,
            }],
            success_url=f"{BASE_URL}/?paid=true&session_id={{CHECKOUT_SESSION_ID}}&user_id={user_id}&lang={lang}",
            cancel_url=f"{BASE_URL}/?canceled=true&lang={lang}",
            metadata={
                "user_id": user_id,
                "lang": lang
            }
        )

        save_payment_session(user_id, session.id)

        return JSONResponse({
            "success": True,
            "checkout_url": session.url
        })

    except Exception as e:
        return JSONResponse({
            "success": False,
            "message": f"创建支付会话失败：{str(e)}"
        }, status_code=500)

@app.get("/payment-status")
async def payment_status(user_id: str):
    try:
        paid = is_user_paid(user_id)
        return {
            "success": True,
            "is_paid": paid
        }
    except Exception as e:
        return JSONResponse({
            "success": False,
            "message": f"查询支付状态失败：{str(e)}"
        }, status_code=500)

@app.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=sig_header,
            secret=STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return JSONResponse({
            "success": False,
            "message": f"无效 payload: {str(e)}"
        }, status_code=400)
    except stripe.error.SignatureVerificationError as e:
        return JSONResponse({
            "success": False,
            "message": f"签名校验失败: {str(e)}"
        }, status_code=400)

    event_type = event["type"]

    try:
        if event_type == "checkout.session.completed":
            session = event["data"]["object"]

            session_id = getattr(session, "id", "")
            metadata = getattr(session, "metadata", None)

            if metadata:
                user_id = metadata["user_id"] if "user_id" in metadata else ""
            else:
                user_id = ""

            print("收到 checkout.session.completed")
            print("session_id =", session_id)
            print("user_id =", user_id)

            if session_id:
                existing = get_payment_by_session_id(session_id)

                if existing:
                    mark_payment_paid(session_id)
                else:
                    from db import get_conn
                    conn = get_conn()
                    cur = conn.cursor()
                    cur.execute("""
                        INSERT INTO payment_logs (user_id, session_id, paid)
                        VALUES (?, ?, 1)
                    """, (user_id, session_id))
                    conn.commit()
                    conn.close()

        return {"success": True}

    except Exception as e:
        print("====== webhook 处理报错 ======")
        traceback.print_exc()
        print("====== webhook 报错结束 ======")
        return JSONResponse({
            "success": False,
            "message": f"webhook处理失败：{str(e)}"
        }, status_code=500)

@app.get("/analysis-result")
async def analysis_result(user_id: str):
    try:
        row = get_latest_analysis_by_user_id(user_id)

        if not row:
            return JSONResponse({
                "success": False,
                "message": "没有找到对应分析结果"
            }, status_code=404)

        return {
            "success": True,
            "user_id": row["user_id"],
            "mode": row["mode"] or "",
            "name": row["name"] or "",
            "gender": row["gender"] or "",
            "birthday": row["birthday"] or "",
            "star_sign": row["star_sign"] or "",
            "topic": row["topic"] or "",
            "image_path": row["image_path"] or "",
            "free_report": row["free_report"] or "",
            "paid_report": row["paid_report"] or "",
        }
    except Exception as e:
        return JSONResponse({
            "success": False,
            "message": f"读取分析结果失败：{str(e)}"
        }, status_code=500)

@app.get("/debug/mock-pay")
async def debug_mock_pay(user_id: str, key: str):
    if not check_debug_key(key):
        return JSONResponse({
            "success": False,
            "message": "forbidden"
        }, status_code=403)
    try:
        conn = None
        # 找到该 user 最近的一条未支付记录并标记支付
        # 简单起见，这里直接插一条 paid 记录也可以
        from db import get_conn
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO payment_logs (user_id, session_id, paid)
            VALUES (?, ?, 1)
        """, (user_id, f"mock_{uuid.uuid4().hex}"))
        conn.commit()
        conn.close()

        return {"success": True, "message": "mock paid done"}
    except Exception as e:
        return JSONResponse({
            "success": False,
            "message": str(e)
        }, status_code=500)

@app.get("/debug/analysis-records")
async def debug_analysis_records(key: str, limit: int = 20):
    if not check_debug_key(key):
        return JSONResponse({
            "success": False,
            "message": "forbidden"
        }, status_code=403)

    rows = get_recent_analysis_records(limit=limit)

    data = []
    for row in rows:
        data.append({
            "id": row["id"],
            "user_id": row["user_id"],
            "mode": row["mode"],
            "name": row["name"],
            "gender": row["gender"],
            "birthday": row["birthday"],
            "star_sign": row["star_sign"],
            "topic": row["topic"],
            "image_path": row["image_path"],
            "is_paid": row["is_paid"],
            "created_at": row["created_at"],
        })

    return {
        "success": True,
        "count": len(data),
        "records": data
    }

@app.get("/debug/payment-records")
async def debug_payment_records(key: str, limit: int = 20):
    if not check_debug_key(key):
        return JSONResponse({
            "success": False,
            "message": "forbidden"
        }, status_code=403)

    rows = get_recent_payment_records(limit=limit)

    data = []
    for row in rows:
        data.append({
            "id": row["id"],
            "user_id": row["user_id"],
            "session_id": row["session_id"],
            "paid": row["paid"],
            "created_at": row["created_at"],
        })

    return {
        "success": True,
        "count": len(data),
        "records": data
    }

@app.get("/debug/stats")
async def debug_stats(key: str):
    if not check_debug_key(key):
        return JSONResponse({
            "success": False,
            "message": "forbidden"
        }, status_code=403)

    stats = get_basic_stats()

    return {
        "success": True,
        "stats": stats
    }