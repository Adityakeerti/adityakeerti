import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Server,
  Layers,
  Briefcase,
  Coffee,
  Send,
  Network,
  Radio,
  Clock,
  ShieldCheck,
  Check,
  Copy,
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  Phone,
  Loader2,
  Terminal,
  Activity,
  Sparkles,
  ExternalLink,
  Signal,
  CheckCircle2,
  MessageSquare
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   TOPIC CONFIGURATION (NO EMOJIS · SEMANTIC LUCIDE ICONS)
───────────────────────────────────────────────────────────── */
const CONTACT_TOPICS = [
  {
    id: 'ai',
    label: 'AI Systems & LLMs',
    icon: Bot,
    subject: 'Project Inquiry: AI Systems & LLMs',
    placeholder: 'Detail your AI/LLM architecture, multi-agent workflows, or fine-tuning requirements...',
    preset: 'Hi Aditya, I am looking to build a high-performance AI system / LLM application and would like to explore working together.',
    accent: '#FF4D00'
  },
  {
    id: 'backend',
    label: 'Scalable Backend',
    icon: Server,
    subject: 'Engineering Inquiry: Backend Architecture',
    placeholder: 'Describe your data throughput, microservices, API architecture, or database scalability targets...',
    preset: 'Hi Aditya, I came across your backend systems work and want to discuss architecting a scalable, high-throughput service.',
    accent: '#38bdf8'
  },
  {
    id: 'fullstack',
    label: 'Full-Stack App',
    icon: Layers,
    subject: 'Product Inquiry: Full-Stack Development',
    placeholder: 'Share your product concept, target stack (React, Node, Python), and roadmap goals...',
    preset: 'Hi Aditya, I have a product in development and need end-to-end full-stack engineering from UI to APIs.',
    accent: '#a78bfa'
  },
  {
    id: 'contract',
    label: 'Contract / Hire',
    icon: Briefcase,
    subject: 'Role / Contract Opportunity',
    placeholder: 'Outline the role profile, engineering scope, team setup, and target start date...',
    preset: "Hi Aditya, We are interested in exploring an engineering role / contract engagement with you. Let's schedule a call.",
    accent: '#34d399'
  },
  {
    id: 'hello',
    label: 'Say Hello',
    icon: Coffee,
    subject: 'Connecting with Aditya Keerti',
    placeholder: 'Drop a line, share an interesting paper or tech stack, or just connect...',
    preset: 'Hi Aditya, I really enjoyed your portfolio and engineering projects. Wanted to connect and say hello!',
    accent: '#fbbf24'
  },
]

