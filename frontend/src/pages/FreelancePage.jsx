import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import MediaGallery from '../components/MediaGallery'
import './FreelancePage.css'
import about      from '../data/about.json'
import projects   from '../data/projects.json'
import achievements from '../data/achievements.json'

/* ─── constants ─── */
const EMAIL   = about.email
const PHONE   = about.phone
const GITHUB  = about.github
const LINKEDIN = about.linkedin
const RESUME  = '/ADITYA_RESUME.pdf'

function AgentWorkflowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 12h10M12 7v10M7 7l10 10" />
    </svg>
  )
}

function PipelineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}

function DocumentVlmIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6M9 11h3M9 19h4" />
    </svg>
  )
}

function FullStackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

const SERVICES = [
  {
    id: 'ai-agents',
    icon: <AgentWorkflowIcon />,
    title: 'Autonomous AI Agents & Workflows',
    desc: 'Automate repetitive operations, multi-step customer inquiries, and complex data pipelines with reliable, self-healing AI agents that complete real tasks without getting stuck in loops.',
    tags: ['Autonomous Agents', 'Self-Healing Workflows', 'Tool Calling', 'Private LLMs', 'Enterprise RAG'],
  },
  {
    id: 'doc-intelligence',
    icon: <DocumentVlmIcon />,
    title: 'Offline Vision AI & Document Automation',
    desc: 'Turn 10-minute manual paperwork into 6-second structured data. Runs 100% offline with zero cloud OCR fees and zero data leakage — guaranteed 100% schema accuracy.',
    tags: ['Offline Vision AI', 'Smart Forms & Tables', '$0 Cloud Fees', '100% Private', 'Deterministic JSON'],
  },
  {
    id: 'fullstack',
    icon: <FullStackIcon />,
    title: 'Full-Stack SaaS & Web Applications',
    desc: 'Turn your vision into a live, paying-customer-ready web app in weeks. Built with modern Next.js/React, rock-solid authentication, role-based controls, and scalable database schemas.',
    tags: ['Next.js / React', 'SaaS MVPs', 'Role-Based Access', 'PostgreSQL', 'Fast Delivery'],
  },
  {
    id: 'ml-backend',
    icon: <PipelineIcon />,
    title: 'High-Throughput Backends & Scalable APIs',
    desc: 'Fast, bulletproof microservices and real-time event streams designed to handle high concurrency (5,000+ req/min) with sub-300ms response times and zero downtime.',
    tags: ['High Concurrency', 'Sub-300ms APIs', 'Event Streaming', 'Kafka & Redis', 'Fault Tolerant'],
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: "Free 20-min call. You explain the problem, I tell you how I'd solve it and whether I'm the right fit." },
  { step: '02', title: 'Scope & Quote', desc: "I send a clear scope doc — deliverables, timeline, cost. No hidden fees, no vague \"it depends\" answers." },
  { step: '03', title: 'Build & Ship', desc: "Weekly updates, clean code, documented handoff. You can see progress; you're never in the dark." },
  { step: '04', title: 'Support', desc: '2 weeks of free post-delivery support to handle any edge cases. After that, retainer options available.' },
]

/* ─── Client Value & Trust Pillars (Replacing Tech Soup) ─── */
const TRUST_PILLARS = [
  {
    kicker: 'Fast Delivery',
    headline: 'Concept to Production in 2–4 Wks',
    desc: 'Shipped & battle-tested MVPs without agency bureaucracy',
  },
  {
    kicker: 'Zero Cloud Burn',
    headline: '$0 Ongoing Cloud API Bills',
    desc: 'Offline vision AI & local models running private and free',
  },
  {
    kicker: 'High-Scale Performance',
    headline: '5,000+ Req/Min Architecture',
    desc: 'Sub-300ms response times, zero downtime, resilient events',
  },
  {
    kicker: 'Complete Ownership',
    headline: '100% Code Ownership',
    desc: 'Full IP transfer + 2 weeks free dedicated post-launch support',
  },
]

