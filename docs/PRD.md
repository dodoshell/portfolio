# PRD — Sito portfolio personale

**Committente:** Odoardo Ramanucci — Full Stack Developer
**Versione:** 1.0 · settembre 2026
**Stato:** approvato, pronto per lo sviluppo

---

## 1. Obiettivo

Un sito portfolio che convinca un recruiter tech o un tech lead in meno di trenta secondi che chi l'ha fatto sa scrivere codice front-end di qualità, e che regga a un'ispezione ravvicinata del codice sorgente.

Il sito ha due lettori diversi e va progettato per entrambi:

| Lettore | Cosa cerca | Come glielo diamo |
|---|---|---|
| **Recruiter** (non tecnico, 20-30 secondi) | Ruolo, tecnologie, seniority, come contattarti | Hero leggibile in 3 secondi, stack visibile senza scroll profondo, contatti sempre a portata |
| **Tech lead** (tecnico, 3-5 minuti) | Come ragioni, come scrivi codice, se il "wow" nasconde superficialità | Casi di studio dei progetti con le scelte tecniche, link diretti al codice, e un sito che è esso stesso il campione di codice |

**Il vincolo che governa ogni decisione:** gli effetti devono impressionare senza mai rendere il sito lento, illeggibile o inutilizzabile. Un portfolio che scatta a 20fps su un telefono medio è una prova a carico, non a discarico.

---

## 2. Principi di progetto

1. **Il contenuto è leggibile prima che l'animazione finisca.** Nessun testo importante compare solo a fine transizione.
2. **Ogni effetto ha un fallback.** WebGL che non parte, `prefers-reduced-motion` attivo, JavaScript lento: in tutti i casi il sito resta completo e bello.
3. **Un solo momento "wow" per schermata.** Tre effetti simultanei si annullano a vicenda e sembrano una demo, non un lavoro.
4. **Il codice è parte del portfolio.** Chi guarda il repository deve trovare componenti piccoli, tipizzati e con nomi sensati.
5. **Mobile non è la versione ridotta.** È il 60% del traffico: va progettato, non degradato.

---

## 3. Stack tecnico

Vincolo del committente: **React e librerie, niente framework full-stack** (no Next.js, no Remix). Deploy su Vercel.

### Base

| Scelta | Versione | Motivo |
|---|---|---|
| **React** | 18 | Vincolo di progetto ed è lo stack del committente |
| **TypeScript** | 5.x, `strict: true` | Su un portfolio il tipaggio è esso stesso un segnale di qualità |
| **Vite** | 5.x | Build veloce, Vercel lo riconosce nativamente come progetto statico |
| **react-router-dom** | 6.x | Solo per legare l'URL all'overlay del progetto: il sito resta una pagina sola |

### Animazione

| Libreria | Ruolo | Perché questa |
|---|---|---|
| **Framer Motion** | Transizioni di pagina, entrata degli elementi, micro-interazioni, layout animations | API dichiarativa che si integra col ciclo di vita React, e supporto nativo a `prefers-reduced-motion` |
| **GSAP + ScrollTrigger** | Timeline complesse legate allo scroll (pinning, sequenze, morphing) | Framer Motion sullo scroll avanzato diventa contorto; GSAP è lo standard di settore per questo |
| **Lenis** | Scroll fluido | È ciò che dà la sensazione "costosa"; si sincronizza con ScrollTrigger |

> **Nota di scope:** due librerie di animazione insieme sono giustificate solo se ognuna fa ciò per cui è forte. Non usare GSAP per un fade-in né Framer Motion per una timeline di scroll pinned.

### WebGL (solo hero)

| Libreria | Ruolo |
|---|---|
| **three** | Motore 3D |
| **@react-three/fiber** | Three.js come componenti React |
| **@react-three/drei** | Helper pronti, evita di riscrivere boilerplate |

### Supporto

| Libreria | Ruolo |
|---|---|
| **Tailwind CSS v4** | Layout e spaziature. Le animazioni complesse restano in CSS/JS dedicato: Tailwind serve a non perdere tempo sulla griglia, non a fare tutto |
| **react-i18next** + `i18next-browser-languagedetector` | Bilinguismo con rilevamento automatico della lingua del browser |
| **react-helmet-async** | Meta tag per pagina, inclusi quelli tradotti |
| **clsx** | Composizione condizionale delle classi |

