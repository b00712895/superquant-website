"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "zh" | "en";
type Bilingual = { zh: string; en: string };
type NewsCategory = "company" | "media" | "research" | "announcement";

const pick = (lang: Lang, value: Bilingual) => value[lang];

const navItems: Array<{ label: Bilingual; href: string }> = [
  { label: { zh: "首页", en: "Home" }, href: "#top" },
  { label: { zh: "关于我们", en: "About" }, href: "#about" },
  { label: { zh: "产品与服务", en: "Products" }, href: "#products" },
  { label: { zh: "动态资讯", en: "News" }, href: "#news" },
  { label: { zh: "加入我们", en: "Careers" }, href: "#careers" },
  { label: { zh: "联系我们", en: "Contact" }, href: "#contact" },
];

const newsFilters: Array<{ key: "all" | NewsCategory | "disclosure"; label: Bilingual }> = [
  { key: "all", label: { zh: "全部", en: "All" } },
  { key: "company", label: { zh: "公司动态", en: "Company" } },
  { key: "media", label: { zh: "媒体报道", en: "Media" } },
  { key: "research", label: { zh: "研究观点", en: "Research" } },
  { key: "announcement", label: { zh: "公司公告", en: "Announcements" } },
  { key: "disclosure", label: { zh: "信息披露", en: "Disclosure" } },
];

const methodology = [
  {
    index: "01",
    enLabel: "FINANCIAL MODELING",
    title: { zh: "金融建模", en: "Financial Modeling" },
    description: {
      zh: "以金融逻辑定义问题，把市场机制、资产定价与风险收益关系转化为可验证的研究假设。",
      en: "Financial logic frames the problem, translating market mechanisms, asset pricing and risk-return relationships into testable hypotheses.",
    },
    tone: "blue",
  },
  {
    index: "02",
    enLabel: "ARTFUL INVESTMENT",
    title: { zh: "投资艺术", en: "Artful Investment" },
    description: {
      zh: "理解市场参与者、制度与不确定性，在模型之外保留对价值、判断与适应性的长期思考。",
      en: "We study participants, institutions and uncertainty, preserving judgment, value and adaptability beyond the model.",
    },
    tone: "lime",
  },
  {
    index: "03",
    enLabel: "SCIENTIFIC RESEARCH",
    title: { zh: "科学研究", en: "Scientific Research" },
    description: {
      zh: "以数理建模、统计工具与因果研究寻找可解释、可证伪、可复现的市场规律。",
      en: "Mathematical modeling, statistics and causal research seek explainable, falsifiable and reproducible market patterns.",
    },
    tone: "cyan",
  },
  {
    index: "04",
    enLabel: "TECHNOLOGY BREAKTHROUGHS",
    title: { zh: "技术突破", en: "Technology Breakthroughs" },
    description: {
      zh: "机器学习、模型训练与工程系统协同，把研究假设转化为可规模化、可持续迭代的投资能力。",
      en: "Machine learning, model training and engineering turn research hypotheses into scalable, continuously improving investment capability.",
    },
    tone: "violet",
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
    code: "A-SHARE DATA",
    title: { zh: "A 股大数据", en: "A-share Data" },
    description: {
      zh: "从金融逻辑出发，以数据挖掘持续构建因子图谱和知识体系。",
      en: "Financial logic and data mining continuously expand our factor graph and knowledge system.",
    },
    bullets: [
      { zh: "研究与挖掘数万个因子，涵盖技术面、基本面、舆情等多维信息", en: "Tens of thousands of factors across technical, fundamental and sentiment dimensions" },
      { zh: "深圳、北京、上海、香港多地部署与灾备，保障数据安全和系统稳定", en: "Multi-site deployment and resilience across Shenzhen, Beijing, Shanghai and Hong Kong" },
    ],
    meta: "DATA FOUNDATION",
  },
  {
    code: "MODEL TRAINING",
    title: { zh: "模型训练系统", en: "Model Training" },
    description: {
      zh: "自研深度学习与机器学习算法，让研究假设得到高效验证。",
      en: "Proprietary deep-learning and machine-learning algorithms efficiently test research hypotheses.",
    },
    bullets: [
      { zh: "批量模型训练、回测与比较，提升研究迭代效率", en: "Large-scale model training, backtesting and comparison" },
      { zh: "多模型与多算法融合，提升策略稳健性", en: "Multi-model and multi-algorithm fusion for greater robustness" },
    ],
    meta: "RESEARCH AT SCALE",
  },
  {
    code: "AUTOMATED EXECUTION",
    title: { zh: "自动化交易系统", en: "Automated Execution" },
    description: {
      zh: "自研交易算法与实时监控协同，降低交易成本并提升策略表达效率。",
      en: "Proprietary execution algorithms and real-time monitoring reduce costs and improve strategy expression.",
    },
    bullets: [
      { zh: "高并发、多线程交易系统，快速响应市场变化", en: "High-concurrency, multi-threaded systems respond quickly to market changes" },
      { zh: "实时监控持仓、资金与账户状态", en: "Real-time monitoring of positions, capital and accounts" },
    ],
    meta: "PRECISION MATTERS",
  },
  {
    code: "RISK CONTROL",
    title: { zh: "风控系统", en: "Risk Control" },
    description: {
      zh: "将程序化交易、分散投资与风险规划嵌入投资全过程。",
      en: "Programmatic trading, diversification and risk planning are embedded throughout the investment process.",
    },
    bullets: [
      { zh: "严格的风险因子规划与组合约束", en: "Rigorous risk-factor planning and portfolio constraints" },
      { zh: "以系统纪律降低主观偏差，守住投资边界", en: "Systematic discipline reduces subjective bias and protects investment boundaries" },
    ],
    meta: "ROBUST BY DESIGN",
  },
];

