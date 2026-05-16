document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("analyzeForm");
    const modeSelect = document.getElementById("modeSelect");

    const profileFields = document.getElementById("profileFields");
    const palmFields = document.getElementById("palmFields");

    const loading = document.getElementById("loading");
    const result = document.getElementById("result");
    const freeReport = document.getElementById("freeReport");
    const paidReport = document.getElementById("paidReport");
    const loadingText = document.getElementById("loadingText");
    const messageBox = document.getElementById("messageBox");
    const paidBadge = document.getElementById("paidBadge");

    const lockedBox = document.getElementById("lockedBox");
    const paidContent = document.getElementById("paidContent");
    const unlockBtn = document.getElementById("unlockBtn");

    const palmImageInput = document.getElementById("palmImage");
    const chooseFileBtn = document.getElementById("chooseFileBtn");
    const fileNameText = document.getElementById("fileNameText");
    const langSelect = document.getElementById("langSelect");

    const STORAGE_KEYS = {
        freeReport: "fortune_free_report",
        paidReport: "fortune_paid_report",
        userId: "fortune_user_id",
        isPaid: "fortune_is_paid",
    
        mode: "fortune_mode",
        name: "fortune_name",
        gender: "fortune_gender",
        birthday: "fortune_birthday",
        starSign: "fortune_star_sign",
        topic: "fortune_topic",
        palmGender: "fortune_palm_gender",
        ageRange: "fortune_age_range",
    
        restorePending: "fortune_restore_pending"
    };
    const I18N = {
        zh: {
            pageTitle: "AI性格倾向 / 自我理解报告",
            pageSubtitle: "上传手掌照片，或输入个人资料，生成娱乐参考用的性格倾向与行动风格报告",
            langLabel: "语言",
            labelMode: "分析方式",
            modeProfileOption: "资料性格倾向分析",
            modePalmOption: "手掌特征倾向分析",
            labelName: "姓名",
            labelGender: "性别",
            labelBirthday: "生日",
            labelStarSign: "参考类型",
            labelPalmUpload: "上传手掌图片",
            labelPalmGender: "性别",
            labelAgeRange: "年龄段",
            palmTip: "请上传清晰的手掌正面照片。本功能会根据可见手掌特征生成娱乐参考用的性格倾向报告。",
            chooseFileBtn: "选择手掌图片",
            fileNameEmpty: "未选择图片",
            fileNameRecovered: "未重新选择图片（已恢复上次分析结果）",
            labelTopic: "想了解的方向",
            submitBtn: "生成报告",
            freeResultTitle: "免费预览",
            resultGuide: "先看看这份预览内容，若你觉得有参考价值，再决定是否解锁完整报告。",
            previewBadge: "预览版",
            paidBadge: "完整版",
            paidResultTitle: "完整报告",
            lockedTitle: "🔒 完整版自我理解报告已锁定",
            lockedIntro: "解锁后你将继续查看：",
            lockedItem1: "更深入的性格倾向与行动风格解读",
            lockedItem2: "你当前更值得关注的思考模式",
            lockedItem3: "近期状态变化的参考线索",
            lockedItem4: "容易忽略的沟通与决策盲点",
            lockedItem5: "更具体的自我调整建议",
            unlockPriceNote: "仅需 ¥200 解锁完整报告",
            unlockBtn: "解锁完整报告",
            unlockSoftNote: "先看预览，再决定是否解锁。",
            heroPoint1: "✨ 先看免费预览，再决定是否解锁完整报告",
            heroPoint2: "🧭 支持资料分析 / 手掌特征分析双模式",
            heroPoint3: "🌏 支持中文、日本語、English",
            previewHint: "你正在查看的是整理后的预览内容",
            lockedSubtitle: "你看到的只是前半部分。后面的内容会更具体，更适合作为自我理解和行动参考。",
            unlockTrustNote: "一次解锁，立即查看完整内容",
            footerNote1: "本工具生成的内容仅供娱乐、自我理解与参考，不构成医疗、法律、投资、就业或其他专业建议。",
            footerNote2: "用户上传的图片与输入信息仅用于当前分析流程，不用于其他用途。",
            optionSelectGender: "请选择",
            optionMale: "男",
            optionFemale: "女",
            optionSelectStar: "请选择参考类型",
            starAries: "白羊座",
            starTaurus: "金牛座",
            starGemini: "双子座",
            starCancer: "巨蟹座",
            starLeo: "狮子座",
            starVirgo: "处女座",
            starLibra: "天秤座",
            starScorpio: "天蝎座",
            starSagittarius: "射手座",
            starCapricorn: "摩羯座",
            starAquarius: "水瓶座",
            starPisces: "双鱼座",
            optionPalmSelectGender: "请选择",
            optionPalmMale: "男",
            optionPalmFemale: "女",
            optionAgeSelect: "请选择",
            topicGeneral: "综合倾向",
            topicLove: "情感沟通倾向",
            topicMarriage: "亲密关系倾向",
            topicFuture: "未来规划参考",
            topicCareer: "工作风格",
            topicWealth: "金钱观与消费倾向",
            topicHealth: "压力与生活状态",
            topicStudy: "学习风格",
            topicRelationship: "人际关系",
            topicThreeMonths: "近期关注点",
            topicOneYear: "长期规划参考",
            loadingPalm: "正在检查图片质量，并生成你的手掌特征倾向报告，请稍候...",
            loadingProfile: "正在生成你的自我理解报告，请稍候...",
            msgPalmReady: "手掌特征报告已完成。",
            msgProfileReady: "自我理解报告已完成。",
            msgPaidRestored: "支付成功，完整报告已解锁。",
            msgCanceled: "你已取消支付，当前仍可查看预览内容。",
            msgCreateCheckoutFail: "创建支付失败：",
            msgAnalyzeFail: "分析失败：",
            msgNeedAnalyzeFirst: "缺少用户标识，请先重新分析一次"
        },
        ja: {
            pageTitle: "AI性格傾向・自己理解レポート",
            pageSubtitle: "手のひら画像またはプロフィール情報をもとに、娯楽・参考目的の性格傾向レポートを生成します",
            langLabel: "言語",
            labelMode: "分析タイプ",
            modeProfileOption: "プロフィール傾向分析",
            modePalmOption: "手のひら特徴分析",
            labelName: "名前",
            labelGender: "性別",
            labelBirthday: "生年月日",
            labelStarSign: "参考タイプ",
            labelPalmUpload: "手のひら画像をアップロード",
            labelPalmGender: "性別",
            labelAgeRange: "年齢層",
            palmTip: "手のひら正面の鮮明な画像をアップロードしてください。本機能は見える特徴をもとに、娯楽・参考目的の性格傾向レポートを生成します。",
            chooseFileBtn: "手のひら画像を選択",
            fileNameEmpty: "画像が未選択です",
            fileNameRecovered: "画像は再選択されていません（前回の分析結果を復元済み）",
            labelTopic: "知りたいテーマ",
            submitBtn: "レポートを生成",
            freeResultTitle: "無料プレビュー",
            resultGuide: "まずはこのプレビューをご確認ください。参考になると感じたら、完全版を解放してみてください。",
            previewBadge: "プレビュー版",
            paidBadge: "完全版",
            paidResultTitle: "完全版レポート",
            lockedTitle: "🔒 完全版の自己理解レポートはロックされています",
            lockedIntro: "解放後に確認できる内容：",
            lockedItem1: "より深い性格傾向と行動スタイルの解釈",
            lockedItem2: "今のあなたが意識しやすい思考パターン",
            lockedItem3: "最近の状態変化を考えるためのヒント",
            lockedItem4: "見落としやすいコミュニケーションや判断の癖",
            lockedItem5: "より具体的なセルフケア・行動アドバイス",
            unlockPriceNote: "¥200で完全版レポートを解放",
            unlockBtn: "完全版を解放する",
            unlockSoftNote: "まずはプレビューを見てから判断できます。",
            heroPoint1: "✨ 無料プレビューを確認してから完全版を解放できます",
            heroPoint2: "🧭 プロフィール分析 / 手のひら特徴分析に対応",
            heroPoint3: "🌏 中文・日本語・English に対応",
            previewHint: "現在表示しているのは整理済みのプレビュー内容です",
            lockedSubtitle: "今見えているのは前半部分です。後半はより具体的で、自己理解や行動の参考にしやすい内容です。",
            unlockTrustNote: "一度の解放ですぐに完全版を確認できます",
            footerNote1: "本ツールの生成内容は娯楽・自己理解・参考目的であり、医療・法律・投資・就職等の専門的助言ではありません。",
            footerNote2: "アップロードされた画像と入力情報は今回の分析処理にのみ使用されます。",
            optionSelectGender: "選択してください",
            optionMale: "男性",
            optionFemale: "女性",
            optionSelectStar: "参考タイプを選択",
            starAries: "牡羊座",
            starTaurus: "牡牛座",
            starGemini: "双子座",
            starCancer: "蟹座",
            starLeo: "獅子座",
            starVirgo: "乙女座",
            starLibra: "天秤座",
            starScorpio: "蠍座",
            starSagittarius: "射手座",
            starCapricorn: "山羊座",
            starAquarius: "水瓶座",
            starPisces: "魚座",
            optionPalmSelectGender: "選択してください",
            optionPalmMale: "男性",
            optionPalmFemale: "女性",
            optionAgeSelect: "選択してください",
            topicGeneral: "総合傾向",
            topicLove: "恋愛・感情傾向",
            topicMarriage: "親密な関係の傾向",
            topicFuture: "今後の計画の参考",
            topicCareer: "仕事スタイル",
            topicWealth: "お金との向き合い方",
            topicHealth: "ストレス・生活状態",
            topicStudy: "学習スタイル",
            topicRelationship: "人間関係",
            topicThreeMonths: "最近の関心テーマ",
            topicOneYear: "長期計画の参考",
            loadingPalm: "画像の適性を確認し、手のひら特徴レポートを生成しています。しばらくお待ちください...",
            loadingProfile: "自己理解レポートを生成しています。しばらくお待ちください...",
            msgPalmReady: "手のひら特徴レポートが完了しました。",
            msgProfileReady: "自己理解レポートが完了しました。",
            msgPaidRestored: "支払いが完了し、完全版レポートが解放されました。",
            msgCanceled: "支払いはキャンセルされました。現在はプレビュー内容をご確認いただけます。",
            msgCreateCheckoutFail: "決済ページの作成に失敗しました：",
            msgAnalyzeFail: "分析に失敗しました：",
            msgNeedAnalyzeFirst: "ユーザー識別情報がありません。先に再分析してください。"
        },
        en: {
            pageTitle: "AI Personality Insight Report",
            pageSubtitle: "Upload a palm photo or enter your profile details to generate an entertainment-based personality insight report",
            langLabel: "Language",
            labelMode: "Analysis Type",
            modeProfileOption: "Profile Insight Analysis",
            modePalmOption: "Palm Feature Insight",
            labelName: "Name",
            labelGender: "Gender",
            labelBirthday: "Birthday",
            labelStarSign: "Reference Type",
            labelPalmUpload: "Upload Palm Image",
            labelPalmGender: "Gender",
            labelAgeRange: "Age Range",
            palmTip: "Please upload a clear front-facing palm photo. This feature generates an entertainment-based personality tendency report from visible palm features.",
            chooseFileBtn: "Choose Palm Image",
            fileNameEmpty: "No image selected",
            fileNameRecovered: "No new image selected (previous analysis restored)",
            labelTopic: "Focus Area",
            submitBtn: "Generate Report",
            freeResultTitle: "Free Preview",
            resultGuide: "Start with this preview. If it feels useful, you can unlock the full report.",
            previewBadge: "Preview",
            paidBadge: "Full",
            paidResultTitle: "Full Report",
            lockedTitle: "🔒 The full self-understanding report is locked",
            lockedIntro: "Unlock to continue reading:",
            lockedItem1: "A deeper look at your personality tendencies and action style",
            lockedItem2: "Thought patterns you may want to notice right now",
            lockedItem3: "Reference points for recent state changes",
            lockedItem4: "Communication and decision-making blind spots",
            lockedItem5: "More specific self-reflection and action suggestions",
            unlockPriceNote: "Unlock the full report for only ¥200",
            unlockBtn: "Unlock Full Report",
            unlockSoftNote: "Review the preview first, then decide.",
            heroPoint1: "✨ Review the free preview first, then decide whether to unlock the full report",
            heroPoint2: "🧭 Supports profile analysis and palm feature analysis",
            heroPoint3: "🌏 Available in 中文, 日本語, and English",
            previewHint: "You are viewing a curated preview version of your report",
            lockedSubtitle: "What you see now is only the first half. The rest is more specific and useful for self-understanding and reflection.",
            unlockTrustNote: "Unlock once and view the full content immediately",
            footerNote1: "The generated content is for entertainment, self-understanding, and reference only. It does not constitute medical, legal, investment, employment, or other professional advice.",
            footerNote2: "Uploaded images and entered information are only used for the current analysis process.",
            optionSelectGender: "Please select",
            optionMale: "Male",
            optionFemale: "Female",
            optionSelectStar: "Select reference type",
            starAries: "Aries",
            starTaurus: "Taurus",
            starGemini: "Gemini",
            starCancer: "Cancer",
            starLeo: "Leo",
            starVirgo: "Virgo",
            starLibra: "Libra",
            starScorpio: "Scorpio",
            starSagittarius: "Sagittarius",
            starCapricorn: "Capricorn",
            starAquarius: "Aquarius",
            starPisces: "Pisces",
            optionPalmSelectGender: "Please select",
            optionPalmMale: "Male",
            optionPalmFemale: "Female",
            optionAgeSelect: "Please select",
            topicGeneral: "Overall Tendencies",
            topicLove: "Emotional Communication",
            topicMarriage: "Close Relationship Tendencies",
            topicFuture: "Planning Reference",
            topicCareer: "Work Style",
            topicWealth: "Money Mindset",
            topicHealth: "Stress and Lifestyle",
            topicStudy: "Learning Style",
            topicRelationship: "Relationships",
            topicThreeMonths: "Recent Focus Areas",
            topicOneYear: "Long-Term Planning Reference",
            loadingPalm: "Checking image quality and generating your palm feature insight report. Please wait...",
            loadingProfile: "Generating your self-understanding report. Please wait...",
            msgPalmReady: "Your palm feature insight report is ready.",
            msgProfileReady: "Your self-understanding report is ready.",
            msgPaidRestored: "Payment successful. Your full report has been unlocked.",
            msgCanceled: "You canceled the payment. You can still review the preview.",
            msgCreateCheckoutFail: "Failed to create checkout session: ",
            msgAnalyzeFail: "Analysis failed: ",
            msgNeedAnalyzeFirst: "Missing user identifier. Please run an analysis first."
        }
    };
    
    function detectBrowserLang() {
        const browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    
        if (browserLang.startsWith("ja")) {
            return "ja";
        }
    
        if (browserLang.startsWith("en")) {
            return "en";
        }
    
        return "zh";
    }

    function getCurrentLang() {
        const savedLang = localStorage.getItem("fortune_lang");
    
        if (savedLang && ["zh", "ja", "en"].includes(savedLang)) {
            return savedLang;
        }
    
        return detectBrowserLang();
    }
    
    function setCurrentLang(lang) {
        localStorage.setItem("fortune_lang", lang);
    }
    
    function t(key) {
        const lang = getCurrentLang();
        return (I18N[lang] && I18N[lang][key]) || key;
    }
    
    function applyLanguage() {
        const lang = getCurrentLang();
        const dict = I18N[lang];
        if (!dict) return;
    
        const ids = [
            "pageTitle", "pageSubtitle", "langLabel", "labelMode",
            "modeProfileOption", "modePalmOption",
            "labelName", "labelGender", "labelBirthday", "labelStarSign",
            "labelPalmUpload", "labelPalmGender", "labelAgeRange",
            "palmTip", "chooseFileBtn",
            "labelTopic", "submitBtn",
            "freeResultTitle", "resultGuide", "previewBadge",
            "paidBadge", "paidResultTitle",
            "lockedTitle", "lockedIntro",
            "lockedItem1", "lockedItem2", "lockedItem3", "lockedItem4", "lockedItem5",
            "unlockPriceNote", "unlockBtn", "unlockSoftNote",
            "heroPoint1", "heroPoint2", "heroPoint3",
            "previewHint",
            "lockedSubtitle",
            "unlockTrustNote",
            "footerNote1", "footerNote2",
            "optionSelectGender", "optionMale", "optionFemale",
            "optionSelectStar",
            "starAries", "starTaurus", "starGemini", "starCancer",
            "starLeo", "starVirgo", "starLibra", "starScorpio",
            "starSagittarius", "starCapricorn", "starAquarius", "starPisces",
            "optionPalmSelectGender", "optionPalmMale", "optionPalmFemale",
            "optionAgeSelect",
            "topicGeneral", "topicLove", "topicMarriage", "topicFuture", "topicCareer",
            "topicWealth", "topicHealth", "topicStudy", "topicRelationship",
            "topicThreeMonths", "topicOneYear"
        ];
    
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el && dict[id]) {
                el.textContent = dict[id];
            }
        });
    
        const langSelect = document.getElementById("langSelect");
        if (langSelect) {
            langSelect.value = lang;
        }
    
        if (fileNameText && !(palmImageInput?.files?.[0])) {
            fileNameText.textContent = dict.fileNameEmpty;
        }
    }

    let latestPaidReport = "";
    let latestUserId = "";

    //console.log("app.js loaded - payment restore version");

    function updateModeView() {
        if (!modeSelect || !profileFields || !palmFields) return;

        const mode = modeSelect.value;

        if (mode === "profile") {
            profileFields.classList.remove("hidden");
            palmFields.classList.add("hidden");
        } else {
            profileFields.classList.add("hidden");
            palmFields.classList.remove("hidden");
        }
    }

    function showMessage(message, type = "info") {
        if (!messageBox) return;
    
        messageBox.textContent = message;
        messageBox.classList.remove("hidden", "error", "success", "info");
        messageBox.classList.add(type);
    }
    
    function hideMessage() {
        if (!messageBox) return;
    
        messageBox.textContent = "";
        messageBox.classList.add("hidden");
        messageBox.classList.remove("error", "success", "info");
    }
    
    function setLoadingText(text) {
        if (loadingText) {
            loadingText.textContent = text;
        }
    }

    function validateForm() {
        const topic = document.getElementById("topic")?.value;
        const mode = modeSelect?.value;
    
        if (!topic) {
            alert("请选择想了解的方向");
            return false;
        }
    
        if (mode === "profile") {
            const name = document.getElementById("name")?.value.trim();
            const gender = document.getElementById("profileGender")?.value;
            const birthday = document.getElementById("birthday")?.value;
    
            if (!name) {
                alert("请输入姓名");
                return false;
            }
    
            if (!gender) {
                alert("请选择性别");
                return false;
            }
    
            if (!birthday) {
                alert("请选择生日");
                return false;
            }
        }
    
        if (mode === "palm") {
            const palmImage = document.getElementById("palmImage")?.files?.[0];
            const palmGender = document.getElementById("palmGender")?.value;
            const ageRange = document.getElementById("ageRange")?.value;
    
            if (!palmImage) {
                alert("请上传手掌图片");
                return false;
            }
    
            if (!palmGender) {
                alert("请选择性别");
                return false;
            }
    
            if (!ageRange) {
                alert("请选择年龄段");
                return false;
            }
    
            const maxSize = 5 * 1024 * 1024;
            if (palmImage.size > maxSize) {
                alert("图片不能超过 5MB");
                return false;
            }
        }
    
        return true;
    }

    function renderPaidState(isPaid) {
        //console.log("renderPaidState:", isPaid);

        if (!lockedBox || !paidContent || !paidReport) {
            console.error("付费区元素缺失", { lockedBox, paidContent, paidReport });
            return;
        }

        if (isPaid) {
            lockedBox.classList.add("hidden");
            paidContent.classList.remove("hidden");
            paidReport.textContent = latestPaidReport || "完整报告内容为空";
        
            if (paidBadge) {
                paidBadge.classList.remove("hidden");
            }
        
            localStorage.setItem(STORAGE_KEYS.isPaid, "true");
        } else {
            lockedBox.classList.remove("hidden");
            paidContent.classList.add("hidden");
            paidReport.textContent = "";
        
            if (paidBadge) {
                paidBadge.classList.add("hidden");
            }
        
            localStorage.setItem(STORAGE_KEYS.isPaid, "false");
        }
    }

    function saveFormToStorage() {
        localStorage.setItem(STORAGE_KEYS.mode, document.getElementById("modeSelect")?.value || "");
        localStorage.setItem(STORAGE_KEYS.name, document.getElementById("name")?.value || "");
        localStorage.setItem(STORAGE_KEYS.gender, document.getElementById("profileGender")?.value || "");
        localStorage.setItem(STORAGE_KEYS.birthday, document.getElementById("birthday")?.value || "");
        localStorage.setItem(STORAGE_KEYS.starSign, document.getElementById("starSign")?.value || "");
        localStorage.setItem(STORAGE_KEYS.topic, document.getElementById("topic")?.value || "");
        localStorage.setItem(STORAGE_KEYS.palmGender, document.getElementById("palmGender")?.value || "");
        localStorage.setItem(STORAGE_KEYS.ageRange, document.getElementById("ageRange")?.value || "");
    }

    function restoreFormFromStorage() {
        const savedMode = localStorage.getItem(STORAGE_KEYS.mode) || "profile";
        const savedName = localStorage.getItem(STORAGE_KEYS.name) || "";
        const savedGender = localStorage.getItem(STORAGE_KEYS.gender) || "";
        const savedBirthday = localStorage.getItem(STORAGE_KEYS.birthday) || "";
        const savedStarSign = localStorage.getItem(STORAGE_KEYS.starSign) || "";
        const savedTopic = localStorage.getItem(STORAGE_KEYS.topic) || "综合倾向";
        const savedPalmGender = localStorage.getItem(STORAGE_KEYS.palmGender) || "";
        const savedAgeRange = localStorage.getItem(STORAGE_KEYS.ageRange) || "";
    
        const modeEl = document.getElementById("modeSelect");
        const nameEl = document.getElementById("name");
        const genderEl = document.getElementById("profileGender");
        const birthdayEl = document.getElementById("birthday");
        const starSignEl = document.getElementById("starSign");
        const topicEl = document.getElementById("topic");
        const palmGenderEl = document.getElementById("palmGender");
        const ageRangeEl = document.getElementById("ageRange");
    
        if (modeEl) modeEl.value = savedMode;
        if (nameEl) nameEl.value = savedName;
        if (genderEl) genderEl.value = savedGender;
        if (birthdayEl) birthdayEl.value = savedBirthday;
        if (starSignEl) starSignEl.value = savedStarSign;
        if (topicEl) topicEl.value = savedTopic;
        if (palmGenderEl) palmGenderEl.value = savedPalmGender;
        if (ageRangeEl) ageRangeEl.value = savedAgeRange;
    
        updateModeView();
    }

    function applyFormValuesFromResult(data) {
        const modeEl = document.getElementById("modeSelect");
        const nameEl = document.getElementById("name");
        const genderEl = document.getElementById("profileGender");
        const birthdayEl = document.getElementById("birthday");
        const starSignEl = document.getElementById("starSign");
        const topicEl = document.getElementById("topic");
        const palmGenderEl = document.getElementById("palmGender");
        const ageRangeEl = document.getElementById("ageRange");
    
        const mode = data.mode || "profile";
        const name = data.name || "";
        const gender = data.gender || "";
        const birthday = data.birthday || "";
        const starSign = data.star_sign || "";
        const topic = data.topic || "综合倾向";
    
        if (modeEl) modeEl.value = mode;
        if (topicEl) topicEl.value = topic;
    
        if (mode === "profile") {
            if (nameEl) nameEl.value = name;
            if (genderEl) genderEl.value = gender;
            if (birthdayEl) birthdayEl.value = birthday;
            if (starSignEl) starSignEl.value = starSign;
        } else {
            // 手相模式下，当前数据库里 gender 可当作 palmGender 恢复
            if (palmGenderEl) palmGenderEl.value = gender;
    
            // 你现在数据库里还没存 age_range，这里先不恢复
            // 后面如果要恢复年龄段，再把 age_range 存库即可
            if (ageRangeEl) ageRangeEl.value = localStorage.getItem(STORAGE_KEYS.ageRange) || "";
        }
    
        updateModeView();
    
        // 顺手写回本地，后续刷新更稳
        localStorage.setItem(STORAGE_KEYS.mode, mode);
        localStorage.setItem(STORAGE_KEYS.name, name);
        localStorage.setItem(STORAGE_KEYS.gender, gender);
        localStorage.setItem(STORAGE_KEYS.birthday, birthday);
        localStorage.setItem(STORAGE_KEYS.starSign, starSign);
        localStorage.setItem(STORAGE_KEYS.topic, topic);
        localStorage.setItem(STORAGE_KEYS.palmGender, mode === "palm" ? gender : (localStorage.getItem(STORAGE_KEYS.palmGender) || ""));
    }

    function saveAnalysisToStorage(freeText, paidText, userId, isPaid) {
        localStorage.setItem(STORAGE_KEYS.freeReport, freeText || "");
        localStorage.setItem(STORAGE_KEYS.paidReport, paidText || "");
        localStorage.setItem(STORAGE_KEYS.userId, userId || "");
        localStorage.setItem(STORAGE_KEYS.isPaid, isPaid ? "true" : "false");
    }

    function clearStoredAnalysisState() {
        localStorage.removeItem(STORAGE_KEYS.freeReport);
        localStorage.removeItem(STORAGE_KEYS.paidReport);
        localStorage.removeItem(STORAGE_KEYS.userId);
        localStorage.removeItem(STORAGE_KEYS.isPaid);
    
        localStorage.removeItem(STORAGE_KEYS.mode);
        localStorage.removeItem(STORAGE_KEYS.name);
        localStorage.removeItem(STORAGE_KEYS.gender);
        localStorage.removeItem(STORAGE_KEYS.birthday);
        localStorage.removeItem(STORAGE_KEYS.starSign);
        localStorage.removeItem(STORAGE_KEYS.topic);
        localStorage.removeItem(STORAGE_KEYS.palmGender);
        localStorage.removeItem(STORAGE_KEYS.ageRange);
    
        localStorage.removeItem(STORAGE_KEYS.restorePending);
    }

    function restoreAnalysisFromStorage() {
        const savedFreeReport = localStorage.getItem(STORAGE_KEYS.freeReport) || "";
        const savedPaidReport = localStorage.getItem(STORAGE_KEYS.paidReport) || "";
        const savedUserId = localStorage.getItem(STORAGE_KEYS.userId) || "";
        const savedIsPaid = localStorage.getItem(STORAGE_KEYS.isPaid) === "true";

        if (!savedFreeReport && !savedPaidReport) {
            return;
        }

        if (freeReport) {
            freeReport.textContent = savedFreeReport;
        }

        latestPaidReport = savedPaidReport;
        latestUserId = savedUserId;

        renderPaidState(savedIsPaid);

        if (result) {
            result.classList.remove("hidden");
        }
    }

    function updateSelectedFileName() {
        if (!palmImageInput || !fileNameText) return;
    
        const file = palmImageInput.files && palmImageInput.files[0];
    
        if (file) {
            fileNameText.textContent = file.name;
            fileNameText.classList.remove("placeholder");
        } else {
            fileNameText.textContent = t("fileNameEmpty");
            fileNameText.classList.add("placeholder");
        }
    }

    async function checkPaymentStatusAndRestore(userId) {
        try {
            if (!userId) return;
    
            const payRes = await fetch(`/payment-status?user_id=${encodeURIComponent(userId)}`);
            const payData = await payRes.json();
    
            if (!payRes.ok || !payData.success) {
                throw new Error(payData.message || "查询支付状态失败");
            }
    
            if (!payData.is_paid) {
                return;
            }
    
            const reportRes = await fetch(`/analysis-result?user_id=${encodeURIComponent(userId)}`);
            const reportData = await reportRes.json();
    
            if (!reportRes.ok || !reportData.success) {
                throw new Error(reportData.message || "读取分析结果失败");
            }
    
            // 1. 恢复表单字段
            applyFormValuesFromResult(reportData);
            applyLanguage();
    
            // 2. 恢复报告内容
            const restoredFreeReport = reportData.free_report || "";
            const restoredPaidReport = reportData.paid_report || "";
    
            if (freeReport) {
                freeReport.textContent = restoredFreeReport;
            }
    
            latestPaidReport = restoredPaidReport;
            latestUserId = userId;
    
            // 3. 写回本地
            localStorage.setItem(STORAGE_KEYS.freeReport, restoredFreeReport);
            localStorage.setItem(STORAGE_KEYS.paidReport, restoredPaidReport);
            localStorage.setItem(STORAGE_KEYS.userId, userId);
            localStorage.setItem(STORAGE_KEYS.isPaid, "true");
            localStorage.setItem(STORAGE_KEYS.restorePending, "false");
    
            if (result) {
                result.classList.remove("hidden");
            }
    
            renderPaidState(true);

            if (modeSelect && modeSelect.value === "palm" && fileNameText && palmImageInput && !(palmImageInput.files && palmImageInput.files[0])) {
                fileNameText.textContent = t("fileNameRecovered");
                fileNameText.classList.remove("placeholder");
            }

            showMessage(t("msgPaidRestored"), "success");
        } catch (error) {
            console.error("检查支付状态并恢复结果失败：", error);
        }
    }

    async function handlePaidReturn() {
        const url = new URL(window.location.href);
        const paid = url.searchParams.get("paid");
        const userId = url.searchParams.get("user_id");
        const urlLang = url.searchParams.get("lang");
    
        if (paid === "true" && userId) {
            //console.log("检测到支付成功返回, userId =", userId);
    
            if (urlLang && ["zh", "ja", "en"].includes(urlLang)) {
                setCurrentLang(urlLang);
                applyLanguage();
            }
    
            await checkPaymentStatusAndRestore(userId);
    
            window.history.replaceState({}, document.title, "/");
        }
    }

    // 暴露测试函数，手动解锁时还可以用
    window.testUnlockReport = function () {
        renderPaidState(true);
    };

    if (modeSelect) {
        modeSelect.addEventListener("change", updateModeView);
    }

    if (langSelect) {
        langSelect.addEventListener("change", (e) => {
            setCurrentLang(e.target.value);
            applyLanguage();
        });
    }

    if (chooseFileBtn && palmImageInput) {
        chooseFileBtn.addEventListener("click", () => {
            palmImageInput.click();
        });
    }
    
    if (palmImageInput) {
        palmImageInput.addEventListener("change", updateSelectedFileName);
    }

    const url = new URL(window.location.href);
    const paid = url.searchParams.get("paid");
    const canceled = url.searchParams.get("canceled");
    const userId = url.searchParams.get("user_id");
    const urlLang = url.searchParams.get("lang");

    if (urlLang && ["zh", "ja", "en"].includes(urlLang)) {
        setCurrentLang(urlLang);
    } else {
        setCurrentLang(getCurrentLang());
    }

    applyLanguage();

    if (paid === "true" && userId) {
        handlePaidReturn();
    } else if (canceled === "true") {
        showMessage(t("msgCanceled"), "info");
    } else {
        clearStoredAnalysisState();
    }
    updateSelectedFileName();

    if (unlockBtn) {
        unlockBtn.addEventListener("click", async () => {
            try {
                if (!latestUserId) {
                    showMessage(t("msgNeedAnalyzeFirst"), "error");
                    return;
                }

                const res = await fetch("/create-checkout-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: latestUserId,
                        lang: getCurrentLang()
                    })
                });

                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "创建支付失败");
                }

                window.location.href = data.checkout_url;
            } catch (error) {
                console.error("创建支付失败：", error);
                showMessage(`${t("msgCreateCheckoutFail")}${error.message}`, "error");
            }
        });
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            hideMessage();

            if (modeSelect?.value === "palm") {
                setLoadingText(t("loadingPalm"));
            } else {
                setLoadingText(t("loadingProfile"));
            }

            if (loading) loading.classList.remove("hidden");
            if (result) result.classList.add("hidden");

            const formData = new FormData(form);
            formData.set("lang", getCurrentLang());

            try {
                const res = await fetch("/analyze", {
                    method: "POST",
                    body: formData
                });

                const rawText = await res.text();
                let data = null;

                try {
                    data = JSON.parse(rawText);
                } catch (jsonError) {
                    console.error("返回的不是 JSON：", rawText);
                    throw new Error(`后端返回了非JSON内容，状态码: ${res.status}`);
                }

                if (!res.ok) {
                    throw new Error(data.message || `请求失败，状态码: ${res.status}`);
                }

                if (data.success) {
                    const freeText = data.free_report || "";
                    const paidText = data.paid_report || "";
                    const isPaid = data.is_paid || false;

                    if (freeReport) {
                        freeReport.textContent = freeText;
                    }

                    latestPaidReport = paidText;
                    latestUserId = data.user_id || "";

                    saveFormToStorage();
                    saveAnalysisToStorage(freeText, paidText, latestUserId, isPaid);
                    localStorage.setItem(STORAGE_KEYS.restorePending, "true");
                    renderPaidState(isPaid);

                    if (result) {
                        result.classList.remove("hidden");
                    }

                    if (modeSelect?.value === "palm") {
                        showMessage(t("msgPalmReady"), "success");
                    } else {
                        showMessage(t("msgProfileReady"), "success");
                    }
                } else {
                    alert(data.message || "分析失败");
                }
            } catch (error) {
                console.error("创建支付失败：", error);
                showMessage(`${t("msgAnalyzeFail")}${error.message}`, "error");
            } finally {
                if (loading) loading.classList.add("hidden");
            }
        });
    }
});