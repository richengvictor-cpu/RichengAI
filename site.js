(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pathLang = location.pathname.includes('/en/') ? 'en' : 'zh';
  const explicitLang = new URLSearchParams(location.search).get('lang');
  const lang = explicitLang === 'en' || explicitLang === 'zh' ? explicitLang : pathLang;

  window.RichengLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';

  const commonReplacements = [
    ['日晟聯合記帳士事務所', 'Richeng Certified Tax Accountants Firm'],
    ['日晟稅務AI', 'Richeng Tax AI'],
    ['Richeng AI 服務', 'Richeng AI Service'],
    ['版權所有 © 2026 Richeng AI｜日晟聯合記帳士事務所，保留所有權利。', 'Copyright © 2026 Richeng AI | Richeng Certified Tax Accountants Firm. All rights reserved.'],
    ['Copyright © 2026 Richeng AI｜日晟聯合記帳士事務所. All rights reserved.', 'Copyright © 2026 Richeng AI | Richeng Certified Tax Accountants Firm. All rights reserved.'],
    ['首頁 Demo v1（存檔查閱）', 'Home Demo v1 (Archive)'],
    ['正式主頁仍維持 www.richeng.com.tw，舊版僅供查閱，不影響主頁 SEO。', 'The official homepage remains www.richeng.com.tw. The archive version is for reference only and does not affect the main site SEO.'],
    ['舊版網頁', 'Archive'],
    ['首頁', 'Home'],
    ['品牌理念', 'Brand Story'],
    ['服務項目', 'Services'],
    ['線上表單', 'Online Forms'],
    ['常見問題', 'FAQ'],
    ['聯絡我們', 'Contact Us'],
    ['預約諮詢', 'Book a Consultation'],
    ['查看服務', 'View Services'],
    ['合作流程', 'Workflow'],
    ['服務據點', 'Locations'],
    ['合作特色', 'Working Style'],
    ['聯絡方式', 'Contact'],
    ['公司登記', 'Company Setup'],
    ['商業登記', 'Business Registration'],
    ['稅務服務', 'Tax Services'],
    ['記帳服務', 'Bookkeeping'],
    ['企業諮商', 'Advisory'],
    ['其他專業服務', 'Other Professional Services'],
    ['新竹所', 'Hsinchu Office'],
    ['竹北所', 'Zhubei Office'],
    ['新湖所', 'Xinhu Office'],
    ['台北所', 'Taipei Office'],
    ['公司登記、商業登記、稅務服務、記帳服務、企業諮商、其他專業服務', 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support'],
    ['清楚、穩定、專業，適合長期合作', 'Clear, stable and professional for long-term collaboration'],
    ['Email、電話、LINE 都可直接聯繫', 'You can contact us directly by email, phone or LINE'],
    ['加入 Richeng AI 官方 LINE', 'Join Richeng AI Official LINE'],
    ['點一下就能直接開啟對話', 'Tap once to open the chat'],
    ['Richeng AI 官方 LINE', 'Richeng AI Official LINE'],
    ['開啟官方 LINE', 'Open Official LINE'],
    ['若你想直接開始合作，可以先填線上表單，再由我們依需求協助判斷。', 'If you want to get started right away, fill out the online form first and we will help you determine the best path.'],
    ['如果你還不確定要走哪個流程，先聯絡我們，我們可以先幫你判斷。', 'If you are not sure which workflow to choose, contact us first and we will help you assess it.'],
    ['五大表單，直接填寫', 'Five forms, ready to fill'],
    ['常見問題先看一眼', 'Take a quick look at the FAQ'],
    ['想先談一輪也可以', 'You can also start with a quick conversation'],
    ['先填表，再加快處理', 'Fill the form first to speed things up'],
    ['需要人工協助也可以', 'Human help is always available'],
    ['查看完整 50 題', 'View all 50 questions'],
    ['問題對不上也沒關係', 'If your question does not match, that is okay'],
    ['如果你還猶豫，也可以先看問題整理，再決定要填哪一張。', 'If you are still unsure, review the questions first and then choose the right form.'],
    ['把需求先整理好，可以讓我們更快判斷路徑，也讓你更快進入實際處理。', 'Organizing your needs first helps us assess the right path faster and gets you into real processing sooner.'],
    ['公司設立', 'Company Setup'],
    ['公司變更', 'Company Change'],
    ['商業變更', 'Business Change'],
    ['記帳服務需求表', 'Bookkeeping Service Request Form'],
    ['稅務諮詢表', 'Tax Consultation Form'],
    ['開始合作', 'Get Started'],
    ['先填表，更快開始', 'Fill the form first to move faster'],
    ['先填表，再加快處理', 'Fill the form first to speed things up'],
    ['常見問題先看一眼', 'Take a quick look at the FAQ'],
    ['需要人工協助也可以', 'Human help is always available'],
    ['先填表，更快開始', 'Fill the form first to move faster'],
    ['先填表，再加快處理', 'Fill the form first to speed things up'],
    ['00 / 品牌理念', '00 / Brand Story'],
    ['在浩瀚的商業宇宙裡，持續把財稅服務做得更好', 'In the vast commercial universe, keep finance and tax services moving toward precision'],
    ['Richeng AI｜日晟聯合記帳士事務所 不是只把帳做好，而是把服務做成一套能長期陪伴企業前行的專業系統。以 40 年記帳士事務所底子結合 AI 邏輯，將財稅、記帳士、會計師與會計流程整理成更清楚、更精準、更有秩序的顧問體驗。', 'Richeng AI | Richeng Certified Tax Accountants Firm is not only about keeping the books in order. It is about turning service into a professional system that can support businesses for the long run. Built on 40 years of accounting-firm expertise and AI logic, it organizes tax, bookkeeping, accounting and CPA-related workflows into a clearer, more precise and more orderly advisory experience.'],
    ['星河、流星與光暈不是裝飾，而是象徵：我們陪伴過無數大小企業，在時間中累積經驗，也在變動中持續進化。', 'The star river, meteors and halo are not decoration. They symbolize the many businesses we have accompanied over time, the experience we have accumulated, and the evolution that continues with every change.'],
    ['01 / 視覺語言', '01 / Visual Language'],
    ['讓畫面像精品品牌，而不是傳統模板', 'Make the page feel like a premium brand, not a conventional template'],
    ['整體視覺不是做得花，而是做得安靜、乾淨、穩定，讓客戶一眼就能感受到專業與信任。', 'The visual direction is not about adding more effects. It is about being quiet, clean and stable so that professionalism and trust are felt at a glance.'],
    ['高級極簡', 'Premium Minimalism'],
    ['黑、灰、白的秩序感', 'The order of black, gray and white'],
    ['穩定的底盤讓畫面回到秩序與留白，內容更清楚，品牌也更有重量。', 'A stable foundation brings the page back to order and breathing room, making the content clearer and the brand feel more substantial.'],
    ['識別色', 'Accent Color'],
    ['Tiffany 藍綠只做點亮', 'Tiffany blue-green only for accents'],
    ['只在重點、按鈕、線條與小型高亮處出現，讓品牌感有記憶點，但不會喧賓奪主。', 'Used only for highlights, buttons, lines and small focal points, it gives the brand a memorable accent without taking over the page.'],
    ['星空寓意', 'Starry Symbolism'],
    ['星河、流星、光暈代表進化', 'Star river, meteors and halo represent evolution'],
    ['我們把持續服務企業的過程，轉成一個有節奏、有層次的宇宙故事，讓畫面和品牌語氣一致。', 'We turn the ongoing process of serving businesses into a rhythmic, layered cosmic story so the visuals and brand voice stay aligned.'],
    ['02 / 品牌沿革', '02 / Brand Timeline'],
    ['從 1985 到 Richeng AI，專業持續升級', 'From 1985 to Richeng AI, the expertise keeps evolving'],
    ['我們保留事務所原有的專業與穩定，並把流程、溝通與資料整理做得更清楚，讓合作更有效率。', 'We preserve the firm’s professionalism and stability while making the workflow, communication and data organization clearer, so collaboration becomes more efficient.'],
    ['1985', '1985'],
    ['專業底子先站穩', 'Build the professional foundation first'],
    ['自 1985 年創立以來，持續深耕公司登記、商業登記、稅務服務、記帳服務、企業諮商與其他專業服務。', 'Since our founding in 1985, we have continued to focus on company setup, business registration, tax services, bookkeeping, advisory and other professional support.'],
    ['現在', 'Today'],
    ['AI 協作讓流程更清楚', 'AI collaboration makes the workflow clearer'],
    ['現在以 Richeng AI 的品牌形式，將繁複的財稅流程整理成更清楚、更精準、更有秩序的顧問體驗。', 'Today, through the Richeng AI brand, we organize complex tax and bookkeeping workflows into a clearer, more precise and more structured advisory experience.'],
    ['01 / 服務項目', '01 / Services'],
    ['核心服務，從登記到記帳一次到位', 'Core services, from setup to bookkeeping in one place'],
    ['不是只把單一項目做完，而是把成立、申辦、記帳與申報連成一套能長期合作的流程。', 'We do not simply finish one task at a time. We connect setup, applications, bookkeeping and filings into a workflow that supports long-term collaboration.'],
    ['02 / 核心服務', '02 / Core Services'],
    ['你最常需要的四大服務', 'The four services clients need most often'],
    ['如果你正在找的是清楚、穩定、可以長期合作的財稅顧問，這四類服務就是最常見的起點。', 'If you are looking for a clear, stable and long-term financial and tax advisor, these four service groups are the most common starting points.'],
    ['公司設立與變更', 'Company Setup and Changes'],
    ['協助企業完成公司、分公司與各類組織登記，讓成立、變更與後續申辦流程更清楚，也更容易持續管理。', 'We help businesses complete company, branch and organizational registrations so setup, changes and follow-up filings remain clear and easy to manage.'],
    ['商號與工作室', 'Sole Proprietorships and Studios'],
    ['針對中小企業、工作室、餐飲業、診所與補教業提供合適的登記與申辦協助，讓不同規模的企業都能找到適合的起點。', 'We support small businesses, studios, restaurants, clinics and education providers with suitable registrations and applications, so every business size can start from the right place.'],
    ['申報與規劃', 'Filings and Planning'],
    ['從帳務處理、稅務申報到國內外稅務規劃，維持專業、合規與流程穩定，讓數字更清楚，也更容易追蹤。', 'From bookkeeping and tax filing to domestic and cross-border tax planning, we keep everything professional, compliant and stable so the numbers stay clear and easy to trace.'],
    ['長期帳務整理', 'Long-term Bookkeeping Organization'],
    ['把每一筆資料整理得更完整、更容易看懂，讓企業在長期經營中維持秩序、透明與可追蹤性。', 'We organize every record in a complete and readable way, helping businesses maintain order, transparency and traceability over the long run.'],
    ['03 / 怎麼開始', '03 / How to Start'],
    ['先看懂需求，再進入處理', 'Understand the need first, then move into execution'],
    ['我們希望每一位客戶在開始前都知道自己在哪一步，這樣合作才會更順、更快，也更少來回。', 'We want every client to know exactly where they are before starting, so collaboration becomes smoother, faster and with less back-and-forth.'],
    ['先填資料', 'Step 1: Submit the details'],
    ['把需求先整理好，讓我們能更快判斷你需要哪一條服務路徑。', 'Organize your needs first so we can quickly identify the right service path.'],
    ['先做評估', 'Step 2: Review and assess'],
    ['我們會先看資料完整性與處理方向，避免走錯步驟，也讓流程更有效率。', 'We first review the completeness of the information and the appropriate direction, helping avoid wrong turns and keeping the process efficient.'],
    ['進入執行', 'Step 3: Move into execution'],
    ['確認方向後，才會正式進入辦理、整理、申報與後續協作。', 'Once the direction is confirmed, we move into processing, organization, filing and ongoing collaboration.'],
    ['把財稅服務做成清楚、穩定、值得信任的顧問體驗。', 'We turn tax and bookkeeping services into a clear, stable and trustworthy advisory experience.'],
    ['若你想直接開始，我們建議先從線上表單進來，會比直接空白聯絡更快進入實作。', 'If you want to start right away, we recommend beginning with the online form. It gets you into real processing faster than a blank contact message.'],
    ['五大表單，直接填寫', 'Five forms, ready to fill'],
    ['公司設立、公司變更、商業變更、記帳服務、稅務諮詢都可以直接送出。', 'Company setup, company changes, business changes, bookkeeping and tax consultation can all be submitted directly.'],
    ['想先談一輪也可以', 'Prefer to talk first? That works too'],
    ['如果你還不確定要走哪個流程，先聯絡我們，我們可以先幫你判斷。', 'If you are not sure which process to choose, contact us first and we will help you decide.'],
    ['先填表，讓我們更快幫你找到正確的路徑。', 'Fill out the form first so we can help you find the right path faster.'],
    ['表單是合作的起點，不是流程的負擔。它的目的，是讓你少走彎路。', 'The form is the starting point of collaboration, not a burden. Its purpose is to help you avoid unnecessary detours.'],
    ['04 / 常見問題', '04 / FAQ'],
    ['先看懂問題，再決定怎麼開始', 'Understand the question first, then decide how to begin'],
    ['首頁仍保留完整 50 題，這一頁則是最常被問的主題總覽。', 'The homepage still contains the full 50-question FAQ. This page is a concise overview of the questions clients ask most often.'],
    ['05 / 最常問', '05 / Most Common Questions'],
    ['最容易先卡住的 12 題', 'The 12 questions clients usually ask first'],
    ['如果你正在比較服務、猶豫要填哪張表單，先看這一頁通常就能解答大部分疑問。', 'If you are comparing services or unsure which form to use, this page usually answers most of the early questions.'],
    ['你們主要做哪些服務？', 'What services do you mainly provide?'],
    ['我們主要提供公司設立、商業登記、稅務服務、記帳服務、企業諮商與其他專業協作。目標不是只做單一項目，而是把財稅流程做得更清楚、更穩定。', 'We mainly provide company setup, business registration, tax services, bookkeeping, advisory and other professional support. Our goal is not to complete only one task, but to make the tax and bookkeeping process clearer and more stable.'],
    ['如果我不知道要填哪張表單怎麼辦？', 'What if I do not know which form to fill out?'],
    ['可以先選最接近的那一張，或直接聯絡我們。我們會幫你判斷最合適的入口，不需要第一次就完全選對。', 'Start with the closest form or contact us directly. We will help you choose the most suitable entry point, and you do not need to pick perfectly the first time.'],
    ['你們有做公司設立嗎？', 'Do you handle company setup?'],
    ['有，公司設立是我們最常見的服務之一。從規劃、資料整理到申辦流程，我們都可以協助你把方向先理清楚。', 'Yes. Company setup is one of our most common services. From planning and document preparation to the filing process, we can help you clarify the direction first.'],
    ['你們可以協助變更登記嗎？', 'Can you help with registration changes?'],
    ['可以，包含公司變更與商業變更都能協助。變更常常牽涉到文件一致性與時程安排，我們會幫你一起確認。', 'Yes. We can assist with both company changes and business registration changes. These often involve document consistency and timing, and we will help you review both.'],
    ['記帳服務是長期合作嗎？', 'Is bookkeeping usually a long-term engagement?'],
    ['多數情況下是長期合作，也可以依企業需求安排單一服務。重點是讓帳務更清楚，後續更容易追蹤與管理。', 'In most cases, yes, it is a long-term collaboration, though single-service arrangements are also possible. The key is to make the bookkeeping clearer and easier to manage over time.'],
    ['稅務諮詢可以先單獨做嗎？', 'Can tax consultation be done separately first?'],
    ['可以，若你只是想先了解方向，稅務諮詢表就是很好的起點。先把問題整理清楚，再開始處理通常會更有效率。', 'Yes. If you only want to understand the direction first, the tax consultation form is a good starting point. Clarifying the issue first usually makes the process more efficient.'],
    ['你們的合作方式會很制式嗎？', 'Is your collaboration style very rigid?'],
    ['不會，我們會依你的情況整理成適合的合作方式，而不是只給固定模板。不同產業、不同階段，需要的安排不會完全相同。', 'No. We tailor the collaboration style to your situation instead of relying on a fixed template. Different industries and stages require different arrangements.'],
    ['AI 在你們的服務裡扮演什麼角色？', 'What role does AI play in your services?'],
    ['AI 主要用在流程整理、資訊歸納與協作輔助，讓我們更快看懂需求、更快整理資料，但最終仍由專業判斷把關。', 'AI is mainly used for workflow organization, information structuring and collaboration support. It helps us understand requests faster and organize materials sooner, while final judgment still comes from professional expertise.'],
    ['客戶看得懂流程嗎？', 'Can clients understand the workflow?'],
    ['會，我們會用盡量清楚的方式說明步驟，避免專業術語太多。好的服務應該是讓人看得懂，而不是更困惑。', 'Yes. We explain the steps in the clearest possible way and avoid too much jargon. Good service should make things easier to understand, not more confusing.'],
    ['你們有提供快速處理嗎？', 'Do you offer expedited handling?'],
    ['如果案件較急，我們會先評估可行性，再安排處理順序。急件的重點不是盲目加快，而是先把最重要的部分處理好。', 'If the case is urgent, we first assess feasibility and then arrange the processing order. The key is not to rush blindly, but to handle the most important parts first.'],
    ['我可以先只做單一項目嗎？', 'Can I start with only one service?'],
    ['可以，你不一定要一次把所有事情都交給我們。若你只需要單一服務，也能依需求單獨安排。', 'Yes. You do not need to hand over everything at once. If you only need one service, we can arrange it separately.'],
    ['哪裡可以看完整 50 題？', 'Where can I see the full 50 questions?'],
    ['首頁有完整的 50 題 FAQ 可展開查看。這一頁是精簡版總覽，方便你先快速了解最常見的問題。', 'The homepage contains the full 50-question FAQ. This page is a condensed overview for a quick look at the most common questions.'],
    ['06 / 仍不確定？', '06 / Still Unsure?'],
    ['直接從表單或聯絡入口開始', 'Start from the forms or contact entry points'],
    ['如果 FAQ 還沒有回答到你的情況，下一步最有效的方式就是直接送出表單或聯絡我們。', 'If the FAQ still does not answer your case, the most effective next step is to submit a form or contact us directly.'],
    ['直接選擇最接近的表單', 'Choose the form that is closest to your need'],
    ['公司設立、變更、記帳、稅務諮詢都可以直接進站填寫。', 'Company setup, changes, bookkeeping and tax consultation can all be filled in directly.'],
    ['需要人工協助也可以', 'Human assistance is also available'],
    ['如果你想先談一輪，我們也可以先幫你判斷最合適的路徑。', 'If you want to talk first, we can also help you identify the most suitable path.'],
    ['FAQ 不是結尾，而是讓你更快開始的入口。', 'FAQ is not the end; it is the entry point that helps you start faster.'],
    ['如果你已經找到答案，就可以直接往下一步走；如果還沒找到，我們可以直接幫你接住需求。', 'If you have already found the answer, you can move to the next step right away. If not, we can help take it from here.'],
    ['查看完整 50 題', 'View the full 50 questions'],
    ['如果你想一次看完所有問題，可以直接回首頁展開完整版。', 'If you want to review every question at once, open the full version on the homepage.'],
    ['問題對不上也沒關係', 'If your question does not match, that is okay'],
    ['先填表，讓我們幫你快速對應最合適的流程。', 'Fill out the form first and we will help match you to the most suitable workflow.'],
    ['07 / 聯絡我們', '07 / Contact Us'],
    ['如果你想把財稅流程整理得更清楚，現在就可以開始。', 'If you want to make your tax and bookkeeping workflow clearer, you can begin now.'],
    ['先從你最方便的方式開始，讓 Richeng AI 直接接上你的合作節奏。', 'Start with the channel that is most convenient for you and let Richeng AI align with your collaboration rhythm.'],
    ['08 / 聯絡方式', '08 / Contact Methods'],
    ['三個最直接的入口', 'Three direct ways to reach us'],
    ['如果你想快速接上服務，先從 LINE、電話或 Email 擇一即可。', 'If you want to connect quickly, start with LINE, phone or email.'],
    ['Richeng AI 服務', 'Richeng AI Service'],
    ['最適合先開啟對話，快速確認你現在的需求與下一步。', 'Best for starting the conversation and quickly confirming your needs and next step.'],
    ['電話聯絡', 'Phone'],
    ['若你想直接說明狀況，電話可以更快接上合作節奏。', 'If you want to explain your situation directly, phone calls can connect to the collaboration rhythm faster.'],
    ['Email 聯絡', 'Email'],
    ['適合先寄資料、預約說明，或留下較完整的需求內容。', 'Suitable for sending materials first, booking a discussion, or leaving a more detailed request.'],
    ['09 / LINE 掃碼', '09 / LINE QR'],
    ['直接加入 Richeng AI 服務', 'Join Richeng AI Service directly'],
    ['掃碼後即可加入官方 LINE，讓你更快開始聯絡。', 'Scan the code to join our official LINE and start the conversation faster.'],
    ['掃描即可加入 Richeng AI 官方 LINE。', 'Scan to join the official Richeng AI LINE.'],
    ['官方 LINE 入口', 'Official LINE Entry'],
    ['你也可以直接點按鈕前往官方 LINE，兩種方式都能快速聯繫。', 'You can also click the button to open the official LINE. Both options get you in touch quickly.'],
    ['直接前往', 'Open LINE'],
    ['10 / 服務據點', '10 / Office Locations'],
    ['直接查看各據點 Google Map', 'View each office on Google Maps'],
    ['點擊即可開啟地圖，方便你找到最近的據點。', 'Click to open the map and find the nearest office easily.'],
    ['新竹市東區關新路 27 號 2 樓之 7', '2F-7, No. 27, Guanxin Rd., East Dist., Hsinchu City'],
    ['適合需要新竹地區服務與會面安排。', 'Ideal for clients who need service or meetings in Hsinchu.'],
    ['竹北市博愛街 225 號', 'No. 225, Bo'ai St., Zhubei City, Hsinchu County'],
    ['可直接透過地圖查看位置與前往路線。', 'Check the map directly for location and directions.'],
    ['新竹縣湖口鄉新興路 366 號', 'No. 366, Xinxing Rd., Hukou Township, Hsinchu County'],
    ['適合新湖、湖口一帶的客戶直接查找。', 'Convenient for clients in Xinhu and Hukou.'],
    ['台北市內湖區瑞光路 168 號 9F', '9F, No. 168, Ruiguang Rd., Neihu Dist., Taipei City'],
    ['若你在台北，也能直接由地圖快速查看位置。', 'If you are in Taipei, you can quickly check the location on the map.'],
    ['40 年專業底子，結合 AI 讓稅務與記帳更精準。', '40 years of expertise, enhanced by AI to make tax and bookkeeping more precise.'],
    ['日晟聯合記帳士事務所自 1985 年創立以來，持續深耕公司登記、商業登記、稅務服務、記帳服務、企業諮商與其他專業服務。', 'Since 1985, Richeng Certified Tax Accountants Firm has continued to focus on company setup, business registration, tax services, bookkeeping, advisory and other professional support.'],
    ['我們希望每一位客戶都能感受到：這不是一個普通官網，而是一個能長期陪伴企業前進的專業品牌。', 'We want every client to feel this is not an ordinary website, but a professional brand that can accompany businesses for the long run.'],
    ['先填表，更快開始', 'Fill the form first to move faster'],
    ['把需求先整理好，合作就能更順暢。', 'Organize your needs first and collaboration becomes smoother.'],
    ['FAQ 50 題', 'FAQ 50 Questions'],
    ['先看常見問題，通常能更快找到答案。', 'Start with the common questions to find answers faster.']
  ];

  const pageConfig = {
    'index.html': {
      title: 'Richeng AI | Richeng Certified Tax Accountants Firm Official Website',
      description: 'Richeng AI combines 40 years of tax-accounting expertise with AI coordination to help companies with setup, registration, bookkeeping, accounting and tax services in a clearer and more precise way.',
      ogTitle: 'Richeng AI | Richeng Certified Tax Accountants Firm Official Website',
      ogDescription: 'A premium AI tax-accounting brand that brings order, clarity and precision to tax and bookkeeping services.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us'],
      brandMain: 'Richeng AI',
      brandSub: 'Richeng Certified Tax Accountants Firm',
      brandEnglish: 'Richeng Accounting Firm.',
      hero: [
        { selector: '.hero .eyebrow', text: 'Richeng Certified Tax Accountants Firm' },
        { selector: '[data-hero-title]', text: 'Making tax services more precise as they evolve' },
        { selector: '[data-hero-lead]', text: 'Richeng AI combines 40 years of accounting-firm expertise with AI logic, preserving the stability and trust of a professional firm while turning complex tax, bookkeeping, accounting and business workflows into a clearer, more precise advisory experience.' },
        { selector: '.hero-note', text: 'Black, white and gray remain the foundation, with a subtle Tiffany blue accent for identity, and a star river, meteors and halo as the symbol of continuous evolution.' }
      ],
      heroActions: ['Book a Consultation', 'View Services', 'FAQ'],
      heroStories: [
        {
          title: 'Making tax services more precise as they evolve',
          lead: 'Richeng AI combines 40 years of accounting-firm expertise with AI logic, preserving the stability and trust of a professional firm while turning complex tax, bookkeeping, accounting and business workflows into a clearer, more precise advisory experience.'
        },
        {
          title: 'Turning tax and bookkeeping from complexity into order',
          lead: 'We refine company setup, business registration, bookkeeping, tax filing and accounting-related workflows into a clearer rhythm of collaboration, so every step feels more stable and easier to follow.'
        },
        {
          title: 'Using AI and a firm foundation to make finance and tax work more stable and faster',
          lead: 'Richeng AI combines professional experience, AI logic and branded processes to align company needs, so every collaboration feels clearer, safer and more like long-term support.'
        }
      ],
      meteorStories: [
        { name: 'Leonids Meteor Shower', copy: 'Peak-night efficiency and a fast streak across the sky, ideal for showing how Richeng AI turns complex workflows into order at critical moments.' },
        { name: 'Perseids Meteor Shower', copy: 'High efficiency, speed, brightness and a long tail, like a certified tax-accounting firm turning complicated steps into a clean and agile collaboration track.' },
        { name: 'Orionids Meteor Shower', copy: 'Strong velocity and a clean visual rhythm, ideal for expressing a premium AI tax-accounting brand with a forward-looking feel.' },
        { name: 'Geminids Meteor Shower', copy: 'Stable and persistent, symbolizing the long-term support Richeng AI provides to growing businesses.' },
        { name: 'Lyrids Meteor Shower', copy: 'With a sense of history and legacy, it represents an established firm evolving into an AI-driven brand.' }
      ],
      sections: [
        ['.section .section-head .eyebrow', ['00 / Brand Story', '01 / Core Services', '02 / Evolution Path', '03 / Brand Feeling', '04 / Bookkeepers & CPAs', '05 / Workflow', '06 / FAQ', '07 / Contact']],
        ['.section .section-head h2', ['In the vast commercial universe, keep finance and tax services moving toward precision', 'Richeng AI started in 1985 and continues to evolve with AI', 'Premium, minimal and calm, yet practical and trusted', 'Core services for setup, bookkeeping, tax and advisory', 'A workflow that keeps every step clear', 'FAQ for fast answers', 'Get in touch and start the conversation']]
      ],
      footer: {
        h3: '40 years of expertise, enhanced by AI to make tax and bookkeeping more precise.',
        p: 'Since 1985, Richeng Certified Tax Accountants Firm has focused on company setup, business registration, tax services, bookkeeping, advisory and other professional support. Today, Richeng AI keeps the firm-level trust and professionalism while organizing complex workflows into a clearer, more precise and more structured advisory experience. The star river, meteors and halo symbolize continuous evolution and long-term support for businesses.',
        rail: ['www.richeng.com.tw', 'service@richeng.com.tw', 'Richeng AI Service', '+886-3-5543756'],
        links: [
          ['Services', 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support'],
          ['Archive', 'Home Demo v1 (Archive)', 'The official homepage remains www.richeng.com.tw. The archive version is for reference only and does not affect the main site SEO.'],
          ['Locations', 'Hsinchu Office', 'No. 2, Alley 7, Lane 27, Guanxin Road, East District, Hsinchu City'],
          ['Working Style', 'Clear, stable and professional for long-term collaboration'],
          ['Contact', 'Email, phone and LINE are available directly']
        ]
      }
    },
    'about.html': {
      title: 'Richeng AI | Brand Story',
      description: 'Richeng AI is built on 40 years of tax-accounting expertise, combining AI coordination with professional judgment to deliver a calmer and more precise advisory experience.',
      ogTitle: 'Richeng AI | Brand Story',
      ogDescription: 'The story of Richeng AI: a premium tax-accounting brand evolving from firm-level expertise into AI-assisted advisory.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'services.html': {
      title: 'Richeng AI | Services',
      description: 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support from Richeng AI.',
      ogTitle: 'Richeng AI | Services',
      ogDescription: 'A clear overview of Richeng AI services, built for company setup, bookkeeping, tax and advisory workflows.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'forms.html': {
      title: 'Richeng AI | Online Forms',
      description: 'Five online forms for company setup, company change, business change, bookkeeping requests and tax consultations.',
      ogTitle: 'Richeng AI | Online Forms',
      ogDescription: 'Fill out the Richeng AI forms online to get started faster and more accurately.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'faq.html': {
      title: 'Richeng AI | FAQ',
      description: 'Common questions about Richeng AI, including services, workflows, forms and contact methods.',
      ogTitle: 'Richeng AI | FAQ',
      ogDescription: 'Answers to the most common questions about Richeng AI and its tax-accounting services.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'contact.html': {
      title: 'Richeng AI | Contact',
      description: 'Contact Richeng AI through LINE, phone, email or by visiting one of our office locations.',
      ogTitle: 'Richeng AI | Contact',
      ogDescription: 'Get in touch with Richeng AI through LINE, phone, email or office visits.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    }
  };

  const setMeta = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  };

  const applyText = (selector, value, opts = {}) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (opts.html) el.innerHTML = value;
    else el.textContent = value;
  };

  const applyList = (selector, values, opts = {}) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, idx) => {
      if (values[idx] == null) return;
      if (opts.html) el.innerHTML = values[idx];
      else el.textContent = values[idx];
    });
  };

  const replaceTextNodes = (replacements) => {
    const pairs = [...replacements].sort((a, b) => b[0].length - a[0].length);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach((textNode) => {
      const parent = textNode.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) return;
      let text = textNode.nodeValue;
      for (const [zh, en] of pairs) {
        if (text.includes(zh)) text = text.split(zh).join(en);
      }
      textNode.nodeValue = text;
    });
  };

  const injectToggle = () => {
    const topbar = document.querySelector('.topbar');
    const nav = document.querySelector('.topnav');
    if (!topbar || !nav || topbar.querySelector('.lang-switch')) return;
    const current = page === 'index.html' ? 'index.html' : page;
    const homePath = (targetLang) => targetLang === 'en' ? '/en/' : '/';
    const toPath = (targetLang) => targetLang === 'en'
      ? (current === 'index.html' ? homePath('en') : `/en/${current}`)
      : (current === 'index.html' ? homePath('zh') : `/${current}`);
    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.innerHTML = `
      <a href="${toPath('zh')}" data-lang="zh">中</a>
      <span>/</span>
      <a href="${toPath('en')}" data-lang="en">EN</a>
    `;
    nav.insertAdjacentElement('afterend', wrap);
    updateToggleState();
  };

  const updateToggleState = () => {
    document.querySelectorAll('.lang-switch a').forEach((btn) => {
      const active = (btn.dataset.lang || 'zh') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const applyLanguage = () => {
    injectToggle();
    updateToggleState();
    if (lang === 'zh') return;

    const cfg = pageConfig[page] || pageConfig['index.html'];
    if (!cfg) return;

    document.documentElement.lang = 'en';
    if (cfg.title) document.title = cfg.title;
    if (cfg.description) setMeta('meta[name="description"]', cfg.description);
    if (cfg.ogTitle) setMeta('meta[property="og:title"]', cfg.ogTitle);
    if (cfg.ogDescription) setMeta('meta[property="og:description"]', cfg.ogDescription);
    if (cfg.ogTitle) setMeta('meta[name="twitter:title"]', cfg.ogTitle);
    if (cfg.ogDescription) setMeta('meta[name="twitter:description"]', cfg.ogDescription);

    if (cfg.nav) applyList('.topnav a', cfg.nav);
    applyText('.brand-copy strong', cfg.brandMain || 'Richeng AI');
    const brandSpans = document.querySelectorAll('.brand-copy span');
    if (brandSpans[0]) brandSpans[0].textContent = cfg.brandSub || 'Richeng Certified Tax Accountants Firm';
    if (brandSpans[1]) brandSpans[1].textContent = cfg.brandEnglish || 'Richeng Accounting Firm.';

    if (page === 'index.html') {
      cfg.hero.forEach(({ selector, text }) => applyText(selector, text));
      applyList('.hero-actions .btn', cfg.heroActions);
      applyList('.section .section-head .eyebrow', cfg.sections[0][1]);
      applyList('.section .section-head h2', cfg.sections[1][1]);
      applyText('.footer-copy h3', cfg.footer.h3);
      applyText('.footer-copy p', cfg.footer.p);
      applyList('.footer-rail span', cfg.footer.rail);
      applyList('.footer-links .footer-link strong', cfg.footer.links.map((item) => item[0]));
      const footerLinks = document.querySelectorAll('.footer-links .footer-link, .footer-links .location-card');
      footerLinks.forEach((card, idx) => {
        const info = cfg.footer.links[idx];
        if (!info) return;
        const title = card.querySelector('strong, h3');
        const body = card.querySelector('p, .footer-legacy-note, span:not(.tag)');
        if (title) title.textContent = info[1] || info[0];
        if (body && info[2]) body.textContent = info[2];
      });
      replaceTextNodes(commonReplacements);
      const stories = cfg.heroStories;
      if (stories && window.RichengIndexHeroStories) {
        window.RichengIndexHeroStories = stories;
      }
      const meteorStories = cfg.meteorStories;
      if (meteorStories && window.RichengIndexMeteorStories) {
        window.RichengIndexMeteorStories = meteorStories;
      }
    } else {
      // Generic, light-touch translations for the other pages.
      replaceTextNodes(commonReplacements);
    }
  };

  injectToggle();
  applyLanguage();
})();
