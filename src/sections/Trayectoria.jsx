import { useState } from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { EXPERIENCE, EDUCATION } from '../consts/experience'
import TimelineItem from '../components/TimelineItem'

export default function Trayectoria() {
  const [tab, setTab] = useState(0)

  return (
    <section id="about" className="h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-hidden ls:overflow-visible">
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-1.5 md:mb-10">Mi trayectoria</h2>

        {/* Tabs — solo mobile */}
        <div className="flex md:hidden mb-2 rounded-xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setTab(0)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${tab === 0 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
          >
            <FaBriefcase className="w-3 h-3" /> Experiencia
          </button>
          <button
            onClick={() => setTab(1)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${tab === 1 ? 'bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
          >
            <FaGraduationCap className="w-3 h-3" /> Formación
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 h-[500px] ls:h-auto md:h-auto overflow-y-auto overscroll-y-contain ls:overflow-visible md:overflow-visible">

          <div className={tab === 1 ? 'hidden md:block' : ''}>
            <div className="hidden md:flex items-center gap-2 mb-4">
              <FaBriefcase className="text-cyan-400 w-5 h-5" />
              <h3 className="text-2xl font-bold text-cyan-400">Experiencia</h3>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
              {EXPERIENCE.map((item, i) => (
                <TimelineItem key={i} title={item.company} subtitle={item.role} period={item.period} desc={item.desc} />
              ))}
            </div>
          </div>

          <div className={tab === 0 ? 'hidden md:block' : ''}>
            <div className="hidden md:flex items-center gap-2 mb-4 md:justify-end">
              <FaGraduationCap className="text-cyan-400 w-5 h-5 order-first md:order-last" />
              <h3 className="text-2xl font-bold text-cyan-400">Formación</h3>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] md:left-auto md:right-[7px] top-[12px] bottom-[12px] w-px bg-white/10" />
              {EDUCATION.map((item, i) => (
                <TimelineItem key={i} title={item.center} subtitle={item.title} period={item.period} desc={item.desc} right />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
