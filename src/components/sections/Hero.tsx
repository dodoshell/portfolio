import { useTranslation } from 'react-i18next'

export function Hero(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <section id="top" className="relative flex min-h-dvh scroll-mt-20 flex-col justify-center px-6">
      <h1 className="font-[var(--font-display)] text-[length:var(--fs-hero)] leading-[1.05]">
        Odoardo Ramanucci
      </h1>
      <p className="mt-4 text-lg">{t('hero.role')}</p>
      <p className="mt-2 text-[var(--color-text-muted)]">{t('hero.stack')}</p>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t('hero.location')}</p>

      <div className="absolute inset-x-0 bottom-8 flex justify-center text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
        {t('hero.scrollHint')}
      </div>
    </section>
  )
}
