"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "zh" | "en";
type Bilingual = { zh: string; en: string };

const pick = (lang: Lang, value: Bilingual) => value[lang];

const navItems: Array<{ label: Bilingual; href: string }> = [
  { label: { zh: "产品与服务", en: "Products" }, href: "#products" },
  { label: { zh: "动态资讯", en: "News" }, href: "#news" },
  { label: { zh: "信息披露", en: "Disclosure" }, href: "#disclosure" },
  { label: { zh: "关于我们", en: "About" }, href: "#about" },
  { label: { zh: "加入我们", en: "Careers" }, href: "#careers" },
];

const methodology = [
  {
    index: "01",
    enLabel: "SCIENCE",
    title: { zh: "从规律出发", en: "Start with first principles" },
    description: {
      zh: "以数理建模、统计工具与因果关系研究为底座，寻找可解释、可验证的市场规律。",
      en: "We use mathematical modeling, statistics and causal research to find explainable, testable market patterns.",
    },
    tone: "cyan",
  },
  {
    index: "02",
    enLabel: "TECHNOLOGY",
    title: { zh: "让研究规模化", en: "Scale rigorous research" },
    description: {
      zh: "机器学习、模型与因子协同工作，将研究假设转化为持续迭代的系统能力。",
      en: "Machine learning, models and factors turn research hypotheses into a continuously evolving system.",
    },
    tone: "violet",
  },
  {
    index: "03",
    enLabel: "FINANCE",
    title: { zh: "让策略可投资", en: "Make research investable" },
    description: {
      zh: "从组合构建、风险规划到交易执行，把研究优势转化为稳定、可复现的投资过程。",
      en: "Portfolio construction, risk planning and execution convert research into a repeatable investment process.",
    },
    tone: "blue",
  },
  {
    index: "04",
    enLabel: "ART",
    title: { zh: "理解不确定性", en: "Understand uncertainty" },
    description: {
      zh: "对价值、优雅与人性的长期思考，让模型保持对未知的敬畏与适应力。",
      en: "Long-term thinking about value, elegance and human behavior keeps our models adaptive and humble.",
    },
    tone: "lime",
  },
];

const productItems = [
  {
    code: "INDEX+",
    title: { zh: "量化指数增强", en: "Quantitative Index Enhancement" },
    description: {
      zh: "在控制相对基准风险的基础上，通过多维度 Alpha 信号与组合优化，力争获取长期超额收益。",
      en: "Multi-dimensional alpha signals and portfolio optimization seek long-term excess return while managing benchmark-relative risk.",
    },
    detail: { zh: "覆盖多类主流宽基指数", en: "Major broad-based indices" },
  },
  {
    code: "LONG",
    title: { zh: "量化多头", en: "Quantitative Long-only" },
    description: {
      zh: "通过量化预测模型对股票进行排序与组合，在分散持仓中表达对优质资产的长期判断。",
      en: "Quantitative forecasting ranks and combines stocks to express long-term views through diversified portfolios.",
    },
    detail: { zh: "全市场选股与分散配置", en: "Broad selection and diversification" },
  },
  {
    code: "HEDGE",
    title: { zh: "灵活对冲", en: "Flexible Hedging" },
    description: {
      zh: "组合多类 Alpha 信号，并通过股指期货及相关衍生工具管理市场敞口与组合波动。",
      en: "Multiple alpha signals combine with index futures and related instruments to manage market exposure and volatility.",
    },
    detail: { zh: "风险预算与敞口管理", en: "Risk budgets and exposure control" },
  },
];

const engineSteps = [
  {
    code: "FACTOR GRAPH",
    title: { zh: "因子开发", en: "Factor Research" },
    description: {
      zh: "从金融逻辑构建底层因子，以同行审议与多维检验持续筛选有效信号。",
      en: "Financial logic informs factor design, while peer review and multi-dimensional tests validate signals.",
    },
    meta: "Logic first",
  },
  {
    code: "AUTOQUANT",
    title: { zh: "模型实验", en: "Model Experiments" },
    description: {
      zh: "自动化搜索模型结构与参数，批量训练、回测、比较，提升研究迭代效率。",
      en: "Automated model and parameter search enables large-scale training, backtesting and comparison.",
    },
    meta: "Research at scale",
  },
  {
    code: "RISK PLANNER",
    title: { zh: "组合与风控", en: "Portfolio & Risk" },
    description: {
      zh: "组合多模型信号，监控风格暴露与换仓成本，在目标与约束之间动态规划。",
      en: "Multi-model signals are balanced against style exposures, turnover costs and portfolio constraints.",
    },
    meta: "Robust by design",
  },
  {
    code: "EXECUTION",
    title: { zh: "交易执行", en: "Execution" },
    description: {
      zh: "自研交易算法与实时监控系统协同，让每一次策略表达更高效、更准确。",
      en: "Proprietary algorithms and real-time monitoring make every strategy expression more efficient and precise.",
    },
    meta: "Precision matters",
  },
];

