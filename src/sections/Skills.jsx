import { SKILL_CATEGORIES } from '../consts/skills'

export default function Skills({ lang }) {
  return (
    <section id="skills" className="h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-y-auto ls:overflow-visible">
      <div className="max-w-6xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6">Skills</h2>
        <div className="grid md:grid-cols-[1.15fr_0.85fr_1fr] gap-2.5 md:gap-5">
          {SKILL_CATEGORIES.map(({ title, skills }, categoryIndex) => (
            <div key={title[lang]} style={{ animationDelay: `${categoryIndex * 90}ms` }} className="reveal-item bg-white/5 border border-white/10 rounded-2xl p-3 md:p-5">
              <h3 className="text-sm md:text-xl font-bold text-cyan-400 mb-2 md:mb-4">{title[lang]}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-2 gap-1.5 md:gap-3">
                {skills.map(({ label, Icon, color }, skillIndex) => (
                  <div key={label} style={{ animationDelay: `${categoryIndex * 90 + skillIndex * 35}ms` }} className="reveal-item bg-black/20 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] p-2 md:p-3 rounded-lg md:rounded-xl text-center transition-all flex flex-col items-center gap-1 md:gap-2">
                    <Icon className="w-5 h-5 md:w-9 md:h-9" style={{ color }} />
                    <p className="font-semibold text-[0.6rem] md:text-sm leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
