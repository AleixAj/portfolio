import { SKILLS } from '../consts/skills'

export default function Skills() {
  return (
    <section id="skills" className="h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-hidden ls:overflow-visible">
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 md:gap-3">
          {SKILLS.map(({ label, Icon, color }, i) => (
            <div key={label} style={{ animationDelay: `${i * 45}ms` }} className="reveal-item bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] p-2 md:p-6 rounded-lg md:rounded-2xl text-center transition-all flex flex-col items-center gap-1 md:gap-3">
              <Icon className="w-5 h-5 md:w-[46px] md:h-[46px]" style={{ color }} />
              <p className="font-semibold text-[0.6rem] md:text-xl leading-tight whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
