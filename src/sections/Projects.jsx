import { PROJECTS } from '../consts/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="h-[100dvh] ls:h-auto bg-black/45 flex items-center ls:items-start pt-16 ls:pt-20 md:pt-0 pb-4 ls:pb-12 md:pb-0 relative overflow-hidden ls:overflow-visible">
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-white w-full">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-8">Mis proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} index={i} {...p} />)}
        </div>
      </div>
    </section>
  )
}
