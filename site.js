(() => {
  const STORAGE_KEY = 'richeng-lang';
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const explicitLang = new URLSearchParams(location.search).get('lang');
  const savedLang = localStorage.getItem(STORAGE_KEY);
  const lang = explicitLang === 'en' || explicitLang === 'zh'
    ? explicitLang
    : (savedLang === 'en' ? 'en' : 'zh');

  if (explicitLang === 'en' || explicitLang === 'zh') {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  window.RichengLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';

  const toggleText = {
    zh: { on: '中', off: 'EN' },
    en: { on: 'EN', off: '中' }
  };

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
    ['先填表，再加快處理', 'Fill the form first to speed things up']
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
    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.innerHTML = `
      <button type="button" data-lang="zh">中</button>
      <span>/</span>
      <button type="button" data-lang="en">EN</button>
    `;
    nav.insertAdjacentElement('afterend', wrap);
    wrap.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, btn.dataset.lang || 'zh');
        location.reload();
      });
    });
    updateToggleState();
  };

  const updateToggleState = () => {
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
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
