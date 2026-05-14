import { NAV_ITEMS } from '../consts/nav'

function SpainFlag() {
  return (
    <svg viewBox="0 0 18 12" className="h-3.5 w-5 rounded-[2px] overflow-hidden" aria-hidden="true">
      <rect width="18" height="12" fill="#AA151B" />
      <rect y="3" width="18" height="6" fill="#F1BF00" />
    </svg>
  )
}

function UkFlag() {
  return (
    <svg viewBox="0 0 18 12" className="h-3.5 w-5 rounded-[2px] overflow-hidden" aria-hidden="true">
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M9 0V12M0 6H18" stroke="#fff" strokeWidth="4" />
      <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  )
}

function LanguageSwitcher({ lang, setLang, setMenuOpen }) {
  const options = [
    { id: 'es', label: 'ES', Flag: SpainFlag },
    { id: 'en', label: 'EN', Flag: UkFlag },
  ]

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
      {options.map(({ id, label, Flag }) => {
        const active = lang === id
        return (
          <button
            key={id}
            onClick={() => {
              setLang(id)
              setMenuOpen(false)
            }}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wider transition-all ${
              active
                ? 'border border-cyan-400 text-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.65)] bg-cyan-400/10'
                : 'border border-transparent text-white/55 hover:text-white hover:bg-white/10'
            }`}
            aria-label={`Cambiar idioma a ${label}`}
            aria-pressed={active}
          >
            <Flag />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Navbar({ goToSection, menuOpen, setMenuOpen, lang, setLang, t }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
      <div className="w-full px-6 lg:px-0 py-4 lg:py-5 flex items-center">
        <button onClick={() => goToSection('inicio')} className="lg:pl-10 xl:pl-16 2xl:pl-24 flex items-center gap-3 lg:gap-4 cursor-pointer min-w-0">
          <img src="/AJ.png" alt="AJ Logo" className="h-8 lg:h-10 xl:h-11 w-auto object-contain flex-shrink-0" />
          <span className="font-tech text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-[0.18em] lg:tracking-widest text-white truncate">ALEIX AUQUÉ</span>
        </button>

        <div className="ml-auto hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8 pr-2 lg:pr-10 xl:pr-24 2xl:pr-60 text-white font-medium font-tech text-lg tracking-wider">
          {NAV_ITEMS.map(({ labels, id }) => (
            <button key={id} onClick={() => goToSection(id)} className="hover:text-cyan-400 transition-colors">
              {labels[lang]}
            </button>
          ))}
          <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={setMenuOpen} />
        </div>

        <div className="ml-auto md:hidden">
          <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={setMenuOpen} />
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={t.navMenu}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-black/95 flex flex-col px-6 py-4 gap-4 font-tech text-white text-lg">
          {NAV_ITEMS.map(({ labels, id }) => (
            <button key={id} onClick={() => goToSection(id)} className="text-left hover:text-cyan-400 transition-colors py-1">
              {labels[lang]}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
