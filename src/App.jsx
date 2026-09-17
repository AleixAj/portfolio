/**
 * Root portfolio component.
 *
 * Responsibilities:
 * - Global language state (ES/EN/CA), taken from ?lang=, then localStorage
 * - URL kept in sync with what's on screen (?lang= + #section), so any section
 *   and any language can be linked, bookmarked and shared
 * - Section navigation with smooth scroll and active section detection
 * - Keyboard access to the scroll container (see the keydown effect below)
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
import { LIGHT_MODE } from './consts/device'

// Catalan reuses the Spanish CV. `name` is the filename the browser saves the
// file as, so the visitor gets "CV Aleix Auqué.pdf" instead of "cv-aleix-es.pdf".
const CV_BY_LANG = {
  es: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
  en: { href: '/cv-aleix-en.pdf', name: 'CV Aleix Auqué EN.pdf' },
  ca: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
}
const OG_LOCALE_BY_LANG = { es: 'es_ES', en: 'en_US', ca: 'ca_ES' }

const SITE_URL = 'https://aleixaj.com/'
const DEFAULT_LANG = 'es'

/** Canonical address of a language: Spanish owns the bare URL, the rest use ?lang=. */
const canonicalFor = (lang) => (lang === DEFAULT_LANG ? SITE_URL : `${SITE_URL}?lang=${lang}`)

/** ?lang= wins over the stored preference, so a shared link opens in its own language. */
function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (TRANSLATIONS[fromUrl]) return fromUrl
  const stored = localStorage.getItem('lang')
  return TRANSLATIONS[stored] ? stored : DEFAULT_LANG
}

/** Section named by the URL fragment, so #projects opens on Projects. */
function getInitialSectionIdx() {
  const idx = SECTIONS.indexOf(window.location.hash.slice(1))
  return idx === -1 ? 0 : idx
}

// Three.js loads only when the page is viewed (separate chunk), and not at all
// when the visitor asked for less data.
const StarBackground = lazy(() => import('./components/StarBackground'))

function App() {
  const containerRef = useRef(null)
  const isScrolling = useRef(false) // Prevents conflicts between programmatic scroll and manual detection
  const offsetsRef = useRef([])     // Vertical position of each section, re-measured on layout changes
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(getInitialSectionIdx)
  const [lang, setLang] = useState(getInitialLang)

  const t = TRANSLATIONS[lang]
  // The hero's rotating word self-rotates inside <Hero> (React Bits RotatingText);
  // App only supplies the localized word list for the active language.
  const words = ROTATING_WORDS[lang]
  const cv = CV_BY_LANG[lang] ?? CV_BY_LANG.es

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
    // Each language self-canonicalises to its own ?lang= URL, matching the
    // hreflang alternates declared in index.html.
    setMeta('meta[property="og:url"]', canonicalFor(lang))
    document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalFor(lang))
  }, [lang, t])

  // Keep the address bar in step with what's on screen: the language as ?lang=
  // (Spanish, the default, keeps the URL clean) and the visible section as a
  // fragment. replaceState so this never fills up the Back button.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    url.hash = sectionIdx === 0 ? '' : SECTIONS[sectionIdx]

    const next = `${url.pathname}${url.search}${url.hash}`
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (next !== current) window.history.replaceState(null, '', next)
  }, [lang, sectionIdx])

  // A #section in the URL has to land on that section: the browser's own fragment
  // scroll runs before React has rendered anything, so it's applied here instead.
  useEffect(() => {
    const idx = SECTIONS.indexOf(window.location.hash.slice(1))
    if (idx <= 0) return
    const el = document.getElementById(SECTIONS[idx])
    if (el && containerRef.current) containerRef.current.scrollTop = el.offsetTop
  }, [])

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

  // Section positions are not fixed: they move with the viewport, with the
  // language (translated copy has a different height) and once the webfonts land.
  // Measuring them on every relevant change keeps the active-section highlight honest.
  const measureSections = useCallback(() => {
    offsetsRef.current = SECTIONS.map(id => document.getElementById(id)?.offsetTop ?? 0)
  }, [])

  useEffect(() => {
    measureSections()

    let timer
    const remeasure = () => {
      clearTimeout(timer)
      timer = setTimeout(measureSections, 150)
    }
    window.addEventListener('resize', remeasure)
    window.addEventListener('orientationchange', remeasure)
    document.fonts?.ready.then(measureSections).catch(() => {})

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('orientationchange', remeasure)
    }
  }, [measureSections, lang])

  // Detect visible section from scroll position (throttled with rAF)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ticking = false
    const onScroll = () => {
      if (isScrolling.current || ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop
        let closest = 0
        let minDist = Infinity
        offsetsRef.current.forEach((top, i) => {
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

  // The page scrolls inside #app-scroll, not the document, so while focus is
  // still on <body> — the state right after loading — the browser has nothing to
  // scroll and Page Up/Down, Home/End, the space bar and the arrows do nothing.
  // They are forwarded to the container here; as soon as focus moves into the
  // content (via the skip link or Tab) the browser's native scrolling takes over.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onKeyDown = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return
      const active = document.activeElement
      if (active && active !== document.body && container.contains(active)) return

      const page = container.clientHeight * 0.9
      let top

      switch (e.key) {
        case 'ArrowDown':  top = 60; break
        case 'ArrowUp':    top = -60; break
        case 'PageDown':   top = page; break
        case 'PageUp':     top = -page; break
        // The space bar is also what activates a focused button or link, so it is
        // only treated as "scroll down" when nothing at all is focused.
        case ' ':
          if (active !== document.body && active !== null) return
          top = e.shiftKey ? -page : page
          break
        case 'Home':
          e.preventDefault()
          container.scrollTo({ top: 0, behavior: 'smooth' })
          return
        case 'End':
          e.preventDefault()
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
          return
        default: return
      }

      e.preventDefault()
      container.scrollBy({ top })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
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
      {/* First stop for keyboard and screen-reader users: jumps past the fixed
          navbar and puts focus inside the scroll container, which is what makes
          the arrow and page keys scroll the content. It surfaces just below the
          navbar so it never sits on top of the logo or the links. */}
      <a
        href="#app-scroll"
        onClick={(e) => { e.preventDefault(); containerRef.current?.focus() }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-[5.5rem] focus:left-1/2 focus:-translate-x-1/2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-cyan-400 focus:text-black focus:text-sm focus:font-semibold focus:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
      >
        {t.skipToContent}
      </a>

      {!LIGHT_MODE && (
        <Suspense fallback={<div className="fixed inset-0 z-0 pointer-events-none bg-black" />}>
          <StarBackground />
        </Suspense>
      )}

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

      <main
        id="app-scroll"
        ref={containerRef}
        tabIndex={-1}
        className="h-full overflow-y-auto overscroll-y-none relative z-10 focus:outline-none"
        style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
      >
        <Hero words={words} goToSection={goToSection} heroActive={sectionIdx === 0} t={t.hero} cv={cv} />
        <Trayectoria lang={lang} t={t.journey} />
        <Projects lang={lang} t={t.projects} />
        <Skills lang={lang} t={t.skills} />
        <Hobbies t={t.hobbies} />
        <Contact t={t.contact} cv={cv} />
      </main>
    </div>
  )
}

export default App
