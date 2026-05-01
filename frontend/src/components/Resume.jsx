import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const RESUME_PDF = '/ResumeAdityakeerti.pdf'
const RESUME_SRC = `${RESUME_PDF}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`

export default function Resume() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [loaded, setLoaded] = useState(false)

    return (
        <section id="resume" className="resume-section" ref={ref}>
            <div className="resume-section-glow" aria-hidden />

            <div className="container">
                <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Credentials
                </motion.span>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Résumé
                </motion.h2>

                <motion.article
                    className="resume-showcase"
                    initial={{ opacity: 0, y: 36 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="resume-showcase-header">
                        <div className="resume-showcase-copy">
                            <span className="resume-file-tag">
                                <span className="resume-file-dot" aria-hidden />
                                PDF · Adityakeerti
                            </span>
                            <p className="resume-lead">
                                Experience, projects, internships, and education in one place.
                                Open in a new tab for the sharpest view, or grab the file for
                                applications.
                            </p>
                            <ul className="resume-mini-list">
                                <li>Production projects & hackathon wins</li>
                                <li>Peerprep internship & technical stack</li>
                                <li>Education & contact</li>
                            </ul>
                        </div>
                        <div className="resume-showcase-actions">
                            <a
                                href={RESUME_PDF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-btn resume-btn-primary"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Open PDF
                            </a>
                            <a
                                href={RESUME_PDF}
                                download="ResumeAdityakeerti.pdf"
                                className="resume-btn"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Download
                            </a>
                        </div>
                    </div>

                    <div className="resume-showcase-preview-bleed">
                        <div className="resume-preview-shell">
                            <div className="resume-preview-chrome" aria-hidden>
                                <span className="resume-preview-dot" />
                                <span className="resume-preview-dot" />
                                <span className="resume-preview-dot" />
                                <span className="resume-preview-url">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                                    </svg>
                                    ResumeAdityakeerti.pdf
                                </span>
                            </div>
                            <div className="resume-preview-viewport">
                                {!loaded && <div className="resume-shimmer" aria-hidden />}
                                <motion.iframe
                                    title="Résumé PDF preview"
                                    src={RESUME_SRC}
                                    className="resume-frame"
                                    loading="lazy"
                                    onLoad={() => setLoaded(true)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: loaded ? 1 : 0 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />
                                <div className="resume-preview-fade" aria-hidden />
                            </div>
                        </div>
                        <p className="resume-preview-hint">
                            Preview — use <strong>Open PDF</strong> for zoom and print.
                        </p>
                    </div>
                </motion.article>
            </div>
        </section>
    )
}