/* ─── Interactive Demo Showcase Projects ─── */
const DEMO_PROJECTS = [
  {
    id: 'doc-oc',
    title: 'DOC-OC: Universal Document AI',
    tagline: '100% Offline Multimodal Vision AI & Deterministic Table Extraction',
    category: 'Offline Vision AI & Automation',
    badge: '100% Local GPU Inference',
    media: [
      'https://youtu.be/FT0ZPkmyE1o',
      '/projects/DOCOC/landing.png',
      '/projects/DOCOC/result.png',
    ],
    demoUrl: 'https://adityacodes404-doc-oc.hf.space/',
    githubUrl: 'https://github.com/Adityakeerti/DOC-OC-LLM',
    metrics: [
      { label: 'Processing Speed', value: '10m → 6.2s', highlight: true },
      { label: 'Ongoing Cloud Bills', value: '$0 / month', highlight: true },
      { label: 'Schema Accuracy', value: '100% Guaranteed', highlight: false },
      { label: 'Data Privacy', value: '100% Offline', highlight: false },
    ],
    problem: 'Enterprises and academic institutions lose hundreds of hours manually transcribing unstandardized marks, stamps, and complex bilingual tables. Cloud OCR APIs charge expensive ongoing per-page fees ($0.02–$0.05/page) while compromising sensitive customer and student data privacy.',
    solution: 'Engineered a unified, 100% offline edge Vision-Language Model (VLM) engine running Gemma-4 locally. Enforced C++ grammar-constrained decoding to mathematically eliminate JSON hallucinations, applied Lanczos image scaling, and built self-healing arithmetic validation.',
    roi: [
      'Slashed processing latency by 4.3× from ~28s down to 6.28s per complex document',
      'Completely eliminated cloud API costs ($0 ongoing bills) with zero data leaving the premises',
      '100% deterministic RFC 8259 JSON compliance with zero schema drift or formatting errors',
      'Automated reconciliation of theory, practical, and total scores with self-healing validators',
    ],
    tags: ['Offline Vision AI', 'FastAPI', 'llama.cpp', 'Grammar Decoding', 'Pydantic Validation', 'React'],
  },
  {
    id: 'credit-limit-rl',
    title: 'Advanzia AutoLend',
    tagline: 'Autonomous Real-Time Credit Risk & Dynamic Lending Engine',
    category: 'High-Throughput Backend & ML',
    badge: '5,000+ Req/Min Architecture',
    media: [
      'https://youtu.be/bsDh1WjEw9s',
      '/projects/Advanzia AutoLend/architecture.png',
      '/projects/Advanzia AutoLend/simulation.png',
    ],
    demoUrl: 'https://autocreditrl.vercel.app/',
    githubUrl: 'https://github.com/Adityakeerti/Credit_Limit_Adjust_RL',
    metrics: [
      { label: 'System Throughput', value: '5,000+ req/min', highlight: true },
      { label: 'Decision Latency', value: '< 300ms', highlight: true },
      { label: 'Risk Protection', value: 'Survival Analysis AI', highlight: false },
      { label: 'Financial Audit', value: 'Double-Entry Ledger', highlight: false },
    ],
    problem: 'Traditional static lending rules fail to adjust to live risk signals in volatile markets — costing financial lenders millions by rejecting creditworthy applicants or exposing portfolios to catastrophic default rates.',
    solution: 'Implemented an adaptive reinforcement learning engine (Dueling Double DQN) coupled with a Cox Proportional Hazard survival model to continuously optimize credit limits. Architected a resilient microservices backend leveraging Kafka event streaming, Redis caching, and an immutable double-entry ledger.',
    roi: [
      'Benchmarked sustained throughput of 5,000+ requests/minute with sub-300ms response times',
      'Pre-trained and validated dynamic credit policies across 10,000+ synthetic borrower simulations',
      'Built-in regulatory compliance and financial audit trails via immutable double-entry ledgering',
      'Fault-tolerant microservice architecture running Spring Boot, FastAPI, and PostgreSQL',
    ],
    tags: ['Spring Boot', 'FastAPI', 'Kafka', 'Redis', 'PyTorch RL', 'PostgreSQL', 'Microservices'],
  },
  {
    id: 'campusintel',
    title: 'Campus Intel',
    tagline: 'Unified Enterprise Campus Intelligence & Mobile Vision Platform',
    category: 'Full-Stack SaaS & Applied AI',
    badge: 'Hardware Cost Elimination',
    media: [
      'https://youtu.be/RIfFyF_utRg',
      '/projects/campus-intel/student-home.png',
      '/projects/campus-intel/student-login.png',
      '/projects/campus-intel/students-marksheets.png',
      '/projects/campus-intel/raise-makrs-correction-req.png',
      '/projects/campus-intel/mgmt-approve-reject-req.png',
      '/projects/campus-intel/mobiile-barcode-scanner.png',
    ],
    demoUrl: 'https://campusintel-phase2.onrender.com/',
    githubUrl: 'https://github.com/Adityakeerti/CampusIntel-Phase2',
    metrics: [
      { label: 'Barcode Hardware Cost', value: '$0 (Phone Camera)', highlight: true },
      { label: 'Ecosystem Scope', value: '4 Microservices', highlight: true },
      { label: 'Support Response', value: 'Instant AI RAG', highlight: false },
      { label: 'National Honor', value: 'Top 3 Finalist', highlight: false },
    ],
    problem: 'Educational institutions suffer from fragmented legacy tools: paper-based student administration, manual clerical review queues, and thousands of dollars spent on dedicated handheld barcode scanners for asset tracking.',
    solution: 'Engineered a unified multi-service ecosystem: an institutional AI knowledge assistant (FAISS RAG) for instant query responses, digital administrative correction workflows, and mobile camera computer vision that turns student and staff phones into real-time barcode scanners.',
    roi: [
      'Eliminated dedicated hardware equipment costs by converting smartphone cameras into barcode scanners',
      'Replaced multi-day paper approval queues with real-time digital administrative workflows',
      'Integrated student, administrative, and inventory systems into 4 containerized microservices',
      'Recognized in the Top 3 nationally in competitive hackathon finals',
    ],
    tags: ['React', 'FastAPI', 'Spring Boot', 'Mobile Vision', 'FAISS RAG', 'Docker', 'MySQL'],
  },
]

