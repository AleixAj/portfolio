/**
 * Root of the portfolio.
 *
 * It owns the things every section shares: the language, which section is on
 * screen, and the scroll container the whole page lives in. It also keeps the
 * URL in sync (?lang= and #section) so any language/section can be shared.
 */
import './index.css'
import { useRef, useEffect, useState, useCallback } from 'react'
import { LazyMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import SectionRail from './components/SectionRail'
import StarBackground from './components/StarBackground'
import Hero from './sections/Hero'
import Trayectoria from './sections/Trayectoria'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Hobbies from './sections/Hobbies'
import Contact from './sections/Contact'
import { SECTIONS, ROTATING_WORDS } from './consts/nav'
import { TRANSLATIONS } from './consts/i18n'

// Framer Motion's features load in their own chunk after the first paint.
// Nothing at the top of the page needs them (the hero intro is plain CSS).
const loadMotionFeatures = () => import('./motionFeatures').then(m => m.default)

// There's no Catalan CV, so Catalan gets the Spanish one.
// `name` is what the file is called when someone downloads it.
const CV_BY_LANG = {
  es: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
  en: { href: '/cv-aleix-en.pdf', name: 'CV Aleix Auqué EN.pdf' },
  ca: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
}
const OG_LOCALE_BY_LANG = { es: 'es_ES', en: 'en_US', ca: 'ca_ES' }

const SITE_URL = 'https://aleixaj.com/'
const DEFAULT_LANG = 'es'

// Spanish lives on the bare URL, the other languages on ?lang=xx
const canonicalFor = (lang) => (lang === DEFAULT_LANG ? SITE_URL : `${SITE_URL}?lang=${lang}`)

// A ?lang= in the link beats whatever the visitor picked last time,
// so a shared link always opens in the language it was shared in.
function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (TRANSLATIONS[fromUrl]) return fromUrl
  const stored = localStorage.getItem('lang')
  return TRANSLATIONS[stored] ? stored : DEFAULT_LANG
}

function getInitialSectionIdx() {
  const idx = SECTIONS.indexOf(window.location.hash.slice(1))
  return idx === -1 ? 0 : idx
}

function App() {
  const containerRef = useRef(null)
  const isScrolling = useRef(false) // true while goToSection is smooth-scrolling
  const offsetsRef = useRef([])     // top of each section, in px
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(getInitialSectionIdx)
  const [lang, setLang] = useState(getInitialLang)

  const t = TRANSLATIONS[lang]
  const words = ROTATING_WORDS[lang]
  const cv = CV_BY_LANG[lang] ?? CV_BY_LANG.es

  // When the language changes, update <html lang>, the title and the meta tags
  // so link previews and search engines see the right language too.
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang

    const meta = t.meta
    if (!meta) return
    document.title = meta.title

    const tags = {
      'meta[name="description"]': meta.description,
      'meta[property="og:title"]': meta.title,
      'meta[property="og:description"]': meta.description,
      'meta[name="twitter:title"]': meta.title,
      'meta[name="twitter:description"]': meta.description,
      'meta[property="og:locale"]': OG_LOCALE_BY_LANG[lang] ?? OG_LOCALE_BY_LANG.es,
      'meta[property="og:url"]': canonicalFor(lang),
    }
    for (const [selector, value] of Object.entries(tags)) {
      document.head.querySelector(selector)?.setAttribute('content', value)
    }
    // Each language points to its own URL (matches the hreflang links in index.html)
    document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalFor(lang))
  }, [lang, t])

  // Keep the address bar matching the screen. replaceState instead of
  // pushState so scrolling around doesn't fill up the Back button.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    url.hash = sectionIdx === 0 ? '' : SECTIONS[sectionIdx]

    const next = `${url.pathname}${url.search}${url.hash}`
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (next !== current) window.history.replaceState(null, '', next)
  }, [lang, sectionIdx])

  // The browser tries to jump to #section before React has rendered anything,
  // so I do the jump myself once the page is there.
  useEffect(() => {
    const idx = getInitialSectionIdx()
    if (idx === 0) return
    const el = document.getElementById(SECTIONS[idx])
    if (el && containerRef.current) containerRef.current.scrollTop = el.offsetTop
  }, [])

  const goToSection = useCallback((id) => {
    if (isScrolling.current) return
    const idx = SECTIONS.indexOf(id)
    const el = document.getElementById(id)
    if (idx === -1 || !el || !containerRef.current) return

    setSectionIdx(idx)
    setMenuOpen(false)
    // Ignore scroll events until the smooth scroll is done, otherwise the
    // active link flickers through every section on the way.
    isScrolling.current = true
    containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setTimeout(() => { isScrolling.current = false }, 900)
  }, [])

  // Section positions change with the window size, the language (different
  // text lengths) and when the web fonts finish loading, so re-measure then.
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

  // Work out which section is on screen: the one whose top is closest to the
  // current scroll position. Checked at most once per frame.
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
        offsetsRef.current.forEach((top, i) => {
          if (Math.abs(top - scrollTop) < Math.abs(offsetsRef.current[closest] - scrollTop)) closest = i
        })
        setSectionIdx(closest)
        ticking = false
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // The page scrolls inside <main>, not the document. Right after loading the
  // focus is on <body>, so the arrow keys, Page Up/Down, Home/End and space
  // would do nothing. I forward them to <main> until focus moves inside it,
  // then the browser handles them normally.
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
        // Space also presses buttons, so only scroll when nothing is focused
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

  // Scroll-in animations: anything with .reveal-item or .reveal-line gets
  // .in-view the first time it shows up, and the CSS does the rest.
  // Runs again on language change in case new elements were mounted.
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const pending = root.querySelectorAll('.reveal-item:not(.in-view), .reveal-line:not(.in-view)')
    if (!('IntersectionObserver' in window)) {
      pending.forEach(el => el.classList.add('in-view'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('in-view')
        io.unobserve(entry.target)
      })
    }, { root, rootMargin: '0px 0px -6% 0px', threshold: 0.1 })
    pending.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [lang])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="fixed inset-0 overflow-hidden">
        {/* Skip link for keyboard users. Moving focus into <main> is also what
            makes the arrow keys scroll the page. Shows up just under the navbar. */}
        <a
          href="#app-scroll"
          onClick={(e) => { e.preventDefault(); containerRef.current?.focus() }}
          className="sr-only focus:not-sr-only focus:fixed focus:top-[5.5rem] focus:left-1/2 focus:-translate-x-1/2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-cyan-400 focus:text-black focus:text-sm focus:font-semibold focus:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        >
          {t.skipToContent}
        </a>

        <StarBackground />

        <SectionRail goToSection={goToSection} activeSection={SECTIONS[sectionIdx]} lang={lang} label={t.sectionIndex} />

        <Navbar goToSection={goToSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} t={t} activeSection={SECTIONS[sectionIdx]} />

        <main
          id="app-scroll"
          ref={containerRef}
          tabIndex={-1}
          className="h-full overflow-y-auto overscroll-y-none relative z-10 focus:outline-none"
          style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
        >
          <Hero words={words} goToSection={goToSection} heroActive={sectionIdx === 0} t={t.hero} cv={cv} scrollLabel={t.nextSection} />
          <Trayectoria lang={lang} t={t.journey} />
          <Projects lang={lang} t={t.projects} />
          <Skills lang={lang} t={t.skills} />
          <Hobbies t={t.hobbies} />
          <Contact t={t.contact} cv={cv} />
        </main>
      </div>
    </LazyMotion>
  )
}

export default App
