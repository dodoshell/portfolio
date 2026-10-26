import { cacheLife } from 'next/cache'
import { codeToHtml } from 'shiki'

async function highlight(source: string, lang: string) {
  'use cache'
  cacheLife('max')
  return codeToHtml(source, { lang, theme: 'poimandres' })
}

export async function CodeBlock({ source, lang, path }: { source: string; lang: string; path: string }) {
  const html = await highlight(source, lang)
  return (
    <figure className="overflow-hidden rounded-2xl border border-nacre/10 bg-deep/70 backdrop-blur-md">
      <figcaption className="border-b border-nacre/10 px-6 py-3 font-mono text-xs text-mist">{path}</figcaption>
      <div className="code" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )
}