### Deliberatamente esclusi

- **Next.js** — vincolo del committente.
- **Librerie di componenti UI** (MUI, shadcn, Chakra) — un portfolio con componenti riconoscibili di terze parti comunica l'opposto di quello che serve.
- **CMS o backend** — i contenuti sono pochi e stabili: stanno in file TypeScript tipizzati dentro il repository. Zero infrastruttura, zero costi, contenuti versionati con git.

---

## 4. Architettura informativa

**Il sito è una singola landing page a scorrimento continuo.** Non esistono pagine separate: tutto il contenuto vive su una sola schermata verticale.

```
/                     hero → chi sono → percorso → competenze → progetti → contatti
/projects/:slug       NON è una pagina: apre la home con l'overlay del progetto già aperto
```

### Come si comporta il caso di studio senza uscire dalla pagina

Il dettaglio di un progetto si apre in un **overlay a tutto schermo sopra la landing**, non su una rotta separata. L'URL però cambia (`history.pushState`), quindi:

- il link a un progetto resta condivisibile e apribile direttamente;
- il tasto "indietro" del browser chiude l'overlay invece di uscire dal sito;
- la posizione di scorrimento della landing è preservata: chiudendo l'overlay si torna esattamente sulla card da cui si era partiti.

`react-router-dom` resta in dipendenza solo per gestire questo aggancio tra URL e stato dell'overlay, non per instradare pagine diverse.

### Scorrimento e navigazione

- **Niente scroll snapping a pagina piena.** Su trackpad e mouse con rotella libera lo snap forzato dà la sensazione di combattere col sito, ed è una delle cose che fanno chiudere la scheda. Lo scorrimento resta libero, reso fluido da Lenis.
- Le sezioni non sono obbligate all'altezza piena: ognuna occupa lo spazio che le serve. Solo l'hero è a `100dvh` (`dvh` e non `vh`, altrimenti su iOS la barra del browser taglia il contenuto).
- Navigazione fissa e minimale: monogramma a sinistra, ancore alle sezioni al centro, switch lingua a destra. Le ancore usano `scrollIntoView` gestito da Lenis, con `scroll-margin-top` per non finire sotto la barra.
- **Indicatore di sezione attiva:** la voce corrispondente alla sezione visibile si evidenzia durante lo scorrimento (`IntersectionObserver`). È un dettaglio piccolo che comunica cura.
- **Barra di avanzamento** sottile in cima alla pagina, legata alla percentuale di scorrimento.
- Su mobile la barra diventa un pulsante che apre un menu a tutto schermo.

---

## 5. Specifica delle sezioni

### 5.1 Hero — il pezzo forte in WebGL

**Contenuto:** nome, ruolo (`Full Stack Developer`), una riga di posizionamento (`Java · Spring Boot · React · TypeScript`), località e disponibilità da remoto, indicatore di scorrimento.

**Effetto:** una scena Three.js a tutto schermo che reagisce al puntatore. Direzione consigliata — un campo di particelle o una mesh con shader distorsivo che segue il mouse con inerzia, in due o tre colori del sistema di design. Su tocco reagisce all'inclinazione o resta in movimento autonomo lento.

**Requisiti non negoziabili:**

- Il testo dell'hero è **HTML sopra il canvas**, mai texture dentro la scena: deve essere selezionabile, leggibile dagli screen reader e indicizzabile.
- La scena si carica in **lazy loading** con `React.lazy` e `Suspense`. Il fallback è un gradiente statico animato in CSS che è già di per sé presentabile.
- Se WebGL non è disponibile, se `prefers-reduced-motion` è attivo o se il dispositivo ha meno di 4 core logici (`navigator.hardwareConcurrency`), la scena non parte affatto e resta il fallback.
- Il `requestAnimationFrame` si **ferma quando la sezione esce dal viewport** (`IntersectionObserver`): una GPU che lavora a vuoto in fondo alla pagina è batteria bruciata per niente.
- Il canvas ha `dpr` limitato a `[1, 2]`: su schermi a 3x il costo triplica senza guadagno percepibile.

