import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/ui/Reveal'

export function About(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 px-6 py-24">
      <h2 id="about-heading" className="font-[var(--font-display)] text-[length:var(--fs-h2)]">
        {t('about.heading')}
      </h2>
      <Reveal>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">{t('about.bio')}</p>
      </Reveal>
    </section>
  )
}
