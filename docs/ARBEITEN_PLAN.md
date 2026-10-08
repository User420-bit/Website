# Plan: 01 Arbeiten als Galerie, die eine Arbeit zeigt

Stand: 2026-10-08 · Basis: `main` nach PR #60, Branch `claude/clever-wright-yagl2p` · Status: Plan,
nicht umgesetzt · Autor: Claude Code Session, Entscheidung und Review durch Pharrel

Konfidenz-Tags wie in [`REWORK_PLAN.md`](REWORK_PLAN.md): **[Sicher]** = im Code oder im Screenshot
des Builds belegt (Chromium, 1280 px und 390 px) · **[Wahrscheinlich]** = starke Schlussfolgerung ·
**[Vermutung]** = Annahme, die Pharrel bestätigen muss.

Anlass: „Momentan scrollt man und sieht einfach alle Bilder auf einmal, das wirkt erdrückend. Eine
kleinere Galerie, die wirklich nur eine Arbeit zeigt, wäre besser; alle Projekte können ja extra
zusammen angezeigt werden.“ (Pharrel, 2026-10-08)

---

## 0. Zusammenfassung (die unbequeme Version)

1. **[Sicher] Die Sektion zeigt jede Arbeit zweimal, in zwei Formen.** Oben die Bühne mit einem
   Projekt, darunter dieselbe Auswahl noch einmal als Raster. Bei 1280 px ist die Sektion 2 443 px
   hoch, bei 390 px 3 679 px, also gut vier Handy-Bildschirme. Der Screenshot der Bühne allein ist
   bei 1280 px rund 560 px hoch, weil er 16:9 über die volle Spalte läuft. Erdrückend ist nicht die
   Zahl der Bilder, sondern dass die Sektion zwei Antworten auf dieselbe Frage stapelt.
2. **[Sicher] Die Seite „Alle Arbeiten“ (`/projekte/`) gibt es schon, aber die Startseite verlinkt
   sie nicht.** Weder Hero, Header, Footer noch 01 zeigen dorthin. Das Raster auf der Startseite
   ersetzt also eine Seite, die ohnehin existiert und die niemand findet.
3. **[Sicher] „Durchcycelt“ als Autoplay widerspricht zwei Festlegungen.** Am 2026-09-23: „bei jedem
   Aufruf zufällig gewählt und ohne automatischen Wechsel“. Und `DESIGN.md`, Bewegung: „Nichts läuft
   von selbst länger als 5 s; was es täte, bekäme eine Pause-Taste (WCAG 2.2.2).“ Ein Karussell, das
   von selbst weiterläuft, bräuchte Pause-Taste, Stopp bei Hover und Fokus und einen Stopp nach der
   ersten Bedienung. [Wahrscheinlich] Es brächte dafür wenig: Besucher lesen die Folie, die gerade
   steht, und nehmen den Wechsel als Unruhe wahr, nicht als Einladung.

**Entscheidung dieses Plans:** Die Sektion zeigt **eine Arbeit**, als Bühne, die seitlich blättert.
Darunter statt des Rasters ein **Kontaktabzug**: alle Arbeiten der Auswahl als kleine Bildfelder in
einer Reihe, die gewählte markiert. Das ist dasselbe Motiv wie auf den Projektseiten (Leitbild +
Kontaktabzug, `ScreenshotGallery`), die Seite erzählt es dann zweimal gleich. Darunter ein Textlink
**„Alle Arbeiten ansehen“** nach `/projekte/`. Geblättert wird von Hand; der Kontaktabzug ist der
Hinweis, dass es mehr gibt. **Kein Autoplay** (Abschnitt 5, Entscheidung 1, falls Pharrel es anders
will).

Was wegfällt: das Raster (`ProjectTile`), die Zwischenüberschrift „Weitere eigene Projekte“, die
Höhen-Animation beim Blättern, und (Vorschlag, Entscheidung 2) der zufällige Start.

---

## 1. Wie die Sektion danach aussieht

### 1.1 Aufbau, von oben

