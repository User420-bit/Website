/**
 * Sätze aus dem Gerede des Heros für die Wahlhilfe in Leistungen
 * (docs/RUHE_PLAN.md, vorher Rückbezüge in mehreren Kapiteln,
 * docs/NACH_DEM_HERO_PLAN.md). Der Hero verspricht „Ich höre zu“; die
 * Wahlhilfe zeigt, welche Leistung auf welchen Satz antwortet, und die Stelle
 * der Antwort bekommt den Marker aus dem Hero.
 *
 * Beides wird beim Bauen geprüft. Fehlt der Satz im Gerede oder die Antwort
 * in der Beschreibung, bricht der Build: Dann passen Inhalt und Rückbezug
 * nicht mehr zusammen, und ein Zitat, das nie gesagt wurde, wäre erfunden.
 */

export type EchoQuelle = { bei: string; gerede: string; antwort: string }

/** Was eine Zeile zum Rendern braucht: die Wörter des Zitats und die Beschreibung mit Marker. */
export type Echo = { worte: string[]; html: string }

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Der Marker aus global.css; ob er zu sehen ist, entscheidet die Wahlhilfe (`data-antwort`). */
const markiert = (html: string) => `<mark class="marker" data-antwort>${html}</mark>`

/** Prüft, dass der Satz wörtlich im Gerede steht, und baut die Wörter des Zitats. */
function zitat(q: EchoQuelle, gerede: string): string[] {
  if (!gerede.includes(q.gerede)) {
    throw new Error(`heroEchos „${q.bei}“: „${q.gerede}“ steht nicht wörtlich in heroGerede`)
  }
  // Mitten aus einem Satz: Auslassungspunkte zeigen, dass vorher oder nachher mehr gesagt wurde.
  const text = `„${/^\p{Ll}/u.test(q.gerede) ? '… ' : ''}${q.gerede}${/[.!?]$/.test(q.gerede) ? '' : ' …'}“`
  return text.split(/\s+/)
}

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
  const worte = zitat(q, gerede)
  const stelle = beschreibung.indexOf(q.antwort)
  if (stelle < 0) {
    throw new Error(`heroEchos „${bei}“: „${q.antwort}“ steht nicht in der Beschreibung`)
  }
  const html =
    escape(beschreibung.slice(0, stelle)) +
    markiert(escape(q.antwort)) +
    escape(beschreibung.slice(stelle + q.antwort.length))
  return { worte, html }
}

/** Bricht den Build, wenn ein Eintrag auf keine Leistung zeigt (Tippfehler, umbenannte Leistung). */
export function echosPruefen(quellen: readonly EchoQuelle[], titel: readonly string[]): void {
  for (const q of quellen) {
    if (!titel.includes(q.bei)) {
      throw new Error(`heroEchos: „${q.bei}“ ist keine Leistung`)
    }
  }
}
