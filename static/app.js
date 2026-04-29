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
            pageTitle: "AI手相 / 命理分析",
            pageSubtitle: "上传手掌照片，或输入个人资料，获取你的专属运势分析报告",
            langLabel: "语言",
            labelMode: "分析模式",
            modeProfileOption: "资料命理分析",
            modePalmOption: "手相分析",
            labelName: "姓名",
            labelGender: "性别",
            labelBirthday: "生日",
            labelStarSign: "星座",
            labelPalmUpload: "上传手掌图片",
            labelPalmGender: "性别",
            labelAgeRange: "年龄段",
            palmTip: "请上传清晰的手掌正面照片，尽量光线充足、掌纹清楚、手掌完整展开",
            chooseFileBtn: "选择手掌图片",
            fileNameEmpty: "未选择图片",
            fileNameRecovered: "未重新选择图片（已恢复上次分析结果）",
            labelTopic: "想问的方向",
            submitBtn: "生成分析报告",
            freeResultTitle: "免费结果",
            previewBadge: "预览版",
            paidBadge: "完整版",
            paidResultTitle: "完整版报告",
            lockedTitle: "🔒 完整版深度报告已锁定",
            lockedIntro: "解锁后你将继续查看：",
            lockedItem1: "更深入的性格与状态解读",
            lockedItem2: "你当前最值得把握的机会",
            lockedItem3: "未来3个月的变化趋势",
            lockedItem4: "需要提前注意的风险点",
            lockedItem5: "更具体的建议与行动方向",
            unlockPriceNote: "仅需 ¥200 解锁完整报告",
            unlockBtn: "立即解锁完整版",
            footerNote1: "本工具生成的内容仅供娱乐与参考，不构成医疗、法律、投资或其他专业建议。",
            footerNote2: "用户上传的图片与输入信息仅用于当前分析流程，不用于其他用途。",
            optionSelectGender: "请选择",
            optionMale: "男",
            optionFemale: "女",
            optionSelectStar: "请选择星座",
            optionPalmSelectGender: "请选择",
            optionPalmMale: "男",
            optionPalmFemale: "女",
            optionAgeSelect: "请选择",
            topicGeneral: "综合运势",
            topicLove: "感情",
            topicMarriage: "婚姻",
            topicFuture: "前程",
            topicCareer: "事业",
            topicWealth: "金运",
            topicHealth: "健康",
            topicStudy: "学业",
            topicRelationship: "人际关系",
            topicThreeMonths: "未来3个月",
            topicOneYear: "未来1年",
            loadingPalm: "正在检查手掌图片质量，并生成你的手相分析报告，请稍候...",
            loadingProfile: "正在生成你的专属命理分析报告，请稍候...",
            msgPalmReady: "手相分析报告已生成，可先查看预览内容。",
            msgProfileReady: "命理分析报告已生成，可先查看预览内容。",
            msgPaidRestored: "支付成功，完整版报告已解锁。",
            msgCanceled: "你已取消支付，当前仍可查看预览内容。",
            msgCreateCheckoutFail: "创建支付失败：",
            msgAnalyzeFail: "分析失败：",
            msgNeedAnalyzeFirst: "缺少用户标识，请先重新分析一次"
        },
        ja: {
            pageTitle: "AI手相 / 運勢分析",
            pageSubtitle: "手のひら画像をアップロード、または個人情報を入力して、あなただけの運勢レポートを取得",
            langLabel: "言語",
            labelMode: "分析モード",
            modeProfileOption: "プロフィール命理分析",
            modePalmOption: "手相分析",
            labelName: "名前",
            labelGender: "性別",
            labelBirthday: "生年月日",
            labelStarSign: "星座",
            labelPalmUpload: "手のひら画像をアップロード",
            labelPalmGender: "性別",
            labelAgeRange: "年齢層",
            palmTip: "手のひら正面の鮮明な画像をアップロードしてください。明るく、手相が見やすく、手のひら全体が写っていることが理想です。",
            chooseFileBtn: "手のひら画像を選択",
            fileNameEmpty: "画像が未選択です",
            fileNameRecovered: "画像は再選択されていません（前回の分析結果を復元済み）",
            labelTopic: "知りたいテーマ",
            submitBtn: "分析レポートを生成",
            freeResultTitle: "無料プレビュー",
            previewBadge: "プレビュー版",
            paidBadge: "完全版",
            paidResultTitle: "完全版レポート",
            lockedTitle: "🔒 完全版の詳細レポートはロックされています",
            lockedIntro: "解放後に確認できる内容：",
            lockedItem1: "より深い性格と状態の解釈",
            lockedItem2: "今つかむべきチャンス",
            lockedItem3: "今後3か月の流れ",
            lockedItem4: "注意すべきリスク",
            lockedItem5: "より具体的な行動アドバイス",
            unlockPriceNote: "¥200で完全版レポートを解放",
            unlockBtn: "完全版を解放する",
            footerNote1: "本ツールの生成内容は娯楽・参考目的であり、医療・法律・投資等の専門的助言ではありません。",
            footerNote2: "アップロードされた画像と入力情報は今回の分析処理にのみ使用されます。",
            optionSelectGender: "選択してください",
            optionMale: "男性",
            optionFemale: "女性",
            optionSelectStar: "星座を選択",
            optionPalmSelectGender: "選択してください",
            optionPalmMale: "男性",
            optionPalmFemale: "女性",
            optionAgeSelect: "選択してください",
            topicGeneral: "総合運勢",
            topicLove: "恋愛",
            topicMarriage: "結婚",
            topicFuture: "将来運",
            topicCareer: "仕事運",
            topicWealth: "金運",
            topicHealth: "健康運",
            topicStudy: "学業運",
            topicRelationship: "人間関係",
            topicThreeMonths: "今後3か月",
            topicOneYear: "今後1年",
            loadingPalm: "画像の適性を確認し、手相レポートを生成しています。しばらくお待ちください...",
            loadingProfile: "あなた専用の命理分析レポートを生成しています。しばらくお待ちください...",
            msgPalmReady: "手相分析レポートが生成されました。まずはプレビューをご確認ください。",
            msgProfileReady: "命理分析レポートが生成されました。まずはプレビューをご確認ください。",
            msgPaidRestored: "支払いが完了し、完全版レポートが解放されました。",
            msgCanceled: "支払いはキャンセルされました。現在はプレビュー内容をご確認いただけます。",
            msgCreateCheckoutFail: "決済ページの作成に失敗しました：",
            msgAnalyzeFail: "分析に失敗しました：",
            msgNeedAnalyzeFirst: "ユーザー識別情報がありません。先に再分析してください。"
        },
        en: {
            pageTitle: "AI Palm / Fortune Analysis",
            pageSubtitle: "Upload a palm photo or enter your personal details to get your personalized fortune report",
            langLabel: "Language",
            labelMode: "Analysis Mode",
            modeProfileOption: "Profile Fortune Analysis",
            modePalmOption: "Palm Reading Analysis",
            labelName: "Name",
            labelGender: "Gender",
            labelBirthday: "Birthday",
            labelStarSign: "Zodiac Sign",
            labelPalmUpload: "Upload Palm Photo",
            labelPalmGender: "Gender",
            labelAgeRange: "Age Range",
            palmTip: "Please upload a clear front-facing palm photo with enough light, visible lines, and the full palm in frame.",
            chooseFileBtn: "Choose Palm Image",
            fileNameEmpty: "No image selected",
            fileNameRecovered: "No new image selected (previous analysis restored)",
            labelTopic: "Focus Area",
            submitBtn: "Generate Report",
            freeResultTitle: "Free Preview",
            previewBadge: "Preview",
            paidBadge: "Full",
            paidResultTitle: "Full Report",
            lockedTitle: "🔒 The full deep-dive report is locked",
            lockedIntro: "Unlock to continue reading:",
            lockedItem1: "A deeper interpretation of your personality and current state",
            lockedItem2: "The opportunity you should seize now",
            lockedItem3: "Your next 3 months trend",
            lockedItem4: "The risks you should pay attention to",
            lockedItem5: "More specific advice and action guidance",
            unlockPriceNote: "Unlock the full report for only ¥200",
            unlockBtn: "Unlock Full Report",
            footerNote1: "The generated content is for entertainment and reference only, and does not constitute medical, legal, investment, or other professional advice.",
            footerNote2: "Uploaded images and entered information are only used for the current analysis process.",
            optionSelectGender: "Please select",
            optionMale: "Male",
            optionFemale: "Female",
            optionSelectStar: "Select zodiac sign",
            optionPalmSelectGender: "Please select",
            optionPalmMale: "Male",
            optionPalmFemale: "Female",
            optionAgeSelect: "Please select",
            topicGeneral: "Overall Fortune",
            topicLove: "Love",
            topicMarriage: "Marriage",
            topicFuture: "Future Path",
            topicCareer: "Career",
            topicWealth: "Wealth",
            topicHealth: "Health",
            topicStudy: "Study",
            topicRelationship: "Relationships",
            topicThreeMonths: "Next 3 Months",
            topicOneYear: "Next 1 Year",
            loadingPalm: "Checking palm image quality and generating your palm reading report. Please wait...",
            loadingProfile: "Generating your personalized fortune analysis report. Please wait...",
            msgPalmReady: "Your palm reading report is ready. You can review the preview first.",
            msgProfileReady: "Your fortune analysis report is ready. You can review the preview first.",
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
            "freeResultTitle", "previewBadge",
            "paidBadge", "paidResultTitle",
            "lockedTitle", "lockedIntro",
            "lockedItem1", "lockedItem2", "lockedItem3", "lockedItem4", "lockedItem5",
            "unlockPriceNote", "unlockBtn",
            "footerNote1", "footerNote2",
            "optionSelectGender", "optionMale", "optionFemale",
            "optionSelectStar",
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

    console.log("app.js loaded - payment restore version");

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
            alert("请选择想问的方向");
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
        console.log("renderPaidState:", isPaid);

        if (!lockedBox || !paidContent || !paidReport) {
            console.error("付费区元素缺失", { lockedBox, paidContent, paidReport });
            return;
        }

        if (isPaid) {
            lockedBox.classList.add("hidden");
            paidContent.classList.remove("hidden");
            paidReport.textContent = latestPaidReport || "完整版内容为空";
        
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
        const savedTopic = localStorage.getItem(STORAGE_KEYS.topic) || "综合运势";
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
        const topic = data.topic || "综合运势";
    
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
                fileNameText.textContent = "未重新选择图片（已恢复上次分析结果）";
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
            console.log("检测到支付成功返回, userId =", userId);
    
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
                console.error("提交分析失败：", error);
                showMessage(`${t("msgAnalyzeFail")}${error.message}`, "error");
            } finally {
                if (loading) loading.classList.add("hidden");
            }
        });
    }
});