### 5.2 Chi sono e percorso

**Contenuto:** tre o quattro frasi in prima persona, non il paragrafo del CV riscritto. Poi la timeline: liceo scientifico (2014-2019), corso Generation Italy (ott 2022 – feb 2023), coding camp in PC Cube (giu – ago 2023), Full Stack Developer in PC Cube (set 2023 – set 2026).

**Effetto:** la timeline si costruisce con lo scroll — la linea verticale si disegna progressivamente (`ScrollTrigger` con `scrub`), le tappe entrano in sequenza sfalsata. Ogni tappa mostra un dettaglio in più al passaggio del mouse.

**Attenzione:** con `scrub` attivo, il contenuto deve essere completo anche a metà animazione. Chi scorre veloce non deve vedere mezze frasi.

### 5.3 Competenze tecniche

**Contenuto:** raggruppate come nel CV — Linguaggi, Back-end, Front-end, Database, Strumenti e metodi. Separata e onesta, la riga dei progetti personali (Python, Vue.js).

**Effetto:** griglia con entrata sfalsata, e al passaggio del mouse su una tecnologia si evidenziano quelle correlate mentre le altre si attenuano. È un effetto che *significa* qualcosa: mostra come lo stack si tiene insieme.

**Da evitare:** le barre percentuali di competenza. "Java 85%" non vuol dire nulla, e chi assume lo sa.

### 5.4 Progetti — la sezione che decide

**Contenuto:** una card per progetto con titolo, una riga di problema risolto, i tag delle tecnologie, link al repository e alla pagina di dettaglio.

Progetti previsti:

1. **Iter — Gestionale prenotazioni** — Spring Boot, React, TypeScript, PostgreSQL. Il gancio narrativo è il controllo delle sovrapposizioni: perché il confronto è stretto, perché la fine la calcola il server, perché un conflitto risponde 409 e non 400.
2. **Questo portfolio** — il sito stesso, come secondo caso di studio: React, TypeScript, Vite, Framer Motion, GSAP, Three.js. Il gancio narrativo è il sito che dimostra sé stesso.

**Effetto:** card con inclinazione 3D che segue il puntatore (trasformazione CSS, non WebGL) e transizione condivisa verso l'overlay (`layoutId` di Framer Motion): l'immagine della card si espande e diventa l'intestazione del caso di studio senza stacco. È l'effetto con il miglior rapporto tra impatto e costo di tutto il sito, ed è anche il motivo per cui l'overlay funziona meglio di una pagina separata: la continuità visiva si mantiene solo restando nello stesso albero React.

**Overlay del caso di studio** — struttura fissa per ogni progetto:

1. Il problema, in linguaggio comprensibile
2. Le decisioni tecniche e il perché di ciascuna
3. Un frammento di codice significativo, evidenziato
4. Cosa rifarei diversamente ← *questa sezione vale più di tutte le altre in colloquio*
5. Link al repository

Comportamento dell'overlay: chiusura con il tasto `Esc`, con il clic fuori e con un pulsante sempre visibile. Lo scorrimento della pagina sottostante è bloccato mentre è aperto, e il focus resta intrappolato dentro l'overlay (`focus trap`) finché non si chiude.

### 5.5 Contatti

**Contenuto:** email (`oramanucci@protonmail.com`), GitHub, LinkedIn. **Nessun CV scaricabile** — scelta esplicita del committente. Nessun form: un `mailto` non ha backend, non ha spam, non ha nulla da mantenere.

**Effetto:** l'email a grande dimensione tipografica come chiusura della pagina, con un effetto al passaggio del mouse (distorsione, scomposizione delle lettere, magnetismo del cursore). Copia negli appunti al clic, con conferma visiva.

---

## 6. Sistema di design

Definito con proprietà custom CSS ed esposto a Tailwind tramite `@theme`.

**Colori.** Base scura — è la scelta più coerente con un portfolio da sviluppatore e fa risaltare il WebGL. Un fondo profondo non nero puro, due livelli di superficie, un accento saturo e un secondario per i gradienti. Contrasto minimo **4.5:1** per il testo corrente, **3:1** per il testo grande: da verificare, non da presumere.

