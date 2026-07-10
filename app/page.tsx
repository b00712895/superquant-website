"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "关于超量子", href: "#about" },
  { label: "投研引擎", href: "#engine" },
  { label: "风控哲学", href: "#risk" },
  { label: "研究观点", href: "#insights" },
];

const methodology = [
  {
    index: "01",
    en: "SCIENCE",
    title: "从规律出发",
    description: "以数理建模、统计工具与因果关系研究为底座，寻找可解释、可验证的市场规律。",
    tone: "cyan",
  },
  {
    index: "02",
    en: "TECHNOLOGY",
    title: "让研究规模化",
    description: "机器学习、模型与因子协同工作，将研究假设转化为持续迭代的系统能力。",
    tone: "violet",
  },
  {
    index: "03",
    en: "FINANCE",
    title: "让策略可投资",
    description: "从组合构建、风险规划到交易执行，把研究优势转化为稳定、可复现的投资过程。",
    tone: "blue",
  },
  {
    index: "04",
    en: "ART",
    title: "理解不确定性",
    description: "对价值、优雅与人性的长期思考，让模型保持对未知的敬畏与适应力。",
    tone: "lime",
  },
];

const engineSteps = [
  {
    code: "FACTOR GRAPH",
    title: "因子开发",
    description: "从金融逻辑构建底层因子，以同行审议与多维检验持续筛选有效信号。",
    meta: "Logic first",
  },
  {
    code: "AUTOQUANT",
    title: "模型实验",
    description: "自动化搜索模型结构与参数，批量训练、回测、比较，提升研究迭代效率。",
    meta: "Research at scale",
  },
  {
    code: "RISK PLANNER",
    title: "组合与风控",
    description: "组合多模型信号，监控风格暴露与换仓成本，在目标与约束之间动态规划。",
    meta: "Robust by design",
  },
  {
    code: "EXECUTION",
    title: "交易执行",
    description: "自研交易算法与实时监控系统协同，让每一次策略表达更高效、更准确。",
    meta: "Precision matters",
  },
];

