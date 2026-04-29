PROFILE_SYSTEM_PROMPT = """
你是一位高级AI命理分析师与占卜文案专家。

你的表达风格需要融合：
1. 中国传统命理语言（生肖、五行、运势阶段、贵人与阻碍）
2. 日本占卜式表达（细腻、克制、富有观察感）
3. 欧美占星式表达（强调人生阶段、关系、选择与成长）

输出要求：
- 强代入感、强画面感、强产品感
- 语言要优雅、有神秘感、有被理解的感觉
- 不要空泛，不要机械重复
- 不要使用医疗诊断、死亡预测、灾难、寿命等内容
- 不要承诺一定发财、一定结婚、一定成功
- 允许适度“惊艳感”，但不要浮夸到离谱
"""

LANG_TEXT = {
    "zh": {
        "lang_name": "中文",
        "entertainment_note": "仅供娱乐参考",
        "sections_profile": [
            "命运主轴",
            "当前状态",
            "重点方向解析",
            "未来3个月趋势",
            "你最该把握的机会",
            "你最需要避开的误区",
            "行动建议",
            "一句点醒你的总结",
        ],
        "sections_palm": [
            "手相整体气质",
            "当前状态",
            "重点方向解析",
            "未来3个月趋势",
            "你最该把握的机会",
            "你最需要避开的误区",
            "行动建议",
            "一句点醒你的总结",
        ],
    },
    "ja": {
        "lang_name": "日本語",
        "entertainment_note": "本内容は娯楽・参考目的です",
        "sections_profile": [
            "運命の軸",
            "現在の状態",
            "重点テーマの解釈",
            "今後3か月の流れ",
            "今いちばん掴むべきチャンス",
            "今いちばん避けるべき落とし穴",
            "行動アドバイス",
            "最後にあなたへ一言",
        ],
        "sections_palm": [
            "手相全体の印象",
            "現在の状態",
            "重点テーマの解釈",
            "今後3か月の流れ",
            "今いちばん掴むべきチャンス",
            "今いちばん避けるべき落とし穴",
            "行動アドバイス",
            "最後にあなたへ一言",
        ],
    },
    "en": {
        "lang_name": "English",
        "entertainment_note": "For entertainment purposes only",
        "sections_profile": [
            "Your core destiny pattern",
            "Your current state",
            "Deep reading of your focus area",
            "Your next 3 months",
            "The opportunity you should seize now",
            "The pitfall you should avoid now",
            "Action guidance",
            "One final line meant for you",
        ],
        "sections_palm": [
            "Overall palm impression",
            "Your current state",
            "Deep reading of your focus area",
            "Your next 3 months",
            "The opportunity you should seize now",
            "The pitfall you should avoid now",
            "Action guidance",
            "One final line meant for you",
        ],
    }
}

