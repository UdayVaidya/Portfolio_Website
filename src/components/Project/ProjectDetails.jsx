import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetails = ({ project, onClose }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Lock document scroll when modal is open
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;

    // --- Animation Variants ---
    
    // Smooth circular reveal for the entire overlay page
    const pageReveal = {
        hidden: { 
            clipPath: "circle(0% at 50% 50%)", 
            backgroundColor: "rgba(10, 10, 10, 0)",
            backdropFilter: "blur(0px)",
        },
        visible: { 
            clipPath: "circle(150% at 50% 50%)", 
            backgroundColor: "rgba(10, 10, 10, 0.6)",
            backdropFilter: "blur(50px)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
        },
        exit: { 
            clipPath: "circle(0% at 50% 50%)", 
            backgroundColor: "rgba(10, 10, 10, 0)",
            backdropFilter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
        }
    };

    // Words stagger effect for the title
    const containerStagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.4 }
        }
    };

    const wordReveal = {
        hidden: { y: "150%", rotateZ: 5, opacity: 0 },
        visible: { 
            y: "0%", 
            rotateZ: 0, 
            opacity: 1, 
            transition: { type: "spring", damping: 15, stiffness: 100 } 
        }
    };

    return createPortal(
        <motion.div
            variants={pageReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden"
            style={{ WebkitBackdropFilter: "blur(50px)" }}
        >
            <div className="max-w-6xl mx-auto px-6 py-16 md:px-12 md:py-24 relative min-h-screen">
                
                {/* Close Button - Rotates and scales in */}
                <motion.button
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
                    onClick={onClose}
                    className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-xl text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all z-[99999] border border-white/10 shadow-[0_0_20px_rgba(255,132,0,0.1)] hover:shadow-[0_0_30px_rgba(255,132,0,0.4)]"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </motion.button>

                <div className="flex flex-col gap-8 md:gap-12 w-full pt-8 md:pt-0">
                    
                    {/* Thumbnail Image - Curtain Reveal & Grayscale to Color */}
                    {project.thumbnail && (
                        <div className="relative w-full h-56 sm:h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden border border-white/10 shrink-0 group shadow-2xl">
                            {/* Orange Slide Curtain */}
                            <motion.div 
                                initial={{ y: "0%" }}
                                animate={{ y: "-100%" }}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                                className="absolute inset-0 bg-[#ff8400] z-20 origin-top"
                            />
                            
                            <motion.img 
                                initial={{ scale: 1.4, filter: "grayscale(100%) blur(10px)" }}
                                animate={{ scale: 1, filter: "grayscale(0%) blur(0px)" }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                src={project.thumbnail} 
                                alt={project.title} 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s]"
                            />
                            
                            {/* Subtle overlay gradient on image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 z-10" />
                        </div>
                    )}

                    <div className="w-full max-w-4xl mt-2 md:mt-4 z-10">
                        
                        {/* Subtitle - Slides down with fade */}
                        <motion.p 
                            initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-arc-orange font-mono text-sm md:text-base uppercase tracking-[0.25em] mb-4"
                        >
                            {project.sub}
                        </motion.p>
                        
                        {/* Animated Title Text (Word by Word) */}
                        <motion.h1
                            variants={containerStagger}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase font-mono leading-tight"
                        >
                            {project.title.split(" ").map((word, i) => (
                                <span key={i} className="overflow-hidden mr-4 lg:mr-6 pb-2">
                                    <motion.span variants={wordReveal} className="inline-block origin-bottom-left">
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h1>

                        {/* Liquid Animated Divider Line */}
                        <motion.div 
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="h-[2px] w-32 my-8 md:my-10 origin-left" 
                            style={{ background: "linear-gradient(90deg, #ff8400, transparent)" }} 
                        />

                        {/* Description Text - Fade + Slide up */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                            className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light"
                        >
                            {project.detailedDescription}
                        </motion.p>

                        {/* Staggered Spring Tags */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.3 } }
                            }}
                            className="flex flex-wrap gap-3 mt-10"
                        >
                            {project.tags.map((tag) => (
                                <motion.span
                                    key={tag}
                                    variants={{
                                        hidden: { scale: 0, y: 20 },
                                        visible: { scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,132,0,0.15)" }}
                                    className="text-sm sm:text-base font-mono px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl cursor-default transition-colors"
                                    style={{
                                        background: "rgba(255,132,0,0.05)",
                                        border: "1px solid rgba(255,132,0,0.2)",
                                        color: "#ff8400",
                                        boxShadow: "0 4px 15px rgba(255,132,0,0.05)"
                                    }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Links section */}
                        <motion.div 
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 mt-14 pt-10 border-t border-white/5 pb-20 md:pb-0"
                        >
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 text-lg font-mono font-semibold text-white/60 hover:text-white transition-all group"
                                >
                                    <div className="p-4 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </div>
                                    <span className="group-hover:translate-x-1 transition-transform">View Source</span>
                                </a>
                            )}

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 text-lg font-mono font-semibold text-arc-orange hover:text-[#ff9c33] transition-all group"
                                >
                                    <div className="p-4 rounded-full bg-arc-orange/10 border border-arc-orange/20 group-hover:bg-arc-orange/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,132,0,0.4)] transition-all duration-300">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </div>
                                    <span className="group-hover:translate-x-1 transition-transform">Live Demo</span>
                                </a>
                            )}
                        </motion.div>
                        
                    </div>
                </div>
            </div>
        </motion.div>,
        document.body
    );
};

export default ProjectDetails;
