import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const RESUME_PDF = '/ResumeAdityakeerti.pdf'

export default function Resume() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="resume" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    CV
                </motion.span>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Resume
                </motion.h2>

                <motion.div
                    className="resume-toolbar"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <a
                        href={RESUME_PDF}
                        download="ResumeAdityakeerti.pdf"
                        className="resume-action"
                    >
                        Download PDF
                    </a>
                    <a
                        href={RESUME_PDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-action resume-action-secondary"
                    >
                        Open in new tab
                    </a>
                </motion.div>

                <motion.div
                    className="resume-panel"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <iframe
                        title="Adityakeerti resume PDF"
                        src={RESUME_PDF}
                        className="resume-frame"
                    />
                </motion.div>
            </div>
        </section>
    )
}