/* ─── Real client work ─── */
const CLIENT_WORK = [
  {
    id: 'drisu',
    client: 'Drisu Services',
    type: 'Client Project',
    industry: 'Legal & Compliance SaaS',
    url: 'https://www.drisuservices.com',
    headline: 'Full business compliance portal — live in production',
    desc: 'Built a complete multi-page Next.js web application for a Kolkata-based compliance firm. The site serves as their primary client-acquisition and service-delivery platform, covering GST, EPR, Trademark, ISO, Import/Export, and 30+ regulatory services across India.',
    deliverables: [
      'Full Next.js App Router site with 30+ dynamic service pages',
      'Interactive service catalog with category-based filtering',
      'SEO-optimised pages with structured JSON-LD schema for each service',
      'WhatsApp & consultation CTAs integrated across every page',
      'Mobile-first responsive design, deployed and live',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    accent: '#0f62fe',
  },
  {
    id: 'anandkosh',
    client: 'Anand Kosh (आनंद कोष)',
    type: 'Client Project',
    industry: 'Healthcare — Clinical Records',
    url: 'http://anandkosh.in',
    headline: 'Secure patient record digitization system — deployed on Render',
    desc: 'Engineered a full-stack clinical portal with 3-tier role-based access control for a healthcare provider. The system handles secure medical document archival via Google Drive, serverless PostgreSQL via Neon, and provides distinct dashboards for Administrators, Medical Staff, and Clinical Observers.',
    deliverables: [
      '3-tier RBAC — Admin, Medical Staff, Clinical Observer roles',
      'Secure document upload & archival via Google Drive API',
      'Serverless PostgreSQL (Neon) with Prisma ORM',
      'JWT-based auth with bcrypt password hashing',
      'Shimmer skeleton screens & real-time upload progress overlays',
      'Admin tools: scheduling calendar, compliance reminders, backup controls',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Neon PostgreSQL', 'Google Drive API', 'Render'],
    accent: '#00d4a4',
  },
]

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section wrapper ─── */
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`fl-section ${className}`}>
      <div className="fl-container">{children}</div>
    </section>
  )
}

