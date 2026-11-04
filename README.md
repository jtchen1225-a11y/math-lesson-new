# math-lesson-new：40 分鐘數學新課講授

新概念第一次教的 40 分鐘課：喚起先備知識 → 懸念引入（情境或短片，學生先猜） → 只講一個核心概念並示範 → 學生當堂獨立嘗試 → 錯誤分析 → 出口題。

給 AI Agent（Claude Code 等）安裝使用的技能。Agent 依教師提供的年級、課題與目標，產出三份成品：

1. **教案 `lesson-plan.md`**：課堂基本資料、40 分鐘流程表、A／B／C 分層練習、巡視觀察表、不同學生的支援、典型錯誤分析、出口題與三類學生後續安排、課後反思框架、品質檢查表。
2. **互動課堂簡報 `site\index.html`**：可離線、雙擊開啟、投影字級 28pt。內建三層同頁任務（A 基礎支持、B 核心達標、C 延伸挑戰同時顯示，各有提示與答案；專注時間的倒數和題目在同一頁）、全班理解檢查（計票＋迷思說明）、錯誤分析、出口題、自評統計、可下載 CSV 的課堂紀錄（只有人數），倒數時間到會響鈴，還有雷射筆、畫筆和放大成整頁。投影畫面上的階段與頁面名稱都寫成給學生看的任務名稱，教師用的名稱和出口題判準只放在教案。範例與預設用語為香港用語。

新課講授另有一頁**粵語動畫**：分幕動畫、粵語字幕加上預錄的香港粵語語音。mp3 放在簡報資料夾內，上課播放不需要網路；可暫停、拖進度、關聲音。


3. **可列印紙本 `site\handout.html`**：學生學習單（沒有答案）、出口小紙條（一張 A4 六份）、教師版（巡視觀察表、判準、答案）。題目直接讀簡報內容，不用寫兩次。

課後把出口題人數和課堂紀錄 CSV 交給 Agent，它會用 `scripts/summarize_evidence.py` 整理證據，再寫出下一節的調整。

## 本課型的課堂階段

| 時間 | 簡報上的名稱（給學生看） | 教案名稱（給教師看） | 頁面 |
|------|------|------|------|
| 0–5 分鐘 | 熱身挑戰：先動手算一算 | 課堂安頓＋分層起步題 | 1-1 今天的任務、1-2 熱身題 |
| 5–8 分鐘 | 懸念時刻：你猜得到嗎？ | 情境引入＋設置懸念（短片、趣味情境或謎題） | 2-1 猜一猜 |
| 8–17 分鐘 | 看動畫，發現新規律 | 核心概念講解與示範 | 3-1 粵語動畫、3-2 動手探索、3-3 跟著做一次、3-4 快問快答 |
| 17–25 分鐘 | 輪到你出手：闖關練習 | 學生獨立嘗試＋教師巡視 | 4-1 專注闖關 |
| 25–35 分鐘 | 抓錯偵探＋升級挑戰 | 典型錯誤分析＋分層練習 | 5-1 抓錯偵探、5-2 升級挑戰 |
| 35–40 分鐘 | 最後一關：出口挑戰 | 出口題＋當堂回饋 | 6-1 出口挑戰、6-2 今天的收穫 |

## 安裝

技能就是這整個資料夾，`SKILL.md` 在最上層。

**Claude Code（Windows PowerShell）**

```powershell
git clone https://github.com/jtchen1225-a11y/math-lesson-new.git "$env:USERPROFILE\.claude\skills\math-lesson-new"
```

**Claude Code（macOS／Linux）**

```bash
git clone https://github.com/jtchen1225-a11y/math-lesson-new.git ~/.claude/skills/math-lesson-new
```

**其他 Agent**：把這個 Repo 複製到該 Agent 讀取技能的資料夾。也可以直接把 Repo 網址交給 Agent，請它安裝。

安裝後重新開啟 Agent，然後這樣說：

> 請用 math-lesson-new 幫我設計一節中二「畢氏定理」的新課，學生程度落差大。

## 需要的環境

- Python 3、Node.js（只用內建模組），以及已安裝的 Edge 或 Chrome（驗證時才需要）。
- 不需要網路、不需要 API 金鑰、不需要安裝任何套件。MathJax 3.2.2 已附在 `vendor/mathjax/`，Repo 約 10 MB。

## 三個課型技能

| 技能 | 用途 |
|------|------|
| [math-lesson-new](https://github.com/jtchen1225-a11y/math-lesson-new) | 新課講授：新概念第一次教 |
| [math-lesson-practice](https://github.com/jtchen1225-a11y/math-lesson-practice) | 練習課：已學方法練到正確、穩定、能變通 |
| [math-lesson-review](https://github.com/jtchen1225-a11y/math-lesson-review) | 複習課：單元內容的診斷、統整、綜合應用與易錯辨析 |

三個技能共用同一套簡報引擎與課堂元件，可以分開安裝。

## 範例

`examples/pythagoras/` 收錄一份完整範例：`lesson.json`、`ch1.js`～`ch5.js`、`lesson-plan.md`，已通過格式、互動、公式和版面驗證，數學內容也用 Python 驗算過。範例教案沒有真實課堂資料，學生表現都標註為「預期情況」。

## 授權與來源

- 簡報框架改自 [mathruffian-dot/math-review-deck](https://github.com/mathruffian-dot/math-review-deck)（MIT），見 `LICENSE`。
- MathJax 3.2.2：Apache-2.0，見 `vendor/mathjax/LICENSE`。
- 課堂設計原則見 `references/lesson-principles.md`。
- 修改內容與測試紀錄見 `CHANGES.md`。
