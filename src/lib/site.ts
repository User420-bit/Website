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
 * Anker in der Hauptnavigation. Bewusst vier — mehr passt bei 390 px nicht.
 * "Leistungen" steht vorn: Wer als Kunde kommt, sucht zuerst, was er bekommen
 * kann. "Arbeiten" sind die Belege dazu, "Werkzeuge" bleiben per Scroll und
 * Sprungmarke erreichbar.
 */
export const NAV_ITEMS = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'ueber', label: 'Über' },
  { id: 'kontakt', label: 'Kontakt' },
] as const

/**
 * `mailto:`-Link mit vorausgefülltem Betreff. Bewusst `encodeURIComponent`
 * statt `URLSearchParams`: Letzteres kodiert Leerzeichen als `+`, und in
 * `mailto:` ist `+` nach RFC 6068 ein echtes Pluszeichen im Betreff.
 */
export function mailto(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
}

export const KIND_LABELS: Record<string, string> = {
  kundenprojekt: 'Kundenprojekt',
  'eigenes-produkt': 'Eigenes Produkt',
  prototyp: 'Prototyp',
  studienprojekt: 'Studienprojekt',
}
