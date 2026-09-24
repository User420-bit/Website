/**
 * Geometrie der MemoryTree-Szene, beim Bauen berechnet: Stamm und Äste als
 * gefüllte, sich verjüngende Formen, das Laub als Blätter in Büscheln, die
 * Punktkarte und die Lage der acht Fotos in den vier Sichten der App.
 *
 * Alles liegt in einem Feld von 400 × 420 Einheiten (viewBox der Szene). Der
 * Zufall ist geseedet: Jeder Build zeichnet denselben Baum.
 */

export const BREITE = 400
export const HOEHE = 420
/** Höhe der Bodenlinie, auf der der Stamm steht. */
export const BODEN = 404

/** Kleiner, geseedeter Zufallsgenerator (mulberry32). */
function zufall(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10

type Punkt = [x: number, y: number]
/** Ein Punkt auf dem Ast mit der Astbreite an dieser Stelle. */
type Knoten = [x: number, y: number, breite: number]

/** Catmull-Rom durch alle Punkte, als kubische Bézier-Segmente (ohne das erste M). */
function glatt(p: Punkt[]): string {
  let d = ''
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i]
    const b = p[i]
    const c = p[i + 1]
    const e = p[i + 2] ?? c
    const c1: Punkt = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]
    const c2: Punkt = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6]
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(c[0])} ${r1(c[1])}`
  }
  return d
}

/**
 * Ein Ast als gefüllte Form: links hinauf, runde Spitze, rechts zurück. Die
 * Breite nimmt von Knoten zu Knoten ab; übereinanderliegende Äste derselben
 * Farbe verschmelzen zu einem Baum ohne Kontur.
 */
function ast(knoten: Knoten[]): string {
  const links: Punkt[] = []
  const rechts: Punkt[] = []
  knoten.forEach(([x, y, w], i) => {
    const vor = knoten[Math.max(0, i - 1)]
    const nach = knoten[Math.min(knoten.length - 1, i + 1)]
    const tx = nach[0] - vor[0]
    const ty = nach[1] - vor[1]
    const len = Math.hypot(tx, ty) || 1
    const nx = -ty / len
    const ny = tx / len
    links.push([x + (nx * w) / 2, y + (ny * w) / 2])
    rechts.push([x - (nx * w) / 2, y - (ny * w) / 2])
  })
  const spitze = knoten[knoten.length - 1]
  const r = Math.max(spitze[2] / 2, 0.6)
  const zurueck = rechts.slice().reverse()
  return (
    `M${r1(links[0][0])} ${r1(links[0][1])}` +
    glatt(links) +
    `A${r1(r)} ${r1(r)} 0 0 1 ${r1(zurueck[0][0])} ${r1(zurueck[0][1])}` +
    glatt(zurueck) +
    'Z'
  )
}

/* Stamm und Äste, vom Boden aus. Handgesetzt, damit der Baum ruhig steht. */
const AESTE: Knoten[][] = [
  // Stamm
  [
    [200, BODEN + 1, 40],
    [200, 380, 31],
    [201, 350, 27],
    [199, 318, 25],
    [199, 290, 23],
    [200, 270, 21],
  ],
  // Wurzelanläufe
  [
    [198, 386, 14],
    [188, 398, 8],
    [176, BODEN + 1, 3],
  ],
  [
    [202, 386, 14],
    [212, 398, 8],
    [224, BODEN + 1, 3],
  ],
  // großer Ast links
  [
    [199, 292, 19],
    [182, 268, 16],
    [158, 248, 12.5],
    [130, 230, 9.5],
    [100, 214, 6],
    [70, 204, 2.8],
  ],
  // großer Ast rechts
  [
    [200, 294, 19],
    [219, 268, 15.5],
    [246, 246, 12],
    [276, 228, 9],
    [306, 214, 5.5],
    [334, 206, 2.5],
  ],
  // Mitte hinauf
  [
    [199, 280, 16],
    [203, 246, 13],
    [197, 206, 10],
    [202, 166, 7.5],
    [197, 126, 5],
    [201, 84, 2.5],
  ],
  // links hinauf
  [
    [160, 248, 9.5],
    [150, 218, 7.5],
    [145, 186, 6],
    [150, 152, 4],
    [141, 118, 2],
  ],
  // rechts hinauf
  [
    [244, 246, 9],
    [254, 214, 7],
    [259, 182, 5],
    [252, 150, 3.2],
    [259, 116, 1.8],
  ],
  // Zweige
  [
    [130, 230, 6],
    [108, 234, 4],
    [84, 244, 2],
  ],
  [
    [276, 228, 6],
    [296, 238, 4.5],
    [314, 252, 3],
    [322, 262, 2],
  ],
  [
    [199, 210, 6],
    [178, 190, 4.2],
    [166, 164, 2.4],
  ],
  [
    [201, 170, 5],
    [222, 150, 3.5],
    [232, 126, 1.8],
  ],
  [
    [146, 186, 4.5],
    [122, 170, 3],
    [102, 154, 1.6],
  ],
  [
    [258, 184, 4.5],
    [282, 168, 3],
    [300, 150, 1.6],
  ],
]

export const astPfade = AESTE.map(ast)

/** Licht auf der linken Seite des Stamms: Tiefe aus Farbe, nicht aus Schatten. */
export const stammLicht = ast([
  [192, 396, 4],
  [191, 372, 6],
  [192, 344, 5.5],
  [192, 314, 4.5],
  [193, 292, 2.5],
])

/* Die Krone als Vereinigung von Ellipsen; das Laub sitzt nur darin. */
const KRONE: [cx: number, cy: number, rx: number, ry: number][] = [
  [200, 160, 124, 92],
  [128, 112, 70, 62],
  [200, 70, 76, 56],
  [272, 112, 70, 62],
  [84, 192, 52, 50],
  [316, 192, 52, 50],
  [146, 226, 72, 48],
  [254, 226, 72, 48],
]
const inKrone = (x: number, y: number, rand = 0) =>
  KRONE.some(
    ([cx, cy, rx, ry]) => ((x - cx) / (rx - rand)) ** 2 + ((y - cy) / (ry - rand)) ** 2 <= 1,
  )

/**
 * Der Grund der Krone: dieselben Ellipsen, etwas kleiner, in einem mittleren
 * Grün. Er gibt der Krone ihre Fläche; das Laub darüber bricht den Rand auf.
 */
export const kronenGrund = KRONE.map(([cx, cy, rx, ry]) => ({ cx, cy, rx: rx - 8, ry: ry - 8 }))

/** Mittelpunkt, von dem aus die Krone austreibt: oben am Stamm. */
export const AUSTRIEB = { x: 200, y: 250 }

interface Blatt {
  x: number
  y: number
  /** Richtung der Blattachse im Bogenmaß. */
  winkel: number
  laenge: number
  breite: number
  /** 0 dunkel bis 3 hell: Licht von links oben, Tiefe nur aus Farbe. */
  ton: number
  /** Austriebswelle 0–5, vom Stamm nach außen. */
  welle: number
}

function blatt(rand: () => number, x: number, y: number, winkel = rand() * Math.PI): Blatt {
  const licht = 1 - (y - 18) / 250 + (200 - x) / 600
  return {
    x,
    y,
    winkel,
    laenge: 10 + rand() * 5,
    breite: 5 + rand() * 2.4,
    ton: Math.max(0, Math.min(3, Math.round(licht * 2.2 + (rand() - 0.5) * 1.8))),
    welle: Math.min(5, Math.floor(Math.hypot(x - AUSTRIEB.x, y - AUSTRIEB.y) / 40)),
  }
}

/**
 * Ein Blatt als Unterpfad: Spitze, Bogen zur anderen Spitze, Bogen zurück.
 * Ganze Einheiten reichen (eine Einheit ist gut ein Pixel) und halten das
 * HTML klein; die Rundung bleibt für jedes Blatt geschlossen.
 */
function blattPfad({ x, y, winkel, laenge, breite }: Blatt): string {
  const ux = Math.cos(winkel)
  const uy = Math.sin(winkel)
  const lx = Math.round(ux * laenge)
  const ly = Math.round(uy * laenge)
  const cx = Math.round(lx / 2 - uy * breite)
  const cy = Math.round(ly / 2 + ux * breite)
  const zahl = (n: number) => (n < 0 ? `${n}` : ` ${n}`)
  return (
    `M${Math.round(x - lx / 2)}${zahl(Math.round(y - ly / 2))}` +
    `q${cx}${zahl(cy)}${zahl(lx)}${zahl(ly)}` +
    // Zurück über den gespiegelten Kontrollpunkt: relativ zur Spitze genau −(cx, cy).
    `q${-cx}${zahl(-cy)}${zahl(-lx)}${zahl(-ly)}`
  )
}

export interface Laubgruppe {
  ton: number
  welle: number
  d: string
}

/** Blätter nach Ton und Welle gebündelt: ein Pfad je Gruppe statt eines Elements je Blatt. */
function buendeln(blaetter: Blatt[]): Laubgruppe[] {
  const gruppen = new Map<string, Laubgruppe>()
  for (const b of blaetter) {
    const key = `${b.ton}-${b.welle}`
    const g = gruppen.get(key) ?? { ton: b.ton, welle: b.welle, d: '' }
    g.d += blattPfad(b)
    gruppen.set(key, g)
  }
  // Dunkle Gruppen zuerst: Helle liegen obenauf, so entsteht Tiefe ohne Schatten.
  return [...gruppen.values()].sort((a, b) => a.ton - b.ton || a.welle - b.welle)
}

export const laub = (() => {
  const rand = zufall(7)
  const blaetter: Blatt[] = []
  // Am Rand dicht und nach außen gerichtet: Er macht den Umriss.
  for (let versuche = 0; blaetter.length < 330 && versuche < 40000; versuche++) {
    const x = 40 + rand() * 320
    const y = 6 + rand() * 290
    if (!inKrone(x, y, -6) || inKrone(x, y, 13)) continue
    const aussen = Math.atan2(y - 160, x - 200)
    blaetter.push(blatt(rand, x, y, aussen + (rand() - 0.5) * 1.6))
  }
  // Innen in lockeren Büscheln: Sie geben der Fläche Struktur, der Grund scheint durch.
  for (let versuche = 0; blaetter.length < 700 && versuche < 40000; versuche++) {
    const bx = 50 + rand() * 300
    const by = 16 + rand() * 280
    if (!inKrone(bx, by, 8)) continue
    for (let j = 0; j < 5; j++) {
      const w = rand() * Math.PI * 2
      const d = Math.sqrt(rand()) * 11
      blaetter.push(blatt(rand, bx + Math.cos(w) * d, by + Math.sin(w) * d))
    }
  }
  return buendeln(blaetter)
})()

/**
 * Die Punktkarte: Land aus dem Screenshot der Karte abgeleitet (Wasserfarbe
 * der OpenStreetMap-Kacheln ausgezählt, 40 × 42 Zellen über den Ausschnitt,
 * in dem die Beispiel-Orte liegen). `#` ist Land.
 */
