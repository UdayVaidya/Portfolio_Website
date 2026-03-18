import { motion } from "framer-motion";

const orbs = [
    { top: '5%',  left: '-5%',  size: 600, opacity: 0.09, duration: 8,  delay: 0   },
    { top: '10%', right: '-8%', size: 500, opacity: 0.07, duration: 10, delay: 2   },
    { top: '40%', left: '-10%', size: 450, opacity: 0.06, duration: 9,  delay: 1   },
    { top: '45%', right: '-5%', size: 400, opacity: 0.05, duration: 12, delay: 3   },
    { top: '75%', left: '5%',   size: 500, opacity: 0.07, duration: 7,  delay: 1.5 },
    { top: '80%', right: '5%',  size: 350, opacity: 0.06, duration: 11, delay: 4   },
];

const brackets = [
    // Large — top-right corner
    { right: '-2%', top: '2%',  duration: 7, size: 220, opacity: 0.07 },
    // Medium — bottom-left corner
    { left:  '-1%', top: '72%', duration: 9, size: 160, opacity: 0.06 },
    // Small — mid-right
    { right: '2%',  top: '44%', duration: 6, size: 100, opacity: 0.05 },
];

// Floating corner-accent dots — visible on mobile
const corners = [
    { top: '18%',  left: '3%',  delay: 0   },
    { top: '38%',  right: '3%', delay: 0.8 },
    { top: '58%',  left: '5%',  delay: 1.6 },
    { top: '78%',  right: '5%', delay: 2.4 },
];

const Background = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        {/* ── Ambient glow orbs ─────────────────────────────── */}
        {orbs.map((orb, i) => {
            const { size, opacity, duration, delay, ...pos } = orb;
            return (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: size, height: size,
                        background: `radial-gradient(circle, rgba(255,132,0,${opacity}) 0%, transparent 70%)`,
                        filter: 'blur(60px)',
                        willChange: 'transform',
                        ...pos,
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
                />
            );
        })}

        {/* ── Decorative {  } brackets ──────────────────────── */}
        {brackets.map(({ size, opacity, duration, ...pos }, i) => (
            <motion.span
                key={i}
                className="absolute font-mono font-black select-none pointer-events-none"
                style={{
                    fontSize: `clamp(${size * 0.4}px, ${size * 0.06}vw + 20px, ${size}px)`,
                    color: `rgba(255,132,0,${opacity})`,
                    willChange: 'transform',
                    ...pos,
                }}
                animate={{ y: [0, -24, 0] }}
                transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: i * 1.8 }}
            >
                {'{}'}
            </motion.span>
        ))}

        {/* ── Mobile accent dots — pulse + drift ────────────── */}
        {corners.map(({ delay, ...pos }, i) => (
            <motion.div
                key={`dot-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: '#ff8400', boxShadow: '0 0 8px 2px rgba(255,132,0,0.4)', ...pos }}
                animate={{
                    scale:   [1, 2.5, 1],
                    opacity: [0.6, 0.15, 0.6],
                    y:       [0, -12, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
            />
        ))}

        {/* ── Subtle horizontal scan lines ──────────────────── */}
        {[15, 45, 75].map((t, i) => (
            <motion.div
                key={`line-${i}`}
                className="absolute left-0 right-0 h-px"
                style={{ top: `${t}%`, background: 'linear-gradient(90deg, transparent, rgba(255,132,0,0.05), transparent)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
            />
        ))}
    </div>
);

export default Background;