const milestones = [
  {
    year: "1994",
    title: { zh: "研究构想萌芽", en: "The research idea begins" },
    description: { zh: "张晓泉教授开始构想如何将数理统计模型与机器学习应用于金融市场交易。", en: "Professor Michael Zhang began exploring how statistical models and machine learning could be applied to financial markets." },
  },
  {
    year: "2015",
    title: { zh: "组建创始团队", en: "Founding team formed" },
    description: { zh: "构建统计研究工具，开发面向 A 股市场的量化交易策略。", en: "The founding team built statistical research tools and developed quantitative strategies for China A-shares." },
  },
  {
    year: "2020",
    title: { zh: "完成管理人登记", en: "AMAC registration" },
    description: { zh: "登记为私募证券投资基金管理人，同年发行首只指数增强型量化基金。", en: "Registered with AMAC as a private securities fund manager and launched its first index-enhancement fund." },
  },
  {
    year: "2022",
    title: { zh: "投研系统完善", en: "Research system expansion" },
    description: { zh: "设立北京研究中心及香港业务中心，取得香港资产管理第 9 类牌照。", en: "Established Beijing and Hong Kong hubs and received the Hong Kong Type 9 asset management license." },
  },
  {
    year: "2023",
    title: { zh: "拓展机构业务", en: "Institutional business expansion" },
    description: { zh: "正式对外募资，取得“3+3”投顾资质。", en: "Expanded external fundraising and obtained the 3+3 investment advisory qualification." },
  },
  {
    year: "2025",
    title: { zh: "规模与认可", en: "Scale and recognition" },
    description: { zh: "荣获三年期股票策略私募金牛奖，最新管理规模 140 亿+。", en: "Received the three-year equity strategy Golden Bull award; latest AUM exceeds RMB 14 billion." },
  },
];

