/**
 * Reusable project card.
 * Memoized to avoid re-renders when language changes in other sections.
 * Mobile: compact horizontal layout; desktop: vertical with description.
 */
import { memo } from 'react'
import { FaGithub } from 'react-icons/fa'

const ProjectCard = memo(function ProjectCard({ index = 0, title, img, mobileImg, imgCls, desc, tags, github, demo }) {
  return (
    <div style={{ animationDelay: `${index * 100}ms` }} className="reveal-item group relative bg-white/5 border border-white/10 rounded-xl md:rounded-2xl 2xl:rounded-3xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] transition-all duration-300 flex flex-row md:flex-col">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="w-20 flex-shrink-0 md:w-auto md:h-32 lg:h-36 2xl:h-44 3xl:h-52 bg-black/40 flex items-center justify-center overflow-hidden self-stretch">
        <picture className="w-full h-full flex items-center justify-center">
          {mobileImg && <source media="(max-width: 767px)" srcSet={mobileImg} />}
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className={`w-full h-full object-contain scale-110 md:scale-125 md:h-20 lg:h-24 2xl:h-32 3xl:h-36 md:w-auto group-hover:scale-[1.32] transition-transform duration-300 ${imgCls ?? 'p-2 md:p-0'}`}
          />
        </picture>
      </div>

      <div className="flex-1 flex flex-col p-2 md:p-4 2xl:p-6 min-w-0">
        <h3 className="text-base md:text-xl 2xl:text-2xl 3xl:text-3xl font-bold mb-1 md:mb-2 2xl:mb-3 text-white text-left">{title}</h3>
        <p className="hidden md:block text-cyan-400/80 text-xs 2xl:text-sm 3xl:text-base leading-relaxed text-justify">{desc}</p>
        <div className="flex mt-1 md:mt-3 2xl:mt-5 gap-1 2xl:gap-2 flex-wrap">
          {tags.map(({ label, cls }) => (
            <span key={label} className={`text-[0.58rem] md:text-xs 2xl:text-sm px-1.5 md:px-2 2xl:px-3 py-0.5 md:py-1 rounded-full border ${cls}`}>{label}</span>
          ))}
        </div>
        <div className="mt-auto pt-1 md:pt-4 2xl:pt-6 flex gap-1.5 md:gap-2 2xl:gap-3">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub repository`}
            className="flex-1 flex items-center justify-center gap-1 2xl:gap-2 px-2 py-1 md:px-4 md:py-2 2xl:py-3 rounded-lg md:rounded-xl border border-white/20 text-white/70 hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-200 text-[0.65rem] md:text-sm 2xl:text-base font-medium">
            <FaGithub className="w-3 h-3 md:w-4 md:h-4 2xl:w-5 2xl:h-5" /> GitHub
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 md:px-4 md:py-2 2xl:py-3 rounded-lg md:rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-200 text-[0.65rem] md:text-sm 2xl:text-base font-medium">
            ↗ Demo
          </a>
        </div>
      </div>
    </div>
  )
})

export default ProjectCard
