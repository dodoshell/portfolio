import { useTranslation } from 'react-i18next'

import { personalProjectSkills, skillGroups, type SkillGroupId } from '@/content/skills'
import { Reveal } from '@/components/ui/Reveal'

export function Skills(): React.JSX.Element {
  const { t } = useTranslation()

  const groupLabels: Record<SkillGroupId, string> = {
    languages: t('skills.groups.languages'),
    backend: t('skills.groups.backend'),
    frontend: t('skills.groups.frontend'),
    database: t('skills.groups.database'),
    tools: t('skills.groups.tools'),
  }

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 px-6 py-24">
      <h2 id="skills-heading" className="[font-family:var(--font-display)] text-[length:var(--fs-h2)]">
        {t('skills.heading')}
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.06}>
            <h3 className="text-sm uppercase tracking-wide text-[var(--color-text-muted)]">
              {groupLabels[group.id]}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 text-sm text-[var(--color-text-muted)]">
          {t('skills.personalProjects')} {personalProjectSkills.join(', ')}
        </p>
      </Reveal>
    </section>
  )
}
