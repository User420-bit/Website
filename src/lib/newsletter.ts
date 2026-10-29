import { getCollection, type CollectionEntry } from 'astro:content'
import { ausgabeDatum } from '@/lib/site'

export type Ausgabe = CollectionEntry<'newsletter'> & { datum: Date }

type Quelle = CollectionEntry<'newsletter'>['data']['topThree'][number]['sources'][number]

/** Die fünf Stufen der politischen Ausrichtung, von links nach rechts. */
const RICHTUNGEN = ['links', 'Mitte-links', 'Mitte', 'Mitte-rechts', 'rechts'] as const

/**
 * Aus welchen Richtungen die Quellen einer Meldung kommen, von links nach
 * rechts, und ob mehrere Redaktionen alle aus derselben Richtung berichten.
 * `null`, wenn keine Quelle eine Ausrichtung trägt.
 */
export function abdeckung(
  quellen: readonly Quelle[],
): { richtungen: string[]; einseitig: boolean } | null {
  const richtungen = RICHTUNGEN.filter((r) => quellen.some((q) => q.ausrichtung === r))
  if (richtungen.length === 0) return null
  const redaktionen = new Set(quellen.map((q) => q.source)).size
  return { richtungen, einseitig: redaktionen >= 2 && richtungen.length === 1 }
}

/**
 * So viele Ausgaben zeigt die Seite: drei die Woche, also rund ein Monat. Kommt
 * eine neue hinzu, fällt die älteste heraus, samt ihrer Seite. Die Datei bleibt
 * im Repository. `scripts/verify-build.mjs` liest die Zahl von hier.
 */
export const SICHTBARE_AUSGABEN = 12

/**
 * Die letzten `SICHTBARE_AUSGABEN` Ausgaben, neueste zuerst, jede mit ihrem
 * Datum aus dem Dateinamen.
 */
export async function ausgaben(): Promise<Ausgabe[]> {
  return (await getCollection('newsletter'))
    .map((eintrag) => ({ ...eintrag, datum: ausgabeDatum(eintrag.id) }))
    .sort((a, b) => b.datum.getTime() - a.datum.getTime())
    .slice(0, SICHTBARE_AUSGABEN)
}

/** Anzahl der Meldungen einer Ausgabe: die drei wichtigsten plus alle Themenblöcke. */
export function meldungen(ausgabe: CollectionEntry<'newsletter'>): number {
  const { topThree, clusters } = ausgabe.data
  return topThree.length + clusters.reduce((summe, c) => summe + c.items.length, 0)
}
