export const locales = ['en', 'it'] as const
export type Locale = (typeof locales)[number]

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

const en = {
  meta: {
    title: 'dodoshell, full-stack developer',
    description:
      'Products shipped end to end and bug fixes merged into other people’s open source projects. Java, TypeScript, Python.',
  },
  nav: {
    work: 'Work',
    upstream: 'Open source',
    process: 'Method',
    contact: 'Contact',
    otherLocale: 'Italiano',
  },
  hero: {
    role: 'Full-stack developer',
    line: 'I build products end to end, and I fix bugs in other people’s code.',
    cta: 'See the work',
    availability: 'Open to full-time roles and freelance projects',
  },
  work: {
    heading: 'Things I built',
    intro: 'Four products, from the database schema to the last pixel. Each one is live.',
    caseStudy: 'Read the case study',
    demo: 'Open the live demo',
    source: 'Source code',
    privateSource: 'Source available on request',
  },
  caseStudy: {
    back: 'All work',
    problem: 'The problem',
    decisions: 'Decisions worth explaining',
    code: 'A piece of the code',
    stack: 'Stack',
    status: 'Status',
    next: 'Next project',
  },
  upstream: {
    heading: 'Fixes in other people’s code',
    intro:
      'I pick open issues in projects I don’t maintain, reproduce them, and send a fix with tests. The list below comes straight from GitHub.',
    merged: 'Merged',
    open: 'In review',
    closed: 'Closed',
    stars: 'stars',
    viewPr: 'View the pull request',
  },
  process: {
    heading: 'How I work on a bug',
    steps: [
      {
        title: 'Reproduce it',
        body: 'A bug I can’t trigger on demand is a bug I can’t prove I fixed. First a script, a test or a number that shows it.',
      },
      {
        title: 'Find the cause, not the symptom',
        body: 'The torch thread leak looked like a Flask problem. It wasn’t, and fixing Flask would have hidden it for a while.',
      },
      {
        title: 'Change as little as possible',
        body: 'Maintainers review the diff, not the intent. Small, focused changes in the project’s own style get merged.',
      },
      {
        title: 'Leave a test behind',
        body: 'Every fix ships with the test that would have caught it, so the bug can’t come back quietly.',
      },
    ],
  },
  contact: {
    heading: 'Have something to build or fix?',
    body: 'I’m looking for a team to join or a project to take on. You can find me and my work on GitHub.',
    github: 'Find me on GitHub',
    email: 'Write me an email',
  },
  footer: {
    built: 'Built with Next.js and three.js. The source of this site is public.',
    source: 'View the source',
  },
}

export type Dictionary = typeof en

const it: Dictionary = {
  meta: {
    title: 'dodoshell, sviluppatore full-stack',
    description:
      'Prodotti costruiti da cima a fondo e correzioni accettate in progetti open source di altri. Java, TypeScript, Python.',
  },
  nav: {
    work: 'Lavori',
    upstream: 'Open source',
    process: 'Metodo',
    contact: 'Contatti',
    otherLocale: 'English',
  },
  hero: {
    role: 'Sviluppatore full-stack',
    line: 'Costruisco prodotti da cima a fondo, e sistemo bug nel codice degli altri.',
    cta: 'Guarda i lavori',
    availability: 'Disponibile per assunzioni e progetti freelance',
  },
  work: {
    heading: 'Cose che ho costruito',
    intro: 'Quattro prodotti, dallo schema del database all’ultimo pixel. Sono tutti online.',
    caseStudy: 'Leggi il caso di studio',
    demo: 'Apri la demo',
    source: 'Codice sorgente',
    privateSource: 'Codice disponibile su richiesta',
  },
  caseStudy: {
    back: 'Tutti i lavori',
    problem: 'Il problema',
    decisions: 'Le scelte che vale la pena spiegare',
    code: 'Un pezzo del codice',
    stack: 'Stack',
    status: 'Stato',
    next: 'Progetto successivo',
  },
  upstream: {
    heading: 'Correzioni nel codice degli altri',
    intro:
      'Scelgo issue aperte in progetti che non mantengo, le riproduco e mando una correzione con i test. L’elenco qui sotto arriva direttamente da GitHub.',
    merged: 'Accettata',
    open: 'In revisione',
    closed: 'Chiusa',
    stars: 'stelle',
    viewPr: 'Apri la pull request',
  },
  process: {
    heading: 'Come lavoro su un bug',
    steps: [
      {
        title: 'Riprodurlo',
        body: 'Un bug che non so far comparire a comando è un bug che non posso dimostrare di aver risolto. Prima uno script, un test o un numero che lo mostri.',
      },
      {
        title: 'Trovare la causa, non il sintomo',
        body: 'Il leak di thread di torch sembrava un problema di Flask. Non lo era, e correggere Flask lo avrebbe solo nascosto per un po’.',
      },
      {
        title: 'Cambiare il meno possibile',
        body: 'Chi mantiene un progetto rivede il diff, non le intenzioni. Modifiche piccole, mirate e nello stile del progetto vengono accettate.',
      },
      {
        title: 'Lasciare un test',
        body: 'Ogni correzione arriva con il test che l’avrebbe scoperta, così il bug non può tornare in silenzio.',
      },
    ],
  },
  contact: {
    heading: 'Hai qualcosa da costruire o da sistemare?',
    body: 'Cerco un team in cui entrare o un progetto da prendere in mano. Mi trovi su GitHub, insieme a tutto il mio lavoro.',
    github: 'Trovami su GitHub',
    email: 'Scrivimi una email',
  },
  footer: {
    built: 'Fatto con Next.js e three.js. Il codice di questo sito è pubblico.',
    source: 'Guarda il codice',
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, it }

export const getDictionary = (locale: Locale) => dictionaries[locale]
