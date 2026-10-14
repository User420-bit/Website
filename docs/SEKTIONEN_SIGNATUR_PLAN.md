# Plan: Jedes Kapitel bewegt sich auf seine Art

Stand: 2026-10-14 · Auftrag Pharrel: Wichtiger, als die Kapitel dem Hero anzugleichen, ist, dass
jedes Kapitel eigene Merkmale für Bewegung hat, so wie jede Bühne einer Projektseite einzigartig
handelt. Die Kapitel sind inhaltlich verschieden, also sollen sie sich auch verschieden bewegen.
Freigegeben wurden alle vier Vorschläge unten.

---

## 1. Prinzip

Die Bühnen der Projektseiten folgen einer Regel: Eine Szene nimmt genau ein Merkmal aus der
Projektdatei und setzt es ins Bild. Prüffrage: Würde ein Besucher die Szene einem anderen Projekt
zuordnen? Dann ist sie falsch.

Dieselbe Regel gilt jetzt für die Kapitel der Startseite, mit der H2 als Merkmal. Jedes Kapitel sagt
etwas anderes, also bewegt es sich anders. Die Grundbewegung (Kapitel-Linie, Text 8 px, Haarlinien)
bleibt überall gleich; darüber liegt je Kapitel genau eine Signatur. Rückbezüge aufs Gerede und der
Marker ([`NACH_DEM_HERO_PLAN.md`](NACH_DEM_HERO_PLAN.md)) sind der Faden zwischen den Kapiteln, keine
Signatur.

## 2. Die Signaturen

| Kapitel         | Aussage (H2)                                   | Signatur               | Art                   |
| --------------- | ---------------------------------------------- | ---------------------- | --------------------- |
| 01 Arbeiten     | Jedes Projekt sagt, wie weit es ist            | Stand-Marker zieht auf | ans Scrollen gebunden |
| 02 Leistungen   | Hinter jeder Leistung steht ein echtes Projekt | Belege rücken nach     | einmal, unter 3 s     |
| 03 Arbeitsweise | Erst klären, was geht, dann bauen              | Fahrplan               | ans Scrollen gebunden |
| 04 Über         | Eine Person, direkt ansprechbar                | Blick schweifen        | ans Scrollen gebunden |
| 05 Kontakt      | Das erste Gespräch kostet nichts               | Adresse schreiben      | einmal, rund 2,6 s    |

**02 Belege rücken nach** (`home/Leistungen.astro`). Unter jeder Beschreibung steht neu die
Belegzeile der Spalte: alle Projekte aus ihren Einzelpunkten, veröffentlichte als orange Links,
unveröffentlichte (PointCare, JustBeauty) als Name ohne Link. Nachdem der Marker die Antwort
markiert hat, rücken die Namen einzeln von links nach (320 ms, 120 ms Abstand). Erst die Behauptung,
dann die Belege. Inhaltlich der größte Gewinn: Die Belege standen vorher nur in den Aufklappern.

**03 Fahrplan** (`NumberedRows.astro`, `fahrplan`). Neben den Ziffern liegt eine Haarlinie von der
ersten zur letzten Ziffer, darin ein oranger Strich, dessen Spitze immer bei 60 % der Fensterhöhe
steht. Jede Ziffer, die er erreicht, rastet in Orange und 600 ein. Beim Zurückscrollen läuft alles
zurück. Eine Reihenfolge, die man abfährt.

**04 Blick schweifen** (`home/Ueber.astro`). Ersetzt die leichte senkrechte Parallaxe. Das Bild ist
im Rahmen größer als der Rahmen (am Computer 1,35-fach breit, am Handy so hoch wie der Rahmen und
damit 1,84-fach breit) und fährt vom Eintreten bis zum Verlassen einmal von der linken zur rechten
Kante. Die senkrechte Lage bleibt die alte (`object-position` 50 % bzw. 64 %).

**05 Adresse schreiben** (`CopyEmail.astro`, `schreiben`). Die Adresse tippt sich ein, 55 ms je
Zeichen, Unterstrich mit; ein oranger Cursor läuft an der Kante mit, blinkt danach dreimal und geht.
Der Text wird nicht zerlegt: Ein `clip-path` deckt ihn in Sprüngen an den gemessenen Zeichengrenzen
auf. Link, Vorlesen und Markieren bleiben, wie sie sind. Die Zeile „Sie erzählen. Ich höre zu.“
darüber läuft nicht mehr ein, damit nicht zwei Texte gleichzeitig entstehen.

## 3. Grenzen (in `DESIGN.md` als The Signature Rule)

- Genau eine Signatur je Kapitel, aus seiner Aussage.
- Ans Scrollen gebunden oder einmal und dann Ruhe, unter 5 s (WCAG 2.2.2, Zweckbindung).
- Darf länger und weiter gehen als die Grundbewegung (das Schreiben dauert 1,1 s, das Panorama
  wandert weit mehr als 6 %), aber nie Text unlesbar machen und nie verändern, was gezeigt wird.
- Ohne Skript und mit reduzierter Bewegung steht der Endzustand: Belege da, kein Fahrplan,
  gewohnter Bildausschnitt, Adresse ganz.

## 4. Kosten

- Das Foto in 04 wird am Computer in größerer Auflösung geladen (`sizes` 84rem statt 62rem, neue
  Stufe 2400 px), auch für Besucher ohne Bewegung; `sizes` kann nicht wissen, ob geschwenkt wird.
- Die Belegzeile macht die Spalten in 02 etwas höher.
- Beim Schwenk sieht man nie das ganze Panorama auf einmal (vorher am Computer fast ganz).

## 5. Geprüft

Chromium, 1440 × 900 dunkel und 390 × 844 hell, mit reduzierter Bewegung und ohne Skript: Belege
erscheinen nach dem Marker, Fahrplan bei Ziffer 2 auf 60 % mit eingerasteter 1, Schwenk von 0 bis
−253 px (Computer) bzw. −226 px (Handy) ohne Lücke im Rahmen, Adresse in Schritten
(„info@web-kl|“) mit Cursor, danach ganz. Keine Konsolenfehler. Safari nicht geprüft.
