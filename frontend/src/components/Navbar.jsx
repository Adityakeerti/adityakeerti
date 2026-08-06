import { motion } from 'framer-motion'

export default function Navbar({ activeIndex, setActiveIndex }) {
    const links = [
        { label: 'Profile', index: 0 },
        { label: 'Projects', index: 1 },
        { label: 'Experience & Skills', index: 2 },
        { label: 'Achievements & Contact', index: 3 },
    ]

    return (
        <motion.nav
            className="navbar scrolled"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container navbar-inner">
                <a href="#" className="navbar-logo" onClick={(e) => { e.preventDefault(); setActiveIndex(0); }} aria-label="Home">
                    AK<span>.</span>
                </a>

                <ul className="navbar-links-deck">
                    {links.map(({ label, index }) => {
                        const isActive = activeIndex === index
                        return (
                            <li key={index} className="navbar-deck-item">
                                <button
                                    onClick={() => setActiveIndex(index)}
                                    className={`navbar-deck-btn ${isActive ? 'active' : ''}`}
                                >
                                    {label}
                                    {isActive && (
                                        <motion.div
                                            className="navbar-active-bar"
                                            layoutId="activeNavDeck"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </motion.nav>
    )
}
