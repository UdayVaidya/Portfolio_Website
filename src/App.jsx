import './App.css'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import MainPage from './pages/MainPage'
import Navbar from './components/Navbar/Navbar'
import Background from './components/Background/Background'
import CustomCursor from './components/Cursor/CustomCursor'
import Preloader from './components/Preloader/Preloader'
import Lenis from 'lenis' 
// ── Scroll-progress bar at the very top ──────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #ff8400, #ffb347, #ff8400)',
        boxShadow: '0 0 10px rgba(255,132,0,0.6)',
      }}
    />
  )
}

// ── Back-to-top floating button ───────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="btt"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ff8400, #cc6600)',
            boxShadow: '0 0 20px rgba(255,132,0,0.45), 0 4px 0 #7a3d00',
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.12, boxShadow: '0 0 30px rgba(255,132,0,0.65), 0 4px 0 #7a3d00' }}
          whileTap={{ scale: 0.92, y: 3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Touch scrolling is usually better native, but desktop wheel is massively improved
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    // Lock body scroll while preloading
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <ScrollProgressBar />
      <Background />
      <Navbar />
      
      {/* We render MainPage always so Three.js has time to initialize behind the preloader */}
      <MainPage />
      <BackToTop />
    </>
  )
}

export default App