const milestones = [
  {
    year: "2019",
    title: { zh: "超量子基金成立", en: "Super Quantum founded" },
    description: { zh: "深圳总部成立，系统化量化研究正式启航。", en: "Shenzhen headquarters established and systematic quant research launched." },
  },
  {
    year: "2020",
    title: { zh: "完成管理人登记", en: "AMAC registration" },
    description: { zh: "登记为私募证券投资基金管理人。", en: "Registered with AMAC as a private securities fund manager." },
  },
  {
    year: "2021",
    title: { zh: "北京研究中心", en: "Beijing research hub" },
    description: { zh: "进一步扩展基础研究与跨学科人才布局。", en: "Expanded fundamental research and interdisciplinary talent coverage." },
  },
  {
    year: "2022",
    title: { zh: "香港业务中心", en: "Hong Kong presence" },
    description: { zh: "香港主体取得资产管理第 9 类牌照。", en: "Hong Kong entity received the Type 9 asset management license." },
  },
  {
    year: "2025",
    title: { zh: "行业长期认可", en: "Long-term recognition" },
    description: { zh: "荣获三年期金牛私募管理公司奖。", en: "Received the Three-year Golden Bull Private Fund Manager award." },
  },
  {
    year: "2026",
    title: { zh: "聚焦底层基础研究", en: "Focus on foundational research" },
    description: { zh: "围绕 AI、因果关系与市场不确定性持续探索。", en: "Continued exploration in AI, causality and market uncertainty." },
  },
];

