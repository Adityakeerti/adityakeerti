import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

const SERVICES = [
  {
    id: 'ai-agents',
    icon: '🤖',
    title: 'AI Agents & Automation',
    desc: 'Build autonomous agents that reason, act, and recover from errors — from desktop automation bots to LLM-orchestrated pipelines. Production-ready, not toy demos.',
    tags: ['Python', 'LLMs', 'ReAct Loops', 'Win32 API', 'Background Daemons'],
    project: 'rage',
  },
  {
    id: 'ml-backend',
    icon: '🧠',
    title: 'ML Pipelines & Backend Systems',
    desc: 'End-to-end ML systems — model training, serving APIs, high-throughput microservices. From PyTorch models to Kafka event streams under 300ms latency.',
    tags: ['PyTorch', 'FastAPI', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL'],
    project: 'credit-limit-rl',
  },
  {
    id: 'doc-intelligence',
    icon: '📄',
    title: 'Document Intelligence & OCR',
    desc: 'Automated extraction of structured data from any document type — PDFs, scanned forms, tables. Custom pipelines with built-in fraud-mitigation and validation.',
    tags: ['YOLOv8', 'OpenCV', 'HuggingFace', 'OCR', 'FastAPI', 'MySQL'],
    project: 'doc-oc',
  },
  {
    id: 'fullstack',
    icon: '🌐',
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
  { area: 'AI & Automation', detail: 'LLM Orchestration · ReAct loops · Agents' },
  { area: 'OCR & Computer Vision', detail: 'YOLOv8 · Table Transformers · OpenCV' },
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

/* ─── Social Proof ─── */
function SocialProof() {
  return (
    <Section id="proof">
      <FadeIn>
        <span className="fl-section-eyebrow">Track Record</span>
        <h2 className="fl-section-h2">Recognition &amp; Results</h2>
        <p className="fl-section-sub">Demonstrated ability to deliver high-performance solutions and real business value.</p>
      </FadeIn>
      
      <div className="fl-proof-columns">
        {/* Left Column: Industrial/Professional Impact */}
        <div className="fl-proof-col">
          <h3 className="fl-proof-col-title">Professional Impact</h3>
          <div className="fl-proof-col-list">
            <FadeIn delay={0.05}>
              <div className="fl-proof-card fl-proof-card--highlight">
                <span className="fl-proof-type">internship · speed</span>
                <h4 className="fl-proof-title">30× Processing Speed — Peerprep</h4>
                <p className="fl-proof-desc">Built an automated ingestion engine that cut per-record processing from 10 minutes to ~30 seconds at 99.98% accuracy on production validation data.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="fl-proof-card">
                <span className="fl-proof-type">hackathon finalist · architecture</span>
                <h4 className="fl-proof-title">HackTheWinter Finalist — Advanzia AutoLend</h4>
                <p className="fl-proof-desc">Built an autonomous credit limit optimization model using reinforcement learning. Developed a supporting high-throughput backend (Spring Boot/FastAPI/Kafka/Redis) handling 5,000+ requests/min under 300ms latency.</p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Right Column: Hackathons & Awards */}
        <div className="fl-proof-col">
          <h3 className="fl-proof-col-title">Hackathons &amp; Awards</h3>
          <div className="fl-proof-col-list">
            {achievements.filter(a => a.id !== 'hackthewinter').map((a, i) => (
              <FadeIn key={a.id} delay={i * 0.08 + 0.1}>
                <div className="fl-proof-card">
                  <span className="fl-proof-type">{a.type}</span>
                  <h4 className="fl-proof-title">{a.title}</h4>
                  <p className="fl-proof-desc">{a.description}</p>
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
            <button className="fl-contact-email" onClick={copyEmail} title="Click to copy">
              <span className="fl-contact-label">Email</span>
              <span className="fl-contact-val">
                {EMAIL}
                <span className="fl-copy-badge">{copied ? '✓ Copied' : 'Copy'}</span>
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

/* ─── Contact Form ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', type: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Build mailto link as fallback — replace with your backend/Formspree if needed
    const subject = encodeURIComponent(`Freelance Inquiry: ${form.type || 'Project'} from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nContact: ${form.contact}\nProject Type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`
    )
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`, '_blank')
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="fl-form-success">
        <div className="fl-form-success-icon">✓</div>
        <h3>Your message is on its way!</h3>
        <p>I usually respond within 24 hours. Talk soon.</p>
        <button className="fl-btn fl-btn--ghost" onClick={() => { setForm({ name:'', contact:'', type:'', budget:'', message:'' }); setStatus('idle') }}>
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form className="fl-form" onSubmit={handleSubmit}>
      <div className="fl-form-row">
        <div className="fl-form-field">
          <label className="fl-form-label">Your Name *</label>
          <input className="fl-form-input" required value={form.name} onChange={set('name')} placeholder="Jane Smith" />
        </div>
        <div className="fl-form-field">
          <label className="fl-form-label">Email / Phone *</label>
          <input className="fl-form-input" required value={form.contact} onChange={set('contact')} placeholder="you@company.com" />
        </div>
      </div>
      <div className="fl-form-row">
        <div className="fl-form-field">
          <label className="fl-form-label">Project Type</label>
          <select className="fl-form-input fl-form-select" value={form.type} onChange={set('type')}>
            <option value="">Select a service…</option>
            <option>AI Agent / Automation</option>
            <option>ML Pipeline / Backend</option>
            <option>Document Intelligence / OCR</option>
            <option>Full-Stack Web App</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="fl-form-field">
          <label className="fl-form-label">Budget Range</label>
          <select className="fl-form-input fl-form-select" value={form.budget} onChange={set('budget')}>
            <option value="">Select a range…</option>
            <option>Under ₹15,000</option>
            <option>₹15,000 – ₹50,000</option>
            <option>₹50,000 – ₹1,50,000</option>
            <option>₹1,50,000+</option>
            <option>Let's discuss</option>
          </select>
        </div>
      </div>
      <div className="fl-form-field">
        <label className="fl-form-label">Tell me about your project *</label>
        <textarea
          className="fl-form-input fl-form-textarea"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="What are you building? What's the problem? What's your timeline?"
        />
      </div>
      <button type="submit" className="fl-btn fl-btn--primary fl-btn--full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Opening…' : 'Send Inquiry →'}
      </button>
      <p className="fl-form-note">Opens in Gmail · No spam · Response within 24 hrs</p>
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

/* ─── Page ─── */
export default function FreelancePage() {
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
