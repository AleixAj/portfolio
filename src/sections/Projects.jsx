/**
 * Featured projects grid with links to GitHub and live demos.
 * Each card opens an info dialog with the short version of its repo README.
 */
import { useCallback, useState } from 'react'
import { PROJECTS } from '../consts/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'

export default function Projects({ lang, t }) {
  // The open project is tracked by title so the card stays memoized.
  const [openTitle, setOpenTitle] = useState(null)
  const openInfo = useCallback((title) => setOpenTitle(title), [])
  const closeInfo = useCallback(() => setOpenTitle(null), [])
  const openProject = PROJECTS.find(p => p.title === openTitle)

  return (
    <section id="projects" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-20 2xl:pt-24 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-3 md:mb-7 2xl:mb-9">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 2xl:gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              index={i}
              {...p}
              desc={p.desc[lang] ?? p.desc.es}
              onInfo={p.details ? openInfo : undefined}
              infoLabel={`${t.more}: ${p.title}`}
            />
          ))}
        </div>
      </div>

      {openProject && (
        <ProjectModal project={openProject} lang={lang} t={t} onClose={closeInfo} />
      )}
    </section>
  )
}
