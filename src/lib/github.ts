import { cacheLife } from 'next/cache'
import { pullNotes, type PullNote, type PullState } from '@/content/pulls'

export type Pull = {
  repo: string
  number: number
  url: string
  title: string
  state: PullState
  stars: number
  summary: PullNote['summary']
}

const headers: HeadersInit = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

async function github<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) throw new Error(`GitHub ${path} answered ${response.status}`)
  return response.json() as Promise<T>
}

type SearchItem = {
  number: number
  title: string
  state: 'open' | 'closed'
  repository_url: string
  pull_request: { merged_at: string | null }
}

type Repo = { stargazers_count: number }

const toState = (item: SearchItem): PullState =>
  item.pull_request.merged_at ? 'merged' : item.state === 'open' ? 'open' : 'closed'

const fallback = (note: PullNote): Pull => ({
  repo: note.repo,
  number: note.number,
  url: `https://github.com/${note.repo}/pull/${note.number}`,
  ...note.fallback,
  summary: note.summary,
})

// Only pull requests with a note are shown, in the order of pullNotes, so a
// new PR appears once it has a summary worth reading.
export async function getPulls(): Promise<Pull[]> {
  'use cache'
  cacheLife('hours')

  try {
    const search = await github<{ items: SearchItem[] }>(
      '/search/issues?q=author:dodoshell+type:pr+-user:dodoshell&per_page=100',
    )
    const repos = [...new Set(pullNotes.map((note) => note.repo))]
    const stars = new Map(
      await Promise.all(
        repos.map(async (repo) => [repo, (await github<Repo>(`/repos/${repo}`)).stargazers_count] as const),
      ),
    )

    return pullNotes.map((note) => {
      const item = search.items.find(
        (candidate) => candidate.number === note.number && candidate.repository_url.endsWith(`/repos/${note.repo}`),
      )
      if (!item) return fallback(note)
      return {
        ...fallback(note),
        title: item.title,
        state: toState(item),
        stars: stars.get(note.repo) ?? note.fallback.stars,
      }
    })
  } catch (error) {
    console.warn('Using the pull request snapshot:', error)
    return pullNotes.map(fallback)
  }
}
