import './index.css'
import { lazy, Suspense, useRef, useEffect, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Trayectoria from './sections/Trayectoria'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Hobbies from './sections/Hobbies'
import Contact from './sections/Contact'
import { SECTIONS, ROTATING_WORDS } from './consts/nav'
import { TRANSLATIONS } from './consts/i18n'

const StarBackground = lazy(() => import('./components/StarBackground'))

function App() {
  const containerRef = useRef(null)
  const currentIdx = useRef(0)
  const isScrolling = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [wordIdx, setWordIdx] = useState(0)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')
  const t = TRANSLATIONS[lang]
  const words = ROTATING_WORDS[lang]

  useEffect(() => {
    const interval = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2500)
    return () => clearInterval(interval)
  }, [words.length])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    setWordIdx(i => i % words.length)
  }, [lang, words.length])

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
    const timer = setTimeout(() => items.forEach(el => el.classList.add('in-view')), 60)
    return () => clearTimeout(timer)
  }, [sectionIdx])

  return (
    <div className="bg-black">
      <Suspense fallback={<div className="fixed inset-0 z-0 pointer-events-none bg-black" />}>
        <StarBackground />
      </Suspense>

      {sectionIdx > 0 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx - 1])}
          className="nav-section-arrow fixed top-24 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto ls:hidden"
          aria-label={t.previousSection}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
      {sectionIdx < SECTIONS.length - 1 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx + 1])}
          className="nav-section-arrow fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto ls:hidden"
          aria-label={t.nextSection}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      <Navbar goToSection={goToSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} t={t} />

      <div ref={containerRef} className="h-[100dvh] overflow-y-auto relative z-10" style={{ touchAction: 'pan-y' }}>
        <Hero wordIdx={wordIdx} words={words} goToSection={goToSection} heroActive={sectionIdx === 0} t={t.hero} />
        <Trayectoria lang={lang} t={t.journey} />
        <Projects lang={lang} t={t.projects} />
        <Skills lang={lang} />
        <Hobbies t={t.hobbies} />
        <Contact t={t.contact} />
      </div>
    </div>
  )
}

export default App
