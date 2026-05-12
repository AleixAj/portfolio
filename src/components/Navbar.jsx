import { NAV_ITEMS } from '../consts/nav'

export default function Navbar({ goToSection, menuOpen, setMenuOpen }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
      <div className="w-full px-6 lg:px-0 py-4 lg:py-5 flex items-center">
        <button onClick={() => goToSection('inicio')} className="lg:pl-60 flex items-center gap-5 cursor-pointer">
          <img src="/AJ.png" alt="AJ Logo" className="h-8 lg:h-11 w-auto object-contain" />
          <span className="font-tech text-2xl lg:text-4xl font-bold tracking-widest text-white">ALEIX AUQUÉ</span>
        </button>

        <div className="ml-auto lg:pr-60 hidden md:flex gap-8 text-white font-medium font-tech text-lg tracking-wider">
          {NAV_ITEMS.map(({ label, id }) => (
            <button key={id} onClick={() => goToSection(id)} className="hover:text-cyan-400 transition-colors">
              {label}
            </button>
          ))}
        </div>

        <button
          className="ml-auto md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-black/95 flex flex-col px-6 py-4 gap-4 font-tech text-white text-lg">
          {NAV_ITEMS.map(({ label, id }) => (
            <button key={id} onClick={() => goToSection(id)} className="text-left hover:text-cyan-400 transition-colors py-1">
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
