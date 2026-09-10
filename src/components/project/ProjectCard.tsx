import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { Project } from '@/content/projects'
import { resolveLocale } from '@/i18n/locale'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const locale = resolveLocale(i18n.language)

  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6">
      <h3 className="font-[var(--font-display)] text-[length:var(--fs-h3)]">{project.title[locale]}</h3>
      <p className="mt-2 text-[var(--color-text-muted)]">{project.tagline[locale]}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm">
        <Link to={`/projects/${project.slug}`} className="text-[var(--color-accent)] hover:underline">
          {t('projects.viewCase')}
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {t('projects.repository')}
        </a>
      </div>
    </article>
  )
}
