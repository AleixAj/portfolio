/**
 * Project details dialog, opened from the ⓘ button on a card.
 *
 * It's a short version of the repo's README (what it is, what it does, the
 * stack and anything still unfinished) so a recruiter can get the idea without
 * leaving the page.
 *
 * It's rendered into <body> with a portal. The cards live inside the scroll
 * container, which has its own stacking context, so if the dialog stayed there
 * it would end up under the fixed navbar whatever z-index I gave it.
 */
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { m, useReducedMotion } from 'framer-motion'
import { FaApple, FaGithub, FaGooglePlay, FaWindows } from 'react-icons/fa'

const FOCUSABLE = 'a[href], button:not([disabled])'

// Classes for the action buttons at the bottom
const BTN = 'flex items-center justify-center md:justify-start w-full md:w-auto gap-2 px-4 py-3 md:px-5 md:py-2.5 rounded-xl transition-colors text-sm md:text-base font-medium'
const GREY = 'border border-white/20 text-white/75 hover:border-cyan-400/60 hover:text-cyan-400'
const CYAN = 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60'
const GREEN = 'bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/20 hover:border-emerald-400/60'

export default function ProjectModal({ project, lang, t, onClose }) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef(null)
  const { title, img, preview, tags, github, demo, store, download, downloadMac, details } = project

  // Picks the right language from a { es, en, ca } field (Spanish if missing)
  const localize = useCallback((field) => field?.[lang] ?? field?.es, [lang])

  // Escape closes, Tab stays inside the dialog, and when it closes the focus
  // goes back to wherever it was before (the ⓘ button).
  useEffect(() => {
    const panel = panelRef.current
    const previouslyFocused = document.activeElement
    panel?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  // Stop the page behind from scrolling. The scrollbar space is always reserved
  // (see index.css), so hiding it doesn't make the page jump sideways.
  useEffect(() => {
    const scroller = document.getElementById('app-scroll')
    if (!scroller) return
    const prevOverflow = scroller.style.overflowY
    scroller.style.overflowY = 'hidden'
    return () => { scroller.style.overflowY = prevOverflow }
  }, [])

  const highlights = localize(details.highlights) ?? []
  const status = localize(details.status)
  // Green if it's finished, amber if there is a caveat
  const statusCls = details.status?.tone === 'ok'
    ? 'text-emerald-300/85 bg-emerald-400/5 border-emerald-400/25'
    : 'text-amber-300/80 bg-amber-400/5 border-amber-400/20'

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8 md:p-8"
      onClick={onClose}
    >
      {/* Plain dark overlay, no blur. Blurring the 3D canvas behind it on every
          frame made the dialog feel slow to open. */}
      <div className="fade-in absolute inset-0 bg-black/90" />

      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl 2xl:max-w-3xl max-h-full overflow-y-auto overscroll-contain rounded-2xl 2xl:rounded-3xl border border-cyan-400/25 bg-[#04080c] shadow-[0_0_50px_rgba(34,211,238,0.12)] focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-2.5 right-2.5 md:top-3 md:right-3 2xl:top-4 2xl:right-4 w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
        >
          ✕
        </button>

        <div className="p-5 md:p-7 2xl:p-9">

          <div className="flex items-center gap-3 md:gap-4 pr-12">
            <img src={img} alt="" aria-hidden="true" className="w-11 h-11 md:w-14 md:h-14 object-contain flex-shrink-0" />
            <div className="min-w-0">
              <h3 id="project-modal-title" className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white leading-tight">{title}</h3>
              <p className="text-[0.7rem] md:text-xs 2xl:text-sm text-white/45 mt-0.5 break-words">{details.stack}</p>
            </div>
          </div>

          <p className="mt-4 md:mt-5 text-sm md:text-base 2xl:text-lg text-cyan-400/85 leading-relaxed">
            {localize(details.summary)}
          </p>

          {preview && (
            <img
              src={preview}
              alt={`${title}: ${t.preview}`}
              loading="lazy"
              decoding="async"
              className="mt-4 mx-auto block w-full max-w-sm rounded-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            />
          )}

          <div className="mt-4 flex gap-1 md:gap-1.5 flex-wrap">
            {tags.map(({ label, cls }) => (
              <span key={label} className={`text-[0.6rem] md:text-xs 2xl:text-sm px-2 py-0.5 rounded-full border leading-tight ${cls}`}>{label}</span>
            ))}
          </div>

          <h4 className="mt-6 mb-2 text-xs md:text-sm 2xl:text-base font-semibold uppercase tracking-widest text-white/40">{t.highlights}</h4>
          <ul className="flex flex-col gap-2 md:gap-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm md:text-[0.95rem] 2xl:text-lg text-white/75 leading-relaxed">
                <span aria-hidden="true" className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-cyan-400/70 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {status && (
            <p className={`mt-5 text-xs md:text-sm 2xl:text-base border rounded-xl px-3 py-2 md:px-4 md:py-3 leading-relaxed ${statusCls}`}>
              <span className="font-semibold">{t.status}: </span>{status}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2 md:gap-3">
            <a href={github} target="_blank" rel="noopener noreferrer"
              className={`${BTN} ${GREY}`}>
              <FaGithub className="w-4 h-4" /> {t.viewCode}
            </a>
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer"
                className={`${BTN} ${CYAN}`}>
                ↗ {t.viewDemo}
              </a>
            )}
            {download && (
              <a href={download} rel="noopener noreferrer"
                className={`${BTN} ${CYAN}`}>
                <FaWindows className="w-4 h-4" /> {t.viewDownload}
              </a>
            )}
            {downloadMac && (
              <a href={downloadMac} rel="noopener noreferrer"
                className={`${BTN} ${CYAN}`}>
                <FaApple className="w-4 h-4" /> {t.viewDownloadMac}
              </a>
            )}
            {store && (
              <a href={store} target="_blank" rel="noopener noreferrer"
                className={`${BTN} ${GREEN}`}>
                <FaGooglePlay className="w-4 h-4" /> {t.viewStore}
              </a>
            )}
          </div>

        </div>
      </m.div>
    </div>,
    document.body,
  )
}
