/**
 * Full-screen loading screen for the 3D room, in the site's look: logo with a
 * soft glow, a cyan progress bar with a moving sheen and a bright tip, the
 * percentage and a short line saying what's happening.
 *
 * Pure UI, no Three.js, so it can also be shown by Root while the room's own
 * code is still downloading. Pass `progress` (0-100) for a real bar, or leave
 * it out for an "in progress" bar with no number.
 */
export default function LoaderScreen({ title, steps, progress, done = false }) {
  const known = typeof progress === 'number'
  const pct = known ? Math.max(0, Math.min(100, Math.round(progress))) : null
  // Never quite empty, so the bar reads as a bar from the first moment
  const shown = known ? Math.max(pct, 3) : 0
  // One line per stage: model, textures, lights
  const step = !known ? steps[0] : steps[Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length))]

  return (
    <div
      role="progressbar"
      aria-label={title}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={known ? pct : undefined}
      aria-busy={!done}
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black px-6 transition-opacity duration-700 ${done ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {/* Soft cyan glow behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.14),transparent_45%)]" />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <img src="/AJ.png" alt="" aria-hidden="true" className="loader-logo h-14 w-auto md:h-16" />
        <p className="mt-5 font-tech text-sm md:text-base font-bold !tracking-[0.35em] text-white">ALEIX AUQUÉ</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-cyan-300/70">{title}</p>

        {/* The bar. It moves with transforms, not width: transform animations run
            on the compositor, so they keep going while the main thread is busy
            building the 3D scene (a width transition froze halfway there). */}
        <div className={`relative mt-8 h-1.5 w-full rounded-full border border-white/10 bg-white/[0.06] ${known ? '' : 'overflow-hidden'}`}>
          {known ? (
            <>
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  className="loader-fill relative h-full w-full rounded-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-teal-300 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(${shown - 100}%)` }}
                />
              </div>
              {/* Bright tip on a full-width layer, so it can glow past the bar's edge.
                  Clamped so at 100% it sits at the end instead of half past it. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(clamp(6px, ${shown}%, calc(100% - 6px)))` }}
              >
                <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_4px_rgba(103,232,249,0.7)]" />
              </div>
            </>
          ) : (
            <div className="loader-indeterminate h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          )}
        </div>

        <div className="mt-3 flex w-full items-center justify-between gap-4 text-xs">
          <span className="truncate text-white/55" aria-live="polite">{step}…</span>
          <span className="font-tech tabular-nums text-cyan-300">{known ? `${pct}%` : ''}</span>
        </div>
      </div>
    </div>
  )
}