const newsItems = [
  {
    date: "2026.06.22",
    source: { zh: "中国证券报 · 中证网", en: "China Securities Journal" },
    title: {
      zh: "超量子基金创始人张晓泉：深耕底层基础研究，打造量化投资新范式",
      en: "Michael Zhang: Building a new quant paradigm through foundational research",
    },
    description: {
      zh: "将数据驱动与理论驱动结合，从相关性走向因果关系，理解市场运行的底层机制。",
      en: "Combining data-driven and theory-driven research to move from correlation toward causality.",
    },
    href: "https://www.cs.com.cn/tzjj/01/2026/06/22/detail_2026062210019454.html",
    featured: true,
  },
  {
    date: "2026.06.11",
    source: { zh: "中国证券报 · 中证网", en: "China Securities Journal" },
    title: {
      zh: "超量子基金张晓泉：从“计算者”到“策划者”，AI 重塑量化投资底层逻辑",
      en: "From calculator to architect: how AI reshapes the foundations of quantitative investing",
    },
    description: {
      zh: "当 AI 接管更多具体计算工作，人的方向感、研究品味与判断力变得更加重要。",
      en: "As AI takes on more computation, human direction, research taste and judgment become more important.",
    },
    href: "https://mp.weixin.qq.com/s/XFgx6A5dvBTkTrX0iyDEoQ",
    featured: true,
  },
  {
    date: "2025.12.22",
    source: { zh: "公司公告", en: "Company Notice" },
    title: { zh: "关于公司名称、经营范围及注册地址变更的通知", en: "Notice on changes to company name, business scope and registered address" },
    description: { zh: "因业务发展需要，公司完成工商变更登记。", en: "Corporate registration updates completed in line with business development." },
    href: "https://mp.weixin.qq.com/s/plAnUnGdr4d8YT3GA6Ed5A?scene=1",
  },
  {
    date: "2025.10.15",
    source: { zh: "公司荣誉", en: "Recognition" },
    title: { zh: "超量子基金荣获三年期金牛私募管理公司奖", en: "Super Quantum receives the Three-year Golden Bull Private Fund Manager award" },
    description: { zh: "第十六届中国私募金牛奖评选结果正式揭晓。", en: "Results of the 16th China Private Fund Golden Bull Awards were announced." },
    href: "https://mp.weixin.qq.com/s/6jjTZWFCQQ9WSq5U_dOp0g?scene=1",
  },
  {
    date: "2024.06.18",
    source: { zh: "研究观点", en: "Viewpoint" },
    title: { zh: "微盘股今年已经三次暴跌，此类策略未来会怎么样？", en: "After three micro-cap selloffs, what comes next for the strategy?" },
    description: { zh: "从市场冲击出发，讨论小微盘策略的结构性风险。", en: "A discussion of structural risks in micro-cap strategies after major market shocks." },
    href: "https://mp.weixin.qq.com/s/_zaSlJV0zQ0iZmylzLBHfg",
  },
  {
    date: "2024.06.14",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "发生战争时股市一定跌吗？", en: "Do equity markets always fall during wars?" },
    description: { zh: "回看战争、经济与资本市场之间的复杂关系。", en: "A historical look at the complex links between conflict, economies and markets." },
    href: "https://mp.weixin.qq.com/s/5Y8eUMsfHyajxm1zlub52g",
  },
  {
    date: "2024.04.03",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "好的投资者让投资变得更加困难？", en: "Do better investors make investing more difficult?" },
    description: { zh: "从市场效率与投资者行为出发，思考长期投资机会。", en: "A reflection on market efficiency, behavior and long-term opportunity." },
    href: "https://mp.weixin.qq.com/s/tFYCEZvsZrfWmSFSrbnUYg",
  },
  {
    date: "2024.03.11",
    source: { zh: "风控研究", en: "Risk Research" },
    title: { zh: "投资中的风险、不确定性和无知", en: "Risk, uncertainty and ignorance in investing" },
    description: { zh: "不写公式，讲清超量子如何理解分布不确定性与风控。", en: "An accessible explanation of distributional uncertainty and risk control." },
    href: "https://mp.weixin.qq.com/s/I9nFNX-YfKKF4inX4DWcRw",
  },
  {
    date: "2024.03.06",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "投资中的“傲慢”与“偏见”", en: "Hubris and bias in investing" },
    description: { zh: "情绪如何塑造判断，又如何成为市场不完美的来源。", en: "How emotion shapes judgment and contributes to market imperfections." },
    href: "https://mp.weixin.qq.com/s/e2VexWnAn50ggkim_yDVhA",
  },
  {
    date: "2024.02.22",
    source: { zh: "量化研究", en: "Quant Research" },
    title: { zh: "能用量化的思维来解读巴菲特吗？", en: "Can Buffett be understood through a quantitative lens?" },
    description: { zh: "以实证方法研究经典投资风格与超额收益来源。", en: "An empirical view of classic investment styles and sources of excess return." },
    href: "https://mp.weixin.qq.com/s/VB6bc-4pEix9l0-dcmMaww",
  },
  {
    date: "2024.02.07",
    source: { zh: "量化研究", en: "Quant Research" },
    title: { zh: "科学地理解巴菲特、索罗斯、林奇和格罗斯的投资风格", en: "A scientific view of Buffett, Soros, Lynch and Gross" },
    description: { zh: "用量化证据拆解不同投资大师的风格特征。", en: "Quantitative evidence behind the distinct styles of four investment legends." },
    href: "https://mp.weixin.qq.com/s/ZV4uiM4UUdwwqHTZXJZdLw",
  },
];

