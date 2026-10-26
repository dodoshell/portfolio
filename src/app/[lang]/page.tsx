import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense, ViewTransition } from 'react'
import { projects } from '@/content/projects'
import { getDictionary, isLocale, type Dictionary, type Locale } from '@/i18n/dictionaries'
import { getPulls, type Pull } from '@/lib/github'
import { contactEmail, githubUrl } from '@/lib/site'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <Hero dict={dict.hero} />
      <Work lang={lang} dict={dict.work} />
      <Suspense fallback={<UpstreamShell dict={dict.upstream} />}>
        <Upstream lang={lang} dict={dict.upstream} />
      </Suspense>
      <Process dict={dict.process} />
      <Contact dict={dict.contact} />
    </>
  )
}

function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section data-shell="nacre" className="relative flex min-h-dvh items-end px-5 pt-28 pb-16 md:items-center md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-mist">{dict.role}</p>
        <h1 className="display hero-name text-[clamp(4.5rem,17vw,13rem)] font-extrabold">dodoshell</h1>
        <p className="mt-8 max-w-[34ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-nacre/90">{dict.line}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#work"
            className="rounded-full bg-nacre px-7 py-3.5 font-medium text-abyss transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {dict.cta}
          </a>
          <p className="flex items-center gap-2.5 text-sm text-mist">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-iris opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-iris" />
            </span>
            {dict.availability}
          </p>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-14 max-w-2xl md:mb-20">
      <h2 className="display text-[clamp(2.75rem,7vw,5.5rem)] font-bold">{title}</h2>
      <p className="mt-6 text-lg text-mist">{intro}</p>
    </div>
  )
}

function Work({ lang, dict }: { lang: Locale; dict: Dictionary['work'] }) {
  return (
    <section id="work" data-shell="work" className="scroll-mt-20 px-5 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={dict.heading} intro={dict.intro} />
        <ul className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              data-shell={project.slug}
              data-shell-side={index % 2 ? 'right' : 'left'}
              className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
            >
              <Link
                href={`/${lang}/work/${project.slug}`}
                className={`group relative block overflow-hidden rounded-2xl border border-nacre/10 md:col-span-7 ${index % 2 ? 'md:order-2' : ''}`}
              >
                <ViewTransition name={`shot-${project.slug}`}>
                  <Image
                    src={project.image.src}
                    width={project.image.width}
                    height={project.image.height}
                    alt=""
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </ViewTransition>
              </Link>
              <div className="md:col-span-5">
                <ViewTransition name={`title-${project.slug}`}>
                  <h3 className="display w-fit text-[clamp(2.5rem,5vw,4rem)] font-bold">{project.name}</h3>
                </ViewTransition>
                <p className="mt-4 text-xl text-nacre/90">{project.tagline[lang]}</p>
                <p className="mt-4 text-mist">{project.stack.slice(0, 5).join(', ')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/work/${project.slug}`}
                    className="rounded-full bg-nacre px-6 py-3 font-medium text-abyss transition-transform hover:scale-[1.03]"
                  >
                    {dict.caseStudy}
                  </Link>
                  <a
                    href={project.demoUrl}
                    className="rounded-full border border-nacre/25 px-6 py-3 text-nacre transition-colors hover:border-iris/70"
                  >
                    {dict.demo}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const stateStyle: Record<Pull['state'], string> = {
  merged: 'bg-lilac/15 text-lilac',
  open: 'bg-iris/12 text-iris',
  closed: 'bg-mist/15 text-mist',
}

const formatStars = (stars: number, lang: Locale) =>
  new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }).format(stars)

function UpstreamShell({ dict, children }: { dict: Dictionary['upstream']; children?: React.ReactNode }) {
  return (
    <section id="upstream" data-shell="upstream" className="scroll-mt-20 px-5 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={dict.heading} intro={dict.intro} />
        {children}
      </div>
    </section>
  )
}

async function Upstream({ lang, dict }: { lang: Locale; dict: Dictionary['upstream'] }) {
  const pulls = await getPulls()
  const label = { merged: dict.merged, open: dict.open, closed: dict.closed }

  return (
    <UpstreamShell dict={dict}>
      <ul className="border-t border-nacre/10">
        {pulls.map((pull) => (
          <li key={`${pull.repo}#${pull.number}`} className="border-b border-nacre/10">
            <a
              href={pull.url}
              className="group grid gap-x-10 gap-y-3 py-8 transition-colors md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-10"
            >
              <div>
                <p className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${stateStyle[pull.state]}`}>
                    {label[pull.state]}
                  </span>
                  <span className="text-sm text-mist">
                    {formatStars(pull.stars, lang)} {dict.stars}
                  </span>
                </p>
                <p className="display mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold break-words transition-colors group-hover:text-iris">
                  {pull.repo.split('/')[1]}
                  <span className="text-mist"> #{pull.number}</span>
                </p>
                <p className="mt-1 text-sm text-mist">{pull.repo.split('/')[0]}</p>
              </div>
              <div className="md:pt-11">
                <p className="text-nacre/90">{pull.summary[lang]}</p>
                <p className="mt-3 font-mono text-sm text-mist">{pull.title}</p>
                <span className="sr-only">{dict.viewPr}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </UpstreamShell>
  )
}

function Process({ dict }: { dict: Dictionary['process'] }) {
  return (
    <section id="process" data-shell="process" className="scroll-mt-20 px-5 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="display mb-14 max-w-3xl text-[clamp(2.75rem,7vw,5.5rem)] font-bold md:mb-20">{dict.heading}</h2>
        <ol className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {dict.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="display text-4xl font-bold text-lilac">{index + 1}</span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-[46ch] text-mist">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact({ dict }: { dict: Dictionary['contact'] }) {
  return (
    <section id="contact" data-shell="contact" className="scroll-mt-20 px-5 py-32 md:px-8 md:py-44">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="display mx-auto max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-bold">{dict.heading}</h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-mist">{dict.body}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href={githubUrl}
            className="rounded-full bg-nacre px-8 py-4 text-lg font-medium text-abyss transition-transform hover:scale-[1.03]"
          >
            {dict.github}
          </a>
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-full border border-nacre/25 px-8 py-4 text-lg transition-colors hover:border-iris/70"
            >
              {dict.email}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
