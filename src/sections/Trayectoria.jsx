/**
 * Work experience and education. Tabs on mobile, two columns on desktop.
 *
 * This is the longest section, so it uses `safe center`: centred while it fits,
 * and aligned to the top when it doesn't (otherwise the title would end up
 * hidden behind the navbar).
 */
import { useState, memo } from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { EXPERIENCE, EDUCATION } from '../consts/experience'
import TimelineItem from '../components/TimelineItem'
import SectionHeading from '../components/SectionHeading'

// Translated fields are { es, en, ca }; plain strings are the same in every language
const localize = (value, lang) => (typeof value === 'object' ? (value[lang] ?? value.es) : value)

function Trayectoria({ lang, t }) {
  const [tab, setTab] = useState(0)

  return (
    <section id="about" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center md:[align-items:safe_center] ls:items-start pt-16 md:pt-24 ls:pt-20 pb-8 md:pb-6 ls:pb-12 relative">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={2} title={t.title} className="mb-1.5 md:mb-4 2xl:mb-7" />

        {/* Tabs, mobile only */}
        <div className="reveal-item flex md:hidden mb-1.5 rounded-xl border border-white/10 overflow-hidden" style={{ '--d': 1 }}>
          {[[FaBriefcase, t.experience], [FaGraduationCap, t.education]].map(([Icon, label], i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${tab === i ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            >
              <Icon className="w-3 h-3" /> {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 2xl:gap-16">

          <div className={tab === 1 ? 'hidden md:block' : ''}>
            <div className="reveal-item hidden md:flex items-center gap-2 2xl:gap-3 mb-2.5 2xl:mb-5" style={{ '--d': 1 }}>
              <FaBriefcase className="text-cyan-400 w-5 h-5 2xl:w-6 2xl:h-6" />
              <h3 className="text-xl 2xl:text-2xl font-bold text-cyan-400">{t.experience}</h3>
            </div>
            <div className="relative">
              <div aria-hidden="true" className="reveal-line absolute left-[7px] top-[12px] bottom-[12px] w-px bg-gradient-to-b from-cyan-400/50 via-white/15 to-white/5" />
              {EXPERIENCE.map((item, i) => (
                <TimelineItem key={i} index={i + 2} title={localize(item.company, lang)} subtitle={localize(item.role, lang)} period={localize(item.period, lang)} desc={localize(item.desc, lang)} clients={item.clients} />
              ))}
            </div>
          </div>

          <div className={tab === 0 ? 'hidden md:block' : ''}>
            <div className="reveal-item hidden md:flex items-center gap-2 2xl:gap-3 mb-2.5 2xl:mb-5 md:justify-end" style={{ '--d': 2 }}>
              <FaGraduationCap className="text-cyan-400 w-5 h-5 2xl:w-6 2xl:h-6 order-first md:order-last" />
              <h3 className="text-xl 2xl:text-2xl font-bold text-cyan-400">{t.education}</h3>
            </div>
            <div className="relative">
              <div aria-hidden="true" className="reveal-line absolute left-[7px] md:left-auto md:right-[7px] top-[12px] bottom-[12px] w-px bg-gradient-to-b from-cyan-400/50 via-white/15 to-white/5" />
              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} index={i + 3} title={localize(item.center, lang)} subtitle={localize(item.title, lang)} period={localize(item.period, lang)} desc={localize(item.desc, lang)} right />
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
export default memo(Trayectoria)
