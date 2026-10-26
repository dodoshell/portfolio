// Each section of the site can ask the shell for its own colours by setting
// data-shell="<name>" on its root element. Unknown names fall back to "nacre".
export type ShellPalette = {
  colors: [string, string, string]
  // Horizontal resting position on wide screens, in scene units.
  x: number
  // How much the surface boils: 0 is a calm pearl, 1 is restless.
  turbulence: number
}

export const palettes: Record<string, ShellPalette> = {
  nacre: { colors: ['#a898ff', '#7fe3d6', '#f4a8c8'], x: 1.6, turbulence: 0.55 },
  work: { colors: ['#8b7bff', '#5fd4e8', '#e3b5ff'], x: -1.6, turbulence: 0.35 },
  upstream: { colors: ['#6ee7b7', '#7fe3d6', '#a3b8ff'], x: 1.7, turbulence: 0.8 },
  process: { colors: ['#a898ff', '#c4b5fd', '#7fe3d6'], x: -1.7, turbulence: 0.25 },
  contact: { colors: ['#f4a8c8', '#a898ff', '#ffd6a5'], x: 0, turbulence: 0.6 },
  poltrona: { colors: ['#e9b384', '#f4a8c8', '#b89cff'], x: 2.3, turbulence: 0.4 },
  'sconti-nova': { colors: ['#ff9a5a', '#ffd166', '#f4a8c8'], x: 2.3, turbulence: 0.55 },
  corsia: { colors: ['#ffd166', '#7fe3d6', '#8fa8ff'], x: 2.3, turbulence: 0.45 },
  iter: { colors: ['#7fe3d6', '#6ea8ff', '#c5b8ff'], x: 2.3, turbulence: 0.3 },
}

export const getPalette = (name: string | undefined) => palettes[name ?? ''] ?? palettes.nacre
