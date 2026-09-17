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
 * "Arbeiten" steht vorn: erst der Beleg, dann das Angebot. "Kontakt" fehlt
 * hier, weil der Header dafuer die Schaltflaeche "Anfrage" traegt.
 */
export const NAV_ITEMS = [
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'arbeitsweise', label: 'Arbeitsweise' },
  { id: 'ueber', label: 'Über' },
] as const

export const KIND_LABELS: Record<string, string> = {
  kundenprojekt: 'Kundenprojekt',
  'eigenes-produkt': 'Eigenes Produkt',
  prototyp: 'Prototyp',
  studienprojekt: 'Studienprojekt',
}
