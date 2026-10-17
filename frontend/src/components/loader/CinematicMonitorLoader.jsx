import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Terminal, Cpu, Check, Activity, ShieldCheck, Sparkles, CornerDownLeft } from 'lucide-react'
import './CinematicMonitorLoader.css'

/* ─────────────────────────────────────────────────────────────
   CINEMATIC MONITOR LOADER
   High-energy, 60fps computer screen simulation:
   1. Physical monitor chassis powers on with phosphor flare
   2. Autonomous cybernetic cursor moves & clicks spotlight search
   3. Types "who is aditya keerti?"
   4. Cascading micro-windows spring open (terminal, models, radar)
   5. Cursor clicks [BOOT WORKSTATION]
   6. Camera plunges into the display glass directly into portfolio
───────────────────────────────────────────────────────────── */

const SEARCH_QUERY = 'who is aditya keerti?'

export default function CinematicMonitorLoader({ onDone }) {
  const [monitorPower, setMonitorPower] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 72, y: 75 })
  const [cursorClicking, setCursorClicking] = useState(false)
  const [clickRipples, setClickRipples] = useState([])
  const [typedText, setTypedText] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [windowsActive, setWindowsActive] = useState(false)
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

  // 60FPS Autonomous Choreography Script
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
      setTimeout(() => setCursorClicking(false), 150)
      setTimeout(() => setClickRipples(prev => prev.filter(r => r.id !== id)), 600)
    }

    // Step 0: Power on monitor (80ms)
    const t0 = setTimeout(() => {
      setMonitorPower(true)
    }, 80)

    // Step 1: Cursor moves to search bar center (450ms)
    const t1 = setTimeout(() => {
      setCursorPos({ x: 45, y: 46 })
    }, 450)

    // Step 2: Cursor clicks inside search bar (800ms)
    const t2 = setTimeout(() => {
      triggerClick(45, 46)
    }, 800)

    // Step 3: Type query character by character (900ms - 1450ms)
    let charIdx = 0
    let typeInterval = null
    const t3 = setTimeout(() => {
      typeInterval = setInterval(() => {
        charIdx++
        setTypedText(SEARCH_QUERY.slice(0, charIdx))
        if (charIdx >= SEARCH_QUERY.length) {
          clearInterval(typeInterval)
        }
      }, 26) // ultra-snappy typing
    }, 900)

    // Step 4: Cursor hits Enter / Search button (1520ms)
    const t4 = setTimeout(() => {
      setCursorPos({ x: 74, y: 46 })
      setTimeout(() => {
        triggerClick(74, 46)
        setSearchSubmitted(true)
      }, 100)
    }, 1520)

    // Step 5: Micro-windows spring open (1680ms)
    const t5 = setTimeout(() => {
      setWindowsActive(true)
    }, 1680)

    // Step 6: Counter increments rapidly
    let countVal = 0
    let counterInterval = null
    const t6 = setTimeout(() => {
      counterInterval = setInterval(() => {
        countVal += Math.floor(Math.random() * 12) + 6
        if (countVal >= 100) {
          countVal = 100
          clearInterval(counterInterval)
        }
        setCounter(countVal)
      }, 40)
    }, 1700)

    // Step 7: Cursor sweeps down to the [CONNECT WORKSTATION] button (1950ms)
    const t7 = setTimeout(() => {
      setCursorPos({ x: 50, y: 80 })
    }, 1950)

    // Step 8: Cursor clicks launch (2220ms)
    const t8 = setTimeout(() => {
      triggerClick(50, 80)
      setLaunchActive(true)
      setCounter(100)
    }, 2220)

    // Step 9: Camera Plunge / Screen Breach Zoom (2450ms)
    const t9 = setTimeout(() => {
      setScreenBreach(true)
    }, 2450)

    // Step 10: Complete and reveal portfolio (2800ms)
    const t10 = setTimeout(() => {
      finish()
    }, 2850)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (typeInterval) clearInterval(typeInterval)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      if (counterInterval) clearInterval(counterInterval)
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
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={finish}
      role="status"
      aria-live="polite"
    >
      {/* Background ambient lighting */}
      <div className="cml-ambient-glow" aria-hidden="true" />

      {/* Floating Skip Prompt */}
      <div className="cml-skip-pill" onClick={finish}>
        <span>ESC / CLICK ANYWHERE TO SKIP</span>
        <span className="cml-skip-dot" />
      </div>

      {/* The Physical Monitor Chassis */}
      <motion.div
        className={`cml-monitor-rig ${screenBreach ? 'cml-breaching' : ''}`}
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{
          scale: screenBreach ? 3.8 : 1,
          opacity: screenBreach ? 0 : 1,
          y: screenBreach ? -40 : 0,
        }}
        transition={{
          duration: screenBreach ? 0.48 : 0.65,
          ease: screenBreach ? [0.4, 0, 0.2, 1] : [0.16, 1, 0.3, 1]
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
                {/* Micro Header Bar inside Monitor */}
                <header className="cml-os-topbar">
                  <div className="cml-os-top-left">
                    <span className="cml-brand-monogram">AK</span>
                    <span className="cml-os-name">WORKSTATION_OS // 2026</span>
                  </div>
                  <div className="cml-os-top-center">
                    <span className="cml-fps-badge">
                      <Activity size={10} className="inline mr-1 text-green-400" />
                      60.0 FPS · LOW LATENCY
                    </span>
                  </div>
                  <div className="cml-os-top-right">
                    <span className="cml-status-dot" />
                    <span>BLR · LIVE NODE</span>
                  </div>
                </header>

                {/* Central Stage Area */}
                <div className="cml-stage">
                  {/* Spotlight Search Command Palette */}
                  <motion.div
                    className={`cml-search-bar ${searchSubmitted ? 'cml-search-minimized' : ''}`}
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{
                      y: searchSubmitted ? -90 : 0,
                      opacity: searchSubmitted ? 0.8 : 1,
                      scale: searchSubmitted ? 0.85 : 1,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

                  {/* Micro-Window 1: Kernel Shell (Top Left) */}
                  <AnimatePresence>
                    {windowsActive && (
                      <motion.div
                        className="cml-micro-win cml-win-terminal"
                        initial={{ opacity: 0, x: -35, y: -15, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="cml-win-bar">
                          <span className="cml-dot r" /><span className="cml-dot y" /><span className="cml-dot g" />
                          <span className="cml-win-title">~/kernel_core.sh</span>
                        </div>
                        <div className="cml-win-body">
                          <p className="cml-log-line text-emerald-400">
                            <span className="text-zinc-500">➜</span> VLM Engine: Gemma-4 Local
                          </p>
                          <p className="cml-log-line text-zinc-300">
                            <span className="text-zinc-500">➜</span> Zero Cloud OCR Bills: 100% Offline
                          </p>
                          <p className="cml-log-line text-amber-300">
                            <span className="text-zinc-500">➜</span> Benchmarks: 5,000 req/min &lt;300ms
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Micro-Window 2: Telemetry Radar (Top Right) */}
                  <AnimatePresence>
                    {windowsActive && (
                      <motion.div
                        className="cml-micro-win cml-win-radar"
                        initial={{ opacity: 0, x: 35, y: -15, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="cml-win-bar">
                          <span className="cml-dot r" /><span className="cml-dot y" /><span className="cml-dot g" />
                          <span className="cml-win-title">telemetry_radar.sys</span>
                        </div>
                        <div className="cml-win-body cml-radar-body">
                          <div className="cml-radar-sweep">
                            <span className="cml-radar-blip b1" />
                            <span className="cml-radar-blip b2" />
                            <span className="cml-radar-beam" />
                          </div>
                          <div className="cml-radar-stats">
                            <div>PING: <strong>18ms</strong></div>
                            <div>STACK: <strong>REACT 19</strong></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Micro-Window 3: Launch Orchestrator (Center-Bottom) */}
                  <AnimatePresence>
                    {windowsActive && (
                      <motion.div
                        className={`cml-micro-win cml-win-launch ${launchActive ? 'cml-launch-triggered' : ''}`}
                        initial={{ opacity: 0, y: 40, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.38, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="cml-win-bar">
                          <span className="cml-dot r" /><span className="cml-dot y" /><span className="cml-dot g" />
                          <span className="cml-win-title">launch_orchestrator.app</span>
                          <span className="cml-counter-badge">{counter}%</span>
                        </div>
                        <div className="cml-win-body cml-launch-body">
                          <div className="cml-chips-row">
                            <span className="cml-chip">
                              <Cpu size={10} className="inline mr-1 text-amber-500" />
                              AI Systems
                            </span>
                            <span className="cml-chip">
                              <ShieldCheck size={10} className="inline mr-1 text-emerald-400" />
                              Client SaaS
                            </span>
                            <span className="cml-chip">
                              <Sparkles size={10} className="inline mr-1 text-sky-400" />
                              Vision VLM
                            </span>
                          </div>

                          <div className={`cml-boot-btn ${launchActive ? 'cml-boot-clicked' : ''}`}>
                            <span className="cml-btn-ping" />
                            <span>{launchActive ? 'INITIALIZING WORKSTATION...' : 'CONNECT WORKSTATION'}</span>
                            <span className="cml-boot-arrow">→</span>
                          </div>
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
                    AUTONOMOUS SYSTEM LAUNCH SEQUENCE
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
            <span className="cml-hardware-logo">STUDIO PRO // 60FPS</span>
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
