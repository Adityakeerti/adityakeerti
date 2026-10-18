import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CornerDownLeft, MapPin } from 'lucide-react'
import './CinematicMonitorLoader.css'

/* ─────────────────────────────────────────────────────────────
   CINEMATIC MONITOR LOADER — Clean & Focused
   1. Hardware monitor powers on with phosphor flare
   2. Autonomous cursor clicks spotlight search & types query
   3. Types "who is aditya keerti?"
   4. Resolves cleanly to Aditya Keerti's identity card (Dehradun, India)
   5. Cursor clicks [ENTER PORTFOLIO]
   6. Camera plunges smoothly through display glass into portfolio
───────────────────────────────────────────────────────────── */

const SEARCH_QUERY = 'who is aditya keerti?'

export default function CinematicMonitorLoader({ onDone }) {
  const [monitorPower, setMonitorPower] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 72, y: 75 })
  const [cursorClicking, setCursorClicking] = useState(false)
  const [clickRipples, setClickRipples] = useState([])
  const [typedText, setTypedText] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [launchActive, setLaunchActive] = useState(false)
  const [counter, setCounter] = useState(0)
  const [screenBreach, setScreenBreach] = useState(false)

  const hasExited = useRef(false)

  const finish = () => {
    if (hasExited.current) return
    hasExited.current = true
    sessionStorage.setItem('ak_intro_seen', '1')
    onDone()
  }

  // Keyboard skip
  useEffect(() => {
    const handleKey = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        finish()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // 60FPS Autonomous Choreography Script (Slow & Smooth)
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) {
      finish()
      return
    }

    const triggerClick = (x, y) => {
      setCursorClicking(true)
      const id = Date.now() + Math.random()
      setClickRipples(prev => [...prev, { id, x, y }])
      setTimeout(() => setCursorClicking(false), 220)
      setTimeout(() => setClickRipples(prev => prev.filter(r => r.id !== id)), 850)
    }

    // Step 0: Power on monitor with phosphor flare (200ms)
    const t0 = setTimeout(() => {
      setMonitorPower(true)
    }, 200)

    // Step 1: Cursor smoothly glides into search bar (850ms)
    const t1 = setTimeout(() => {
      setCursorPos({ x: 45, y: 48 })
    }, 850)

    // Step 2: Cursor clicks inside search bar (1650ms)
    const t2 = setTimeout(() => {
      triggerClick(45, 48)
    }, 1650)

    // Step 3: Type query character by character at natural human pace (1900ms - 3300ms)
    let charIdx = 0
    let typeInterval = null
    const t3 = setTimeout(() => {
      typeInterval = setInterval(() => {
        charIdx++
        setTypedText(SEARCH_QUERY.slice(0, charIdx))
        if (charIdx >= SEARCH_QUERY.length) {
          clearInterval(typeInterval)
        }
      }, 65)
    }, 1900)

    // Step 4: Cursor glides smoothly toward the Return button (3700ms)
    const t4 = setTimeout(() => {
      setCursorPos({ x: 74, y: 48 })
    }, 3700)

    // Step 5: Cursor clicks Return (4450ms)
    const t5 = setTimeout(() => {
      triggerClick(74, 48)
      setSearchSubmitted(true)
    }, 4450)

    // Step 6: Telemetry counter increments smoothly (4800ms - 6200ms)
    let countVal = 0
    let counterInterval = null
    const t6 = setTimeout(() => {
      counterInterval = setInterval(() => {
        countVal += Math.floor(Math.random() * 5) + 3
        if (countVal >= 100) {
          countVal = 100
          clearInterval(counterInterval)
        }
        setCounter(countVal)
      }, 55)
    }, 4800)

    // Step 7: Cursor glides gracefully down to the [ENTER PORTFOLIO] button (5300ms)
    const t7 = setTimeout(() => {
      setCursorPos({ x: 50, y: 68 })
    }, 5300)

    // Step 8: Cursor clicks Enter Portfolio (6250ms)
    const t8 = setTimeout(() => {
      triggerClick(50, 68)
      setLaunchActive(true)
      setCounter(100)
    }, 6250)

    // Step 9: Smooth Cinematic Camera Plunge / Screen Breach Zoom (6850ms)
    const t9 = setTimeout(() => {
      setScreenBreach(true)
    }, 6850)

    // Step 10: Seamlessly finish and reveal portfolio workspace (7750ms)
    const t10 = setTimeout(() => {
      finish()
    }, 7750)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (typeInterval) clearInterval(typeInterval)
      clearTimeout(t4)
      clearTimeout(t5)
      if (counterInterval) clearInterval(counterInterval)
      clearTimeout(t6)
      clearTimeout(t7)
      clearTimeout(t8)
      clearTimeout(t9)
      clearTimeout(t10)
    }
  }, [])

  return (
    <motion.div
      className="cml-backdrop"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={finish}
      role="status"
      aria-live="polite"
    >
      {/* Background ambient lighting */}
      <div className="cml-ambient-glow" aria-hidden="true" />

      {/* Floating Skip Prompt */}
      <div className="cml-skip-pill" onClick={finish}>
        <span>ESC TO SKIP</span>
        <span className="cml-skip-dot" />
      </div>

      {/* The Physical Monitor Chassis */}
      <motion.div
        className={`cml-monitor-rig ${screenBreach ? 'cml-breaching' : ''}`}
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{
          scale: screenBreach ? 4.2 : 1,
          opacity: screenBreach ? 0 : 1,
          y: screenBreach ? -45 : 0,
        }}
        transition={{
          duration: screenBreach ? 0.95 : 0.75,
          ease: screenBreach ? [0.22, 1, 0.36, 1] : [0.16, 1, 0.3, 1]
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Camera Notch & Metallic Bezel */}
        <div className="cml-monitor-bezel">
          <div className="cml-monitor-notch">
            <span className="cml-cam-lens" />
            <span className="cml-cam-sensor" />
          </div>

          {/* Screen Display Glass Area */}
          <div className={`cml-screen-glass ${monitorPower ? 'cml-power-on' : ''}`}>
            {/* Phosphor Ignition Flare Line */}
            <div className="cml-crt-flare" />
            {/* Scanlines & Matrix Blueprint Grid */}
            <div className="cml-screen-grid" />
            <div className="cml-screen-vignette" />

            {/* Simulated Desktop Content */}
            {monitorPower && (
              <div className="cml-screen-content">
                {/* Clean Micro Header Bar */}
                <header className="cml-os-topbar">
                  <div className="cml-os-top-left">
                    <span className="cml-brand-monogram">AK</span>
                    <span className="cml-os-name">PORTFOLIO_OS</span>
                  </div>
                  <div className="cml-os-top-right">
                    <span className="cml-status-dot" />
                    <span>DEHRADUN · LIVE</span>
                  </div>
                </header>

                {/* Central Stage Area */}
                <div className="cml-stage">
                  {/* Spotlight Search Command Palette */}
                  <motion.div
                    className={`cml-search-bar ${searchSubmitted ? 'cml-search-minimized' : ''}`}
                    initial={{ y: 0, opacity: 0, scale: 0.95 }}
                    animate={{
                      y: searchSubmitted ? -65 : 0,
                      opacity: searchSubmitted ? 0.7 : 1,
                      scale: searchSubmitted ? 0.88 : 1,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Search size={14} className="cml-search-ico" />
                    <span className="cml-search-text">
                      {typedText}
                      <span className="cml-typing-cursor" />
                    </span>
                    <div className="cml-search-action">
                      <span className={`cml-enter-pill ${searchSubmitted ? 'active' : ''}`}>
                        <CornerDownLeft size={10} />
                        <span>RETURN</span>
                      </span>
                    </div>
                  </motion.div>

                  {/* Clean Identity Result Card (No Clutter) */}
                  <AnimatePresence>
                    {searchSubmitted && (
                      <motion.div
                        className="cml-result-card"
                        initial={{ opacity: 0, y: 22, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="cml-card-badge">
                          <span className="cml-badge-dot" />
                          <span>IDENTITY VERIFIED</span>
                        </div>

                        <h2 className="cml-card-name">Aditya Keerti</h2>
                        <p className="cml-card-role">AI Systems & Full-Stack Engineer</p>

                        <div className="cml-card-location">
                          <MapPin size={11} className="inline mr-1 text-orange-500" />
                          <span>Dehradun, India</span>
                        </div>

                        <div className={`cml-boot-btn ${launchActive ? 'cml-boot-clicked' : ''}`}>
                          <span className="cml-btn-ping" />
                          <span>{launchActive ? 'ENTERING WORKSTATION...' : 'ENTER PORTFOLIO'}</span>
                          <span className="cml-boot-arrow">→</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Autonomous Synthetic Cursor */}
                <div
                  className={`cml-synthetic-cursor ${cursorClicking ? 'clicking' : ''}`}
                  style={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l7 18 3-7 7-3L3 3z"
                      fill="#FF4D00"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="cml-cursor-trail" />
                </div>

                {/* Click Ripples */}
                {clickRipples.map(r => (
                  <span
                    key={r.id}
                    className="cml-click-ripple"
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  />
                ))}

                {/* Lower Monitor Status Ticker */}
                <footer className="cml-os-dock">
                  <span className="cml-dock-pill">
                    <span className="cml-pulse-green" />
                    INITIALIZING
                  </span>
                  <div className="cml-progress-track">
                    <div className="cml-progress-fill" style={{ width: `${counter}%` }} />
                  </div>
                  <span className="cml-dock-percent">{counter}%</span>
                </footer>
              </div>
            )}
          </div>

          {/* Lower Hardware Bezel details */}
          <div className="cml-monitor-bottom-bar">
            <span className="cml-hardware-logo">STUDIO DISPLAY</span>
            <div className="cml-power-led-wrap">
              <span className={`cml-power-led ${monitorPower ? 'on' : ''}`} />
            </div>
          </div>
        </div>

        {/* Physical Monitor Neck & Base Stand */}
        <div className="cml-monitor-neck" />
        <div className="cml-monitor-base">
          <span className="cml-base-chamfer" />
        </div>
      </motion.div>
    </motion.div>
  )
}
