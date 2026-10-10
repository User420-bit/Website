# Plan: Die ganze Seite in Bewegung, mit Motion

Stand: 2026-10-03 · Basis: `main` nach PR #54 · Branch `feat/bewegung-motion` · Autor: Claude Code
Session, Entscheidung und Review durch Pharrel

Dieser Plan löst [`MOTION_PLAN.md`](MOTION_PLAN.md) (2026-09-26, „CSS zuerst, keine Bibliothek“) ab.
Die Entscheidung dahinter: Die Seite soll sich als Ganzes bewegen, Sektion für Sektion, und dafür
reicht CSS nicht mehr: Scroll-Reveals mit Staffelung, richtungsabhängiges Blättern, Höhen ohne
`interpolate-size`, Hover- und Druck-Rückmeldung brauchen ein kleines Skript, das in jedem Browser
gleich arbeitet. Werkzeug ist [Motion](https://motion.dev) (Paket `motion`, Vanilla-API), gebündelt
aus dem Repository. Nichts kommt von fremden Servern; die Datenschutzerklärung bleibt wahr.

---

## 0. Was sich ändert, was bleibt

**Bleibt.** Eine Kurve (`cubic-bezier(0.2, 0, 0, 1)`), drei Dauern (120 / 200 / 320 ms), dazu neu eine
vierte für Bilder und Linien (600 ms). Die H1 steht sofort und bewegt sich nie. Ohne Skript und mit
`prefers-reduced-motion: reduce` steht jeder Inhalt sofort im Endzustand. Keine Schatten, keine
Unschärfe, keine Transluzenz, keine zweite Farbe. Die Bühnen der Projektseiten (`scenes/`) bleiben, wie
sie sind; sie haben ihre eigene Lizenz und werden hier nicht angefasst. Der Übergang Kachel →
Projektseite (View Transition) bleibt und muss weiter funktionieren.

**Ändert sich.** Die geschlossene Liste in `DESIGN.md` („Bewegung“) wird geöffnet: Inhalte dürfen beim
Hereinscrollen erscheinen, Linien dürfen aufziehen, Bilder dürfen im Rahmen leicht wandern, Knöpfe
dürfen nachgeben. Die Regel „kein Einblenden beim Scrollen“ fällt, bekommt aber Grenzen (Abschnitt 1).
`scripts/verify-build.mjs` verbietet nicht mehr jedes `<script src>`, sondern nur fremde Hosts, und
setzt ein Budget: 90 KB JavaScript je Seite, unkomprimiert (Motion mit allem, was wir nutzen, misst 62 KB,
22 KB gzip).

## 1. Regeln für jede Sektion

1. **Eine Quelle.** Jede Bewegung importiert aus `src/lib/motion.ts`, nie direkt aus `motion`. Dort
   liegen `KURVE`, `DAUER`, `STAFFEL`, `WEG_TEXT`, `bewegt()`, `wennBewegt()`, `alle()` und die
   Re-Exports (`animate`, `inView`, `scroll`, `stagger`, `hover`, `press`, `spring`).
2. **Endzustand ohne Skript.** Einen Anfangszustand (Deckkraft 0, verschoben, beschnitten) setzt nur CSS
   unter `html[data-bewegung] …`. Das Attribut vergibt `MotionReady` im `<head>`, nur mit Skript und nur
   bei `prefers-reduced-motion: no-preference`. Jedes so versteckte Element trägt `data-bewegt`;
   `global.css` hebt den Anfangszustand nach 2 s von selbst auf, falls das Modul nicht läuft.
3. **Text zieht kurz ein.** Text höchstens 320 ms und 8 px (`WEG_TEXT`), gestaffelt um 60 ms
   (`STAFFEL`). Die H1 der Startseite und die H1 jeder Unterseite bewegen sich nie. Überschriften H2
   erscheinen mit ihrer Sektion, nicht einzeln nach.
4. **Linien, Bilder, Belege dürfen mehr.** Bis 600 ms (`DAUER.szene`), Linien ziehen von links auf
   (`scaleX`, `transform-origin: left`), Bilder wandern im Rahmen höchstens 6 %, Kacheln kommen bis 16 px
   weit.
5. **Einmal, nicht bei jedem Scrollen.** `inView` mit `amount: 0.2` (Bilder 0.3) und ohne Rückweg: Was da
   ist, bleibt da. Ausnahme sind scrollgebundene Bewegungen (`scroll()`), die mit dem Scrollen vor und
   zurück laufen (Parallaxe im Bildrahmen, Kapitel-Linie).
6. **Hover und Druck.** `hover()` darf nur ändern, was CSS heute schon ändert (Farbe, Linie, 2 px
   Pfeil, Bild 1,02). `press()` gibt 0,98 nach, 120 ms. Tastaturfokus sieht aus wie Hover.
7. **Nichts bleibt transformiert.** Nach jeder Bewegung steht `transform: none` und `opacity: 1`
   (Motion setzt die Endwerte; wer eigene Inline-Styles setzt, räumt sie auf). Elemente mit
   `data-uebergang` tragen zu Beginn einer Navigation keinen Transform, sonst bricht der Übergang.
8. **Schleifen** nur, wo sie heute schon sind (Bühnen). Nichts läuft von selbst länger als 5 s.
9. **Prüfen, bevor es fertig heißt.** `npm run verify` grün. Dazu im Browser (Chromium liegt unter
   `/opt/pw-browsers`, Playwright ist installiert): hell und dunkel, 1280 × 800 und 390 × 844, einmal
   mit `prefers-reduced-motion: reduce` (dann steht alles sofort), einmal mit blockiertem Skript
   (Endzustand nach 2 s). Keine Konsolenfehler, kein Layout-Sprung (CLS 0): Nichts, was einzieht, darf
   die Höhe der Seite ändern.

## 2. Zuschnitt: acht Chips, disjunkte Dateien

Jeder Chip besitzt seine Dateien allein. Wer etwas in einer fremden Datei braucht, schreibt es als
Wunsch in seinen Bericht, statt sie zu ändern.

| Chip | Sektion                           | Dateien (nur diese)                                                                                                                                                                                                                                                      |
| ---- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A    | Rahmen: Header, Nav, Kapitel, Fuß | `Header.astro`, `NavHighlight.astro`, `Footer.astro`, `Section.astro`, `Button.astro`, `Arrow.astro`, `InquiryPrompt.astro`                                                                                                                                              |
| B    | Hero                              | `home/Hero.astro`                                                                                                                                                                                                                                                        |
| C    | 01 Arbeiten                       | `ProjectShowcase.astro`, `ProjectSpotlight.astro`, `ProjectTile.astro`, `KindLabel.astro`                                                                                                                                                                                |
| D    | 02 Leistungen                     | `home/Leistungen.astro`, `Disclosure.astro`                                                                                                                                                                                                                              |
| E    | 03 Arbeitsweise                   | `home/Arbeitsweise.astro`, `NumberedRows.astro`                                                                                                                                                                                                                          |
| F    | 04 Über Klartext                  | `home/Ueber.astro`                                                                                                                                                                                                                                                       |
| G    | 05 Kontakt                        | `home/Kontakt.astro`, `CopyEmail.astro`, `MetaList.astro`                                                                                                                                                                                                                |
| H    | Unterseiten                       | `ProjectPage.astro`, `ProjectNav.astro`, `ProjectFeature.astro`, `ScreenshotGallery.astro`, `CodeBlock.astro`, `pages/projekte/index.astro`, `pages/werkzeuge.astro`, `pages/impressum.astro`, `pages/datenschutz.astro`, `pages/404.astro`, `layouts/ProseLayout.astro` |

Gemeinsam und gesperrt: `src/lib/motion.ts`, `MotionReady.astro`, `global.css`, `BaseLayout.astro`,
`index.astro`, `scripts/`, `DESIGN.md`, `README.md`, alles unter `scenes/` und `projekte/`. Änderungen
dort sammelt die Integration nach den Chips.

Jede Sektion bekommt ihr eigenes `<script>` in ihrer Komponente (Astro bündelt sie, Motion liegt in
einem gemeinsamen Chunk). Styles für Anfangszustände stehen im `<style>` der Komponente oder als
Tailwind-Klassen, immer unter `html[data-bewegung]`.

## 3. Choreografie je Sektion

### A · Rahmen

- **Kapitel-Linie** (`Section.astro`): Die Tintenlinie über jeder Sektion zieht von links auf, wenn die
  Sektion ins Fenster kommt (600 ms, `scaleX 0 → 1`). Nummer und H2 kommen mit der Linie, 8 px, 320 ms,
  Intro 60 ms später. Die Linie bleibt als `border-top`; bewegt wird ein `::before` oder ein eigenes
  Element, damit das Layout nicht springt.
- **Navigation** (`Header.astro`, `NavHighlight.astro`): Der orange Strich unter dem aktiven Anker
  gleitet zum nächsten Anker, statt zu springen (ein Strich je Navigation, Position per `animate`,
  200 ms). Beim ersten Setzen ohne Bewegung. Hover zieht wie heute von links auf.
- **Knöpfe** (`Button.astro`): `press()` 0,98 und zurück, 120 ms. Pfeil (`Arrow.astro`) rückt bei Hover
  2 px, wie heute.
- **Anfrage-Zeile** (`InquiryPrompt.astro`): Satz und Knöpfe ziehen 8 px ein, wenn die Zeile ins Fenster
  kommt.
- **Fuß** (`Footer.astro`): Haarlinie zieht auf, Zeile zieht 8 px ein.

### B · Hero

- Die H1 steht sofort, unbewegt. Seit 2026-10-10 mit einer Ausnahme, beschrieben in
  [`HERO_KLARTEXT_PLAN.md`](HERO_KLARTEXT_PLAN.md): Beim Aufruf von außen wird sie aus
  Kundengerede herausgelöst und steht nach spätestens 1,5 s; dafür trägt sie `data-bewegt`.
- „Für wen“, Intro, Knöpfe, Adresszeile ziehen nacheinander ein: 8 px von unten, 320 ms, 60 ms Staffel,
  Start sofort nach dem Laden (kein `inView`, der Hero ist immer im Fenster).
- Eine Signatur, die dem Hero gehört und die H1 nicht berührt: zum Beispiel ein 1-px-Strich in Tinte,
  der unter der Adresszeile von links aufzieht, oder die Adresse, deren Unterstrich aufzieht. Eine, nicht
  drei.
- Beim Hinunterscrollen darf der Hero leicht zurücktreten (`scroll()`, Deckkraft bis 0,6 über die ersten
  60 vh), nie verschoben: Die H1 behält ihren Ort.

### C · 01 Arbeiten

> Seit 2026-10-08 überholt: Statt Raster unter der Bühne ein Kontaktabzug, Bewegung dazu in
> [`ARBEITEN_PLAN.md`](ARBEITEN_PLAN.md), 2.4. Der Text unten ist Geschichte.

- **Umschalter:** Beim Wechsel Kunden ↔ Eigene Projekte blendet die alte Auswahl in 120 ms aus, die
  neue zieht in 200 ms mit 8 px ein. Heute wechselt CSS über `:has()` hart; das Skript darf den
  Wechsel übernehmen, aber ohne Skript muss `:has()` weiter greifen.
- **Blättern:** Die Bühne schiebt in Blätterrichtung: „Nächste“ schiebt die alte 24 px nach links aus und
  die neue von rechts ein, „Vorherige“ umgekehrt, 320 ms; die Zählung „2 von 8“ wechselt mit. Die Höhe
  darf dabei nicht springen (Platz halten oder Höhe mit animieren).
- **Kacheln:** Das Raster kommt gestaffelt, Kachel um Kachel, 16 px von unten, 320 ms, 60 ms Staffel,
  einmal beim Hereinscrollen (`inView`, `amount: 0.2`).
- **Bilder:** Im Bildfeld der Bühne wandert das Bild beim Scrollen leicht (`scroll()`, höchstens 6 %,
  `overflow: hidden` bleibt). Bei Hover wächst das Bild auf 1,02 (320 ms), der Rahmen dunkelt wie heute.
- **Übergang:** `data-uebergang`-Elemente tragen in Ruhe keinen Transform. Der Übergang zur Projektseite
  muss nach wie vor morphen; einmal hin und zurück prüfen (Chromium).

### D · 02 Leistungen

- Die drei Arten: Haarlinie über jeder Spalte zieht auf (600 ms), Titel und Text ziehen 8 px ein,
  Spalte um Spalte (60 ms).
- **Aufklapper** (`Disclosure.astro`): Die Höhe animiert überall, nicht nur mit `interpolate-size`. Das
  Skript misst `scrollHeight` und animiert `height` 0 ↔ Maß in 320 ms, danach `height: auto`. Beim
  Öffnen ziehen die Punkte gestaffelt ein (8 px, 40 ms Staffel, höchstens 300 ms gesamt). Plus wird
  Minus wie heute. Schließen ohne Staffel. Ohne Skript öffnet `<details>` sofort, wie heute.
- Beleg-Links: Hover wie Textlinks, nichts Neues.

### E · 03 Arbeitsweise

- **Nummerierte Zeilen** (`NumberedRows.astro`): Zeile um Zeile, von oben: die Haarlinie unter der Zeile
  zieht auf, Nummer, Titel, Erklärung ziehen 8 px ein, 80 ms Staffel je Zeile. Die Nummer darf als
  Letztes „einrasten“ (Deckkraft, kein Zählen).
- Aufklapper „Wie gearbeitet wird“: kommt mit `Disclosure.astro` aus Chip D, hier nichts tun.

### F · 04 Über Klartext

- Absätze ziehen gestaffelt ein (8 px, 60 ms).
- Portrait, wenn vorhanden: Rahmen zieht sich auf (`clip-path: inset(0 0 100% 0)` → `inset(0)`,
  600 ms), danach steht das Bild still. Ohne Portrait nichts weiter.
- Textlink „Womit gearbeitet wird“: Pfeil wie heute.
- **Foto** (seit 2026-10-07 hier statt in G): zieht sich wie das Portrait auf (600 ms) und wandert
  beim Scrollen leicht im Rahmen (höchstens 6 %, `overflow: hidden`, Bild 1,06 groß, damit kein Rand
  entsteht). Bildunterschrift zieht nach.

### G · 05 Kontakt

- **Adresse** (`CopyEmail.astro`): Der Unterstrich der Adresse zieht von links auf, wenn der Kontakt ins
  Fenster kommt (600 ms); heute ist er `text-decoration`, dafür braucht es `background-size` wie bei
  `.row-title`. „Adresse kopieren“ gibt bei Druck nach; „Kopiert.“ zieht 8 px ein und blendet nach 2 s
  aus.
- **Erreichbarkeit** (`MetaList.astro`): Zeilen gestaffelt wie in E.
- **Haarlinie über der Adresse** (seit 2026-10-07, als das Foto nach F ging): zieht von links auf
  (600 ms), zur selben Zeit wie die Linien der Erreichbarkeit daneben.

### H · Unterseiten

- **Projektseite** (`ProjectPage.astro`): H1 und Summary stehen sofort. Meta-Liste, Knöpfe, Textblöcke
  und Listen ziehen beim Hereinscrollen ein; die Haarlinie jedes Blocks zieht auf. Listenpunkte
  („Funktionen“, „Entscheidungen“, „Erkenntnisse“) gestaffelt, 40 ms. Vor/Zurück unten: Pfeile wie
  heute, Titel-Unterstrich wie heute.
- **Galerie** (`ScreenshotGallery.astro`): Das Leitbild bleibt unbewegt (es ist das Ziel des
  Übergangs). Der Kontaktabzug kommt gestaffelt (16 px, 60 ms). Die Lightbox öffnet mit
  `@starting-style` (200 ms Deckkraft, Bild von 0,98), schließt sofort.
- **Blättern oben** (`ProjectNav.astro`): Knöpfe geben bei Druck nach.
- **Alle Arbeiten** (`pages/projekte/index.astro`, `ProjectFeature.astro`): Zeilen gestaffelt beim
  Hereinscrollen, Bild bei Hover 1,02. `data-uebergang` ohne Transform in Ruhe.
- **Werkzeuge** (`pages/werkzeuge.astro`): je Gruppe Haarlinie auf, Zeilen gestaffelt (40 ms).
- **Impressum, Datenschutz, 404, `ProseLayout`:** Nur die Kapitel-Haarlinie zieht auf und der Text
  zieht einmal 8 px ein. Rechtstexte müssen ohne jede Bewegung vollständig lesbar bleiben; im Zweifel
  weniger.
- **Code** (`CodeBlock.astro`): nichts, außer der Block zieht wie ein Textblock ein.

## 4. Integration nach den Chips

1. Chips zusammenführen, `npm run verify`, Startseite und Unterseiten in Chromium prüfen (hell, dunkel,
   schmal, reduziert, ohne Skript).
2. `DESIGN.md`: Abschnitt „Bewegung (Signature Motion)“ neu schreiben (offene Liste mit Grenzen aus
   Abschnitt 1), Don'ts „kein Einblenden beim Scrollen“ und „Umschalter ohne Übergang“ streichen,
   „Skripte“ auf Motion umschreiben. `README.md`: „Kein JavaScript auf den Unterseiten“ ersetzen.
3. Budget im Build-Protokoll ablesen; bleibt es unter 90 KB, bleibt die Grenze.
4. Offen für Pharrel: Safari auf dem iPhone ansehen (Playwright hat hier kein WebKit).
