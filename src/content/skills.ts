export type SkillGroupId = 'languages' | 'backend' | 'frontend' | 'database' | 'tools'

export interface SkillGroup {
  id: SkillGroupId
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { id: 'languages', items: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'Python'] },
  { id: 'backend', items: ['Spring Boot', 'Spring Data JPA', 'REST API'] },
  { id: 'frontend', items: ['React', 'TypeScript', 'HTML', 'CSS'] },
  { id: 'database', items: ['PostgreSQL', 'MongoDB'] },
  { id: 'tools', items: ['Git', 'Docker', 'Postman', 'Agile/Scrum', 'CI/CD (GitHub Actions)'] },
]

export const personalProjectSkills = ['Python', 'Vue.js']
