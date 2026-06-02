/**
 * Fixed navigation bar with ES/EN/CA support.
 * - Desktop: logo + horizontal links + language switcher
 * - Mobile: logo only (left) + language switcher and hamburger (right)
 */
import { useEffect, useRef } from 'react'
import { NAV_ITEMS } from '../consts/nav'

function SpainFlag({ compact = false }) {
  return (
    <svg viewBox="0 0 18 12" className={`${compact ? 'h-4 w-6' : 'h-3.5 w-5'} rounded-[2px] overflow-hidden`} aria-hidden="true">
      <rect width="18" height="12" fill="#AA151B" />
      <rect y="3" width="18" height="6" fill="#F1BF00" />
    </svg>
  )
}

function UkFlag({ compact = false }) {
  return (
    <svg viewBox="0 0 18 12" className={`${compact ? 'h-4 w-6' : 'h-3.5 w-5'} rounded-[2px] overflow-hidden`} aria-hidden="true">
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M9 0V12M0 6H18" stroke="#fff" strokeWidth="4" />
      <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  )
}

function CataloniaFlag({ compact = false }) {
  // Senyera: 9 horizontal stripes, 5 yellow + 4 red, starting and ending in yellow.
  // viewBox height 12 / 9 stripes = 1.333… per stripe.
  return (
    <svg viewBox="0 0 18 12" preserveAspectRatio="none" className={`${compact ? 'h-4 w-6' : 'h-3.5 w-5'} rounded-[2px] overflow-hidden`} aria-hidden="true">
      <rect width="18" height="12" fill="#FCDD09" />
      <rect y="1.3333" width="18" height="1.3333" fill="#DA121A" />
      <rect y="4"      width="18" height="1.3333" fill="#DA121A" />
      <rect y="6.6667" width="18" height="1.3333" fill="#DA121A" />
      <rect y="9.3333" width="18" height="1.3333" fill="#DA121A" />
    </svg>
  )
}

function LanguageSwitcher({ lang, setLang, setMenuOpen, compact = false }) {
  const options = [
    { id: 'es', label: 'ES',  name: 'Español', Flag: SpainFlag },
    { id: 'en', label: 'EN',  name: 'English', Flag: UkFlag },
    { id: 'ca', label: 'CAT', name: 'Català',  Flag: CataloniaFlag },
  ]

  return (
    <div className={`flex items-center rounded-full border border-white/10 bg-white/5 ${compact ? 'gap-1 p-1' : 'gap-1.5 p-1'}`}>
      {options.map(({ id, label, name, Flag }) => {
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
            aria-label={
              id === 'ca' ? `Canviar idioma a ${name}` : id === 'en' ? `Switch language to ${name}` : `Cambiar idioma a ${name}`
            }
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

export default function Navbar({ goToSection, menuOpen, setMenuOpen, lang, setLang, t, activeSection }) {
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  // Mobile menu a11y: Escape closes it, Tab cycles focus inside it, and focus
  // returns to the hamburger button on close.
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
      {/* Desktop layout — full-width: logo flush-left, language switcher flush-right */}
      <div className="hidden md:flex w-full px-5 md:px-6 lg:px-8 2xl:px-10 py-4 lg:py-5 items-center">
        <button onClick={() => goToSection('inicio')} className="flex items-center gap-3 lg:gap-4 cursor-pointer min-w-0">
          <img src="/AJ.png" alt="" aria-hidden="true" className="h-8 lg:h-10 xl:h-11 w-auto object-contain flex-shrink-0" />
          <span className="font-tech text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-[0.18em] lg:tracking-widest text-white truncate">ALEIX AUQUÉ</span>
        </button>

        <div className="ml-auto flex items-center gap-5 lg:gap-6 xl:gap-8 text-white font-medium font-tech text-lg tracking-wider">
          {NAV_ITEMS.map(({ labels, id }) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                onClick={() => goToSection(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 transition-colors ${isActive ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
              >
                {labels[lang]}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-cyan-400 transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                />
              </button>
            )
          })}
          <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={setMenuOpen} />
        </div>
      </div>

      {/* Mobile layout: logo left, controls right (no wordmark — name lives in footer & meta) */}
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
          className="md:hidden border-t border-cyan-500/20 bg-black/95 flex flex-col px-6 py-4 gap-4 font-tech text-white text-lg"
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
    </nav>
  )
}
