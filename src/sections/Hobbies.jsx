/**
 * Pencil drawing gallery with fullscreen modal.
 *
 * Performance strategy:
 * - Grid uses pre-generated thumbnails (~5 KB each instead of ~150 KB)
 * - Modal blur background uses the same thumbnail (it's heavily blurred anyway)
 * - Only the active modal slide loads the full-resolution image; previous/next
 *   are preloaded for instant transitions
 * - All grid thumbnails get loading="lazy" + decoding="async"
 *
 * Keyboard navigation: ← → Escape
 */
import { useCallback, useState, useEffect } from 'react'
import { HOBBIES_PHOTOS } from '../consts/hobbies'

/** Derives the thumbnail path from a full-size photo path. */
const toThumb = (src) => src.replace(/\.webp$/i, '-thumb.webp')

export default function Hobbies({ t }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const total = HOBBIES_PHOTOS.length

  const open = (i) => { setCurrent(i); setModalOpen(true) }
  const close = useCallback(() => setModalOpen(false), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total])

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
    <section id="hobbies" className="h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-hidden ls:overflow-visible">
      <div className="max-w-5xl 2xl:max-w-7xl 3xl:max-w-[92rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-1.5 md:mb-2 2xl:mb-3">{t.title}</h2>
        <p className="text-cyan-400 text-sm md:text-lg 2xl:text-2xl mb-4 md:mb-8 2xl:mb-10">{t.subtitle}</p>
        <div className="grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-2 md:gap-3 2xl:gap-4">
          {HOBBIES_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              aria-label={`${t.viewDrawing} ${i + 1}`}
              style={{ animationDelay: `${i * 35}ms` }}
              className="reveal-item aspect-square overflow-hidden rounded-xl 2xl:rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-105 transition-all duration-200 bg-white/5"
            >
              <img
                src={toThumb(photo.src)}
                alt={photo.caption || `${t.drawing} ${i + 1}`}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="320"
                height="320"
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                onLoad={e => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
              />
            </button>
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
                className="absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300"
                style={{ filter: 'blur(18px) brightness(0.35)' }}
              />
              {/* Foreground full-size slides: render current + neighbors for smooth transitions */}
              {[-1, 0, 1].map(offset => {
                const i = (current + offset + total) % total
                const photo = HOBBIES_PHOTOS[i]
                const isActive = offset === 0
                return (
                  <img
                    key={`fg-${i}`}
                    src={photo.src}
                    alt={photo.caption || `${t.drawing} ${i + 1}`}
                    decoding="async"
                    fetchPriority={isActive ? 'high' : 'low'}
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

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all" aria-label={t.previousDrawing}>‹</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white text-xl hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all" aria-label={t.nextDrawing}>›</button>

            <div className="flex justify-center gap-2 mt-4">
              {HOBBIES_PHOTOS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
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
