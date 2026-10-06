// Tech stack, grouped by category. Each icon links to the tool's website.
import { memo } from 'react'
import { SKILL_CATEGORIES } from '../consts/skills'
import SectionHeading from '../components/SectionHeading'

function Skills({ lang, t }) {
  return (
    <section id="skills" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-28 2xl:pt-32 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={4} title={t.title} />
        <div className="grid md:grid-cols-[1.15fr_0.85fr_1.3fr] gap-1.5 md:gap-4 2xl:gap-6 items-start">
          {SKILL_CATEGORIES.map(({ title, skills }, categoryIndex) => (
            <div key={title[lang] ?? title.es} style={{ '--d': categoryIndex * 2 }} className="reveal-item bg-white/[0.04] hover:border-white/20 transition-colors duration-300 border border-white/10 rounded-xl md:rounded-2xl 2xl:rounded-3xl p-2 md:p-4 2xl:p-5">
              <h3 className="text-xs md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400 mb-1 md:mb-3 2xl:mb-4">{title[lang] ?? title.es}</h3>
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-3 gap-1 md:gap-2 2xl:gap-3">
                {skills.map(({ label, Icon, color, url }, skillIndex) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{ '--d': categoryIndex * 2 + Math.min(skillIndex, 12) * 0.5 }}
                    className="reveal-item group/skill glare-hover bg-black/20 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] hover:shadow-[0_0_20px_rgba(34,211,238,0.22)] p-1 md:p-2.5 2xl:p-3.5 rounded-lg md:rounded-xl 2xl:rounded-2xl text-center transition-[border-color,background-color,box-shadow] duration-300 flex flex-col items-center gap-0.5 md:gap-1.5 2xl:gap-2"
                  >
                    <Icon className="w-4 h-4 md:w-8 md:h-8 2xl:w-11 2xl:h-11 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/skill:-translate-y-0.5 group-hover/skill:scale-110" style={{ color }} />
                    <p className="font-semibold text-[0.5rem] md:text-xs 2xl:text-sm leading-tight">{label}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// memo: its props only change with the language, so scrolling around
// (which re-renders App) doesn't touch it
export default memo(Skills)
