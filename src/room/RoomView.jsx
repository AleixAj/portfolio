/**
 * Room version of the portfolio (?view=room): the gaming room from the hero,
 * full screen, where each object opens a part of the portfolio.
 *
 * Everything 3D is in RoomScene. This file is the HTML around it: the top bar
 * (style switch and languages), the bottom dock, the side panel with each
 * section, the CV viewer, the loading screen and the error fallback.
 */
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { LazyMotion, useReducedMotion } from 'framer-motion'
import { FaArrowLeft, FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa'
import { TRANSLATIONS } from '../consts/i18n'
import { CV_BY_LANG, getInitialLang } from '../consts/lang'
import { useLangInUrl } from '../consts/useLangInUrl'
import { LanguageSwitcher } from '../components/Navbar'
import StarBackground from '../components/StarBackground'
import SiteSwitch from '../components/SiteSwitch'
import ErrorBoundary from '../components/ErrorBoundary'
import LoaderScreen from '../components/LoaderScreen'
import RoomScene from './RoomScene'
import RoomPanel, { PANEL_TITLES } from './RoomPanels'
import { HOTSPOTS, SHELF, MODEL_URL } from './roomConfig'
import { useModelDownload } from './useModelDownload'

const loadMotionFeatures = () => import('../motionFeatures').then(m => m.default)

const PANELS = HOTSPOTS.filter(h => !h.action).map(h => h.id)
const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches

// Desktop screens can be 4K, so they're capped at 1.5x; phones at 2x
const maxDpr = () => Math.min(window.devicePixelRatio || 1, window.innerWidth >= 1024 ? 1.5 : 2)

// The loader never stays longer than this, whatever happens
const LOADER_MAX_MS = 20000

/**
 * Loading screen until the room is on screen, then it fades out.
 * The bar follows the model download (up to 85%), then waits for the scene to
 * be built and drawn (`ready`) before reaching 100%.
 */
function Loader({ title, steps, download, ready }) {
  const [gone, setGone] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const done = ready || timedOut
  useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), LOADER_MAX_MS)
    return () => clearTimeout(id)
  }, [])
  useEffect(() => {
    if (!done) return
    const id = setTimeout(() => setGone(true), 800)
    return () => clearTimeout(id)
  }, [done])
  if (gone) return null
  const progress = done ? 100 : download.done ? 92 : download.progress * 85
  return <LoaderScreen title={title} steps={steps} progress={progress} done={done} />
}

/**
 * The CV on screen, with buttons to download it or open it in its own tab.
 * Phones and tablets often can't show a PDF inside a page (an iPad shows only
 * the first page), so on touch screens it's just the two buttons, big.
 */
