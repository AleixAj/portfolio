import { PROJECTS } from '../consts/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects({ lang, t }) {
  return (
    <section id="projects" className="min-h-[100dvh] ls:h-auto bg-black/45 flex items-start md:items-center ls:items-start pt-20 ls:pt-20 md:pt-24 pb-8 ls:pb-12 md:pb-10 relative overflow-visible">
      <div className="max-w-6xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5 md:gap-4">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} index={i} {...p} desc={p.desc[lang]} />)}
        </div>
      </div>
    </section>
  )
}
