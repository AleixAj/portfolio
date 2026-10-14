/**
 * Projects: the featured ones as big cards, the rest as a compact list below.
 * Each one links to GitHub / the demo, and the ⓘ button opens a dialog with a
 * short summary of the project.
 */
import { useCallback, useState, memo } from 'react'
import { PROJECTS } from '../consts/projects'
import ProjectCard, { ProjectRow } from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import SectionHeading from '../components/SectionHeading'

const FEATURED = PROJECTS.filter(p => p.featured)
const OTHERS = PROJECTS.filter(p => !p.featured)

// If the last card ends up alone in its row, centre it instead of leaving it
// stuck to the left. 2 columns on tablet, 3 on desktop.
function orphanCls(i, total) {
  if (i !== total - 1) return ''
  const cls = []
  if (total % 2 === 1) cls.push('md:col-span-2 md:justify-self-center md:w-[calc(50%-0.375rem)] 2xl:w-[calc(50%-0.5rem)]')
  if (total % 3 === 1) cls.push('lg:col-span-1 lg:col-start-2 lg:w-auto 2xl:w-auto')
  else if (total % 2 === 1) cls.push('lg:col-span-1 lg:justify-self-stretch lg:w-auto 2xl:w-auto')
  return cls.join(' ')
}

function Projects({ lang, t }) {
  // I store the title (not the object) so the callbacks stay stable and the cards don't re-render
  const [openTitle, setOpenTitle] = useState(null)
  const openInfo = useCallback((title) => setOpenTitle(title), [])
  const closeInfo = useCallback(() => setOpenTitle(null), [])
  const openProject = PROJECTS.find(p => p.title === openTitle)

  // What both layouts need from each project
  const cardProps = (p) => ({
    ...p,
    desc: p.desc[lang] ?? p.desc.es,
    onInfo: p.details ? openInfo : undefined,
    infoLabel: `${t.more}: ${p.title}`,
    labels: t,
  })

  return (
    <section id="projects" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-28 2xl:pt-32 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={3} title={t.title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 2xl:gap-5">
          {FEATURED.map((p, i) => (
            <ProjectCard key={p.title} index={i} {...cardProps(p)} />
          ))}
        </div>

        <h3 className="reveal-item mt-6 md:mt-10 2xl:mt-14 mb-2 md:mb-4 flex items-center gap-3 text-xs md:text-sm 2xl:text-base font-semibold uppercase tracking-[0.25em] text-white/50" style={{ '--d': 3 }}>
          {t.moreProjects}
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 2xl:gap-4">
          {OTHERS.map((p, i) => (
            <ProjectRow key={p.title} index={i + 3} {...cardProps(p)} className={orphanCls(i, OTHERS.length)} />
          ))}
        </div>
      </div>

      {openProject && (
        <ProjectModal project={openProject} lang={lang} t={t} onClose={closeInfo} />
      )}
    </section>
  )
}

// memo: its props only change with the language, so scrolling around
// (which re-renders App) doesn't touch it
export default memo(Projects)
