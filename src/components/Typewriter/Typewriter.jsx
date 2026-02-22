import { useEffect, useState } from "react";

/**
 * Typewriter component
 * @param {string[]} words   - Array of words to cycle through
 * @param {number}   typeSpeed   - ms per character while typing (default 100)
 * @param {number}   deleteSpeed - ms per character while deleting (default 60)
 * @param {number}   pauseTime   - ms to pause after fully typed (default 1500)
 * @param {string}   className   - extra classes for the text span
 */
const Typewriter = ({
    words = ["Software Engineer", "Full Stack Developer", "Web Developer", "Problem Solver"],
    typeSpeed = 100,
    deleteSpeed = 60,
    pauseTime = 1500,
    className = "",
}) => {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const current = words[wordIndex % words.length];

        if (isPaused) {
            const pause = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseTime);
            return () => clearTimeout(pause);
        }

        const speed = isDeleting ? deleteSpeed : typeSpeed;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                const next = current.slice(0, displayed.length + 1);
                setDisplayed(next);
                if (next === current) setIsPaused(true);
            } else {
                const next = current.slice(0, displayed.length - 1);
                setDisplayed(next);
                if (next === "") {
                    setIsDeleting(false);
                    setWordIndex(i => i + 1);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [displayed, isDeleting, isPaused, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

    return (
        <span className={className}>
            {displayed}
            <span
                className="inline-block w-[3px] ml-1 item-center"
                style={{
                    height: '0.75em',
                    backgroundColor: '#ff8400',
                    animation: 'blink 1s step-start infinite',
                }}
            />
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `}</style>
        </span>
    );
};

export default Typewriter;
