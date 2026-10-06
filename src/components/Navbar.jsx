/**
 * Top navigation bar.
 * Desktop: logo, section links and the language switcher.
 * Mobile: logo on the left, language switcher and hamburger on the right.
 *
 * The underline under the active link and the progress line at the bottom are
 * moved by writing styles straight to the DOM, so scrolling never re-renders React.
 */
import { useEffect, useLayoutEffect, useRef } from 'react'
import { NAV_ITEMS } from '../consts/nav'

// Shared <svg> wrapper for the little flags in the language switcher
function FlagSvg({ compact, children, ...rest }) {
  return (
    <svg viewBox="0 0 18 12" className={`${compact ? 'h-4 w-6' : 'h-3.5 w-5'} rounded-[2px] overflow-hidden`} aria-hidden="true" {...rest}>
      {children}
    </svg>
  )
}

function SpainFlag({ compact = false }) {
  return (
    <FlagSvg compact={compact}>
      <rect width="18" height="12" fill="#AA151B" />
      <rect y="3" width="18" height="6" fill="#F1BF00" />
    </FlagSvg>
  )
}

function UkFlag({ compact = false }) {
  return (
    <FlagSvg compact={compact}>
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M9 0V12M0 6H18" stroke="#fff" strokeWidth="4" />
      <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth="2.4" />
    </FlagSvg>
  )
}

// Senyera: 9 stripes (5 yellow, 4 red), each 12 / 9 = 1.333 units tall
function CataloniaFlag({ compact = false }) {
  return (
    <FlagSvg compact={compact} preserveAspectRatio="none">
      <rect width="18" height="12" fill="#FCDD09" />
      <rect y="1.3333" width="18" height="1.3333" fill="#DA121A" />
      <rect y="4"      width="18" height="1.3333" fill="#DA121A" />
      <rect y="6.6667" width="18" height="1.3333" fill="#DA121A" />
      <rect y="9.3333" width="18" height="1.3333" fill="#DA121A" />
    </FlagSvg>
  )
}

// Each button's label is written in its own language
const LANG_OPTIONS = [
  { id: 'es', label: 'ES',  Flag: SpainFlag,     ariaLabel: 'Cambiar idioma a Español' },
  { id: 'en', label: 'EN',  Flag: UkFlag,        ariaLabel: 'Switch language to English' },
  { id: 'ca', label: 'CAT', Flag: CataloniaFlag, ariaLabel: 'Canviar idioma a Català' },
]