/* ─── Sticky Nav ─── */
function FreelanceNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleScroll = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fl-nav${scrolled ? ' fl-nav--scrolled' : ''}`}>
      <div className="fl-nav-inner">
        <a href="/" className="fl-nav-logo">AK<span>.</span></a>
        <div className="fl-nav-center">
          <a href="#services"     onClick={handleScroll('services')}      className="fl-nav-link">Services</a>
          <a href="#client-work"  onClick={handleScroll('client-work')}   className="fl-nav-link">Client Work</a>
          <a href="#demos"        onClick={handleScroll('demos')}         className="fl-nav-link">Live Demos</a>
          <a href="#process"      onClick={handleScroll('process')}       className="fl-nav-link">How It Works</a>
          <a href="#proof"        onClick={handleScroll('proof')}         className="fl-nav-link">Track Record</a>
          <a href="#contact"      onClick={handleScroll('contact')}       className="fl-nav-link">Contact</a>
        </div>
        <a href="#contact" onClick={handleScroll('contact')} className="fl-nav-cta">Let's Talk →</a>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function FreelanceHero() {
  const handleScroll = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="fl-hero">
      <div className="fl-container">
        <FadeIn delay={0.05}>
          <span className="fl-eyebrow">Available for Freelance · India &amp; Remote</span>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h1 className="fl-hero-h1">
            I build AI systems,<br />
            backends &amp; automation<br />
            <span className="fl-hero-accent">that actually ship.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="fl-hero-sub">
            Full-Stack Developer &amp; AI Architect · Production MVPs in 2–4 weeks · $0 ongoing API bills ·
            Reduced document processing from 10 min → 6 sec for real clients.
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div className="fl-hero-actions">
            <a href="#contact" onClick={handleScroll('contact')} className="fl-btn fl-btn--primary">Start a Project →</a>
            <a href="#demos"   onClick={handleScroll('demos')}   className="fl-btn fl-btn--ghost">Explore Live Demos ↓</a>
          </div>
        </FadeIn>

        {/* Client Value & Trust Pillars */}
        <FadeIn delay={0.45}>
          <div className="fl-focus-bar">
            {TRUST_PILLARS.map(f => (
              <div key={f.kicker} className="fl-focus-item">
                <span className="fl-focus-kicker">{f.kicker}</span>
                <span className="fl-focus-headline">{f.headline}</span>
                <span className="fl-focus-desc">{f.desc}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const [hovered, setHovered] = useState(null)
  
  const handleScroll = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="services" className="fl-section--alt">
      <FadeIn>
        <span className="fl-section-eyebrow">What I Do</span>
        <h2 className="fl-section-h2">Services</h2>
        <p className="fl-section-sub">Pick what you need. Each service is a standalone offering — or combine them.</p>
      </FadeIn>
      <div className="fl-services-grid">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.id} delay={i * 0.08}>
            <div
              className={`fl-service-card${hovered === s.id ? ' fl-service-card--hovered' : ''}`}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="fl-service-icon">{s.icon}</div>
              <h3 className="fl-service-title">{s.title}</h3>
              <p className="fl-service-desc">{s.desc}</p>
              <div className="fl-service-tags">
                {s.tags.map(t => <span key={t} className="fl-tag">{t}</span>)}
              </div>
              <a href="#demos" onClick={handleScroll('demos')} className="fl-service-link">See live demo →</a>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}

/* ─── Client Work ─── */
function ClientWork() {
  return (
    <Section id="client-work">
      <FadeIn>
        <span className="fl-section-eyebrow">Real Clients · Live Sites</span>
        <h2 className="fl-section-h2">Client Work</h2>
        <p className="fl-section-sub">
          Projects I've built for paying clients — shipped, live, and in daily use.
        </p>
      </FadeIn>
      <div className="fl-cw-grid">
        {CLIENT_WORK.map((c, i) => (
          <FadeIn key={c.id} delay={i * 0.1}>
            <div className="fl-cw-card" style={{ '--cw-accent': c.accent }}>
              {/* Header */}
              <div className="fl-cw-header">
                <div>
                  <span className="fl-cw-type">{c.type} · {c.industry}</span>
                  <h3 className="fl-cw-client">{c.client}</h3>
                  <p className="fl-cw-headline">{c.headline}</p>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fl-cw-live-btn"
                >
                  View Live Site ↗
                </a>
              </div>

              {/* Divider */}
              <div className="fl-cw-rule" />

              {/* Body */}
              <div className="fl-cw-body">
                <div className="fl-cw-left">
                  <p className="fl-cw-desc">{c.desc}</p>
                  <div className="fl-cw-stack">
                    {c.stack.map(t => (
                      <span key={t} className="fl-tag fl-tag--cw">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="fl-cw-right">
                  <p className="fl-cw-deliverables-label">What was delivered</p>
                  <ul className="fl-cw-deliverables">
                    {c.deliverables.map((d, k) => (
                      <li key={k}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}

/* ─── Work / Interactive Live Demo Showcase ─── */
function Work() {
  const [active, setActive] = useState(0)
  const proj = DEMO_PROJECTS[active]

  const handleScroll = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="demos">
      {/* Anchor for legacy or alternate navigation links */}
      <div id="work" tabIndex={-1} aria-hidden="true" style={{ position: 'relative', top: '-60px' }} />
      <FadeIn>
        <span className="fl-section-eyebrow">Proof of Execution</span>
        <h2 className="fl-section-h2">Interactive Live Demos</h2>
        <p className="fl-section-sub">
          Explore real video walkthroughs, live sandboxes, and measured benchmark performance.
        </p>
      </FadeIn>

      <div className="fl-work-layout">
        {/* Tab list */}
        <div className="fl-work-tabs" role="tablist" aria-label="Demo Projects">
          {DEMO_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === i}
              className={`fl-work-tab${active === i ? ' fl-work-tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="fl-work-tab-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="fl-work-tab-title">{p.title}</div>
                <div className="fl-work-tab-sub">{p.tagline}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          {proj && (
            <motion.div
              key={proj.id}
              className="fl-work-detail"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="fl-work-detail-head">
                <div>
                  <div className="fl-demo-category-wrap">
                    <span className="fl-demo-category">{proj.category}</span>
                    <span className="fl-demo-pill">{proj.badge}</span>
                  </div>
                  <h3 className="fl-work-title">{proj.title}</h3>
                  <p className="fl-work-subtitle">{proj.tagline}</p>
                </div>
                <div className="fl-work-links">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fl-btn fl-btn--sm fl-btn--primary"
                    >
                      Open Live Demo ↗
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fl-btn fl-btn--sm fl-btn--ghost"
                    >
                      View Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* High-Impact Metric Badges */}
              <div className="fl-demo-metrics">
                {proj.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`fl-demo-metric-card${m.highlight ? ' fl-demo-metric-card--highlight' : ''}`}
                  >
                    <span className="fl-demo-metric-val">{m.value}</span>
                    <span className="fl-demo-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Media Showcase (Video Walkthrough & Screenshots) */}
              {proj.media && proj.media.length > 0 && (
                <div className="fl-demo-media">
                  <MediaGallery
                    key={proj.id}
                    items={proj.media}
                    alt={`${proj.title} interactive demo`}
                  />
                </div>
              )}

              {/* Client-Centric Story: Problem -> Solution -> Measured ROI */}
              <div className="fl-demo-story">
                <div className="fl-demo-story-card">
                  <div className="fl-demo-story-lbl">The Business Problem</div>
                  <p className="fl-demo-story-txt">{proj.problem}</p>
                </div>
                <div className="fl-demo-story-card">
                  <div className="fl-demo-story-lbl">The Delivered Solution</div>
                  <p className="fl-demo-story-txt">{proj.solution}</p>
                </div>
                <div className="fl-demo-story-card fl-demo-story-card--full">
                  <div className="fl-demo-story-lbl">Measured ROI &amp; Outcomes</div>
                  <ul className="fl-demo-roi-list">
                    {proj.roi.map((r, k) => (
                      <li key={k}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Architecture / Tech Stack Pills */}
              <div className="fl-work-stack">
                {proj.tags.map(t => (
                  <span key={t} className="fl-tag fl-tag--orange">{t}</span>
                ))}
              </div>

              {/* Direct Contextual Nudge */}
              <div className="fl-demo-nudge">
                <div>
                  <span className="fl-demo-nudge-title">Want a system like this built for your business?</span>
                  <span className="fl-demo-nudge-sub">Custom AI agents, private vision pipelines, or high-throughput backends in 2–4 weeks.</span>
                </div>
                <a
                  href="#contact"
                  onClick={handleScroll('contact')}
                  className="fl-btn fl-btn--primary fl-btn--sm"
                >
                  Scope This Project →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ─── Process ─── */
function Process() {
  return (
    <Section id="process" className="fl-section--alt">
      <FadeIn>
        <span className="fl-section-eyebrow">How It Works</span>
        <h2 className="fl-section-h2">Working With Me</h2>
        <p className="fl-section-sub">Simple, transparent, no-surprise process from first message to shipped product.</p>
      </FadeIn>
      <div className="fl-process-grid">
        {PROCESS.map((p, i) => (
          <FadeIn key={p.step} delay={i * 0.1}>
            <div className="fl-process-card">
              <div className="fl-process-step">{p.step}</div>
              <div className="fl-process-line" aria-hidden />
              <h3 className="fl-process-title">{p.title}</h3>
              <p className="fl-process-desc">{p.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}

/* ─── Track Record Data (Balanced 3-on-3) ─── */
const TRACK_RECORD = {
  awards: [
    {
      id: 'marathon',
      badge: '1st Place · National Winner',
      title: 'MariTHON National Hackathon',
      desc: 'Engineered an automated document extraction pipeline for maritime shipping logistics, processing vessel records automatically and securing 1st place nationwide.',
      highlight: true
    },
    {
      id: 'hackthewinter',
      badge: 'Top 3 Finalist · National',
      title: 'HackTheWinter Hackathon',
      desc: 'Built an autonomous credit risk decisioning engine capable of processing 5,000+ financial transactions/minute with sub-second latency.',
      highlight: false
    },
    {
      id: 'india-innovates',
      badge: 'Top 500 Teams · Bharat Mandapam',
      title: 'India Innovates 2026',
      desc: 'Selected into the top 500 engineering teams nationwide to build civic-scale digital infrastructure at Bharat Mandapam, New Delhi.',
      highlight: false
    }
  ],
  production: [
    {
      id: 'doc-oc',
      badge: '4.3× Faster · $0 Cloud Bills',
      title: 'DOC-OC Universal Document AI',
      desc: 'Engineered a 100% offline vision AI engine that extracts complex tabular documents in 6.2 seconds with zero data leakage and zero ongoing cloud OCR fees.',
      highlight: true
    },
    {
      id: 'peerprep',
      badge: '30× Ingestion Speedup',
      title: 'Automated Ingestion Engine',
      desc: 'Built an automated data pipeline cutting per-record processing from 10 minutes down to ~30 seconds with 99.98% accuracy on production data.',
      highlight: false
    },
    {
      id: 'live-saas',
      badge: 'Active Production Clients',
      title: 'Live Healthcare & Legal Portals',
      desc: 'Shipped a secure medical records platform handling hundreds of patient files daily and launched high-converting legal compliance portals with 30+ service flows.',
      highlight: false
    }
  ]
}

/* ─── Social Proof (Balanced 3-on-3 Track Record) ─── */
function SocialProof() {
  return (
    <Section id="proof">
      <FadeIn>
        <span className="fl-section-eyebrow">Track Record</span>
        <h2 className="fl-section-h2">Recognition &amp; Results</h2>
        <p className="fl-section-sub">Demonstrated ability to deliver high-performance solutions and real business value.</p>
      </FadeIn>
      
      <div className="fl-proof-columns">
        {/* Left Column: National Competitions & Hackathons */}
        <div className="fl-proof-col">
          <h3 className="fl-proof-col-title">National Competitions &amp; Awards</h3>
          <div className="fl-proof-col-list">
            {TRACK_RECORD.awards.map((a, i) => (
              <FadeIn key={a.id} delay={i * 0.08 + 0.05}>
                <div className={`fl-proof-card${a.highlight ? ' fl-proof-card--highlight' : ''}`}>
                  <span className="fl-proof-badge">{a.badge}</span>
                  <h4 className="fl-proof-title">{a.title}</h4>
                  <p className="fl-proof-desc">{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Right Column: Industrial & Production Milestones */}
        <div className="fl-proof-col">
          <h3 className="fl-proof-col-title">Production &amp; Engineering Impact</h3>
          <div className="fl-proof-col-list">
            {TRACK_RECORD.production.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08 + 0.05}>
                <div className={`fl-proof-card${p.highlight ? ' fl-proof-card--highlight' : ''}`}>
                  <span className="fl-proof-badge">{p.badge}</span>
                  <h4 className="fl-proof-title">{p.title}</h4>
                  <p className="fl-proof-desc">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="contact" className="fl-section--alt fl-contact-section">
      <div className="fl-contact-layout">
        <FadeIn className="fl-contact-left">
          <span className="fl-section-eyebrow">Let's Work Together</span>
          <h2 className="fl-contact-h2">
            Got a project<br />in mind?
          </h2>
          <p className="fl-contact-sub">
            Tell me what you're building. I'll tell you how I'd approach it and what it'd cost — no commitment, no pressure.
          </p>
          <div className="fl-contact-details">
            <button type="button" className="fl-contact-email" onClick={copyEmail} title="Click to copy email address">
              <span className="fl-contact-label">Email</span>
              <span className="fl-contact-val">
                {EMAIL}
                <span className="fl-copy-badge">
                  {copied ? (
                    <span className="inline-flex items-center gap-1">
                      <Check size={11} strokeWidth={2.5} />
                      <span>Copied</span>
                    </span>
                  ) : (
                    'Copy'
                  )}
                </span>
              </span>
            </button>
            <div className="fl-contact-row">
              <span className="fl-contact-label">Phone</span>
              <a href={`tel:${PHONE}`} className="fl-contact-val fl-contact-val--link">{PHONE}</a>
            </div>
            <div className="fl-contact-row">
              <span className="fl-contact-label">Location</span>
              <span className="fl-contact-val">Dehradun, India · Open to Remote</span>
            </div>
          </div>
          <div className="fl-contact-socials">
            <a href={GITHUB}   target="_blank" rel="noopener noreferrer" className="fl-social-link">GitHub ↗</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="fl-social-link">LinkedIn ↗</a>
            <a href={RESUME}   target="_blank" rel="noopener noreferrer" className="fl-social-link">Résumé ↗</a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="fl-contact-right">
          <ContactForm />
        </FadeIn>
      </div>
    </Section>
  )
}

/* ─── Contact Form (Accessible, Validated, Resilient) ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | opened | copied
  const [error, setError] = useState('')

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please provide your name, email, and project scope.')
      return
    }

    const subject = encodeURIComponent(`Project Inquiry: ${form.type || 'General'} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nService: ${form.type || 'General'}\nBudget: ${form.budget || 'To discuss'}\n\nProject Scope:\n${form.message}`
    )

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`
    const popup = window.open(gmailUrl, '_blank')
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Fallback: mailto URI works natively in all desktop & mobile mail clients
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    }
    setStatus('opened')
  }

  const handleCopy = () => {
    const text = `To: ${EMAIL}\nSubject: Project Inquiry: ${form.type || 'General'} — ${form.name}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nService: ${form.type || 'General'}\nBudget: ${form.budget || 'To discuss'}\n\nProject Scope:\n${form.message}`
    navigator.clipboard.writeText(text)
    setStatus('copied')
  }

  return (
    <form className="fl-form" onSubmit={handleSubmit} noValidate>
      {/* Screen reader live notification */}
      <div className="sr-only" aria-live="polite">
        {status === 'opened' && 'Email draft opened in your email provider.'}
        {status === 'copied' && 'Inquiry draft copied to clipboard.'}
        {error && error}
      </div>

      <div className="fl-form-row">
        <div className="fl-form-field">
          <label htmlFor="fl-name" className="fl-form-label">
            Your Name <span className="fl-req" aria-hidden="true">*</span>
          </label>
          <input
            id="fl-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="fl-form-input"
            value={form.name}
            onChange={set('name')}
            placeholder="Jane Smith"
          />
        </div>
        <div className="fl-form-field">
          <label htmlFor="fl-email" className="fl-form-label">
            Work Email <span className="fl-req" aria-hidden="true">*</span>
          </label>
          <input
            id="fl-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            className="fl-form-input"
            value={form.email}
            onChange={set('email')}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="fl-form-row">
        <div className="fl-form-field">
          <label htmlFor="fl-type" className="fl-form-label">Service of Interest</label>
          <select
            id="fl-type"
            name="type"
            className="fl-form-input fl-form-select"
            value={form.type}
            onChange={set('type')}
          >
            <option value="">Select a service…</option>
            <option value="Autonomous AI Agents & Workflows">Autonomous AI Agents &amp; Workflows</option>
            <option value="Offline Vision AI & Document Automation">Offline Vision AI &amp; Document Automation</option>
            <option value="Full-Stack SaaS & Web Applications">Full-Stack SaaS &amp; Web Applications</option>
            <option value="High-Throughput Backends & Scalable APIs">High-Throughput Backends &amp; Scalable APIs</option>
            <option value="Custom Consulting / Something else">Custom Consulting / Something else</option>
          </select>
        </div>
        <div className="fl-form-field">
          <label htmlFor="fl-budget" className="fl-form-label">Estimated Budget</label>
          <select
            id="fl-budget"
            name="budget"
            className="fl-form-input fl-form-select"
            value={form.budget}
            onChange={set('budget')}
          >
            <option value="">Select a range…</option>
            <option value="Under ₹25,000">Under ₹25,000 (~$300 USD)</option>
            <option value="₹25,000 – ₹60,000">₹25,000 – ₹60,000 (~$300–$750 USD)</option>
            <option value="₹60,000 – ₹1,50,000">₹60,000 – ₹1,50,000 (~$750–$1,800 USD)</option>
            <option value="₹1,50,000+">₹1,50,000+ (~$1,800+ USD)</option>
            <option value="Let's discuss">Flexible / Let's discuss</option>
          </select>
        </div>
      </div>

      <div className="fl-form-field">
        <label htmlFor="fl-message" className="fl-form-label">
          Tell me about your project <span className="fl-req" aria-hidden="true">*</span>
        </label>
        <textarea
          id="fl-message"
          name="message"
          className="fl-form-input fl-form-textarea"
          required
          rows={4}
          value={form.message}
          onChange={set('message')}
          placeholder="What are you building? What's the core challenge? What's your desired timeline?"
        />
      </div>

      {error && (
        <div className="fl-form-error" role="alert">
          {error}
        </div>
      )}

      <div className="fl-form-actions">
        <button type="submit" className="fl-btn fl-btn--primary fl-btn--full">
          Launch Email Draft →
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="fl-btn fl-btn--ghost fl-btn--full"
          title="Copies formatted inquiry draft so you can paste into any client"
        >
          {status === 'copied' ? (
            <span className="inline-flex items-center justify-center gap-1.5">
              <Check size={13} strokeWidth={2.5} />
              <span>Copied Draft to Clipboard</span>
            </span>
          ) : (
            'Copy Inquiry Draft'
          )}
        </button>
      </div>

      <p className="fl-form-note">Direct email: <code>{EMAIL}</code> · No spam · Response within 24 hrs</p>
    </form>
  )
}

/* ─── Footer ─── */
function FreelanceFooter() {
  return (
    <footer className="fl-footer">
      <div className="fl-container fl-footer-inner">
        <span className="fl-footer-logo">AK<span>.</span></span>
        <span className="fl-footer-copy">Adityakeerti · {new Date().getFullYear()}</span>
        <a href="/" className="fl-footer-link">Back to Portfolio ←</a>
      </div>
    </footer>
  )
}

/* ─── Freelance Custom Cursor ─── */
function FreelanceCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const lag     = useRef({ x: -200, y: -200 })

  useEffect(() => {
    // Check if on a hover-capable device
    const isHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isHover) return

    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const tick = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`
      lag.current.x += (pos.current.x - lag.current.x) * 0.15
      lag.current.y += (pos.current.y - lag.current.y) * 0.15
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${lag.current.x}px,${lag.current.y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const attachHovers = () => {
      const links = document.querySelectorAll('a, button, .fl-service-card, .fl-work-tab, .fl-contact-email')
      links.forEach(el => {
        el.addEventListener('mouseenter', () => {
          ringRef.current?.classList.add('on')
          dotRef.current?.classList.add('on')
        })
        el.addEventListener('mouseleave', () => {
          ringRef.current?.classList.remove('on')
          dotRef.current?.classList.remove('on')
        })
      })
    }
    
    const t = setTimeout(attachHovers, 500)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="fl-cursor-wrap">
      <div ref={ringRef} className="fl-cursor-ring" />
      <div ref={dotRef}  className="fl-cursor-dot"  />
    </div>
  )
}

// Custom hook to set document meta for SEO dynamically
function useSEO({ title, description, keywords, schema }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const getOrCreateMeta = (attrName, attrValue) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      return element
    }

    const descMeta = getOrCreateMeta('name', 'description')
    const prevDesc = descMeta.getAttribute('content')
    descMeta.setAttribute('content', description)

    const keywordsMeta = getOrCreateMeta('name', 'keywords')
    const prevKeywords = keywordsMeta.getAttribute('content')
    keywordsMeta.setAttribute('content', keywords)

    const ogTitle = getOrCreateMeta('property', 'og:title')
    const prevOgTitle = ogTitle.getAttribute('content')
    ogTitle.setAttribute('content', title)

    const ogDesc = getOrCreateMeta('property', 'og:description')
    const prevOgDesc = ogDesc.getAttribute('content')
    ogDesc.setAttribute('content', description)

    const ogUrl = getOrCreateMeta('property', 'og:url')
    const prevOgUrl = ogUrl.getAttribute('content')
    ogUrl.setAttribute('content', window.location.href)

    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    scriptTag.text = JSON.stringify(schema)

    return () => {
      document.title = prevTitle
      if (prevDesc) descMeta.setAttribute('content', prevDesc)
      else descMeta.remove()

      if (prevKeywords) keywordsMeta.setAttribute('content', prevKeywords)
      else keywordsMeta.remove()

      if (prevOgTitle) ogTitle.setAttribute('content', prevOgTitle)
      else ogTitle.remove()

      if (prevOgDesc) ogDesc.setAttribute('content', prevOgDesc)
      else ogDesc.remove()

      if (prevOgUrl) ogUrl.setAttribute('content', prevOgUrl)
      else ogUrl.remove()

      if (scriptTag) scriptTag.remove()
    }
  }, [title, description, keywords, schema])
}

/* ─── Page ─── */
export default function FreelancePage() {
  useSEO({
    title: 'Aditya Keerti — Freelance Software Engineer & AI Architect',
    description: 'Specializing in custom AI agents, automated OCR systems, high-throughput backends, and full-stack Next.js web applications. Hire for remote contract work.',
    keywords: 'freelance software engineer, AI agent developer, next.js developer, fastapi freelance, custom OCR pipeline, system architect, fullstack developer, India developer',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Aditya Keerti — Freelance Software Engineer & AI Architect',
      'image': 'https://adityakeerti.vercel.app/og-image.jpg',
      'description': 'Freelance software engineer specializing in custom AI agents, OCR pipelines, high-throughput backends, and Next.js applications.',
      'url': 'https://adityakeerti.vercel.app/freelance',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Dehradun',
        'addressRegion': 'Uttarakhand',
        'addressCountry': 'IN'
      },
      'knowsAbout': [
        'Artificial Intelligence',
        'Machine Learning',
        'Software Engineering',
        'Full-Stack Web Development',
        'Backend Infrastructure',
        'OCR Systems',
        'Kafka Event Streaming'
      ]
    }
  })

  // Unlock scroll (main portfolio locks it)
  useEffect(() => {
    document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fl-page">
      <FreelanceCursor />
      <FreelanceNav />
      <FreelanceHero />
      <Services />
      <ClientWork />
      <Work />
      <Process />
      <SocialProof />
      <Contact />
      <FreelanceFooter />
    </div>
  )
}
