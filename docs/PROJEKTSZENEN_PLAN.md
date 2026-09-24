# Plan: Eine Bühne je Projekt – zehn Referenzseiten, die nicht gleich aussehen

Stand: 2026-09-24 · Basis: Commit `c5c3b09` auf `main` · Status: umgesetzt am 2026-09-24 · Autor:
erstellt per Claude Code Session, Review durch Pharrel ausstehend

> **Umgesetzt am 2026-09-24** auf `claude/project-specific-design-variations-voc90k`. Abweichungen vom
> Plan, alle bewusst:
>
> - **Scrollgetriebene Bewegung in Langschreibweise.** Der CSS-Minifier des Builds zieht
>   `animation-timeline` in die Kurzform `animation`, und der Browser verwirft die ganze Deklaration.
>   Deshalb `animation-name`, `animation-timing-function` und `animation-fill-mode` einzeln; im
>   Build-CSS geprüft.
> - **JustBeauty startet einen Spalt offen** (Takt 0,3 statt 0), damit die Blätter beim Laden schon
>   als Fächer lesbar sind, und öffnet über 45 vh statt 60, weil die Bühne auf dem Handy sonst aus dem
>   Fenster ist, bevor der Fächer offen steht.
> - **DealerSim beschriftet seine Stationen rechts** statt darüber; übereinander kollidieren die Namen
>   auf der Diagonale.
> - **NoteList braucht eine Lint-Ausnahme** (`no-noninteractive-tabindex`), weil ein scrollbarer
>   Bereich per Tastatur erreichbar sein muss; begründet in der Datei.
>
> Geprüft: `npm run verify` grün; Screenshots aller zehn Seiten bei 1440 px und 390 px, hell und
> dunkel, jeweils beim Laden und nach dem Scrollen; die vier scrollgetriebenen Variablen im Browser
> gemessen (Tiefe 0 → 268 m nach 450 px, Balken 0 → 54 %, Fächer 0,3 → 1, Zoom 1 → 1,08); kein
> horizontaler Überlauf auf keiner Seite.

Konfidenz-Tags wie in [`REWORK_PLAN.md`](REWORK_PLAN.md): **[Sicher]** = im Code oder im Screenshot
des Builds belegt (Chromium, 1440 px und 390 px, hell und dunkel) · **[Wahrscheinlich]** = starke
Schlussfolgerung · **[Vermutung]** = Annahme, die Pharrel bestätigen muss.

---

## 0. Zusammenfassung (die unbequeme Version)

Die Projektseiten sehen nicht gleich aus, weil das Design zu streng wäre, sondern weil sie aus
derselben Vorlage kommen: `src/pages/projekte/[slug].astro` rendert zehnmal dieselbe Folge
H1 · Summary · Meta-Liste · Links · Screenshots · vier Textblöcke. Nur der Inhalt wechselt. Das ist
gewollt und bleibt so. Was fehlt, ist ein Moment, in dem die Seite zeigt, dass sie das Projekt
verstanden hat.

1. **[Sicher] Eine Vorlage, zehn Seiten.** Kein Projekt hat eigenen Code. Der einzige Unterschied ist
   die Galerie, und drei Projekte haben keine (PointCare, JustBeauty, Feynman, Availably, NoteList:
   fünf sogar).
2. **[Sicher] Das Designsystem verbietet, was gewünscht ist.** `DESIGN.md` sagt: eine Akzentfarbe,
   keine Flächen, keine Illustration, keine Hero-Animation, kein Einblenden. Eine Mine, die sich
   öffnet, bricht vier dieser Regeln. Stillschweigend brechen wäre falsch, denn danach glaubt niemand
   mehr dem Rest des Dokuments.
3. **[Wahrscheinlich] Zehn eigene Seiten wären der falsche Weg.** Jede neue Referenz bräuchte dann
   ein eigenes Layout, und die Seite verlöre, was sie heute stark macht: dass jede Referenz gleich
   ehrlich aufgebaut ist (Beleg, Grenzen, Erkenntnisse).

**Entscheidung dieses Plans:** nicht zehn Layouts, sondern **eine Bühne je Projekt** an derselben
Stelle jeder Seite. Der Rahmen gehört dem System, der Inhalt dem Projekt. Innerhalb der Bühne gilt
eine ausdrückliche Ausnahme vom Designsystem, die **Bühnenlizenz**, mit klaren Grenzen. Außerhalb
bleibt alles beim Werkstattbuch.

**Ausdrücklich nicht in diesem Plan:** die Kacheln der Startseite und die Zeilen unter `/projekte/`.
Dort ist Gleichheit die Aussage („jede Arbeit steht genau einmal, gleich groß“). Ob ein Motiv der Bühne
später in die Kachel wandert, ist eine eigene Entscheidung.

---

## 1. Die Bühne

### 1.1 Ort und Form

