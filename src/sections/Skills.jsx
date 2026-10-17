// Tech stack, grouped by category. The basics (HTML, CSS...) are small pills
// under the title and everything else a big tile. The AI tools get a card of
// their own, where they slide past instead of sitting still.
// Each icon links to the tool's website.
import { memo, useMemo, lazy, Suspense } from 'react'
import { SKILL_CATEGORIES, AI_TOOLS } from '../consts/skills'
import SectionHeading from '../components/SectionHeading'
import ErrorBoundary from '../components/ErrorBoundary'

// Its own chunk: it's a decorative strip in the fifth section, so it has no
// business loading before the hero does.
const LogoLoop = lazy(() => import('../components/LogoLoop'))

// A few names change with the language (API REST / REST API)
const nameOf = (label, lang) => (typeof label === 'string' ? label : label[lang] ?? label.es)

const CARD = 'reveal-item bg-white/[0.04] hover:border-white/20 transition-colors duration-300 border border-white/10 rounded-xl md:rounded-2xl 2xl:rounded-3xl p-2.5 md:p-4 2xl:p-5'

function SkillTile({ name, Icon, color, url, d, className = '' }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      style={{ '--d': d }}
      className={`reveal-item group/skill glare-hover ${className} bg-black/20 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] hover:shadow-[0_0_20px_rgba(34,211,238,0.22)] p-1.5 md:p-2.5 2xl:p-3.5 rounded-lg md:rounded-xl 2xl:rounded-2xl text-center transition-[border-color,background-color,box-shadow] duration-300 flex flex-col items-center gap-1 md:gap-1.5 2xl:gap-2`}
    >
      <Icon className="w-5 h-5 md:w-8 md:h-8 2xl:w-11 2xl:h-11 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/skill:-translate-y-0.5 group-hover/skill:scale-110" style={{ color }} />
      <p className="font-semibold text-[0.55rem] md:text-xs 2xl:text-sm leading-tight">{name}</p>
    </a>
  )
}

function SkillPill({ name, Icon, color, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-white/15 bg-black/20 text-white font-semibold hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] transition-colors text-xs md:text-sm 2xl:text-base"
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 2xl:w-5 2xl:h-5" style={{ color }} aria-hidden="true" />
      {name}
    </a>
  )
}

// The AI tools as a plain row of tiles. It's what's shown if the sliding
// strip fails: the tools are the content, the sliding is decoration, and
// losing the decoration shouldn't take the content with it.
// The opacity override is there because SkillTile fades in on scroll and
// App.jsx hands out that class once, at startup: tiles that turn up later
// would otherwise stay invisible.
function AiToolTiles({ lang }) {
  return (
    <div className="flex flex-wrap justify-center gap-1 md:grid md:grid-cols-7 md:gap-2 2xl:gap-3 [&_.reveal-item]:opacity-100">
      {AI_TOOLS.map(({ label, Icon, color, url }, i) => (
        <SkillTile key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} d={6 + i * 0.5} className="w-[calc((100%-0.75rem)/4)] md:w-auto" />
      ))}
    </div>
  )
}

function Skills({ lang, t }) {
  // The AI tools, for the strip that slides along inside their card. Rebuilt
  // only when the language changes: LogoLoop is memoized, so a new array on
  // every render would make it measure and lay itself out again.
  const aiLogos = useMemo(
    () => AI_TOOLS.map(({ label, Icon, color, url }) => ({
      node: <Icon className="w-7 h-7 2xl:w-9 2xl:h-9" style={{ color }} />,
      title: nameOf(label, lang),
      href: url,
      ariaLabel: nameOf(label, lang),
    })),
    [lang]
  )

  return (
    <section id="skills" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-28 2xl:pt-32 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={4} title={t.title} />
        <div className="grid md:grid-cols-3 gap-2 md:gap-4 2xl:gap-6 items-start">
          {SKILL_CATEGORIES.map(({ title, skills }, categoryIndex) => {
            const basics = skills.filter(s => s.basic)
            const tiles = skills.filter(s => !s.basic)
            return (
              <div key={title.es} style={{ '--d': categoryIndex * 2 }} className={CARD}>
                <h3 className="text-sm md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400 mb-1.5 md:mb-3 2xl:mb-4">{title[lang] ?? title.es}</h3>
                {basics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3 2xl:mb-4">
                    {basics.map(({ label, Icon, color, url }) => (
                      <SkillPill key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} />
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-3 gap-1 md:gap-2 2xl:gap-3">
                  {tiles.map(({ label, Icon, color, url }, skillIndex) => (
                    <SkillTile key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} d={categoryIndex * 2 + Math.min(skillIndex, 12) * 0.5} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* min-w-0: a grid cell is as wide as its content by default, so
              without it the sliding strip inside would stretch the card past
              its column, and LogoLoop would keep re-measuring itself. */}
          <div style={{ '--d': 6 }} className={`${CARD} md:col-span-3 min-w-0`}>
            <h3 className="text-sm md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400">{t.aiTitle}</h3>
            <p className="mt-0.5 md:mt-1 mb-2 md:mb-3 2xl:mb-4 text-xs md:text-sm 2xl:text-base text-white/60 leading-snug">{t.aiText}</p>
            {/* They slide past instead of sitting in a row. It takes up the
                same height as the row of tiles did, so the section still fits
                on one screen, and on a phone they no longer wrap onto two
                rows. The wrapper is what fades in, so it stays mounted and the
                strip itself turns up whenever its chunk is ready. */}
            <div className="reveal-item overflow-hidden" style={{ '--d': 6 }}>
              {/* The strip is someone else's component and it's loaded on
                  demand: if it throws, or its chunk never arrives, React
                  would unmount the whole site. The boundary catches that and
                  falls back to the plain tiles, so the tools are still there
                  and still clickable. */}
              <ErrorBoundary fallback={<AiToolTiles lang={lang} />}>
                <Suspense fallback={null}>
                  <LogoLoop
                    logos={aiLogos}
                    speed={26}
                    gap={56}
                    logoHeight={30}
                    labels="below"
                    scaleOnHover
                    draggable={false}
                    fadeOut
                    ariaLabel={t.aiTitle}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// memo: its props only change with the language, so scrolling around
// (which re-renders App) doesn't touch it
export default memo(Skills)