function LanguageSwitcher({ lang, setLang, setMenuOpen, compact = false }) {
  return (
    <div className={`flex items-center rounded-full border border-white/10 bg-white/5 ${compact ? 'gap-1 p-1' : 'gap-1.5 p-1'}`}>
      {LANG_OPTIONS.map(({ id, label, Flag, ariaLabel }) => {
        const active = lang === id
        return (
          <button
            key={id}
            onClick={() => {
              setLang(id)
              setMenuOpen(false)
            }}
            className={`flex items-center rounded-full font-bold tracking-wider transition-all ${
              compact ? 'px-2 py-1.5' : 'gap-1.5 px-2.5 py-1 text-xs'
            } ${
              active
                ? 'border border-cyan-400 text-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.65)] bg-cyan-400/10'
                : 'border border-transparent text-white/55 hover:text-white hover:bg-white/10'
            }`}
            aria-label={ariaLabel}
            aria-pressed={active}
          >
            <Flag compact={compact} />
            {!compact && <span>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}

// Thin cyan line along the bottom of the navbar that fills up as you scroll
function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const scroller = document.getElementById('app-scroll')
    const bar = barRef.current
    if (!scroller || !bar) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = scroller.scrollHeight - scroller.clientHeight
      bar.style.transform = `scaleX(${max > 0 ? scroller.scrollTop / max : 0})`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <span
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 -bottom-px h-[2px] w-full origin-left bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-300 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}

export default function Navbar({ goToSection, menuOpen, setMenuOpen, lang, setLang, t, activeSection }) {
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const linksRef = useRef(null)
  const underlineRef = useRef(null)

  // Move the underline under the active link. Labels change width with the
  // language and once the font loads, so measure again in those cases too.
  useLayoutEffect(() => {
    const links = linksRef.current
    const line = underlineRef.current
    if (!links || !line) return
    const place = () => {
      const el = links.querySelector('[aria-current="page"]')
      if (!el) { line.style.opacity = '0'; return }
      line.style.opacity = '1'
      line.style.width = `${el.offsetWidth}px`
      line.style.transform = `translateX(${el.offsetLeft}px)`
    }
    place()
    document.fonts?.ready.then(place).catch(() => {})
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [activeSection, lang])

  // Mobile menu keyboard handling: Escape closes it (and gives focus back to
  // the hamburger), and Tab loops around inside the menu.
  useEffect(() => {
    if (!menuOpen) return
    const menuEl = menuRef.current
    if (!menuEl) return

    const getFocusables = () => Array.from(menuEl.querySelectorAll('button, a, [href]'))
    getFocusables()[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const list = getFocusables()
        if (list.length === 0) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  return (
    // Almost solid black instead of backdrop-blur. The blur had to be redone on
    // every frame of the 3D scene behind it, and you could barely see it anyway.
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/[0.88] border-b border-cyan-500/20">
      {/* Desktop: logo left, links centred, languages right */}
      <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] w-full px-5 md:px-6 lg:px-8 2xl:px-10 py-4 lg:py-5 items-center gap-6">
        <button onClick={() => goToSection('inicio')} className="flex items-center gap-3 lg:gap-4 cursor-pointer min-w-0 justify-self-start">
          <img src="/AJ.png" alt="" aria-hidden="true" className="h-8 lg:h-10 xl:h-11 w-auto object-contain flex-shrink-0" />
          <span className="font-tech text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-[0.18em] lg:tracking-widest text-white truncate">ALEIX AUQUÉ</span>
        </button>

        <div ref={linksRef} className="relative flex items-center justify-center gap-5 lg:gap-6 xl:gap-8 text-white font-medium font-tech text-lg tracking-wider">
          {NAV_ITEMS.map(({ labels, id }) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                onClick={() => goToSection(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white/85 hover:text-white'}`}
              >
                {labels[lang]}
              </button>
            )
          })}
          <span
            ref={underlineRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: 0, opacity: 0 }}
          />
        </div>

        <div className="justify-self-end">
          <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={setMenuOpen} />
        </div>
      </div>

      {/* Mobile: just the logo on the left (the name is in the footer), controls on the right */}
      <div className="md:hidden w-full px-5 py-4 flex items-center justify-between gap-3">
        <button
          onClick={() => goToSection('inicio')}
          className="flex-shrink-0 p-1"
          aria-label={`Aleix Auqué — ${NAV_ITEMS[0].labels[lang]}`}
        >
          <img src="/AJ.png" alt="" aria-hidden="true" className="h-8 w-auto object-contain" />
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={setMenuOpen} compact />
          <button
            ref={hamburgerRef}
            className="flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t.navMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          role="menu"
          aria-label={t.navMenu}
          className="fade-in md:hidden border-t border-cyan-500/20 bg-black/95 flex flex-col px-6 py-4 gap-4 font-tech text-white text-lg"
        >
          {NAV_ITEMS.map(({ labels, id }) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                role="menuitem"
                onClick={() => goToSection(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-left transition-colors py-1 flex items-center gap-2 ${isActive ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
              >
                <span className={`w-1 h-5 rounded-full transition-all ${isActive ? 'bg-cyan-400' : 'bg-transparent'}`} aria-hidden="true" />
                {labels[lang]}
              </button>
            )
          })}
        </div>
      )}

      <ScrollProgress />
    </nav>
  )
}
