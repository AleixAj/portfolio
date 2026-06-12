/**
 * Pencil drawing gallery with a fullscreen, swipeable lightbox.
 *
 * Performance strategy:
 * - Grid uses pre-generated thumbnails (~5 KB each instead of ~150 KB)
 * - Modal blur background uses the same thumbnail (it's heavily blurred anyway)
 * - The active slide loads the full-resolution image; previous/next are
 *   preloaded so swiping is instant
 * - All grid thumbnails get loading="lazy" + decoding="async"
 *
 * Navigation: arrows, dots, keyboard (← → Esc), and drag/swipe (mouse + touch).
 */
import { useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { HOBBIES_PHOTOS } from '../consts/hobbies'

/** Derives the thumbnail path from a full-size photo path. */
const toThumb = (src) => src.replace(/\.webp$/i, '-thumb.webp')

// Hover scale only runs where there's a real pointer (on touch a tap sticks :hover).
const CAN_HOVER = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

// Swipe must clear this horizontal distance (px) — or a flick velocity — to change
// image, so accidental taps/short drags never trigger a navigation.
const SWIPE_DISTANCE = 70
const SWIPE_VELOCITY = 500

// Slide enters from the side it's coming from and exits to the opposite side.
const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function Hobbies({ t }) {
  const reduceMotion = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = HOBBIES_PHOTOS.length

  const open = (i) => { setDirection(0); setCurrent(i); setModalOpen(true) }
  const close = useCallback(() => setModalOpen(false), [])
  const paginate = useCallback((dir) => {
    setDirection(dir)
    setCurrent(i => (i + dir + total) % total)
  }, [total])
  const prev = useCallback(() => paginate(-1), [paginate])
  const next = useCallback(() => paginate(1), [paginate])
  const goTo = useCallback((i) => { setDirection(i > current ? 1 : -1); setCurrent(i) }, [current])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, modalOpen, next, prev])

  return (
    <section id="hobbies" className="min-h-full md:h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-hidden ls:overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-1.5 md:mb-2 2xl:mb-3">{t.title}</h2>
        <p className="text-cyan-400 text-sm md:text-lg 2xl:text-2xl mb-4 md:mb-8 2xl:mb-10">{t.subtitle}</p>
        <div className="grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-2 md:gap-3 2xl:gap-4">
          {HOBBIES_PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => open(i)}
              aria-label={`${t.viewDrawing} ${i + 1}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.5), ease: [0.16, 1, 0.3, 1] }}
              whileHover={(reduceMotion || !CAN_HOVER) ? undefined : { scale: 1.06, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
              className="relative hover:z-20 aspect-square overflow-hidden rounded-xl 2xl:rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-[border-color,box-shadow] duration-200 bg-white/5"
            >
              <img
                src={toThumb(photo.src)}
                alt={photo.caption || `${t.drawing} ${i + 1}`}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="320"
                height="320"
                className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                onLoad={e => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 pt-14 pb-4 md:p-8" onClick={close}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-5xl select-none" onClick={e => e.stopPropagation()}>
            <button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors" aria-label={t.closeGallery}>✕</button>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black h-[50vh] md:h-[65vh] lg:h-[78vh] relative">
              {/* Blurred background — uses the lightweight thumbnail (still looks good blurred) */}
              <img
                key={`bg-${current}`}
                src={toThumb(HOBBIES_PHOTOS[current].src)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: 'blur(18px) brightness(0.35)' }}
              />

              {/* Swipeable / draggable full-size slide */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={current}
                  src={HOBBIES_PHOTOS[current].src}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={reduceMotion
                    ? { duration: 0 }
                    : { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next()
                    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) prev()
                  }}
                  draggable={false}
                  alt={HOBBIES_PHOTOS[current].caption || `${t.drawing} ${current + 1}`}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing"
                />
              </AnimatePresence>

              {/* Preload neighbours (full-res) so the next swipe is instant */}
              {[-1, 1].map(o => {
                const i = (current + o + total) % total
                return <img key={`pre-${i}`} src={HOBBIES_PHOTOS[i].src} alt="" aria-hidden="true" className="hidden" />
              })}

              {HOBBIES_PHOTOS[current].caption && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl pointer-events-none" />
                  <p className="absolute bottom-4 left-6 text-white/80 text-sm md:text-base font-medium pointer-events-none">{HOBBIES_PHOTOS[current].caption}</p>
                </>
              )}
              <span className="absolute top-4 right-4 text-white/50 text-sm bg-black/40 px-2 py-1 rounded-full pointer-events-none">{current + 1} / {total}</span>
            </div>

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all" aria-label={t.previousDrawing}>‹</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all" aria-label={t.nextDrawing}>›</button>

            <div className="flex justify-center gap-2 mt-4">
              {HOBBIES_PHOTOS.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  aria-label={`${t.viewDrawing} ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-cyan-400 w-5' : 'bg-white/30 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
