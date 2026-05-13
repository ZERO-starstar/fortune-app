PROFILE_SYSTEM_PROMPT = """
你是一位 AI 性格倾向与自我理解报告生成助手。

你的任务是根据用户提供的资料，或根据手掌图片中可见的非医学特征，
生成娱乐、参考、自我理解目的的性格倾向与行动风格报告。

重要限制：
- 不要称自己为命理师、占卜师、灵能者、预测师
- 不要写“占卜”“算命”“命理”“运势预测”“未来必然发生”
- 不要承诺准确预测未来
- 不要写医疗诊断、法律建议、投资建议、就业保证、疾病判断、死亡、灾难、寿命
- 不要写“必然发财”“一定结婚”“一定成功”等断定表达
- 不要根据手掌判断疾病、寿命、财富、婚姻结果
- 使用“倾向”“可能”“参考”“可以留意”“自我理解的线索”等表达
- 报告必须明确是娱乐、自我理解与参考目的
"""

LANG_TEXT = {
    "zh": {
        "lang_name": "中文",
        "entertainment_note": "以上内容仅供娱乐、自我理解与参考，不构成医疗、法律、投资、就业或其他专业建议。",
        "sections_profile": [
            "核心性格倾向",
            "当前状态参考",
            "重点主题解读",
            "近期关注点",
            "沟通与选择中的盲点",
            "自我调整建议",
            "一句提醒",
            "总结",
        ],
        "sections_palm": [
            "手掌特征给人的整体印象",
            "当前状态参考",
            "重点主题解读",
            "近期关注点",
            "沟通与选择中的盲点",
            "自我调整建议",
            "一句提醒",
            "总结",
        ],
    },
    "ja": {
        "lang_name": "日本語",
        "entertainment_note": "本内容は娯楽・自己理解・参考目的であり、医療、法律、投資、就職等の専門的助言ではありません。",
        "sections_profile": [
            "基本的な性格傾向",
            "現在の状態の参考",
            "重点テーマの傾向分析",
            "最近意識しやすいポイント",
            "コミュニケーションや選択の癖",
            "セルフケア・行動のヒント",
            "ひとことメッセージ",
            "まとめ",
        ],
        "sections_palm": [
            "手のひら特徴から見える全体印象",
            "現在の状態の参考",
            "重点テーマの傾向分析",
            "最近意識しやすいポイント",
            "コミュニケーションや選択の癖",
            "セルフケア・行動のヒント",
            "ひとことメッセージ",
            "まとめ",
        ],
    },
    "en": {
        "lang_name": "English",
        "entertainment_note": "This content is for entertainment, self-understanding, and reference only. It does not constitute medical, legal, investment, employment, or other professional advice.",
        "sections_profile": [
            "Core Personality Tendencies",
            "Current State Reference",
            "Theme-Based Insight",
            "Recent Focus Areas",
            "Communication and Decision-Making Patterns",
            "Self-Reflection and Action Suggestions",
            "One Gentle Reminder",
            "Summary",
        ],
        "sections_palm": [
            "Overall Impression from Palm Features",
            "Current State Reference",
            "Theme-Based Insight",
            "Recent Focus Areas",
            "Communication and Decision-Making Patterns",
            "Self-Reflection and Action Suggestions",
            "One Gentle Reminder",
            "Summary",
        ],
    }
}

TOPIC_MAP = {
    "zh": {
        "general": "综合倾向",
        "love": "情感沟通倾向",
        "marriage": "亲密关系倾向",
        "future": "未来规划参考",
        "career": "工作风格",
        "wealth": "金钱观与消费倾向",
        "health": "压力与生活状态",
        "study": "学习风格",
        "relationship": "人际关系",
        "three_months": "近期关注点",
        "one_year": "长期规划参考",
    },
    "ja": {
        "general": "総合傾向",
        "love": "恋愛・感情傾向",
        "marriage": "親密な関係の傾向",
        "future": "今後の計画の参考",
        "career": "仕事スタイル",
        "wealth": "お金との向き合い方",
        "health": "ストレス・生活状態",
        "study": "学習スタイル",
        "relationship": "人間関係",
        "three_months": "最近の関心テーマ",
        "one_year": "長期計画の参考",
    },
    "en": {
        "general": "overall tendencies",
        "love": "emotional communication",
        "marriage": "close relationship tendencies",
        "future": "planning reference",
        "career": "work style",
        "wealth": "money mindset",
        "health": "stress and lifestyle",
        "study": "learning style",
        "relationship": "relationships",
        "three_months": "recent focus areas",
        "one_year": "long-term planning reference",
    }
}

