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
    repo: 'The-PR-Agent/pr-agent',
    number: 4425,
    fallback: { title: 'fix(litellm): make the handler the only retry layer', state: 'merged', stars: 13645 },
    summary: {
      en: 'Rate limits and server errors were retried by two layers at once, so attempts multiplied and waits were unpredictable. Retries now live in one place, honour Retry-After up to 30 s and are measured per error type.',
      it: 'Limiti di richieste ed errori del server venivano ritentati da due livelli insieme, così i tentativi si moltiplicavano e le attese erano imprevedibili. Ora i tentativi stanno in un solo punto, rispettano Retry-After fino a 30 s e sono misurati per ogni tipo di errore.',
    },
  },
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
    repo: 'btclib-org/btclib',
    number: 2821,
    fallback: { title: 'assert_p2tr’s refusal names witness version 1, and test_p2tr covers four bad shapes', state: 'merged', stars: 113 },
    summary: {
      en: 'The Taproot check refused bad scripts with a message naming the wrong witness version. The message is fixed, and four malformed scripts, including one Bitcoin Core just started rejecting, are now tested.',
      it: 'Il controllo Taproot rifiutava gli script errati con un messaggio che indicava la versione witness sbagliata. Il messaggio è corretto, e ora sono testati quattro script malformati, compreso uno che Bitcoin Core ha appena iniziato a rifiutare.',
    },
  },
  {
    repo: 'doobidoo/mcp-memory-service',
    number: 1676,
    fallback: { title: 'fix(web): save the dashboard’s Quality tab settings', state: 'merged', stars: 2046 },
    summary: {
      en: 'The dashboard’s Quality tab looked editable but saved nothing. It now has an admin-only endpoint, writes the settings and shows the real values.',
      it: 'La scheda Quality della dashboard sembrava modificabile ma non salvava niente. Ora ha un endpoint riservato agli admin, scrive le impostazioni e mostra i valori reali.',
    },
  },
  {
    repo: 'ludo-technologies/pyscn',
    number: 865,
    fallback: { title: 'fix(lcom): don’t count inherited calls as variables', state: 'merged', stars: 1096 },
    summary: {
      en: 'The LCOM4 cohesion metric gave different answers for self.m() and super().m(). Inherited calls are now treated the same way in both spellings.',
      it: 'La metrica di coesione LCOM4 dava risultati diversi per self.m() e super().m(). Ora le chiamate ereditate sono trattate allo stesso modo in entrambe le forme.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 7886,
    fallback: { title: 'test(zotero): cover the inline collection picker behaviour', state: 'merged', stars: 9409 },
    summary: {
      en: 'Behaviour tests for the Zotero collection picker, run against the real page runtime: restoring saved keys, autosave and the “entire library” option.',
      it: 'Test di comportamento per il selettore di collezioni Zotero, sul vero runtime della pagina: ripristino delle chiavi salvate, salvataggio automatico e l’opzione “intera libreria”.',
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
    number: 866,
    fallback: { title: 'fix(srp): count sibling modules as one concern', state: 'merged', stars: 1097 },
    summary: {
      en: 'The single-responsibility rule flagged a facade importing four sibling modules as mixing four concerns, while the same imports raised the package’s cohesion. Siblings now count as one concern.',
      it: 'La regola di singola responsabilità segnalava una facciata che importa quattro moduli fratelli come se mescolasse quattro responsabilità, mentre gli stessi import alzavano la coesione del pacchetto. Ora i fratelli contano come una sola.',
    },
  },
  {
    repo: 'RailtownAI/railtracks',
    number: 1734,
    fallback: { title: 'fix(llm): accept local .avif attachments like base64 AVIF', state: 'merged', stars: 234 },
    summary: {
      en: 'A local .avif file was rejected while the same image as base64 was accepted. Local files, URLs and base64 now agree on the type.',
      it: 'Un file .avif locale veniva rifiutato, mentre la stessa immagine in base64 era accettata. Ora file locali, URL e base64 riconoscono lo stesso tipo.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8124,
    fallback: { title: 'fix(pdf): render a table that directly follows text as a table', state: 'merged', stars: 9451 },
    summary: {
      en: 'A table written right under a line of text showed up in the PDF export as raw pipe text, while the report view drew it as a table. The PDF now renders it as a table too, without touching pipes inside code blocks.',
      it: 'Una tabella scritta subito sotto una riga di testo finiva nel PDF esportato come testo con le barre verticali, mentre la vista del report la mostrava come tabella. Ora anche il PDF la rende come tabella, senza toccare le barre dentro i blocchi di codice.',
    },
  },
]
