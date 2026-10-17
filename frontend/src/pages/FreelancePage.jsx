import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
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
    title: 'AI Systems & LLM Workflows',
    desc: 'Build autonomous agentic workflows and LLM pipelines designed for production reliability — structured outputs, tool use, and self-healing error recovery without manual human intervention.',
    tags: ['Python', 'LLMs', 'VLM', 'FastAPI', 'Function Calling', 'RAG'],
  },
  {
    id: 'ml-backend',
    icon: <PipelineIcon />,
    title: 'ML Pipelines & Backend Systems',
    desc: 'End-to-end ML systems — model training, serving APIs, high-throughput microservices. From PyTorch models to Kafka event streams under 300ms latency.',
    tags: ['PyTorch', 'FastAPI', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL'],
    project: 'credit-limit-rl',
  },
  {
    id: 'doc-intelligence',
    icon: <DocumentVlmIcon />,
    title: 'Document Intelligence & Multimodal VLMs',
    desc: 'High-speed, 100% offline Vision-Language Model extraction engines for complex documents and tabular data. Zero cloud OCR API costs, 100% schema adherence via C++ GBNF grammar decoding, and self-healing arithmetic validation.',
    tags: ['VLM', 'llama.cpp', 'GBNF Grammars', 'FastAPI', 'Pydantic', 'PyMuPDF'],
    project: 'doc-oc',
  },
  {
    id: 'fullstack',
    icon: <FullStackIcon />,
    title: 'Full-Stack Web Applications',
    desc: 'Complete web apps from database schema to deployed frontend. REST APIs, async backends, secure auth, React UIs — shipped fast, built to scale.',
    tags: ['React', 'TypeScript', 'FastAPI', 'JWT', 'Docker', 'Vercel'],
    project: 'campusintel',
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: "Free 20-min call. You explain the problem, I tell you how I'd solve it and whether I'm the right fit." },
  { step: '02', title: 'Scope & Quote', desc: "I send a clear scope doc — deliverables, timeline, cost. No hidden fees, no vague \"it depends\" answers." },
  { step: '03', title: 'Build & Ship', desc: "Weekly updates, clean code, documented handoff. You can see progress; you're never in the dark." },
  { step: '04', title: 'Support', desc: '2 weeks of free post-delivery support to handle any edge cases. After that, retainer options available.' },
]

const TECHNICAL_FOCUS = [
  { area: 'Backends & Scale', detail: 'Spring Boot · FastAPI · Kafka · Redis' },
  { area: 'AI & Edge Inference', detail: 'Local VLMs · llama.cpp · GBNF · Ollama' },
  { area: 'Document Intelligence', detail: 'Spatial VLMs · Table Extraction · OpenCV' },
  { area: 'Full-Stack Engineering', detail: 'React · Next.js · Prisma · PostgreSQL' },
]

