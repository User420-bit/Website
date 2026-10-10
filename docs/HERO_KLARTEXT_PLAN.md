# Plan: Hero „Aus Gerede wird Klartext“

Stand: 2026-10-10 · Basis: `main` · Ergebnis eines Interviews zwischen Pharrel und Claude Code.
Gebaut am 2026-10-10 (`src/components/home/Hero.astro`, Rohtext in `company.json` als `heroGerede`). Ergänzt [`BEWEGUNG_PLAN.md`](BEWEGUNG_PLAN.md) um eine bewusste Ausnahme.

---

## 0. Die Idee in einem Satz

Beim ersten Öffnen der Startseite steht statt der H1 ein kurzer Brocken Kundengerede: eine Anfrage,
wie sie Klartext bekommt. Vier Wörter darin werden markiert, lösen sich und werden zur H1
„Ihre Probleme, klar gelöst.“ Der Rest verschwindet. Danach ist der Hero genau der von heute.

Was die Animation sagt: Klartext hört zu, zieht aus viel Gerede das Wesentliche, und was bleibt,
ist klar. Der Name wird vorgeführt, nicht behauptet.

## 1. Was bleibt, was sich ändert

**Bleibt.** Eine Kurve (`KURVE`), die Dauern aus `motion.ts`, ein einziges Orange, keine Schatten,
keine Unschärfe. Ohne Skript und bei `prefers-reduced-motion: reduce` steht die H1 sofort, es gibt
kein Gerede. Die Höhe des Hero ist vom ersten Bild an dieselbe (CLS 0). Alles nach der H1 („Für wen“,
Intro, Knöpfe, Adresse, Strich) bewegt sich wie heute, nur später gestartet.

**Ändert sich, bewusst.** Die Regel „Die H1 steht vom ersten Bild an und bewegt sich nie“ bekommt auf
der Startseite eine Ausnahme: Sie steht nach spätestens **1,5 s**. Der Largest Contentful Paint
verschiebt sich um diese Zeit. Preis akzeptiert, Grenze fest. Die Regel „Text höchstens 8 px“ gilt
nicht für die vier fliegenden Wörter; sie sind in dieser Phase Bild, nicht Text (wie Linien und
Belege, `DAUER.szene`). Alle anderen Texte des Hero halten 8 px weiter ein.

In `DESIGN.md` („Bewegung“) und `BEWEGUNG_PLAN.md` (Regel 3) ist die Ausnahme nachzutragen, wenn
gebaut wird.

## 2. Der Rohtext

Eine Anfrage, nicht wörtlich, aber aus dem zusammengesetzt, was die Referenzseiten erzählen
(Baukasten-Vorlage bei PointCare, Excel und Belege bei Kleinkram, Handy bei JustBeauty und
TIEFGANG, „kein System“ aus der Positionierung). Die vier Zielwörter stehen in Lesereihenfolge, damit
sie beim Herauslösen nach vorn fliegen und nicht kreuzen. „Ihre“ steht groß, weil die Anfrage
Klartext anspricht; so braucht es keine Groß-/Kleinschreibung zu wechseln.

> **Ihre** Seite hat mir ein Bekannter aus Rosenheim geschickt. Wir haben eine Baukasten-Website, die
> auf dem Handy komisch aussieht, und im Laden läuft alles über eine Excel-Tabelle: Bestand, Termine,
> Rechnungen. Jedes Jahr sucht die Steuerberatung die Belege zusammen. Eine Agentur wollte uns gleich
> ein ganzes System verkaufen, aber wir wollen kein System. Wir wollen, dass sich jemand unsere
> **Probleme** anschaut und ehrlich sagt, was Software braucht und was nicht. Es soll vorher **klar**
> sein, was es kostet und wie lange es dauert. Und wenn es fertig ist, soll es **gelöst** sein, nicht
> drei Monate lang nachgebessert.

95 Wörter. Mehr nicht: Bei 360 px Breite sind das rund 13 Zeilen in Kleinschrift, und man erkennt
noch, dass es ein Mensch sagt. 1000 Wörter wären eine graue Wand, aus der nichts „herausgelöst“
werden kann, weil niemand sie als Text liest.

Satz: Kleinschrift (`text-sm` bis `text-base`), Bleistiftgrau (`text-fg-muted`), `max-w-[60ch]`,
Zeilenhöhe entspannt. Keine Anführungszeichen, kein Kursiv: Es soll wie eine Notiz aussehen, nicht wie
ein Zitat. Der Rohtext liegt in `src/content/company.json` neben dem Claim (`heroGerede`), damit
Claim und Gerede zusammen gepflegt werden und ein Test prüfen kann, dass jedes Claim-Wort im Gerede
vorkommt.

## 3. Storyboard

Zeiten ab Skriptstart. Gesamt 1,5 s bis zur stehenden H1, danach der heutige Einzug.

