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
 *   `html[data-bewegung]`, und `global.css` hebt sie nach 2 s von selbst auf,
 *   falls ein Skript nicht läuft (Sicherheitsnetz).
 * - Die H1 bewegt sich nie. Text darf einziehen, aber kurz (≤ 320 ms) und
 *   höchstens 8 px weit; Linien, Bilder und Belege dürfen mehr.
 * - Was von selbst länger als 5 s läuft, braucht eine Pause-Taste.
 */
export { animate, hover, inView, press, scroll, spring, stagger } from 'motion'

/** Die eine Kurve des Systems, `--ease-quiet` in global.css. */
export const KURVE: [number, number, number, number] = [0.2, 0, 0, 1]

/** Dauern in Sekunden, wie die CSS-Tokens `--duration-*`. `szene` nur für Bilder und Linien. */
export const DAUER = {
  schnell: 0.12,
  basis: 0.2,
  langsam: 0.32,
  szene: 0.6,
} as const

/** Abstand zwischen gestaffelten Elementen in Sekunden. */
export const STAFFEL = 0.06

/** Wie weit Text höchstens einzieht, in Pixeln. */
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
