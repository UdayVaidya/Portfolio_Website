import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const ThreeScene = lazy(() => import("./ThreeScene"));

gsap.registerPlugin(TextPlugin);

// ── Social links ─────────────────────────────────────────────────────────────
const socialLinks = [
    {
        href: "https://www.linkedin.com/in/uday-vaidya", label: "LinkedIn",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
        href: "https://github.com/UdayVaidya", label: "GitHub",
        path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    },
    {
        href: "https://www.instagram.com/_uday_vaidya", label: "Instagram",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    },
    {
        href: "https://x.com/uday_vaidya_", label: "X / Twitter",
        path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
    },
];

const stats = [
    { value: 1, suffix: "+", label: "Years Exp." },
    { value: 3, suffix: "+", label: "Projects" },
    { value: 500, suffix: "+", label: "Hrs Coding" },
];

const ROLES = ["Full Stack Developer", "Software Engineer", "Web Developer", "Problem Solver"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

// ── Text scramble hook ────────────────────────────────────────────────────────
function useTextScramble(words, interval = 3200) {
    const [display, setDisplay] = useState(words[0]);
    const idx = useRef(0);
    const frameRef = useRef(null);

    const scramble = useCallback((target) => {
        let iteration = 0;
        const maxIter = target.length * 3;
        cancelAnimationFrame(frameRef.current);
        const step = () => {
            setDisplay(
                target.split("").map((char, i) =>
                    i < Math.floor(iteration / 3)
                        ? char
                        : CHARS[Math.floor(Math.random() * CHARS.length)]
                ).join("")
            );
            iteration++;
            if (iteration <= maxIter) frameRef.current = requestAnimationFrame(step);
            else setDisplay(target);
        };
        step();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            idx.current = (idx.current + 1) % words.length;
            scramble(words[idx.current]);
        }, interval);
        return () => { clearInterval(timer); cancelAnimationFrame(frameRef.current); };
    }, [words, interval, scramble]);

    return display;
}

