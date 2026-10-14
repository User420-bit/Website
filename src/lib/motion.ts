/**
 * Bewegung mit Motion (motion.dev), gebündelt aus dem Repository, nichts von
 * fremden Servern. Hier liegen die Tokens und die Regeln, die jede Sektion
 * teilt. Wer Bewegung baut, importiert von hier, nicht direkt aus `motion`:
 * So bleibt die Kurve eine, die Dauern drei, und `prefers-reduced-motion`
 * wird nirgends vergessen.
 *
 * Regeln (DESIGN.md, „Bewegung“):
 * - Ohne Skript und mit reduzierter Bewegung steht der Endzustand sofort.
 *   Anfangszustände (Deckkraft 0, verschoben) setzt nur CSS unter
 *   `html[data-bewegung]`. Solange dieses Modul nicht geladen ist, hebt
 *   `global.css` sie nach 2 s von selbst auf (Sicherheitsnetz); sobald es
 *   läuft, meldet es sich unten mit `data-bewegung="laeuft"`, und die
 *   Sektionen entscheiden selbst, wann etwas ins Bild kommt (`inView`).
 * - Die H1 bewegt sich nie (außer im Scroll-Hero).
 * - Nichts erscheint von selbst beim Scrollen (seit 2026-10-14,
 *   docs/RUHE_PLAN.md): Bewegung antwortet auf eine Handlung.
 * - Was von selbst länger als 5 s läuft, braucht eine Pause-Taste.
 */
export { animate, inView, press } from 'motion'

/** Die eine Kurve des Systems, `--ease-quiet` in global.css. */
export const KURVE: [number, number, number, number] = [0.2, 0, 0, 1]

/** Dauern in Sekunden, wie die CSS-Tokens `--duration-*`. `szene` nur für Bilder und Linien. */
export const DAUER = {
  schnell: 0.12,
  basis: 0.2,
  langsam: 0.32,
  szene: 0.6,
} as const

/** Wie weit Text bei einer Antwort (Blättern, Umschalten, Hero) höchstens wandert, in Pixeln. */
export const WEG_TEXT = 8

/** Wahr, wenn der Besucher Bewegung zulässt. Jede Bewegung prüft das zuerst. */
export function bewegt(): boolean {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

/**
 * Führt `start` aus, wenn Bewegung erlaubt ist, sonst `ruhe` (Endzustand
 * herstellen, falls CSS einen Anfangszustand gesetzt hat).
 */
export function wennBewegt(start: () => void, ruhe?: () => void): void {
  if (bewegt()) start()
  else ruhe?.()
}

/** Alle Elemente eines Selektors, typisiert, als Array. */
export function alle<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] {
  return [...root.querySelectorAll<T>(selector)]
}

/*
 * Das Modul läuft: Sicherheitsnetz abnehmen (siehe global.css). Nur, wenn
 * `MotionReady` das Attribut vergeben hat; mit reduzierter Bewegung bleibt
 * es weg, und kein Anfangszustand greift.
 */
if (document.documentElement.dataset.bewegung === '') {
  document.documentElement.dataset.bewegung = 'laeuft'
}
