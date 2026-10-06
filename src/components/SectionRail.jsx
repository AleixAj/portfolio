/**
 * Small section index on the right edge of the screen.
 *
 * One short line per section. The current one is longer and cyan, and hovering
 * a line shows the section name. Only from 1280px up, where there's enough
 * margin so it doesn't overlap the content.
 */
import { memo } from 'react'
import { NAV_ITEMS } from '../consts/nav'

function SectionRail({ goToSection, activeSection, lang, label }) {
  return (
    <nav
      aria-label={label}
      className="section-rail hidden xl:flex fixed right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5"
    >
      {NAV_ITEMS.map(({ id, labels }, i) => {
        const active = id === activeSection
        return (
          <button
            key={id}
            onClick={() => goToSection(id)}
            aria-label={labels[lang]}
            aria-current={active ? 'true' : undefined}
            className="group relative flex items-center py-1.5 pl-2"
          >
            <span
              className={`absolute right-full mr-2 whitespace-nowrap pointer-events-none px-2 py-1 rounded-md bg-black/75 font-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                active ? 'text-cyan-300' : 'text-white/60'
              } opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0`}
            >
              <span className="text-white/35 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {labels[lang]}
            </span>
            <span
              aria-hidden="true"
              className={`block h-px origin-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active ? 'w-9 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-4 bg-white/30 group-hover:w-6 group-hover:bg-white/70'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}

export default memo(SectionRail)
