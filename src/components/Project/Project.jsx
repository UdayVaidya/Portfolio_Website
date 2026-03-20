import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Fragment } from "react";
import ProjectDetails from "./ProjectDetails";

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
            "Built a real-time collaborative code editor where multiple users can edit code together using WebSockets. Implemented authentication and handled live syncing between users for smooth editing.",
        detailedDescription: "CodeFlow Nexus is a highly interactive, real-time collaborative code editor engineered for seamless pair programming. Powered by WebSockets (Socket.io), it allows multiple developers to join a unified room, edit the same codebase concurrently, and instantly see live cursor movements. The platform features robust token-based user authentication ensuring secure workspaces, alongside syntax highlighting and instant peer-to-peer code syncing to prevent cursor conflicts and racing conditions during high-volume edits.",
        tags: ["React", "Node.js", "Socket.io"],
        github: "https://github.com/UdayVaidya/CodeFlow-Nexus",
        live: "https://code-flow-nexus.vercel.app/",
        sub: "Real-time Collaboration Tool",
        accent: "#ff8400",
        thumbnail: "/thumbnails/CodeFlowNexus.png"
    },
    {
        title: "Job Tracker With Embedded GenAI",
        description:
            "An AI-enhanced job tracking dashboard that utilizes dual GenAI APIs to automatically parse uploaded resumes, extract skills, and provide intelligent insights for tracked applications.",
        detailedDescription: "Developed a robust full-stack application designed to organize and meticulously track job applications. Powered by dual Generative AI APIs, the platform introduces intelligent resume analysis by automatically parsing uploaded documents and extracting core skills. By leveraging a secure MERN stack architecture, the system maintains application statuses and notes securely, while the embedded AI provides targeted insights by comparing the user's extracted skills against the requirements of the roles they are tracking.",
        tags: ["React", "Node.js", "MongoDB", "Express", "GenAI"],
        github: "https://github.com/UdayVaidya/AI-Job-Tracker",
        live: "https://ai-job-tracker-kappa.vercel.app/",
        sub: "AI-assisted Productivity App",
        accent: "#ff8400",
        thumbnail: "/thumbnails/AIJobTracker.png"
    },
    {
        title: "CineMatheque",
        description:
            "A full-stack movie recommendation platform featuring detailed mood-based scanning, allowing users to discover personalized cinematic experiences effortlessly.",
        detailedDescription: "CineMatheque serves as an immersive cinematic discovery platform driven by an intelligent mood-scanning recommendation engine. Built on a scalable MERN stack, the application transcends traditional search by matching users to films based on emotional states alongside robust metadata exploration. Features include secured JWT authentication, expansive API-driven movie catalogs, responsive cross-device UI built with React, and a lightning-fast Node.js backend to serve complex search queries instantly.",
        tags: ["Node.js", "Express.js", "ReactJS", "MongoDB", "GenAI"],
        github: "https://github.com/UdayVaidya/CineMathe2ue",
        live: "https://cine-mathe2ue.vercel.app",
        sub: "Full Stack Movie Recommendation System with AI models mood scanner",
        accent: "#ff8400",
        thumbnail: "/thumbnails/CineMathe2ue.png"
    },
    {
        title: "MovieFlix",
        description:
            "A movie discovery dashboard to browse, search, and explore movies and TV shows with details, ratings, and trailers — powered by a public movie API.",
        detailedDescription: "MovieFlix is an aesthetically rich, API-driven dashboard designed for ultimate cinematic discovery. Consuming massive datasets from public movie APIs, it renders beautiful, Netflix-style interfaces featuring infinite scrolling, instant typeahead search, and categorized browsing (Trending, Top Rated, Action, etc.). Developed purely with React and Tailwind CSS, it boasts a perfectly responsive layout and utilizes custom hooks for smart API state management, ensuring an app-like experience optimized for low latency and high visual fidelity.",
        tags: ["React", "Tailwind CSS", "API"],
        github: "https://github.com/UdayVaidya/Movie-Flix",
        live: "https://movie-flix-roan.vercel.app/",
        sub: "API-driven Dashboard",
        accent: "#ff8400",
        thumbnail: "/thumbnails/Movieflix.png"
    }
];

// Real-time Collaboration Tool
// AI-assisted Productivity App
// Real-time Messaging System
// API-driven Dashboard

