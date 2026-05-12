import './index.css'
import { useRef, useEffect, useState, useCallback } from 'react'
import StarBackground from './components/StarBackground'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Trayectoria from './sections/Trayectoria'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Hobbies from './sections/Hobbies'
import Contact from './sections/Contact'
import { SECTIONS, ROTATING_WORDS } from './consts/nav'

function App() {
  const containerRef = useRef(null)
  const currentIdx = useRef(0)
  const isScrolling = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [wordIdx, setWordIdx] = useState(0)
  const [sectionIdx, setSectionIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2500)
    return () => clearInterval(t)
  }, [])

  const goToSection = useCallback((id) => {
    if (isScrolling.current) return
    const idx = SECTIONS.indexOf(id)
    if (idx === -1) return
    const el = document.getElementById(id)
    if (!el || !containerRef.current) return
    currentIdx.current = idx
    setSectionIdx(idx)
    isScrolling.current = true
    containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setTimeout(() => { isScrolling.current = false }, 900)
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let ticking = false
    const offsets = SECTIONS.map(id => document.getElementById(id)?.offsetTop ?? 0)
    const onScroll = () => {
      if (isScrolling.current || ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop
        let closest = 0
        let minDist = Infinity
        offsets.forEach((top, i) => {
          const dist = Math.abs(top - scrollTop)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        currentIdx.current = closest
        setSectionIdx(closest)
        ticking = false
      })
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const section = document.getElementById(SECTIONS[sectionIdx])
    if (!section) return
    const items = [...section.querySelectorAll('.reveal-item:not(.in-view)')]
    const timers = items.map((el, i) =>
      setTimeout(() => el.classList.add('in-view'), 380 + i * 65)
    )
    return () => timers.forEach(clearTimeout)
  }, [sectionIdx])

  return (
    <div className="bg-black">
      <StarBackground />

      {sectionIdx > 0 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx - 1])}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto ls:hidden"
          aria-label="Sección anterior"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
      {sectionIdx < SECTIONS.length - 1 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx + 1])}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto ls:hidden"
          aria-label="Siguiente sección"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      <Navbar goToSection={goToSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div ref={containerRef} className="h-[100dvh] overflow-y-auto relative z-10" style={{ touchAction: 'pan-y' }}>
        <Hero wordIdx={wordIdx} goToSection={goToSection} />
        <Trayectoria />
        <Projects />
        <Skills />
        <Hobbies />
        <Contact />
      </div>
    </div>
  )
}

export default App
