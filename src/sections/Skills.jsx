/**
 * Tech stack grouped by category (frontend, backend, DevOps, tools).
 */
import { SKILL_CATEGORIES } from '../consts/skills'

export default function Skills({ lang, t }) {
  return (
    <section id="skills" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-20 2xl:pt-24 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-3 md:mb-7 2xl:mb-9">{t.title}</h2>
        <div className="grid md:grid-cols-[1.15fr_0.85fr_1.3fr] gap-1.5 md:gap-4 2xl:gap-6 items-start">
          {SKILL_CATEGORIES.map(({ title, skills }, categoryIndex) => (
            <div key={title[lang] ?? title.es} style={{ animationDelay: `${categoryIndex * 90}ms` }} className="reveal-item bg-white/5 border border-white/10 rounded-xl md:rounded-2xl 2xl:rounded-3xl p-2 md:p-4 2xl:p-5">
              <h3 className="text-xs md:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cyan-400 mb-1 md:mb-3 2xl:mb-4">{title[lang] ?? title.es}</h3>
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-3 gap-1 md:gap-2 2xl:gap-3">
                {skills.map(({ label, Icon, color, url }, skillIndex) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{ animationDelay: `${categoryIndex * 90 + skillIndex * 35}ms` }}
                    className="reveal-item glare-hover bg-black/20 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] p-1 md:p-2.5 2xl:p-3.5 rounded-lg md:rounded-xl 2xl:rounded-2xl text-center transition-all flex flex-col items-center gap-0.5 md:gap-1.5 2xl:gap-2"
                  >
                    <Icon className="w-4 h-4 md:w-8 md:h-8 2xl:w-11 2xl:h-11" style={{ color }} />
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
