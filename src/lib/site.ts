/**
 * Baut einen internen Link inklusive Base-Pfad (`/Website/`) und mit
 * abschliessendem Slash. Der Slash ist kein Schoenheitsfehler: GitHub Pages
 * leitet `/Website/impressum` sonst per 301 auf `/Website/impressum/` um, und
 * jeder interne Klick kostet einen zusaetzlichen Roundtrip.
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const [rawPath = '/', hash] = path.split('#')
  const clean = rawPath.replace(/\/+$/, '')
  const withSlash = clean === '' ? '/' : `${clean}/`
  return `${base}${withSlash}${hash ? `#${hash}` : ''}`
}

/** Anker in der Hauptnavigation. Bewusst vier — mehr passt bei 390 px nicht. */
export const NAV_ITEMS = [
  { id: 'projekte', label: 'Projekte' },
  { id: 'kenntnisse', label: 'Kenntnisse' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'kontakt', label: 'Kontakt' },
] as const

export const CATEGORY_LABELS: Record<string, string> = {
  eigenstaendig: 'Eigenständig',
  'ai-unterstuetzt': 'AI-unterstützt',
}
