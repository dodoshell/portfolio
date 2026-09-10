export interface TimelineEntry {
  id: string
  period: string
  title: { it: string; en: string }
  description: { it: string; en: string }
}

export const timeline: TimelineEntry[] = [
  {
    id: 'liceo',
    period: '2014 — 2019',
    title: { it: 'Liceo Scientifico', en: 'Scientific High School' },
    description: {
      it: 'Diploma di maturità scientifica.',
      en: 'Scientific baccalaureate diploma.',
    },
  },
  {
    id: 'generation-italy',
    period: 'Ott 2022 — Feb 2023',
    title: { it: 'Corso Generation Italy', en: 'Generation Italy course' },
    description: {
      it: 'Corso intensivo di formazione da sviluppatore software.',
      en: 'Intensive software developer training course.',
    },
  },
  {
    id: 'coding-camp',
    period: 'Giu 2023 — Ago 2023',
    title: { it: 'Coding Camp, PC Cube', en: 'Coding Camp, PC Cube' },
    description: {
      it: 'Percorso pratico in azienda, su progetti reali.',
      en: 'Hands-on program at the company, working on real projects.',
    },
  },
  {
    id: 'pc-cube',
    period: 'Set 2023 — Set 2026',
    title: { it: 'Full Stack Developer, PC Cube', en: 'Full Stack Developer, PC Cube' },
    description: {
      it: 'Sviluppo full stack con Java, Spring Boot, React e TypeScript.',
      en: 'Full stack development with Java, Spring Boot, React and TypeScript.',
    },
  },
]
