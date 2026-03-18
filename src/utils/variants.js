/**
 * Shared scroll-triggered animation variants used across all sections.
 * All use `whileInView` so they fire on mobile scroll too.
 */

export const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (delay = 0) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
});
