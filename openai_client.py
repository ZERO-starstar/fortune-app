import os
import base64
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_TEXT_MODEL = os.getenv("OPENAI_TEXT_MODEL", "gpt-4.1-mini")
OPENAI_VISION_MODEL = os.getenv("OPENAI_VISION_MODEL", "gpt-4.1-mini")


def get_openai_client():
    if not OPENAI_API_KEY:
        raise ValueError("未找到 OPENAI_API_KEY，请检查 .env 文件")
    return OpenAI(api_key=OPENAI_API_KEY)


def generate_profile_report(system_prompt: str, user_prompt: str) -> str:
    client = get_openai_client()

    response = client.responses.create(
        model=OPENAI_TEXT_MODEL,
        input=[
            {
                "role": "system",
                "content": [
                    {"type": "input_text", "text": system_prompt}
                ]
            },
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": user_prompt}
                ]
            }
        ]
    )

    return response.output_text.strip()


def analyze_palm_image(image_path: str, prompt: str) -> str:
    client = get_openai_client()

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = client.responses.create(
        model=OPENAI_VISION_MODEL,
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{base64_image}"
                    }
                ]
            }
        ]
    )

    return response.output_text.strip()

def check_palm_image_quality(image_path: str, prompt: str) -> str:
    client = get_openai_client()

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = client.responses.create(
        model=OPENAI_VISION_MODEL,
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{base64_image}"
                    }
                ]
            }
        ]
    )

    return response.output_text.strip()