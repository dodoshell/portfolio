import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { timeline } from '@/content/timeline'
import { resolveLocale } from '@/i18n/locale'

gsap.registerPlugin(ScrollTrigger)

export function Timeline(): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const locale = resolveLocale(i18n.language)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return

    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-timeline-item]', section).forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 px-6 py-24"
    >
      <h2 id="timeline-heading" className="[font-family:var(--font-display)] text-[length:var(--fs-h2)]">
        {t('timeline.heading')}
      </h2>
      <div className="relative mt-10 pl-6">
        <div className="absolute inset-y-0 left-0 w-px bg-[var(--color-border)]" aria-hidden="true" />
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 w-px origin-top bg-[var(--color-accent)]"
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {timeline.map((entry) => (
            <li key={entry.id} data-timeline-item>
              <p className="text-sm text-[var(--color-text-muted)]">{entry.period}</p>
              <p className="mt-1 [font-family:var(--font-display)] text-lg font-semibold">{entry.title[locale]}</p>
              <p className="mt-1 text-[var(--color-text-muted)]">{entry.description[locale]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
