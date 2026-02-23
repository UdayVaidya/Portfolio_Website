# ⚡ Uday Vaidya — Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-integrated-FF8400?style=for-the-badge)

**A modern, animated developer portfolio built with React + Vite**

[🌐 Live Demo](https://portfolio-website-udayvaidya.vercel.app) · [📬 Contact Me](mailto:udayvaidya13@gmail.com)

</div>

---

## ✨ Features

- 🎞️ **Smooth Animations** — Framer Motion powered enter animations, staggered reveals, and hover effects throughout
- 🎨 **Premium UI** — Dark theme, orange accent palette, glassmorphism cards, animated marquee ribbons
- 🧲 **Magnetic Links** — Mouse-tracking magnetic hover effect on contact cards
- 💻 **Terminal-style Contact Form** — Connected to EmailJS for real email delivery
- 📱 **Fully Responsive** — Mobile-first layout with adaptive components
- ⚡ **Blazing Fast** — Vite build tooling, optimized assets, 100dvh viewport handling
- 🔐 **Env-based Secrets** — EmailJS credentials via `.env`, never committed to git

---

## 🗂️ Sections

| Section        | Description                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Hero**       | Animated name reveal, typewriter role, stats counter, social links                                 |
| **About**      | Bio, photo, highlight cards, "Let's work together" CTA                                             |
| **Skills**     | Animated marquee ribbons + categorized tab pills (Backend / Frontend / DevOps / Tools / Languages) |
| **Projects**   | Featured project cards with tech tags, GitHub & Live Demo links                                    |
| **Experience** | Vertical orange timeline with internship bullet points                                             |
| **Contact**    | Terminal-style form with EmailJS integration + magnetic social cards                               |

---

## 🛠️ Tech Stack

| Category   | Tech                         |
| ---------- | ---------------------------- |
| Framework  | React 18 + Vite              |
| Styling    | Tailwind CSS v4              |
| Animations | Framer Motion                |
| Email      | EmailJS (`@emailjs/browser`) |
| Fonts      | JetBrains Mono, Outfit       |
| Icons      | Devicons CDN + Inline SVGs   |
| Deployment | Vercel                       |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/UdayVaidya/Portfolio_Website.git
cd Portfolio_Website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Fill in your EmailJS credentials in `.env`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from [emailjs.com](https://www.emailjs.com/) — free plan supports 200 emails/month.

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── assets/             # Static assets
├── components/
│   ├── Hero/           # Landing section
│   ├── About/          # About me section
│   ├── Skills/         # Skills ribbons + tab pills
│   ├── Project/        # Projects & Experience
│   ├── Contact/        # Contact form + EmailJS
│   ├── Navbar/         # Sticky animated navbar
│   └── Typewriter/     # Typewriter effect component
├── pages/
│   └── MainPage.jsx    # Root page layout
├── index.css           # Global styles + Tailwind theme
└── main.jsx            # App entry point
public/
├── uday.jpeg           # Profile photo
└── resume.pdf          # Downloadable resume
```

---

## 📬 EmailJS Setup

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add a **Gmail** service under _Email Services_
3. Create a template with these variables:
   ```
   From: {{name}} ({{email}})
   Message: {{message}}
   ```
4. Copy your **Service ID**, **Template ID**, and **Public Key** into `.env`

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

> Add your `.env` variables in Vercel's **Project Settings → Environment Variables**.

---

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio!

---

<div align="center">
Made with ❤️ by <a href="https://github.com/UdayVaidya">Uday Vaidya</a>
</div>
