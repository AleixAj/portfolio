/**
 * Featured projects grid with links to GitHub and live demos.
 */
import { PROJECTS } from '../consts/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects({ lang, t }) {
  return (
    <section id="projects" className="min-h-full md:min-h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-24 2xl:pt-28 pb-5 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 text-white w-full">
        <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold mb-2 md:mb-6 2xl:mb-10">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 2xl:gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} index={i} {...p} desc={p.desc[lang] ?? p.desc.es} />)}
        </div>
      </div>
    </section>
  )
}
