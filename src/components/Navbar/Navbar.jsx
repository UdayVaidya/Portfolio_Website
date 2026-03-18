import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "Home",     href: "#home"     },
    { label: "About",    href: "#about"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Projects", href: "#projects" },
];

const SECTIONS = NAV_LINKS.map(l => l.href.replace("#", ""));

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive]     = useState("home");

    /* ── Scroll spy ─────────────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 80);
            const offset = window.innerHeight * 0.4;
            let current = "home";
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= offset) current = id;
            }
            setActive(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Smooth nav click ───────────────────────────────────── */
    const handleNavClick = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
    };

    return (
        <div className="fixed top-0 md:top-4 left-0 right-0 z-50 py-2 px-3">
            {/* Pill navbar */}
            <motion.div
                className="max-w-6xl mx-auto px-8 py-2 flex justify-between items-center rounded-2xl border"
                animate={{
                    borderColor:    scrolled ? "rgba(255,132,0,0.35)" : "rgba(255,255,255,0.08)",
                    backgroundColor: scrolled ? "rgba(13,13,13,0.88)" : "transparent",
                    backdropFilter:  scrolled ? "blur(20px)" : "blur(0px)",
                    boxShadow:       scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
                }}
                transition={{ duration: 0.4 }}
            >
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className="font-mono font-bold text-xl md:text-3xl tracking-tight transition-all duration-300"
                >
                    <span className="text-arc-orange">&lt;</span>
                    UDAY <span className="gradient-text">VAIDYA</span>
                    <span className="text-white">/</span>
                    <span className="text-arc-orange">&gt;</span>
                </a>

                {/* ── Mobile hamburger ───────────────────────── */}
                <motion.button
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.88 }}
                >
                    <motion.span
                        animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        style={{ backgroundColor: "#ff8400" }}
                        className="block w-6 h-0.5 rounded origin-center"
                        transition={{ duration: 0.25 }}
                    />
                    <motion.span
                        animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                        style={{ backgroundColor: "#ff8400" }}
                        className="block w-6 h-0.5 rounded"
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        style={{ backgroundColor: "#ff8400" }}
                        className="block w-6 h-0.5 rounded origin-center"
                        transition={{ duration: 0.25 }}
                    />
                </motion.button>

                {/* ── Desktop nav ─────────────────────────────── */}
                <ul className="hidden md:flex space-x-6 items-center">
                    {NAV_LINKS.map((link) => {
                        const isActive = active === link.href.replace("#", "");
                        return (
                            <motion.li
                                key={link.label}
                                className="relative pb-1"
                                whileHover="hovered"
                                initial="initial"
                            >
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="font-bold text-lg inline-block transition-colors duration-300"
                                    style={{ color: isActive ? "#ff8400" : undefined }}
                                >
                                    {link.label}
                                </a>
                                {/* Active indicator dot */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            key="dot"
                                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ background: "#ff8400", boxShadow: "0 0 6px #ff8400" }}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        />
                                    )}
                                </AnimatePresence>
                                {/* Hover underline */}
                                <motion.div
                                    style={{ backgroundColor: "#ff8400", height: "2px" }}
                                    className="absolute bottom-0 left-0"
                                    variants={{ initial: { width: "0%" }, hovered: { width: "100%" } }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                />
                            </motion.li>
                        );
                    })}
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,132,0,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-2xl font-semibold text-md text-white"
                        style={{ background: "linear-gradient(135deg, #ff8400, #cc6a00)" }}
                    >
                        Let's Connect
                    </motion.a>
                </ul>
            </motion.div>

            {/* ── Mobile dropdown — stagger ──────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -16, scaleY: 0.85 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -16, scaleY: 0.85 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden mt-2 px-3 overflow-hidden origin-top"
                        style={{ transformOrigin: "top center" }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-1 px-4 py-4 rounded-xl border"
                            style={{
                                background: "rgba(13,13,13,0.92)",
                                borderColor: "rgba(255,132,0,0.25)",
                                backdropFilter: "blur(20px)",
                            }}
                            initial="hidden"
                            animate="visible"
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
                        >
                            {NAV_LINKS.map(link => {
                                const isActive = active === link.href.replace("#", "");
                                return (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        variants={{
                                            hidden:  { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                                        }}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-lg font-mono font-semibold text-sm uppercase tracking-widest"
                                        style={{
                                            color: isActive ? "#ff8400" : "rgba(255,255,255,0.55)",
                                            background: isActive ? "rgba(255,132,0,0.08)" : "transparent",
                                            borderBottom: "1px solid rgba(255,132,0,0.08)",
                                        }}
                                        whileTap={{ scale: 0.97, backgroundColor: "rgba(255,132,0,0.12)" }}
                                    >
                                        {isActive && (
                                            <span
                                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: "#ff8400", boxShadow: "0 0 6px #ff8400" }}
                                            />
                                        )}
                                        {link.label}
                                    </motion.a>
                                );
                            })}

                            <motion.a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, "#contact")}
                                variants={{
                                    hidden:  { opacity: 0, y: 12 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                                }}
                                className="mt-2 w-full text-center px-5 py-3 rounded-2xl font-semibold text-sm text-white uppercase tracking-wider"
                                style={{ background: "linear-gradient(135deg, #ff8400, #cc6a00)", boxShadow: "0 0 20px rgba(255,132,0,0.25)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Let's Connect
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
