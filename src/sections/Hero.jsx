/**
 * Hero: my intro plus the 3D room.
 * On mobile the title sits at the top and the rest at the bottom, with the room
 * in between. On desktop the text is on the left and the room on the right.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FaLinkedin, FaFileAlt, FaDownload, FaMapMarkerAlt, FaBriefcase, FaLaptopCode, FaGlobe, FaCode } from 'react-icons/fa'
import RotatingText from '../components/RotatingText'
import ErrorBoundary from '../components/ErrorBoundary'
import { LIGHT_MODE } from '../consts/device'
import { YEARS_OF_EXPERIENCE } from '../consts/experience'

// Its own chunk: it's the only thing on the page that needs Framer Motion's
// animate(), and pulling that engine into the first load to roll one digit
// isn't worth it. Until it lands, the chip shows the number as plain text.
const CountUp = lazy(() => import('../components/CountUp'))

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

// The word that keeps changing in the headline ("ideas", "sketches"...).
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

// The years of experience chip. The translated label has a {n} where the
// number goes, and the number counts up the first time you see it (CountUp
// jumps straight to the end on its own if the system asks for reduced motion).
function ExperienceLabel({ text }) {
  const [before, after] = text.split('{n}')
  // A translation that lost its {n} has nowhere to put the counter, so it's
  // shown as it is rather than with a number stuck on the end.
  if (after === undefined) return <span>{text}</span>
  // All inside one span: the chip is a flex row with a gap, so leaving the
  // number as a child of its own would put that gap between the 5 and the +.
  return (
    <span>
      {before}
      {/* Both fallbacks are the number itself, so the chip always reads
          right: while the chunk downloads, and also if it never arrives.
          Without the boundary a failed download would throw during render
          and unmount the whole page, and this one is in the hero. */}
      <ErrorBoundary fallback={YEARS_OF_EXPERIENCE}>
        <Suspense fallback={YEARS_OF_EXPERIENCE}>
          <CountUp to={YEARS_OF_EXPERIENCE} duration={1.4} />
        </Suspense>
      </ErrorBoundary>
      {after}
    </span>
  )
}

// Small pill with an icon (location, years of experience...)
// `label` can be a string or, like the experience one, a bit of JSX.
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

export default function Hero({ words, goToSection, heroActive, t, cv, scrollLabel, siteSwitch }) {
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
          // If the room can't load, the glow stays and the rest of the page still works
          <ErrorBoundary fallback={<HeroBackdrop />}>
            <Suspense fallback={<HeroBackdrop />}>
              <Scene3D heroActive={heroActive} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

      {/* Normal / 3D switch, centred at the very top of the page (just under the navbar).
          Desktop: floats above the room. Mobile: first thing in the title block. */}
      <div className="hero-enter hidden md:flex absolute inset-x-0 top-24 lg:top-[6.75rem] [@media(max-height:820px)]:top-20 lg:[@media(max-height:820px)]:top-[5.75rem] z-20 justify-center pointer-events-none" style={{ '--d': 0 }}>
        <div className="pointer-events-auto">{siteSwitch}</div>
      </div>

      {/* Mobile: title at top */}
      <div className="md:hidden flex-shrink-0 pt-24 ls:pt-14 px-8 pb-8 ls:pb-6 text-white relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-center">
        <div {...enter(0)}>
          <div className="flex justify-center mb-6 ls:mb-3">{siteSwitch}</div>
        </div>
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
          <ProfileChip icon={FaBriefcase} label={<ExperienceLabel text={t.experience} />} />
        </div>
        <p className="mt-2 ls:hidden text-sm text-gray-300 w-full">
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

      {/* Desktop. The top padding leaves room for the navbar and the Normal / 3D switch;
          on short screens the block starts right below them instead of centring,
          so it never slides up under the switch. */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center [@media(max-height:820px)]:items-start pt-40 lg:pt-44 [@media(max-height:820px)]:pt-36 lg:[@media(max-height:820px)]:pt-40 pb-6 px-6 lg:pl-20 xl:pl-28 2xl:pl-[12rem] pointer-events-none">
        <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
          <h1 {...enter(0)}>
            <span className="block text-5xl lg:text-6xl lg:[@media(max-height:820px)]:text-5xl font-bold tracking-tighter leading-none">
              {t.transform}{' '}
              <HeroWord words={words} reduceMotion={reduceMotion} active={heroActive} />
            </span>
          </h1>
          <h2 {...enter(1)}>
            <span className="block text-4xl lg:text-5xl lg:[@media(max-height:820px)]:text-4xl font-bold text-gradient-cyan tracking-tight mt-2.5">{t.subtitle}</span>
          </h2>
          {/* A real margin (not a transform) so the block stays centred and fits on short screens */}
          <div className="mt-4 [@media(min-height:800px)]:mt-8 [@media(min-height:850px)]:mt-16">
            <p {...enter(2)}><span className="block text-2xl text-gray-300">Software Developer</span></p>
            <div className="hero-enter mt-3 flex flex-wrap gap-2 max-w-[40rem] pointer-events-auto" style={{ '--d': 3 }}>
              <OpenToWorkBadge label={t.openToWork} />
              <ProfileChip icon={FaCode} label={t.roles} />
              <ProfileChip icon={FaMapMarkerAlt} label={t.location} />
              <ProfileChip icon={FaBriefcase} label={<ExperienceLabel text={t.experience} />} />
              <ProfileChip icon={FaLaptopCode} label={t.modality} />
              <ProfileChip icon={FaGlobe} label={t.languages} />
            </div>
            <p className="hero-enter mt-3 text-base text-gray-300 max-w-[38rem]" style={{ '--d': 4 }}>
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
