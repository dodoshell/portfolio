// Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every build; locally we fall back to the dev server.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const githubUrl = 'https://github.com/dodoshell'
export const sourceUrl = 'https://github.com/dodoshell/portfolio'

// Left empty on purpose until there is an address meant for this profile.
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