Direkt unter H1 und Summary, vor der Meta-Liste: erst sagt die Seite, worum es geht, dann zeigt sie
es, dann folgen die Fakten. Die Bühne ist ein `<figure>` über die volle Fensterbreite (die einzige
Stelle der Seite, die aus der 64-rem-Spalte ausbricht), mit eigener Fläche in hell und dunkel, innen
wieder an der Spalte ausgerichtet. Darunter eine Bildunterschrift in Body Small, Bleistiftgrau, die
immer mit dem Wort „Szene“ beginnt und sagt, was zu sehen ist und dass es **kein Screenshot** ist.
Das ist die Ehrlichkeitsregel des Werkstattbuchs: Ein gezeichnetes Bild darf nie als Beleg
durchgehen. Die Screenshots (der Beleg) folgen unverändert nach Meta-Liste und Links.

Die Bühne ist Dekoration für Sehende, nicht Inhalt: Das Innere trägt `aria-hidden`, Screenreader
lesen die Bildunterschrift. Einzige Ausnahme ist NoteList, dessen Fläche verschiebbar ist und deshalb
per Tastatur erreichbar sein muss.

### 1.2 Die Bühnenlizenz (Ausnahme vom Designsystem, nur innerhalb der Bühne)

Innerhalb ihrer Fläche darf eine Szene, was die Seite sonst nicht darf:

- **Eigene Farben**, als `--szene-*`-Variablen im Kopf der Komponente deklariert, mit
  Dunkel-Zwilling, sofern die Fläche nicht selbst dunkel ist. Die Farben gelten nur dort; kein Token
  des Systems wird verändert.
- **Bewegung beim Laden oder beim Scrollen**, auch länger als 320 ms. Zwei Bedingungen: Sie steht
  hinter `prefers-reduced-motion: no-preference`, und ohne Bewegung steht der **Endzustand**, nie
  der Anfang. Scrollgetriebene Bewegung liegt zusätzlich hinter `@supports (animation-timeline)`.
  Endlosschleifen nur, wo sie die Aussage sind (DealerSim produziert weiter, Availably wechselt den
  Status), und dann langsam.
- **Illustration**: gezeichnet in CSS und Inline-SVG, aus dem Repository, kein Bild von außen.

Was auch die Lizenz nicht erlaubt: Schrift von Drittanbietern, eine zweite Schriftfamilie (Monospace
bleibt die Ausnahme für Technisches), Text, der nur animiert lesbar ist, JavaScript, das mehr als 4 KB
wiegt oder importiert, und Kennzahlen, die wie echte Zahlen von Klartext aussehen. Beispieldaten
heißen in der Bildunterschrift Beispieldaten.

### 1.3 Technik

- `src/components/ProjectScene.astro`: der Rahmen. Props `caption`, `surface` und `surfaceDark`
  (Fläche hell/dunkel), `decorative` (Standard `true`, setzt `aria-hidden` auf das Innere).
- `src/components/scenes/<Slug>Scene.astro`: eine Datei je Projekt, nutzt den Rahmen, bringt Markup
  und `<style>` mit. Keine Datei importiert etwas außer dem Rahmen.
- `src/components/scenes/index.ts`: Registry Slug → Komponente. `[slug].astro` rendert die Szene,
  wenn es eine gibt; ein Projekt ohne Szene sieht aus wie heute. Eine neue Referenz braucht also keine
  Szene, um zu erscheinen.
- Alles ohne JavaScript. Scrollgetriebene Bewegung über `animation-timeline`, Zähler über
  `@property` und `counter-reset`, Fächer und Zoom über eine animierte Variable.
- `scripts/verify-build.mjs` bleibt unverändert: Routen, H1, Meta-Tags und „kein externes JS“
  gelten weiter und werden von den Szenen erfüllt.

---

## 2. Zehn Szenen

Jede Szene nimmt ein Merkmal aus der Projektdatei, das nur dieses Projekt hat, und setzt genau das
ins Bild. Nicht mehr. Die Prüffrage je Szene: Würde ein Besucher sie einem anderen Projekt zuordnen?

