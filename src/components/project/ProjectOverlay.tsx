import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import type { Project } from '@/content/projects'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useScrollLock } from '@/hooks/useScrollLock'
import { resolveLocale } from '@/i18n/locale'

interface ProjectOverlayProps {
  project: Project
  onClose: () => void
}

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const locale = resolveLocale(i18n.language)
  const containerRef = useFocusTrap<HTMLDivElement>(true)
  useScrollLock(true)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const titleId = `project-overlay-${project.slug}-title`

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--color-bg)]/90 px-4 py-10 backdrop-blur-sm sm:px-8"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-[var(--font-display)] text-[length:var(--fs-h2)]">
            {project.title[locale]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {t('projects.close')}
          </button>
        </div>

        <p className="mt-2 text-[var(--color-text-muted)]">{project.tagline[locale]}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <section className="mt-8" aria-labelledby={`${titleId}-problem`}>
          <h3 id={`${titleId}-problem`} className="text-sm uppercase tracking-wide text-[var(--color-accent)]">
            {t('projects.problemLabel')}
          </h3>
          <p className="mt-2">{project.problem[locale]}</p>
        </section>

        <section className="mt-8" aria-labelledby={`${titleId}-decisions`}>
          <h3 id={`${titleId}-decisions`} className="text-sm uppercase tracking-wide text-[var(--color-accent)]">
            {t('projects.decisionsLabel')}
          </h3>
          <ul className="mt-2 space-y-4">
            {project.decisions.map((decision) => (
              <li key={decision.id}>
                <p className="font-semibold">{decision.title[locale]}</p>
                <p className="mt-1 text-[var(--color-text-muted)]">{decision.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8" aria-labelledby={`${titleId}-code`}>
          <h3 id={`${titleId}-code`} className="text-sm uppercase tracking-wide text-[var(--color-accent)]">
            {t('projects.codeLabel')}
          </h3>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-[var(--color-surface-2)] p-4 text-sm">
            <code>{project.code.snippet}</code>
          </pre>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{project.code.caption[locale]}</p>
        </section>

        <section className="mt-8" aria-labelledby={`${titleId}-retro`}>
          <h3 id={`${titleId}-retro`} className="text-sm uppercase tracking-wide text-[var(--color-accent)]">
            {t('projects.retrospectiveLabel')}
          </h3>
          <p className="mt-2">{project.retrospective[locale]}</p>
        </section>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-[var(--color-accent)] underline underline-offset-4"
        >
          {t('projects.repository')} ↗
        </a>
      </div>
    </div>
  )
}
