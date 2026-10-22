/**
 * Baut einen internen Link inklusive Base-Pfad und mit
 * abschliessendem Slash. Der Slash ist kein Schoenheitsfehler: GitHub Pages
 * leitet `/impressum` sonst per 301 auf `/impressum/` um, und
 * jeder interne Klick kostet einen zusaetzlichen Roundtrip.
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const [rawPath = '/', hash] = path.split('#')
  const clean = rawPath.replace(/\/+$/, '')
  const withSlash = clean === '' ? '/' : `${clean}/`
  return `${base}${withSlash}${hash ? `#${hash}` : ''}`
}

/**
 * Erster Satz eines Textes, z. B. aus `status` für die Projektkarte. Trennt am
 * ersten Satzzeichen vor einem Leerzeichen; Abkürzungen wie "z. B." gehören
 * deshalb nicht in den ersten Satz.
 */
export function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text
}

/**
 * Hauptnavigation: vier Anker der Startseite und, seit 2026-10-22, eine eigene
 * Seite. Ein Eintrag mit `seite` verlinkt dorthin statt auf einen Anker und
 * ist auf dieser Seite und ihren Unterseiten aktiv (`aria-current="page"`).
 * "Arbeiten" steht vorn: erst der Beleg, dann das Angebot. "Kontakt" fehlt
 * hier, weil der Header dafuer die Schaltflaeche "Anfrage" traegt. `kurz` ist
 * die Beschriftung unter 640 px, damit fuenf Punkte ab 360 px in eine Zeile
 * passen.
 */
export const NAV_ITEMS: readonly {
  id: string
  label: string
  kurz?: string
  seite?: string
}[] = [
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'arbeitsweise', label: 'Arbeitsweise' },
  { id: 'ueber', label: 'Über Klartext', kurz: 'Über' },
  { id: 'newsletter', label: 'Newsletter', seite: '/newsletter' },
]

/**
 * `mailto:`-Link mit vorausgefülltem Betreff. Bewusst `encodeURIComponent` statt
 * `URLSearchParams`: Letzteres kodiert Leerzeichen als `+`, und in `mailto:`
 * ist `+` ein echtes Pluszeichen im Betreff.
 */
export function mailto(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
}

/**
 * Das erste Querformat unter den Screenshots eines Projekts, sonst `undefined`.
 * Ein Handybild würde im 16:9-Rahmen auf seinen oberen Rand zusammengeschnitten.
 */
export function leitbild<T extends { image: { width: number; height: number } }>(
  screenshots: readonly T[],
): T | undefined {
  return screenshots.find((shot) => shot.image.width >= shot.image.height)
}

/**
 * Name für den Übergang von der Startseite zur Projektseite (DESIGN.md, Bewegung),
 * als Inline-Style. Bühne und Zeile setzen ihn auf ihr Bildfeld, die
 * Projektseite auf ihren `<article>`. Wirksam wird er nur an einem Element mit
 * `data-uebergang`, davon trägt jede Seite je Projekt höchstens eins.
 */
export function uebergang(id: string): string {
  return `--uebergang: projekt-${id}`
}

/**
 * Vorschaubild für geteilte Links (LinkedIn, WhatsApp) und die Strukturdaten.
 * Erzeugt von `npm run vorschaubild` aus Name, Claim und Ort in `company.json`;
 * `npm run test:build` meldet, wenn es nicht mehr zu diesen Texten passt.
 */
export const VORSCHAUBILD = {
  pfad: '/vorschaubild.png',
  breite: 1200,
  hoehe: 630,
} as const

/**
 * `tel:`-Link im internationalen Format: „0151 26091487“ wird zu
 * `tel:+4915126091487`. Die Anzeige bleibt, wie sie in `legal.json` steht.
 */
export function telefonLink(nummer: string): string {
  const ziffern = nummer.replace(/[^\d+]/g, '')
  return `tel:${ziffern.startsWith('0') ? `+49${ziffern.slice(1)}` : ziffern}`
}

export const KIND_LABELS: Record<string, string> = {
  kundenprojekt: 'Kundenprojekt',
  'eigenes-produkt': 'Eigenes Produkt',
  prototyp: 'Prototyp',
}

/**
 * Datum einer Newsletter-Ausgabe aus ihrer Datei-ID (`2026-10-20`). Bricht den
 * Build bei jedem anderen Namen ab, statt eine Ausgabe falsch einzusortieren.
 */
export function ausgabeDatum(id: string): Date {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})$/.exec(id)
  const datum = treffer ? new Date(Date.UTC(+treffer[1]!, +treffer[2]! - 1, +treffer[3]!)) : null
  if (!datum || datum.toISOString().slice(0, 10) !== id) {
    throw new Error(
      `src/content/newsletter/${id}.json: Dateiname muss ein Datum sein (YYYY-MM-DD).`,
    )
  }
  return datum
}

/** „20. Oktober 2026“, mit `wochentag` „Dienstag, 20. Oktober 2026“. */
export function datumLang(datum: Date, wochentag = false): string {
  return new Intl.DateTimeFormat('de-DE', {
    ...(wochentag ? { weekday: 'long' as const } : {}),
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(datum)
}

/** Modell-ID lesbar: `claude-haiku-5-5` wird „Claude Haiku 5.5“. */
export function modellName(id: string): string {
  const teile = id.split('-')
  const version = teile.filter((t) => /^\d+$/.test(t)).join('.')
  const name = teile
    .filter((t) => !/^\d+$/.test(t))
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(' ')
  return version ? `${name} ${version}` : name
}