const LAND = `
####.............###.####.........######
#####.............#######........#######
#####.............######.......#########
.#####............##.###....###.########
#######...........#######.##############
...####.........########################
########....############################
.########....###########################
.########...############################
.########...############################
..#######..#############################
.#######.###############################
.##......###############################
........################################
...###.#################################
.....###################################
.#######################################
..######################################
....####################################
....####################################
.....###################################
.....###################################
......#################.################
.....##################..###############
.....#############.####..###############
.....############...####...#############
###########..##.....#####...############
###########.......#..####....###########
###########.......#..#####....##########
##########........#....####....#########
########..........#......####..#########
########..........#.....######..########
#######...##......#........#....####....
#######...........#........##....####...
#######....................#.....####...
######.................####.......####..
#####...........##.#...###........####..
####.......##.#######....#.........##...
#.....###############...................
#....################...................
#####################.................##
####################....................`
  .trim()
  .split('\n')

/** Die Karte endet knapp über der Bodenlinie. */
const KARTE_HOEHE = BODEN - 6

/** Alle Landpunkte als ein Pfad aus Nullstrichen; runde Linienenden machen daraus Punkte. */
export const kartenPunkte = LAND.flatMap((zeile, r) =>
  [...zeile].flatMap((z, c) =>
    z === '#' ? [`M${r1((c + 0.5) * (BREITE / 40))} ${r1((r + 0.5) * (KARTE_HOEHE / 42))}h0`] : [],
  ),
).join('')