1. **Kapitelkopf** wie heute: Tintenlinie, „01“, H2, Intro. Unverändert.
2. **Umschalter** „Kunden · Eigene Projekte“ wie heute, mit Anzahl, „folgt“ und ausgegrautem Reiter.
   Unverändert; die Entscheidung vom 2026-09-23 bleibt. Eine Galerie je Auswahl, wie heute eine Bühne je
   Auswahl.
3. **Bühne**, eine Arbeit. Ab 1024 px **zweispaltig**: links das Bildfeld 16:9 (`7fr`), rechts der
   Text (`5fr`, 3rem Abstand): Titel in Title Medium, darunter Art · Zeitraum, summary, „Stand: …“,
   dann „Zur Referenz →“ und „Live ansehen“. Darunter stapelt sich die Bühne wie heute: Titel, Bild,
   Text. Das Bildfeld bleibt das Übergangsziel (`data-uebergang`) und das Element mit Parallaxe
   (`data-parallaxe`).
   - [Wahrscheinlich] Bei 1280 px wird das Bild dadurch rund 36 rem breit und 20 rem hoch statt 62 rem
     und 35 rem. Die Bühne verliert etwa die Hälfte ihrer Höhe, ohne dass das Bild klein wird.
   - Ohne Screenshot (heute keine veröffentlichte Arbeit, aber Schema erlaubt es) steht links die
     summary groß wie heute, rechts der übrige Text.
4. **Blättern-Knöpfe und Zähler** „3 von 8“ oben rechts wie heute, nur mit Skript sichtbar.
5. **Kontaktabzug**: eine Reihe kleiner Bildfelder, eines je Arbeit der Auswahl, in Reihenfolge
   `order`. Jedes 16:9, 4 px, 1 px Liniengrau; ab 640 px 7 rem breit, darunter 5,5 rem; 0,75 rem
   Abstand. Unter jedem der Titel in Label Small, Bleistiftgrau, einzeilig mit Ellipse. Das gewählte
   Bildfeld trägt den Rahmen in Tinte und darunter einen 2-px-Strich in Orange (derselbe Strich wie
   unter dem gewählten Reiter des Umschalters; Orange bleibt das eine Signal). Ohne Screenshot steht
   im kleinen Bildfeld der erste Satz, wie heute in der Satzkachel, nur in 4 cqi.
   - Jedes Feld ist ein `<button>` und holt seine Arbeit auf die Bühne. Ohne Skript ist es ein Link
     auf die Projektseite (Abschnitt 2.2).
   - Die Reihe läuft **nicht um**: Passt sie nicht in die Spalte (am Handy ab etwa fünf Arbeiten),
     scrollt sie waagerecht mit `scroll-snap`, ohne sichtbare Scrollleiste, und das letzte sichtbare
     Feld ist angeschnitten. Der Anschnitt ist der Hinweis, dass es weitergeht; ein Raster, das
     umbricht, wäre wieder die Wand.
6. **„Alle Arbeiten ansehen →“** als Text-Button (`Button variant="text"`, wie „Arbeiten ansehen“ im
   Hero) unter dem Kontaktabzug, nach `/projekte/`. Das ist die Stelle für „alle zusammen“.
7. **Anfrage-Zeile** wie heute.

### 1.2 Was es im Vergleich bringt

| Maß                                   | Heute [Sicher]         | Danach [Wahrscheinlich]     |
| ------------------------------------- | ---------------------- | --------------------------- |
| Höhe der Sektion bei 1280 px          | 2 443 px               | rund 950 px                 |
| Höhe der Sektion bei 390 px           | 3 679 px (4,4 Fenster) | rund 1 300 px (1,5 Fenster) |
| Bilder gleichzeitig im Fenster (1280) | bis zu 7               | 1 groß, 8 klein             |
| Arbeiten je Sektion                   | jede zweimal           | jede einmal                 |
| Weg zu „alle Arbeiten“                | kein Link              | ein Link                    |

### 1.3 Was gleich bleibt

Umschalter, Reihenfolge `order`, die Texte der Bühne, Übergang Bildfeld → Projektseite, Parallaxe im
Bildfeld, Hover (Rahmen `fg/40`, Bild 1,02, Unterstrich zieht auf), `aria-live`-Ansage beim Blättern,
die Anfrage-Zeile, und dass unveröffentlichte Arbeiten fehlen.

