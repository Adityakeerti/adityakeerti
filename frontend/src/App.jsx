import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MediaGallery from './components/MediaGallery'

import about       from './data/about.json'
import projects    from './data/projects.json'
import skills      from './data/skills.json'
import experience  from './data/experience.json'
import achievements from './data/achievements.json'

const RESUME = '/ADITYA_RESUME.pdf'

const SECTIONS = [
  { id: 'about',        label: '01_ABOUT'        },
  { id: 'experience',   label: '02_EXPERIENCE'   },
  { id: 'projects',     label: '03_PROJECTS'     },
  { id: 'skills',       label: '04_SKILLS'       },
  { id: 'achievements', label: '05_ACHIEVEMENTS' },
  { id: 'contact',      label: '06_CONTACT'      },
]

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const lag     = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const tick = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`
      lag.current.x += (pos.current.x - lag.current.x) * 0.12
      lag.current.y += (pos.current.y - lag.current.y) * 0.12
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${lag.current.x}px,${lag.current.y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Hover effects
    const attachHovers = () => {
      document.querySelectorAll('a,button,.proj-item,.c-social,.btn,.st-tab').forEach(el => {
        el.addEventListener('mouseenter', () => ringRef.current?.classList.add('on'))
        el.addEventListener('mouseleave', () => ringRef.current?.classList.remove('on'))
      })
    }
    const t = setTimeout(attachHovers, 3500)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="c-wrap">
      <div ref={ringRef} className="c-ring" />
      <div ref={dotRef}  className="c-dot"  />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [p, setP] = useState(0)

  useEffect(() => {
    const t0 = setTimeout(() => setP(1), 200)
    const t1 = setTimeout(() => setP(2), 700)
    const t2 = setTimeout(() => setP(3), 1250)
    const t3 = setTimeout(() => setP(4), 1700)
    const t4 = setTimeout(() => setP(5), 2700)
    const t5 = setTimeout(() => onDone(),  3300)
    return () => [t0,t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [onDone])

  const nameChars = [...'ADITYAKEERTI']

  return (
    <motion.div
      className="loader"
      animate={p >= 5 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Orange seed line */}
      <motion.div
        className="loader-line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={p >= 1 ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* AK architectural text */}
      <motion.span
        className="loader-ak"
        initial={{ opacity: 0, filter: 'blur(24px)' }}
        animate={p >= 1 ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        AK
      </motion.span>

      {/* Name character by character */}
      <div className="loader-name">
        {nameChars.map((ch, i) => (
          <motion.span
            key={i}
            className="loader-char"
            initial={{ opacity: 0, y: 12 }}
            animate={p >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* Role */}
      <motion.p
        className="loader-role"
        initial={{ opacity: 0 }}
        animate={p >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Full-Stack Developer
        <span className="loader-dot" />
        AI/ML Engineer
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   OS WINDOW
───────────────────────────────────────────────────────────── */
function OSWin({ title, children, className = '', style = {}, angle = 0, bodyClass = '' }) {
  return (
    <div
      className={`os-win ${className}`}
      style={{ ...style, transform: `${style.transform || ''} rotate(${angle}deg)` }}
    >
      <div className="os-win-bar">
        <span className="os-d r" /><span className="os-d y" /><span className="os-d g" />
        <span className="os-win-title">{title}</span>
      </div>
      <div className={`os-win-body ${bodyClass}`}>
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL VARIANTS
───────────────────────────────────────────────────────────── */
const pv = {
  enter: d => ({ x: d > 0 ? '6%' : '-6%', opacity: 0, filter: 'blur(10px)', scale: 0.975 }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit:  d => ({ x: d > 0 ? '-6%' : '6%', opacity: 0, filter: 'blur(10px)', scale: 0.975 }),
}
const pt = { duration: 0.55, ease: [0.16, 1, 0.3, 1] }

/* ─────────────────────────────────────────────────────────────
   PANEL 1 — ABOUT
───────────────────────────────────────────────────────────── */
function AboutPanel() {
  return (
    <div className="about-panel">
      {/* Left: vertical name */}
      <div className="about-vert">
        <span className="about-vert-name">{about.name?.toUpperCase()}</span>
        <span className="about-vert-role">Full-Stack · AI/ML</span>
      </div>

      {/* Orange separator */}
      <div className="about-sep" />

      {/* Right: OS window */}
      <div className="about-content">
        <OSWin title="~/about.txt" className="about-win" bodyClass="about-win-body" style={{ height: '100%' }}>
          <div className="p-eyebrow">01 / Profile</div>

          <p className="about-bio">{about.bio}</p>

          <div className="about-rule" />

          <div>
            <p className="about-edu-label">Education</p>
            <p className="about-edu-degree">{about.education.degree}</p>
            <p className="about-edu-meta">{about.education.university}</p>
            <p className="about-edu-meta" style={{ color: 'var(--text-3)', marginTop: '0.2rem' }}>
              {about.education.year} &nbsp;·&nbsp; CGPA {about.education.result}
            </p>
          </div>

          <div className="about-rule" />

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div>
              <p className="about-edu-label">Location</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{about.location}</p>
            </div>
            <div>
              <p className="about-edu-label">Status</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--green)', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} />
                Open to Work
              </p>
            </div>
          </div>

          <div className="about-links">
            <a href={about.github} target="_blank" rel="noopener noreferrer" className="btn">
              <GithubIcon /> GitHub
            </a>
            <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-linkedin">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-resume">
              <ResumeIcon /> Résumé ↗
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`} target="_blank" rel="noopener noreferrer" className="btn primary">
              Say Hello →
            </a>
          </div>
        </OSWin>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL 2 — EXPERIENCE
