import type { Dictionary } from '@/i18n/dictionaries'
import { sourceUrl } from '@/lib/site'

export function Footer({ dict }: { dict: Dictionary['footer'] }) {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-12 text-sm text-mist md:flex-row md:items-center md:justify-between md:px-8">
      <p>{dict.built}</p>
      <a href={sourceUrl} className="underline decoration-mist/40 underline-offset-4 hover:text-nacre">
        {dict.source}
      </a>
    </footer>
  )
}