---

## 2. Technik

### 2.1 Komponenten

- `ProjectShowcase.astro`: bleibt der Besitzer der Sektion (Umschalter, Gruppen, Skript). Das Raster
  und `rasterTitel` fallen weg. Neu: der Kontaktabzug je Gruppe und der Link nach `/projekte/`.
- `ProjectSpotlight.astro`: neues zweispaltiges Layout ab `lg`. Props wie heute (`projekt`,
  `blaettern`, `hidden`).
- `ProjectTile.astro`: **entfällt** (nur die Startseite nutzt sie). Die Satzkachel-Logik
  (`satzGroesse`) wandert verkleinert in die neue Komponente.
- Neu `ProjectThumb.astro` (Arbeitstitel): ein Feld des Kontaktabzugs. Props `projekt`, `index`,
  `aktiv`. Rendert `<li>` mit `<button type="button" data-ziel={index}>` (mit Skript) um Bildfeld und
  Titel; ohne Skript ist der Knopf ein `<a href="/projekte/<slug>/">` (Abschnitt 2.2).
- `index.astro`: Kommentar zu 01 anpassen.

### 2.2 Ohne Skript, ohne `:has()`, mit reduzierter Bewegung

- **Ohne Skript**: Die Bühne zeigt die erste Arbeit nach `order` (wie heute), Blättern-Knöpfe sind
  versteckt (wie heute). Der Kontaktabzug steht vollständig da, jedes Feld ist ein Link zur
  Projektseite. Damit erreicht man ohne Skript jede Arbeit mit einem Klick; heute geht das über das
  Raster. Technisch: Das Feld rendert einen `<a>`; das Skript ersetzt ihn beim Einrichten durch einen
  `<button>` (oder hängt `click` mit `preventDefault` an und setzt `role="button"`; der Austausch ist
  sauberer, weil ein Link, der nicht navigiert, Screenreader verwirrt).
- **Ohne `:has()`**: beide Auswahlen untereinander, wie heute.
- **Reduzierte Bewegung**: Wechsel sofort, wie heute (`bewegt()` prüft vor jeder Bewegung).

### 2.3 Blättern

Die Mechanik von heute bleibt (`zeige`, `blaettere`): alle Bühnen einer Gruppe im DOM, eine sichtbar,
die anderen `hidden`. Drei Änderungen:

1. **Keine Höhen-Animation mehr.** Das Bühnenfeld bekommt als Mindesthöhe die Höhe der höchsten Bühne
   (einmal messen beim Einrichten, bei `resize` neu). Die Bühne wechselt dann, ohne dass die Seite
   darunter rutscht; heute animiert das Feld seine Höhe mit, und der Kontaktabzug darunter würde bei
   jedem Blättern hüpfen. [Wahrscheinlich] Mit dem zweispaltigen Layout unterscheiden sich die Höhen
   ohnehin nur um die Textlänge rechts, ab `lg` meist gar nicht, weil das Bild die Höhe gibt.
2. **Der Kontaktabzug blättert mit.** Beim Wechsel wandert die Markierung (Tinte-Rahmen, oranger
   Strich) zum neuen Feld; der Strich zieht wie beim Umschalter (200 ms, `scaleX`). Steht das neue Feld
   außerhalb der scrollbaren Reihe, holt `scrollIntoView({ inline: 'nearest' })` es herein, mit
   `behavior` nach `bewegt()`.
3. **Klick auf ein Feld** ruft `zeige(index, richtung)` mit der Richtung aus dem Indexvergleich, damit
   die Bühne in die richtige Richtung schiebt. Pfeiltasten links/rechts auf der Bühne oder dem
   Kontaktabzug blättern ebenfalls (wie in der Lightbox); Wischen am Handy auf dem Bildfeld ab 48 px,
   wie dort.

### 2.4 Bewegung (docs/BEWEGUNG_PLAN.md, C, Fortschreibung)

