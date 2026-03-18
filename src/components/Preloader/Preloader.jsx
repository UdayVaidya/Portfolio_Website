import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = ["Dev.", "Builder.", "Creator."];

export default function Preloader({ onDone }) {
    const [phase, setPhase] = useState(0);
    // phase 0 = count, phase 1 = name reveal, phase 2 = exit

    useEffect(() => {
        // After short pause show name
        const t1 = setTimeout(() => setPhase(1), 1400);
        // Start exit
        const t2 = setTimeout(() => setPhase(2), 2600);
        // Notify parent to unmount
        const t3 = setTimeout(() => onDone(), 3400);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onDone]);

    return (
        <AnimatePresence>
            {phase < 2 && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "#0d0d0d" }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Radial orange glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at 50% 60%, rgba(255,132,0,0.15) 0%, transparent 65%)",
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,132,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,132,0,0.04) 1px, transparent 1px)`,
                            backgroundSize: "48px 48px",
                        }}
                    />

                    {/* Phase 0 — rotating ring + counter */}
                    <AnimatePresence mode="wait">
                        {phase === 0 && (
                            <motion.div
                                key="ring"
                                className="relative flex items-center justify-center"
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Spinning ring */}
                                <motion.div
                                    className="w-28 h-28 rounded-full border-2"
                                    style={{ borderColor: "rgba(255,132,0,0.15)", borderTopColor: "#ff8400" }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Inner dot */}
                                <motion.div
                                    className="absolute w-3 h-3 rounded-full"
                                    style={{ background: "#ff8400", boxShadow: "0 0 16px #ff8400" }}
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{ duration: 0.9, repeat: Infinity }}
                                />
                                {/* Word cycle */}
                                <motion.span
                                    className="absolute font-mono font-black text-xl tracking-widest uppercase"
                                    style={{ color: "#ff8400" }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {PHRASES[0]}
                                </motion.span>
                            </motion.div>
                        )}

                        {/* Phase 1 — name reveal */}
                        {phase === 1 && (
                            <motion.div
                                key="name"
                                className="flex flex-col items-center gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Greeting */}
                                <motion.p
                                    className="font-mono text-sm uppercase tracking-[0.35em]"
                                    style={{ color: "rgba(255,132,0,0.6)" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Portfolio of
                                </motion.p>

                                {/* Name — letter stagger */}
                                <div className="flex overflow-hidden">
                                    {"UDAY VAIDYA".split("").map((ch, i) => (
                                        <motion.span
                                            key={i}
                                            className="font-mono font-black text-5xl sm:text-7xl leading-none"
                                            style={{
                                                color: ch === " " ? "transparent" : i < 4 ? "#ff8400" : "#ffffff",
                                                display: "inline-block",
                                                width: ch === " " ? "0.5em" : "auto",
                                            }}
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            {ch}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Underline sweep */}
                                <motion.div
                                    className="h-[2px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, transparent, #ff8400, transparent)" }}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                                />

                                {/* Sub label */}
                                <motion.p
                                    className="font-mono text-xs uppercase tracking-[0.4em]"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    Full Stack Developer
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading bar at bottom */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-[2px] rounded-full overflow-hidden"
                        style={{ background: "rgba(255,132,0,0.15)" }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #ff8400, #ffb347)" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
