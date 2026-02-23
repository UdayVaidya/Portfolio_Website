import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ── Floating orb background ───────────────────────────────────────────────────
const Orb = ({ size, top, left, delay }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size, height: size, top, left,
            background: 'radial-gradient(circle, rgba(255,132,0,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
);

// ── Magnetic social button ────────────────────────────────────────────────────
const MagneticLink = ({ href, label, icon }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const moveX = useTransform(x, v => v * 0.25);
    const moveY = useTransform(y, v => v * 0.25);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: moveX, y: moveY,
                background: 'rgba(255,132,0,0.04)',
                border: '1px solid rgba(255,132,0,0.12)',
            }}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl group cursor-pointer"
            whileHover={{ borderColor: 'rgba(255,132,0,0.5)', backgroundColor: 'rgba(255,132,0,0.1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-arc-orange shrink-0 text-sm"
                style={{ background: 'rgba(255,132,0,0.12)', border: '1px solid rgba(255,132,0,0.2)' }}
            >
                {icon}
            </div>
            <span className="font-mono text-sm text-white/50 group-hover:text-white/80 transition-colors break-all">
                {label}
            </span>
            <motion.span className="ml-auto text-arc-orange shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
            </motion.span>
        </motion.a>
    );
};

// ── data ──────────────────────────────────────────────────────────────────────
const socials = [
    { href: "mailto:udayvaidya13@gmail.com", label: "udayvaidya13@gmail.com", icon: "✉" },
    { href: "https://www.linkedin.com/in/uday-vaidya", label: "linkedin.com/in/uday-vaidya", icon: "in" },
    { href: "https://github.com/UdayVaidya", label: "github.com/UdayVaidya", icon: "⌥" },
];

