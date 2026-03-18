import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const dotRef    = useRef(null);

    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    // Outer ring — slow follow
    const x = useSpring(rawX, { stiffness: 80,  damping: 18, mass: 0.6 });
    const y = useSpring(rawY, { stiffness: 80,  damping: 18, mass: 0.6 });

    // Inner dot — instant
    const dotX = useSpring(rawX, { stiffness: 400, damping: 28 });
    const dotY = useSpring(rawY, { stiffness: 400, damping: 28 });

    const [variant, setVariant] = useState("default"); // default | hover | click

    useEffect(() => {
        const move = (e) => { rawX.set(e.clientX); rawY.set(e.clientY); };
        const down = () => setVariant("click");
        const up   = () => setVariant("default");

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup",   up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup",   up);
        };
    }, [rawX, rawY]);

    // Attach hover detection to all interactive elements
    useEffect(() => {
        const enter = () => setVariant("hover");
        const leave = () => setVariant("default");
        const els = document.querySelectorAll("a, button, [role='button'], input, textarea, .cursor-hover");
        els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
        return () => els.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    }, []);

    // Hide on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

    const ring = {
        default: { width: 36, height: 36, borderColor: "rgba(255,132,0,0.6)", backgroundColor: "transparent", scale: 1 },
        hover:   { width: 56, height: 56, borderColor: "rgba(255,132,0,0.9)", backgroundColor: "rgba(255,132,0,0.08)", scale: 1 },
        click:   { width: 28, height: 28, borderColor: "#ff8400", backgroundColor: "rgba(255,132,0,0.2)", scale: 0.9 },
    };

    const dot = {
        default: { width: 6,  height: 6,  backgroundColor: "#ff8400", scale: 1 },
        hover:   { width: 6,  height: 6,  backgroundColor: "#ffb347", scale: 0 },
        click:   { width: 10, height: 10, backgroundColor: "#ff8400", scale: 1.2 },
    };

    return (
        <>
            {/* Outer ring */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99999]"
                style={{ x, y, translateX: "-50%", translateY: "-50%", ...ring[variant] }}
                animate={ring[variant]}
                transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.5 }}
            />
            {/* Inner dot */}
            <motion.div
                ref={dotRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
                style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", boxShadow: "0 0 8px rgba(255,132,0,0.7)" }}
                animate={dot[variant]}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
        </>
    );
}
