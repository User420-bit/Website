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
 * Anker in der Hauptnavigation. Bewusst vier — mehr passt bei 390 px nicht.
 * "Arbeiten" steht vorn: erst der Beleg, dann das Angebot. "Kontakt" fehlt
 * hier, weil der Header dafuer die Schaltflaeche "Anfrage" traegt.
 */
export const NAV_ITEMS = [
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'arbeitsweise', label: 'Arbeitsweise' },
  { id: 'ueber', label: 'Über Klartext' },
] as const

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
