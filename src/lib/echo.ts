/**
 * Rückbezüge aufs Gerede des Heros (docs/NACH_DEM_HERO_PLAN.md). Der Hero
 * verspricht „Ich höre zu“; weiter unten zeigt die Seite, was sie gehört hat:
 * Ein Satz aus dem Gerede steht wörtlich neben der Antwort, und die Stelle
 * der Antwort, die ihn beantwortet, bekommt den Marker aus dem Hero.
 *
 * Beides wird beim Bauen geprüft. Fehlt der Satz im Gerede oder die Antwort
 * in der Beschreibung, bricht der Build: Dann passen Inhalt und Rückbezug
 * nicht mehr zusammen, und ein Zitat, das nie gesagt wurde, wäre erfunden.
 */

export type EchoQuelle = { bei: string; gerede: string; antwort: string }

/** Was eine Zeile zum Rendern braucht: die Wörter des Zitats und die Beschreibung mit Marker. */
export type Echo = { worte: string[]; html: string }

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Sucht den Rückbezug für `bei` und baut ihn. Ohne Eintrag `undefined`, dann
 * steht die Zeile wie bisher.
 */
export function echo(
  quellen: readonly EchoQuelle[],
  gerede: string,
  bei: string,
  beschreibung: string,
): Echo | undefined {
  const q = quellen.find((e) => e.bei === bei)
  if (!q) return undefined
  if (!gerede.includes(q.gerede)) {
    throw new Error(`heroEchos „${bei}“: „${q.gerede}“ steht nicht wörtlich in heroGerede`)
  }
  const stelle = beschreibung.indexOf(q.antwort)
  if (stelle < 0) {
    throw new Error(`heroEchos „${bei}“: „${q.antwort}“ steht nicht in der Beschreibung`)
  }
  // Mitten aus einem Satz: Auslassungspunkte zeigen, dass vorher oder nachher mehr gesagt wurde.
  const zitat = `„${/^\p{Ll}/u.test(q.gerede) ? '… ' : ''}${q.gerede}${/[.!?]$/.test(q.gerede) ? '' : ' …'}“`
  const html =
    escape(beschreibung.slice(0, stelle)) +
    `<mark data-echo-antwort>${escape(q.antwort)}</mark>` +
    escape(beschreibung.slice(stelle + q.antwort.length))
  return { worte: zitat.split(/\s+/), html }
}

/** Bricht den Build, wenn ein Rückbezug auf keinen Titel zeigt (Tippfehler, umbenannte Leistung). */
export function echosPruefen(quellen: readonly EchoQuelle[], titel: readonly string[]): void {
  for (const q of quellen) {
    if (!titel.includes(q.bei)) {
      throw new Error(`heroEchos: „${q.bei}“ ist weder eine Leistung noch ein Wert`)
    }
  }
}
