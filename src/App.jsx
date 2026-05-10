import './index.css'
import { useRef, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import Scene3D from './components/Scene3D'
import StarBackground from './components/StarBackground'
import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiGreensock, SiPhp, SiLaravel, SiMysql, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { FaJava, FaBriefcase, FaGraduationCap } from 'react-icons/fa'

const EMAILJS_SERVICE_ID  = 'service_2jzdrj4'
const EMAILJS_TEMPLATE_ID = 'template_qebo2rv'
const EMAILJS_PUBLIC_KEY  = 'XGyv7kwacCRxidvYz'

const NAV_ITEMS = [
  { label: 'Inicio',    id: 'inicio'   },
  { label: 'Trayectoria', id: 'about'  },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Skills',    id: 'skills'   },
  { label: 'Hobbies',   id: 'hobbies'  },
  { label: 'Contacto',  id: 'contact'  },
]

const SKILLS = [
  { label: 'HTML',       Icon: SiHtml5,       color: '#E34F26' },
  { label: 'CSS',        Icon: SiCss,         color: '#1572B6' },
  { label: 'Bootstrap',  Icon: SiBootstrap,   color: '#7952B3' },
  { label: 'Tailwind',   Icon: SiTailwindcss, color: '#06B6D4' },
  { label: 'JavaScript', Icon: SiJavascript,  color: '#F7DF1E' },
  { label: 'TypeScript', Icon: SiTypescript,  color: '#3178C6' },
  { label: 'React',      Icon: SiReact,       color: '#61DAFB' },
  { label: 'Three.js',   Icon: SiThreedotjs,  color: '#ffffff' },
  { label: 'GSAP',       Icon: SiGreensock,   color: '#88CE02' },
  { label: 'PHP',        Icon: SiPhp,         color: '#777BB4' },
  { label: 'Laravel',    Icon: SiLaravel,     color: '#FF2D20' },
  { label: 'API Rest',   Icon: TbApi,         color: '#22D3EE' },
  { label: 'SQL',        Icon: SiMysql,       color: '#4479A1' },
  { label: 'Java',       Icon: FaJava,        color: '#ED8B00' },
  { label: 'Git',        Icon: SiGit,         color: '#F05032' },
  { label: 'Jenkins',    Icon: SiJenkins,     color: '#D24939' },
  { label: 'Bitbucket',  Icon: SiBitbucket,   color: '#0052CC' },
  { label: 'Jira',       Icon: SiJira,        color: '#0052CC' },
  { label: 'Salesforce', Icon: SiSalesforce,  color: '#00A1E0' },
  { label: 'Docker',     Icon: SiDocker,      color: '#2496ED' },
]

function ContactSection() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto w-full px-6 md:px-8 text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">¿Hablamos?</h2>
      <p className="text-base md:text-lg text-gray-400 mb-8 text-center">Estoy abierto a nuevas oportunidades y colaboraciones.</p>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="from_name" type="text" required placeholder="Tu nombre"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="reply_to" type="email" required placeholder="Tu email"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="subject" type="text" required placeholder="Asunto"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <textarea
          name="message" required rows={4} placeholder="Tu mensaje"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
        />
        <button
          type="submit" disabled={status === 'sending'}
          className="mt-2 px-12 py-4 bg-white text-black font-semibold rounded-2xl text-xl hover:scale-105 transition-transform glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status === 'success' && <p className="text-center text-cyan-400 font-medium">¡Mensaje enviado! Te responderé pronto.</p>}
        {status === 'error'   && <p className="text-center text-red-400 font-medium">Error al enviar. Inténtalo de nuevo.</p>}
      </form>
    </div>
  )
}