───────────────────────────────────────────────────────────── */
function ExperiencePanel() {
  const [active, setActive] = useState(0)
  const exp = experience[active]

  return (
    <div className="exp-panel">
      {/* watermark */}
      <div className="exp-watermark" aria-hidden>EXPERIENCE</div>

      <div className="exp-win">
        {experience.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {experience.map((e, i) => (
              <button
                key={e.id}
                className={`btn${active === i ? ' primary' : ''}`}
                onClick={() => setActive(i)}
                style={{ fontSize: '0.6rem' }}
              >
                {e.company}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          {exp && (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <OSWin title={`~/experience/${exp.id}.json`}>
                <div className="exp-win-body">
                  {/* zsh command line */}
                  <div className="term-cmd-row">
                    <span className="term-prompt">➜</span>
                    <span className="term-dir">~/portfolio</span>
                    <span className="term-cmd-text">cat experience/{exp.id}.json</span>
                  </div>

                  {/* JSON-style output */}
                  <div className="term-data">
                    <div className="td-brace">{'{'}</div>
                    <div>
                      <span className="td-key">"company"</span>
                      <span className="td-colon">: </span>
                      <span className="td-str">"{exp.company}"</span><span className="td-brace">,</span>
                    </div>
                    <div>
                      <span className="td-key">"role"</span>
                      <span className="td-colon">: </span>
                      <span className="td-str">"{exp.role}"</span><span className="td-brace">,</span>
                    </div>
                    <div>
                      <span className="td-key">"period"</span>
                      <span className="td-colon">: </span>
                      <span className="td-val">"{exp.period}"</span><span className="td-brace">,</span>
                    </div>
                    <div>
                      <span className="td-key">"type"</span>
                      <span className="td-colon">: </span>
                      <span className="td-val">"{exp.type}"</span><span className="td-brace">,</span>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <span className="td-key">"highlights"</span>
                      <span className="td-colon">: </span>
                      <span className="td-brace">{'['}</span>
                    </div>
                    {exp.highlights?.map((h, i) => (
                      <div key={i} className="td-hl-row">{h}</div>
                    ))}
                    <div className="td-brace">{'],'}</div>

                    <div style={{ marginTop: '0.5rem' }}>
                      <span className="td-key">"tools"</span>
                      <span className="td-colon">: </span>
                      <span className="td-brace">{'['}</span>
                      {exp.tools?.map((t, i) => (
                        <span key={t}>
                          <span className="td-tools">"<span className="td-tool">{t}</span>"</span>
                          {i < exp.tools.length - 1 && <span className="td-brace">, </span>}
                        </span>
                      ))}
                      <span className="td-brace">{']'}</span>
                    </div>

                    <div className="td-brace" style={{ marginTop: '0.5rem' }}>{'}'}</div>

                    <div className="term-cmd-row" style={{ marginTop: '1rem', marginBottom: 0 }}>
                      <span className="term-prompt">➜</span>
                      <span className="term-dir">~/portfolio</span>
                      <span className="term-cursor" />
                    </div>
                  </div>
                </div>
              </OSWin>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL 3 — PROJECTS
───────────────────────────────────────────────────────────── */
function ProjectsPanel() {
  const [active, setActive] = useState(0)
  const proj = projects[active]

  return (
    <div className="proj-panel">
      <div className="proj-watermark" aria-hidden>PROJECTS</div>

      {/* Left: list */}
      <div className="proj-left">
        <div className="proj-left-header">
          <p className="proj-section-label">03 / Projects ({projects.length})</p>
        </div>
        <div className="proj-list">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`proj-item${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="proj-item-num">
                {String(i+1).padStart(2,'0')}
                {p.featured && <span />}
              </div>
              <div className="proj-item-title">{p.title}</div>
              <div className="proj-item-sub">{p.subtitle} · {p.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: detail window */}
      <div className="proj-right">
        <AnimatePresence mode="wait">
          {proj && (
            <motion.div
              key={proj.id}
              className="proj-detail-win os-win"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="os-win-bar">
                <span className="os-d r" /><span className="os-d y" /><span className="os-d g" />
                <span className="os-win-title">~/projects/{proj.id}.md</span>
              </div>

              <div className="proj-detail-body">
                <div className="proj-detail-head">
                  <div className="proj-d-title">{proj.title}</div>
                  <div className="proj-d-sub">{proj.subtitle} &nbsp;·&nbsp; {proj.date}</div>
                </div>

                {proj.media?.length > 0 && (
                  <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
                    <MediaGallery items={proj.media} alt={proj.title} />
                  </div>
                )}

                <div>
                  <div className="proj-sec-label">Challenge</div>
                  <p className="proj-sec-text">{proj.problem}</p>
                </div>
                <div>
                  <div className="proj-sec-label">Implementation</div>
                  <p className="proj-sec-text">{proj.approach}</p>
                </div>
                {proj.outcomes?.length > 0 && (
                  <div>
                    <div className="proj-sec-label">Outcomes</div>
                    <ul className="proj-outcomes">
                      {proj.outcomes.map((o,k) => <li key={k}>{o}</li>)}
                    </ul>
                  </div>
                )}
                <div>
                  <div className="proj-sec-label">Stack</div>
                  <div className="proj-tags-row" style={{ marginTop: '0.3rem' }}>
                    {proj.techStack.map(t => <span key={t} className="tag orange">{t}</span>)}
                  </div>
                </div>
              </div>

              <div className="proj-action-row">
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn">
                    <GithubIcon /> Source
                  </a>
                )}
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="btn primary">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL 4 — SKILLS (neofetch)
───────────────────────────────────────────────────────────── */
const NF_ART = `
██████╗██╗  ██╗
██╔══██╗██║ ██╔╝
███████║█████╔╝ 
██╔══██║██╔═██╗ 
██║  ██║██║  ██╗
╚═╝  ╚═╝╚═╝  ╚═╝
`.trim()

// Flatten all skills into neofetch rows
function buildNfRows(categories) {
  return categories.map(cat => ({
    label: cat.name.padEnd(12),
    val: cat.skills.join(' · ')
  }))
}

function SkillsPanel() {
  const rows = buildNfRows(skills.categories)

  return (
    <div className="skills-panel">
      <div className="skills-watermark" aria-hidden>SKILLS</div>

      <div className="skills-win">
        <OSWin title="~/skills -- neofetch" bodyClass="">
          <div style={{ padding: '1.75rem 2rem' }}>
            {/* Top command */}
            <div className="term-cmd-row" style={{ marginBottom: '1.25rem' }}>
              <span className="term-prompt">➜</span>
              <span className="term-dir">~/portfolio</span>
              <span className="term-cmd-text">neofetch --toolkit</span>
            </div>

            <div className="neofetch-layout">
              {/* ASCII art */}
              <pre className="nf-art">{NF_ART}</pre>

              {/* Data */}
              <div className="nf-data">
                <div className="nf-head">adityakeerti@portfolio</div>
                <div className="nf-sub-head">──────────────────────────────</div>

                <div className="nf-row">
                  <span className="nf-label">OS</span>
                  <span className="nf-val">Portfolio v2026 · Full-Stack + AI/ML</span>
                </div>
                <div className="nf-row">
                  <span className="nf-label">Location</span>
                  <span className="nf-val">{about.location}</span>
                </div>
                <div className="nf-row">
                  <span className="nf-label">Status</span>
                  <span style={{ color: 'var(--green)', fontFamily: 'var(--font-m)', fontSize: '0.72rem' }}>
                    Open to Work ●
                  </span>
                </div>

                <div className="nf-rule" />

                {rows.map((r) => (
                  <div key={r.label} className="nf-row">
                    <span className="nf-label">{r.label.trim()}</span>
                    <span className="nf-val">{r.val}</span>
                  </div>
                ))}

                <div className="nf-rule" />

                {/* Color blocks */}
                <div className="nf-colors">
                  {['#FF5F57','#FFBD2E','#28CA42','#007AFF','#AF52DE','#FF4D00','#888898','#f0f0f2'].map(c => (
                    <div key={c} className="nf-clr" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </OSWin>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL 5 — ACHIEVEMENTS
───────────────────────────────────────────────────────────── */
function AchievementsPanel() {
  const [activeAch, setActiveAch] = useState(0)
  const ach = achievements[activeAch]

  return (
    <div className="ach-panel">
      <div className="ach-header">
        <p className="p-eyebrow">05 / Recognition</p>
        <h2 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.01em' }}>
          Hackathons &amp; Awards
        </h2>
      </div>

      <div className="ach-layout">
        {/* Left: achievement selector */}
        <div className="ach-selector">
          {achievements.map((a, i) => (
            <button
              key={a.id}
              className={`ach-sel-item${activeAch === i ? ' active' : ''}`}
              onClick={() => setActiveAch(i)}
            >
              <span className="ach-sel-num">{String(i+1).padStart(2,'0')}</span>
              <div className="ach-sel-info">
                <span className="ach-sel-type">{a.type}</span>
                <span className="ach-sel-title">{a.title}</span>
              </div>
              {activeAch === i && <span className="ach-sel-arrow">→</span>}
            </button>
          ))}
        </div>

        {/* Right: detail */}
        <AnimatePresence mode="wait">
          {ach && (
            <motion.div
              key={ach.id}
              className="ach-detail os-win"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
            >
              <div className="os-win-bar">
                <span className="os-d r"/><span className="os-d y"/><span className="os-d g"/>
                <span className="os-win-title">{ach.title.toLowerCase().replace(/\s/g,'_')}.txt</span>
              </div>
              <div className={`ach-detail-body${ach.media?.length > 0 ? ' has-media' : ''}`}>
                <div className="ach-detail-info">
                  <span className="ach-type">{ach.type}</span>
                  <h3 className="ach-title">{ach.title}</h3>
                  <p className="ach-desc">{ach.description}</p>
                </div>
                {ach.media?.length > 0 && (
                  <div className="ach-media">
                    <MediaGallery items={ach.media} alt={ach.title} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PANEL 6 — CONTACT
───────────────────────────────────────────────────────────── */
function ContactPanel() {
  return (
    <div className="contact-panel">
      {/* Left: big typographic statement */}
      <div className="contact-left">
        <p className="p-eyebrow">06 / Contact</p>
        <h2 className="contact-statement">
          LET'S<br />
          BUILD<br />
          SOMETHING<br />
          <em>REMARKABLE</em>
        </h2>
        <div className="contact-orange-line" />
      </div>

      {/* Right: contact window — offset so it clears the floating pill nav */}
      <div className="contact-win-wrap">
        <div className="contact-win os-win">
          <div className="os-win-bar">
            <span className="os-d r"/><span className="os-d y"/><span className="os-d g"/>
            <span className="os-win-title">~/contact.json</span>
          </div>
          <div className="contact-win-body">
            <div className="contact-details">
              <div>
                <p className="c-item-label">Email</p>
                <a href={`mailto:${about.email}`} className="c-item-val">
                  {about.email}
                </a>
              </div>
              <div>
                <p className="c-item-label">Phone</p>
                <p className="c-item-val">{about.phone}</p>
              </div>
              <div>
                <p className="c-item-label">Location</p>
                <p className="c-item-val">{about.location}</p>
              </div>
            </div>

            <div className="contact-socials">
              <a href={about.github}   className="c-social" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={about.linkedin} className="c-social c-social-li" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>

            <div className="contact-resume">
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn primary">
                View Résumé ↗
              </a>
              <a href={RESUME} download="ADITYA_RESUME.pdf" className="btn">
                Download PDF
              </a>
            </div>

            <p className="contact-footer">
              Built by {about.name} &nbsp;·&nbsp; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   TIME HOOK
───────────────────────────────────────────────────────────── */
function useTime() {
  const [t, setT] = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  )
  useEffect(() => {
    const id = setInterval(() =>
      setT(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })),
    10000)
    return () => clearInterval(id)
  }, [])
  return t
}

/* ─────────────────────────────────────────────────────────────
   PANELS MAP
───────────────────────────────────────────────────────────── */
const PANELS = [
  <AboutPanel        key="about"        />,
  <ExperiencePanel   key="experience"   />,
  <ProjectsPanel     key="projects"     />,
  <SkillsPanel       key="skills"       />,
  <AchievementsPanel key="achievements" />,
  <ContactPanel      key="contact"      />,
]

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function App() {
  const [loaded,  setLoaded]  = useState(false)
  const [panel,   setPanel]   = useState(0)
  const [dir,     setDir]     = useState(1)
  const time = useTime()

  useEffect(() => { document.body.style.overflow = 'hidden' }, [])

  const goTo = useCallback(idx => {
    if (idx < 0 || idx >= PANELS.length) return
    setDir(idx > panel ? 1 : -1)
    setPanel(idx)
  }, [panel])

  const next = useCallback(() => goTo(panel + 1), [goTo, panel])
  const prev = useCallback(() => goTo(panel - 1), [goTo, panel])

  // Keyboard
  useEffect(() => {
    const h = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev])

  // Touch swipe
  useEffect(() => {
    let sx = null
    const ts = e => { sx = e.touches[0].clientX }
    const te = e => {
      if (sx === null) return
      const d = sx - e.changedTouches[0].clientX
      if (Math.abs(d) > 50) d > 0 ? next() : prev()
      sx = null
    }
    window.addEventListener('touchstart', ts, { passive: true })
    window.addEventListener('touchend',   te, { passive: true })
    return () => {
      window.removeEventListener('touchstart', ts)
      window.removeEventListener('touchend',   te)
    }
  }, [next, prev])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <Cursor />

      {/* AK background monogram */}
      <div className="bg-mono" aria-hidden>AK</div>

      {/* OS Menubar */}
      {loaded && (
        <div className="os-bar">
          <div className="os-bar-left">
            <div className="os-bar-dot" />
            <span className="os-bar-logo">AK.</span>
            <span className="os-bar-sep">—</span>
            <span className="os-bar-section">{SECTIONS[panel].label}</span>
          </div>

          <div className="os-bar-section">ADITYAKEERTI · PORTFOLIO 2026</div>

          <div className="os-bar-right">
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="os-bar-resume">
              <ResumeIcon /> RESUME
            </a>
            <span className="os-avail">
              <span className="os-avail-dot" />
              <span className="os-avail-text">OPEN TO WORK</span>
            </span>
            <span>{time}</span>
          </div>
        </div>
      )}

      {/* Panels */}
      {loaded && (
        <div className="panels-viewport">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={panel}
              className="panel"
              custom={dir}
              variants={pv}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pt}
            >
              {PANELS[panel]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* OS Status Bar */}
      {loaded && (
        <div className="os-status">
          <div className="st-git">
            <span className="st-git-dot" />
            main
          </div>

          <div className="st-tabs">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                className={`st-tab${panel === i ? ' active' : ''}`}
                onClick={() => goTo(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="st-arrows">
            <button className="st-arr" onClick={prev} disabled={panel === 0} aria-label="prev">←</button>
            <button className="st-arr" onClick={next} disabled={panel === PANELS.length - 1} aria-label="next">→</button>
          </div>
        </div>
      )}

      {/* Cinematic Loader */}
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>
    </div>
  )
}