// ── CountUp ───────────────────────────────────────────────────────────────────
function CountUp({ target, suffix, delay = 0 }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => {
            const step = target / 90;
            let v = 0;
            const id = setInterval(() => {
                v += step;
                if (v >= target) { setVal(target); clearInterval(id); }
                else setVal(Math.floor(v));
            }, 16);
            return () => clearInterval(id);
        }, delay * 1000);
        return () => clearTimeout(t);
    }, [target, delay]);
    return <>{val}{suffix}</>;
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticBtn({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 18 });
    const sy = useSpring(y, { stiffness: 200, damping: 18 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
            {children}
        </motion.div>
    );
}

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;
        let W, H;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const COUNT = 80;
        const particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 0.5 + Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            o: 0.15 + Math.random() * 0.45,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < COUNT; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

                // Connect nearby
                for (let j = i + 1; j < COUNT; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,132,0,${(1 - d / 120) * 0.12})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,132,0,${p.o})`;
                ctx.fill();
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}

// ── Glitch name letters ───────────────────────────────────────────────────────
function GlitchName({ name = "Uday Vaidya" }) {
    const words = name.split(" ");
    let delayCounter = 0;
    
    return (
        <h1 className="hero-name flex flex-wrap gap-x-4 sm:gap-x-6 lg:gap-x-8" aria-label={name}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="flex whitespace-nowrap">
                    {word.split("").map((ch, i) => {
                        const currentIdx = delayCounter++;
                        return (
                            <motion.span
                                key={currentIdx}
                                className="inline-block"
                                initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.65, delay: 0.5 + currentIdx * 0.045, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{
                                    color: "#ff8400",
                                    scale: 1.15,
                                    textShadow: "0 0 20px rgba(255,132,0,0.7), 0 0 40px rgba(255,132,0,0.3)",
                                    transition: { duration: 0.15 },
                                }}
                                style={{ transformOrigin: "bottom center", display: "inline-block", perspective: "400px" }}
                            >
                                {ch}
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </h1>
    );
}

// ── Animated border card (Stats) ──────────────────────────────────────────────
function StatCard({ stat, i }) {
    const ref = useRef(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const rotateX = useTransform(y, [0, 1], [8, -8]);
    const rotateY = useTransform(x, [0, 1], [-8, 8]);

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => { x.set(0.5); y.set(0.5); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "600px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="stat-card group relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-default select-none"
        >
            {/* Glow ring */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(255,132,0,0.25) 0%, transparent 70%)",
                    boxShadow: "inset 0 0 24px rgba(255,132,0,0.15)",
                }}
            />
            <span
                className="font-mono font-black text-3xl sm:text-4xl leading-none"
                style={{ color: "#ff8400", textShadow: "0 0 30px rgba(255,132,0,0.5)" }}
            >
                <CountUp target={stat.value} suffix={stat.suffix} delay={1.8 + i * 0.15} />
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/40 mt-1 text-center">
                {stat.label}
            </span>
        </motion.div>
    );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
    const sectionRef = useRef(null);
    const taglineRef = useRef(null);
    const greetRef = useRef(null);
    const lineRef = useRef(null);
    const [showScroll, setShowScroll] = useState(true);
    const scrambled = useTextScramble(ROLES, 3000);

    // GSAP timeline for cinematic reveal
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 });
            tl.from(greetRef.current, { opacity: 0, y: 40, duration: 0.7, ease: "power3.out" })
              .from(lineRef.current, { scaleX: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Scroll hide
    useEffect(() => {
        const fn = () => setShowScroll(window.scrollY < window.innerHeight * 0.5);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Cursor tracking for cursor orb
    const curX = useMotionValue(-200);
    const curY = useMotionValue(-200);
    const springCurX = useSpring(curX, { stiffness: 100, damping: 20 });
    const springCurY = useSpring(curY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const onMove = (e) => { curX.set(e.clientX); curY.set(e.clientY); };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [curX, curY]);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative overflow-hidden flex flex-col justify-center"
            style={{ minHeight: "100dvh", padding: "0 5%" }}
        >
            {/* ── Custom cursor orb ─────────────────────────────── */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block"
                style={{
                    x: springCurX,
                    y: springCurY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,132,0,0.07) 0%, transparent 70%)",
                    filter: "blur(0px)",
                }}
            />

            {/* ── Particle canvas ────────────────────────────────── */}
            <ParticleField />

            {/* ── Ambient orbs ──────────────────────────────────── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    top: "-10%", left: "-8%", width: 700, height: 700,
                    background: "radial-gradient(circle, rgba(255,132,0,0.12) 0%, transparent 65%)",
                    filter: "blur(70px)",
                }}
                animate={{ scale: [1, 1.18, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    bottom: "5%", right: "-10%", width: 500, height: 500,
                    background: "radial-gradient(circle, rgba(255,100,0,0.08) 0%, transparent 65%)",
                    filter: "blur(80px)",
                }}
                animate={{ scale: [1, 1.22, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />

            {/* ── Decorative grid lines ──────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,132,0,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,132,0,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* ── MAIN CONTENT ───────────────────────────────────── */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-0 pt-24 pb-8">

                {/* Left column */}
                <div className="flex flex-col max-w-4xl">

                    {/* "Hi, my name is" */}
                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl font-mono font-bold uppercase tracking-[0.25em] mb-2"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Hi, my name is
                    </motion.p>

                    {/* Big name */}
                    <GlitchName name="Uday Vaidya" />

                    {/* Role scramble */}
                    <motion.div
                        className="mt-3 mb-7 flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                    >
                        <span
                            className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-wide"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            {"< "}
                        </span>
                        <span
                            className="text-xl sm:text-2xl lg:text-3xl font-mono font-extrabold"
                            style={{
                                color: "#ff8400",
                                minWidth: "22ch",
                                textShadow: "0 0 30px rgba(255,132,0,0.4)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {scrambled}
                        </span>
                        <span
                            className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-wide"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            {" />"}
                        </span>
                    </motion.div>

                    {/* CTA row */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Download Resume — primary */}
                        <MagneticBtn strength={0.4}>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-mono font-extrabold text-base uppercase tracking-widest overflow-hidden group"
                                style={{
                                    background: "linear-gradient(135deg, #ff8400, #cc6600)",
                                    boxShadow: "0 0 30px rgba(255,132,0,0.35), 0 6px 0 #7a3d00",
                                    color: "#fff",
                                }}
                                whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,132,0,0.55), 0 4px 0 #7a3d00" }}
                                whileTap={{ scale: 0.96, y: 3, boxShadow: "0 0 20px rgba(255,132,0,0.3), 0 2px 0 #7a3d00" }}
                            >
                                {/* Shimmer */}
                                <motion.span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                    style={{
                                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                                        backgroundSize: "200% 100%",
                                    }}
                                    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12" />
                                </svg>
                                <span className="relative z-10">Download Resume</span>
                            </motion.a>
                        </MagneticBtn>

                        {/* View Work — ghost */}
                        <MagneticBtn strength={0.4}>
                            <motion.a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono font-extrabold text-base uppercase tracking-widest border-2 transition-colors duration-300"
                                style={{ borderColor: "rgba(255,132,0,0.4)", color: "rgba(255,255,255,0.7)" }}
                                whileHover={{
                                    borderColor: "#ff8400",
                                    color: "#ff8400",
                                    boxShadow: "0 0 24px rgba(255,132,0,0.2)",
                                    scale: 1.04,
                                }}
                                whileTap={{ scale: 0.96 }}
                            >
                                View Work
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                            </motion.a>
                        </MagneticBtn>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div
                        className="flex items-center gap-4 mt-7"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.65, duration: 0.6 }}
                    >
                        <span className="text-xs font-mono uppercase tracking-widest text-white/25">Follow</span>
                        <span className="w-8 h-px" style={{ background: "linear-gradient(90deg,rgba(255,132,0,0.4),transparent)" }} />
                        {socialLinks.map(({ href, label, path }) => (
                            <MagneticBtn key={label} strength={0.5}>
                                <motion.a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-colors duration-200"
                                    style={{ borderColor: "rgba(255,132,0,0.2)", background: "rgba(255,132,0,0.04)" }}
                                    whileHover={{
                                        borderColor: "rgba(255,132,0,0.7)",
                                        background: "rgba(255,132,0,0.12)",
                                        boxShadow: "0 0 18px rgba(255,132,0,0.3)",
                                        scale: 1.12,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="rgba(255,132,0,0.7)">
                                        <path d={path} />
                                    </svg>
                                </motion.a>
                            </MagneticBtn>
                        ))}
                    </motion.div>
                </div>

                {/* Right column — Three.js scene + Stats */}
                <motion.div
                    className="flex flex-col items-center gap-4 lg:gap-6"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Three.js canvas — desktop only */}
                    <div
                        className="hidden lg:block relative rounded-3xl overflow-hidden"
                        style={{
                            width: 420,
                            height: 420,
                            background: "rgba(255,132,0,0.03)",
                            border: "1px solid rgba(255,132,0,0.12)",
                            boxShadow: "0 0 80px rgba(255,132,0,0.08), inset 0 0 40px rgba(255,132,0,0.04)",
                        }}
                    >
                        <Suspense fallback={
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs uppercase tracking-widest">
                                Loading 3D Engine...
                            </div>
                        }>
                            <ThreeScene />
                        </Suspense>
                        {/* Corner accents */}
                        <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: "rgba(255,132,0,0.5)" }} />
                        <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: "rgba(255,132,0,0.5)" }} />
                        <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: "rgba(255,132,0,0.5)" }} />
                        <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: "rgba(255,132,0,0.5)" }} />
                        {/* Scan line */}
                        <motion.div
                            className="absolute left-0 right-0 h-px pointer-events-none"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,132,0,0.4), transparent)" }}
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Label */}
                        <div
                            className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2 gap-2"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ff8400" }} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Interactive 3D</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-row lg:flex-row items-center gap-3">
                        {stats.map((stat, i) => (
                            <StatCard key={i} stat={stat} i={i} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ───────────────────────────────── */}
            <AnimatePresence>
                {showScroll && (
                    <motion.button
                        key="scroll"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: [0, -8, 0] }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 2 } }}
                        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer group"
                        aria-label="Scroll down"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-orange-400 transition-colors duration-300">
                            Scroll
                        </span>
                        <motion.div
                            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
                            style={{ borderColor: "rgba(255,132,0,0.35)" }}
                            whileHover={{ borderColor: "rgba(255,132,0,0.8)", boxShadow: "0 0 12px rgba(255,132,0,0.3)" }}
                        >
                            <motion.span
                                className="w-1 h-2.5 rounded-full"
                                style={{ background: "#ff8400", boxShadow: "0 0 6px #ff8400" }}
                                animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Bottom decorative bar ──────────────────────────── */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,132,0,0.3), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
            />
        </section>
    );
};

export default Hero;