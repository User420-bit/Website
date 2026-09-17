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
  { id: 'ueber', label: 'Über' },
] as const

/** Hauptadresse und, falls gesetzt, Übergangsadresse — in dieser Reihenfolge. */
export function emailAddresses(email: string, fallbackEmail: string | null): string[] {
  return fallbackEmail ? [email, fallbackEmail] : [email]
}

/**
 * `mailto:`-Link mit vorausgefülltem Betreff. Mehrere Empfänger stehen nach
 * RFC 6068 kommagetrennt vor dem `?`. Bewusst `encodeURIComponent` statt
 * `URLSearchParams`: Letzteres kodiert Leerzeichen als `+`, und in `mailto:`
 * ist `+` ein echtes Pluszeichen im Betreff.
 */
export function mailto(emails: readonly string[], subject: string): string {
  return `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}`
}

export const KIND_LABELS: Record<string, string> = {
  kundenprojekt: 'Kundenprojekt',
  'eigenes-produkt': 'Eigenes Produkt',
  prototyp: 'Prototyp',
}
