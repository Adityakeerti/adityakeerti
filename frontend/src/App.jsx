import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

function useFetch(endpoint) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_BASE}${endpoint}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json)
                setLoading(false)
            })
            .catch((err) => {
                console.error(`Failed to fetch ${endpoint}:`, err)
                setLoading(false)
            })
    }, [endpoint])

    return { data, loading }
}

/* ─── Cinematic Text-Decode Loading Screen ─── */

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?<>{}[]='
const TARGET = 'ADITYAKEERTI'

function useTextScramble(target, glyphs, startDelay = 300) {
    const [display, setDisplay] = useState(
        Array.from({ length: target.length }, () =>
            glyphs[Math.floor(Math.random() * glyphs.length)]
        ).join('')
    )
    const [resolved, setResolved] = useState(0)
    const [done, setDone] = useState(false)

    useEffect(() => {
        let frame
        let startTime = null
        const charDelay = 120 // ms per character — snappy but readable

        const tick = (timestamp) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime

            // How many characters should be resolved by now (3 at a time)
            const shouldResolve = Math.min(
                Math.floor(Math.max(0, elapsed - startDelay) / charDelay) * 3,
                target.length
            )

            if (shouldResolve > resolved) {
                setResolved(shouldResolve)
            }

            // Build display string
            const chars = []
            for (let i = 0; i < target.length; i++) {
                if (i < shouldResolve) {
                    chars.push(target[i])
                } else {
                    chars.push(glyphs[Math.floor(Math.random() * glyphs.length)])
                }
            }
            setDisplay(chars.join(''))

            if (shouldResolve >= target.length) {
                setDone(true)
                return
            }

            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [target, glyphs, startDelay, resolved])

    return { display, resolved, done }
}

function MatrixRain() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let raf

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const fontSize = 14
        const cols = Math.floor(canvas.width / fontSize)
        const drops = Array.from({ length: cols }, () =>
            Math.random() * -100
        )

        const draw = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px "JetBrains Mono", monospace`

            for (let i = 0; i < drops.length; i++) {
                const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                const x = i * fontSize
                const y = drops[i] * fontSize

                // Gold with varying opacity
                const brightness = Math.random()
                if (brightness > 0.95) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
                } else {
                    ctx.fillStyle = `rgba(201, 169, 110, ${0.08 + brightness * 0.15})`
                }

                ctx.fillText(char, x, y)

                if (y > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0
                }
                drops[i] += 0.5
            }

            raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="matrix-canvas" />
}

function ScrollIndicator() {
    return (
        <div className="scroll-indicator">
            {/* Mouse icon — desktop only */}
            <div className="scroll-mouse">
                <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="26" height="42" rx="13" stroke="rgba(201,169,110,0.6)" strokeWidth="2" />
                    <circle className="scroll-mouse-dot" cx="14" cy="12" r="3" fill="rgba(201,169,110,0.9)" />
                </svg>
            </div>
            {/* Chevron — mobile only */}
            <div className="scroll-touch">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8L12 16L20 8" stroke="rgba(201,169,110,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '-10px' }}>
                    <path d="M4 8L12 16L20 8" stroke="rgba(201,169,110,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

function LoadingScreen({ onComplete }) {
    const { display, resolved, done } = useTextScramble(TARGET, GLYPHS, 100)
    const [showIndicator, setShowIndicator] = useState(false)
    const [slidingUp, setSlidingUp] = useState(false)
    const hasTriggered = useRef(false)
    const touchStartY = useRef(null)

    // Show scroll indicator after scramble finishes
    useEffect(() => {
        if (done && !showIndicator) {
            const timer = setTimeout(() => setShowIndicator(true), 600)
            return () => clearTimeout(timer)
        }
    }, [done, showIndicator])

    // Trigger slide-up
    const triggerReveal = useCallback(() => {
        if (hasTriggered.current || !done) return
        hasTriggered.current = true
        setSlidingUp(true)
        setTimeout(onComplete, 900) // matches CSS transition duration
    }, [done, onComplete])

    // Listen for scroll (desktop) and touch (mobile)
    useEffect(() => {
        if (!done) return

        const handleWheel = (e) => {
            e.preventDefault() // Stop page scroll
            if (e.deltaY > 0) triggerReveal()
        }

        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY
        }

        const handleTouchMove = (e) => {
            e.preventDefault() // Stop page scroll
        }

        const handleTouchEnd = (e) => {
            if (touchStartY.current === null) return
            const diff = touchStartY.current - e.changedTouches[0].clientY
            if (diff > 40) triggerReveal() // swipe up
            touchStartY.current = null
        }

        const handleKey = (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault()
                triggerReveal()
            }
        }

        // Use passive: false to allow preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: false })
        window.addEventListener('touchend', handleTouchEnd, { passive: true })
        window.addEventListener('keydown', handleKey)

        return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('keydown', handleKey)
        }
    }, [done, triggerReveal])

    return (
        <div className={`loader-screen${slidingUp ? ' sliding-up' : ''}`}>
            <MatrixRain />

            {/* Scan line */}
            <div className="loader-scanline" />

            <div className="loader-content">
                {/* Scrambling name — stays visible */}
                <div className="loader-decode-text">
                    {display.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`decode-char ${i < resolved ? 'resolved' : 'scrambling'}`}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                {/* Subtitle that fades in after decode */}
                <motion.p
                    className="loader-subtitle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={done ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    Full-Stack Developer · AI/ML Engineer
                </motion.p>

                {/* Decorative line */}
                <div className="loader-line-track">
                    <motion.div
                        className="loader-line-fill"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(resolved / TARGET.length) * 100}%` }}
                        transition={{ duration: 0.15 }}
                    />
                </div>
            </div>

            {/* Scroll indicator */}
            {showIndicator && !slidingUp && <ScrollIndicator />}
        </div>
    )
}


