/**
 * Home section: personal intro + interactive 3D scene.
 * Different layout on mobile (title top, CTA bottom) vs desktop (side content).
 */
import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaLinkedin, FaFileAlt, FaMapMarkerAlt, FaBriefcase, FaLaptopCode, FaGlobe } from 'react-icons/fa'
import RotatingText from '../components/RotatingText'

// Three.js in a separate chunk; does not block initial React load
const Scene3D = lazy(() => import('../components/Scene3D'))

// Premium easing reused across the hero entrance
const EASE = [0.16, 1, 0.3, 1]

/**
 * Hero headline word that rotates through the localized list with a
 * per-character staggered roll (React Bits RotatingText). Keyed by the word
 * list so switching language resets it cleanly; under reduced-motion it swaps
 * instantly with no roll.
 */
function HeroWord({ words, reduceMotion }) {
  if (reduceMotion) {
    return (
      <RotatingText
        key={words.join('|')}
        texts={words}
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

/** Compact pill with icon for profile metadata (location, experience, etc.). */
function ProfileChip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/85 text-[0.6rem] md:text-sm whitespace-nowrap">
      <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-cyan-400/85" aria-hidden="true" />
      {label}
    </span>
  )
}

/** Highlighted "open to work" status badge with a pulsing green dot. */
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

export default function Hero({ words, goToSection, heroActive, t, cvHref }) {
  const reduceMotion = useReducedMotion()
  const enter = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        }
  return (
    <section id="inicio" className="min-h-full md:h-[100dvh] relative flex flex-col md:block">

      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.16),transparent_35%)]" />}>
          <Scene3D heroActive={heroActive} />
        </Suspense>
      </div>

      {/* Mobile: title at top */}
      <div className="md:hidden flex-shrink-0 pt-20 ls:pt-12 px-8 pb-12 ls:pb-6 text-white relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-center">
        <motion.h1 {...enter(0)} className="text-[7vw] font-bold tracking-tighter leading-none">
          {t.transform}{' '}
          <HeroWord words={words} reduceMotion={reduceMotion} />
        </motion.h1>
        <motion.h2 {...enter(0.1)} className="text-[5.5vw] font-bold text-gradient-cyan tracking-tight mt-2">
          {t.subtitle}
        </motion.h2>
      </div>

      <div className="md:hidden flex-1" />

      {/* Mobile: content at bottom */}
      <div className="md:hidden flex-shrink-0 px-8 pt-10 ls:pt-8 pb-20 ls:pb-4 text-white relative z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <p className="text-xl text-gray-300">Software Developer</p>
        <div className="mt-1.5 ls:hidden flex flex-wrap gap-1 pointer-events-auto">
          <OpenToWorkBadge label={t.openToWork} />
          <ProfileChip icon={FaMapMarkerAlt} label={t.location} />
          <ProfileChip icon={FaBriefcase} label={t.experience} />
        </div>
        <p className="mt-2 ls:hidden text-sm text-gray-300 w-full text-justify">
          {t.intro}
        </p>
        <div className="mt-4 ls:mt-3 flex flex-col gap-1.5 pointer-events-auto items-start">
          <button
            onClick={() => goToSection('projects')}
            className="w-[13.75rem] px-5 py-2 bg-white text-black font-semibold rounded-2xl text-sm hover:scale-105 transition-transform glow-pulse"
          >
            {t.cta}
          </button>
          <button
            onClick={() => goToSection('contact')}
            className="ls:hidden w-[13.75rem] px-5 py-1.5 bg-cyan-400/10 border border-cyan-400/50 text-cyan-300 font-semibold rounded-2xl text-sm hover:bg-cyan-400/20 transition-colors"
          >
            {t.ctaSecondary} →
          </button>
        </div>
        <div className="mt-3 ls:mt-2 flex gap-2 pointer-events-auto flex-wrap">
          <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-xs font-semibold">
            <FaLinkedin className="w-3 h-3" /> LinkedIn
          </a>
          <a href={cvHref} download
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-xs font-semibold">
            <FaFileAlt className="w-3 h-3" /> CV
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center px-6 lg:pl-[22rem] xl:pl-[26rem] 2xl:pl-[34rem] pointer-events-none">
        <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
          <motion.h1 {...enter(0)} className="text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {t.transform}{' '}
            <HeroWord words={words} reduceMotion={reduceMotion} />
          </motion.h1>
          <motion.h2 {...enter(0.1)} className="text-4xl lg:text-5xl font-bold text-gradient-cyan tracking-tight mt-2.5">
            {t.subtitle}
          </motion.h2>
          <motion.div
            {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, ease: EASE, delay: 0.22 } })}
            className="translate-y-20">
            <p className="text-2xl text-gray-300">Software Developer</p>
            <div className="mt-3 flex flex-wrap gap-2 max-w-[40rem] pointer-events-auto">
              <OpenToWorkBadge label={t.openToWork} />
              <ProfileChip icon={FaMapMarkerAlt} label={t.location} />
              <ProfileChip icon={FaBriefcase} label={t.experience} />
              <ProfileChip icon={FaLaptopCode} label={t.modality} />
              <ProfileChip icon={FaGlobe} label={t.languages} />
            </div>
            <p className="mt-3 text-base text-gray-300 max-w-[38rem] text-justify">
              {t.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
              <button
                onClick={() => goToSection('projects')}
                className="px-6 py-3.5 bg-white text-black font-semibold rounded-2xl text-base lg:text-lg hover:scale-105 transition-transform glow-pulse"
              >
                {t.cta}
              </button>
              <button
                onClick={() => goToSection('contact')}
                className="px-6 py-3.5 bg-cyan-400/10 border border-cyan-400/50 text-cyan-300 font-semibold rounded-2xl text-base lg:text-lg hover:bg-cyan-400/20 hover:scale-105 transition-all"
              >
                {t.ctaSecondary} →
              </button>
            </div>
            <div className="mt-5 flex gap-4 pointer-events-auto flex-wrap">
              <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-base font-semibold">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href={cvHref} download
                className="flex items-center gap-2 px-6 py-3.5 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-base font-semibold">
                <FaFileAlt className="w-5 h-5" /> CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