**Tipografia.** Un carattere display a peso variabile per i titoli (Clash Display, Satoshi o General Sans) e uno di sistema per il testo corrente. I titoli scalano con `clamp()` senza breakpoint. Font caricati in `woff2` con `font-display: swap` e `preload` solo sul carattere dell'hero.

**Griglia.** 12 colonne, larghezza massima 1280px, margini fluidi. Scala di spaziature su base 4px.

**Motion tokens.** Durate e curve definite una volta e riusate ovunque:

| Token | Valore | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrate |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transizioni |
| `--dur-fast` | 200ms | Micro-interazioni |
| `--dur-base` | 400ms | Entrate di elementi |
| `--dur-slow` | 800ms | Transizioni di sezione |

Curve e durate coerenti sono ciò che separa un sito animato da un sito che sembra animato a caso.

---

## 7. Bilinguismo

- Lingue: **italiano** e **inglese**. Predefinita: quella del browser, con ripiego su inglese.
- Switch nella barra di navigazione, sempre visibile.
- Scelta persistita in `localStorage`.
- Testi in `src/i18n/it.ts` e `src/i18n/en.ts`, **tipizzati**: una chiave presente in un file e mancante nell'altro deve rompere la compilazione, non produrre una stringa vuota in produzione.
- L'attributo `lang` dell'elemento `<html>` si aggiorna al cambio lingua.
- Il cambio lingua **non ricarica la pagina** e non fa ripartire le animazioni.

---

## 8. Prestazioni

Obiettivi misurati con Lighthouse su Vercel, profilo mobile:

| Metrica | Obiettivo |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| JS iniziale (gzip, escluso il chunk WebGL) | < 150 KB |

**Come si ottengono:**

- Three.js e la scena in un chunk separato, caricato dopo il primo render.
- Immagini in WebP/AVIF, dimensioni esplicite per non generare spostamenti di layout, `loading="lazy"` sotto la piega.
- Font in `woff2`, sottoinsieme dei caratteri latini.
- Animazioni solo su `transform` e `opacity`. Mai su `width`, `height`, `top`, `left`: costringono il browser a ricalcolare il layout a ogni frame.
- `will-change` applicato con parsimonia e solo durante l'animazione.

---

## 9. Accessibilità

Non è un capitolo di conformità: su un sito pieno di effetti è la prova che chi l'ha fatto sa cosa sta facendo.

- **`prefers-reduced-motion: reduce`** disattiva scroll fluido, parallasse, WebGL e transizioni di scorrimento. Restano solo dissolvenze brevi. Va implementato all'inizio, non aggiunto alla fine.
- Navigazione completa da tastiera, con focus **visibile** e non rimosso.
- HTML semantico: un solo `<h1>`, gerarchia dei titoli corretta, `<nav>`, `<main>`, `<section>` con `aria-labelledby`.
- Il canvas WebGL è decorativo: `aria-hidden="true"`.
- Testo alternativo su ogni immagine informativa.
- Nessuna informazione veicolata dal solo colore.

---

## 10. SEO e metadati

Il limite noto di una SPA con Vite: nessun rendering lato server. Mitigazioni:

- `index.html` contiene già i meta principali in inglese, così i crawler che non eseguono JavaScript trovano comunque qualcosa.
- `react-helmet-async` aggiorna titolo e descrizione per pagina e per lingua.
- **Open Graph e Twitter Card** con immagine di anteprima 1200×630: è ciò che si vede quando il link viene incollato in una chat con un recruiter, e conta più di quanto sembri.
- JSON-LD `Person` nell'`index.html`.
- `sitemap.xml` e `robots.txt` statici.
- URL canonico assoluto.

*Se in futuro la SEO diventasse prioritaria, la strada è aggiungere un plugin di pre-rendering statico a Vite, non riscrivere in Next.*

---

## 11. Struttura del progetto