/* ─── Custom Magnetic Cursor ─── */
function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const trailsRef = useRef([])
    const mousePos = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })
    const trailPositions = useRef(
        Array.from({ length: 5 }, () => ({ x: -100, y: -100 }))
    )

    useEffect(() => {
        const handler = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', handler, { passive: true })

        let raf
        const animate = () => {
            // Dot follows immediately
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`
            }

            // Ring lerps behind
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
            }

            // Trails follow with increasing delay
            for (let i = 0; i < trailPositions.current.length; i++) {
                const target = i === 0 ? mousePos.current : trailPositions.current[i - 1]
                const speed = 0.08 - i * 0.012
                trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * speed
                trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * speed
                if (trailsRef.current[i]) {
                    trailsRef.current[i].style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px)`
                }
            }

            raf = requestAnimationFrame(animate)
        }
        raf = requestAnimationFrame(animate)

        // Scale ring on hoverable elements
        const addHover = () => {
            document.querySelectorAll('a, button, .project-card, .tech-tag, .skill-item').forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    if (ringRef.current) ringRef.current.classList.add('cursor-hover')
                })
                el.addEventListener('mouseleave', () => {
                    if (ringRef.current) ringRef.current.classList.remove('cursor-hover')
                })
            })
        }
        // Delay to allow DOM to render
        const hoverTimer = setTimeout(addHover, 2000)

        return () => {
            window.removeEventListener('mousemove', handler)
            cancelAnimationFrame(raf)
            clearTimeout(hoverTimer)
        }
    }, [])

    return (
        <div className="custom-cursor-container">
            {/* Trailing particles */}
            {trailPositions.current.map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (trailsRef.current[i] = el)}
                    className="cursor-trail"
                    style={{ opacity: 0.3 - i * 0.05, width: 4 - i * 0.5, height: 4 - i * 0.5 }}
                />
            ))}
            {/* Outer ring */}
            <div ref={ringRef} className="cursor-ring" />
            {/* Inner dot */}
            <div ref={dotRef} className="cursor-dot" />
        </div>
    )
}

export default function App() {
    const { data: about, loading: aboutLoading } = useFetch('/about')
    const { data: projects, loading: projectsLoading } = useFetch('/projects')
    const { data: skills } = useFetch('/skills')
    const { data: experience } = useFetch('/experience')
    const { data: achievements } = useFetch('/achievements')
    const [showLoader, setShowLoader] = useState(true)

    // Lock body scroll while loader is visible
    useEffect(() => {
        if (showLoader) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [showLoader])

    const handleLoadComplete = useCallback(() => {
        window.scrollTo(0, 0)
        setShowLoader(false)
    }, [])

    return (
        <>
            {/* Main content renders underneath the loader */}
            <CustomCursor />
            <Navbar />
            <main>
                <Hero data={about} />
                <hr className="section-divider" />
                <Projects data={projects} />
                <hr className="section-divider" />
                <Experience data={experience} />
                <hr className="section-divider" />
                <Achievements data={achievements} />
                <hr className="section-divider" />
                <Skills data={skills} />
                <hr className="section-divider" />
                <Contact data={about} />
            </main>

            {/* Loader overlay on top — slides up to reveal */}
            {showLoader && <LoadingScreen onComplete={handleLoadComplete} />}
        </>
    )
}
