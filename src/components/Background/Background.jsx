import { motion } from "framer-motion";

const orbs = [
    // Top-left large
    { top: '5%', left: '-5%', size: 600, opacity: 0.09, duration: 8, delay: 0 },
    // Top-right
    { top: '10%', right: '-8%', size: 500, opacity: 0.07, duration: 10, delay: 2 },
    // Center-left
    { top: '40%', left: '-10%', size: 450, opacity: 0.06, duration: 9, delay: 1 },
    // Center-right
    { top: '45%', right: '-5%', size: 400, opacity: 0.05, duration: 12, delay: 3 },
    // Bottom-left
    { top: '75%', left: '5%', size: 500, opacity: 0.07, duration: 7, delay: 1.5 },
    // Bottom-right
    { top: '80%', right: '5%', size: 350, opacity: 0.06, duration: 11, delay: 4 },
];

const r = () => Math.random();
const bracketRandom = [
    { right: `${r() * 60}%`, top: `${5 + r() * 80}%`, duration: 4 + r() * 5, size: 120 + r() * 120, opacity: 0.05 + r() * 0.1 },
    { left: `${r() * 40}%`, top: `${5 + r() * 70}%`, duration: 4 + r() * 6, size: 100 + r() * 150, opacity: 0.04 + r() * 0.08 },
    { right: `${10 + r() * 50}%`, top: `${r() * 75}%`, duration: 5 + r() * 4, size: 80 + r() * 160, opacity: 0.03 + r() * 0.09 },
];

const Background = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {orbs.map((orb, i) => {
            const { size, opacity, duration, delay, ...pos } = orb;
            return (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: size,
                        height: size,
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

        {/* Floating decorative brackets */}
        {bracketRandom.map(({ size, opacity, duration, ...pos }, i) => (
            <motion.span
                key={i}
                className={`absolute font-mono font-black select-none pointer-events-none text-[calc(var(--desktop-size)*0.45)] md:text-[length:var(--desktop-size)] ${i > 1 ? 'hidden md:inline-block' : 'inline-block'}`}
                style={{
                    '--desktop-size': `${size}px`,
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
    </div>
);

export default Background;
