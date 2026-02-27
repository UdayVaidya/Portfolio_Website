import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

const row1 = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", invert: true },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML5" },
];

const row2 = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", label: "Docker" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", label: "CI/CD", invert: true },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", label: "AWS", invert: true },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", label: "Linux" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", label: "npm" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS3" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", label: "Redis" },
];



const pillsList = {
    Backend: [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", label: "Redis" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", label: "Socket.IO", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg", label: "Mongoose", invert: true },
    ],
    Frontend: [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML5" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS3" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", label: "Framer Motion" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", label: "Redux" },
    ],
    DevOps: [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", label: "Docker" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", label: "GitHub", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", label: "AWS", invert: true },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", label: "Linux" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", label: "npm" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", label: "Vercel" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", label: "Netlify" },
    ],
    Tools: [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", label: "VSCode" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", label: "Postman" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", label: "Figma" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", label: "Canva" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", label: "Notion" },
    ],
    Languages: [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", label: "Java" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", label: "C++" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", label: "SQL" },
    ]
};




const RibbonItem = ({ icon, label, invert = false }) => (
    <div className="flex items-center gap-2 md:gap-3 mx-3 md:mx-6 md:py-3  shrink-0">
        <img
            src={icon}
            alt={label}
            className="w-5 h-5 md:w-7 md:h-7 object-contain"
            style={invert ? { filter: 'invert(1)' } : {}}
        />
        <span className="font-mono font-bold text-sm md:text-xl uppercase tracking-wider text-[#1a1a1a]/70">
            {label}
        </span>
        <span className="text-[black]/30 text-base md:text-xl pl-4 font-bold">·</span>
    </div>
);

const Skills = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(pillsList)[0]);
    // Duplicate for seamless loop  
    const r1 = useMemo(() => [...row1, ...row1], []);
    const r2 = useMemo(() => [...row2, ...row2], []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section id="skills" className="relative pt-35 pb-14 overflow-hidden">

            {/* Ribbons container */}
            <motion.div
                className="relative flex flex-col gap-0 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.85 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Ribbon 1 — tilted left, scrolls left */}
                <div
                    className="w-full py-3 md:py-4  overflow-hidden"
                    style={{
                        background: '#ff8400',
                        transform: isMobile ? 'rotate(-13deg) scaleX(1.1)' : 'rotate(-9deg) scaleX(1.15)',
                        marginBottom: '-18px',
                        boxShadow: '0 8px 40px rgba(255,132,0,0.35)',
                    }}
                >
                    <div className="flex animate-marquee">
                        {r1.map((item, i) => (
                            <RibbonItem key={i} {...item} />
                        ))}
                    </div>
                </div>

                {/* Spacer height for the cross effect */}
                <div style={{ height: '32px' }} />

                {/* Ribbon 2 — tilted right, scrolls right */}
                <div
                    className="w-full py-3 md:py-4 overflow-hidden"
                    style={{
                        background: '#ff8400',
                        transform: isMobile ? 'rotate(13deg) scaleX(1.1)' : 'rotate(9deg) scaleX(1.15)',
                        marginTop: '-18px',
                        boxShadow: '0 -8px 40px rgba(255,132,0,0.35)',
                    }}
                >
                    <div className="flex animate-marquee-reverse">
                        {r2.map((item, i) => (
                            <RibbonItem key={i} {...item} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Section heading */}
            <div className="px-[5%] py-10 md:py-20">
                <motion.div
                    className="mb-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p
                        variants={fadeUp}
                        custom={0}
                        className="text-arc-orange font-mono text-sm uppercase tracking-[0.25em] mb-1"
                    >
                        // what i do
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        custom={0.1}
                        className="text-4xl md:text-6xl font-bold lg:font-extrabold uppercase font-mono"
                    >
                        Tech Stack & <span className="gradient-text">Expertise</span>
                    </motion.h2>
                    <motion.div
                        className="mt-3 h-[2px] w-16"
                        style={{ background: 'linear-gradient(90deg, #ff8400, transparent)' }}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>
            </div>

            {/* Sub Heading */}
            <div className="px-[5%] ">
                <motion.div
                    className="mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p
                        variants={fadeUp}
                        custom={0}
                        className="font-mono  uppercase tracking-[0.25em] mb-2"
                    >
                        <span className="text-arc-orange text-lg">Technologies</span> I use to build scalable full-stack applications.
                    </motion.p>

                </motion.div>
            </div>

            {/* Skills pills tab */}
            <div className="px-[5%] py-3">
                {/* Category tab buttons */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {Object.keys(pillsList).map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className="relative px-5 py-2 rounded-full font-mono font-bold text-sm uppercase tracking-wider transition-colors duration-200"
                            style={{
                                background: activeTab === cat ? '#ff8400' : 'rgba(255,132,0,0.08)',
                                color: activeTab === cat ? '#fff' : 'rgba(255,132,0,0.7)',
                                border: '1px solid rgba(255,132,0,0.25)',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Pills grid with AnimatePresence for tab switch */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {pillsList[activeTab].map((skill, i) => (
                            <motion.div
                                key={skill.label}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default"
                                style={{
                                    background: 'rgba(255,132,0,0.06)',
                                    border: '1px solid rgba(255,132,0,0.15)',
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.05, delay: i * 0.005 }}
                                whileHover={{
                                    backgroundColor: 'rgba(255,132,0,0.15)',
                                    borderColor: 'rgba(255,132,0,0.5)',
                                    scale: 1.04,
                                }}
                            >
                                <img
                                    src={skill.icon}
                                    alt={skill.label}
                                    className="w-6 h-6 object-contain"
                                    style={skill.invert ? { filter: 'invert(1) brightness(2)' } : {}}
                                />
                                <span className="font-mono font-semibold text-sm md:text-base text-white/80 uppercase tracking-wide">
                                    {skill.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="px-[5%] mt-6">
                <motion.div
                    className=""
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p
                        variants={fadeUp}
                        custom={0}
                        className="font-mono  uppercase tracking-[0.25em] mb-1"
                    >
                        <span className="text-arc-orange text-lg">Applied</span> in real-world deployed applications.
                    </motion.p>

                </motion.div>
            </div>


        </section>
    );
};

export default Skills;