- **Beim Hereinscrollen** (einmal, `inView`, Anteil 0,3 für das Bild): Das Bildfeld der Bühne zieht
  sich auf (`clip-path: inset(0 100% 0 0)` → `inset(0)`, 600 ms, von links, wie die Linien), der Text
  rechts zieht 8 px ein, Zeile um Zeile (60 ms). Der Kontaktabzug kommt Feld um Feld, 16 px von unten,
  60 ms Staffel (wie der Kontaktabzug der Projektseiten). „Alle Arbeiten ansehen“ zieht als Letztes
  ein. Das Bildfeld trägt dabei nur `clip-path`, keinen Transform (Übergangsziel).
- **Beim Blättern**: Bühne 24 px in Blätterrichtung, 120 ms aus, 200 ms ein, wie heute. Zähler wie
  heute. Markierung im Kontaktabzug wie in 2.3.
- **Parallaxe** im Bildfeld wie heute (2,5 % je Richtung, Bild 1,06).
- **Hover** wie heute; im Kontaktabzug Rahmen `fg/40`, Bild 1,02.
- **Kein Autoplay**, keine Schleife. Falls Entscheidung 1 anders ausgeht: Wechsel alle 6 s, Stopp bei
  Hover, Fokus, erster Bedienung und wenn die Sektion das Fenster verlässt, Pause-Taste neben dem
  Zähler, nie bei reduzierter Bewegung. Das sind etwa 40 Zeilen mehr und ein neuer Knopf im
  Designsystem.

### 2.5 Zugänglichkeit

- Bühnen, die nicht dran sind, sind `hidden` (wie heute): Tab-Reihenfolge geht Bühne → Kontaktabzug →
  Link, nichts Unsichtbares dazwischen.
- Der Kontaktabzug ist eine `<ul>` mit `aria-label="Arbeiten dieser Auswahl"`; das gewählte Feld trägt
  `aria-current="true"`. Jeder Knopf heißt wie die Arbeit („Kleinkram auf die Bühne“ als
  `aria-label`, sichtbar nur „Kleinkram“).
- Die Ansage nach dem Blättern bleibt („Kleinkram, 1 von 8“).
- Die scrollbare Reihe braucht keinen `tabindex`: Ihre Knöpfe sind fokussierbar, und der Browser
  scrollt den Fokus herein.
- Kontraste: Titel im Kontaktabzug in Bleistiftgrau (7,9 : 1), Markierung in Tinte und Orange, beide
  nicht allein bedeutungstragend (`aria-current` sagt es).

### 2.6 Bilder und Laden

- Bühne: `widths={[640, 960, 1280]}`, `sizes="(min-width: 1024px) 36rem, 92vw"`; die Bühne des ersten
  Projekts `loading="eager"`, die übrigen `lazy`. Das geht nur ohne zufälligen Start (Entscheidung 2).
- Kontaktabzug: `widths={[160, 320]}`, `sizes="(min-width: 640px) 112px, 88px"`, `lazy`. [Sicher] Die
  Satzkachel-Bilder sind heute schon `lazy`; im Handy-Screenshot sind deshalb drei Kacheln leer, weil
  sie beim Aufnehmen noch nicht geladen waren. Mit kleinen Thumbs ist das Gewicht je Feld unter 10 KB.
- `scripts/verify-build.mjs` prüft je Projektseite genau ein `data-uebergang`; auf der Startseite
  prüft es nichts dazu. Trotzdem: Jedes Projekt steht nach dem Umbau nur noch einmal mit
  `data-uebergang` auf der Startseite (die Bühne), der Kontaktabzug trägt keins. Heute tragen Bühne und
  Kachel desselben Projekts denselben Namen, eine davon `hidden`; das entfällt.

---

## 3. Designsystem (DESIGN.md), was sich ändert

- **Overview, Key Characteristics**: „Auf der Startseite stehen die Arbeiten als Raster gleich großer
  Kacheln“ → „Auf der Startseite steht eine Arbeit auf der Bühne, darunter alle Arbeiten der Auswahl
  als Kontaktabzug“.
- **Layout, „Zeilen statt Raster, bis auf die Arbeiten“**: Die Ausnahme „Raster“ fällt. Neu: Bühne
  zweispaltig ab 1024 px (`7fr | 5fr`, 3rem), Kontaktabzug als nicht umbrechende Reihe.
