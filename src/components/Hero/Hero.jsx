import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Typewriter from "../Typewriter/Typewriter";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
};

const lineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

// Split name into individual letters for stagger
const nameLetters = "Uday Vaidya".split("");

const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const labels = [
    { value: 1, suffix: '+', label: 'Years of Experience' },
    { value: 3, suffix: '+', label: 'Projects Completed' },
    { value: 500, suffix: '+', label: 'Hours of Coding' },
]

const CountUp = ({ target, suffix, duration = 1.5, delay = 0 }) => {
    const [display, setDisplay] = useState(0);  // starts showing 0

    useEffect(() => {
        // Wait for `delay` seconds before starting (so it syncs with slide-in)
        const timeout = setTimeout(() => {
            let start = 0;
            const step = target / (duration * 60); // how much to add per frame

            // Runs ~60 times per second (like a game loop)
            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    setDisplay(target);   // snap to exact final value
                    clearInterval(timer); // stop
                } else {
                    setDisplay(Math.floor(start)); // show current count
                }
            }, 1000 / 60); // every ~16ms = 60fps

        }, delay * 1000);
    }, []);

    return <>{display}{suffix}</>;  // e.g. "247+"
};


const socialLinks = [
    {
        href: "https://www.linkedin.com/in/uday-vaidya", alt: "LinkedIn",
        svg: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#ff8400"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    },
    {
        href: "https://github.com/UdayVaidya", alt: "GitHub",
        svg: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#ff8400"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
    },
    {
        href: "https://www.instagram.com/udayvaidya", alt: "Instagram",
        svg: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#ff8400"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
    },
    {
        href: "https://twitter.com/udayvaidya", alt: "X / Twitter",
        svg: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#ff8400"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
    },
]



const Hero = () => {
    const [showScroll, setShowScroll] = useState(true);
    const [shortScreen, setShortScreen] = useState(window.innerHeight < 650);

    useEffect(() => {
        const onScroll = () => setShowScroll(window.scrollY < window.innerHeight * 0.5);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => setShortScreen(window.innerHeight < 650);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <section id="home" className="relative overflow-hidden py-24 px-[5%] flex flex-col" style={{ height: '100dvh' }}>

            {/* Ambient glow orb 1 — top left, orange */}
            <motion.div
                className="absolute top-[-5%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255,132,0,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Ambient glow orb 2 — bottom right, dimmer */}
            <motion.div
                className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255,132,0,0.06) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    willChange: 'transform',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* Hero text */}
            <motion.div
                className="hero-content flex flex-col justify-center relative z-10 md:pt-20 pt-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Line 1 */}
                <motion.p
                    variants={lineVariants}
                    className="md:text-8xl text-5xl font-extrabold mb-4 text-arc-orange uppercase font-mono"
                >
                    Hi, my name is
                </motion.p>

                {/* Line 2 — letter-by-letter flip-in */}
                <motion.h1
                    className="md:text-8xl text-5xl font-extrabold uppercase font-mono mb-4 flex flex-wrap"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } } }}
                    initial="hidden"
                    animate="visible"
                    style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
                >
                    {nameLetters.map((letter, i) =>
                        letter === " " ? (
                            <span key={i} className="mr-6" />
                        ) : (
                            <motion.span
                                key={i}
                                variants={letterVariants}
                                style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
                                whileHover={{
                                    color: '#ff8400',
                                    scale: 1.15,
                                    transition: { duration: 0.15 },
                                }}
                            >
                                {letter}
                            </motion.span>
                        )
                    )}
                </motion.h1>

                {/* Line 3 */}
                <div className="typerwriter">
                    <motion.p
                        variants={lineVariants}
                        className="md:text-8xl text-5xl font-extrabold uppercase font-mono typewriter-mobile-h"
                        style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
                    >
                        I am{" "}
                        <span className="text-arc-orange">
                            <Typewriter
                                words={["Software Engineer", "Full Stack Developer", "Web Developer", "Problem Solver"]}
                            />
                        </span>
                    </motion.p>
                </div>

                <div className="mt-4">
                    <motion.div
                        className="mt-4 inline-block relative overflow-hidden border-2 rounded-lg cursor-pointer"
                        style={{ borderColor: '#ff8400' }}
                        whileHover="hover"
                        initial="rest"
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Fill sweep layer */}
                        <motion.span
                            className="absolute inset-0 z-0"
                            style={{ backgroundColor: '#ff8400', transformOrigin: 'left', scaleX: 0 }}
                            variants={{
                                rest: { scaleX: 0 },
                                hover: { scaleX: 1 },
                            }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Text on top */}
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="relative z-10 md:text-2xl text-xl font-extrabold uppercase font-mono px-4 py-2 inline-block"
                            variants={{
                                rest: { color: '#ffffff' },
                                hover: { color: '#ffffff' },
                            }}
                        >
                            Download Resume{" "}
                            <motion.span
                                className="md:ml-2 ml-1"
                                variants={{
                                    rest: { color: '#ff8400' },
                                    hover: { color: '#ffffff' },
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Social links — all screens: in-flow row below download button */}
            <motion.div
                className="flex flex-row gap-5 mt-5 pt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                {socialLinks.map(({ href, alt, svg }) => (
                    <motion.a
                        key={alt}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.25, opacity: 1 }}
                        className="opacity-65 w-9 h-9"
                    >
                        {svg}
                    </motion.a>
                ))}
            </motion.div>

            {/* Stats bar — mobile: pill card (flex bottom), desktop: absolute vertical list */}
            <motion.div
                className="mt-5 md:mt-10 md:absolute md:bottom-15 md:left-auto md:right-30 pb-4 md:pb-0 z-10"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2, delayChildren: 1.4 } },
                }}
            >
                {/* Mobile card */}
                <div className="flex md:hidden flex-row rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,132,0,0.15)', backdropFilter: 'blur(12px)' }}
                >
                    {labels.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 flex flex-col items-center justify-center py-3 px-2"
                            style={i > 0 ? { borderLeft: '1px solid rgba(255,132,0,0.15)' } : {}}
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <span className="font-mono font-black text-2xl text-arc-orange leading-none">
                                <CountUp target={stat.value} suffix={stat.suffix} delay={1.4 + i * 0.2} />
                            </span>
                            <span className="text-[11px] font-semibold text-white/40 tracking-wide mt-1 text-center leading-tight">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop vertical list */}
                <div className="hidden md:flex flex-col items-start">
                    {labels.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col"
                            variants={{
                                hidden: { opacity: 0, x: 30 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <div className="flex flex-col px-3 py-2">
                                <span className="font-mono font-black text-5xl text-arc-orange leading-none">
                                    <CountUp target={stat.value} suffix={stat.suffix} delay={1.4 + i * 0.2} />
                                </span>
                                <span className="text-lg font-medium text-white/50 tracking-wide mt-1">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom orange line */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, #ff8400, transparent)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <AnimatePresence>
                {showScroll && (
                    <motion.button
                        key="scroll-btn"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: [0, -10, 0] }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={() => {
                            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                        }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 group cursor-pointer"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ y: 4 }}
                        aria-label="Scroll down"
                    >
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(145deg, #ff9a2e, #cc6a00)',
                                boxShadow: '0 6px 0 #7a3d00, 0 8px 16px rgba(255,132,0,0.35)',
                            }}
                            whileTap={{
                                boxShadow: '0 2px 0 #7a3d00, 0 4px 8px rgba(255,132,0,0.25)',
                                y: 4,
                            }}
                            transition={{ duration: 0.1 }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </motion.div>
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40 group-hover:text-arc-orange transition-colors duration-300">
                            Scroll
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;