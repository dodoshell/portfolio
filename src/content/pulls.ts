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
  {
    repo: 'ludo-technologies/pyscn',
    number: 874,
    fallback: { title: 'fix(complexity): point the nesting suggestion at the deepest block', state: 'merged', stars: 1100 },
    summary: {
      en: 'For deeply nested functions, the hint “identify the deepest nested block at line N” always pointed at the def line. It now points at the block that is actually nested deepest.',
      it: 'Per le funzioni molto annidate, il suggerimento “identifica il blocco più annidato alla riga N” indicava sempre la riga del def. Ora indica il blocco davvero più annidato.',
    },
  },
  {
    repo: 'RailtownAI/railtracks',
    number: 1765,
    fallback: { title: 'fix(retrieval): replace Chroma records on upsert so stale metadata is dropped', state: 'merged', stars: 235 },
    summary: {
      en: 'Rewriting an entry in a Chroma vector store kept chunk metadata the new version no longer had, so old values came back on read. The record is now replaced as a whole.',
      it: 'Riscrivendo una voce in un vector store Chroma restavano i metadati che la nuova versione non aveva più, e i valori vecchi ricomparivano in lettura. Ora il record viene sostituito per intero.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8212,
    fallback: { title: 'fix(settings): save only edited keys when hiding the raw JSON editor', state: 'merged', stars: 9451 },
    summary: {
      en: 'Hiding the settings JSON editor resent its whole text, which could be older than a field change still being saved, and silently undid it. It now saves only when the editor was edited, and only the keys that changed.',
      it: 'Chiudendo l’editor JSON delle impostazioni veniva reinviato tutto il suo testo, che poteva essere più vecchio di una modifica a un campo ancora in salvataggio, annullandola senza avvisi. Ora salva solo se l’editor è stato modificato, e solo le chiavi cambiate.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8213,
    fallback: { title: 'fix(theme): put the previous theme back when a header save fails', state: 'merged', stars: 9451 },
    summary: {
      en: 'When saving a theme picked from the header failed, the page kept it until the next load quietly switched back. It now puts the previous theme back right away, unless a newer one was chosen in the meantime.',
      it: 'Se il salvataggio di un tema scelto dall’header falliva, la pagina lo teneva finché il caricamento successivo non tornava indietro senza spiegazioni. Ora rimette subito il tema precedente, a meno che nel frattempo non ne sia stato scelto un altro.',
    },
  },
  {
    repo: 'btclib-org/btclib',
    number: 2908,
    fallback: { title: 'obfuscate’s negative-offset refusal quotes the offset through _message_text', state: 'merged', stars: 118 },
    summary: {
      en: 'A huge negative offset made obfuscate raise Python’s own digit-limit ValueError instead of btclib’s error. The message now quotes the offset safely, with a regression test.',
      it: 'Un offset negativo enorme faceva sollevare a obfuscate il ValueError di Python sul limite di cifre invece dell’errore di btclib. Ora il messaggio cita l’offset in modo sicuro, con un test di regressione.',
    },
  },
  {
    repo: 'btclib-org/btclib',
    number: 2909,
    fallback: { title: 'imports_test keeps btclib free of bip32_descriptors imports', state: 'merged', stars: 118 },
    summary: {
      en: 'The import test guarded btclib against importing btclib_wallet but not bip32_descriptors, which also depends on it. It now catches that cycle too.',
      it: 'Il test sugli import impediva a btclib di importare btclib_wallet ma non bip32_descriptors, che dipende anch’esso da btclib. Ora intercetta anche quel ciclo.',
    },
  },
  {
    repo: 'spring-projects/spring-session',
    number: 4150,
    fallback: { title: 'RedisIndexedSessionRepository should remove original session id from expirations on changeSessionId', state: 'open', stars: 1942 },
    summary: {
      en: 'After a session id change, the old id stayed in the Redis expirations set, because it was looked up after the session key had already been renamed. It is now removed before the rename.',
      it: 'Dopo un cambio di id della sessione, il vecchio id restava nell’insieme delle scadenze su Redis, perché veniva cercato dopo aver già rinominato la chiave. Ora viene rimosso prima della rinomina.',
    },
  },
  {
    repo: 'pmd/pmd',
    number: 7280,
    fallback: { title: '[java] Fix #7279: InternalApiUsage false positive in records and enums', state: 'merged', stars: 5524 },
    summary: {
      en: 'The InternalApiUsage rule flagged @VisibleForTesting members used inside their own record or enum, because it only looked for an enclosing class. It now recognises any enclosing type.',
      it: 'La regola InternalApiUsage segnalava i membri @VisibleForTesting usati dentro il loro stesso record o enum, perché cercava solo una classe contenitore. Ora riconosce qualsiasi tipo contenitore.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8238,
    fallback: { title: 'fix(auth): send the same 503 body from the middleware and require_auth', state: 'merged', stars: 9487 },
    summary: {
      en: 'When the session could not be checked, the request was refused with a 503 whose body depended on which check refused it, so a client retrying had to look for two different fields. Both checks now send the same body.',
      it: 'Quando non si riusciva a verificare la sessione, la richiesta veniva rifiutata con un 503 il cui contenuto dipendeva da quale controllo la rifiutava, e un client che riprovava doveva cercare due campi diversi. Ora i due controlli mandano la stessa risposta.',
    },
  },
  {
    repo: 'mojohaus/flatten-maven-plugin',
    number: 562,
    fallback: { title: 'Resolve parent and imported POMs from repositories declared in the POM chain', state: 'merged', stars: 224 },
    summary: {
      en: 'The plugin ignored the repositories that a parent POM or an imported BOM declares, so it failed on projects that Maven itself builds fine. Those repositories are now used to resolve the rest of the chain.',
      it: 'Il plugin ignorava i repository dichiarati da un POM padre o da un BOM importato, e falliva su progetti che Maven compila senza problemi. Ora quei repository vengono usati per risolvere il resto della catena.',
    },
  },
  {
    repo: 'haydenbleasel/ultracite',
    number: 864,
    fallback: { title: 'Keep core first and anti-slop last when init updates oxlint extends', state: 'open', stars: 3367 },
    summary: {
      en: 'Re-running init after the imports had been sorted put the core preset after anti-slop in the oxlint config, so core turned back on rules anti-slop disables. init now keeps core first and anti-slop last.',
      it: 'Rilanciare init dopo l’ordinamento degli import metteva il preset core dopo anti-slop nella config di oxlint, e core riattivava le regole che anti-slop disattiva. Ora init lascia core per primo e anti-slop per ultimo.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8274,
    fallback: { title: 'fix(security): run the added log patterns on bytes and keys in extra', state: 'merged', stars: 9501 },
    summary: {
      en: 'A credential passed to a log call as bytes or as a dictionary key in extra was checked against fewer patterns than the message itself, so some shapes reached the logs unredacted. Bytes and keys now go through the same redaction as the message.',
      it: 'Una credenziale passata a una chiamata di log come bytes o come chiave di un dizionario in extra veniva controllata con meno pattern del messaggio stesso, e alcune forme finivano nei log in chiaro. Ora bytes e chiavi passano per la stessa redazione del messaggio.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8275,
    fallback: { title: 'fix(security): run the added log patterns on stripped exception text', state: 'open', stars: 9501 },
    summary: {
      en: 'An API key in an exception message stayed visible in the logged traceback when a control or invisible character followed it. The exception text is now checked both with and without those characters.',
      it: 'Una chiave API nel messaggio di un’eccezione restava visibile nel traceback registrato quando era seguita da un carattere di controllo o invisibile. Ora il testo dell’eccezione viene controllato sia con sia senza quei caratteri.',
    },
  },
  {
    repo: 'btclib-org/btclib',
    number: 2915,
    fallback: { title: 'conf.py’s BLOB names main, the default branch', state: 'merged', stars: 121 },
    summary: {
      en: 'The source links in the documentation pointed at the master branch, which the repository no longer uses. They now point at main.',
      it: 'I link al sorgente nella documentazione puntavano al branch master, che il repository non usa più. Ora puntano a main.',
    },
  },
  {
    repo: 'floci-io/floci-az',
    number: 630,
    fallback: { title: 'fix(containerapps): report a managed environment’s customDomainVerificationId', state: 'merged', stars: 846 },
    summary: {
      en: 'The emulator’s Container Apps environments had no customDomainVerificationId, a field Azure clients read after creating one. Each environment now reports a stable value for it.',
      it: 'Gli ambienti Container Apps dell’emulatore non avevano customDomainVerificationId, un campo che i client Azure leggono dopo averne creato uno. Ora ogni ambiente riporta un valore stabile.',
    },
  },
  {
    repo: 'floci-io/floci-az',
    number: 631,
    fallback: { title: 'fix(blob): answer Append Block with Last-Modified and x-ms-request-server-encrypted', state: 'merged', stars: 846 },
    summary: {
      en: 'Appending to a blob in the emulator returned a response without the Last-Modified and x-ms-request-server-encrypted headers that Azure Storage sends. They are now included, with the same time the blob stores.',
      it: 'Aggiungere dati a un blob nell’emulatore dava una risposta senza le intestazioni Last-Modified e x-ms-request-server-encrypted che Azure Storage invia. Ora ci sono, con lo stesso orario salvato nel blob.',
    },
  },
  {
    repo: 'The-PR-Agent/pr-agent',
    number: 4810,
    fallback: { title: 'fix(security): redact generic password and token assignments', state: 'merged', stars: 15684 },
    summary: {
      en: 'Before CI logs reach the model, PR-Agent hides credentials in them, but a plain DB_PASSWORD=…, password: …, secret=… or token=… went through untouched. These assignments are now redacted too.',
      it: 'Prima di passare i log della CI al modello, PR-Agent nasconde le credenziali, ma un semplice DB_PASSWORD=…, password: …, secret=… o token=… passava così com’era. Ora anche queste assegnazioni vengono oscurate.',
    },
  },
  {
    repo: 'open-constructs/cdk-terrain',
    number: 592,
    fallback: { title: 'fix(lib): render replaceTriggeredBy references without interpolation', state: 'open', stars: 281 },
    summary: {
      en: 'A resource listed in replaceTriggeredBy was written as "${…}", which Terraform rejects in that field, so the generated configuration failed to validate. References are now written the way Terraform expects.',
      it: 'Una risorsa indicata in replaceTriggeredBy veniva scritta come "${…}", che Terraform rifiuta in quel campo, quindi la configurazione generata non passava la validazione. Ora i riferimenti sono scritti come Terraform se li aspetta.',
    },
  },
  {
    repo: 'floci-io/floci-az',
    number: 649,
    fallback: { title: 'fix(containerapps): drop an empty keyVaultUrl from a plain secret', state: 'merged', stars: 896 },
    summary: {
      en: 'Terraform sends an empty Key Vault URL with every plain Container Apps secret, and the emulator stored it as sent, so the secret read back without its value and every plan tried to set it again. Blank Key Vault fields are now dropped, while real Key Vault references are kept.',
      it: 'Terraform manda un URL Key Vault vuoto con ogni secret normale delle Container Apps, e l’emulatore lo salvava così, quindi il secret tornava indietro senza valore e ogni plan provava a reimpostarlo. Ora i campi Key Vault vuoti vengono tolti, mentre i riferimenti Key Vault veri restano.',
    },
  },
  {
    repo: 'ArcadeData/arcadedb',
    number: 11466,
    fallback: { title: 'fix(#11447): apply declared argument defaults and reject omitted non-null arguments on the plain GraphQL path', state: 'open', stars: 1248 },
    summary: {
      en: 'A GraphQL query that left out an argument with a declared default, or a required one, silently lost that filter and returned every record of the type. The default is now applied, and a missing required argument is an error.',
      it: 'Una query GraphQL che ometteva un argomento con un valore di default dichiarato, o uno obbligatorio, perdeva quel filtro senza avvisare e restituiva tutti i record del tipo. Ora il default viene applicato e un argomento obbligatorio mancante dà errore.',
    },
  },
  {
    repo: 'doobidoo/mcp-memory-service',
    number: 1932,
    fallback: { title: 'fix(startup): accept the ONNX backend in the dependency check (#1930)', state: 'merged', stars: 2103 },
    summary: {
      en: 'Every start of the lightweight ONNX install warned that PyTorch was missing, doubled the startup timeout and suggested an install script that pip users do not have. The check now accepts either embedding backend and points at the right pip command.',
      it: 'Ogni avvio del pacchetto leggero basato su ONNX avvisava che mancava PyTorch, raddoppiava il timeout di avvio e suggeriva uno script di installazione che chi usa pip non ha. Ora il controllo accetta entrambi i backend di embedding e indica il comando pip giusto.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8511,
    fallback: { title: 'fix(search): warn once per research about a blocked SearXNG URL and log engine construction at DEBUG', state: 'merged', stars: 9556 },
    summary: {
      en: 'A research run with SearXNG pointed at a blocked private URL repeated the same warning, and the engine construction lines, at every search step. The warning now appears once per research and URL, and the construction details moved to DEBUG.',
      it: 'Una ricerca con SearXNG puntato a un URL privato bloccato ripeteva lo stesso avviso, e le righe di costruzione del motore, a ogni passo di ricerca. Ora un solo avviso per ricerca e URL, e i dettagli di costruzione sono passati a DEBUG.',
    },
  },
  {
    repo: 'LearningCircuit/local-deep-research',
    number: 8532,
    fallback: { title: 'fix(search): describe what clearing the warned-URL set costs, and test it', state: 'open', stars: 9555 },
    summary: {
      en: 'Follow-up to #8511: the code comment and the changelog now say that after 256 blocked URLs the warning can appear once more for each of them, and new tests pin that limit, the behaviour outside a research run and the DEBUG level of the construction line.',
      it: 'Seguito della #8511: il commento nel codice e il changelog ora dicono che dopo 256 URL bloccati l’avviso può ricomparire una volta per ciascuno, e nuovi test fissano quel limite, il comportamento fuori da una ricerca e il livello DEBUG della riga di costruzione.',
    },
  },
]