| Projekt    | Merkmal aus der Projektdatei                                                        | Szene                                                                                                                                         | Bewegung                                                                             |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| PointCare  | „dunkel, filmisch, eine Bewegung pro Scroll-Abschnitt“, Standbilder mit Scroll-Zoom | Dunkle Fläche mit Kinobalken, ein gezeichnetes Standbild (Lagerregale, Horizont), darunter die drei Leistungsbereiche als Bauchbinde          | Das Standbild zoomt beim Scrollen leicht heran, die Bereiche erscheinen nacheinander |
| JustBeauty | Entwurf mit zwölf Seiten, 315 Produkte, ein Master-Timing für alle Animationen      | Warme Rosé-Fläche, zwölf Blätter mit den Seitennamen als Fächer                                                                               | Der Fächer öffnet sich beim Scrollen, alle Blätter in einem Takt                     |
| Kleinkram  | Buchhaltung nach § 19 UStG, Kleinunternehmergrenze, alles lokal                     | Ein Kassenzettel mit Beispieldaten auf einer Schreibtischfläche: Einnahmen, Ausgaben, Umsatz, darunter der Stand zur Grenze als dünner Balken | Der Balken füllt sich beim Scrollen bis zum Beispielwert                             |
| TIEFGANG   | Mine, drei Schichten, Tiefe in Metern, Eisschicht auf 330 m, Lava in der Tiefe      | Dunkler Schacht über die volle Breite, Schichten als Bänder, ein Bohrfahrzeug in Werkstatt-Orange, links die Tiefenanzeige                    | Wer weiter scrollt, gräbt tiefer: Schichten ziehen nach oben, der Zähler zählt Meter |
| MemoryTree | Erinnerungen als organischer SVG-Baum                                               | Ein linienhaft gezeichneter Baum, in der Krone kleine Bildkarten als Erinnerungen                                                             | Der Baum zeichnet sich beim Laden, dann erscheinen die Karten                        |
| NoteList   | Notizen auf einer freien Fläche, verbunden wie ein Stammbaum, Pan und Zoom          | Eine gepunktete Fläche, größer als das Fenster, mit Notizkarten und Fäden dazwischen                                                          | Keine Animation: Die Fläche lässt sich schieben (nativer Scrollbereich)              |
| Feynman    | Man erklärt, die KI findet Lücken; läuft lokal                                      | Eine Tafel: ein Erklärsatz in Kreide, die KI unterstreicht zwei Stellen und schreibt die Lücke an den Rand                                    | Unterstrich und Randnotiz erscheinen nach dem Laden mit Verzögerung                  |
| DealerSim  | Pixel-Look, isometrisch, drei Stationen, läuft weiter, wenn niemand spielt          | Ein isometrischer Boden aus Pixel-Kacheln, drei Stationen, ein Band mit Ware                                                                  | Die Ware fährt endlos, ein Zähler zählt seit Seitenaufruf weiter                     |
| Vaulter    | Link → Transkript → Notiz; Aufnahme wird live mitgeschrieben                        | Drei Stufen nebeneinander: die Adresse, eine Tonspur, die fertige Notiz in Monospace                                                          | Die Tonspur atmet, die Notizzeilen erscheinen nacheinander                           |
| Availably  | Zwei Personen, vier Zustände, ohne Nachfrage sehen, ob der andere ansprechbar ist   | Zwei Telefone nebeneinander, je ein Statuswort mit Punkt                                                                                      | Links wechselt der Status langsam, rechts folgt er kurz darauf                       |

Farben je Szene, alle nur innerhalb der Bühne: PointCare Nachtschwarz und Kreide; JustBeauty Rosé;
Kleinkram Schreibtisch und Papier; TIEFGANG Erde, Gestein, Eis, Lava; MemoryTree Laubgrün; NoteList
Punktpapier; Feynman Tafelgrün und Kreidegelb; DealerSim Sand, Holz, Blattgrün; Vaulter nur Tokens;
Availably grün, orange, violett, grau für die vier Zustände.

---

## 3. Reihenfolge

1. Plan (dieses Dokument).
2. Rahmen: `ProjectScene.astro`, Registry, Einbau in `[slug].astro`. Ohne Szenen sichtbar nichts anders.
3. Kundenprojekte (PointCare, JustBeauty), dann eigene Produkte, dann Prototypen.
4. `DESIGN.md`: neuer Abschnitt „Bühne der Projektseite“ mit der Bühnenlizenz; Do/Don't ergänzt.
   `README.md`: wie eine neue Szene entsteht. `.impeccable/design.json`: Komponente `project-scene`.
5. `npm run verify`; Screenshots aller zehn Seiten bei 1440 px und 390 px, hell und dunkel.

---

## 4. Risiken

- **[Wahrscheinlich] Browser ohne `animation-timeline`** (ältere Safari- und Firefox-Versionen) sehen
  den Endzustand: Fächer offen, Schacht auf 525 m, Balken voll. Das ist die bewusste Rückfallebene,
  kein Fehler.
- **[Vermutung] Die Bühne wirkt lauter als der Rest.** Das ist Absicht, aber das Maß muss Pharrel
  bestätigen. Jede Szene ist eine Datei; eine zu laute Szene lässt sich ohne Umbau leiser drehen oder
  aus der Registry nehmen.
- **[Sicher] Zwei Kundenprojekte haben keine Screenshots.** Dort ist die Bühne das einzige Bild und
  die Bildunterschrift „kein Screenshot“ umso wichtiger. PointCare bekommt nach der Abnahme einen
  echten Screenshot; die Szene bleibt daneben.
- **[Sicher] Mehr Wartung.** Eine neue Referenz ohne Szene sieht aus wie heute; eine mit Szene kostet
  eine Datei mit etwa 100 bis 200 Zeilen. Das ist der Preis, und er ist im README genannt.
