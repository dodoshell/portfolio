export interface ProjectDecision {
  id: string
  title: { it: string; en: string }
  body: { it: string; en: string }
}

export interface Project {
  slug: string
  title: { it: string; en: string }
  tech: string[]
  repoUrl: string
  tagline: { it: string; en: string }
  problem: { it: string; en: string }
  decisions: ProjectDecision[]
  code: {
    snippet: string
    caption: { it: string; en: string }
  }
  retrospective: { it: string; en: string }
}

export const projects: Project[] = [
  {
    slug: 'iter',
    title: { it: 'Iter', en: 'Iter' },
    tech: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
    repoUrl: 'https://github.com/dodoshell/iter',
    tagline: {
      it: 'Gestionale prenotazioni con controllo reale delle sovrapposizioni.',
      en: 'A booking management system with real overlap control.',
    },
    problem: {
      it: 'Un sistema di prenotazioni non vale niente se due persone possono prenotare la stessa risorsa nello stesso momento. Iter gestisce prenotazioni di risorse condivise (sale, attrezzature) e deve garantire che due fasce orarie non si sovrappongano mai, anche quando più richieste arrivano nello stesso istante.',
      en: 'A booking system is worthless if two people can book the same resource at the same time. Iter manages bookings for shared resources (rooms, equipment) and must guarantee that two time slots never overlap, even when multiple requests land at the same moment.',
    },
    decisions: [
      {
        id: 'strict-comparison',
        title: { it: 'Il confronto degli intervalli è stretto', en: 'The interval comparison is strict' },
        body: {
          it: 'Due prenotazioni si sovrappongono se start_A < end_B e start_B < end_A. Non basta un confronto approssimato: un intervallo che finisce esattamente quando l’altro inizia non è un conflitto, e la condizione deve trattarlo come caso normale, non come eccezione.',
          en: 'Two bookings overlap if start_A < end_B and start_B < end_A. An approximate comparison isn’t enough: a slot ending exactly when another begins is not a conflict, and the condition has to treat that as the normal case, not a special exception.',
        },
      },
      {
        id: 'server-end',
        title: { it: 'La fine la calcola il server', en: 'The end time is computed server-side' },
        body: {
          it: 'Il client invia solo l’inizio e la durata: l’orario di fine è calcolato e validato lato server. Fidarsi di un end_time inviato dal client apre la porta a prenotazioni incoerenti che bypassano il controllo di sovrapposizione.',
          en: 'The client only sends the start time and duration: the end time is computed and validated server-side. Trusting a client-supplied end_time opens the door to inconsistent bookings that bypass the overlap check entirely.',
        },
      },
      {
        id: 'conflict-409',
        title: { it: 'Un conflitto risponde 409, non 400', en: 'A conflict returns 409, not 400' },
        body: {
          it: 'La richiesta è sintatticamente corretta: il problema non è la richiesta, è lo stato del sistema nel momento in cui arriva. 409 Conflict comunica esattamente questo al client, che può distinguere "richiesta malformata" da "risorsa già occupata" senza dover interpretare un messaggio di errore.',
          en: 'The request is syntactically valid: the problem isn’t the request, it’s the state of the system when it arrives. 409 Conflict communicates exactly that to the client, which can tell "malformed request" apart from "resource already booked" without parsing an error message.',
        },
      },
    ],
    code: {
      snippet: `boolean overlaps(Booking a, Booking b) {
    return a.start().isBefore(b.end())
        && b.start().isBefore(a.end());
}

if (repository.existsOverlapping(resourceId, start, end)) {
    throw new BookingConflictException(resourceId, start, end);
}
// gestito da un @ExceptionHandler che risponde 409`,
      caption: {
        it: 'Il controllo di sovrapposizione, ridotto all’essenziale.',
        en: 'The overlap check, reduced to its essentials.',
      },
    },
    retrospective: {
      it: 'Aggiungerei test di integrazione dedicati ai casi limite delle fasce orarie (inizio/fine coincidenti, prenotazioni a cavallo di mezzanotte) invece di fidarmi solo degli unit test sulla funzione di confronto. E sposterei la validazione della sovrapposizione in un service dedicato: oggi vive vicino al controller, e con più tipi di risorsa da gestire diventerebbe presto affollato.',
      en: 'I’d add integration tests dedicated to edge cases in the time slots (coinciding start/end, bookings crossing midnight) instead of relying only on unit tests for the comparison function. And I’d move the overlap validation into a dedicated service: right now it lives close to the controller, and it would get crowded fast with more resource types to handle.',
    },
  },
  {
    slug: 'portfolio',
    title: { it: 'Questo portfolio', en: 'This portfolio' },
    tech: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'GSAP', 'Three.js'],
    repoUrl: 'https://github.com/dodoshell/portfolio',
    tagline: {
      it: 'Il sito che stai guardando, come secondo caso di studio.',
      en: 'The site you’re looking at, as a second case study.',
    },
    problem: {
      it: 'Un portfolio da sviluppatore ha due lettori diversi: un recruiter che decide in trenta secondi e un tech lead che legge il codice. Il sito doveva convincere entrambi senza un framework full-stack, senza CMS, e restando abbastanza leggero da non tradire le sue stesse promesse di performance.',
      en: 'A developer portfolio has two different readers: a recruiter who decides in thirty seconds, and a tech lead who reads the code. The site had to convince both without a full-stack framework, without a CMS, and staying light enough not to betray its own performance claims.',
    },
    decisions: [
      {
        id: 'single-page-overlay',
        title: { it: 'Una sola pagina, un overlay per i progetti', en: 'A single page, an overlay for projects' },
        body: {
          it: 'Il caso di studio di un progetto si apre in un overlay sopra la landing, non su una rotta separata: l’URL cambia con history.pushState, ma la posizione di scorrimento e la continuità visiva restano intatte, cosa impossibile con una navigazione a pagina piena.',
          en: 'A project’s case study opens in an overlay above the landing page, not on a separate route: the URL changes via history.pushState, but scroll position and visual continuity stay intact — impossible with a full page navigation.',
        },
      },
      {
        id: 'typed-i18n',
        title: { it: 'I18n che rompe la build se una chiave manca', en: 'I18n that breaks the build on a missing key' },
        body: {
          it: 'it.ts e en.ts implementano la stessa interfaccia TypeScript: una chiave presente in un file e assente nell’altro è un errore di compilazione, non una stringa vuota scoperta in produzione da un utente inglese.',
          en: 'it.ts and en.ts implement the same TypeScript interface: a key present in one file and missing in the other is a compile error, not an empty string discovered in production by an English-speaking visitor.',
        },
      },
      {
        id: 'webgl-off',
        title: { it: 'Il WebGL si spegne quando non serve', en: 'WebGL turns itself off when it isn’t needed' },
        body: {
          it: 'La scena three.js dell’hero non parte se prefers-reduced-motion è attivo, se il dispositivo ha meno di 4 core logici, o se la sezione esce dal viewport: il requestAnimationFrame si ferma, perché una GPU che lavora a vuoto in fondo alla pagina è solo batteria sprecata.',
          en: 'The hero’s three.js scene doesn’t start if prefers-reduced-motion is on, if the device has fewer than 4 logical cores, or once the section leaves the viewport: the requestAnimationFrame loop stops, because a GPU spinning at the bottom of the page is just wasted battery.',
        },
      },
    ],
    code: {
      snippet: `function getInitialValue(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// letto una volta all'avvio, poi tenuto sincronizzato
// con un listener sul cambiamento della preferenza di sistema`,
      caption: {
        it: 'L’hook useReducedMotion — il primo pezzo scritto, non l’ultimo.',
        en: 'The useReducedMotion hook — the first piece written, not the last.',
      },
    },
    retrospective: {
      it: 'Terrei il contenuto testuale (bio, competenze, descrizioni dei progetti) ancora più separato dalla logica dei componenti fin dall’inizio: alcuni testi sono nati direttamente dentro il componente e sono stati spostati in content/ solo in un secondo momento. Meglio deciderlo prima di scrivere la prima sezione, non dopo.',
      en: 'I’d keep the copy (bio, skills, project descriptions) separated from component logic even earlier: some text started out inline in the component and only moved into content/ later. Better to decide that before writing the first section, not after.',
    },
  },
]