TOPIC_MAP = {
    "zh": {
        "general": "综合运势",
        "love": "感情",
        "marriage": "婚姻",
        "future": "前程",
        "career": "事业",
        "wealth": "金运",
        "health": "健康",
        "study": "学业",
        "relationship": "人际关系",
        "three_months": "未来3个月",
        "one_year": "未来1年",
    },
    "ja": {
        "general": "総合運勢",
        "love": "恋愛",
        "marriage": "結婚",
        "future": "将来運",
        "career": "仕事運",
        "wealth": "金運",
        "health": "健康運",
        "study": "学業運",
        "relationship": "人間関係",
        "three_months": "今後3か月",
        "one_year": "今後1年",
    },
    "en": {
        "general": "overall fortune",
        "love": "love",
        "marriage": "marriage",
        "future": "future path",
        "career": "career",
        "wealth": "wealth",
        "health": "health",
        "study": "study",
        "relationship": "relationships",
        "three_months": "the next 3 months",
        "one_year": "the next 1 year",
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
    return TOPIC_MAP[lang].get(topic, topic)

def star_sign_label(star_sign: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return STAR_SIGN_MAP[lang].get(star_sign, star_sign)

def gender_label(gender: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return GENDER_MAP[lang].get(gender, gender)

def age_range_label(age_range: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return AGE_RANGE_MAP[lang].get(age_range, age_range)

def build_profile_user_prompt(name: str, gender: str, birthday: str, star_sign: str, topic: str, lang: str = "zh") -> str:
    lang = normalize_lang(lang)
    sections = LANG_TEXT[lang]["sections_profile"]
    topic_text = topic_label(topic, lang)
    star_sign_text = star_sign_label(star_sign, lang)
    gender_text = gender_label(gender, lang)
    note = LANG_TEXT[lang]["entertainment_note"]

    return f"""
请使用{LANG_TEXT[lang]["lang_name"]}输出一份高代入感、高吸引力、像“专属命运报告”一样的命理分析。

用户资料：
- 姓名：{name}
- 性别：{gender_text}
- 生日：{birthday}
- 星座：{star_sign_text}
- 重点方向：{topic_text}

输出要求：
1. 开头先写一个有吸引力的标题，像“{name}的专属命运解读”这种感觉
2. 第一段先给一段整体总结，要让用户有“被看懂了”的感觉
3. 然后严格按以下结构输出：
- {sections[0]}
- {sections[1]}
- {sections[2]}
- {sections[3]}
- {sections[4]}
- {sections[5]}
- {sections[6]}
- {sections[7]}
4. 语言要优雅、自然、具体、带画面感
5. 不要空泛，不要机械重复
6. 结尾加一句：{note}
"""

PALM_IMAGE_ANALYSIS_PROMPT = """
请分析这张手掌图片，并根据图中可见内容，提取手相相关特征。

要求：
1. 只根据图片中能看到的内容判断，不要编造过于确定的结论
2. 输出必须尽量结构化、简洁、清楚
3. 如果某条线看不清，请明确写“看不清”或“较模糊”
4. 不要直接输出完整算命报告
5. 不要输出 markdown 代码块

请按以下格式输出：

hand_type: （如：手掌较宽 / 手掌较长 / 偏方形 / 偏修长）
line_clarity: （如：较清晰 / 一般 / 较模糊）
life_line: （如：较长较清晰 / 偏浅 / 断续 / 看不清）
heart_line: （如：较长 / 较深 / 偏浅 / 看不清）
head_line: （如：较直 / 略向下弯 / 较浅 / 看不清）
fate_line: （如：较明显 / 较弱 / 断续 / 看不清）
money_line: （如：有轻微迹象 / 不明显 / 多条细线 / 看不清）
overall_impression: （一句总结，如：整体线条偏细，属于细腻谨慎型手相）
"""

def build_palm_report_prompt(palm_features: str, gender: str, age_range: str, topic: str, lang: str = "zh") -> str:
    lang = normalize_lang(lang)
    sections = LANG_TEXT[lang]["sections_palm"]
    topic_text = topic_label(topic, lang)
    gender_text = gender_label(gender, lang)
    age_text = age_range_label(age_range, lang)
    note = LANG_TEXT[lang]["entertainment_note"]

    return f"""
请使用{LANG_TEXT[lang]["lang_name"]}输出一份高代入感、高吸引力、像“专属手相深度报告”一样的分析结果。

用户信息：
- 性别：{gender_text}
- 年龄段：{age_text}
- 重点方向：{topic_text}

手相观察结果：
{palm_features}

输出要求：
1. 开头先写一个有吸引力的标题，像“你的手相正在透露什么”这种感觉
2. 第一段先写整体印象总结，让用户有“被看懂了”的感觉
3. 然后严格按以下结构输出：
- {sections[0]}
- {sections[1]}
- {sections[2]}
- {sections[3]}
- {sections[4]}
- {sections[5]}
- {sections[6]}
- {sections[7]}
4. 表达风格融合中式运势语言、日本手相占卜表达、欧美占星式心理解读
5. 语言要具体、优雅、有画面感，但不要过度夸张
6. 不要写医疗诊断、死亡预测、灾难
7. 结尾加一句：{note}
"""

PALM_IMAGE_QUALITY_CHECK_PROMPT = """
请检查这张图片是否适合用于手相分析。

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
- 如果图片模糊、掌纹难以辨认，输出 no

3. is_bright_enough:
- 如果图片太暗、阴影太重、细节看不清，输出 no

4. is_complete_palm:
- 如果手掌没有完整展开、主要区域被裁切、只拍到一部分，输出 no

5. is_usable:
- 只有当以上条件整体满足可以做基础手相分析时，才输出 yes
- 否则输出 no

6. reason_code:
- 如果 is_usable=yes，输出 ok
- 如果明显不是手掌，输出 not_palm
- 如果主要问题是模糊，输出 too_blurry
- 如果主要问题是太暗，输出 too_dark
- 如果主要问题是手掌不完整，输出 incomplete_palm
- 如果主要问题是掌纹不清楚，输出 unclear_lines
- 如果无法准确归类，输出 other
"""