import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* Animated explainer for CitySense: three departments each see one symptom,
   the trace runs back through the networks and lands on the single shared cause. */

const SYMPTOMS = [
  { dept: 'Roads',       what: 'Pothole keeps coming back', x: 100 },
  { dept: 'Sanitation',  what: 'Damp walls, bad smell',      x: 300 },
  { dept: 'Water board', what: 'Pressure dip ignored',       x: 500 },
]

const ease = [0.16, 1, 0.3, 1]

export default function RootCauseTrace() {
  const reduce = useReducedMotion()
  const [run, setRun] = useState(0)

  // Timeline (seconds): symptoms → trace lines → cause reveal
  const T = reduce
    ? { sym: () => 0, line: 0, cause: 0, dur: 0 }
    : { sym: i => 0.15 + i * 0.18, line: 1.0, cause: 2.0, dur: 1 }

  return (
    <div className="rct" key={run}>
      <div className="rct-head">
        <span className="rct-label">How a trace works</span>
        {!reduce && (
          <button type="button" className="rct-replay" onClick={() => setRun(r => r + 1)}>
            ↻ Replay
          </button>
        )}
      </div>

      <div className="rct-row">
        {SYMPTOMS.map((s, i) => (
          <motion.div
            key={s.dept}
            className="rct-sym"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 * T.dur, delay: T.sym(i), ease }}
          >
            <span className="rct-ping" aria-hidden="true" />
            <span className="rct-dept">{s.dept}</span>
            <span className="rct-what">{s.what}</span>
          </motion.div>
        ))}
      </div>

      <svg className="rct-lines" viewBox="0 0 600 70" preserveAspectRatio="none" aria-hidden="true">
        {SYMPTOMS.map((s, i) => (
          <motion.path
            key={s.dept}
            d={`M ${s.x} 0 C ${s.x} 40, 300 30, 300 70`}
            fill="none"
            stroke="var(--orange)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.9 * T.dur, delay: T.line + i * 0.08, ease }}
          />
        ))}
      </svg>

      <motion.div
        className="rct-cause"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 * T.dur, delay: T.cause, ease }}
      >
        <span className="rct-cause-tag">Root cause</span>
        <span className="rct-cause-name">Leaking water main</span>
        <span className="rct-cause-meta">owner: Water board · evidence from 3 departments</span>
      </motion.div>

      <p className="rct-foot">
        Each team fixes its own symptom. CitySense ranks the causes that explain all of them, checks the top
        ones, and names the department that owns the fault.
      </p>
    </div>
  )
}
