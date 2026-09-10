import { motion, useSpring } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { Project } from '@/content/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { resolveLocale } from '@/i18n/locale'

interface ProjectCardProps {
  project: Project
}

const TILT_RANGE = 5

export function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const locale = resolveLocale(i18n.language)
  const reducedMotion = useReducedMotion()

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>): void => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width - 0.5
    const py = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY.set(px * TILT_RANGE)
    rotateX.set(-py * TILT_RANGE)
  }

  const handleMouseLeave = (): void => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6"
    >
      <motion.h3
        layoutId={`project-title-${project.slug}`}
        className="[font-family:var(--font-display)] text-[length:var(--fs-h3)]"
      >
        {project.title[locale]}
      </motion.h3>
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
    </motion.article>
  )
}
