import type { Locale } from '@/i18n/dictionaries'

export type PullState = 'merged' | 'open' | 'closed'

// What each pull request fixed, in plain words. Titles, status and star counts
// come from GitHub at build time (see lib/github.ts); this file only holds the
// part GitHub can't tell: why the change mattered.
export type PullNote = {
  repo: string
  number: number
  // Used only when GitHub can't be reached during the build.
  fallback: { title: string; state: PullState; stars: number }
  summary: Record<Locale, string>
}

export const pullNotes: PullNote[] = [
  {
    repo: 'doobidoo/mcp-memory-service',
    number: 1648,
    fallback: { title: 'feat(codex): report memory load and save status through systemMessage', state: 'merged', stars: 2046 },
    summary: {
      en: 'Codex users had no way to tell whether memories loaded or saved. The hooks now report one status line per run, including the cached fallback.',
      it: 'Chi usa Codex non poteva sapere se le memorie venivano caricate o salvate. Ora gli hook mostrano una riga di stato a ogni esecuzione, compreso il ripiego sulla cache.',
    },
  },
  {
    repo: 'btclib-org/btclib',
    number: 2776,
    fallback: { title: 'Test the two sig_ops boundaries no case reached', state: 'merged', stars: 113 },
    summary: {
      en: 'Two boundaries in Bitcoin signature-operation counting had no test reaching them. Each new case fails if its boundary moves by one opcode.',
      it: 'Due confini nel conteggio delle operazioni di firma Bitcoin non erano raggiunti da nessun test. Ogni nuovo caso fallisce se il suo confine si sposta di un opcode.',
    },
  },
  {
    repo: 'doobidoo/mcp-memory-service',
    number: 1676,
    fallback: { title: 'fix(web): save the dashboard’s Quality tab settings', state: 'open', stars: 2046 },
    summary: {
      en: 'The dashboard’s Quality tab looked editable but saved nothing. It now has an admin-only endpoint, writes the settings and shows the real values.',
      it: 'La scheda Quality della dashboard sembrava modificabile ma non salvava niente. Ora ha un endpoint riservato agli admin, scrive le impostazioni e mostra i valori reali.',
    },
  },
  {
    repo: 'Rizzo-AI-Academy/rizzo-pii',
    number: 141,
    fallback: { title: 'fix(app): stop leaking a torch thread pool per request on Windows', state: 'open', stars: 1219 },
    summary: {
      en: 'On Windows every request leaked a torch thread pool: 300 requests took the server from 91 to 4,576 threads. The cause was torch, not Flask.',
      it: 'Su Windows ogni richiesta lasciava vivo un pool di thread di torch: 300 richieste portavano il server da 91 a 4.576 thread. La causa era torch, non Flask.',
    },
  },
  {
    repo: 'ludo-technologies/pyscn',
    number: 865,
    fallback: { title: 'fix(lcom): don’t count inherited calls as variables', state: 'open', stars: 1096 },
    summary: {
      en: 'The LCOM4 cohesion metric gave different answers for self.m() and super().m(). Inherited calls are now treated the same way in both spellings.',
      it: 'La metrica di coesione LCOM4 dava risultati diversi per self.m() e super().m(). Ora le chiamate ereditate sono trattate allo stesso modo in entrambe le forme.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 7886,
    fallback: { title: 'test(zotero): cover the inline collection picker behaviour', state: 'open', stars: 9409 },
    summary: {
      en: 'Behaviour tests for the Zotero collection picker, run against the real page runtime: restoring saved keys, autosave and the “entire library” option.',
      it: 'Test di comportamento per il selettore di collezioni Zotero, sul vero runtime della pagina: ripristino delle chiavi salvate, salvataggio automatico e l’opzione “intera libreria”.',
    },
  },
  {
    repo: 'RailtownAI/railtracks',
    number: 1734,
    fallback: { title: 'fix(llm): accept local .avif attachments like base64 AVIF', state: 'open', stars: 234 },
    summary: {
      en: 'A local .avif file was rejected while the same image as base64 was accepted. Local files, URLs and base64 now agree on the type.',
      it: 'Un file .avif locale veniva rifiutato, mentre la stessa immagine in base64 era accettata. Ora file locali, URL e base64 riconoscono lo stesso tipo.',
    },
  },
]