| Zeit     | Was passiert                                                                                                                                                                                                                                                                  | Werte                                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 ms     | Gerede steht sofort, ohne Bewegung. H1 ist im DOM, aber unsichtbar (`opacity: 0`, nur unter `html[data-bewegung]`).                                                                                                                                                           | –                                                                                                                                                          |
| 250 ms   | **Markieren.** Hinter „Ihre“ zieht eine Fläche in `accent-soft` von links auf, Schrift wird `fg`. Dann „Probleme“, „klar“, „gelöst“, je 90 ms versetzt. Das ist der Moment, in dem der Besucher mitliest.                                                                     | `scaleX 0→1`, Ursprung links, `DAUER.basis` (200 ms), `STAFFEL` 90 ms                                                                                      |
| 700 ms   | **Herauslösen.** Die vier markierten Wörter (Kopien, absolut positioniert) wachsen von Kleinschrift auf Display-Größe und gleiten an die Stelle, an der das Wort in der echten H1 steht. Gleichzeitig verliert der Rest des Geredes Deckkraft auf 0 und zieht 8 px nach oben. | Position und `scale` je Wort aus `getBoundingClientRect`, `DAUER.szene` (600 ms), `KURVE`, Staffel 60 ms. Gerede: `opacity 1→0`, `y 0→-8`, `DAUER.langsam` |
| 1 200 ms | **Ankommen.** Die Marker-Fläche läuft nach rechts aus dem Wort (`scaleX 1→0`, Ursprung rechts), Komma und Punkt blenden ein.                                                                                                                                                  | `DAUER.basis`                                                                                                                                              |
| 1 400 ms | **Umschalten.** Echte H1 auf `opacity: 1`, Kopien entfernt. Pixelgleich, der Wechsel ist unsichtbar. Alle Inline-Styles weg.                                                                                                                                                  | sofort                                                                                                                                                     |
| 1 500 ms | **Heutiger Hero.** „Für wen“, Intro, Knöpfe, Adresse ziehen 8 px ein wie bisher, danach der Strich. Unverändert aus `Hero.astro`.                                                                                                                                             | wie heute                                                                                                                                                  |

Orange bekommt genau eine Rolle: die Markerfläche in `accent-soft` hinter den vier Wörtern, für etwa
eine Sekunde. Die fertige H1 ist Tinte wie heute. So bleibt es bei einem Signal.

## 4. Technik, ohne Überraschungen

- **Schicht statt Fluss.** Das Gerede liegt `absolute` über dem Hero-Inhalt, der Hero behält die Höhe
  von heute (H1 + Zeilen + Knöpfe). Das Gerede ist auf jeder Breite kürzer als dieser Block
  (Desktop ≈ 7 Zeilen gegen ≈ 450 px Hero, Mobil ≈ 13 Zeilen gegen ≈ 500 px). Nichts springt.
- **Ziele messen, nicht raten.** Die echte H1 wird in vier `<span>` je Wort gesetzt (plus Komma und
  Punkt als eigene Spans). Vor dem Flug misst das Skript jede Span mit `getBoundingClientRect`
  und berechnet aus Quell- und Zielrechteck Translation und Skalierung je Kopie. Das überlebt jede
  Breite, jeden Zeilenumbruch und `text-balance`.
- **Schriftgröße per `scale`, nicht per `font-size`.** Ein `font-size`-Übergang bricht das Layout
  des Geredes bei jedem Frame. Die Kopie wird mit der Display-Schriftart gerendert und von
  `scale(klein)` auf `scale(1)` gezogen. Instrument Sans, Gewicht 600, `letter-spacing -0.03em` auf
  der Kopie von Anfang an, damit der Umriss beim Andocken stimmt.
- **Einmal pro Sitzung.** `sessionStorage['klartext-hero']` wird nach dem ersten Lauf gesetzt. Beim
  Neuladen und beim Zurückkommen von einer Projektseite steht die H1 sofort. Ein neuer Tab oder ein
  neuer Besuch spielt es wieder. Das ist, was du mit „frisch auf die Seite“ meintest.
- **Fallbacks wie im System.** Ohne Skript: kein Gerede, H1 steht (`html:not([data-bewegung])`
  blendet das Gerede aus). Reduzierte Bewegung: dasselbe. Sicherheitsnetz in `global.css` nach 2 s
  gilt weiter. Schrift noch nicht geladen (`document.fonts.ready`): Skript wartet darauf, sonst
  misst es falsche Breiten.
- **Zugänglichkeit.** Das Gerede trägt `aria-hidden="true"`; für Screenreader gibt es die H1 vom
  ersten Moment an. Die Kopien ebenfalls `aria-hidden`.
- **Budget.** Keine neue Abhängigkeit; `animate` und `stagger` aus `motion.ts` reichen. Schätzung
  für das Skript: 2 bis 3 KB.

## 5. Entschieden am 2026-10-10

1. **Gerede in Hell und Dunkel:** Bleistiftgrau auf Papier bzw. Nacht, dieselbe Rolle. Markerfläche
   `accent-soft` bzw. `accent-soft-dark`. Keine Frage, nur zur Kenntnis.
2. **1,5 s ab Skriptstart.** Gemessen ab Navigation (Modul laden, Schrift bereit) kommen die Wörter
   nach etwa 1,65 s an, die H1 steht nach etwa 1,85 s.
3. **Rohtext freigegeben** wie oben. Einmal pro Sitzung freigegeben (`sessionStorage`).
4. **Weitere Motion-Stellen** auf der Seite: zurückgestellt, bis du die Seite zu Hause durchgesehen
   hast.

## 6. Prüfung, bevor es fertig heißt

`npm run verify` grün. Im Browser: hell und dunkel, 1280 × 800 und 390 × 844. Kein Layout-Sprung
(CLS 0). Mit `prefers-reduced-motion: reduce` steht die H1 sofort und kein Gerede ist zu sehen. Mit
blockiertem Skript dasselbe. Zweiter Aufruf in derselben Sitzung: keine Animation. Lighthouse LCP
auf der Startseite unter 2,5 s auf gedrosseltem Netz (Mobil, Slow 4G).