const disclosures = [
  {
    year: "2025",
    title: { zh: "2025 年度环境信息披露报告", en: "2025 Environmental Information Disclosure Report" },
    href: "https://superquant.fund/pdf/disclosure1.pdf",
  },
  {
    year: "2024",
    title: { zh: "2024 年度环境信息披露报告", en: "2024 Environmental Information Disclosure Report" },
    href: "https://superquant.fund/pdf/disclosure.pdf",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("zh");
  const [qualified, setQualified] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const tr = (zh: string, en: string) => (lang === "zh" ? zh : en);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setQualified(sessionStorage.getItem("sq-qualified-investor-v2") === "accepted");
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = qualified ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [qualified]);

  const acceptInvestorNotice = () => {
    sessionStorage.setItem("sq-qualified-investor-v2", "accepted");
    setQualified(true);
  };

  const onHeroMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroRef.current?.style.setProperty("--pointer-x", `${x}%`);
    heroRef.current?.style.setProperty("--pointer-y", `${y}%`);
  };

  return (
    <main>
      {!qualified && (
        <div className="investor-gate" role="dialog" aria-modal="true" aria-labelledby="investor-gate-title">
          <div className="gate-card">
            <div className="gate-header">
              <div>
                <small>QUALIFIED INVESTOR NOTICE</small>
                <h2 id="investor-gate-title">{tr("合格投资者认定", "Qualified Investor Confirmation")}</h2>
              </div>
              <button className="gate-language" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
                {lang === "zh" ? "EN" : "中文"}
              </button>
            </div>

            <div className="gate-scroll">
              {lang === "zh" ? (
                <>
                  <p><strong>重要提示：</strong>在继续浏览本网站前，请确认您或您所代表的机构符合“合格投资者”标准，并仔细阅读以下说明。</p>
                  <h3>一、合格投资者标准</h3>
                  <p>具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于人民币 100 万元，并符合以下相关标准之一：</p>
                  <ol>
                    <li>净资产不低于人民币 1,000 万元的单位；</li>
                    <li>金融资产不低于人民币 300 万元，或者最近三年个人年均收入不低于人民币 50 万元的个人。</li>
                  </ol>
                  <h3>二、视为合格投资者的情形</h3>
                  <ol>
                    <li>社会保障基金、企业年金等养老基金及社会公益基金；</li>
                    <li>依法设立并在基金业协会备案的投资计划；</li>
                    <li>投资于所管理私募基金的私募基金管理人及其从业人员；</li>
                    <li>中国证监会规定的其他投资者。</li>
                  </ol>
                  <h3>风险声明</h3>
                  <p>本网站所载信息仅供参考，不构成广告、销售要约、投资建议或收益承诺。投资涉及风险，产品净值及收益可能上涨或下跌，过往业绩不预示未来表现。投资者应阅读相关基金合同及产品资料，并根据自身风险承受能力独立作出投资决策。</p>
                </>
              ) : (
                <>
                  <p><strong>Important:</strong> Before entering this website, please confirm that you or the institution you represent qualifies as a professional or qualified investor and read the notice below.</p>
                  <h3>1. Qualified investor criteria</h3>
                  <p>A qualified investor must be able to identify and bear investment risks, invest no less than RMB 1 million in a single private fund, and meet one of the following:</p>
                  <ol>
                    <li>An institution with net assets of at least RMB 10 million;</li>
                    <li>An individual with financial assets of at least RMB 3 million or average annual income of at least RMB 500,000 over the past three years.</li>
                  </ol>
                  <h3>2. Investors deemed qualified</h3>
                  <ol>
                    <li>Social security, corporate annuity, pension and charitable funds;</li>
                    <li>Investment plans duly established and filed with AMAC;</li>
                    <li>Private fund managers and employees investing in funds they manage;</li>
                    <li>Other investors recognized by the CSRC.</li>
                  </ol>
                  <h3>Risk statement</h3>
                  <p>Information on this website is for reference only and is not an advertisement, offer, investment recommendation or return guarantee. Investments involve risk. Past performance is not indicative of future results.</p>
                </>
              )}
            </div>

            <label className="gate-check">
              <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
              <span>{tr("我已阅读并确认符合合格投资者标准", "I have read this notice and confirm that I qualify")}</span>
            </label>
            <div className="gate-actions">
              <a href="https://www.amac.org.cn/">{tr("暂不进入", "Leave site")}</a>
              <button type="button" disabled={!confirmed} onClick={acceptInvestorNotice}>
                {tr("接受并进入网站", "Accept and enter")} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label={tr("超量子基金首页", "Super Quantum home")}>
          <img src="/superquant-logo.png" alt="SUPER QUANTUM 超量子基金" />
        </a>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label={tr("主导航", "Main navigation")}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {pick(lang, item.label)}
            </a>
          ))}
          <button className="lang-toggle" type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} aria-label={tr("切换至英文", "Switch to Chinese")}>
            {lang === "zh" ? "中 / EN" : "EN / 中"}
          </button>
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
            {tr("联系我们", "Contact")} <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button className="menu-button" type="button" aria-label={menuOpen ? tr("关闭导航", "Close menu") : tr("打开导航", "Open menu")} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
      </header>

      <section id="top" ref={heroRef} className="hero" onPointerMove={onHeroMove}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="signal-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <i key={index} style={{ "--i": index, left: `${(index * 47) % 96}%`, top: `${((index * 31) % 88) + 4}%` } as React.CSSProperties} />
          ))}
        </div>

        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow reveal-up">SUPER QUANTUM · QUANTITATIVE RESEARCH</p>
            <h1 className="reveal-up delay-1">
              {tr("让模型理解市场", "Models that understand markets")}
              <br />
              <span>{tr("让投资回应不确定性", "Investing for uncertainty")}</span>
            </h1>
            <p className="hero-lead reveal-up delay-2">
              {tr("我们用金融逻辑定义问题，以数理科学寻找规律，", "We frame questions with financial logic and seek patterns through mathematical science,")}
              <br className="desktop-only" />
              {tr("再用机器智能与工程系统，将研究转化为长期投资能力。", "then use machine intelligence and engineering to turn research into enduring investment capability.")}
            </p>
            <div className="hero-actions reveal-up delay-3">
              <a className="primary-button" href="#products">{tr("探索产品与服务", "Explore our strategies")} <span aria-hidden="true">↓</span></a>
              <a className="text-button" href="#about">{tr("认识超量子", "About Super Quantum")} <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-system" aria-label={tr("超量子投研系统示意", "Super Quantum research system")}>
            <div className="system-orbit orbit-one" /><div className="system-orbit orbit-two" />
            <div className="system-core"><span>SQ</span><small>RESEARCH CORE</small></div>
            <div className="system-node node-a"><small>FACTOR LIBRARY</small><strong>Logic</strong></div>
            <div className="system-node node-b"><small>MODEL SEARCH</small><strong>AutoQuant</strong></div>
            <div className="system-node node-c"><small>RISK LAYER</small><strong>Robustness</strong></div>
            <div className="system-ticker"><span>LIVE RESEARCH STREAM</span><b>FACTOR → MODEL → RISK → EXECUTION</b></div>
          </div>
        </div>

        <div className="hero-foot shell">
          <div><span>01</span> SCIENCE</div><div><span>02</span> TECHNOLOGY</div><div><span>03</span> FINANCE</div><div><span>04</span> ART</div>
        </div>
      </section>

      <section id="products" className="products-section section-light">
        <div className="shell">
          <div className="section-kicker dark">PRODUCTS & SERVICES</div>
          <div className="products-heading">
            <h2>{tr("多元策略，", "Multiple strategies,")}<br /><span>{tr("回应不同投资目标。", "one research foundation.")}</span></h2>
            <div>
              <p>{tr("超量子基金具有量化指数增强、量化多头、灵活对冲等多系列产品，满足投资者不同风险偏好的需求。", "Our quantitative index enhancement, long-only and flexible hedging strategies are designed for different investor objectives and risk preferences.")}</p>
              <a href="mailto:service@superquant.fund?subject=产品与服务咨询">{tr("咨询产品与服务", "Product enquiries")} ↗</a>
            </div>
          </div>
          <div className="product-grid">
            {productItems.map((item, index) => (
              <article className="product-card" key={item.code}>
                <div className="product-card-top"><span>0{index + 1}</span><small>{item.code}</small></div>
                <div className="product-signal" aria-hidden="true"><i /><i /><i /><i /></div>
                <h3>{pick(lang, item.title)}</h3>
                <p>{pick(lang, item.description)}</p>
                <strong>{pick(lang, item.detail)}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section-light">
        <div className="shell">
          <div className="section-kicker dark">ABOUT SUPER QUANTUM</div>
          <div className="about-heading">
            <h2>{tr("用科学，", "Genuine science,")}<br /><span>{tr("重构主动管理。", "applied to investing.")}</span></h2>
            <div className="about-copy">
              <p className="lead">{tr("超量子基金是一家以研究驱动的量化基金管理公司，聚焦中低频股票 Alpha 策略，为投资者提供指数增强及中性对冲产品。", "Super Quantum is a research-driven quantitative asset manager focused on medium- and low-frequency equity alpha, index enhancement and market-neutral strategies.")}</p>
              <p>{tr("我们相信，量化投资的终点不是更复杂的模型，而是对市场规律更深的理解。深厚的学术研究、可持续的工程系统与对风险的敬畏，共同构成超量子的投资方法。", "We believe quantitative investing is not ultimately about more complex models, but deeper market understanding. Academic rigor, scalable systems and respect for risk define our approach.")}</p>
            </div>
          </div>
          <div className="public-facts">
            <div className="fact-card"><strong>30<sup>+</sup></strong><span>{tr("研发团队成员", "Research professionals")}</span><p>{tr("研究、算法、风控、交易与系统工程协同", "Research, algorithms, risk, trading and engineering")}</p></div>
            <div className="fact-card"><strong>10<sup>+</sup></strong><span>{tr("海内外高校博士", "PhD researchers")}</span><p>{tr("多元学科背景，连接学术前沿与市场实践", "Interdisciplinary talent connecting academia and markets")}</p></div>
            <div className="fact-card"><strong>4<sup>{tr("地", "HUBS")}</sup></strong><span>{tr("基础设施矩阵", "Infrastructure network")}</span><p>{tr("北上深港协同部署，支撑稳定研究与交易", "Beijing, Shanghai, Shenzhen and Hong Kong")}</p></div>
            <div className="fact-card recognition-card"><small>INDUSTRY RECOGNITION</small><span>{tr("三年期金牛私募管理公司", "Three-year Golden Bull Private Fund Manager")}</span><p>{tr("研究能力与长期实践获得行业认可", "Recognition for long-term research and practice")}</p></div>
          </div>
        </div>
      </section>

      <section className="milestones-section">
        <div className="shell">
          <div className="section-kicker">KEY MILESTONES</div>
          <div className="milestones-heading"><h2>{tr("关键节点", "Milestones")}</h2><p>{tr("从研究出发，在长期实践中构建完整的量化投资能力。", "Building a complete quantitative investment capability through long-term research and practice.")}</p></div>
          <div className="timeline">
            {milestones.map((item) => (
              <article key={item.year} className="timeline-item">
                <div className="timeline-year">{item.year}</div><i aria-hidden="true" />
                <h3>{pick(lang, item.title)}</h3><p>{pick(lang, item.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section">
        <div className="shell">
          <div className="section-kicker">FAST · OUR METHODOLOGY</div>
          <div className="method-intro">
            <h2>{tr("一套完整的方法，", "A complete methodology")}<br />{tr("面对一个不断变化的市场。", "for a changing market.")}</h2>
            <p>{tr("演绎与归纳相互校验，研究与工程彼此增强。我们把投资看作一套持续进化的认知系统。", "Deduction and induction check each other; research and engineering reinforce one another. We see investing as an evolving cognitive system.")}</p>
          </div>
          <div className="method-grid">
            {methodology.map((item) => (
              <article key={item.index} className={`method-card tone-${item.tone}`}>
                <div className="method-number">{item.index}</div><div className="method-visual" aria-hidden="true"><span /></div>
                <small>{item.enLabel}</small><h3>{pick(lang, item.title)}</h3><p>{pick(lang, item.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="engine" className="engine-section">
        <div className="engine-backdrop" aria-hidden="true" />
        <div className="shell">
          <div className="section-kicker">THE RESEARCH ENGINE</div>
          <div className="engine-heading">
            <h2>{tr("从一个好问题，", "From a good question")}<br />{tr("到一次精确表达。", "to a precise expression.")}</h2>
            <p>{tr("超量子投研系统把研究、模型、风险与执行连接成一条可复用、可追踪、可持续迭代的链路。", "Our research system connects factors, models, risk and execution into one traceable and continuously improving workflow.")}</p>
          </div>
          <div className="engine-pipeline">
            {engineSteps.map((step, index) => (
              <article key={step.code} className="engine-step">
                <div className="step-topline"><span>0{index + 1}</span><small>{step.code}</small></div><div className="step-pulse" aria-hidden="true"><i /></div>
                <h3>{pick(lang, step.title)}</h3><p>{pick(lang, step.description)}</p><strong>{step.meta}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="news-section section-light">
        <div className="shell">
          <div className="news-heading">
            <div><div className="section-kicker dark">NEWS & INSIGHTS</div><h2>{tr("动态资讯", "News & Insights")}</h2></div>
            <p>{tr("保留原官网全部研究观点与公司动态，并持续更新公开报道。", "Company updates, published research and media coverage from Super Quantum.")}</p>
          </div>
          <div className="news-grid">
            {newsItems.map((item) => (
              <a className={`news-card ${item.featured ? "is-featured" : ""}`} key={item.href} href={item.href} target="_blank" rel="noreferrer">
                <div className="news-meta"><span>{item.date}</span><small>{pick(lang, item.source)}</small></div>
                <h3>{pick(lang, item.title)}</h3><p>{pick(lang, item.description)}</p>
                <span className="news-link">{tr("阅读全文", "Read article")} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="disclosure" className="disclosure-section">
        <div className="shell disclosure-layout">
          <div>
            <div className="section-kicker">INFORMATION DISCLOSURE</div>
            <h2>{tr("信息披露", "Information Disclosure")}</h2>
            <p>{tr("查看深圳市超量子私募证券基金管理有限公司公开披露文件。", "Public disclosure documents of Shenzhen Super Quantum Private Securities Fund Management Co., Ltd.")}</p>
          </div>
          <div className="disclosure-list">
            {disclosures.map((item) => (
              <a key={item.year} href={item.href} target="_blank" rel="noreferrer">
                <span>{item.year}</span><strong>{pick(lang, item.title)}</strong><i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="careers-section section-light">
        <div className="shell careers-layout">
          <div className="careers-copy">
            <div className="section-kicker dark">JOIN SUPER QUANTUM</div>
            <h2>{tr("和聪明的人一起，", "Work with curious minds,")}<br /><span>{tr("研究真正困难的问题。", "on genuinely hard problems.")}</span></h2>
            <p>{tr("我们长期寻找对数学、机器学习、金融市场和复杂系统保持好奇的人。研究员、算法工程师、交易系统与基础设施岗位持续开放。", "We are always looking for people curious about mathematics, machine learning, financial markets and complex systems. Research, algorithms, trading systems and infrastructure roles remain open.")}</p>
            <a className="outline-button" href="mailto:service@superquant.fund?subject=超量子基金职位申请">{tr("投递简历", "Send your CV")} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="career-poster">
            <div className="poster-grid" aria-hidden="true" />
            <small>LATEST OPENINGS · 2026</small>
            <strong>{tr("招聘海报", "CAREERS")}</strong>
            <p>{tr("最新招聘海报将在此更新", "Latest recruitment poster coming soon")}</p>
            <div className="poster-roles"><span>RESEARCH</span><span>ML / AI</span><span>ENGINEERING</span><span>TRADING</span></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orb orb-a" aria-hidden="true" /><div className="contact-orb orb-b" aria-hidden="true" />
        <div className="shell contact-inner">
          <div className="section-kicker">CONNECT WITH US</div>
          <h2>{tr("一起，理解市场的下一种可能。", "Explore what markets can become.")}</h2>
          <p>{tr("机构合作、产品咨询与人才加入，欢迎与超量子团队联系。", "For institutional partnerships, product enquiries and careers, connect with our team.")}</p>
          <a className="contact-link" href="mailto:service@superquant.fund">service@superquant.fund <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand"><img src="/superquant-logo.png" alt="SUPER QUANTUM 超量子基金" /><p>{tr("智能重构金融世界", "RETHINKING FINANCE WITH INTELLIGENCE")}</p></div>
          <div className="footer-links">{navItems.map((item) => <a key={item.href} href={item.href}>{pick(lang, item.label)}</a>)}</div>
          <a className="back-top" href="#top">{tr("回到顶部", "BACK TO TOP")} ↑</a>
        </div>
        <div className="shell footer-legal">
          <p>{tr("风险提示：投资有风险，过往业绩不预示未来表现。本网站内容仅作公司及投研理念展示，不构成任何投资建议或收益承诺。", "Risk notice: Investments involve risk and past performance does not indicate future results. This website is for corporate and research information only and does not constitute investment advice or a return guarantee.")}</p>
          <span>© {new Date().getFullYear()} {tr("深圳市超量子私募证券基金管理有限公司", "Shenzhen Super Quantum Private Securities Fund Management Co., Ltd.")}</span>
        </div>
      </footer>
    </main>
  );
}
