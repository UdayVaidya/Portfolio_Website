import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
    {
        title: "CodeFlow Nexus",
        description:
            "Collaborative code editor with real-time WebSocket integration for simultaneous multi-user editing. Features syntax highlighting, auto-completion, multi-language support, and secure authentication.",
        tags: ["React", "Node.js", "Socket.io"],
        github: "https://github.com/UdayVaidya",
        live: "https://code-flow-nexus.vercel.app/",
        accent: "#ff8400",
    },
    {
        title: "Job Tracker With Embedded GenAI",
        description:
            "AI-powered job tracking application with GenAI for intelligent job search and recommendations. Integrated 2 GenAI APIs for skills extraction from resumes, reducing manual recruiter review time by ~1 hour weekly.",
        tags: ["React", "Node.js", "MongoDB", "Express", "GenAI"],
        github: "https://github.com/UdayVaidya",
        live: "https://ai-job-tracker-kappa.vercel.app/",
        accent: "#ff8400",
    },
    {
        title: "BuzzRoom",
        description:
            "Real-time chat application with 95% backend efficiency and secure MySQL authentication (99.9% uptime). Implemented WebSocket for instant messaging with 200ms latency and fully responsive UI design.",
        tags: ["Node.js", "Express.js", "MySQL", "WebSocket"],
        github: "https://github.com/UdayVaidya",
        live: "",
        accent: "#ff8400",
    },
    {
        title: "MovieFlix",
        description:
            "A movie discovery dashboard to browse, search, and explore movies and TV shows with details, ratings, and trailers — powered by a public movie API.",
        tags: ["React", "Tailwind CSS", "API"],
        github: "https://github.com/UdayVaidya",
        live: "https://movie-flix-roan.vercel.app/",
        accent: "#ff8400",
    }
];

const experiences = [
    {
        role: "Software Development Engineer (SDE) Intern",
        company: "ITJOBXS · Remote",
        duration: "June 2025 – Aug 2025",
        points: [
            "Developed full-stack web applications using MERN stack with focus on scalable architecture and deployment.",
            "Engineered scalable REST APIs using Node.js and Express, processing 1,500 req/s with 99.95% uptime.",
        ],
    },
    {
        role: "Full Stack Developer Intern",
        company: "Innomatics Research Labs · Hyderabad, India - Remote",
        duration: "Sept 2024 – Nov 2024",
        points: [
            "Built responsive web applications using React.js, Node.js, and Express.js with SQL & NoSQL database management.",
            "Developed RESTful APIs and implemented secure authentication systems for user-centric applications.",
            "Developed 6 reusable UI components using React.js, reducing codebase redundancy for future use.",
        ],
    },
];

// ─── SUB COMPONENTS ──────────────────────────────────────────────────────────

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const ExternalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const SectionHeading = ({ label, title, highlight }) => (
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
            {label}
        </motion.p>
        <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="text-4xl md:text-6xl font-extrabold uppercase font-mono"
        >
            {title} <span className="gradient-text">{highlight}</span>
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
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Project = () => {
    return (
        <section id="projects" className="relative py-24 px-[5%] overflow-hidden">

            {/* ── PROJECTS ── */}
            <SectionHeading label="// what i built" title="Featured" highlight="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
                {projects.map((proj, i) => (
                    <motion.div
                        key={proj.title}
                        className="relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden group"
                        style={{
                            background: "rgba(255,132,0,0.04)",
                            border: "1px solid rgba(255,132,0,0.15)",
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{
                            borderColor: "rgba(255,132,0,0.5)",
                            backgroundColor: "rgba(255,132,0,0.08)",
                        }}
                    >
                        {/* Corner number */}
                        <span
                            className="absolute top-4 right-5 font-mono font-bold text-4xl select-none pointer-events-none"
                            style={{ color: "rgba(255,132,0,0.1)" }}
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Title */}
                        <h3 className="font-mono font-extrabold text-xl md:text-2xl uppercase text-white/90">
                            {proj.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/50 text-sm md:text-base leading-relaxed flex-1">
                            {proj.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {proj.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-mono px-2 py-1 rounded-md"
                                    style={{
                                        background: "rgba(255,132,0,0.1)",
                                        border: "1px solid rgba(255,132,0,0.25)",
                                        color: "#ff8400",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-1">
                            {proj.github && (
                                <motion.a
                                    href={proj.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm font-mono font-semibold text-white/60 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <GitHubIcon /> GitHub
                                </motion.a>
                            )}
                            {proj.live && (
                                <motion.a
                                    href={proj.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm font-mono font-semibold text-arc-orange hover:text-white transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <ExternalIcon /> Live Demo
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── EXPERIENCE ── */}
            <SectionHeading label="// where i've worked" title="Work" highlight="Experience" />

            <div className="relative">
                {/* Vertical line */}
                <div
                    className="absolute left-0 md:left-6 top-0 h-full w-[2px]"
                    style={{ background: "linear-gradient(to bottom, #ff8400, rgba(255,132,0,0.05))" }}
                />

                <div className="flex flex-col gap-10 pl-8 md:pl-20">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Timeline dot */}
                            <div
                                className="absolute -left-[2.40rem] md:-left-[3.9rem] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                style={{ borderColor: "#ff8400", background: "#0a0a0a" }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ background: "#ff8400" }} />
                            </div>

                            {/* Card */}
                            <div
                                className="p-5 md:p-6 rounded-2xl"
                                style={{
                                    background: "rgba(255,132,0,0.04)",
                                    border: "1px solid rgba(255,132,0,0.15)",
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-3">
                                    <div>
                                        <h3 className="font-mono font-extrabold text-lg md:text-xl text-white/90 uppercase">
                                            {exp.role}
                                        </h3>
                                        <p className="text-arc-orange font-mono text-sm font-semibold">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <span
                                        className="text-xs font-mono px-3 py-1 rounded-full self-start md:self-auto"
                                        style={{
                                            background: "rgba(255,132,0,0.1)",
                                            border: "1px solid rgba(255,132,0,0.25)",
                                            color: "rgba(255,132,0,0.8)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {exp.duration}
                                    </span>
                                </div>

                                <ul className="flex flex-col gap-2">
                                    {exp.points.map((pt, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm md:text-base text-white/50 leading-relaxed">
                                            <span className="text-arc-orange mt-1 shrink-0">▹</span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Project;
