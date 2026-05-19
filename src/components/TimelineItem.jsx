/**
 * Single timeline entry (work experience or education).
 * Supports left alignment (experience) or right alignment (education on desktop).
 */
import { memo } from 'react'

const TimelineItem = memo(function TimelineItem({ title, subtitle, period, desc, right }) {
  return (
    <div className={`relative pb-1.5 md:pb-7 2xl:pb-10 last:pb-0 pl-6 md:pl-7 2xl:pl-10 ${right ? 'md:pl-0 md:pr-7 2xl:pr-10 md:text-right' : ''}`}>
      <div className={`absolute top-[5px] 2xl:top-[7px] w-2.5 h-2.5 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4 rounded-full border-2 border-cyan-400 bg-black z-10 left-0 ${right ? 'md:left-auto md:right-0' : ''}`} />
      <span className="text-xs md:text-sm 2xl:text-base font-medium text-cyan-400 tracking-wider">{period}</span>
      <h4 className="text-white font-semibold mt-0.5 2xl:mt-1 text-sm md:text-base 2xl:text-xl">{title}</h4>
      <p className="text-gray-300 mt-0.5 2xl:mt-1 text-xs md:text-sm 2xl:text-base">{subtitle}</p>
      {desc && <p className={`text-gray-400 mt-0.5 2xl:mt-1 leading-relaxed text-[0.65rem] md:text-sm 2xl:text-base text-justify ${right ? 'md:text-right' : ''}`}>{desc}</p>}
    </div>
  )
})

export default TimelineItem
