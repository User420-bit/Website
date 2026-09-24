/**
 * Zentralperspektive für die gezeichneten Standbilder von PointCare. Jedes Bild
 * ist mit einem Fluchtpunkt konstruiert, wie ein Filmstill mit fester Kamera:
 * Punkte stehen in Metern (x nach rechts, y nach oben ab Boden, z in die Tiefe)
 * und werden beim Bauen auf die Leinwand projiziert. Im Browser kommen nur
 * fertige Pfade an, kein Skript.
 *
 * Weil alle Fluchtlinien durch den Fluchtpunkt laufen, lässt sich eine
 * Kamerafahrt als Skalierung um genau diesen Punkt zeichnen: Die Linien bleiben
 * Linien, nur die Dinge wachsen, und zwar umso stärker, je näher sie sind.
 */
export type Punkt = readonly [x: number, y: number, z: number]

interface Kamera {
  /** Brennweite in Leinwand-Einheiten. */
  brennweite: number
  /** Fluchtpunkt auf der Leinwand, zugleich die Augenhöhe. */
  fluchtpunkt: readonly [number, number]
  /** Höhe der Kamera über dem Boden in Metern. */
  augenhoehe: number
}

const zahl = (n: number) => String(Math.round(n * 10) / 10)

export function kamera({ brennweite, fluchtpunkt: [fx, fy], augenhoehe }: Kamera) {
  const projiziere = ([x, y, z]: Punkt) =>
    [fx + (brennweite * x) / z, fy - (brennweite * (y - augenhoehe)) / z] as const
  const punkt = (p: Punkt) => projiziere(p).map(zahl).join(' ')

  return {
    projiziere,
    /** Leinwand-Einheiten pro Meter in der Tiefe `z`. */
    massstab: (z: number) => brennweite / z,
    /** Geschlossene Fläche durch die Punkte. */
    flaeche: (...punkte: Punkt[]) => `M${punkte.map(punkt).join('L')}Z`,
    /** Offener Linienzug durch die Punkte. */
    linie: (...punkte: Punkt[]) => `M${punkte.map(punkt).join('L')}`,
    /** Rechteck in der Ebene `z` (Vorderseite eines Körpers). */
    front: (x0: number, x1: number, y0: number, y1: number, z: number) =>
      `M${punkt([x0, y0, z])}L${punkt([x1, y0, z])}L${punkt([x1, y1, z])}L${punkt([x0, y1, z])}Z`,
  }
}