const founders = [
  {
    name: { zh: "张晓泉教授", en: "Professor Michael Zhang, Ph.D." },
    role: { zh: "创始人", en: "Founder" },
    image: "/about/zhang-xiaoquan-official.png",
    highlights: [
      { zh: "清华大学经管学院深圳研究院常务副院长、讲席教授，香港深圳联合金融研究中心主任", en: "Executive Associate Dean and Chair Professor at Tsinghua SEM Shenzhen Research Institute; Director of the Hong Kong-Shenzhen Finance Research Centre" },
      { zh: "麻省理工学院（MIT）博士，清华大学管理学硕士、计算机科学学士、英语文学学士", en: "PhD from MIT; MSc in Management, BE in Computer Science and BA in English from Tsinghua University" },
      { zh: "多年量化研究、量化投资及华尔街量化对冲基金从业经验，芝加哥量化联盟（CQA）成员", en: "Extensive experience in quantitative research, investing and a Wall Street quantitative hedge fund; member of the Chicago Quantitative Alliance" },
    ],
  },
  {
    name: { zh: "卢涛博士", en: "Dr. Tao Lu" },
    role: { zh: "CEO / 联合创始人", en: "CEO / Co-founder" },
    image: "/about/lu-tao.png",
    highlights: [
      { zh: "香港中文大学博士，清华大学物理学、经济学学士", en: "PhD from The Chinese University of Hong Kong; BSc degrees in Physics and Economics from Tsinghua University" },
      { zh: "清华大学基础科学班学分绩第一名毕业，全国物理竞赛一等奖并保送清华大学", en: "Graduated first in Tsinghua's Fundamental Sciences program; national first prize in the Physics Olympiad" },
      { zh: "多年人工智能、行为金融与资产定价研究经验，对量化策略运作机制与市场特征具有深入研究", en: "Research experience across artificial intelligence, behavioral finance and asset pricing, with deep expertise in quantitative strategies and market structure" },
    ],
  },
];

const teamCapabilities = [
  { count: "FACTOR", name: { zh: "因子研究", en: "Factor Research" }, copy: { zh: "追本溯源，寻找市场蛛丝马迹的因子专家", en: "Logic-led research into signals and market structure" } },
  { count: "AI / ML", name: { zh: "算法研究", en: "Algorithm Research" }, copy: { zh: "资深数据科学家与人工智能算法工程师", en: "Data scientists and machine-learning engineers" } },
  { count: "RISK", name: { zh: "风险管理", en: "Risk Management" }, copy: { zh: "精准描述和控制策略风险", en: "Rigorous measurement and control of strategy risk" } },
  { count: "TRADE", name: { zh: "交易执行", en: "Trading" }, copy: { zh: "快速响应、多重保障的交易系统与交易人员", en: "Responsive trading systems and execution professionals" } },
  { count: "RESEARCH", name: { zh: "基础研究", en: "Fundamental Research" }, copy: { zh: "创始团队领衔，持续构建策略护城河", en: "Founder-led foundational research for durable strategy advantages" } },
  { count: "SYSTEM", name: { zh: "系统工程", en: "Engineering" }, copy: { zh: "支持研究、数据、模型和交易的深度开发", en: "Engineering across research, data, models and execution" } },
];

