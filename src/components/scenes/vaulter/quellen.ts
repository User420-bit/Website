/**
 * Beispieldaten für den Eingang auf der Vaulter-Seite (VaulterScene.astro):
 * vier Quellen, je mit den Meldungen, die Vaulter beim Abarbeiten ausgibt, und
 * der Notiz, die am Ende in `0-Inbox/` liegt. Meldungen und Aufbau der Notiz
 * folgen dem Werkzeug (`pipeline.py`, `vault.py`, `templates/quelle_*.md.j2`),
 * Titel, Inhalte und Zahlen sind erfunden und heißen in der Bildunterschrift
 * Beispieldaten.
 *
 * Zeiten in Millisekunden ab Start des Laufs. Nichts davon wird geladen oder
 * berechnet: Die Seite spielt nur ab, was hier steht.
 *
 * Achtung, Platzhalter-Check (`scripts/verify-build.mjs`): kein Text in
 * eckigen Klammern mit Großbuchstaben dahinter. `tags: [video]` und
 * `![[messer-1.jpg]]` sind klein und deshalb in Ordnung.
 */

export type Welle = 'eine' | 'mikrofon' | 'systemton'

export interface Meldung {
  text: string
  /** Start in ms. */
  t: number
  /** Tonspur in dieser Zeile, atmet von `t` bis zur nächsten Meldung. */
  welle?: Welle
  /** Ergebnis statt Zwischenschritt: steht in Tinte. */
  art?: 'ergebnis' | 'fehler' | 'hinweis'
}

export interface Notizzeile {
  text: string
  art?: 'fm' | 'titel' | 'kopf' | 'leise'
  /** Eigene Startzeit, sonst folgt die Zeile der vorigen. Für live Mitgeschriebenes. */
  t?: number
}

export interface Quelle {
  id: 'youtube' | 'instagram' | 'tiktok' | 'gespraech'
  reiter: string
  /** Der eingereihte Link. Fehlt er, ist es ein Gespräch mit Einverständnis-Sperre. */
  link?: string
  /** Kurzname für `Metadaten aus <plattform>-…/ wiederverwendet.` */
  plattform?: string
  /** Bildbeitrag: beim zweiten Lauf kommen Bilder statt Transkript aus `data/`. */
  bilder?: boolean
  datei: string
  meldungen: Meldung[]
  /** Ab hier schreibt sich die Notiz, Zeile für Zeile. */
  notizAb: number
  notiz: Notizzeile[]
}

const fm = (text: string): Notizzeile => ({ text, art: 'fm' })
const kopf = (text: string): Notizzeile => ({ text: `## ${text}`, art: 'kopf' })

