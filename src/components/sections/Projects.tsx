import { useTranslation } from 'react-i18next'

import { ProjectCard } from '@/components/project/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/content/projects'

export function Projects(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 px-6 py-24">
      <h2 id="projects-heading" className="font-[var(--font-display)] text-[length:var(--fs-h2)]">
        {t('projects.heading')}
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
