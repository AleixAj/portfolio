/**
 * Professional journey: work experience and education.
 * Mobile uses tabs; desktop shows both columns side by side.
 */
import { useState } from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { EXPERIENCE, EDUCATION } from '../consts/experience'
import TimelineItem from '../components/TimelineItem'

/** Resolves bilingual fields { es, en } or returns the value as-is */
const localize = (value, lang) => (typeof value === 'object' ? (value[lang] ?? value.es) : value)

export default function Trayectoria({ lang, t }) {
  const [tab, setTab] = useState(0)

  return (
    <section id="about" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 md:pt-0 ls:pt-20 pb-8 md:pb-0 ls:pb-12 relative">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-2 md:mb-10 2xl:mb-14">{t.title}</h2>

        {/* Tabs — mobile only */}
        <div className="flex md:hidden mb-2 rounded-xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setTab(0)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${tab === 0 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
          >
            <FaBriefcase className="w-3 h-3" /> {t.experience}
          </button>
          <button
            onClick={() => setTab(1)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${tab === 1 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
          >
            <FaGraduationCap className="w-3 h-3" /> {t.education}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 2xl:gap-20">

          <div className={tab === 1 ? 'hidden md:block' : ''}>
            <div className="hidden md:flex items-center gap-2 2xl:gap-3 mb-4 2xl:mb-6">
              <FaBriefcase className="text-cyan-400 w-5 h-5 2xl:w-7 2xl:h-7" />
              <h3 className="text-2xl 2xl:text-3xl font-bold text-cyan-400">{t.experience}</h3>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
              {EXPERIENCE.map((item, i) => (
                <TimelineItem key={i} title={item.company} subtitle={localize(item.role, lang)} period={localize(item.period, lang)} desc={localize(item.desc, lang)} clients={item.clients} />
              ))}
            </div>
          </div>

          <div className={tab === 0 ? 'hidden md:block' : ''}>
            <div className="hidden md:flex items-center gap-2 2xl:gap-3 mb-4 2xl:mb-6 md:justify-end">
              <FaGraduationCap className="text-cyan-400 w-5 h-5 2xl:w-7 2xl:h-7 order-first md:order-last" />
              <h3 className="text-2xl 2xl:text-3xl font-bold text-cyan-400">{t.education}</h3>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] md:left-auto md:right-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} title={item.center} subtitle={localize(item.title, lang)} period={localize(item.period, lang)} desc={localize(item.desc, lang)} right />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
