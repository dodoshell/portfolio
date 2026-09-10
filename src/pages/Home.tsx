import { useTranslation } from 'react-i18next'

import { Nav } from '@/components/layout/Nav'

const PLACEHOLDER_SECTIONS = ['about', 'timeline', 'skills', 'projects', 'contact'] as const

export default function Home(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <>
      <Nav />
      <main>
        <section id="top" className="flex min-h-dvh scroll-mt-20 flex-col justify-center px-6">
          <h1 className="font-[var(--font-display)] text-[length:var(--fs-hero)] leading-[1.05]">
            Odoardo Ramanucci
          </h1>
          <p className="mt-4 max-w-xl text-[var(--color-text-muted)]">Full Stack Developer</p>
        </section>

        {PLACEHOLDER_SECTIONS.map((section) => (
          <section
            key={section}
            id={section}
            aria-labelledby={`${section}-heading`}
            className="scroll-mt-20 px-6 py-24"
          >
            <h2 id={`${section}-heading`} className="text-[length:var(--fs-h2)]">
              {t(`nav.${section}`)}
            </h2>
          </section>
        ))}
      </main>
    </>
  )
}