/** Ein Foto aus dem Galerie-Screenshot (1600 × 900): linke obere Ecke des 256-px-Ausschnitts. */
interface Ausschnitt {
  x: number
  y: number
}

interface Lage {
  x: number
  y: number
  /** Drehung in Grad. */
  r: number
}

/** Im Baum sind die Abzüge nicht alle gleich groß. */
interface BaumLage extends Lage {
  s: number
}

export interface Foto {
  ausschnitt: Ausschnitt
  baum: BaumLage
  zeit: Lage
  karte: Lage
  galerie: Lage
}

const spalte = (i: number) => 314 + i * 324 - 128
const REIHE_1 = 287
const REIHE_2 = 592

/* Zeitstrahl: abwechselnd links und rechts einer senkrechten Linie. */
const zeit = (i: number): Lage => ({ x: i % 2 ? 258 : 142, y: 44 + i * 47, r: 0 })
/* Galerie: vier Spalten, zwei Reihen, wie in der App. */
const galerie = (i: number): Lage => ({ x: 55 + (i % 4) * 96.7, y: i < 4 ? 162 : 258, r: 0 })
/*
 * Karte: die Lage der Markierungen im Screenshot der Karte, in das Feld
 * umgerechnet (x: (px − 460) × 400/720, y: (px − 128) × 398/720).
 */
