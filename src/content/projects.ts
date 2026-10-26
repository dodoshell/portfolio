import type { Locale } from '@/i18n/dictionaries'

type Text = Record<Locale, string>

export type Decision = {
  title: Text
  body: Text
}

export type Project = {
  slug: string
  name: string
  tagline: Text
  problem: Text
  status: Text
  stack: string[]
  // Short facts that give a sense of size, shown next to the screenshot.
  facts: Text[]
  decisions: [Decision, Decision, Decision]
  code: { lang: 'sql' | 'java'; path: string; source: string; caption: Text }
  demoUrl: string
  sourceUrl?: string
  image: { src: string; width: number; height: number }
}

export const projects: Project[] = [
  {
    slug: 'poltrona',
    name: 'Poltrona',
    tagline: {
      en: 'Cloud management for hair salons and barbershops.',
      it: 'Gestionale in cloud per parrucchieri e barbieri.',
    },
    problem: {
      en: 'Salons book around processing times: while a colour sets, the stylist is free to take another client, and generic booking tools can’t model that. Salons also hold health data about their clients, like allergies and patch tests, and they won’t switch software unless they can bring thousands of clients with them.',
      it: 'I saloni prenotano attorno ai tempi di posa: mentre un colore è in posa, l’operatore può prendere un altro cliente, e i gestionali generici non sanno rappresentarlo. I saloni custodiscono anche dati sanitari dei clienti, come allergie e test di sensibilità, e non cambiano software se non possono portarsi dietro migliaia di clienti.',
    },
    status: { en: 'Pre-launch, closed beta next', it: 'Prima del lancio, beta chiusa in arrivo' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Resend', 'Vercel'],
    facts: [
      { en: '117 routes', it: '117 pagine' },
      { en: '77 migrations, about 67 tables', it: '77 migrazioni, circa 67 tabelle' },
      { en: 'About 630 tenant-isolation checks', it: 'Circa 630 controlli di isolamento tra saloni' },
    ],
    decisions: [
      {
        title: {
          en: 'The database refuses a double booking',
          it: 'È il database a rifiutare le doppie prenotazioni',
        },
        body: {
          en: 'Each appointment is split into one row per phase, each with a time range. A gist exclusion constraint applies only to phases where the stylist is actually busy, so a client can be booked during someone else’s processing time, and two tablets at the front desk can never book the same stylist twice.',
          it: 'Ogni appuntamento è diviso in una riga per fase, ognuna con il suo intervallo di tempo. Un vincolo di esclusione gist vale solo per le fasi in cui l’operatore è davvero occupato: si può prenotare un cliente durante la posa di un altro, e due tablet alla reception non possono mai prenotare due volte lo stesso operatore.',
        },
      },
      {
        title: {
          en: 'Health notes live in a locked table',
          it: 'Le note sanitarie stanno in una tabella chiusa',
        },
        body: {
          en: 'The sensitive-notes table has row level security on and no policies at all, so nothing can read it directly. The only way in is a function that checks consent and writes every read to an audit log. Not even an admin with support access can see those notes.',
          it: 'La tabella delle note sensibili ha la row level security attiva e nessuna policy, quindi nessuno può leggerla direttamente. L’unico accesso è una funzione che controlla il consenso e scrive ogni lettura in un registro. Nemmeno un admin con accesso di supporto vede quelle note.',
        },
      },
      {
        title: {
          en: 'Every write is a Postgres function, and a test proves the walls hold',
          it: 'Ogni scrittura è una funzione Postgres, e un test dimostra che i muri reggono',
        },
        body: {
          en: 'Tables have no write policies. Each action is one security-definer function that checks the caller itself, and creating a salon locks the profile row so a double submit can’t create two. A 4,000-line SQL suite runs inside a transaction that is always rolled back and checks that no table leaks across salons.',
          it: 'Le tabelle non hanno policy di scrittura. Ogni azione è una funzione security definer che controlla da sé chi la chiama, e la creazione di un salone blocca la riga del profilo, così un doppio invio non crea due saloni. Una suite SQL di 4.000 righe gira in una transazione sempre annullata e verifica che nessuna tabella sia visibile da un altro salone.',
        },
      },
    ],
    code: {
      lang: 'sql',
      path: 'supabase/migrations/…_agenda.sql',
      source: `create table public.appointment_segments (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations (id) on delete cascade,
  appointment_id uuid not null references public.appointments (id) on delete cascade,
  item_id uuid not null references public.appointment_items (id) on delete cascade,
  staff_member_id uuid not null references public.staff_members (id),
  time_range tstzrange not null check (not isempty(time_range)),
  operator_busy boolean not null,
  is_active boolean not null default true,
  -- No double booking of an operator's work (PRD "Vincoli chiave").
  constraint appointment_segments_no_overlap exclude using gist (
    staff_member_id with =,
    time_range with &&
  ) where (operator_busy and is_active)
);`,
      caption: {
        en: 'The overlap rule is a constraint, so no code path can skip it.',
        it: 'La regola delle sovrapposizioni è un vincolo, quindi nessun percorso nel codice può saltarla.',
      },
    },
    demoUrl: 'https://poltrona.app',
    image: { src: '/work/poltrona.png', width: 1440, height: 900 },
  },
  {
    slug: 'corsia',
    name: 'Corsia',
    tagline: {
      en: 'Exam prep for taxi and chauffeur drivers.',
      it: 'Preparazione all’esame per conducenti taxi e NCC.',
    },
    problem: {
      en: 'Candidates study from about 3,000 official questions scattered across PDFs, plus a blank-map test. There was no way to practise in the real exam format, which changes between sessions, or to see which topics they had actually mastered.',
      it: 'I candidati studiano da circa 3.000 domande ufficiali sparse in vari PDF, più una prova sulla cartina muta. Non c’era modo di esercitarsi nel formato vero dell’esame, che cambia da una sessione all’altra, né di vedere quali argomenti si padroneggiano davvero.',
    },
    status: { en: 'MVP ahead of schedule, launching in December', it: 'MVP in anticipo, lancio a dicembre' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Supabase', 'Stripe', 'Resend', 'Python', 'OpenStreetMap'],
    facts: [
      { en: '3,137 official questions imported', it: '3.137 domande ufficiali importate' },
      { en: '13 migrations, about 24 tables', it: '13 migrazioni, circa 24 tabelle' },
      { en: 'Content pipeline from PDF to CSV and SVG maps', it: 'Pipeline dei contenuti da PDF a CSV e mappe SVG' },
    ],
    decisions: [
      {
        title: { en: 'Answers are graded on the server', it: 'Le risposte si correggono sul server' },
        body: {
          en: 'Questions reach the browser without the correct answer and with shuffled options. A database function grades each answer, records the attempt and caps the timing value. The only exception is offline packs, limited to 200 questions a day per registered device.',
          it: 'Le domande arrivano al browser senza la risposta giusta e con le opzioni mescolate. Una funzione del database corregge ogni risposta, registra il tentativo e limita il tempo dichiarato. L’unica eccezione sono i pacchetti offline, limitati a 200 domande al giorno per dispositivo registrato.',
        },
      },
      {
        title: { en: 'Exam rules are data, not code', it: 'Le regole d’esame sono dati, non codice' },
        body: {
          en: 'Number of questions, minutes, pass thresholds and map letters are stored as JSON on each exam session, because the Region already changed the format once in 2026. A new format is a row, not a deploy.',
          it: 'Numero di domande, minuti, soglie di superamento e lettere della cartina sono salvati come JSON su ogni sessione d’esame, perché la Regione ha già cambiato formato una volta nel 2026. Un nuovo formato è una riga, non un rilascio.',
        },
      },
      {
        title: { en: 'Stripe webhooks are verified and idempotent', it: 'I webhook di Stripe sono verificati e idempotenti' },
        body: {
          en: 'Every event has its signature checked, only paid sessions grant access, and the metadata is validated. The purchase function ignores a checkout session it has already seen, through a unique column, so Stripe’s retries can never grant access twice.',
          it: 'Ogni evento ha la firma verificata, solo le sessioni pagate danno accesso e i metadati vengono validati. La funzione di acquisto ignora una sessione già vista grazie a una colonna unica, così i tentativi ripetuti di Stripe non danno mai accesso due volte.',
        },
      },
    ],
    code: {
      lang: 'sql',
      path: 'supabase/migrations/…_accounts_training.sql',
      source: `begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into q from public.questions where id = p_question;
  if not found or not private.trainable(q) then
    raise exception 'question not available' using errcode = '22023';
  end if;

  insert into public.attempts (user_id, question_id, chosen_index, correct, ms, mode)
  values (auth.uid(), q.id, p_chosen, p_chosen is not distinct from q.correct_index,
          least(greatest(p_ms, 0), 3600000), p_mode);

  return query select p_chosen is not distinct from q.correct_index, q.correct_index, q.explanation, q.source;
end;`,
      caption: {
        en: 'The browser never knows the right answer until it has committed to one.',
        it: 'Il browser non conosce la risposta giusta finché non ne ha scelta una.',
      },
    },
    demoUrl: 'https://corsia-two.vercel.app',
    image: { src: '/work/corsia.png', width: 1440, height: 900 },
  },
  {
    slug: 'sconti-nova',
    name: 'Sconti Nova',
    tagline: {
      en: 'Amazon deals, verified every hour. Built with a partner.',
      it: 'Offerte Amazon verificate ogni ora. Costruito con un socio.',
    },
    problem: {
      en: 'Deal sites go stale fast: prices change, coupons expire and the same product shows up three times from three sources. Sconti Nova imports offers from a Telegram channel and from Amazon itself, checks every price against Amazon before it is shown, and keeps one card per real offer.',
      it: 'I siti di offerte invecchiano in fretta: i prezzi cambiano, i coupon scadono e lo stesso prodotto compare tre volte da tre fonti. Sconti Nova importa offerte da un canale Telegram e da Amazon stessa, verifica ogni prezzo su Amazon prima di mostrarlo e tiene una sola scheda per ogni offerta reale.',
    },
    status: { en: 'Live, with an hourly catalogue cycle', it: 'Online, con un ciclo del catalogo ogni ora' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Supabase', 'PostgreSQL', 'Vercel Cron', 'Tiptap', 'Vitest', 'Playwright'],
    facts: [
      { en: '75 test files, including database tests on PGlite', it: '75 file di test, compresi test del database su PGlite' },
      { en: '29 migrations', it: '29 migrazioni' },
      { en: 'Accessibility checks with axe in end-to-end tests', it: 'Controlli di accessibilità con axe nei test end-to-end' },
    ],
    decisions: [
      {
        title: { en: 'Two sources can’t create the same offer twice', it: 'Due fonti non possono creare due volte la stessa offerta' },
        body: {
          en: 'Telegram and Amazon both feed the catalogue. Before inserting, the lookup takes a transaction-level advisory lock on the product’s ASIN, so two imports running at the same moment can’t both decide the card is missing. The lock is in the save functions, so it also covers the hourly job.',
          it: 'Telegram e Amazon alimentano entrambi il catalogo. Prima di inserire, la ricerca prende un advisory lock di transazione sull’ASIN del prodotto, così due importazioni contemporanee non possono decidere entrambe che la scheda manca. Il lock sta nelle funzioni di salvataggio, quindi copre anche il ciclo orario.',
        },
      },
      {
        title: { en: 'Same product is not the same offer', it: 'Stesso prodotto non vuol dire stessa offerta' },
        body: {
          en: 'Two offers are merged only when variant, Prime access, quantity, coupon, code, seller and purchase limits all match. A similar name proves nothing, and an unknown seller is never treated as equal to any seller.',
          it: 'Due offerte si uniscono solo se variante, accesso Prime, quantità, coupon, codice, venditore e limiti d’acquisto coincidono tutti. Un nome simile non prova niente, e un venditore sconosciuto non viene mai considerato uguale a un altro.',
        },
      },
      {
        title: { en: 'The hourly job survives timeouts and duplicates', it: 'Il ciclo orario resiste a timeout e doppioni' },
        body: {
          en: 'Each hour of work is a row with an owner, a lease and a fencing token. Every chunk runs inside a serverless request with a time budget, writes a checkpoint, and a stale worker whose fence has moved on can’t write at all. If the hour runs out, the summary says partial, never done.',
          it: 'Ogni ora di lavoro è una riga con un proprietario, un lease e un fencing token. Ogni blocco gira in una richiesta serverless con un budget di tempo e scrive un checkpoint, e un worker superato il cui fence è cambiato non può più scrivere. Se l’ora finisce, il riepilogo dice parziale, mai completato.',
        },
      },
    ],
    code: {
      lang: 'sql',
      path: 'supabase/migrations/…_verified_offer_deduplication.sql',
      source: `-- Separate commands after the lock give the lookup a fresh Read Committed snapshot.
create function nova_catalog.find_verified_product(p_asin text,p_conditions jsonb,p_preferred_id uuid default null)
returns uuid language plpgsql volatile security invoker set search_path='' as $$
declare pid uuid;
begin
 if p_asin is null or p_asin !~ '^[A-Z0-9]{10}$' then return null; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('sconti-nova:verified-offer:'||p_asin,0));
 -- An unknown seller is not evidence that two commercial offers are equal.
 if jsonb_typeof(p_conditions) is distinct from 'object' or nullif(p_conditions->>'merchantId','') is null then return null; end if;
 select p.id into pid from public.products p
 where p.verified_asin=p_asin and (p.catalog_source_offer_id is not null or p.catalog_discovery_id is not null)
  and nova_catalog.product_verified_conditions(p)=p_conditions
 order by (p.id=p_preferred_id) desc nulls last,p.created_at asc,p.id asc
 limit 1 for update of p;
 return pid;
end $$;`,
      caption: {
        en: 'The lock is taken before the lookup, so the check and the insert can’t be split by another import.',
        it: 'Il lock si prende prima della ricerca, così controllo e inserimento non possono essere separati da un’altra importazione.',
      },
    },
    demoUrl: 'https://www.scontinova.com',
    image: { src: '/work/sconti-nova.png', width: 1440, height: 900 },
  },
  {
    slug: 'iter',
    name: 'Iter',
    tagline: {
      en: 'Leave requests with a three-role approval workflow.',
      it: 'Richieste di ferie con un workflow di approvazione a tre ruoli.',
    },
    problem: {
      en: 'Approvals need clear rules about who can do what, and a trail of who approved what and when. When those rules live only in the interface, anyone with a REST client can skip them.',
      it: 'Le approvazioni hanno bisogno di regole chiare su chi può fare cosa, e di una traccia di chi ha approvato cosa e quando. Se quelle regole vivono solo nell’interfaccia, chiunque abbia un client REST può saltarle.',
    },
    status: { en: 'Finished, live demo with seed users', it: 'Completato, demo online con utenti di prova' },
    stack: ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL 16', 'Flyway', 'React 19', 'TanStack Query', 'Testcontainers', 'Docker'],
    facts: [
      { en: '32 test methods against real Postgres', it: '32 metodi di test su Postgres vero' },
      { en: '7 REST endpoints', it: '7 endpoint REST' },
      { en: 'CI on every push', it: 'CI a ogni push' },
    ],
    decisions: [
      {
        title: {
          en: 'One state machine also decides who may act',
          it: 'Una sola macchina a stati decide anche chi può agire',
        },
        body: {
          en: 'The state machine has no Spring dependency. Each state and action maps to a transition that names the next state, the role allowed to perform it and whether a reason is required. An action that isn’t allowed from the current state returns 409 Conflict.',
          it: 'La macchina a stati non dipende da Spring. Ogni coppia stato e azione porta a una transizione che indica lo stato successivo, il ruolo autorizzato e se serve una motivazione. Un’azione non consentita dallo stato attuale risponde 409 Conflict.',
        },
      },
      {
        title: { en: 'Every transition leaves a record', it: 'Ogni transizione lascia una traccia' },
        body: {
          en: 'Each transition writes an event row with the previous state, the new state, the author and the reason, inside the same transaction as the change. If the record can’t be written, the change doesn’t happen.',
          it: 'Ogni transizione scrive una riga di evento con stato precedente, stato nuovo, autore e motivazione, nella stessa transazione del cambiamento. Se la traccia non si può scrivere, il cambiamento non avviene.',
        },
      },
      {
        title: {
          en: 'Your role depends on the request, not on your title',
          it: 'Il ruolo dipende dalla richiesta, non dal titolo',
        },
        body: {
          en: 'The role of whoever acts is computed from their relationship to the request, owner or direct manager, not from their global role. A manager can’t approve their own leave, and never sees drafts that haven’t been submitted. Integration tests run against a real Postgres through Testcontainers.',
          it: 'Il ruolo di chi agisce si calcola dal suo rapporto con la richiesta, proprietario o responsabile diretto, non dal ruolo globale. Un responsabile non può approvare le proprie ferie e non vede le bozze non ancora inviate. I test di integrazione girano su un Postgres vero con Testcontainers.',
        },
      },
    ],
    code: {
      lang: 'java',
      path: 'backend/…/workflow/RichiestaStateMachine.java',
      source: `public StatoRichiesta applica(StatoRichiesta statoCorrente, Azione azione, RuoloAttore ruoloAttore, String motivazione) {
    Transizione transizione = TRANSIZIONI.get(statoCorrente).get(azione);
    if (transizione == null) {
        throw new TransizioneNonConsentitaException(
                "L'azione %s non è consentita dallo stato %s".formatted(azione, statoCorrente));
    }
    if (transizione.ruoloRichiesto() != ruoloAttore) {
        throw new TransizioneNonConsentitaException(
                "L'azione %s richiede il ruolo %s, non %s".formatted(azione, transizione.ruoloRichiesto(), ruoloAttore));
    }
    if (transizione.motivazioneObbligatoria() && (motivazione == null || motivazione.isBlank())) {
        throw new TransizioneNonConsentitaException(
                "L'azione %s richiede una motivazione".formatted(azione));
    }
    return transizione.statoSuccessivo();
}`,
      caption: {
        en: 'State, role and reason are checked in one place, with no framework in the way.',
        it: 'Stato, ruolo e motivazione si controllano in un solo punto, senza framework di mezzo.',
      },
    },
    demoUrl: 'https://iter-rosy.vercel.app',
    sourceUrl: 'https://github.com/dodoshell/iter',
    image: { src: '/work/iter.jpg', width: 1502, height: 812 },
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
