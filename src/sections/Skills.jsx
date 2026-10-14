// Tech stack, grouped by category. The basics (HTML, CSS...) are small pills
// next to the title, what I use day to day gets a big tile, the rest a small
// pill under "Also used", and the AI tools a strip of their own.
// Each icon links to the tool's website.
import { memo } from 'react'
import { SKILL_CATEGORIES, AI_TOOLS } from '../consts/skills'
import SectionHeading from '../components/SectionHeading'

// A few names change with the language (API REST / REST API)
const nameOf = (label, lang) => (typeof label === 'string' ? label : label[lang] ?? label.es)

const CARD = 'reveal-item bg-white/[0.04] hover:border-white/20 transition-colors duration-300 border border-white/10 rounded-xl md:rounded-2xl 2xl:rounded-3xl p-2.5 md:p-4 2xl:p-5'

function SkillTile({ name, Icon, color, url, d }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      style={{ '--d': d }}
      className="reveal-item group/skill glare-hover bg-black/20 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] hover:shadow-[0_0_20px_rgba(34,211,238,0.22)] p-1.5 md:p-2.5 2xl:p-3.5 rounded-lg md:rounded-xl 2xl:rounded-2xl text-center transition-[border-color,background-color,box-shadow] duration-300 flex flex-col items-center gap-1 md:gap-1.5 2xl:gap-2"
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
      className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-white/10 bg-black/20 text-white/65 hover:text-white hover:border-cyan-400/40 transition-colors text-[0.6rem] md:text-xs 2xl:text-sm"
    >
      <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 opacity-80" style={{ color }} aria-hidden="true" />
      {name}
    </a>
  )
}

function Skills({ lang, t }) {
  return (
    <section id="skills" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-28 2xl:pt-32 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={4} title={t.title} />
        <div className="grid md:grid-cols-3 gap-2 md:gap-4 2xl:gap-6 items-start">
          {SKILL_CATEGORIES.map(({ title, skills }, categoryIndex) => {
            const basics = skills.filter(s => s.basic)
            const main = skills.filter(s => s.main)
            const others = skills.filter(s => !s.main && !s.basic)
            return (
              <div key={title.es} style={{ '--d': categoryIndex * 2 }} className={CARD}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-1.5 md:mb-3 2xl:mb-4">
                  <h3 className="text-sm md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400">{title[lang] ?? title.es}</h3>
                  {basics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {basics.map(({ label, Icon, color, url }) => (
                        <SkillPill key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-3 gap-1 md:gap-2 2xl:gap-3">
                  {main.map(({ label, Icon, color, url }, skillIndex) => (
                    <SkillTile key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} d={categoryIndex * 2 + skillIndex * 0.5} />
                  ))}
                </div>
                {others.length > 0 && (
                  <>
                    <p className="mt-2.5 md:mt-4 mb-1 md:mb-2 text-[0.6rem] md:text-xs 2xl:text-sm font-semibold uppercase tracking-widest text-white/40">{t.alsoUsed}</p>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      {others.map(({ label, Icon, color, url }) => (
                        <SkillPill key={url} name={nameOf(label, lang)} Icon={Icon} color={color} url={url} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}

          <div style={{ '--d': 6 }} className={`${CARD} md:col-span-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-6`}>
            <div className="md:flex-1">
              <h3 className="text-sm md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400">{t.aiTitle}</h3>
              <p className="mt-0.5 md:mt-1 text-xs md:text-sm 2xl:text-base text-white/60 leading-snug">{t.aiText}</p>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {AI_TOOLS.map(({ label, Icon, color, url }) => (
                <SkillPill key={url} name={label} Icon={Icon} color={color} url={url} />
              ))}
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