- **Components, „Arbeiten der Startseite“**: Bühne (zweispaltig), Kontaktabzug (neu), Kachel und
  Satzkachel streichen (Satz im kleinen Feld wandert in den Kontaktabzug-Absatz), „Kachelbild einer
  iPhone-App“ bleibt (das Bild gilt weiter, nur kleiner).
- **Bewegung**: Satz zu „Kacheln kommen bis 16 px weit“ → „Felder des Kontaktabzugs kommen bis 16 px
  weit“. Neue Regel: „Das Bildfeld der Bühne zieht sich beim Hereinscrollen auf (`clip-path`, 600 ms),
  wie das Foto in Über Klartext.“
- **Do's**: unverändert. **Don'ts**: nichts Neues; „kein Autoplay“ ist schon über die 5-s-Regel
  abgedeckt.
- `README.md`: „die Kachel auf der Startseite“ → „die Bühne und der Kontaktabzug auf der Startseite“
  (Zeilen 83, 132–134).
- `PRODUCT.md`: nichts; „Seiten“ nennt kein Raster.
- `docs/BEWEGUNG_PLAN.md`: oben einen Verweis auf diesen Plan (C ist überholt); nicht umschreiben,
  der Plan ist Geschichte.

---

## 4. Schritte und Prüfung

1. `ProjectSpotlight.astro` zweispaltig; Screenshot 1280/390, hell/dunkel.
2. `ProjectThumb.astro` neu, `ProjectShowcase.astro` ohne Raster, mit Kontaktabzug, Link nach
   `/projekte/`, Mindesthöhe statt Höhen-Animation; `ProjectTile.astro` löschen.
3. Skript: Klick im Kontaktabzug, Markierung, `scrollIntoView`, Pfeiltasten, Wischen; `<a>` → `<button>`.
4. Bewegung beim Hereinscrollen (clip-path, Einzug, Staffel).
5. `DESIGN.md`, `README.md`, `index.astro`-Kommentar, Verweis in `BEWEGUNG_PLAN.md`.
6. Prüfen: `npm run verify`. Chromium hell/dunkel, 1280 × 800 und 390 × 844; einmal
   `prefers-reduced-motion: reduce`; einmal mit blockiertem Skript (Kontaktabzug sind Links, Bühne zeigt
   die erste Arbeit); Übergang Bühne → Projektseite und zurück; Tab-Reihenfolge; `aria-live`-Ansage;
   kein horizontaler Überlauf der Seite (die Reihe scrollt in sich, `overflow-x: clip` am `body`
   bleibt). Höhe der Sektion messen und in diesem Plan nachtragen.
7. Ein Commit je Schritt auf dem Fix-Branch, PR am Ende.

---

## 5. Entscheidungen für Pharrel

1. **Autoplay?** Plan: nein. Begründung in 0.3 und 2.4. Wenn ja: 6 s, mit Pause-Taste und allen
   Stopps aus 2.4.
2. **Zufälliger Start?** Plan: **weg**, die erste Arbeit nach `order` steht beim Öffnen. Begründung:
   [Wahrscheinlich] Der Zufall gab dem Raster Abwechslung, weil die Bühne sonst immer dasselbe zeigte;
   mit dem Kontaktabzug sieht man alle Arbeiten sofort, und der Zufall kostet das `eager`-Laden des
   ersten Bildes und macht die Seite bei jedem Aufruf anders (schwer zu prüfen, schwer zu
   beschreiben). Wenn der Zufall bleiben soll: alle Bühnenbilder `lazy`, und die Satzung von
   2026-09-23 bleibt unverändert.
3. **Umschalter behalten, solange „Kunden“ ausgegraut ist?** Plan: ja, unverändert; er ist die
   Zusage, dass Kundenprojekte kommen, und die Entscheidung vom 2026-09-23. Die Alternative (Reiter
   erst zeigen, wenn beide wählbar sind) spart eine Zeile und verliert die Zusage.
4. **Titel unter dem kleinen Bildfeld oder nur Bild?** Plan: Titel dabei. Ohne ihn sind acht kleine
   Screenshots schwer zu unterscheiden (Kleinkram und Feynman sind beide Oberflächen mit Seitenleiste).