function CvViewer({ cv, t, onClose }) {
  const r = t.room

  // Give the focus back to whatever opened the viewer when it closes
  useEffect(() => {
    const previous = document.activeElement
    return () => previous?.focus?.()
  }, [])

  const BTN = 'flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors'
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 md:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={r.cvTitle}>
      <div className="flex w-full max-w-sm pc:h-full pc:max-w-6xl flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#05080c] shadow-[0_0_60px_rgba(34,211,238,0.12)]" onClick={e => e.stopPropagation()}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
          <h2 className="text-lg font-bold">{r.cvTitle}</h2>
          <div className="flex items-center gap-2">
            <a href={cv.href} download={cv.name} className={`${BTN} hidden pc:flex bg-cyan-400 text-black hover:bg-cyan-300`}>
              <FaDownload className="h-3.5 w-3.5" aria-hidden="true" /> {t.hero.downloadCV}
            </a>
            <a href={cv.href} target="_blank" rel="noopener noreferrer" className={`${BTN} hidden pc:flex border border-white/15 text-white/80 hover:border-cyan-400/60 hover:text-cyan-300`}>
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" /> {r.openNewTab}
            </a>
            <button type="button" onClick={onClose} aria-label={t.projects.close} autoFocus
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors">
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* The browser's own PDF viewer, on computers only (`pc` screen in tailwind.config.js) */}
        <iframe src={`${cv.href}#view=FitH&navpanes=0`} title={r.cvTitle} className="hidden pc:block h-full w-full flex-1 bg-white" />
        <div className="flex flex-col items-center gap-3 p-5 pc:hidden">
          <a href={cv.href} target="_blank" rel="noopener noreferrer" className={`${BTN} w-full max-w-xs border border-cyan-400/50 bg-cyan-400/10 text-cyan-200`}>
            <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" /> {t.hero.viewCV}
          </a>
          <a href={cv.href} download={cv.name} className={`${BTN} w-full max-w-xs bg-cyan-400 text-black`}>
            <FaDownload className="h-3.5 w-3.5" aria-hidden="true" /> {t.hero.downloadCV}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RoomView({ onExit }) {
  const reduceMotion = useReducedMotion()
  const [lang, setLang] = useState(getInitialLang)
  const [focus, setFocus] = useState(null)
  const [lightsOn, setLightsOn] = useState(false)
  const [projectIdx, setProjectIdx] = useState(0)
  const [cvOpen, setCvOpen] = useState(false)
  const [dpr, setDpr] = useState(maxDpr)
  const [ready, setReady] = useState(false)   // the scene is on screen
  const [failed, setFailed] = useState(false) // the 3D couldn't run
  const closeRef = useRef(null)
  // The model is fetched first (with progress); the scene mounts once it's in
  const download = useModelDownload(MODEL_URL)
  const onReady = useCallback(() => setReady(true), [])
  const onFailed = useCallback(() => setFailed(true), [])

  const t = TRANSLATIONS[lang]
  const r = t.room
  const cv = CV_BY_LANG[lang] ?? CV_BY_LANG.es
  useLangInUrl(lang, `${t.meta.title} · ${r.enter}`)

  // Text painted inside the 3D scene (screens, labels, book spines)
  const shelf = useMemo(() => ({
    jobs: SHELF.jobs,
    courses: SHELF.courses.map(c => (typeof c === 'string' ? c : c[lang] ?? c.es)),
  }), [lang])
  const sceneTexts = {
    labels: r.labels,
    lamp: r.lamp,
    tv: r.tv,
    monitorLabel: r.monitorLabel,
    shelf,
  }

  const select = useCallback((id) => {
    if (id === 'lamp') { setLightsOn(on => !on); return }
    if (id === 'cv') { setCvOpen(true); return }
    setFocus(id) // null = back to the overview
  }, [])

  // When a panel opens, move the keyboard focus into it (its close button)
  useEffect(() => {
    if (focus) closeRef.current?.focus({ preventScroll: true })
  }, [focus])

  const close = useCallback(() => setFocus(null), [])

  // Escape closes the panel (dialogs inside it handle their own Escape first)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return
      // The CV viewer sits on top, so it closes first
      if (cvOpen) setCvOpen(false)
      else setFocus(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cvOpen])

  const titles = PANEL_TITLES(t)
  const index = focus ? PANELS.indexOf(focus) + 1 : 0

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="fixed inset-0 overflow-hidden bg-black text-white">
        <StarBackground />

        <div className="absolute inset-0 z-10">
          {/* If the 3D can't run, a short message and a way back instead of a black screen */}
          <ErrorBoundary onError={onFailed} fallback={
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="max-w-sm text-white/70">{r.error}</p>
              <button type="button" onClick={onExit} className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-cyan-300">{r.errorAction}</button>
            </div>
          }>
            <Canvas
              camera={{ fov: 42, near: 0.05, far: 100 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
              dpr={dpr}
              // Nothing moves behind the CV viewer, so stop drawing frames
              frameloop={cvOpen ? 'demand' : 'always'}
              // A click on the empty space around the room goes back to the overview
              onPointerMissed={() => setFocus(null)}
            >
              <PerformanceMonitor
                onDecline={() => setDpr(d => Math.max(1, +(d - 0.25).toFixed(2)))}
                onIncline={() => setDpr(maxDpr())}
                flipflops={3}
              />
              <Suspense fallback={null}>
                {download.done && <RoomScene
                  focus={focus}
                  onSelect={select}
                  lightsOn={lightsOn}
                  projectIdx={projectIdx}
                  texts={sceneTexts}
                  reduceMotion={reduceMotion}
                  onReady={onReady}
                />}
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Top bar */}
        <header className="absolute inset-x-0 top-0 z-[45] flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="hidden md:flex flex-col md:w-56">
            <span className="font-tech text-lg font-bold !tracking-[0.3em]">ALEIX AUQUÉ</span>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-cyan-300/80">Software Developer</span>
          </div>
          {/* Normal / 3D switch, centred at the top like on the normal site */}
          <div className="pointer-events-auto">
            <SiteSwitch value="room" onChange={onExit} t={t} />
          </div>
          {/* Phones: on their own row under the switch */}
          <div className="pointer-events-auto w-full md:w-56 flex justify-center md:justify-end">
            <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={() => {}} compact />
          </div>
        </header>

        {/* Bottom dock: the same objects as buttons, for keyboard, touch and the impatient */}
        <nav aria-label={r.dock} className={`absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-3 pb-4 md:pb-6 transition-[opacity,transform] duration-500 ${focus ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'}`}>
          <p className="text-[0.7rem] md:text-xs uppercase tracking-[0.25em] text-white/50">{IS_TOUCH ? r.hintTouch : r.hint}</p>
          <div className="flex max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-white/10 bg-black/85 p-1.5">
            {PANELS.map((id, i) => (
              <button key={id} type="button" onClick={() => select(id)}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs md:text-sm font-semibold text-white/80 hover:bg-cyan-400/15 hover:text-cyan-200 transition-colors">
                <span className="font-tech text-[0.6rem] text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                {r.labels[id]}
              </button>
            ))}
            <button type="button" onClick={() => select('cv')}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs md:text-sm font-semibold text-cyan-300 hover:bg-cyan-400/15 transition-colors">
              <span className="font-tech text-[0.6rem] text-cyan-400">{String(PANELS.length + 1).padStart(2, '0')}</span>
              {r.labels.cv}
            </button>
          </div>
        </nav>

        {/* Side panel (bottom sheet on phones) */}
        <aside
          aria-hidden={!focus}
          inert={!focus ? true : undefined}
          className={`absolute z-40 flex flex-col border-cyan-400/20 bg-[#05080c]/[0.97] shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            inset-x-0 bottom-0 h-[56dvh] rounded-t-2xl border-t
            md:inset-x-auto md:right-0 md:top-0 md:h-full md:w-[min(42vw,520px)] md:rounded-none md:border-t-0 md:border-l
            ${focus ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}`}
        >
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 md:px-7 md:pt-20">
            <div>
              <p className="font-tech text-xs !tracking-[0.3em] text-cyan-400/80">{String(index).padStart(2, '0')} ——</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">{focus ? titles[focus] : ''}</h2>
            </div>
            <button ref={closeRef} type="button" onClick={close} aria-label={r.back} title={r.back}
              className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors">
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 md:px-7">
            {focus && <RoomPanel id={focus} lang={lang} t={t} cv={cv} projectIdx={projectIdx} setProjectIdx={setProjectIdx} />}
          </div>
        </aside>

        {focus && (
          <button type="button" onClick={close}
            className="absolute left-4 bottom-4 z-30 hidden md:flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm font-semibold text-white/85 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors">
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" /> {r.back}
          </button>
        )}

        {cvOpen && <CvViewer cv={cv} t={t} onClose={() => setCvOpen(false)} />}

        <Loader title={r.loading} steps={r.loadingSteps} download={download} ready={ready || failed} />
      </div>
    </LazyMotion>
  )
}