// ── main component ────────────────────────────────────────────────────────────
const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [focused, setFocused] = useState(null);
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const [error, setError] = useState("");
    const formRef = useRef(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSending(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setSending(false);
            setSent(true);
            setForm({ name: "", email: "", message: "" });
        }).catch((err) => {
            setSending(false);
            setError("Something went wrong. Please try again.");
            console.error(err);
        });
    };

    const inputBase = (field) => ({
        className: `w-full bg-transparent text-white font-mono text-sm md:text-base px-4 py-3 outline-none transition-all duration-300 placeholder:text-white/15`,
        style: {
            borderBottom: `1px solid ${focused === field ? '#ff8400' : 'rgba(255,255,255,0.1)'}`,
            caretColor: '#ff8400',
        },
        onFocus: () => setFocused(field),
        onBlur: () => setFocused(null),
    });

    return (
        <section id="contact" className="relative py-24 overflow-hidden">

            {/* Background orbs */}
            <Orb size="500px" top="-10%" left="-5%" delay={0} />
            <Orb size="350px" top="60%" left="70%" delay={2} />
            <Orb size="250px" top="30%" left="50%" delay={4} />

            {/* Horizontal grid lines */}
            {[20, 50, 80].map(t => (
                <div key={t} className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{ top: `${t}%`, background: 'linear-gradient(90deg, transparent, rgba(255,132,0,0.06), transparent)' }} />
            ))}

            <div className="px-[5%]">
                {/* ── Section label ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="text-arc-orange font-mono text-sm uppercase tracking-[0.25em] mb-3">// get in touch</p>

                    {/* Glitch-style large heading */}
                    <div className="relative inline-block">
                        <motion.h2
                            className="text-6xl md:text-8xl font-extrabold font-mono uppercase leading-none"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Let's{" "}
                            <span className="relative inline-block">
                                <span className="gradient-text">Talk.</span>
                                {/* Underline sweep */}
                                <motion.span
                                    className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                                    style={{ background: 'linear-gradient(90deg, #ff8400, #ffb347)' }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    style2={{ width: '100%' }}
                                />
                            </span>
                        </motion.h2>
                    </div>

                    <motion.p
                        className="mt-5 text-white/40 font-mono text-base md:text-lg max-w-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Have a project in mind? Let's build something great together. Drop me a message and I'll get back to you within 24 hours.
                    </motion.p>
                </motion.div>

                {/* ── Two column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Left — contact links (2/5) */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                    >
                        {/* Status badge */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <motion.span
                                className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="font-mono text-sm text-white/40 uppercase tracking-widest">Available for work</span>
                        </motion.div>

                        {socials.map((s) => (
                            <motion.div
                                key={s.label}
                                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
                            >
                                <MagneticLink href={s.href} label={s.label} icon={s.icon} />
                            </motion.div>
                        ))}

                        {/* Location chip */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
                            className="flex items-center gap-3 mt-2 px-5 py-3 rounded-2xl"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <span className="text-xl">📍</span>
                            <div>
                                <p className="font-mono text-xs text-white/25 uppercase tracking-widest">Location</p>
                                <p className="font-mono text-sm text-white/50">Jalandhar, Punjab, India</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — form (3/5) */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Terminal-style form card */}
                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,132,0,0.15)', backdropFilter: 'blur(20px)' }}
                        >
                            {/* Card top bar */}
                            <div
                                className="flex items-center gap-2 px-5 py-3 border-b"
                                style={{ borderColor: 'rgba(255,132,0,0.1)', background: 'rgba(255,132,0,0.04)' }}
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                                <span className="ml-4 font-mono text-xs text-white/25 tracking-widest">message.send()</span>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-0 p-6 md:p-8">

                                {/* Name */}
                                <div className="relative mb-6">
                                    <label className="font-mono text-[10px] text-arc-orange uppercase tracking-[0.2em] mb-1 block">
                                        <span className="text-white/20">const</span> name <span className="text-white/20">=</span>
                                    </label>
                                    <input
                                        type="text" name="name" required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder='"Your full name"'
                                        {...inputBase("name")}
                                    />
                                    {focused === "name" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[2px] bg-arc-orange"
                                            initial={{ scaleX: 0, originX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </div>

                                {/* Email */}
                                <div className="relative mb-6">
                                    <label className="font-mono text-[10px] text-arc-orange uppercase tracking-[0.2em] mb-1 block">
                                        <span className="text-white/20">const</span> email <span className="text-white/20">=</span>
                                    </label>
                                    <input
                                        type="email" name="email" required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder='"your@email.com"'
                                        {...inputBase("email")}
                                    />
                                    {focused === "email" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[2px] bg-arc-orange"
                                            initial={{ scaleX: 0, originX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </div>

                                {/* Message */}
                                <div className="relative mb-8">
                                    <label className="font-mono text-[10px] text-arc-orange uppercase tracking-[0.2em] mb-1 block">
                                        <span className="text-white/20">const</span> message <span className="text-white/20">=</span>
                                    </label>
                                    <textarea
                                        name="message" required rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder='"Hey Uday, I would love to..."'
                                        {...inputBase("message")}
                                        style={{ ...inputBase("message").style, resize: 'none' }}
                                    />
                                    {focused === "message" && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[2px] bg-arc-orange"
                                            initial={{ scaleX: 0, originX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={sending || sent}
                                    className="relative self-start overflow-hidden rounded-xl px-8 py-3 font-mono font-bold uppercase tracking-wider text-sm md:text-base cursor-pointer"
                                    style={{ background: sent ? 'rgba(34,197,94,0.15)' : '#ff8400', color: sent ? '#4ade80' : '#000', border: sent ? '1px solid rgba(34,197,94,0.4)' : 'none' }}
                                    whileHover={!sent ? { scale: 1.04 } : {}}
                                    whileTap={!sent ? { scale: 0.97 } : {}}
                                >
                                    {/* Shimmer effect on hover */}
                                    {!sent && (
                                        <motion.span
                                            className="absolute inset-0 pointer-events-none"
                                            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)', backgroundSize: '200% 100%', backgroundPosition: '-100% 0' }}
                                            whileHover={{ backgroundPosition: '200% 0' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {sent ? (
                                            <><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>✓</motion.span> Message Sent!</>
                                        ) : sending ? (
                                            <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} className="inline-block">◌</motion.span> Sending...</>
                                        ) : (
                                            <>Send Message <span>→</span></>
                                        )}
                                    </span>
                                </motion.button>

                                {/* Error message */}
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 text-red-400 font-mono text-xs"
                                    >
                                        ⚠ {error}
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.div
                className="mt-24 px-[5%] pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="font-mono text-sm text-white/20">© 2025 Uday Vaidya. All rights reserved.</p>
                <p className="font-mono text-sm text-white/20">Built By <span className="text-arc-orange">Uday Vaidya</span></p>
            </motion.div>
        </section>
    );
};

export default Contact;