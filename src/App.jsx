import './index.css'
import { useRef, useEffect, useState, memo, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import Scene3D from './components/Scene3D'
import StarBackground from './components/StarBackground'
import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiGreensock, SiPhp, SiLaravel, SiMysql, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { FaJava, FaBriefcase, FaGraduationCap, FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa'

const EMAILJS_SERVICE_ID  = 'service_2jzdrj4'
const EMAILJS_TEMPLATE_ID = 'template_qebo2rv'
const EMAILJS_PUBLIC_KEY  = 'XGyv7kwacCRxidvYz'

const NAV_ITEMS = [
  { label: 'Inicio',    id: 'inicio'   },
  { label: 'Trayectoria', id: 'about'  },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Skills',    id: 'skills'   },
  { label: 'Arte',      id: 'hobbies'  },
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

const PROJECTS = [
  {
    title: 'FamilyTrivia',
    img: '/FamilyTrivia.png',
    desc: 'Trivia para jugar en familia o amigos hasta 5 equipos: elige categoría y puntos, responde y domina el tablero.',
    tags: [
      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    ],
    github: 'https://github.com/settings/repositories',
    demo: 'https://familytrivia.aleixaj.com',
  },
  {
    title: 'CashDrop',
    img: '/CashDrop.png',
    desc: '¿Puedes convertir 1.000.000€ en realidad? Apuesta tu dinero, responde y avanza hasta el premio final.',
    tags: [
      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    ],
    github: 'https://github.com/settings/repositories',
    demo: 'https://familytrivia.aleixaj.com/cashdrop',
  },
]

const ProjectCard = memo(function ProjectCard({ title, img, desc, tags, github, demo }) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300 flex flex-row md:flex-col">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Imagen */}
      <div className="w-1/3 flex-shrink-0 md:w-auto md:h-48 bg-black/40 flex items-center justify-center overflow-hidden self-stretch">
        <img src={img} alt={title} className="w-full h-full object-contain md:h-32 md:w-auto group-hover:scale-105 transition-transform duration-300 p-3 md:p-0" />
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-3 md:p-6 min-w-0">
        <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-white text-center md:text-left">{title}</h3>
        <p className="text-cyan-400/80 text-xs md:text-sm leading-relaxed">{desc}</p>
        <div className="flex mt-1.5 md:mt-4 gap-1.5 md:gap-2 flex-wrap">
          {tags.map(({ label, cls }) => (
            <span key={label} className={`text-xs px-2 py-0.5 md:py-1 rounded-full border ${cls}`}>{label}</span>
          ))}
        </div>
        <div className="mt-2 md:mt-5 flex gap-1.5 md:gap-3">
          <a href={github} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/20 text-white/70 hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-200 text-xs md:text-sm font-medium">
            <FaGithub className="w-3.5 h-3.5 md:w-4 md:h-4" /> GitHub
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-200 text-xs md:text-sm font-medium">
            ↗ Demo
          </a>
        </div>
      </div>
    </div>
  )
})

const ContactSection = memo(function ContactSection() {
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
    <div className="max-w-5xl mx-auto w-full px-5 md:px-8 text-white md:max-w-xl">
      <h2 className="text-2xl md:text-5xl font-bold mb-3 text-center">¿Hablamos?</h2>
      <p className="text-base md:text-lg text-gray-400 mb-5 md:mb-7 text-center">Estoy abierto a nuevas oportunidades y colaboraciones.</p>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
        <input
          name="from_name" type="text" required placeholder="Tu nombre"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="reply_to" type="email" required placeholder="Tu email"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="subject" type="text" required placeholder="Asunto"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <textarea
          name="message" required rows={4} placeholder="Tu mensaje"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
        />
        <button
          type="submit" disabled={status === 'sending'}
          className="mt-1 px-8 md:px-12 py-3 md:py-4 bg-white text-black font-semibold rounded-2xl text-base md:text-lg hover:scale-105 transition-transform glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status === 'success' && <p className="text-center text-cyan-400 font-medium text-lg">¡Mensaje enviado! Te responderé pronto.</p>}
        {status === 'error'   && <p className="text-center text-red-400 font-medium text-lg">Error al enviar. Inténtalo de nuevo.</p>}
      </form>
    </div>
  )
})

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
    desc: 'Desarrollo de soluciones a medida para distribuidoras de electricidad y gas. Proyecto con framework propio en PHP.',
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