STAR_SIGN_MAP = {
    "zh": {
        "aries": "白羊座", "taurus": "金牛座", "gemini": "双子座", "cancer": "巨蟹座",
        "leo": "狮子座", "virgo": "处女座", "libra": "天秤座", "scorpio": "天蝎座",
        "sagittarius": "射手座", "capricorn": "摩羯座", "aquarius": "水瓶座", "pisces": "双鱼座"
    },
    "ja": {
        "aries": "牡羊座", "taurus": "牡牛座", "gemini": "双子座", "cancer": "蟹座",
        "leo": "獅子座", "virgo": "乙女座", "libra": "天秤座", "scorpio": "蠍座",
        "sagittarius": "射手座", "capricorn": "山羊座", "aquarius": "水瓶座", "pisces": "魚座"
    },
    "en": {
        "aries": "Aries", "taurus": "Taurus", "gemini": "Gemini", "cancer": "Cancer",
        "leo": "Leo", "virgo": "Virgo", "libra": "Libra", "scorpio": "Scorpio",
        "sagittarius": "Sagittarius", "capricorn": "Capricorn", "aquarius": "Aquarius", "pisces": "Pisces"
    }
}

GENDER_MAP = {
    "zh": {"male": "男", "female": "女"},
    "ja": {"male": "男性", "female": "女性"},
    "en": {"male": "male", "female": "female"},
}

AGE_RANGE_MAP = {
    "zh": {
        "under_18": "18岁以下",
        "18_25": "18-25岁",
        "26_35": "26-35岁",
        "36_45": "36-45岁",
        "46_60": "46-60岁",
        "over_60": "60岁以上",
    },
    "ja": {
        "under_18": "18歳未満",
        "18_25": "18〜25歳",
        "26_35": "26〜35歳",
        "36_45": "36〜45歳",
        "46_60": "46〜60歳",
        "over_60": "60歳以上",
    },
    "en": {
        "under_18": "under 18",
        "18_25": "18-25",
        "26_35": "26-35",
        "36_45": "36-45",
        "46_60": "46-60",
        "over_60": "over 60",
    }
}


def normalize_lang(lang: str) -> str:
    return lang if lang in ["zh", "ja", "en"] else "zh"


