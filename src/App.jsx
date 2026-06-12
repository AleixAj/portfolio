/**
 * Root portfolio component.
 *
 * Responsibilities:
 * - Global language state (ES/EN/CA) persisted in localStorage
 * - Section navigation with smooth scroll and active section detection
 * - Reveal animations when switching sections
 * - Lazy-loaded star background to reduce initial bundle size
 */
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

const CV_BY_LANG = { es: '/cv-aleix-es.pdf', en: '/cv-aleix-en.pdf', ca: '/cv-aleix-es.pdf' }
const OG_LOCALE_BY_LANG = { es: 'es_ES', en: 'en_US', ca: 'ca_ES' }

// Three.js loads only when the page is viewed (separate chunk)
const StarBackground = lazy(() => import('./components/StarBackground'))

function App() {
  const containerRef = useRef(null)
  const isScrolling = useRef(false) // Prevents conflicts between programmatic scroll and manual detection
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang')
    return TRANSLATIONS[stored] ? stored : 'es'
  })

  const t = TRANSLATIONS[lang]
  // The hero's rotating word now self-rotates inside <Hero> (React Bits RotatingText);
  // we just hand it the localized word list.
  const words = ROTATING_WORDS[lang]
  const cvHref = CV_BY_LANG[lang] ?? CV_BY_LANG.es

  // Sync language with DOM, localStorage and head meta on change
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang

    const meta = t.meta
    if (!meta) return
    document.title = meta.title

    const setMeta = (selector, value) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute('content', value)
    }
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
    setMeta('meta[property="og:locale"]', OG_LOCALE_BY_LANG[lang] ?? OG_LOCALE_BY_LANG.es)
  }, [lang, t])

  const goToSection = useCallback((id) => {
    if (isScrolling.current) return
    const idx = SECTIONS.indexOf(id)
    if (idx === -1) return
    const el = document.getElementById(id)
    if (!el || !containerRef.current) return

    setSectionIdx(idx)
    isScrolling.current = true
    containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setTimeout(() => { isScrolling.current = false }, 900)
    setMenuOpen(false)
  }, [])

  // Detect visible section from scroll position (throttled with rAF)
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
        setSectionIdx(closest)
        ticking = false
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Trigger reveal animations for the current section's elements
  useEffect(() => {
    const section = document.getElementById(SECTIONS[sectionIdx])
    if (!section) return
    const items = [...section.querySelectorAll('.reveal-item:not(.in-view)')]
    const timer = setTimeout(() => items.forEach(el => el.classList.add('in-view')), 60)
    return () => clearTimeout(timer)
  }, [sectionIdx])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Suspense fallback={<div className="fixed inset-0 z-0 pointer-events-none bg-black" />}>
        <StarBackground />
      </Suspense>

      {/* Section navigation arrows (hidden on mobile landscape via CSS) */}
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
          className="nav-section-arrow fixed bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto ls:hidden"
          aria-label={t.nextSection}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      <Navbar goToSection={goToSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} t={t} activeSection={SECTIONS[sectionIdx]} />

      <div
        id="app-scroll"
        ref={containerRef}
        className="h-full overflow-y-auto overscroll-y-none relative z-10"
        style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
      >
        <Hero words={words} goToSection={goToSection} heroActive={sectionIdx === 0} t={t.hero} cvHref={cvHref} />
        <Trayectoria lang={lang} t={t.journey} />
        <Projects lang={lang} t={t.projects} />
        <Skills lang={lang} t={t.skills} />
        <Hobbies t={t.hobbies} />
        <Contact t={t.contact} cvHref={cvHref} />
      </div>
    </div>
  )
}

export default App
