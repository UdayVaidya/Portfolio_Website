import { motion } from "framer-motion";
import image from "../../../public/uday.jpeg";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const highlights = [
    { icon: "⚡", label: "Fast Learner" },
    { icon: "🛠️", label: "Problem Solver" },
    { icon: "🎨", label: "Logic & Creativity" },
    { icon: "🤝", label: "Team Player" },
];

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

const About = () => {
    return (
        <section id="about" className="relative py-0 px-[5%] overflow-hidden">

            {/* Section heading */}
            <motion.div
                className="mb-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
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
                {/* Animated underline */}
                <motion.div
                    className="mt-3 h-[2px] w-16"
                    style={{ background: 'linear-gradient(90deg, #ff8400, transparent)' }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Left — image */}
                <motion.div
                    className="relative md:w-2/5 w-full flex-shrink-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeLeft}
                >
                    {/* Orange border accent */}
                    <div
                        className="absolute -top-3 -left-3 w-full h-full rounded-2xl z-0"
                        style={{ border: '2px solid rgba(255,132,0,0.35)' }}
                    />
                    <img
                        src={image}
                        alt="Uday Vaidya"
                        className="relative z-10 w-full rounded-2xl object-cover"
                        style={{ aspectRatio: '3/3', filter: 'brightness(0.85) contrast(1.05)' }}
                    />
                    {/* Glow */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-2xl z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(255,132,0,0.12), transparent)' }}
                    />
                </motion.div>

                {/* Right — text */}
                <motion.div
                    className="flex-1 flex flex-col gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
                >
                    <motion.p
                        variants={fadeRight}
                        className="text-lg md:text-2xl text-white/70 leading-relaxed"
                    >
                        I'm{" "}
                        <motion.span
                            className="md:text-xl text-lg font-extrabold uppercase font-mono inline-flex flex-wrap"
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
                            style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
                        >
                            {nameLetters.map((letter, i) =>
                                letter === " " ? (
                                    <span key={i} className="mr-2" />
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
                        </motion.span>
                        {", "}a passionate{" "}
                        <span className="text-arc-orange font-semibold">Full Stack Developer</span> who loves
                        turning ideas into polished digital experiences.
                    </motion.p>

                    <motion.p
                        variants={fadeRight}
                        className="text-base md:text-xl text-white/50 leading-relaxed"
                    >
                        I focus on building solid backend systems, clean RESTful APIs, and
                        seamless CI/CD pipelines — while also crafting polished, responsive UIs
                        that make the full stack experience feel effortless.
                    </motion.p>

                    {/* Highlights grid */}
                    <motion.div
                        variants={fadeRight}
                        className="grid grid-cols-2 gap-3 mt-2"
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                style={{
                                    background: 'rgba(255,132,0,0.06)',
                                    border: '1px solid rgba(255,132,0,0.15)',
                                }}
                                whileHover={{
                                    backgroundColor: 'rgba(255,132,0,0.12)',
                                    borderColor: 'rgba(255,132,0,0.4)',
                                    scale: 1.02,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="text-xl">{h.icon}</span>
                                <span className="text-sm font-semibold text-white/80">{h.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

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
                                href="#contact"
                                className="relative z-10 md:text-2xl text-lg font-bold capitalize font-mono px-4 py-2 inline-block"
                                variants={{
                                    rest: { color: '#ffffff' },
                                    hover: { color: '#ffffff' },
                                }}
                            >
                                Let's work together{" "}
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
            </div>
        </section>
    );
};

export default About;