const EXPERIENCE = [
  {
    company: 'Grup Romeu',
    role: 'Desarrollador de Software',
    period: 'Ago 2025 – Ene 2026',
    desc: 'Contrato temporal fullstack por sustitución. Desarrollo de aplicación para gestión de material quirúrgico en PHP y JavaScript.',
  },
  {
    company: 'Nemon',
    role: 'Desarrollador de Software',
    period: 'May 2023 – Abr 2025',
    desc: 'Desarrollo de soluciones a medida para distribuidoras de electricidad y gas. Frontend y backend con framework propio en PHP.',
  },
  {
    company: 'VIEWNEXT',
    role: 'Release Manager & Desarrollador de Software',
    period: 'Nov 2019 – Abr 2023',
    desc: 'Nestlé (Dev Jr + RM en Salesforce), CaixaBank (RM en 6+ proyectos con COPADO) y Naturgy (RM en 4+ proyectos internacionales con Bitbucket y Jenkins).',
  },
  {
    company: 'Comun. Regants Pantà de Riudecanyes',
    role: 'Desarrollador de Software',
    period: 'Feb 2018 – Jun 2018',
    desc: 'Prácticas de 400h. Mantenimiento y desarrollo de software de gestión de usuarios y base de datos.',
  },
]

const EDUCATION = [
  {
    center: 'Lemoncoders',
    title: 'Bootcamp Frontend Developer',
    period: 'May 2025',
    desc: 'JavaScript, TypeScript, HTML, CSS y React.',
  },
  {
    center: 'Fundació esplai',
    title: 'Bootcamp PHP',
    period: 'Jul – Sep 2019',
    desc: '275h presenciales. PHP y Laravel.',
  },
  {
    center: 'Fundació esplai',
    title: 'Bootcamp Java',
    period: 'Abr – Jun 2019',
    desc: '275h presenciales. Java y SQL.',
  },
  {
    center: 'INS Baix Camp',
    title: 'CFGS Desarrollo de Aplicaciones Web (DAW)',
    period: '2015 – 2018',
    desc: '',
  },
  {
    center: 'INS Domènech i Montaner',
    title: 'ESO y Bachillerato Tecnológico',
    period: '2008 – 2014',
    desc: '',
  },
]

function TimelineItem({ title, subtitle, period, desc, right }) {
  return (
    <div className={`relative pb-10 last:pb-0 pl-7 ${right ? 'md:pl-0 md:pr-7 md:text-right' : ''}`}>
      <div className={`absolute top-[5px] w-3.5 h-3.5 rounded-full border-2 border-cyan-400 bg-black z-10 left-0 ${right ? 'md:left-auto md:right-0' : ''}`} />
      <span className="text-xs font-medium text-cyan-400 tracking-wider">{period}</span>
      <h4 className="text-white font-semibold mt-0.5 text-base">{title}</h4>
      <p className="text-gray-400 mt-0.5 text-sm">{subtitle}</p>
      {desc && <p className="text-gray-500 mt-1 leading-relaxed text-sm">{desc}</p>}
    </div>
  )
}

const HOBBIES_PHOTOS = [
  { src: '/hobbies/01.jpg',  caption: '' },
  { src: '/hobbies/02.jpg',  caption: '' },
  { src: '/hobbies/03.jpg',  caption: '' },
  { src: '/hobbies/04.jpg',  caption: '' },
  { src: '/hobbies/05.jpg',  caption: '' },
  { src: '/hobbies/06.jpg',  caption: '' },
  { src: '/hobbies/07.jpg',  caption: '' },
  { src: '/hobbies/08.jpg',  caption: '' },
  { src: '/hobbies/09.jpg',  caption: '' },
  { src: '/hobbies/10.jpg',  caption: '' },
  { src: '/hobbies/11.jpg',  caption: '' },
  { src: '/hobbies/12.jpg',  caption: '' },
  { src: '/hobbies/13.png',  caption: '' },
  { src: '/hobbies/14.png',  caption: '' },
  { src: '/hobbies/15.png',  caption: '' },
  { src: '/hobbies/16.png',  caption: '' },
]

function HobbiesSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const total = HOBBIES_PHOTOS.length

  const open = (i) => { setCurrent(i); setModalOpen(true) }
  const close = () => setModalOpen(false)
  const prev = () => setCurrent(i => (i - 1 + total) % total)
  const next = () => setCurrent(i => (i + 1) % total)

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-white w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12">Hobbies</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
          {HOBBIES_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className="aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-105 transition-all duration-200 bg-white/5"
            >
              <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 pt-14 pb-4 md:p-8" onClick={close}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-5xl select-none" onClick={e => e.stopPropagation()}>
            {/* Cerrar */}
            <button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors">✕</button>

            {/* Imagen */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black h-[50vh] md:h-[65vh] lg:h-[78vh] relative">
              {HOBBIES_PHOTOS.map((photo, i) => (
                <img key={`bg-${i}`} src={photo.src} alt="" aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300"
                  style={{ opacity: i === current ? 1 : 0, filter: 'blur(18px) brightness(0.35)' }}
                />
              ))}
              {HOBBIES_PHOTOS.map((photo, i) => (
                <img key={`fg-${i}`} src={photo.src} alt={photo.caption}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                  style={{ opacity: i === current ? 1 : 0 }}
                />
              ))}
              {HOBBIES_PHOTOS[current].caption && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl" />
                  <p className="absolute bottom-4 left-6 text-white/80 text-sm md:text-base font-medium">{HOBBIES_PHOTOS[current].caption}</p>
                </>
              )}
              <span className="absolute top-4 right-4 text-white/50 text-sm bg-black/40 px-2 py-1 rounded-full">{current + 1} / {total}</span>
            </div>

            {/* Flechas */}
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all">‹</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all">›</button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {HOBBIES_PHOTOS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-cyan-400 w-5' : 'bg-white/30 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const SECTIONS = ['inicio', 'about', 'projects', 'skills', 'hobbies', 'contact']

function App() {
  const containerRef = useRef(null)
  const currentIdx = useRef(0)
  const isScrolling = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSection = (id) => {
    const idx = SECTIONS.indexOf(id)
    if (idx === -1) return
    const el = document.getElementById(id)
    if (!el || !containerRef.current) return
    currentIdx.current = idx
    isScrolling.current = true
    containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    setTimeout(() => { isScrolling.current = false }, 900)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (isScrolling.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      const next = Math.max(0, Math.min(SECTIONS.length - 1, currentIdx.current + dir))
      if (next !== currentIdx.current) goToSection(SECTIONS[next])
    }
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => window.removeEventListener('wheel', onWheel, { capture: true })
  }, [])

  return (
    <div className="bg-black">

      <StarBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="w-full px-6 lg:px-0 py-4 lg:py-5 flex items-center">
          <div className="lg:pl-60 font-tech text-2xl lg:text-4xl font-bold tracking-widest text-white">
            ALEIX AUQUÉ
          </div>

          {/* Desktop links */}
          <div className="ml-auto lg:pr-60 hidden md:flex gap-8 text-white font-medium font-tech text-lg tracking-wider">
            {NAV_ITEMS.map(({ label, id }) => (
              <button key={id} onClick={() => goToSection(id)} className="hover:text-cyan-400 transition-colors">
                {label}
              </button>
            ))}
          </div>

          {/* Hamburger button */}
          <button className="ml-auto md:hidden flex flex-col justify-center gap-1.5 p-2" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
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

      {/* Scroll container */}
      <div ref={containerRef} className="h-screen overflow-y-auto relative z-10">

        {/* HERO */}
        <section id="inicio" className="h-screen relative">
          <div className="absolute inset-0">
            <Scene3D />
          </div>
          <div className="relative z-10 h-full flex items-center px-6 lg:pl-64 pointer-events-none">
            <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                Transformando ideas
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cyan-400 tracking-tight mt-3">
                en experiencias digitales inolvidables
              </h2>
              <p className="mt-6 text-xl md:text-2xl text-gray-300">Software Developer</p>
              <p className="mt-4 text-sm md:text-lg text-gray-400 max-w-md">
                ¡Hola! Soy Aleix, un apasionado desarrollador de software especializado en crear experiencias digitales interactivas y visualmente impactantes. Con un enfoque en la creatividad y la innovación, me esfuerzo por transformar ideas en proyectos tangibles que cautivan a los usuarios.
              </p>
              <button
                onClick={() => goToSection('about')}
                className="mt-8 w-fit px-8 py-4 bg-white text-black font-semibold rounded-2xl text-lg hover:scale-105 transition-transform pointer-events-auto glow-pulse"
              >
                Explorar mis proyectos
              </button>
            </div>
          </div>
        </section>

        {/* MI TRAYECTORIA */}
        <section id="about" className="min-h-screen bg-black/45 flex items-center py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-8 text-white w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 md:mb-14">Mi trayectoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {/* Experiencia */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <FaBriefcase className="text-cyan-400 w-5 h-5" />
                  <h3 className="text-2xl font-bold text-cyan-400">Experiencia</h3>
                </div>
                <div className="relative">
                  <div className="absolute left-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
                  {EXPERIENCE.map((item, i) => (
                    <TimelineItem
                      key={i}
                      title={item.company}
                      subtitle={item.role}
                      period={item.period}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>

              {/* Formación */}
              <div>
                <div className="flex items-center gap-2 mb-6 md:justify-end">
                  <FaGraduationCap className="text-cyan-400 w-5 h-5 order-first md:order-last" />
                  <h3 className="text-2xl font-bold text-cyan-400">Formación</h3>
                </div>
                <div className="relative">
                  <div className="absolute left-[7px] md:left-auto md:right-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
                  {EDUCATION.map((item, i) => (
                    <TimelineItem
                      key={i}
                      title={item.center}
                      subtitle={item.title}
                      period={item.period}
                      desc={item.desc}
                      right
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="projects" className="min-h-screen bg-black/45 flex items-center py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-white w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12">Proyectos destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              <a href="https://familytrivia.aleixaj.com" target="_blank" rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300 block opacity-100 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <div className="h-40 md:h-48 bg-black/40 flex items-center justify-center overflow-hidden">
                  <img src="/FamilyTrivia.png" alt="FamilyTrivia" className="h-28 md:h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold">FamilyTrivia</h3>
                    <span className="text-cyan-400 text-lg">↗</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">Trivia para jugar en familia o amigos hasta 5 equipos: elige categoría y puntos, responde y domina el tablero.</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {[
                      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
                      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
                      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
                    ].map(({ label, cls }) => (
                      <span key={label} className={`text-xs px-2 py-1 rounded-full border ${cls}`}>{label}</span>
                    ))}
                  </div>
                </div>
              </a>

              <a href="https://familytrivia.aleixaj.com/cashdrop" target="_blank" rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300 block opacity-100 hover:scale-105">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <div className="h-40 md:h-48 bg-black/40 flex items-center justify-center overflow-hidden">
                  <img src="/CashDrop.png" alt="CashDrop" className="h-28 md:h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold">CashDrop</h3>
                    <span className="text-cyan-400 text-lg">↗</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">¿Puedes convertir 1.000.000€ en realidad? Apuesta tu dinero, responde y avanza hasta el premio final.</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {[
                      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
                      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
                      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
                    ].map(({ label, cls }) => (
                      <span key={label} className={`text-xs px-2 py-1 rounded-full border ${cls}`}>{label}</span>
                    ))}
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="min-h-screen bg-black/45 flex items-center py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8 text-white w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
              {SKILLS.map(({ label, Icon, color }) => (
                <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] p-3 md:p-8 rounded-2xl text-center transition-all flex flex-col items-center gap-2 md:gap-4">
                  <Icon className="w-7 h-7 md:w-[52px] md:h-[52px]" style={{ color }} />
                  <p className="font-semibold text-xs md:text-xl leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOBBIES */}
        <section id="hobbies" className="min-h-screen bg-black/45 flex items-center py-24">
          <HobbiesSection />
        </section>

        {/* CONTACTO */}
        <section id="contact" className="h-screen bg-black/45 flex items-center">
          <ContactSection />
        </section>

      </div>
    </div>
  )
}

export default App
