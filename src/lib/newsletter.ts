import { getCollection, type CollectionEntry } from 'astro:content'
import { ausgabeDatum } from '@/lib/site'

export type Ausgabe = CollectionEntry<'newsletter'> & { datum: Date }

/** Alle Newsletter-Ausgaben, neueste zuerst, jede mit ihrem Datum aus dem Dateinamen. */
export async function ausgaben(): Promise<Ausgabe[]> {
  return (await getCollection('newsletter'))
    .map((eintrag) => ({ ...eintrag, datum: ausgabeDatum(eintrag.id) }))
    .sort((a, b) => b.datum.getTime() - a.datum.getTime())
}

/** Anzahl der Meldungen einer Ausgabe: die drei wichtigsten plus alle Themenblöcke. */
export function meldungen(ausgabe: CollectionEntry<'newsletter'>): number {
  const { topThree, clusters } = ausgabe.data
  return topThree.length + clusters.reduce((summe, c) => summe + c.items.length, 0)
}