const honors = [
  { year: "2025", image: "/about/honor-golden-bull.png", title: { zh: "中国证券报·三年期金牛私募管理公司", en: "China Securities Journal · Three-year Golden Bull Private Fund Manager" } },
  { year: "2025", image: "/about/honor-golden-bull.png", title: { zh: "金融科技·金牛科技创新量化机构", en: "FinTech Golden Bull · Quantitative Technology Innovation Institution" } },
  { year: "2025", image: "/about/honor-golden-bull.png", title: { zh: "金融科技·量化行业金牛技术专家", en: "FinTech Golden Bull · Quantitative Technology Expert" } },
  { year: "2024", image: "/about/honor-golden-river.png", title: { zh: "证券时报·金长江奖快速成长私募基金公司", en: "Securities Times · Golden Yangtze Award for Fast-growing Private Fund Manager" } },
  { year: "2024", image: "/about/honor-simuwang.png", title: { zh: "排排网·TOP50私募基金管理人（股票量化多头组）", en: "Simuwang · Top 50 Private Fund Managers (Quantitative Equity)" } },
  { year: "2024", image: "/about/honor-deloitte.png", title: { zh: "德勤中国·深圳明日之星", en: "Deloitte China · Shenzhen Rising Star" } },
  { year: "2024", image: "/about/honor-growth-product.png", title: { zh: "证券时报私募实盘大赛·成长私募产品奖", en: "Securities Times Private Fund Competition · Growth Product Award" } },
  { year: "2024", image: "/about/honor-pbcsf.png", title: { zh: "清华五道口全球金融科技创业大赛·最佳团队", en: "Tsinghua PBCSF Global FinTech Competition · Best Team" } },
  { year: "2024", image: "/about/honor-eastmoney.png", title: { zh: "东方财富·最有价值管理人", en: "Eastmoney · Most Valuable Fund Manager" } },
  { year: "2024", image: "/about/honor-hkust.png", title: { zh: "香港科技大学百万奖金创业大赛·AI领域奖", en: "HKUST One Million Dollar Entrepreneurship Competition · AI Award" } },
  { year: "2024", image: "/about/honor-xinan.png", title: { zh: "西南证券·年度金鼎奖管理人", en: "Southwest Securities · Annual Golden Tripod Fund Manager" } },
  { year: "—", image: "/about/honor-hkict.png", title: { zh: "香港资讯及通讯科技奖（HKICT）·MERIT奖", en: "Hong Kong ICT Awards · Merit Award" } },
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
    image: "/news/cs-interview-20260622.jpg",
    featured: true,
    category: "media" as NewsCategory,
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
    image: "/news/investment-style.png",
    featured: true,
    category: "media" as NewsCategory,
  },
  {
    date: "2025.12.22",
    source: { zh: "公司公告", en: "Company Notice" },
    title: { zh: "关于公司名称、经营范围及注册地址变更的通知", en: "Notice on changes to company name, business scope and registered address" },
    description: { zh: "因业务发展需要，公司完成工商变更登记。", en: "Corporate registration updates completed in line with business development." },
    href: "https://mp.weixin.qq.com/s/plAnUnGdr4d8YT3GA6Ed5A?scene=1",
    image: "/news/company-notice.png",
    category: "announcement" as NewsCategory,
  },
  {
    date: "2025.10.15",
    source: { zh: "公司荣誉", en: "Recognition" },
    title: { zh: "超量子基金荣获三年期金牛私募管理公司奖", en: "Super Quantum receives the Three-year Golden Bull Private Fund Manager award" },
    description: { zh: "第十六届中国私募金牛奖评选结果正式揭晓。", en: "Results of the 16th China Private Fund Golden Bull Awards were announced." },
    href: "https://mp.weixin.qq.com/s/6jjTZWFCQQ9WSq5U_dOp0g?scene=1",
    image: "/news/golden-bull.png",
    category: "company" as NewsCategory,
  },
  {
    date: "2024.06.18",
    source: { zh: "研究观点", en: "Viewpoint" },
    title: { zh: "微盘股今年已经三次暴跌，此类策略未来会怎么样？", en: "After three micro-cap selloffs, what comes next for the strategy?" },
    description: { zh: "从市场冲击出发，讨论小微盘策略的结构性风险。", en: "A discussion of structural risks in micro-cap strategies after major market shocks." },
    href: "https://mp.weixin.qq.com/s/_zaSlJV0zQ0iZmylzLBHfg",
    image: "/news/market-risk.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.06.14",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "发生战争时股市一定跌吗？", en: "Do equity markets always fall during wars?" },
    description: { zh: "回看战争、经济与资本市场之间的复杂关系。", en: "A historical look at the complex links between conflict, economies and markets." },
    href: "https://mp.weixin.qq.com/s/5Y8eUMsfHyajxm1zlub52g",
    image: "/news/market-history.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.04.03",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "好的投资者让投资变得更加困难？", en: "Do better investors make investing more difficult?" },
    description: { zh: "从市场效率与投资者行为出发，思考长期投资机会。", en: "A reflection on market efficiency, behavior and long-term opportunity." },
    href: "https://mp.weixin.qq.com/s/tFYCEZvsZrfWmSFSrbnUYg",
    image: "/news/investor-behavior.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.03.11",
    source: { zh: "风控研究", en: "Risk Research" },
    title: { zh: "投资中的风险、不确定性和无知", en: "Risk, uncertainty and ignorance in investing" },
    description: { zh: "不写公式，讲清超量子如何理解分布不确定性与风控。", en: "An accessible explanation of distributional uncertainty and risk control." },
    href: "https://mp.weixin.qq.com/s/I9nFNX-YfKKF4inX4DWcRw",
    image: "/news/market-risk.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.03.06",
    source: { zh: "私募投教", en: "Investor Education" },
    title: { zh: "投资中的“傲慢”与“偏见”", en: "Hubris and bias in investing" },
    description: { zh: "情绪如何塑造判断，又如何成为市场不完美的来源。", en: "How emotion shapes judgment and contributes to market imperfections." },
    href: "https://mp.weixin.qq.com/s/e2VexWnAn50ggkim_yDVhA",
    image: "/news/investor-behavior.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.02.22",
    source: { zh: "量化研究", en: "Quant Research" },
    title: { zh: "能用量化的思维来解读巴菲特吗？", en: "Can Buffett be understood through a quantitative lens?" },
    description: { zh: "以实证方法研究经典投资风格与超额收益来源。", en: "An empirical view of classic investment styles and sources of excess return." },
    href: "https://mp.weixin.qq.com/s/VB6bc-4pEix9l0-dcmMaww",
    image: "/news/investment-style.png",
    category: "research" as NewsCategory,
  },
  {
    date: "2024.02.07",
    source: { zh: "量化研究", en: "Quant Research" },
    title: { zh: "科学地理解巴菲特、索罗斯、林奇和格罗斯的投资风格", en: "A scientific view of Buffett, Soros, Lynch and Gross" },
    description: { zh: "用量化证据拆解不同投资大师的风格特征。", en: "Quantitative evidence behind the distinct styles of four investment legends." },
    href: "https://mp.weixin.qq.com/s/ZV4uiM4UUdwwqHTZXJZdLw",
    image: "/news/investment-style.png",
    category: "research" as NewsCategory,
  },
];