/* ─────────────────────────────────────────────────────────────
   SLIDING CARD ANIMATION VARIANTS (SPRING PHYSICS)
───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardSlideVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.985 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 220,
      mass: 0.8,
    },
  },
}

export default function ContactConsole({ about, resumeUrl = '/ADITYA_RESUME.pdf' }) {
  const [activeTab, setActiveTab] = useState('dispatch') // 'dispatch' | 'channels'
  const [topic, setTopic] = useState('ai')
  const [message, setMessage] = useState('')
  const [copiedKey, setCopiedKey] = useState(null)
  const [transmitState, setTransmitState] = useState('idle') // 'idle' | 'transmitting' | 'dispatched'
  const [timeString, setTimeString] = useState('')
  const [latency, setLatency] = useState(21)

  const email = about?.email || 'adityacodes404@gmail.com'
  const phone = about?.phone || '+91 88096 91824'
  const github = about?.github || 'https://github.com/Adityakeerti'
  const linkedin = about?.linkedin || 'https://linkedin.com/in/adityakeerti'
  const location = about?.location || 'Bengaluru, India'
  const activeTopicObj = CONTACT_TOPICS.find((t) => t.id === topic) || CONTACT_TOPICS[0]

  // Monotonic real-time IST clock (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        setTimeString(formatter.format(now))
      } catch {
        const now = new Date()
        setTimeString(now.toTimeString().split(' ')[0])
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulated latency jitter (18ms - 25ms)
  useEffect(() => {
    const pingInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = (Math.random() - 0.5) * 4
        return Math.round(Math.max(17, Math.min(26, prev + delta)))
      })
    }, 4500)
    return () => clearInterval(pingInterval)
  }, [])

  // Robust clipboard copy with fallback
  const handleCopy = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2200)
  }

  // Interactive transmission simulation
  const handleTransmit = (e) => {
    if (e) e.preventDefault()
    if (transmitState === 'transmitting') return

    setTransmitState('transmitting')

    const subject = encodeURIComponent(activeTopicObj.subject)
    const textToSend = message.trim() || activeTopicObj.preset
    const bodyText = encodeURIComponent(
      `${textToSend}\n\n— Dispatched via Aditya Keerti Portfolio Console (https://adityakeerti.dev)`
    )
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${bodyText}`

    // Copy draft as fallback
    handleCopy(textToSend, 'draft_copy')

    // Simulate synthesis phase then trigger mailto
    setTimeout(() => {
      window.open(mailtoUrl, '_blank')
      setTransmitState('dispatched')
      setTimeout(() => {
        setTransmitState('idle')
      }, 4000)
    }, 600)
  }

  const applyPreset = (presetText) => {
    setMessage(presetText)
  }

  return (
    <div className="contact-win os-win">
      {/* ── Console Header Bar ── */}
      <div className="os-win-bar">
        <div className="os-win-traffic">
          <span className="os-d r" />
          <span className="os-d y" />
          <span className="os-d g" />
        </div>

        <div className="c-console-title-wrap">
          <Terminal size={12} className="c-terminal-icon" />
          <span className="os-win-title">~/dispatch/connect-console.sh</span>
        </div>

        {/* View Switcher Tabs */}
        <div className="c-console-nav" role="tablist" aria-label="Console views">
          <button
            type="button"
            className={`c-console-tab-btn${activeTab === 'dispatch' ? ' active' : ''}`}
            onClick={() => setActiveTab('dispatch')}
            role="tab"
            aria-selected={activeTab === 'dispatch'}
          >
            <Send size={11} />
            <span>Quick Dispatch</span>
          </button>
          <button
            type="button"
            className={`c-console-tab-btn${activeTab === 'channels' ? ' active' : ''}`}
            onClick={() => setActiveTab('channels')}
            role="tab"
            aria-selected={activeTab === 'channels'}
          >
            <Network size={11} />
            <span>Channels &amp; SLA</span>
          </button>
        </div>

        <div className="c-console-badge">
          <span className="c-beacon-dot" aria-hidden="true" />
          <span className="c-badge-text">LIVE NODE</span>
        </div>
      </div>

      {/* ── Console Body with Sliding Cards ── */}
      <div className="contact-win-body">
        <AnimatePresence mode="wait">
          {activeTab === 'dispatch' ? (
            <motion.div
              key="dispatch-view"
              className="c-bento-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Card 1: Interactive Command Transmitter */}
              <motion.div
                className="c-bento-card c-bento-transmitter"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-card-header">
                  <div className="c-card-header-left">
                    <Send size={13} className="c-card-lucide-icon" />
                    <span className="c-card-title">DISPATCH TRANSMITTER</span>
                  </div>
                  <div className="c-header-badges">
                    <span className="c-card-pill">INTERACTIVE</span>
                  </div>
                </div>

                <p className="c-card-desc">
                  Select a communication vector to prime transmission parameters:
                </p>

                {/* Topic Pills with Lucide Icons (Zero Emojis) */}
                <div className="c-topic-pills" role="radiogroup" aria-label="Topic track">
                  {CONTACT_TOPICS.map((t) => {
                    const Icon = t.icon
                    const isSelected = topic === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={`c-topic-pill${isSelected ? ' active' : ''}`}
                        onClick={() => setTopic(t.id)}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        <Icon size={12} className="c-topic-icon" />
                        <span>{t.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Transmission Route Header */}
                <div className="c-route-preview">
                  <div className="c-route-item">
                    <span className="c-route-label">TO:</span>
                    <span className="c-route-val">{email}</span>
                  </div>
                  <div className="c-route-item c-route-sub">
                    <span className="c-route-label">SUB:</span>
                    <span className="c-route-val">{activeTopicObj.subject}</span>
                  </div>
                </div>

                {/* Composer Textarea */}
                <div className="c-input-wrap">
                  <textarea
                    className="c-dispatch-textarea"
                    placeholder={activeTopicObj.placeholder}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-label="Message brief"
                  />
                  <div className="c-textarea-footer">
                    <div className="c-preset-chips">
                      <span className="c-preset-label">Quick insert:</span>
                      <button
                        type="button"
                        className="c-preset-btn"
                        onClick={() => applyPreset(activeTopicObj.preset)}
                        title="Insert recommended topic brief"
                      >
                        Use topic brief
                      </button>
                      {message && (
                        <button
                          type="button"
                          className="c-preset-btn c-preset-clear"
                          onClick={() => setMessage('')}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <span className="c-char-count">{message.length} chars</span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="c-action-row">
                  <button
                    type="button"
                    className={`btn primary c-transmit-btn${
                      transmitState === 'transmitting' ? ' is-loading' : ''
                    }${transmitState === 'dispatched' ? ' is-dispatched' : ''}`}
                    onClick={handleTransmit}
                    disabled={transmitState === 'transmitting'}
                  >
                    {transmitState === 'transmitting' ? (
                      <>
                        <Loader2 size={13} className="c-spin" />
                        <span>Synthesizing Payload...</span>
                      </>
                    ) : transmitState === 'dispatched' ? (
                      <>
                        <Check size={13} strokeWidth={2.5} />
                        <span>Mail Client Dispatched &amp; Copied!</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Transmit Message &rarr;</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn c-copy-email-btn"
                    onClick={() => handleCopy(email, 'email_main')}
                    aria-label="Copy email address"
                  >
                    {copiedKey === 'email_main' ? (
                      <>
                        <Check size={12} strokeWidth={2.5} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Direct Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dispatched Notification Banner */}
                {transmitState === 'dispatched' && (
                  <motion.div
                    className="c-dispatch-toast"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={13} className="text-green" />
                    <span>
                      Mail composer opened with auto-primed subject. Draft brief safely copied to clipboard.
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* Card 2: Operational Node Status, Latency & SLA */}
              <motion.div
                className="c-bento-card c-bento-status"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-status-row">
                  <div className="c-status-beacon" aria-hidden="true">
                    <span className="c-beacon-dot" />
                    <span className="c-beacon-ping" />
                  </div>
                  <div className="c-status-info">
                    <div className="c-status-tag-row">
                      <span className="c-status-tag">NODE OPERATIONAL &middot; ACTIVE AVAILABILITY</span>
                      <span className="c-latency-pill">
                        <Signal size={10} />
                        <span>{latency}ms RTT</span>
                      </span>
                    </div>
                    <div className="c-status-sub">
                      <span className="c-clock-item">
                        <Clock size={11} />
                        <span>{location} (IST &middot; {timeString || 'UTC+5:30'})</span>
                      </span>
                      <span className="c-sub-sep">&middot;</span>
                      <span className="c-sla-pill">
                        <ShieldCheck size={11} />
                        <span>&lt; 24h Verified SLA</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Quick Touchpoint Dock */}
              <motion.div
                className="c-bento-card c-bento-dock"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-dock-row">
                  <div className="c-dock-left">
                    <Network size={12} className="c-dock-icon" />
                    <span className="c-dock-label">Direct Channels:</span>
                  </div>
                  <div className="c-dock-links">
                    <button
                      type="button"
                      className="c-dock-link"
                      onClick={() => handleCopy(email, 'dock_email')}
                    >
                      <Mail size={11} />
                      <span>{copiedKey === 'dock_email' ? 'Copied Email' : 'Email'}</span>
                    </button>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-dock-link"
                    >
                      <ArrowUpRight size={11} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-dock-link"
                    >
                      <ArrowUpRight size={11} />
                      <span>LinkedIn</span>
                    </a>
                    <button
                      type="button"
                      className="c-dock-switch-btn"
                      onClick={() => setActiveTab('channels')}
                    >
                      <span>Full Matrix &rarr;</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="channels-view"
              className="c-bento-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Card 1: Verified Touchpoints Matrix */}
              <motion.div
                className="c-bento-card c-bento-matrix"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-card-header">
                  <div className="c-card-header-left">
                    <Network size={13} className="c-card-lucide-icon" />
                    <span className="c-card-title">VERIFIED TOUCHPOINTS</span>
                  </div>
                  <span className="c-card-hint">Click cell to copy or open link</span>
                </div>

                <div className="c-touchpoints-grid">
                  {/* Email Cell */}
                  <button
                    type="button"
                    className="c-touch-cell"
                    onClick={() => handleCopy(email, 'email_grid')}
                    title="Click to copy email address"
                  >
                    <div className="c-cell-top">
                      <div className="c-cell-label-wrap">
                        <Mail size={11} className="c-cell-type-icon" />
                        <span className="c-cell-label">Email (Direct)</span>
                      </div>
                      <span className="c-cell-action">
                        {copiedKey === 'email_grid' ? (
                          <span className="c-copied-feedback">
                            <Check size={10} strokeWidth={2.5} />
                            <span>COPIED</span>
                          </span>
                        ) : (
                          'COPY'
                        )}
                      </span>
                    </div>
                    <div className="c-cell-val">{email}</div>
                  </button>

                  {/* Phone Cell */}
                  <button
                    type="button"
                    className="c-touch-cell"
                    onClick={() => handleCopy(phone, 'phone_grid')}
                    title="Click to copy phone number"
                  >
                    <div className="c-cell-top">
                      <div className="c-cell-label-wrap">
                        <Phone size={11} className="c-cell-type-icon" />
                        <span className="c-cell-label">Phone / WhatsApp</span>
                      </div>
                      <span className="c-cell-action">
                        {copiedKey === 'phone_grid' ? (
                          <span className="c-copied-feedback">
                            <Check size={10} strokeWidth={2.5} />
                            <span>COPIED</span>
                          </span>
                        ) : (
                          'COPY'
                        )}
                      </span>
                    </div>
                    <div className="c-cell-val">{phone}</div>
                  </button>

                  {/* GitHub Cell */}
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-touch-cell c-touch-link"
                  >
                    <div className="c-cell-top">
                      <div className="c-cell-label-wrap">
                        <ArrowUpRight size={11} className="c-cell-type-icon" />
                        <span className="c-cell-label">GitHub Profile</span>
                      </div>
                      <span className="c-cell-action">OPEN &rarr;</span>
                    </div>
                    <div className="c-cell-val">github.com/Adityakeerti</div>
                  </a>

                  {/* LinkedIn Cell */}
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-touch-cell c-touch-link c-touch-li"
                  >
                    <div className="c-cell-top">
                      <div className="c-cell-label-wrap">
                        <ArrowUpRight size={11} className="c-cell-type-icon" />
                        <span className="c-cell-label">LinkedIn Network</span>
                      </div>
                      <span className="c-cell-action">CONNECT &rarr;</span>
                    </div>
                    <div className="c-cell-val">linkedin.com/in/adityakeerti</div>
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Live Radar & Telemetry Detailed */}
              <motion.div
                className="c-bento-card c-bento-radar"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-card-header">
                  <div className="c-card-header-left">
                    <Radio size={13} className="c-card-lucide-icon" />
                    <span className="c-card-title">TELEMETRY &amp; RADAR</span>
                  </div>
                  <span className="c-card-pill">IST · UTC+5:30</span>
                </div>

                <div className="c-radar-body">
                  {/* Radar Display Visual */}
                  <div className="c-radar-visual" aria-hidden="true">
                    <div className="c-radar-rings">
                      <div className="c-radar-ring r1" />
                      <div className="c-radar-ring r2" />
                      <div className="c-radar-ring r3" />
                      <div className="c-radar-axis-h" />
                      <div className="c-radar-axis-v" />
                      <div className="c-radar-sweep-beam" />
                      <div className="c-radar-blip b1" />
                      <div className="c-radar-blip b2" />
                    </div>
                  </div>

                  {/* Telemetry Stats List */}
                  <div className="c-radar-stats">
                    <div className="c-telemetry-row">
                      <span className="c-telemetry-label">PRIMARY NODE</span>
                      <span className="c-telemetry-val">{location}</span>
                    </div>
                    <div className="c-telemetry-row">
                      <span className="c-telemetry-label">LOCAL CLOCK</span>
                      <span className="c-telemetry-val font-mono">{timeString || '21:00:00'} IST</span>
                    </div>
                    <div className="c-telemetry-row">
                      <span className="c-telemetry-label">RESPONSE SLA</span>
                      <span className="c-telemetry-val text-orange">&lt; 24h Direct Guaranteed</span>
                    </div>
                    <div className="c-telemetry-row">
                      <span className="c-telemetry-label">SYSTEM UPTIME</span>
                      <span className="c-telemetry-val text-green">99.98% &middot; Healthy</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Curriculum Vitae & Vault */}
              <motion.div
                className="c-bento-card c-bento-docs"
                variants={cardSlideVariants}
                whileHover={{ y: -3, scale: 1.008 }}
                transition={{ duration: 0.2 }}
              >
                <div className="c-docs-inner">
                  <div className="c-docs-info">
                    <div className="c-docs-title-row">
                      <FileText size={13} className="c-docs-icon" />
                      <span className="c-docs-title">CURRICULUM VITAE</span>
                    </div>
                    <span className="c-docs-meta">
                      Software Engineer &middot; Full-Stack &amp; AI Systems (PDF)
                    </span>
                  </div>
                  <div className="c-docs-btns">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary"
                    >
                      <ArrowUpRight size={11} />
                      <span>View Résumé</span>
                    </a>
                    <a
                      href={resumeUrl}
                      download="ADITYA_RESUME.pdf"
                      className="btn"
                    >
                      <Download size={11} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Console Footer */}
        <div className="contact-footer">
          <div className="c-footer-left">
            <span>Built by {about?.name || 'Adityakeerti'} &middot; {new Date().getFullYear()}</span>
          </div>
          <div className="c-footer-prompt">
            <Check size={11} className="c-footer-check" />
            <span>exit code 0 (all systems operational)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
