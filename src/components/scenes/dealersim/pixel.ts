/**
 * Pixelgrafik für die Szene von DealerSim, gerechnet beim Build.
 *
 * Eine Einheit im `viewBox` ist ein Spielpixel. Alles liegt auf ganzen Zahlen,
 * und die Szene wird nur in ganzen Vielfachen skaliert, damit jedes Pixel
 * gleich groß bleibt. Schräge Kanten sind deshalb keine Linien, sondern
 * Treppen aus zwei Pixeln quer und einem Pixel tief, wie im Spiel.
 *
 * Die Figuren sind als Zeichenraster notiert, eine Zeile je Pixelreihe und
 * ein Zeichen je Farbe, so wie sie im Sprite-Studio des Spiels entstehen.
 * Daraus wird je Farbe ein einziger Pfad.
 */

export type Punkt = readonly [number, number]

/** Kachel 16 × 8, das Seitenverhältnis 2 : 1 der Pixel-Isometrie. */
export const KACHEL_B = 16
export const KACHEL_H = 8

/** Pfad eines Polygons, dessen schräge Kanten als Pixeltreppe laufen. */
export function treppe(punkte: readonly Punkt[]): string {
  const [start] = punkte
  let d = `M${start[0]} ${start[1]}`
  for (let i = 0; i < punkte.length; i++) {
    const [x0, y0] = punkte[i]
    const [x1, y1] = punkte[(i + 1) % punkte.length]
    const dx = x1 - x0
    const dy = y1 - y0
    if (dx === 0 || dy === 0) {
      d += dx === 0 ? `v${dy}` : `h${dx}`
      continue
    }
    const schritte = Math.abs(dy)
    const h = `h${dx / schritte}`
    const v = `v${Math.sign(dy)}`
    // Nach links unten zuerst senkrecht, sonst zuerst waagerecht: So greifen
    // benachbarte Kacheln ohne Lücke ineinander.
    d += (dx < 0 && dy > 0 ? v + h : h + v).repeat(schritte)
  }
  return `${d}z`
}

/** Die vier Ecken einer Kachel, deren obere Spitze bei (x, y) liegt. */
export function raute(x: number, y: number): Punkt[] {
  return [
    [x - KACHEL_B / 2, y + KACHEL_H / 2],
    [x, y],
    [x + KACHEL_B / 2, y + KACHEL_H / 2],
    [x, y + KACHEL_H],
  ]
}

/**
 * Ein Sprite als Pfade je Farbe. `.` ist durchsichtig; jede Folge gleicher
 * Zeichen in einer Reihe wird ein Rechteck von einem Pixel Höhe.
 */
export function sprite(raster: readonly string[], x: number, y: number) {
  const pfade = new Map<string, string>()
  raster.forEach((reihe, dy) => {
    let dx = 0
    while (dx < reihe.length) {
      const farbe = reihe[dx]
      let laenge = 1
      while (reihe[dx + laenge] === farbe) laenge++
      if (farbe !== '.') {
        pfade.set(farbe, `${pfade.get(farbe) ?? ''}M${x + dx} ${y + dy}h${laenge}v1h${-laenge}z`)
      }
      dx += laenge
    }
  })
  return [...pfade].map(([farbe, d]) => ({ farbe, d }))
}

/*
 * Farben: k Kontur · m/M Metall hell/dunkel · d Dunkel innen · g/G Blatt ·
 * y Licht · w/W Holz · p/P Kiste lila · o/O Ware · b Hemd · n Hose · s Haut ·
 * h Haar · t Bildschirm
 */

export const ZELT = [
  '..kkkkkkkk..',
  '.kmmmmmmmmk.',
  'kmyyyyyyyymk',
  'kmddddddddmk',
  'kmddddgdddmk',
  'kmdddgggddmk',
  'kmddgggGgdmk',
  'kmdddgGgddmk',
  'kmddgGgggdmk',
  'kmdddgGgddmk',
  'kmddddGdddmk',
  'kmdddwwwddmk',
  'kmdddWWWddmk',
  'kmmmmmmmmmmk',
  'kMMMMMMMMMMk',
  '.k........k.',
] as const

export const GESTELL = [
  'kW..........Wk',
  'kWwwwwwwwwwwWk',
  'kW.g..y..g..Wk',
  'kW.g..y..g..Wk',
  'kW.G..y..G..Wk',
  'kWwwwwwwwwwwWk',
  'kW..y..g..y.Wk',
  'kW..y..g..y.Wk',
  'kW..y..G..y.Wk',
  'kWwwwwwwwwwwWk',
  'kW..........Wk',
  'kW..........Wk',
] as const

export const TISCH = [
  '..kkkk..kkkk..',
  '..kppk..koOk..',
  '..kPPk..kOOk..',
  'kkkkkkkkkkkkkk',
  'kwwwwwwwwwwwwk',
  'kWWWWWWWWWWWWk',
  '.kW........Wk.',
  '.kW........Wk.',
  '.kW........Wk.',
] as const

export const PERSON = [
  '.hhhh.',
  'hhhhhh',
  'hskskh',
  '.ssss.',
  'bbbbbb',
  'bbbbbb',
  'sbbbbs',
  'sbbbbs',
  '.nnnn.',
  '.nnnn.',
  '.n..n.',
  '.k..k.',
] as const

export const PFLANZE = [
  '.gggg.',
  'gggGgg',
  'gGgggg',
  '.gggG.',
  '..ww..',
  '.kwwk.',
  '.kWWk.',
] as const

export const LAMPE = ['yyyy', 'yyyy', '.mm.', '.mm.', '.mm.', '.mm.', '.mm.', 'mmmm'] as const

export const BILDSCHIRM = [
  'kkkkkkkkkk',
  'kttttttttk',
  'ktdttdtddk',
  'kttttttttk',
  'kkkkkkkkkk',
  '...kMMk...',
  '..kMMMMk..',
] as const