const disclosures = [
  {
    year: "2025",
    title: { zh: "2025 年度环境信息披露报告", en: "2025 Environmental Information Disclosure Report" },
    href: "/disclosures/environmental-disclosure-2025.pdf",
  },
  {
    year: "2024",
    title: { zh: "2024 年度环境信息披露报告", en: "2024 Environmental Information Disclosure Report" },
    href: "/disclosures/environmental-disclosure-2024.pdf",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("zh");
  const [qualified, setQualified] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [activeNewsFilter, setActiveNewsFilter] = useState<"all" | NewsCategory | "disclosure">("all");
  const [showAllNews, setShowAllNews] = useState(false);
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

  const selectedNews = activeNewsFilter === "all"
    ? newsItems
    : activeNewsFilter === "disclosure"
      ? []
      : newsItems.filter((item) => item.category === activeNewsFilter);
  const visibleNews = showAllNews || activeNewsFilter !== "all" ? selectedNews : selectedNews.slice(0, 6);
  const showDisclosures = activeNewsFilter === "all" || activeNewsFilter === "disclosure";

  const selectNewsFilter = (filter: "all" | NewsCategory | "disclosure") => {
    setActiveNewsFilter(filter);
    setShowAllNews(filter !== "all");
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
          <div><span>F</span> FINANCIAL MODELING</div><div><span>A</span> ARTFUL INVESTMENT</div><div><span>S</span> SCIENTIFIC RESEARCH</div><div><span>T</span> TECHNOLOGY BREAKTHROUGHS</div>
        </div>
      </section>

      <section id="products" className="products-section section-light">
        <div className="shell">
          <div className="section-kicker dark">PRODUCTS & SERVICES</div>
          <div className="products-heading">
            <h2>{tr("多元策略，", "Multiple strategies,")}<br /><span>{tr("回应不同投资目标。", "one research foundation.")}</span></h2>
            <div>
              <p>{tr("超量子基金具有量化指数增强、量化多头、灵活对冲等多系列产品，满足投资者不同风险偏好的需求。", "Our quantitative index enhancement, long-only and flexible hedging strategies are designed for different investor objectives and risk preferences.")}</p>
              <p>{tr("我们长期看好中国经济与资本市场的发展，致力于在获取市场 Beta 收益的同时，通过系统化研究持续挖掘稳健的 Alpha 来源。", "We remain optimistic about the long-term development of China's economy and capital markets, seeking market beta alongside durable alpha through systematic research.")}</p>
              <a href="mailto:service@superquant.fund?subject=产品与服务咨询">{tr("咨询产品与服务", "Product enquiries")} ↗</a>
            </div>
          </div>
          <div className="product-grid">
            {productItems.map((item, index) => (
              <article className="product-card" key={item.code}>
                <div className="product-card-top"><span>0{index + 1}</span><small>{item.code}</small></div>
                <div className={`product-visual product-visual-${index + 1}`} aria-hidden="true">
                  {index === 0 && <><i /><i /><i /><i /><span /></>}
                  {index === 1 && <><span /><span /><span /><span /><span /><b /></>}
                  {index === 2 && <><span /><span /><i /><b /></>}
                </div>
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
              <p>{tr("公司在中国证券投资基金业协会登记为私募证券投资基金管理人（登记编号 P1071044），以机器学习、计量经济学和金融数学研究服务于量化资产管理。", "The firm is registered with the Asset Management Association of China as a private securities fund manager (P1071044), applying machine learning, econometrics and financial mathematics to quantitative asset management.")}</p>
              <p>{tr("团队成员来自麻省理工学院、哥伦比亚大学、清华大学、北京大学、加州大学、香港科技大学及香港中文大学等高校。深厚的学术研究、可持续的工程系统与对风险的敬畏，共同构成超量子的投资方法。", "Our team includes graduates from MIT, Columbia, Tsinghua, Peking University, the University of California, HKUST and CUHK. Academic rigor, scalable systems and respect for risk define our approach.")}</p>
            </div>
          </div>
          <div className="public-facts">
            <div className="fact-card"><strong>40<sup>+</sup></strong><span>{tr("投研团队", "Investment & research team")}</span><p>{tr("研究、算法、风控、交易与系统工程协同", "Research, algorithms, risk, trading and engineering")}</p></div>
            <div className="fact-card"><strong>10<sup>+</sup></strong><span>{tr("博士研究员", "Doctoral researchers")}</span><p>{tr("计算机、数学、统计、物理与金融等交叉背景", "Cross-disciplinary backgrounds in computing, mathematics, statistics, physics and finance")}</p></div>
            <div className="fact-card"><strong>{tr("数万", "10K")}<sup>+</sup></strong><span>{tr("因子研究与挖掘", "Factors researched")}</span><p>{tr("技术面、基本面、舆情等多维信息", "Technical, fundamental and sentiment dimensions")}</p></div>
            <div className="fact-card recognition-card"><small>INDUSTRY RECOGNITION</small><span>{tr("三年期金牛私募管理公司", "Three-year Golden Bull Private Fund Manager")}</span><p>{tr("研究能力与长期实践获得行业认可", "Recognition for long-term research and practice")}</p></div>
          </div>
        </div>
      </section>

      <section className="founders-section section-light">
        <div className="shell">
          <div className="section-kicker dark">FOUNDING TEAM</div>
          <div className="subsection-heading"><h2>{tr("创始团队", "Founding Team")}</h2><p>{tr("学术研究、产业实践与工程能力，在同一套投研系统中长期协同。", "Academic research, industry practice and engineering capability work together in one long-term research system.")}</p></div>
          <div className="founder-grid">
            {founders.map((founder) => (
              <article className="founder-card" key={founder.image}>
                <div className="founder-portrait"><img src={founder.image} alt={pick(lang, founder.name)} /></div>
                <div className="founder-content"><small>{pick(lang, founder.role)}</small><h3>{pick(lang, founder.name)}</h3><ul>{founder.highlights.map((highlight, index) => <li key={index}>{pick(lang, highlight)}</li>)}</ul></div>
              </article>
            ))}
          </div>
          <div className="team-intro">
            <div><small>THE TEAM</small><h3>{tr("40+ 投研团队，跨学科协同", "40+ investment and research professionals")}</h3><p>{tr("覆盖因子研究、算法研究、基础研究、风控、交易执行与系统工程，以共同语言连接研究与投资。", "Factor research, algorithms, foundational research, risk, trading and engineering are connected through one shared investment language.")}</p></div>
            <div className="team-capability-grid">{teamCapabilities.map((item) => <div className="team-capability" key={item.count}><small>{item.count}</small><strong>{pick(lang, item.name)}</strong><p>{pick(lang, item.copy)}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="honors-section section-light">
        <div className="shell">
          <div className="section-kicker dark">HONORS & RECOGNITION</div>
          <div className="subsection-heading"><h2>{tr("荣誉与认可", "Honors & Recognition")}</h2><p>{tr("长期研究与投资实践，获得来自行业、学术与科技领域的多项认可。", "Long-term research and investment practice recognized across finance, academia and technology.")}</p></div>
          <div className="honor-grid">{honors.map((honor, index) => <article className="honor-card" key={`${honor.year}-${index}`}><div className="honor-logo"><img src={honor.image} alt="" /></div><small>{honor.year}</small><h3>{pick(lang, honor.title)}</h3></article>)}</div>
        </div>
      </section>

      <section className="programmatic-section">
        <div className="shell programmatic-layout">
          <div><div className="section-kicker">AI-DRIVEN PROGRAMMATIC INVESTING</div><h2>{tr("人工智能主导的，", "AI-driven,")}<br />{tr("程序化投资体系。", "programmatic investing.")}</h2><p>{tr("以深度学习、深度神经网络与计量经济学为技术底座，融合金融数学研究及中国、美国量化交易实践，把数据、模型、风险与执行连接为完整系统。", "Deep learning, neural networks and econometrics combine with financial mathematics and quantitative trading experience across China and the United States, linking data, models, risk and execution into one system.")}</p></div>
          <div className="programmatic-flow"><div><small>01</small><strong>{tr("研究与经验", "Research & Experience")}</strong><span>{tr("AI 技术 · 金融数学 · 中美量化实践", "AI · Financial Mathematics · China/US Quant Practice")}</span></div><i>→</i><div><small>02</small><strong>{tr("多地基础设施", "Multi-site Infrastructure")}</strong><span>{tr("深圳 · 北京 · 上海 · 香港", "Shenzhen · Beijing · Shanghai · Hong Kong")}</span></div><i>→</i><div><small>03</small><strong>{tr("程序化策略与执行", "Programmatic Strategy & Execution")}</strong><span>{tr("全时段捕捉机会 · 风险实时监控", "Full-session opportunity capture · Real-time risk monitoring")}</span></div></div>
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
            <p>{tr("FAST体系以金融逻辑为起点，以数据挖掘为方法；模型训练、自动化交易与风险控制协同，让策略在市场变化中持续迭代。", "FAST starts with financial logic and data mining, then connects model training, automated execution and risk control for continuous strategy iteration.")}</p>
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
                <h3>{pick(lang, step.title)}</h3><p>{pick(lang, step.description)}</p><ul>{step.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{pick(lang, bullet)}</li>)}</ul><strong>{step.meta}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="news-section section-light">
        <div className="shell">
          <div className="news-heading">
            <div><div className="section-kicker dark">NEWS & INSIGHTS</div><h2>{tr("动态资讯", "News & Insights")}</h2></div>
            <p>{tr("公司动态、媒体报道、研究观点、公司公告与信息披露，统一归档于此。", "Company updates, media coverage, research, announcements and disclosures—kept in one newsroom.")}</p>
          </div>
          <div className="news-filter-bar" role="tablist" aria-label={tr("资讯分类", "News categories")}>
            {newsFilters.map((filter) => (
              <button
                type="button"
                key={filter.key}
                className={activeNewsFilter === filter.key ? "is-active" : ""}
                onClick={() => selectNewsFilter(filter.key)}
                role="tab"
                aria-selected={activeNewsFilter === filter.key}
              >
                {pick(lang, filter.label)}
              </button>
            ))}
          </div>
          <div className="news-grid">
            {visibleNews.map((item) => (
              <a className={`news-card ${item.featured ? "is-featured" : ""}`} key={item.href} href={item.href} target="_blank" rel="noreferrer">
                <div className="news-image"><img src={item.image} alt="" /></div>
                <div className="news-meta"><span>{item.date}</span><small>{pick(lang, newsFilters.find((filter) => filter.key === item.category)?.label ?? item.source)}</small></div>
                <h3>{pick(lang, item.title)}</h3><p>{pick(lang, item.description)}</p>
                <span className="news-link">{tr("阅读原文", "Read original")} ↗</span>
              </a>
            ))}
          </div>
          {showDisclosures && (
            <div className="news-disclosure">
              <div className="news-disclosure-heading">
                <small>INFORMATION DISCLOSURE</small>
                <h3>{tr("信息披露", "Information Disclosure")}</h3>
                <p>{tr("深圳市超量子私募证券基金管理有限公司公开披露文件。", "Public disclosures of Shenzhen Super Quantum Private Securities Fund Management Co., Ltd.")}</p>
              </div>
              <div className="news-disclosure-list">
                {disclosures.map((item) => (
                  <a key={item.year} href={item.href} target="_blank" rel="noreferrer">
                    <span>{item.year}</span><strong>{pick(lang, item.title)}</strong><i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            </div>
          )}
          {activeNewsFilter === "all" && !showAllNews && (
            <div className="news-more">
              <button className="outline-button" type="button" onClick={() => setShowAllNews(true)}>
                {tr("查看全部历史动态", "View all updates")} <span aria-hidden="true">↓</span>
              </button>
            </div>
          )}
          {activeNewsFilter === "all" && showAllNews && (
            <div className="news-more">
              <button className="text-button news-collapse" type="button" onClick={() => setShowAllNews(false)}>
                {tr("收起历史动态", "Collapse updates")} <span aria-hidden="true">↑</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="careers" className="careers-section section-light">
        <div className="shell careers-layout">
          <div className="careers-copy">
            <div className="section-kicker dark">JOIN SUPER QUANTUM</div>
            <h2>{tr("和聪明的人一起，", "Work with curious minds,")}<br /><span>{tr("研究真正困难的问题。", "on genuinely hard problems.")}</span></h2>
            <p>{tr("我们长期寻找对数学、机器学习、金融市场和复杂系统保持好奇的人。研究员、算法工程师、交易系统与基础设施岗位持续开放。", "We are always looking for people curious about mathematics, machine learning, financial markets and complex systems. Research, algorithms, trading systems and infrastructure roles remain open.")}</p>
            <div className="career-actions">
              <a className="outline-button" href="mailto:hr@superquant.fund?subject=【超量子简历投递】">{tr("投递简历", "Send your CV")} <span aria-hidden="true">↗</span></a>
              <a className="career-pdf-link" href="/careers/superquant-summer-recruitment-2026.pdf" target="_blank" rel="noreferrer">{tr("查看完整招聘手册", "View recruitment brochure")} ↗</a>
            </div>
            <div className="career-email"><small>{tr("招聘邮箱", "RECRUITMENT EMAIL")}</small><a href="mailto:hr@superquant.fund">hr@superquant.fund</a></div>
          </div>
          <a className="career-poster career-poster-real" href="/careers/superquant-summer-recruitment-2026.pdf" target="_blank" rel="noreferrer" aria-label={tr("打开 2026 年招聘手册", "Open the 2026 recruitment brochure")}>
            <img src="/careers/superquant-summer-recruitment-2026-cover.png" alt={tr("超量子基金 2026 年校园招聘海报", "Super Quantum 2026 campus recruitment poster")} />
            <span>{tr("点击查看 9 页完整招聘手册", "Open the complete 9-page brochure")} ↗</span>
          </a>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orb orb-a" aria-hidden="true" /><div className="contact-orb orb-b" aria-hidden="true" />
        <div className="shell contact-inner">
          <div className="section-kicker">CONNECT WITH US</div>
          <h2>{tr("一起，理解市场的下一种可能。", "Explore what markets can become.")}</h2>
          <p>{tr("机构合作、产品咨询与人才加入，欢迎与超量子团队联系。", "For institutional partnerships, product enquiries and careers, connect with our team.")}</p>
          <div className="contact-details">
            <div><small>{tr("公司地址", "ADDRESS")}</small><strong>{tr("深圳市福田区金田路 2030 号卓越世纪中心 1 号楼", "Tower 1, Excellence Century Center, 2030 Jintian Road, Futian District, Shenzhen")}</strong></div>
            <div><small>{tr("联系邮箱", "EMAIL")}</small><a href="mailto:service@superquant.fund">service@superquant.fund</a></div>
          </div>
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