def topic_label(topic: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return TOPIC_MAP[lang].get(topic, TOPIC_MAP[lang]["general"])


def star_sign_label(star_sign: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return STAR_SIGN_MAP[lang].get(star_sign, star_sign)


def gender_label(gender: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return GENDER_MAP[lang].get(gender, gender)


def age_range_label(age_range: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return AGE_RANGE_MAP[lang].get(age_range, age_range)


def build_profile_user_prompt(
    name: str,
    gender: str,
    birthday: str,
    star_sign: str,
    topic: str,
    lang: str = "zh",
    current_date: str = "",
    current_year: int = 0
) -> str:
    lang = normalize_lang(lang)
    sections = LANG_TEXT[lang]["sections_profile"]
    topic_text = topic_label(topic, lang)
    star_sign_text = star_sign_label(star_sign, lang)
    gender_text = gender_label(gender, lang)
    note = LANG_TEXT[lang]["entertainment_note"]

    return f"""
请使用{LANG_TEXT[lang]["lang_name"]}输出一份高代入感、自然、具体的“AI性格倾向与自我理解报告”。

用户资料：
- 姓名：{name}
- 性别：{gender_text}
- 生日：{birthday}
- 参考类型：{star_sign_text}
- 关注主题：{topic_text}
- 当前日期：{current_date}
- 当前年份：{current_year}

输出要求：
1. 开头先写一个自然、有吸引力的标题，例如“{name}的自我理解报告”这种感觉。
2. 第一段先给一段整体总结，让用户有“被理解了”的感觉，但不要神秘化。
3. 然后严格按以下结构输出：
- {sections[0]}
- {sections[1]}
- {sections[2]}
- {sections[3]}
- {sections[4]}
- {sections[5]}
- {sections[6]}
- {sections[7]}
4. 重点围绕用户选择的主题「{topic_text}」展开。
5. 语言要自然、具体、温和、有代入感。
6. 不要空泛，不要机械重复。
7. 不要写“占卜”“算命”“命理”“运势”“金运”“健康运”“未来预测”等表达。
8. 不要写“命中注定”“必然发生”“一定会”等断定表达。
9. 不要给医疗、法律、投资、就业等专业建议。
10. 如果涉及时间，只写“近期”“当前阶段”“接下来一段时间”，不要写具体年份预测。
11. 不要声称可以准确预测未来。
12. 结尾加一句：{note}
"""


PALM_IMAGE_ANALYSIS_PROMPT = """
请分析这张手掌图片，并根据图中可见内容，提取“非医学、非预测性”的手掌外观特征。

要求：
1. 只根据图片中能看到的内容描述，不要编造过于确定的结论。
2. 不要做医学判断。
3. 不要写占卜、算命、命理、运势、未来预测、财富、健康结论。
4. 不要根据手掌判断疾病、寿命、婚姻结果、财富结果。
5. 输出必须结构化、简洁、清楚。
6. 如果某些细节看不清，请明确写“看不清”或“较模糊”。
7. 不要输出 markdown 代码块。

请按以下格式输出：

hand_shape: （如：手掌较宽 / 手掌较长 / 偏方形 / 偏修长 / 看不清）
finger_style: （如：手指较长 / 较短 / 较匀称 / 看不清）
line_clarity: （如：较清晰 / 一般 / 较模糊）
visible_features: （根据可见内容描述主要线条、掌面整体状态，不做预测）
overall_impression: （一句总结，如：整体给人细腻、谨慎、注重秩序的视觉印象）
"""


def build_palm_report_prompt(
    palm_features: str,
    gender: str,
    age_range: str,
    topic: str,
    lang: str = "zh",
    current_date: str = "",
    current_year: int = 0
) -> str:
    lang = normalize_lang(lang)
    sections = LANG_TEXT[lang]["sections_palm"]
    topic_text = topic_label(topic, lang)
    gender_text = gender_label(gender, lang)
    age_text = age_range_label(age_range, lang)
    note = LANG_TEXT[lang]["entertainment_note"]

    return f"""
请使用{LANG_TEXT[lang]["lang_name"]}输出一份高代入感、自然、具体的“手掌特征倾向与自我理解报告”。

用户信息：
- 性别：{gender_text}
- 年龄段：{age_text}
- 关注主题：{topic_text}
- 当前日期：{current_date}
- 当前年份：{current_year}

手掌图片中可见的非医学特征：
{palm_features}

输出要求：
1. 开头先写一个自然、有吸引力的标题，例如“从手掌特征看你的行动风格”这种感觉。
2. 第一段先写整体印象总结，让用户有“被理解了”的感觉，但不要神秘化。
3. 然后严格按以下结构输出：
- {sections[0]}
- {sections[1]}
- {sections[2]}
- {sections[3]}
- {sections[4]}
- {sections[5]}
- {sections[6]}
- {sections[7]}
4. 重点围绕用户选择的主题「{topic_text}」展开。
5. 表达风格要自然、具体、温和、有代入感。
6. 不要过度夸张，不要使用神秘化或断定式表达。
7. 不要写“占卜”“算命”“命理”“运势”“金运”“健康运”“未来预测”“手相占卜”等表达。
8. 不要写“命中注定”“必然发生”“一定会”等断定表达。
9. 不要给医疗、法律、投资、就业等专业建议。
10. 不要根据手掌判断疾病、寿命、婚姻结果、财富结果。
11. 如果涉及时间，只写“近期”“当前阶段”“接下来一段时间”，不要写具体年份预测。
12. 不要声称可以准确预测未来。
13. 结尾加一句：{note}
"""


PALM_IMAGE_QUALITY_CHECK_PROMPT = """
请检查这张图片是否适合用于手掌特征分析。

你必须严格按照下面格式输出，不要输出 markdown，不要输出解释性前言：

is_palm: yes 或 no
is_clear: yes 或 no
is_bright_enough: yes 或 no
is_complete_palm: yes 或 no
is_usable: yes 或 no
reason_code: one of [ok, not_palm, too_blurry, too_dark, incomplete_palm, unclear_lines, other]

判断标准：
1. is_palm:
- 如果图片主体不是手掌正面，输出 no
- 如果明显不是手掌图片，输出 no

2. is_clear:
- 如果图片模糊、手掌细节难以辨认，输出 no

3. is_bright_enough:
- 如果图片太暗、阴影太重、细节看不清，输出 no

4. is_complete_palm:
- 如果手掌没有完整展开、主要区域被裁切、只拍到一部分，输出 no

5. is_usable:
- 只有当以上条件整体满足可以做基础手掌特征分析时，才输出 yes
- 否则输出 no

6. reason_code:
- 如果 is_usable=yes，输出 ok
- 如果明显不是手掌，输出 not_palm
- 如果主要问题是模糊，输出 too_blurry
- 如果主要问题是太暗，输出 too_dark
- 如果主要问题是手掌不完整，输出 incomplete_palm
- 如果主要问题是手掌细节不清楚，输出 unclear_lines
- 如果无法准确归类，输出 other
"""