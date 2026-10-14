/**
 * "Normal site / 3D site" switch. It sits at the top of the hero on the normal
 * site and at the top of the 3D room, so you can always go back and forth.
 *
 * The options are real links (?view=room), so they can be opened in a new tab
 * or shared. A plain click switches in place without reloading the page.
 *
 * Size follows the screen: short labels ("Normal" / "3D") on phones, the full
 * ones from tablets up, and a bit larger on very big screens.
 */
import { FaCube, FaGlobe } from 'react-icons/fa'

const OPTIONS = [
  { id: 'site', Icon: FaGlobe },
  { id: 'room', Icon: FaCube },
]

// Same page and language, with or without ?view=room
function hrefFor(view) {
  const url = new URL(window.location.href)
  url.hash = ''
  if (view === 'room') url.searchParams.set('view', 'room')
  else url.searchParams.delete('view')
  return `${url.pathname}${url.search}`
}

export default function SiteSwitch({ value, onChange, t }) {
  return (
    <nav aria-label={t.view.label} className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 p-1 md:p-1.5 2xl:p-2 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
      {OPTIONS.map(({ id, Icon }) => {
        const active = value === id
        return (
          <a
            key={id}
            href={hrefFor(id)}
            aria-current={active ? 'page' : undefined}
            aria-label={t.view[id]}
            onClick={(e) => {
              // Ctrl/Cmd/Shift-click or middle click: let the browser open a new tab
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
              e.preventDefault()
              if (!active) onChange(id)
            }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 sm:px-5 md:px-6 2xl:px-8 py-1.5 md:py-2 2xl:py-2.5 text-sm md:text-base 2xl:text-lg font-bold tracking-wide transition-all ${active
              ? 'border border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.65)]'
              : 'border border-transparent text-white/60 hover:bg-white/10 hover:text-white'}`}
          >
            <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 2xl:h-5 2xl:w-5" aria-hidden="true" />
            <span className="sm:hidden">{t.view[`${id}Short`]}</span>
            <span className="hidden sm:inline">{t.view[id]}</span>
          </a>
        )
      })}
    </nav>
  )
}
