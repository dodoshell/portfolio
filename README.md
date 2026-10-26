# portfolio

The source of my portfolio: the products I've built and the fixes I've sent to other people's open source projects.

- Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind 4
- The shell in the background is a three.js mesh with a custom shader (simplex-noise displacement and a thin-film colour shift). It falls back to a CSS gradient when WebGL is missing, on devices with fewer than four cores, and stays still with `prefers-reduced-motion`.
- The open source list reads pull request status and star counts from the GitHub API at build time, cached for an hour, with a snapshot in `src/content/pulls.ts` if GitHub can't be reached.
- English and Italian, chosen from the browser language on `/`.

## Run it

```sh
pnpm install
pnpm dev
```

Optional environment variables:

- `GITHUB_TOKEN`: raises the GitHub API rate limit during builds.
- `NEXT_PUBLIC_CONTACT_EMAIL`: shows an email button in the contact section.

## Content

Projects live in `src/content/projects.ts`, pull request summaries in `src/content/pulls.ts`, interface copy in `src/i18n/dictionaries.ts`.