const ort = (px: number, py: number, r = 0): Lage => ({
  x: r1((px - 460) * (BREITE / 720)),
  y: r1((py - 128) * (KARTE_HOEHE / 720)),
  r,
})

/** Die acht Fotos in der Reihenfolge der Galerie der App. */
export const fotos: Foto[] = [
  // Küste mit Auto
  {
    ausschnitt: { x: spalte(0), y: REIHE_1 },
    baum: { x: 132, y: 92, r: -6, s: 62 },
    karte: ort(918, 660),
    zeit: zeit(0),
    galerie: galerie(0),
  },
  // Konzert im Park
  {
    ausschnitt: { x: spalte(1), y: REIHE_1 },
    baum: { x: 204, y: 64, r: 3, s: 64 },
    karte: ort(784, 352),
    zeit: zeit(1),
    galerie: galerie(1),
  },
  // Gasse mit Croissant
  {
    ausschnitt: { x: spalte(2), y: REIHE_1 },
    baum: { x: 274, y: 96, r: 5, s: 60 },
    karte: ort(628, 384, -8),
    zeit: zeit(2),
    galerie: galerie(2),
  },
  // Brücke am Abend
  {
    ausschnitt: { x: spalte(3), y: REIHE_1 },
    baum: { x: 94, y: 172, r: 4, s: 60 },
    karte: ort(646, 404, 5),
    zeit: zeit(3),
    galerie: galerie(3),
  },
  // Berge im Schnee
  {
    ausschnitt: { x: spalte(0), y: REIHE_2 },
    baum: { x: 166, y: 152, r: -3, s: 64 },
    karte: ort(959, 420),
    zeit: zeit(4),
    galerie: galerie(4),
  },
  // Küche
  {
    ausschnitt: { x: spalte(1), y: REIHE_2 },
    baum: { x: 238, y: 162, r: -5, s: 62 },
    karte: ort(813, 227),
    zeit: zeit(5),
    galerie: galerie(5),
  },
  // Abend am Fluss
  {
    ausschnitt: { x: spalte(2), y: REIHE_2 },
    baum: { x: 308, y: 176, r: 6, s: 58 },
    karte: ort(891, 266),
    zeit: zeit(6),
    galerie: galerie(6),
  },
  // Wanderung
  {
    ausschnitt: { x: spalte(3), y: REIHE_2 },
    baum: { x: 312, y: 318, r: 2, s: 58 },
    karte: ort(842, 431),
    zeit: zeit(7),
    galerie: galerie(7),
  },
]

/** Kantenlänge eines Fotos je Sicht, in Einheiten des Felds. */
export const GROESSE = { zeit: 50, karte: 42, galerie: 90 }

/**
 * Laub vor den Fotos: ein paar Blätter an den Rändern der Abzüge in der
 * Krone, damit die Fotos im Baum hängen statt auf ihm zu kleben.
 */
export const laubVorn = (() => {
  const rand = zufall(11)
  return buendeln(
    fotos.slice(0, 7).flatMap(({ baum }) => {
      const halb = baum.s / 2
      return Array.from({ length: 5 }, () => {
        // Ein Punkt auf dem Rand des Abzugs, leicht nach außen versetzt.
        const seite = Math.floor(rand() * 4)
        const t = (rand() - 0.5) * 1.8 * halb
        const aus = halb + rand() * 4
        const [dx, dy] = [
          [t, -aus],
          [aus, t],
          [t, aus],
          [-aus, t],
        ][seite]
        return { ...blatt(rand, baum.x + dx, baum.y + dy), welle: 5 }
      })
    }),
  )
})()
