import { getCollection, type CollectionEntry } from 'astro:content'
import { ausgabeDatum } from '@/lib/site'

export type Ausgabe = CollectionEntry<'newsletter'> & { datum: Date }

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
