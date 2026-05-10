import './index.css'
import { useRef, useEffect } from 'react'
import Scene3D from './components/Scene3D'
import StarBackground from './components/StarBackground'

const SECTIONS = ['inicio', 'about', 'projects', 'skills', 'contact']

function App() {
  const containerRef = useRef(null)
  const currentIdx = useRef(0)
  const isScrolling = useRef(false)

  const goToSection = (id) => {
    const idx = SECTIONS.indexOf(id)
    if (idx === -1) return
    const el = document.getElementById(id)
    if (!el || !containerRef.current) return
    currentIdx.current = idx
    isScrolling.current = true
    containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setTimeout(() => { isScrolling.current = false }, 900)
  }

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (isScrolling.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      const next = Math.max(0, Math.min(SECTIONS.length - 1, currentIdx.current + dir))
      if (next !== currentIdx.current) goToSection(SECTIONS[next])
    }
    // capture:true → se ejecuta antes de cualquier listener del canvas de Three.js
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => window.removeEventListener('wheel', onWheel, { capture: true })
  }, [])

  return (
    <div className="bg-black">

      <StarBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-widest text-white">
            Aleix Auqué
          </div>
          <div className="flex gap-8 text-white font-medium">
            {[
              { label: 'Inicio',    id: 'inicio'   },
              { label: 'Sobre mí',  id: 'about'    },
              { label: 'Proyectos', id: 'projects' },
              { label: 'Skills',    id: 'skills'   },
              { label: 'Contacto',  id: 'contact'  },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="hover:text-cyan-400 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll container */}
      <div ref={containerRef} className="h-screen overflow-y-auto">

        {/* SLIDE 1 - Hero */}
        <section id="inicio" className="h-screen relative">
          <div className="absolute inset-0">
            <Scene3D />
          </div>
          <div className="relative z-10 h-full flex items-center pl-64 pointer-events-none">
            <div className="flex flex-col justify-center text-white">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
                Transformando ideas
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-cyan-400 tracking-widest mt-3">
                en experiencias
              </h2>
              <p className="mt-8 text-2xl text-gray-300">
                Software Developer
              </p>
              <p className="mt-4 text-lg text-gray-400 max-w-md">
                Transformando ideas en experiencias digitales inolvidables
              </p>
              <button
                onClick={() => goToSection('about')}
                className="mt-10 w-fit px-8 py-4 bg-white text-black font-semibold rounded-2xl text-lg hover:scale-105 transition-transform pointer-events-auto"
              >
                Explorar mis proyectos ↓
              </button>
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="about" className="h-screen bg-black flex items-center">
          <div className="max-w-5xl mx-auto px-8 text-white">
            <h2 className="text-5xl font-bold mb-12">Sobre mí</h2>
            <p className="text-xl leading-relaxed text-gray-300 max-w-3xl">
              Desarrollador de software altamente motivado y con muchas ganas de asumir nuevos desafíos.
              Fuerte ética de trabajo, adaptabilidad y buenas habilidades interpersonales.
              Apasionado por la creatividad y por crear interfaces interactivas y experiencias visuales impactantes.
            </p>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="projects" className="h-screen bg-black flex items-center">
          <div className="max-w-3xl mx-auto px-8 text-white">
            <h2 className="text-5xl font-bold mb-12">Proyectos destacados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all">
                <div className="h-44 bg-gray-800 flex items-center justify-center">
                  <img src="/FamilyTrivia.png" alt="FamilyTrivia" className="h-36 w-auto object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">FamilyTrivia</h3>
                  <p className="text-gray-400 mt-2 text-base">Juego de trivia interactivo desarrollado con HTML, CSS y JavaScript puro.</p>
                </div>
              </div>
              <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all">
                <div className="h-44 bg-gray-800 flex items-center justify-center">
                  <img src="/CashDrop.png" alt="CashDrop" className="h-36 w-auto object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">CashDrop</h3>
                  <p className="text-gray-400 mt-2 text-base">Aplicación de gestión financiera / cashflow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="h-screen bg-black flex items-center">
          <div className="max-w-6xl mx-auto px-8 text-white">
            <h2 className="text-5xl font-bold mb-12">Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
              {["React", "Tailwind", "Three.js", "JavaScript", "HTML/CSS", "Git", "API Rest", "GSAP"].map(skill => (
                <div key={skill} className="bg-gray-900 border border-gray-700 hover:border-cyan-400 p-8 rounded-3xl text-center transition-all">
                  <p className="font-semibold text-xl">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" className="h-screen bg-black flex items-center">
          <div className="max-w-3xl mx-auto text-center px-8 text-white">
            <h2 className="text-5xl font-bold mb-8">¿Hablamos?</h2>
            <p className="text-2xl text-gray-400 mb-12">Estoy abierto a nuevas oportunidades y colaboraciones.</p>
            <a
              href="mailto:aleixauque@gmail.com"
              className="inline-block px-10 py-5 bg-cyan-400 text-black font-semibold rounded-2xl text-xl hover:scale-105 transition-transform"
            >
              Enviar mensaje
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}

export default App
