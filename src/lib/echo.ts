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

/** Der Marker aus global.css, für das Aufziehen in `GeredeEcho` vorbereitet. */
const markiert = (html: string) =>
  `<mark class="marker" data-echo-antwort data-marker-netz>${html}</mark>`

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

/**
 * Wie `echo`, aber für fertiges HTML (Text aus Markdown, etwa `about.md`).
 * Die Antwort muss im Text eines Elements stehen, ohne Tag dazwischen;
 * Zeilenumbrüche im Markdown zählen als Leerzeichen.
 */
export function echoHtml(
  quellen: readonly EchoQuelle[],
  gerede: string,
  bei: string,
  html: string,
): Echo | undefined {
  const q = quellen.find((e) => e.bei === bei)
  if (!q) return undefined
  const worte = zitat(q, gerede)
  const muster = new RegExp(
    escape(q.antwort)
      .split(/\s+/)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('\\s+'),
  )
  const treffer = muster.exec(html)
  if (!treffer) {
    throw new Error(`heroEchos „${bei}“: „${q.antwort}“ steht nicht im Text`)
  }
  return { worte, html: html.replace(muster, (t) => markiert(t)) }
}

/**
 * Bricht den Build, wenn ein Rückbezug auf keinen Ort zeigt (Tippfehler,
 * umbenannte Leistung): `titel` sind Leistungen, Werte und Abschnitte.
 */
export function echosPruefen(quellen: readonly EchoQuelle[], titel: readonly string[]): void {
  for (const q of quellen) {
    if (!titel.includes(q.bei)) {
      throw new Error(`heroEchos: „${q.bei}“ ist weder Leistung noch Wert noch Abschnitt`)
    }
  }
}
