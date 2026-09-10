export interface Translations {
  meta: {
    title: string
    description: string
  }
  nav: {
    about: string
    timeline: string
    skills: string
    projects: string
    contact: string
    openMenu: string
    close: string
  }
  hero: {
    role: string
    stack: string
    location: string
    scrollHint: string
  }
  about: {
    heading: string
    bio: string
  }
  timeline: {
    heading: string
  }
  skills: {
    heading: string
    groups: {
      languages: string
      backend: string
      frontend: string
      database: string
      tools: string
    }
    personalProjects: string
  }
  projects: {
    heading: string
    viewCase: string
    repository: string
    problemLabel: string
    decisionsLabel: string
    codeLabel: string
    retrospectiveLabel: string
    close: string
  }
  contact: {
    heading: string
    intro: string
    copy: string
    copied: string
    github: string
    linkedin: string
  }
}
