import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from "../../utils/variants";

const highlights = [
    { icon: "⚡", label: "5+ Deployed Projects" },
    { icon: "🛠️", label: "80+ DSA Problems" },
    { icon: "🎨", label: "Full-Stack Developer" },
    { icon: "🤝", label: "Server Side Dev" },
];

const nameLetters = "Uday Vaidya".split("");

const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
        opacity: 1, y: 0, rotateX: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

// ── Small floating ring that tracks the avatar on mobile ──────────────────────
const PulseRing = ({ delay = 0, scale = 1 }) => (
    <motion.span
        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
        style={{ borderColor: "rgba(255,132,0,0.4)" }}
        animate={{ scale: [1, scale, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

const About = () => {
    return (
        <section id="about" className="relative py-3 px-[5%] overflow-hidden">

            {/* ── Floating ambient orb (visible on mobile) ──── */}
            <motion.div
                className="absolute top-[30%] right-[-12%] w-64 h-64 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,132,0,0.08) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
                animate={{ scale: [1, 1.25, 1], x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Section heading */}
            <motion.div
                className="mb-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer(0.12, 0)}
            >
                <motion.p
                    variants={fadeUp}
                    custom={0}
                    className="text-arc-orange font-mono text-sm uppercase tracking-[0.25em] mb-2"
                >
                    // get to know me
                </motion.p>
                <motion.h2
                    variants={fadeUp}
                    custom={0.1}
                    className="text-4xl md:text-6xl font-extrabold uppercase font-mono"
                >
                    About <span className="gradient-text">Me</span>
                </motion.h2>
                <motion.div
                    className="mt-3 h-[2px] w-16"
                    style={{ background: "linear-gradient(90deg, #ff8400, transparent)" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Left — image with pulse rings */}
                <motion.div
                    className="relative md:w-2/5 w-full flex-shrink-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeLeft}
                >
                    {/* Pulse rings — especially visible on mobile */}
                    <PulseRing delay={0}   scale={1.06} />
                    <PulseRing delay={1.2} scale={1.12} />

                    {/* Orange border accent */}
                    <div
                        className="absolute -top-3 -left-3 w-full h-full rounded-2xl z-0"
                        style={{ border: "2px solid rgba(255,132,0,0.35)" }}
                    />
                    <img
                        src="/uday.jpeg"
                        alt="Uday Vaidya"
                        className="relative z-10 w-full rounded-2xl object-cover"
                        style={{ aspectRatio: "3/3", filter: "brightness(0.85) contrast(1.05)" }}
                    />
                    {/* Bottom glow */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-2xl z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(255,132,0,0.12), transparent)" }}
                    />

                    {/* Floating tag — always visible */}
                    <motion.div
                        className="absolute -bottom-4 -right-4 z-20 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider"
                        style={{
                            background: "rgba(255,132,0,0.12)",
                            border: "1px solid rgba(255,132,0,0.35)",
                            color: "#ff8400",
                            backdropFilter: "blur(12px)",
                        }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Full Stack Dev 🚀
                    </motion.div>
                </motion.div>

                {/* Right — text */}
                <motion.div
                    className="flex-1 flex flex-col gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer(0.15, 0.1)}
                >
                    <motion.p
                        variants={fadeRight}
                        className="text-lg md:text-2xl text-white/70 leading-relaxed"
                    >
                        I'm{" "}
                        <motion.span
                            className="md:text-xl text-lg font-extrabold uppercase font-mono inline-flex flex-wrap"
                            variants={staggerContainer(0.05, 0.3)}
                            style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
                        >
                            {nameLetters.map((letter, i) =>
                                letter === " " ? (
                                    <span key={i} className="mr-2" />
                                ) : (
                                    <motion.span
                                        key={i}
                                        variants={letterVariants}
                                        style={{ display: "inline-block", transformOrigin: "bottom center" }}
                                        whileHover={{ color: "#ff8400", scale: 1.15, transition: { duration: 0.15 } }}
                                    >
                                        {letter}
                                    </motion.span>
                                )
                            )}
                        </motion.span>
                        {", "}a{" "}
                        <span className="text-arc-orange font-semibold font-mono tracking-wider">Full Stack Developer</span> focused on building
                        scalable web applications, clean backend systems, and
                        performance-optimized user interfaces.
                    </motion.p>

                    <motion.p
                        variants={fadeRight}
                        className="text-base md:text-xl text-white/50 leading-relaxed"
                    >
                        I build end-to-end applications — from designing REST APIs
                        and backend logic to creating responsive frontends using
                        modern JavaScript frameworks. I enjoy solving real problems,
                        optimizing performance, and deploying production-ready
                        projects.
                    </motion.p>

                    {/* Highlights grid — staggered on scroll */}
                    <motion.div
                        variants={staggerContainer(0.1, 0.2)}
                        className="grid grid-cols-2 gap-3 mt-2"
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                custom={i * 0.07}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                style={{
                                    background: "rgba(255,132,0,0.06)",
                                    border: "1px solid rgba(255,132,0,0.15)",
                                }}
                                whileHover={{
                                    backgroundColor: "rgba(255,132,0,0.12)",
                                    borderColor: "rgba(255,132,0,0.4)",
                                    scale: 1.03,
                                }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="text-xl">{h.icon}</span>
                                <span className="text-sm font-semibold text-white/80">{h.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-4">
                        <motion.div
                            variants={fadeUp}
                            custom={0.3}
                            className="mt-4 inline-block relative overflow-hidden border-2 rounded-lg cursor-pointer"
                            style={{ borderColor: "#ff8400" }}
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            initial="rest"
                        >
                            <motion.span
                                className="absolute inset-0 z-0"
                                style={{ backgroundColor: "#ff8400", transformOrigin: "left", scaleX: 0 }}
                                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.a
                                href="#projects"
                                className="relative z-10 md:text-2xl text-lg font-bold capitalize font-mono px-4 py-2 inline-block"
                                variants={{ rest: { color: "#ffffff" }, hover: { color: "#ffffff" } }}
                            >
                                View My Projects{" "}
                                <motion.span
                                    className="md:ml-2 ml-1"
                                    variants={{ rest: { color: "#ff8400" }, hover: { color: "#ffffff" } }}
                                    transition={{ duration: 0.3 }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;