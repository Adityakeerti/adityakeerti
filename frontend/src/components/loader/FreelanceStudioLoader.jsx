import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FreelanceStudioLoader.css'

/* ─────────────────────────────────────────────────────────────
   FREELANCE STUDIO ARCHITECTURAL SHUTTER LOADER
   Unique, high-taste client entry sequence:
   1. Luxury editorial studio slate with kinetic telemetry
   2. Counter counts 00 -> 100 with synchronized stage milestones
   3. Central laser seam ignites
   4. Dual architectural shutters part vertically (up/down)
   5. Seamlessly reveals Freelance Client Portal
───────────────────────────────────────────────────────────── */

export default function FreelanceStudioLoader({ onDone }) {
  const [count, setCount] = useState(0)
  const [parting, setParting] = useState(false)
  const hasFinished = useRef(false)

  const finish = () => {
    if (hasFinished.current) return
    hasFinished.current = true
    onDone()
  }

  // Instant skip on keypress or click
  useEffect(() => {
    const handleKey = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        setParting(true)
        setTimeout(finish, 450)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Fast, punchy kinetic sequence (~1.4s total)
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) {
      finish()
      return
    }

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 3
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setCount(100)
        // Trigger parting shutter after brief pause
        setTimeout(() => {
          setParting(true)
        }, 220)
        // Complete unmount when shutter has parted
        setTimeout(() => {
          finish()
        }, 850)
      } else {
        setCount(current)
      }
    }, 38)

    return () => clearInterval(interval)
  }, [])

  // Milestone text based on counter
  const milestone = count < 35
    ? '[01] SYSTEM ARCHITECTURE'
    : count < 75
    ? '[02] AUTONOMOUS AI AGENTS'
    : '[03] PRODUCTION SHIP READY'

  return (
    <div
      className={`fsl-container ${parting ? 'fsl-parting' : ''}`}
      onClick={() => {
        setParting(true)
        setTimeout(finish, 450)
      }}
      role="status"
      aria-live="polite"
    >
      {/* Top Shutter Panel */}
      <motion.div
        className="fsl-shutter fsl-shutter--top"
        initial={{ y: 0 }}
        animate={{ y: parting ? '-100%' : '0%' }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="fsl-grid-overlay" aria-hidden="true" />
        {/* Top Header Row */}
        <header className="fsl-topbar">
          <div className="fsl-topbar-left">
            <span className="fsl-brand-mono">AK</span>
            <span className="fsl-topbar-title">STUDIO DISPATCH // 2026</span>
          </div>
          <div className="fsl-topbar-right">
            <span className="fsl-dot-live" />
            <span>DEHRADUN · GLOBAL REMOTE</span>
          </div>
        </header>
      </motion.div>

      {/* Bottom Shutter Panel */}
      <motion.div
        className="fsl-shutter fsl-shutter--bottom"
        initial={{ y: 0 }}
        animate={{ y: parting ? '100%' : '0%' }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="fsl-grid-overlay" aria-hidden="true" />
        {/* Bottom Status Row */}
        <footer className="fsl-bottombar">
          <span className="fsl-client-status">
            <span className="fsl-pulse-ring" />
            CLIENT ONBOARDING ACTIVE
          </span>
          <span className="fsl-skip-hint">CLICK OR ESC TO ENTER</span>
        </footer>
      </motion.div>

      {/* Central Kinetic HUD (Fades smoothly right as shutters split) */}
      <motion.div
        className="fsl-center-hud"
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: parting ? 0 : 1,
          scale: parting ? 0.94 : 1,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {/* Ambient Warm Glow */}
        <div className="fsl-ambient-glow" aria-hidden="true" />

        <div className="fsl-hud-card">
          <div className="fsl-kicker-row">
            <span className="fsl-kicker-pill">FREELANCE CLIENT PORTAL</span>
            <span className="fsl-node-code">NODE_DED</span>
          </div>

          <div className="fsl-counter-wrap">
            <span className="fsl-counter-num">{String(count).padStart(2, '0')}</span>
            <span className="fsl-counter-pct">%</span>
          </div>

          <div className="fsl-name-title">
            <span className="fsl-name">ADITYAKEERTI</span>
            <span className="fsl-role">AI SYSTEMS &amp; FULL-STACK ARCHITECT</span>
          </div>

          {/* Milestone Dynamic Reel */}
          <div className="fsl-milestone-box">
            <span className="fsl-milestone-text">{milestone}</span>
          </div>

          {/* High-Precision Progress Laser Seam */}
          <div className="fsl-track">
            <div className="fsl-fill" style={{ width: `${count}%` }} />
            <div className="fsl-laser-head" style={{ left: `${count}%` }} />
          </div>
        </div>
      </motion.div>

      {/* Center Laser Beam Splitting Horizon */}
      {parting && <div className="fsl-laser-seam" aria-hidden="true" />}
    </div>
  )
}