```
src/
├── components/
│   ├── layout/        Nav, Footer, LanguageSwitch
│   ├── sections/      Hero, About, Timeline, Skills, Projects, Contact
│   ├── project/       ProjectCard, ProjectOverlay, useProjectRoute
│   ├── three/         Scene, Particles, hook di gestione del canvas
│   └── ui/            Button, Tag, Card, Reveal, MagneticCursor
├── content/
│   ├── projects.ts    Dati dei progetti, tipizzati
│   └── timeline.ts    Tappe del percorso
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useLenis.ts
│   └── useInView.ts
├── i18n/
│   ├── index.ts
│   ├── it.ts
│   └── en.ts
├── pages/
│   └── Home.tsx       L'unica pagina: compone le sezioni e ospita l'overlay
├── styles/
│   ├── tokens.css     Proprietà custom del sistema di design
│   └── global.css
└── main.tsx
```

**Regole di codice:** un componente per file, props tipizzate esplicitamente, niente `any`, niente `default export` tranne che per le pagine, logica di animazione estratta in hook riutilizzabili. Il codice va letto da chi valuta il candidato: deve essere ordinato quanto il sito.

---

## 12. Deploy

- **Piattaforma:** Vercel, collegata al repository GitHub.
- **Framework preset:** Vite. Build `npm run build`, output `dist`.
- **`vercel.json`** con il rewrite di fallback — serve proprio perché `/projects/<slug>` non è un file: senza il rewrite, aprire quel link direttamente dà 404 invece di caricare la landing con l'overlay aperto:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- Anteprima automatica su ogni pull request.
- **Dominio:** iniziare con quello `.vercel.app`. Un dominio proprio (`odoardoramanucci.dev` o simile, circa 15 €/anno) è consigliato prima di mettere il link su CV e LinkedIn: comunica un livello diverso.
- **GitHub Actions** per type-check e build a ogni push, indipendentemente dalla build di Vercel.

---

## 13. Criteri di accettazione

Il sito è considerato completo quando **tutte** queste condizioni sono verificate:

- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95
- [ ] Con `prefers-reduced-motion` attivo il sito è completo, utilizzabile e privo di animazioni invasive
- [ ] Disattivando WebGL da browser, l'hero resta presentabile
- [ ] Navigazione completa da tastiera, con focus sempre visibile
- [ ] Nessun errore o warning in console in produzione
- [ ] `tsc --noEmit` pulito in modalità strict
- [ ] Entrambe le lingue complete, senza chiavi mancanti
- [ ] Nessuno spostamento di layout durante il caricamento (CLS < 0.05)
- [ ] Testato su Chrome, Firefox, Safari e su un telefono Android di fascia media reale
- [ ] Accesso diretto a `/projects/<slug>` carica la landing con l'overlay del progetto già aperto, senza 404
- [ ] Il tasto "indietro" chiude l'overlay e riporta lo scorrimento sulla card di partenza
- [ ] Lo scorrimento non è mai bloccato o forzato: nessuno snap a pagina piena
- [ ] `Esc` chiude l'overlay e il focus non esce dall'overlay mentre è aperto
- [ ] Anteprima Open Graph corretta incollando il link in una chat

---

## 14. Fasi di lavoro

| Fase | Contenuto | Esito |
|---|---|---|
| **1 — Fondamenta** | Vite, TypeScript, Tailwind, routing, i18n, sistema di design, deploy su Vercel | Sito online, vuoto ma già distribuito |
| **2 — Contenuti** | Tutte le sezioni con layout definitivo, **senza animazioni** | Sito completo, statico, responsive, accessibile |
| **3 — Motion** | Lenis, Framer Motion, GSAP, transizioni di pagina, `prefers-reduced-motion` | Sito animato e fluido |
| **4 — WebGL** | Scena hero, lazy loading, fallback, rilevamento capacità del dispositivo | Il pezzo forte |
| **5 — Rifinitura** | Ottimizzazione, SEO, Open Graph, test cross-browser, controllo criteri | Pronto da mettere sul CV |

**L'ordine non è negoziabile.** Animare prima di aver fissato i contenuti significa rifare le animazioni a ogni cambio di testo. Il sito deve essere già buono alla fine della fase 2: gli effetti aggiungono, non salvano.

---

## 15. Fuori scope

Pagine separate oltre alla landing · scroll snapping a pagina piena · blog · sezione testimonianze · analytics di terze parti (se serve, quelle di Vercel bastano) · tema chiaro/scuro (il sito è progettato scuro) · CV scaricabile (scelta del committente) · form di contatto con backend · animazioni di caricamento artificialmente lunghe.