/* ─── Featured projects for freelance page ─── */
const FEATURED_PROJECTS = projects.filter(p => p.featured)

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
          <a href="#client-work"  onClick={handleScroll('client-work')}   className="fl-nav-link">Freelance Work</a>
          <a href="#work"         onClick={handleScroll('work')}          className="fl-nav-link">Projects</a>
          <a href="#process"      onClick={handleScroll('process')}       className="fl-nav-link">Process</a>
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
            Full-Stack Developer &amp; AI/ML Engineer · 5 deployed projects · National hackathon winner ·
            Reduced document processing from 10 min → 30 sec for a real client.
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div className="fl-hero-actions">
            <a href="#contact" onClick={handleScroll('contact')} className="fl-btn fl-btn--primary">Start a Project →</a>
            <a href="#work"    onClick={handleScroll('work')}    className="fl-btn fl-btn--ghost">See My Work</a>
          </div>
        </FadeIn>

        {/* Technical Focus */}
        <FadeIn delay={0.45}>
          <div className="fl-focus-bar">
            {TECHNICAL_FOCUS.map(f => (
              <div key={f.area} className="fl-focus-item">
                <span className="fl-focus-area">{f.area}</span>
                <span className="fl-focus-detail">{f.detail}</span>
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
              <a href="#work" onClick={handleScroll('work')} className="fl-service-link">See example project →</a>
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

/* ─── Work / Projects ─── */
function Work() {
  const [active, setActive] = useState(0)
  const proj = FEATURED_PROJECTS[active]

  const handleScroll = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="work">
      <FadeIn>
        <span className="fl-section-eyebrow">Portfolio</span>
        <h2 className="fl-section-h2">Selected Work</h2>
        <p className="fl-section-sub">Real projects. Real problems solved. Real numbers.</p>
      </FadeIn>

      <div className="fl-work-layout">
        {/* Tab list */}
        <div className="fl-work-tabs">
          {FEATURED_PROJECTS.map((p, i) => (
            <button
              key={p.id}
              className={`fl-work-tab${active === i ? ' fl-work-tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="fl-work-tab-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="fl-work-tab-title">{p.title}</div>
                <div className="fl-work-tab-sub">{p.subtitle}</div>
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
              <div className="fl-work-detail-head">
                <div>
                  <h3 className="fl-work-title">{proj.title}</h3>
                  <p className="fl-work-subtitle">{proj.subtitle} · {proj.date}</p>
                </div>
                <div className="fl-work-links">
                  {proj.demo   && <a href={proj.demo}   target="_blank" rel="noopener noreferrer" className="fl-btn fl-btn--sm fl-btn--primary">Live Demo ↗</a>}
                  {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="fl-btn fl-btn--sm fl-btn--ghost">Source</a>}
                </div>
              </div>

              <div className="fl-work-sections">
                <div className="fl-work-block">
                  <div className="fl-work-label">The Problem</div>
                  <p className="fl-work-text">{proj.problem}</p>
                </div>
                <div className="fl-work-block">
                  <div className="fl-work-label">How I Solved It</div>
                  <p className="fl-work-text">{proj.approach}</p>
                </div>
                {proj.outcomes?.length > 0 && (
                  <div className="fl-work-block">
                    <div className="fl-work-label">Results</div>
                    <ul className="fl-outcomes">
                      {proj.outcomes.map((o, k) => <li key={k}>{o}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="fl-work-stack">
                {proj.techStack.map(t => <span key={t} className="fl-tag fl-tag--orange">{t}</span>)}
              </div>

              <div className="fl-work-hire-nudge">
                Need something similar? <a href="#contact" onClick={handleScroll('contact')}>Let's scope your project →</a>
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
      desc: 'Engineered an AI SOF extraction pipeline on Vertex AI for the Integrated Maritime Exchange, winning 1st place nationwide.',
      highlight: true
    },
    {
      id: 'hackthewinter',
      badge: 'Top 3 Finalist · National',
      title: 'HackTheWinter Hackathon',
      desc: 'Built an autonomous credit limit optimization model with Dueling Double DQN and an async microservice handling 5,000+ req/min.',
      highlight: false
    },
    {
      id: 'india-innovates',
      badge: 'Top 500 Teams · Bharat Mandapam',
      title: 'India Innovates 2026',
      desc: 'Selected into the top 500 teams physically competing at Bharat Mandapam, New Delhi in India’s premier national civic-tech hackathon.',
      highlight: false
    }
  ],
  production: [
    {
      id: 'peerprep',
      badge: '30× Ingestion Speedup',
      title: 'Peerprep Ingestion Engine',
      desc: 'Built an automated ingestion engine cutting per-record processing from 10 minutes to ~30 seconds at 99.98% accuracy on production data.',
      highlight: true
    },
    {
      id: 'doc-oc',
      badge: '4.3× Local Latency · $0 API Cost',
      title: 'DOC-OC V2 Edge VLM',
      desc: 'Completely offline multimodal document engine running Gemma-4 via llama.cpp with C++ GBNF grammar decoding, slashing inference to 6.28s.',
      highlight: false
    },
    {
      id: 'live-saas',
      badge: 'Active Production Deployments',
      title: 'Anand Kosh & Drisu Compliance',
      desc: 'Deployed 3-tier RBAC patient records system on Render/PostgreSQL and built 30+ live service pages with structured SEO schema.',
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
            <option value="AI Systems & LLM Workflows">AI Systems &amp; LLM Workflows</option>
            <option value="ML Pipelines & Backend Systems">ML Pipelines &amp; Backend Systems</option>
            <option value="Document Intelligence & Multimodal VLMs">Document Intelligence &amp; Multimodal VLMs</option>
            <option value="Full-Stack Web Applications">Full-Stack Web Applications</option>
            <option value="Something else">Custom Consulting / Something else</option>
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