export const QUELLEN: Quelle[] = [
  {
    id: 'youtube',
    reiter: 'YouTube',
    link: 'https://www.youtube.com/watch?v=…',
    plattform: 'youtube',
    datei: 'Video – Wie Sauerteig geht.md',
    meldungen: [
      { text: 'Metadaten holen (youtube) …', t: 0 },
      { text: 'Untertitel holen (de) …', t: 650 },
      { text: 'Transkript: 2140 Wörter', t: 1300 },
      { text: 'Strukturieren mit Claude …', t: 1750 },
      { text: 'Einschätzung: Substanz hoch.', t: 2700 },
    ],
    notizAb: 2950,
    notiz: [
      fm('---'),
      fm('type: source'),
      fm('tags: [video]'),
      fm('source: https://www.youtube.com/watch?v=…'),
      fm('---'),
      { text: '# Video – Wie Sauerteig geht', art: 'titel' },
      kopf('Zusammenfassung'),
      { text: 'Reifes Anstellgut, lange Ruhe, wenig Hefe. Der Teig braucht Zeit, keine Zusätze.' },
      kopf('Einschätzung'),
      { text: 'Substanz: hoch. Jeder Schritt wird am Teig gezeigt.' },
      kopf('Kernaussagen'),
      { text: '- Temperatur schlägt Rezept' },
      { text: '- Anstellgut erst nehmen, wenn es sich verdoppelt hat' },
      kopf('Transkript'),
      { text: '[00:00] Heute geht es nur um Geduld …', art: 'leise' },
    ],
  },
  {
    id: 'instagram',
    reiter: 'Instagram',
    link: 'https://www.instagram.com/p/…',
    plattform: 'instagram',
    bilder: true,
    datei: 'Post – Messer schärfen in fünf Schritten.md',
    meldungen: [
      { text: 'Metadaten holen (instagram) …', t: 0 },
      { text: 'Bildbeitrag mit 5 Bildern, kein Video.', t: 600 },
      { text: '5 Bilder laden …', t: 1000 },
      { text: '5 Bilder an Claude …', t: 1500 },
      { text: 'Strukturieren mit Claude …', t: 2350 },
      { text: 'Einschätzung: Substanz mittel.', t: 3100 },
    ],
    notizAb: 3350,
    notiz: [
      fm('---'),
      fm('type: source'),
      fm('tags: [post]'),
      fm('source: https://www.instagram.com/p/…'),
      fm('---'),
      { text: '# Post – Messer schärfen in fünf Schritten', art: 'titel' },
      kopf('Zusammenfassung'),
      { text: 'Fünf Bilder, ein Ablauf: Winkel finden, halten, abziehen.' },
      kopf('Kernaussagen'),
      { text: '- Der Winkel zählt mehr als der Stein' },
      kopf('Bildinhalt'),
      { text: '![[messer-1.jpg]]' },
      { text: 'Text im Bild: Winkel 15 Grad, ruhig halten' },
      kopf('Transkript'),
      { text: 'Kein Transkript: Der Beitrag besteht aus Bildern.', art: 'leise' },
    ],
  },
  {
    id: 'tiktok',
    reiter: 'TikTok',
    link: 'https://www.tiktok.com/@…/video/…',
    plattform: 'tiktok',
    datei: 'Video – Kaffee kalt aufbrühen.md',
    meldungen: [
      { text: 'Metadaten holen (tiktok) …', t: 0 },
      { text: 'Audio laden …', t: 600 },
      { text: 'Transkribieren mit Whisper …', t: 1100, welle: 'eine' },
      { text: 'Transkript: 310 Wörter', t: 2700 },
      { text: 'Strukturieren mit Claude …', t: 3100 },
      { text: 'Einschätzung: Substanz niedrig.', t: 3900 },
    ],
    notizAb: 4150,
    notiz: [
      fm('---'),
      fm('type: source'),
      fm('tags: [video]'),
      fm('source: https://www.tiktok.com/@…/video/…'),
      fm('---'),
      { text: '# Video – Kaffee kalt aufbrühen', art: 'titel' },
      kopf('Zusammenfassung'),
      { text: 'Grob mahlen, zwölf Stunden ziehen lassen, filtern.' },
      kopf('Einschätzung'),
      { text: 'Substanz: niedrig. Ein Rezept, kaum Begründung.' },
      kopf('Kernaussagen'),
      { text: '- Kalt gebrüht schmeckt weniger bitter' },
      kopf('Transkript'),
      { text: '[00:00] Das hier ist mein Sommerkaffee …', art: 'leise' },
      { text: '[00:14] Grob mahlen, sonst wird es trüb …', art: 'leise' },
    ],
  },
  {
    id: 'gespraech',
    reiter: 'Gespräch',
    datei: 'Meeting – Umzug der Werkstatt.md',
    meldungen: [
      { text: 'Aufnahme läuft', t: 0, art: 'ergebnis' },
      { text: 'Mikrofon', t: 150, welle: 'mikrofon' },
      { text: 'Systemton', t: 150, welle: 'systemton' },
      { text: 'Die Aufnahme ist beendet', t: 4600 },
      { text: 'Aufnahme auswerten …', t: 4900 },
      { text: 'Strukturieren mit Claude …', t: 5400 },
    ],
    // Beim Gespräch steht das Gerüst sofort und das Transkript wächst live;
    // Zusammenfassung und Aufgaben füllen die Lücken erst nach der Auswertung.
    notizAb: 6100,
    notiz: [
      { ...fm('---'), t: 300 },
      { ...fm('type: source'), t: 370 },
      { ...fm('tags: [meeting]'), t: 440 },
      { ...fm('platform: meeting'), t: 510 },
      { ...fm('---'), t: 580 },
      { text: '# Meeting – Umzug der Werkstatt', art: 'titel', t: 650 },
      kopf('Zusammenfassung'),
      { text: 'Umzug am Donnerstag ab zehn, Schlüssel kommen vorher.' },
      kopf('Aufgaben'),
      { text: '- [ ] **Ich:** Schlüssel abholen (bis Mittwoch)' },
      { ...kopf('Transkript'), t: 720 },
      { text: '[00:00] **Ich:** Passt euch Donnerstag für den Umzug?', art: 'leise', t: 900 },
      { text: '[00:04] **Andere:** Donnerstag geht, aber erst ab zehn.', art: 'leise', t: 2300 },
      { text: '[00:09] **Ich:** Dann hole ich Mittwoch die Schlüssel.', art: 'leise', t: 3700 },
    ],
  },
]

/** Abstand zwischen zwei Notizzeilen beim Schreiben. */
export const ZEILENTAKT = 70
