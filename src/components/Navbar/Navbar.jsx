import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMenuOpen(false);
    };

    return (
        <div className="fixed top-0 md:top-4 left-0 right-0 z-50 py-2 px-3">
            {/* Pill navbar */}
            <motion.div
                className="max-w-6xl mx-auto px-8 py-2 flex justify-between items-center rounded-2xl border bg-transparent backdrop-blur-lg"
                animate={{
                    borderColor: scrolled ? 'rgba(255,132,0,0.35)' : 'rgba(255,255,255,0.08)',
                    backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
                    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
                }}
                whileHover={{
                    borderColor: 'rgba(255,132,0,0.7)',
                    backgroundColor: scrolled ? 'rgba(20,20,20,0.85)' : 'rgba(255,132,0,0.03)',
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Logo */}
                <div className="logo flex items-center">
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="font-mono font-bold text-xl mr-auto tracking-tight md:text-3xl transition-all duration-300 ease-in-out"
                    >
                        <span className="text-arc-orange">&lt;</span>
                        UDAY <span className="gradient-text">VAIDYA</span>
                        <span className="text-white">/</span>
                        <span className="text-arc-orange">&gt;</span>
                    </a>
                </div>

                {/* Mobile hamburger */}
                <motion.div className="md:hidden">
                    <motion.button
                        className="flex flex-col gap-1.5 cursor-pointer"
                        onClick={() => setMenuOpen(open => !open)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            style={{ backgroundColor: '#ff8400' }}
                            className="block w-6 h-0.5 rounded"
                        />
                        <motion.span
                            animate={{ opacity: menuOpen ? 0 : 1 }}
                            style={{ backgroundColor: '#ff8400' }}
                            className="block w-6 h-0.5 rounded"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            style={{ backgroundColor: '#ff8400' }}
                            className="block w-6 h-0.5 rounded"
                        />
                    </motion.button>
                </motion.div>

                {/* Desktop nav links */}
                <motion.ul className="hidden md:flex space-x-6 items-center">
                    {navLinks.map((link) => (
                        <motion.li
                            key={link.label}
                            className="relative pb-1"
                            whileHover="hovered"
                            initial="initial"
                        >
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="font-bold text-lg hover:text-arc-orange inline-block transition-colors duration-300 ease-in-out"
                            >
                                {link.label}
                            </a>
                            <motion.div
                                style={{ backgroundColor: '#ff8400', height: '2px' }}
                                className="absolute bottom-0 left-0"
                                variants={{
                                    initial: { width: '0%' },
                                    hovered: { width: '100%' },
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                        </motion.li>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="w-full text-center px-3 py-2 rounded-2xl font-bold text-md text-white transition-colors duration-300 ease-in-out"
                        style={{ background: 'linear-gradient(135deg, #ff8400, #cc6a00)' }}
                    >
                        Let's Talk
                    </a>
                </motion.ul>
            </motion.div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden left-0 right-0 z-40 overflow-hidden mt-2 px-3 bg-transparent backdrop-blur-lg rounded-lg border border-[rgba(255,132,0,0.35)]"
                    >
                        <div className="flex flex-col items-center gap-2 px-8 py-5">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="w-full text-center py-2 px-4 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-[rgba(255,134,4,0.16)]"
                                    style={{ borderBottom: '1px solid rgba(255,132,0,0.1)' }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="mt-2 w-full text-center px-5 py-2 rounded-2xl font-semibold text-md text-white"
                                style={{ background: 'linear-gradient(135deg, #ff8400, #cc6a00)' }}
                            >
                                Let's Talk
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;
