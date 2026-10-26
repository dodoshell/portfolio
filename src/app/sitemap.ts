import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { locales } from '@/i18n/dictionaries'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...projects.map((project) => `/work/${project.slug}`)]
  return paths.map((path) => ({
    url: `${siteUrl}/en${path}`,
    alternates: { languages: Object.fromEntries(locales.map((lang) => [lang, `${siteUrl}/${lang}${path}`])) },
  }))
}
