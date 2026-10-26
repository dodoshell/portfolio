import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { getProject, projects } from '@/content/projects'
import { getDictionary, isLocale, locales } from '@/i18n/dictionaries'

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/work/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!isLocale(lang) || !project) return {}
  return {
    title: project.name,
    description: project.tagline[lang],
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, it: `/it/work/${slug}` },
    },
    openGraph: { images: [project.image.src] },
  }
}

export default async function CaseStudy({ params }: PageProps<'/[lang]/work/[slug]'>) {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!isLocale(lang) || !project) notFound()
  const dict = getDictionary(lang)
  const next = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <article data-shell={project.slug} className="px-5 pt-32 pb-20 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Link href={`/${lang}#work`} className="text-mist transition-colors hover:text-nacre">
          {dict.caseStudy.back}
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <ViewTransition name={`title-${project.slug}`}>
              <h1 className="display w-fit text-[clamp(3.5rem,11vw,9rem)] font-extrabold">{project.name}</h1>
            </ViewTransition>
            <p className="mt-6 max-w-[36ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-nacre/90">
              {project.tagline[lang]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <a
              href={project.demoUrl}
              className="rounded-full bg-nacre px-6 py-3 font-medium text-abyss transition-transform hover:scale-[1.03]"
            >
              {dict.work.demo}
            </a>
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                className="rounded-full border border-nacre/25 px-6 py-3 transition-colors hover:border-iris/70"
              >
                {dict.work.source}
              </a>
            ) : (
              <p className="px-2 py-3 text-sm text-mist">{dict.work.privateSource}</p>
            )}
          </div>
        </header>

        <ViewTransition name={`shot-${project.slug}`}>
          <Image
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt=""
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="mt-14 aspect-[16/10] w-full rounded-2xl border border-nacre/10 object-cover object-top"
          />
        </ViewTransition>

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <section className="md:col-span-7">
            <h2 className="text-sm text-mist">{dict.caseStudy.problem}</h2>
            <p className="mt-4 text-[clamp(1.2rem,2vw,1.5rem)] leading-relaxed">{project.problem[lang]}</p>
          </section>
          <dl className="grid content-start gap-8 md:col-span-4 md:col-start-9">
            <div>
              <dt className="text-sm text-mist">{dict.caseStudy.status}</dt>
              <dd className="mt-2">{project.status[lang]}</dd>
            </div>
            <div>
              <dt className="text-sm text-mist">{dict.caseStudy.stack}</dt>
              <dd className="mt-2">{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt className="sr-only">Facts</dt>
              {project.facts.map((fact) => (
                <dd key={fact.en} className="border-t border-nacre/10 py-3 first:border-t-0 first:pt-0">
                  {fact[lang]}
                </dd>
              ))}
            </div>
          </dl>
        </div>

        <section className="mt-28">
          <h2 className="display text-[clamp(2.25rem,5vw,4rem)] font-bold">{dict.caseStudy.decisions}</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {project.decisions.map((decision) => (
              <div key={decision.title.en} className="border-t border-nacre/15 pt-6">
                <h3 className="text-xl leading-snug font-semibold">{decision.title[lang]}</h3>
                <p className="mt-4 text-mist">{decision.body[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <h2 className="display text-[clamp(2.25rem,5vw,4rem)] font-bold">{dict.caseStudy.code}</h2>
          <p className="mt-4 max-w-2xl text-mist">{project.code.caption[lang]}</p>
          <div className="mt-10">
            <CodeBlock source={project.code.source} lang={project.code.lang} path={project.code.path} />
          </div>
        </section>

        <Link
          href={`/${lang}/work/${next.slug}`}
          className="group mt-32 flex flex-col gap-2 border-t border-nacre/15 pt-10"
        >
          <span className="text-mist">{dict.caseStudy.next}</span>
          <span className="display text-[clamp(2.75rem,8vw,6rem)] font-extrabold transition-colors group-hover:text-iris">
            {next.name}
          </span>
        </Link>
      </div>
    </article>
  )
}
