import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

const contactInfo = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        value: "udayvaidya13@gmail.com",
        href: "mailto:udayvaidya13@gmail.com",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff8400">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        label: "LinkedIn",
        value: "linkedin.com/in/uday-vaidya",
        href: "https://www.linkedin.com/in/uday-vaidya",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff8400">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
        label: "GitHub",
        value: "github.com/UdayVaidya",
        href: "https://github.com/UdayVaidya",
    },
];

const inputClass = `w-full bg-transparent font-mono text-white/80 text-sm md:text-base px-4 py-3 rounded-xl outline-none
    border transition-all duration-300 placeholder:text-white/20
    border-[rgba(255,132,0,0.2)] focus:border-[rgba(255,132,0,0.7)] focus:shadow-[0_0_20px_rgba(255,132,0,0.15)]`;

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate send — wire up to EmailJS / Formspree later
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setForm({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <section id="contact" className="relative py-24 px-[5%] overflow-hidden">

            {/* Ambient glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(255,132,0,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
            />

            {/* Heading */}
            <motion.div
                className="mb-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.p
                    variants={fadeUp} custom={0}
                    className="text-arc-orange font-mono text-sm uppercase tracking-[0.25em] mb-2"
                >
                    // get in touch
                </motion.p>
                <motion.h2
                    variants={fadeUp} custom={0.1}
                    className="text-4xl md:text-6xl font-extrabold uppercase font-mono"
                >
                    Contact <span className="gradient-text">Me</span>
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

            <div className="flex flex-col md:flex-row gap-12 md:gap-20">

                {/* Left — contact info */}
                <motion.div
                    className="flex flex-col gap-6 md:w-2/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-white/50 text-base md:text-lg leading-relaxed"
                    >
                        Have a project in mind or want to work together? Feel free to reach out — I'm always open to new opportunities!
                    </motion.p>

                    {contactInfo.map((info) => (
                        <motion.a
                            key={info.label}
                            href={info.href}
                            target="_blank"
                            rel="noreferrer"
                            variants={fadeUp}
                            className="flex items-center gap-4 px-4 py-4 rounded-xl group"
                            style={{
                                background: 'rgba(255,132,0,0.05)',
                                border: '1px solid rgba(255,132,0,0.15)',
                            }}
                            whileHover={{
                                backgroundColor: 'rgba(255,132,0,0.1)',
                                borderColor: 'rgba(255,132,0,0.4)',
                                x: 4,
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(255,132,0,0.1)', border: '1px solid rgba(255,132,0,0.2)' }}
                            >
                                {info.icon}
                            </div>
                            <div>
                                <p className="text-xs font-mono text-white/30 uppercase tracking-wider">{info.label}</p>
                                <p className="text-sm md:text-base font-mono text-white/70 group-hover:text-white transition-colors">{info.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Right — form */}
                <motion.form
                    className="flex-1 flex flex-col gap-5"
                    onSubmit={handleSubmit}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
                >
                    {/* Name */}
                    <motion.div variants={fadeUp}>
                        <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className={inputClass}
                            style={{ background: 'rgba(255,132,0,0.03)' }}
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fadeUp}>
                        <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className={inputClass}
                            style={{ background: 'rgba(255,132,0,0.03)' }}
                        />
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp}>
                        <label className="block font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Hey Uday, I'd love to collaborate on..."
                            required
                            rows={5}
                            className={inputClass}
                            style={{ background: 'rgba(255,132,0,0.03)', resize: 'none' }}
                        />
                    </motion.div>

                    {/* Submit button */}
                    <motion.div variants={fadeUp}>
                        <motion.button
                            type="submit"
                            disabled={sending || sent}
                            className="relative inline-block overflow-hidden border-2 rounded-lg cursor-pointer w-full md:w-auto"
                            style={{ borderColor: sent ? 'rgba(255,132,0,0.4)' : '#ff8400' }}
                            whileHover={!sent && !sending ? "hover" : "rest"}
                            initial="rest"
                            whileTap={!sent ? { scale: 0.97 } : {}}
                        >
                            {/* Fill sweep */}
                            <motion.span
                                className="absolute inset-0 z-0"
                                style={{ backgroundColor: '#ff8400', transformOrigin: 'left', scaleX: 0 }}
                                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.span
                                className="relative z-10 px-8 py-3 md:text-xl text-lg font-bold font-mono uppercase tracking-wider inline-flex items-center gap-2"
                                variants={{ rest: { color: '#ffffff' }, hover: { color: '#ffffff' } }}
                            >
                                {sent ? (
                                    <>✓ Message Sent!</>
                                ) : sending ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="inline-block"
                                        >⟳</motion.span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message{" "}
                                        <motion.span
                                            variants={{ rest: { color: '#ff8400' }, hover: { color: '#ffffff' } }}
                                            transition={{ duration: 0.3 }}
                                        >→</motion.span>
                                    </>
                                )}
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>

            {/* Footer line */}
            <motion.div
                className="mt-24 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <p className="font-mono text-sm text-white/20">© 2025 Uday Vaidya. All rights reserved.</p>
                <p className="font-mono text-sm text-white/20">
                    Built By <span className="text-arc-orange">Uday Vaidya</span>
                </p>
            </motion.div>

        </section>
    );
};

export default Contact;