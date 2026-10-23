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
import useElectricHighlight from '../components/useElectricHighlight'
import ElectricHighlight from '../components/ElectricHighlight'

const FEATURED = PROJECTS.filter(p => p.featured)
const OTHERS = PROJECTS.filter(p => !p.featured)

// If the last card ends up alone in its row, centre it instead of leaving it
// stuck to the left. Two columns from tablet up.
function orphanCls(i, total) {
  if (i !== total - 1 || total % 2 === 0) return ''
  return 'md:col-span-2 md:justify-self-center md:w-[calc(50%-0.375rem)] 2xl:w-[calc(50%-0.5rem)]'
}

function Projects({ lang, t }) {
  // I store the title (not the object) so the callbacks stay stable and the cards don't re-render
  const [openTitle, setOpenTitle] = useState(null)
  const openInfo = useCallback((title) => setOpenTitle(title), [])
  const closeInfo = useCallback(() => setOpenTitle(null), [])
  const openProject = PROJECTS.find(p => p.title === openTitle)

  // The lightning follows the pointer, and stays put on the card whose
  // details dialog is open, so when you close it you can see which card you
  // were reading about even if the pointer has moved away.
  // lift 5: the cards rise 5px on hover (.project-card:hover in index.css)
  const { containerRef, itemProps, box, active, liftY } = useElectricHighlight(openTitle, { lift: 5 })

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
      <div ref={containerRef} className="relative max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <SectionHeading index={3} title={t.title} />

        {/* The lightning answers what you're doing instead of marking a
            favourite. It's drawn 64px outside the card, which is why this
            section keeps overflow visible. */}
        <ElectricHighlight box={box} active={active} liftY={liftY} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 2xl:gap-5">
          {/* Every card sits in a wrapper that stays mounted: App.jsx looks
              for .reveal-item once, so a card mounted later would never fade
              in. The wrapper is also what the border measures itself against;
              it needs no styling of its own, the border reads the card's own
              corners from the card. */}
          {FEATURED.map((p, i) => (
            <div key={p.title} className="h-full" {...itemProps(p.title)}>
              <ProjectCard index={i} {...cardProps(p)} className="h-full" />
            </div>
          ))}
        </div>

        <h3 className="reveal-item mt-6 md:mt-10 2xl:mt-14 mb-2 md:mb-4 flex items-center gap-3 text-xs md:text-sm 2xl:text-base font-semibold uppercase tracking-[0.25em] text-white/50" style={{ '--d': 3 }}>
          {t.moreProjects}
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 2xl:gap-4">
          {/* Same wrapper as the big cards above, so the border can measure
              them the same way. The grid positioning goes on the wrapper,
              which is now the cell, and the row fills it so rows side by side
              still come out the same height. */}
          {OTHERS.map((p, i) => (
            <div key={p.title} className={orphanCls(i, OTHERS.length)} {...itemProps(p.title)}>
              <ProjectRow index={i + 3} {...cardProps(p)} className="h-full" />
            </div>
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