const experiences = [
    {
        role: "Software Development Engineer (SDE) Intern",
        company: "ITJOBXS · Remote",
        duration: "June 2025 – Aug 2025",
        points: [
            "Developed full-stack web applications using MERN stack with focus on scalable architecture and deployment.",
            "Engineered scalable REST APIs using Node.js and Expressjs with SQL & NoSQL database management.",
            "Implemented secure authentication systems for user-centric applications.",
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
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // Preload all thumbnails on mount so hover is instant
    useEffect(() => {
        projects.forEach((proj) => {
            if (proj.thumbnail) {
                const img = new Image();
                img.src = proj.thumbnail;
            }
        });
    }, []);

    return (
        <section id="projects" className="relative py-24 px-[5%] overflow-hidden">

            {/* ── PROJECTS ── */}
            <SectionHeading label="// what i built" title="Featured" highlight="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32 overflow-visible">
                {projects.map((proj, i) => (
                    <motion.div
                        key={proj.title}
                        className="relative flex flex-col gap-4 p-6 rounded-2xl overflow-visible group cursor-pointer"
                        style={{
                            background: "rgba(255,132,0,0.04)",
                            border: "1px solid rgba(255,132,0,0.15)",
                        }}
                        initial={{ opacity: 0, y: 48 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.65,
                            delay: i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{
                            borderColor: "rgba(255,132,0,0.5)",
                            backgroundColor: "rgba(255,132,0,0.08)",
                            y: -4,
                        }}
                        whileTap={{ scale: 0.98, borderColor: "rgba(255,132,0,0.6)" }}
                        onMouseEnter={() => proj.thumbnail && setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedProject(proj)}
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

                        {/* Sub line */}
                        <p className="text-arc-orange/80 text-sm md:text-sm font-mono tracking-wider">
                            {proj.sub}
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
                                    className="flex items-center gap-2 text-sm font-mono font-semibold text-white/60 hover:text-white"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <GitHubIcon /> GitHub
                                </motion.a>
                            )}

                            {proj.live && (
                                <motion.a
                                    href={proj.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm font-mono font-semibold text-arc-orange hover:text-white"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <ExternalIcon /> Live Demo
                                </motion.a>
                            )}
                        </div>


                        {/* THUMBNAIL — desktop hover overlay */}
                        <AnimatePresence>
                            {hoveredIndex === i && proj.thumbnail && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scaleX: 0.2,
                                        scaleY: 0.6,
                                        x: 80,
                                        skewX: 15,
                                        transformOrigin: "right center",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: -30,
                                        skewX: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scaleX: 0.2,
                                        scaleY: 0.6,
                                        x: 80,
                                        skewX: 15,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 22,
                                        mass: 0.6,
                                    }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2
                                            w-48 md:w-56 lg:w-[400px] rounded-xl overflow-hidden
                                            border border-white/10 shadow-2xl z-50
                                            pointer-events-none hidden md:block"
                                >
                                    <img
                                        src={proj.thumbnail}
                                        alt={proj.title}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                        decoding="async"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

            </div>

            {/* ── EXPERIENCE ── */}
            <SectionHeading label="// where i've worked" title="Work" highlight="Experience" />

            <div className="relative">

                {/* ─── Animated Vertical Line ─── */}
                <motion.div
                    className="absolute left-0 md:left-6 top-0 w-[2px]"
                    style={{
                        background:
                            "linear-gradient(to bottom, #ff8400, rgba(255,132,0,0.05))",
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />

                <div className="flex flex-col gap-10 pl-8 md:pl-20">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >

                            {/* ─── Timeline Dot ─── */}
                            <div
                                className="absolute -left-[2.40rem] md:-left-[3.9rem] top-1
                               w-4 h-4 rounded-full border-2
                               flex items-center justify-center"
                                style={{
                                    borderColor: "#ff8400",
                                    background: "#0a0a0a",
                                }}
                            >
                                <motion.div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: "#ff8400" }}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [1, 0.6, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </div>

                            {/* ─── Card ─── */}
                            <motion.div
                                className="p-5 md:p-6 rounded-2xl"
                                style={{
                                    background: "rgba(255,132,0,0.04)",
                                    border: "1px solid rgba(255,132,0,0.15)",
                                }}
                                whileHover={{
                                    y: -6,
                                    borderColor: "rgba(255,132,0,0.4)",
                                    boxShadow:
                                        "0 20px 40px rgba(255,132,0,0.15)",
                                }}
                                whileTap={{ scale: 0.98, boxShadow: "0 4px 16px rgba(255,132,0,0.1)" }}
                                transition={{ duration: 0.25 }}
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
                                        <li
                                            key={j}
                                            className="flex gap-3 text-sm md:text-[1rem] font-bold text-white/50 leading-relaxed m-2"
                                        >
                                            <span className="text-arc-orange mt-0 shrink-0">
                                                →
                                            </span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetails 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Project;
