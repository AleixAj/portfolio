import { memo } from 'react'
import { FaGithub } from 'react-icons/fa'

const ProjectCard = memo(function ProjectCard({ index = 0, title, img, imgCls, desc, tags, github, demo }) {
  return (
    <div style={{ animationDelay: `${index * 100}ms` }} className="reveal-item group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300 flex flex-row md:flex-col">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="w-1/3 flex-shrink-0 md:w-auto md:h-48 bg-black/40 flex items-center justify-center overflow-hidden self-stretch">
        <img src={img} alt={title} className={`w-full h-full object-contain md:h-32 md:w-auto group-hover:scale-105 transition-transform duration-300 ${imgCls ?? 'p-3 md:p-0'}`} />
      </div>

      <div className="flex-1 flex flex-col p-3 md:p-6 min-w-0">
        <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-white text-center md:text-left">{title}</h3>
        <p className="text-cyan-400/80 text-xs md:text-sm leading-relaxed text-justify">{desc}</p>
        <div className="flex mt-1.5 md:mt-4 gap-1.5 md:gap-2 flex-wrap">
          {tags.map(({ label, cls }) => (
            <span key={label} className={`text-xs px-2 py-0.5 md:py-1 rounded-full border ${cls}`}>{label}</span>
          ))}
        </div>
        <div className="mt-auto pt-2 md:pt-5 flex gap-1.5 md:gap-3">
          <a href={github} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/20 text-white/70 hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-200 text-xs md:text-sm font-medium">
            <FaGithub className="w-3.5 h-3.5 md:w-4 md:h-4" /> GitHub
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 md:px-4 md:py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-200 text-xs md:text-sm font-medium">
            ↗ Demo
          </a>
        </div>
      </div>
    </div>
  )
})

export default ProjectCard
