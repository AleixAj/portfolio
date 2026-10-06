/**
 * Hero: my intro plus the 3D room.
 * On mobile the title sits at the top and the rest at the bottom, with the room
 * in between. On desktop the text is on the left and the room on the right.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FaLinkedin, FaFileAlt, FaDownload, FaMapMarkerAlt, FaBriefcase, FaLaptopCode, FaGlobe, FaCode } from 'react-icons/fa'
import RotatingText from '../components/RotatingText'
import { LIGHT_MODE } from '../consts/device'

// Three.js and the scene live in their own chunk so they don't slow down the first load
const loadScene3D = () => import('../components/Scene3D')
const Scene3D = lazy(loadScene3D)

// Starts downloading the 3D code straight away, but only mounts the scene once
// the browser is idle. Setting up WebGL is the heaviest thing on the page and
// doing it first was delaying the hero text.
function useSceneWhenIdle() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (LIGHT_MODE) return
    loadScene3D()
    const start = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(start, { timeout: 1500 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(start, 300)
    return () => clearTimeout(id)
  }, [])
  return ready
}

// Soft cyan glow shown while the 3D room loads, or instead of it on slow connections
function HeroBackdrop() {
  return <div className="w-full h-full bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.16),transparent_35%)]" />
}

// The word that keeps changing in the headline ("ideas", "projects"...).
// The key resets it when the language changes. With reduced motion it just
// swaps the word without the roll. It pauses while the hero is off screen,
// because each change measures the layout and that would happen mid-scroll.
function HeroWord({ words, reduceMotion, active }) {
  if (reduceMotion) {
    return (
      <RotatingText
        key={words.join('|')}
        texts={words}
        auto={active}
        splitBy="words"
        rotationInterval={2800}
        staggerDuration={0}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0 }}
        mainClassName="!inline-flex align-bottom"
      />
    )
  }
  return (
    <RotatingText
      key={words.join('|')}
      texts={words}
      auto={active}
      splitBy="characters"
      staggerFrom="first"
      staggerDuration={0.025}
      rotationInterval={2500}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-120%', opacity: 0 }}
      mainClassName="!inline-flex align-bottom -mb-[0.13em]"
      splitLevelClassName="overflow-hidden pb-[0.14em] pr-[0.06em]"
    />
  )
}

// Small pill with an icon (location, years of experience...)
function ProfileChip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/85 text-[0.6rem] md:text-sm whitespace-nowrap">
      <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-cyan-400/85" aria-hidden="true" />
      {label}
    </span>
  )
}

// Green "open to work" badge with a pulsing dot
function OpenToWorkBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 md:gap-2 px-2 py-0.5 md:px-3 md:py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-[0.6rem] md:text-sm font-semibold whitespace-nowrap">
      <span className="relative flex w-1.5 h-1.5 md:w-2 md:h-2">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
        <span className="relative inline-flex rounded-full w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400" />
      </span>
      {label}
    </span>
  )
}

const SOLID_LINK = 'btn-lift flex items-center bg-cyan-400 text-black font-semibold hover:bg-cyan-300 hover:shadow-[0_8px_28px_-6px_rgba(34,211,238,0.75)]'

// LinkedIn, view CV and download CV. Same three links on mobile and desktop,
// just smaller on mobile.
function ProfileLinks({ cv, t, compact }) {
  const solid = compact ? 'gap-1.5 px-3.5 py-1.5 rounded-xl text-xs' : 'gap-2 px-6 py-3.5 rounded-2xl text-base'
  const icon = compact ? 'w-3 h-3' : 'w-5 h-5'
  return (
    <>
      <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
        className={`${SOLID_LINK} ${solid}`}>
        <FaLinkedin className={icon} /> LinkedIn
      </a>
      <a href={cv.href} target="_blank" rel="noopener noreferrer"
        className={`${SOLID_LINK} ${solid}`}>
        <FaFileAlt className={icon} /> {t.viewCV}
      </a>
      <a href={cv.href} download={cv.name} aria-label={t.downloadCV} title={t.downloadCV}
        className={`btn-lift flex items-center justify-center border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/15 hover:border-cyan-400 ${compact ? 'w-9 px-2 py-1.5 rounded-xl' : 'px-4 py-3.5 rounded-2xl'}`}>
        <FaDownload className={icon} />
      </a>
    </>
  )
}

// Little mouse icon at the bottom of the desktop hero, hinting that you can scroll.
// Hidden on short screens where it would bump into the buttons.
function ScrollCue({ onClick, label }) {
  return (
    <div className="hidden md:block [@media(max-height:760px)]:hidden absolute bottom-7 left-1/2 -translate-x-1/2 z-20">
      <button
        onClick={onClick}
        aria-label={label}
        className="hero-enter flex p-2 text-white/45 hover:text-cyan-300 transition-colors"
        style={{ '--d': 7 }}
      >
        <span className="relative block w-[22px] h-[34px] rounded-full border border-current">
          <span className="scroll-cue-dot absolute left-1/2 top-[7px] -ml-[2px] w-1 h-1.5 rounded-full bg-current" />
        </span>
      </button>
    </div>
  )
}

export default function Hero({ words, goToSection, heroActive, t, cv, scrollLabel }) {
  const reduceMotion = useReducedMotion()
  const sceneReady = useSceneWhenIdle()
  // Intro animation is plain CSS (.hero-enter) so it starts on the very first paint.
  // --d is the order, each step starts a little later.
  const enter = (d) => ({ className: 'hero-enter', style: { '--d': d } })
  return (
    <section id="inicio" className={`min-h-full md:h-[100dvh] relative flex flex-col md:block ${heroActive ? '' : 'hero-idle'}`}>

      <div className="absolute inset-0">
        {LIGHT_MODE || !sceneReady ? (
          <HeroBackdrop />
        ) : (
          <Suspense fallback={<HeroBackdrop />}>
            <Scene3D heroActive={heroActive} />
          </Suspense>
        )}
      </div>

      {/* Mobile: title at top */}
      <div className="md:hidden flex-shrink-0 pt-20 ls:pt-12 px-8 pb-8 ls:pb-6 text-white relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-center">
        <h1 {...enter(0)}>
          <span className="block text-[7vw] font-bold tracking-tighter leading-none">
            {t.transform}{' '}
            <HeroWord words={words} reduceMotion={reduceMotion} active={heroActive} />
          </span>
        </h1>
        <h2 {...enter(1)}>
          <span className="block text-[5.5vw] font-bold text-gradient-cyan tracking-tight mt-2">{t.subtitle}</span>
        </h2>
      </div>

      <div className="md:hidden flex-1" />

      {/* Mobile: everything else at the bottom */}
      <div className="hero-enter md:hidden flex-shrink-0 px-8 pt-10 ls:pt-8 pb-16 ls:pb-4 text-white relative z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent" style={{ '--d': 2 }}>
        <p className="text-xl text-gray-300">Software Developer</p>
        <div className="mt-1.5 ls:hidden flex flex-wrap gap-1 pointer-events-auto">
          <OpenToWorkBadge label={t.openToWork} />
          <ProfileChip icon={FaCode} label={t.roles} />
          <ProfileChip icon={FaMapMarkerAlt} label={t.location} />
          <ProfileChip icon={FaBriefcase} label={t.experience} />
        </div>
        <p className="mt-2 ls:hidden text-sm text-gray-300 w-full text-justify">
          {t.intro}
        </p>
        <div className="mt-4 ls:mt-3 flex flex-col gap-1.5 pointer-events-auto items-start">
          <button
            onClick={() => goToSection('projects')}
            className="w-[13.75rem] px-5 py-2 bg-white text-black font-semibold rounded-2xl text-sm btn-glow"
          >
            {t.cta}
          </button>
          <button
            onClick={() => goToSection('contact')}
            className="btn-lift ls:hidden w-[13.75rem] px-5 py-1.5 bg-cyan-400/10 border border-cyan-400/50 text-cyan-300 font-semibold rounded-2xl text-sm hover:bg-cyan-400/20"
          >
            {t.ctaSecondary} →
          </button>
        </div>
        <div className="mt-3 ls:mt-2 flex gap-2 pointer-events-auto flex-wrap">
          <ProfileLinks cv={cv} t={t} compact />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center pt-20 px-6 lg:pl-20 xl:pl-28 2xl:pl-[12rem] pointer-events-none">
        <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
          <h1 {...enter(0)}>
            <span className="block text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
              {t.transform}{' '}
              <HeroWord words={words} reduceMotion={reduceMotion} active={heroActive} />
            </span>
          </h1>
          <h2 {...enter(1)}>
            <span className="block text-4xl lg:text-5xl font-bold text-gradient-cyan tracking-tight mt-2.5">{t.subtitle}</span>
          </h2>
          {/* A real margin (not a transform) so the block stays centred and fits on short screens */}
          <div className="mt-8 [@media(min-height:850px)]:mt-16">
            <p {...enter(2)}><span className="block text-2xl text-gray-300">Software Developer</span></p>
            <div className="hero-enter mt-3 flex flex-wrap gap-2 max-w-[40rem] pointer-events-auto" style={{ '--d': 3 }}>
              <OpenToWorkBadge label={t.openToWork} />
              <ProfileChip icon={FaCode} label={t.roles} />
              <ProfileChip icon={FaMapMarkerAlt} label={t.location} />
              <ProfileChip icon={FaBriefcase} label={t.experience} />
              <ProfileChip icon={FaLaptopCode} label={t.modality} />
              <ProfileChip icon={FaGlobe} label={t.languages} />
            </div>
            <p className="hero-enter mt-3 text-base text-gray-300 max-w-[38rem] text-justify" style={{ '--d': 4 }}>
              {t.intro}
            </p>
            <div className="hero-enter mt-6 flex flex-wrap gap-3 pointer-events-auto" style={{ '--d': 5 }}>
              <button
                onClick={() => goToSection('projects')}
                className="px-6 py-3.5 bg-white text-black font-semibold rounded-2xl text-base lg:text-lg btn-glow"
              >
                {t.cta}
              </button>
              <button
                onClick={() => goToSection('contact')}
                className="group btn-lift px-6 py-3.5 bg-cyan-400/10 border border-cyan-400/50 text-cyan-300 font-semibold rounded-2xl text-base lg:text-lg hover:bg-cyan-400/20 hover:border-cyan-400"
              >
                {t.ctaSecondary} <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
            <div className="hero-enter mt-5 flex gap-4 pointer-events-auto flex-wrap" style={{ '--d': 6 }}>
              <ProfileLinks cv={cv} t={t} />
            </div>
          </div>
        </div>
      </div>

      <ScrollCue onClick={() => goToSection('about')} label={scrollLabel} />
    </section>
  )
}