const insights = [
  {
    type: "VIEWPOINT / 风控",
    title: "真正的风险，往往来自对未知的无知",
    description: "历史并不总能代表未来。将分布不确定性纳入模型，是理解市场变化的第一步。",
  },
  {
    type: "RESEARCH / 方法",
    title: "让机器理解规律，而不只是记忆数据",
    description: "金融演绎与数据归纳相互校验，才能减少过拟合，让模型拥有更长的有效周期。",
  },
  {
    type: "SYSTEM / 工程",
    title: "研究优势，需要被系统完整地表达",
    description: "从因子到执行，每个环节都决定策略最终呈现。系统能力本身就是研究护城河。",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="超量子基金首页">
          <img src="/superquant-logo.png" alt="SUPER QUANTUM 超量子基金" />
        </a>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="mailto:service@superquant.fund">
            联系我们 <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "关闭导航" : "打开导航"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section
        id="top"
        ref={heroRef}
        className="hero"
        onPointerMove={onHeroMove}
      >
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="signal-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <i
              key={index}
              style={{
                "--i": index,
                left: `${(index * 47) % 96}%`,
                top: `${((index * 31) % 88) + 4}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow reveal-up">SUPER QUANTUM · QUANTITATIVE RESEARCH</p>
            <h1 className="reveal-up delay-1">
              让模型理解市场
              <br />
              <span>让投资回应不确定性</span>
            </h1>
            <p className="hero-lead reveal-up delay-2">
              我们用金融逻辑定义问题，以数理科学寻找规律，
              <br className="desktop-only" />
              再用机器智能与工程系统，将研究转化为长期投资能力。
            </p>
            <div className="hero-actions reveal-up delay-3">
              <a className="primary-button" href="#engine">
                探索投研引擎 <span aria-hidden="true">↓</span>
              </a>
              <a className="text-button" href="#about">
                认识超量子 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-system" aria-label="超量子投研系统示意">
            <div className="system-orbit orbit-one" />
            <div className="system-orbit orbit-two" />
            <div className="system-core">
              <span>SQ</span>
              <small>RESEARCH CORE</small>
            </div>
            <div className="system-node node-a">
              <small>FACTOR LIBRARY</small>
              <strong>Logic</strong>
            </div>
            <div className="system-node node-b">
              <small>MODEL SEARCH</small>
              <strong>AutoQuant</strong>
            </div>
            <div className="system-node node-c">
              <small>RISK LAYER</small>
              <strong>Robustness</strong>
            </div>
            <div className="system-ticker">
              <span>LIVE RESEARCH STREAM</span>
              <b>FACTOR → MODEL → RISK → EXECUTION</b>
            </div>
          </div>
        </div>

        <div className="hero-foot shell">
          <div><span>01</span> SCIENCE</div>
          <div><span>02</span> TECHNOLOGY</div>
          <div><span>03</span> FINANCE</div>
          <div><span>04</span> ART</div>
        </div>
      </section>

      <section id="about" className="about section-light">
        <div className="shell">
          <div className="section-kicker dark">ABOUT SUPER QUANTUM</div>
          <div className="about-heading">
            <h2>
              用科学，<br />
              <span>重构主动管理。</span>
            </h2>
            <div className="about-copy">
              <p className="lead">
                超量子基金是一家以研究驱动的量化基金管理公司，聚焦中低频股票 Alpha 策略，为投资者提供指数增强及中性对冲产品。
              </p>
              <p>
                我们相信，量化投资的终点不是更复杂的模型，而是对市场规律更深的理解。深厚的学术研究、可持续的工程系统与对风险的敬畏，共同构成超量子的投资方法。
              </p>
            </div>
          </div>

          <div className="public-facts">
            <div className="fact-card">
              <strong>30<sup>+</sup></strong>
              <span>研发团队成员</span>
              <p>研究、算法、风控、交易与系统工程协同</p>
            </div>
            <div className="fact-card">
              <strong>10<sup>+</sup></strong>
              <span>海内外高校博士</span>
              <p>多元学科背景，连接学术前沿与市场实践</p>
            </div>
            <div className="fact-card">
              <strong>4<sup>地</sup></strong>
              <span>基础设施矩阵</span>
              <p>北上深港协同部署，支撑稳定研究与交易</p>
            </div>
            <div className="fact-card recognition-card">
              <small>INDUSTRY RECOGNITION</small>
              <span>三年期金牛私募管理公司</span>
              <p>研究能力与长期实践获得行业认可</p>
            </div>
          </div>
        </div>
      </section>

      <section className="method-section">
        <div className="shell">
          <div className="section-kicker">OUR METHODOLOGY</div>
          <div className="method-intro">
            <h2>一套完整的方法，<br />面对一个不断变化的市场。</h2>
            <p>演绎与归纳相互校验，研究与工程彼此增强。我们把投资看作一套持续进化的认知系统。</p>
          </div>
          <div className="method-grid">
            {methodology.map((item) => (
              <article key={item.index} className={`method-card tone-${item.tone}`}>
                <div className="method-number">{item.index}</div>
                <div className="method-visual" aria-hidden="true"><span /></div>
                <small>{item.en}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
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
            <h2>从一个好问题，<br />到一次精确表达。</h2>
            <p>超量子投研系统把研究、模型、风险与执行连接成一条可复用、可追踪、可持续迭代的链路。</p>
          </div>

          <div className="engine-pipeline">
            {engineSteps.map((step, index) => (
              <article key={step.code} className="engine-step">
                <div className="step-topline">
                  <span>0{index + 1}</span>
                  <small>{step.code}</small>
                </div>
                <div className="step-pulse" aria-hidden="true"><i /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <strong>{step.meta}</strong>
              </article>
            ))}
          </div>

          <div className="engine-console">
            <div className="console-header">
              <span><i /> SYSTEM VIEW</span>
              <small>SUPER QUANTUM RESEARCH OS</small>
            </div>
            <div className="console-body">
              <div className="console-copy">
                <small>AUTOMATED MODEL RESEARCH</small>
                <h3>AutoQuant</h3>
                <p>把研究目标转化为大规模模型实验，让每一次迭代都建立在更充分的证据之上。</p>
                <div className="console-tags">
                  <span>目标设定</span><span>因子筛选</span><span>模型搜索</span><span>快速回测</span><span>组合输出</span>
                </div>
              </div>
              <div className="console-chart" aria-label="模型实验迭代示意图">
                <div className="chart-grid" />
                <div className="chart-line line-one" />
                <div className="chart-line line-two" />
                <div className="chart-axis"><span>RESEARCH DEPTH</span><span>ITERATION →</span></div>
                <i className="chart-point point-one" /><i className="chart-point point-two" /><i className="chart-point point-three" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="risk" className="risk-section">
        <div className="shell risk-layout">
          <div className="risk-copy">
            <div className="section-kicker dark">RISK PHILOSOPHY</div>
            <h2>风险不是模型的边界，<br /><span>而是模型的一部分。</span></h2>
            <p className="lead">市场分布会变化，历史规律会失效。真正稳健的系统，必须拥有识别未知、适应变化的能力。</p>
            <div className="risk-principles">
              <div><span>01</span><p><strong>承认未知</strong>不把历史数据等同于未来世界</p></div>
              <div><span>02</span><p><strong>对抗过拟合</strong>用金融逻辑约束机器学习模型</p></div>
              <div><span>03</span><p><strong>持续校准</strong>动态监控风格、暴露与模型状态</p></div>
            </div>
          </div>

          <div className="risk-visual" aria-label="市场不确定性模型示意">
            <div className="risk-grid" />
            <div className="risk-wave wave-one" />
            <div className="risk-wave wave-two" />
            <div className="risk-zone"><span>UNCERTAINTY ZONE</span></div>
            <div className="risk-label label-low"><i /> LOW</div>
            <div className="risk-label label-high"><i /> HIGH</div>
            <div className="risk-readout">
              <small>DISTRIBUTION SHIFT</small>
              <strong>Detect the change</strong>
              <span>Model · Measure · Adapt</span>
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="insights-section section-light">
        <div className="shell">
          <div className="insights-header">
            <div>
              <div className="section-kicker dark">RESEARCH & VIEWPOINTS</div>
              <h2>我们的思考，<br />也在持续迭代。</h2>
            </div>
            <a className="outline-button" href="mailto:service@superquant.fund?subject=了解超量子研究观点">
              获取更多研究观点 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="insight-list">
            {insights.map((item, index) => (
              <article key={item.title} className="insight-card">
                <span className="insight-index">0{index + 1}</span>
                <div>
                  <small>{item.type}</small>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <span className="insight-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-orb orb-a" aria-hidden="true" />
        <div className="contact-orb orb-b" aria-hidden="true" />
        <div className="shell contact-inner">
          <div className="section-kicker">CONNECT WITH US</div>
          <h2>一起，理解市场的下一种可能。</h2>
          <p>机构合作、产品咨询与人才加入，欢迎与超量子团队联系。</p>
          <a className="contact-link" href="mailto:service@superquant.fund">
            service@superquant.fund <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <img src="/superquant-logo.png" alt="SUPER QUANTUM 超量子基金" />
            <p>智能重构金融世界</p>
          </div>
          <div className="footer-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>
          <a className="back-top" href="#top">回到顶部 ↑</a>
        </div>
        <div className="shell footer-legal">
          <p>
            风险提示：投资有风险，过往业绩不预示未来表现。本网站内容仅作公司及投研理念展示，不构成任何投资建议或收益承诺。
          </p>
          <span>© {new Date().getFullYear()} 深圳市超量子私募证券基金管理有限公司</span>
        </div>
      </footer>
    </main>
  );
}
