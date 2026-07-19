/**
 * Reusable project card.
 * Memoized to avoid re-renders when language changes in other sections.
 * Mobile: compact horizontal layout; desktop: vertical with description.
 */
import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

// True only on devices with a real pointer (mouse/trackpad). Hover effects are
// gated on this because on touch a tap sticks the :hover state, which would leave
// a card stuck in its expanded state after being tapped.
const CAN_HOVER = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

const ProjectCard = memo(function ProjectCard({ index = 0, title, img, mobileImg, imgCls, desc, tags, github, demo }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={(reduceMotion || !CAN_HOVER) ? undefined : { scale: 1.04, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
      className="group relative hover:z-20 project-card rounded-xl md:rounded-2xl 2xl:rounded-3xl overflow-hidden flex flex-row md:flex-col">

      <div className="w-16 flex-shrink-0 md:w-auto md:h-28 lg:h-28 2xl:h-36 3xl:h-44 flex items-center justify-center overflow-hidden self-stretch">
        <picture className="w-full h-full flex items-center justify-center">
          {mobileImg && <source media="(max-width: 767px)" srcSet={mobileImg} />}
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className={`w-full h-full object-contain scale-110 md:scale-125 md:h-20 lg:h-20 2xl:h-28 3xl:h-32 md:w-auto md:group-hover:scale-[1.32] transition-transform duration-300 ${imgCls ?? 'p-1 md:p-0'}`}
          />
        </picture>
      </div>

      <div className="flex-1 flex flex-col p-1.5 md:p-3.5 2xl:p-5 min-w-0">
        <h3 className="text-sm md:text-lg 2xl:text-xl 3xl:text-2xl font-bold mb-0.5 md:mb-2 2xl:mb-2.5 text-white text-center leading-tight">{title}</h3>
        <p className="hidden md:block text-cyan-400/80 text-xs 2xl:text-sm 3xl:text-base leading-snug line-clamp-3">{desc}</p>
        <div className="flex mt-0.5 md:mt-2.5 2xl:mt-3 gap-0.5 md:gap-1 2xl:gap-1.5 flex-wrap">
          {tags.map(({ label, cls }) => (
            <span key={label} className={`text-[0.55rem] md:text-xs 2xl:text-sm px-1 md:px-2 2xl:px-2.5 py-px md:py-0.5 rounded-full border leading-tight ${cls}`}>{label}</span>
          ))}
        </div>
        <div className="mt-auto pt-1 md:pt-3 2xl:pt-5 flex gap-1 md:gap-1.5 2xl:gap-2">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub repository`}
            className="flex-1 flex items-center justify-center gap-1 px-1.5 py-0.5 md:px-3 md:py-2 2xl:py-2.5 rounded-md md:rounded-lg 2xl:rounded-xl border border-white/20 text-white/70 hover:border-cyan-400/60 hover:text-cyan-400 transition-all duration-200 text-[0.6rem] md:text-xs 2xl:text-sm font-medium">
            <FaGithub className="w-2.5 h-2.5 md:w-4 md:h-4 2xl:w-4 2xl:h-4" /> GitHub
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}
            className="flex-1 flex items-center justify-center gap-1 px-1.5 py-0.5 md:px-3 md:py-2 2xl:py-2.5 rounded-md md:rounded-lg 2xl:rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-200 text-[0.6rem] md:text-xs 2xl:text-sm font-medium">
            ↗ Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
})

export default ProjectCard
