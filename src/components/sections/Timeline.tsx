import { useTranslation } from 'react-i18next'

import { timeline } from '@/content/timeline'
import { resolveLocale } from '@/i18n/locale'

export function Timeline(): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const locale = resolveLocale(i18n.language)

  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="scroll-mt-20 px-6 py-24">
      <h2 id="timeline-heading" className="font-[var(--font-display)] text-[length:var(--fs-h2)]">
        {t('timeline.heading')}
      </h2>
      <ol className="mt-10 space-y-8 border-l border-[var(--color-border)] pl-6">
        {timeline.map((entry) => (
          <li key={entry.id}>
            <p className="text-sm text-[var(--color-text-muted)]">{entry.period}</p>
            <p className="mt-1 font-[var(--font-display)] text-lg">{entry.title[locale]}</p>
            <p className="mt-1 text-[var(--color-text-muted)]">{entry.description[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