const TimelineItem = memo(function TimelineItem({ title, subtitle, period, desc, right }) {
  return (
    <div className={`relative pb-2 md:pb-7 last:pb-0 pl-7 ${right ? 'md:pl-0 md:pr-7 md:text-right' : ''}`}>
      <div className={`absolute top-[5px] w-3.5 h-3.5 rounded-full border-2 border-cyan-400 bg-black z-10 left-0 ${right ? 'md:left-auto md:right-0' : ''}`} />
      <span className="text-sm font-medium text-cyan-400 tracking-wider">{period}</span>
      <h4 className="text-white font-semibold mt-0.5 text-sm md:text-base">{title}</h4>
      <p className="text-gray-400 mt-0.5 text-sm">{subtitle}</p>
      {desc && <p className="text-gray-500 mt-0.5 leading-relaxed text-xs md:text-sm">{desc}</p>}
    </div>
  )
})

const TrayectoriaSection = memo(function TrayectoriaSection() {
  const [tab, setTab] = useState(0)
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
      <h2 className="text-2xl md:text-5xl font-bold mb-1.5 md:mb-10">Mi trayectoria</h2>

      {/* Tabs — solo mobile */}
      <div className="flex md:hidden mb-2 rounded-xl border border-white/10 overflow-hidden">
        <button
          onClick={() => setTab(0)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${tab === 0 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
        >
          <FaBriefcase className="w-3.5 h-3.5" /> Experiencia
        </button>
        <button
          onClick={() => setTab(1)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${tab === 1 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
        >
          <FaGraduationCap className="w-3.5 h-3.5" /> Formación
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 min-h-[420px] md:min-h-0">

        {/* Experiencia */}
        <div className={tab === 1 ? 'hidden md:block' : ''}>
          <div className="hidden md:flex items-center gap-2 mb-4">
            <FaBriefcase className="text-cyan-400 w-5 h-5" />
            <h3 className="text-2xl font-bold text-cyan-400">Experiencia</h3>
          </div>
          <div className="relative">
            <div className="absolute left-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
            {EXPERIENCE.map((item, i) => (
              <TimelineItem key={i} title={item.company} subtitle={item.role} period={item.period} desc={item.desc} />
            ))}
          </div>
        </div>

        {/* Formación */}
        <div className={tab === 0 ? 'hidden md:block' : ''}>
          <div className="hidden md:flex items-center gap-2 mb-4 md:justify-end">
            <FaGraduationCap className="text-cyan-400 w-5 h-5 order-first md:order-last" />
            <h3 className="text-2xl font-bold text-cyan-400">Formación</h3>
          </div>
          <div className="relative">
            <div className="absolute left-[7px] md:left-auto md:right-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
            {EDUCATION.map((item, i) => (
              <TimelineItem key={i} title={item.center} subtitle={item.title} period={item.period} desc={item.desc} right />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
})

const HOBBIES_PHOTOS = [
  { src: '/hobbies/01.webp',  caption: '' },
  { src: '/hobbies/02.webp',  caption: '' },
  { src: '/hobbies/03.webp',  caption: '' },
  { src: '/hobbies/04.webp',  caption: '' },
  { src: '/hobbies/05.webp',  caption: '' },
  { src: '/hobbies/06.webp',  caption: '' },
  { src: '/hobbies/07.webp',  caption: '' },
  { src: '/hobbies/08.webp',  caption: '' },
  { src: '/hobbies/09.webp',  caption: '' },
  { src: '/hobbies/10.webp',  caption: '' },
  { src: '/hobbies/11.webp',  caption: '' },
  { src: '/hobbies/12.webp',  caption: '' },
  { src: '/hobbies/13.webp',  caption: '' },
  { src: '/hobbies/14.webp',  caption: '' },
  { src: '/hobbies/15.webp',  caption: '' },
  { src: '/hobbies/16.webp',  caption: '' },
]

const HobbiesSection = memo(function HobbiesSection() {
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
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2">Arte</h2>
        <p className="text-cyan-400 text-sm md:text-lg mb-4 md:mb-8">Dibujos realistas hechos a lápiz por mí</p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
          {HOBBIES_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className="aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-105 transition-all duration-200 bg-white/5"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                onLoad={e => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
              />
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
              {[-1, 0, 1].map(offset => {
                const i = (current + offset + total) % total
                const photo = HOBBIES_PHOTOS[i]
                const isActive = offset === 0
                return (
                  <img key={`bg-${i}`} src={photo.src} alt="" aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0, filter: 'blur(18px) brightness(0.35)' }}
                  />
                )
              })}
              {[-1, 0, 1].map(offset => {
                const i = (current + offset + total) % total
                const photo = HOBBIES_PHOTOS[i]
                const isActive = offset === 0
                return (
                  <img key={`fg-${i}`} src={photo.src} alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />
                )
              })}
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
})

const SECTIONS = ['inicio', 'about', 'projects', 'skills', 'hobbies', 'contact']
const ROTATING_WORDS = ['ideas', 'proyectos', 'sueños', 'visiones', 'retos']

function App() {
  const containerRef = useRef(null)
  const currentIdx = useRef(0)
  const isScrolling = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [wordIdx, setWordIdx] = useState(0)
  const [sectionIdx, setSectionIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2500)
    return () => clearInterval(t)
  }, [])

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


  return (
    <div className="bg-black">

      <StarBackground />

      {/* Flechas de navegación fijas */}
      {sectionIdx > 0 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx - 1])}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto"
          aria-label="Sección anterior"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
      {sectionIdx < SECTIONS.length - 1 && (
        <button
          onClick={() => goToSection(SECTIONS[sectionIdx + 1])}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/40 hover:text-cyan-400 transition-colors duration-300 animate-bounce pointer-events-auto"
          aria-label="Siguiente sección"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="w-full px-6 lg:px-0 py-4 lg:py-5 flex items-center">
          <button onClick={() => goToSection('inicio')} className="lg:pl-60 flex items-center gap-5 cursor-pointer">
            <img src="/AJ.png" alt="AJ Logo" className="h-8 lg:h-11 w-auto object-contain" />
            <span className="font-tech text-2xl lg:text-4xl font-bold tracking-widest text-white">ALEIX AUQUÉ</span>
          </button>

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
      <div ref={containerRef} className="h-[100dvh] overflow-y-auto relative z-10" style={{ touchAction: 'pan-y' }}>

        {/* HERO */}
        <section id="inicio" className="h-[100dvh] relative flex flex-col md:block">

          {/* Escena 3D: fondo completo en móvil y desktop */}
          <div className="absolute inset-0">
            <Scene3D />
          </div>

          {/* Mobile: título arriba con degradado hacia abajo */}
          <div className="md:hidden flex-shrink-0 pt-24 ls:pt-12 px-8 pb-20 ls:pb-6 text-white relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-center">
            <h1 className="text-[7vw] font-bold tracking-tighter leading-none">
              Transformando{' '}
              <span
                key={wordIdx}
                className="inline-block"
                style={{ animation: 'wordSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
              >
                {ROTATING_WORDS[wordIdx]}
              </span>
            </h1>
            <h2 className="text-[5.5vw] font-bold text-cyan-400 tracking-tight mt-2">
              en experiencias digitales inolvidables
            </h2>
          </div>

          {/* Mobile: espaciador para empujar el contenido al fondo */}
          <div className="md:hidden flex-1" />

          {/* Mobile: contenido abajo con degradado hacia arriba */}
          <div className="md:hidden flex-shrink-0 px-8 pt-20 ls:pt-8 pb-32 ls:pb-4 text-white relative z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <p className="text-xl text-gray-300">Software Developer</p>
            <p className="mt-3 ls:hidden text-sm text-gray-400 w-full text-justify">
              ¡Hola! Soy Aleix, un apasionado desarrollador de software especializado en crear experiencias digitales interactivas y visualmente impactantes. Con un enfoque en la creatividad y la innovación, me esfuerzo por transformar ideas en proyectos tangibles que cautivan a los usuarios.
            </p>
            <button
              onClick={() => goToSection('about')}
              className="mt-8 ls:mt-3 w-fit px-8 py-4 ls:py-2.5 bg-white text-black font-semibold rounded-2xl text-lg hover:scale-105 transition-transform pointer-events-auto glow-pulse"
            >
              Explorar mis proyectos
            </button>
            <div className="mt-4 ls:mt-2 flex gap-3 pointer-events-auto flex-wrap">
              <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-sm font-semibold">
                <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href="/CV_Aleix_Auque.pdf" download
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-sm font-semibold">
                <FaFileAlt className="w-3.5 h-3.5" /> CV
              </a>
            </div>
          </div>

          {/* Desktop: overlay con todo el contenido (igual que antes) */}
          <div className="hidden md:flex absolute inset-0 z-10 items-center px-6 lg:pl-64 pointer-events-none">
            <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                Transformando{' '}
                <span
                  key={wordIdx}
                  className="inline-block"
                  style={{ animation: 'wordSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  {ROTATING_WORDS[wordIdx]}
                </span>
              </h1>
              <h2 className="text-5xl lg:text-6xl font-bold text-cyan-400 tracking-tight mt-3">
                en experiencias digitales inolvidables
              </h2>
              <p className="mt-10 text-3xl text-gray-300">Software Developer</p>
              <p className="mt-4 text-lg text-gray-400 max-w-[38rem] text-justify">
                ¡Hola! Soy Aleix, un apasionado desarrollador de software especializado en crear experiencias digitales interactivas y visualmente impactantes. Con un enfoque en la creatividad y la innovación, me esfuerzo por transformar ideas en proyectos tangibles que cautivan a los usuarios.
              </p>
              <button
                onClick={() => goToSection('projects')}
                className="mt-8 w-fit px-10 py-5 bg-white text-black font-semibold rounded-2xl text-xl hover:scale-105 transition-transform pointer-events-auto glow-pulse"
              >
                Explorar mis proyectos
              </button>
              <div className="mt-8 flex gap-4 pointer-events-auto flex-wrap">
                <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-lg font-semibold">
                  <FaLinkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a href="/CV_Aleix_Auque.pdf" download
                  className="flex items-center gap-2 px-8 py-4 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-lg font-semibold">
                  <FaFileAlt className="w-5 h-5" /> CV
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* MI TRAYECTORIA */}
        <section id="about" className="min-h-[100dvh] bg-black/45 flex items-start md:items-center pt-[15dvh] ls:pt-12 pb-8 md:py-20 relative">
          <TrayectoriaSection />
        </section>

        {/* PROYECTOS */}
        <section id="projects" className="min-h-[100dvh] bg-black/45 flex items-start md:items-center pt-28 ls:pt-12 pb-12 md:py-20 relative">
          <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
            <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-8">Mis proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6">
              {PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="min-h-[100dvh] bg-black/45 flex items-start md:items-center pt-[15dvh] ls:pt-12 pb-8 md:py-20 relative">
          <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">Skills</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
              {SKILLS.map(({ label, Icon, color }) => (
                <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] p-3 md:p-6 rounded-xl md:rounded-2xl text-center transition-all flex flex-col items-center gap-2 md:gap-3">
                  <Icon className="w-7 h-7 md:w-[46px] md:h-[46px]" style={{ color }} />
                  <p className="font-semibold text-xs md:text-xl leading-tight whitespace-nowrap">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOBBIES */}
        <section id="hobbies" className="min-h-[100dvh] bg-black/45 flex items-start md:items-center pt-[15dvh] ls:pt-12 pb-8 md:py-20 relative">
          <HobbiesSection />
        </section>

        {/* CONTACTO + FOOTER */}
        <section id="contact" className="min-h-[100dvh] bg-black/45 flex flex-col relative">

          {/* Formulario */}
          <div className="flex-1 flex items-center justify-center pt-16 md:pt-24 pb-8 md:pb-[60px]">
            <ContactSection />
          </div>

          {/* Footer */}
          <footer id="page-footer" className="bg-black/80 border-t border-white/10 text-white">
            <div className="max-w-5xl mx-auto px-5 md:px-8 py-3 md:py-5 grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-3 md:gap-0">

              {/* Logo + nombre */}
              <div className="flex flex-col items-start gap-1.5 md:gap-2">
                <div className="flex items-center gap-2">
                  <img src="/AJ.png" alt="AJ Logo" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
                  <span className="font-tech text-base font-bold tracking-widest">ALEIX AUQUÉ</span>
                </div>
                <p className="text-gray-400 text-xs">Software Developer & Release Manager</p>
              </div>

              {/* Redes */}
              <div className="flex flex-col items-end gap-2 md:gap-2">
                <div className="flex gap-3">
                  <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="mailto:aleixauque@gmail.com"
                    className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="https://github.com/AleixAj" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="/CV_Aleix_Auque.pdf" download
                    className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <FaFileAlt className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                  <p className="text-gray-400 text-xs">aleixauque@gmail.com</p>
                  <p className="text-gray-400 text-xs">(+34) 680 80 26 09</p>
                </div>
              </div>

            </div>
            <div className="border-t border-white/5 py-2.5 text-center text-gray-600 text-xs">
              © {new Date().getFullYear()} Aleix Auqué · Todos los derechos reservados
            </div>
          </footer>

        </section>

      </div>
    </div>
  )
}

export default App
