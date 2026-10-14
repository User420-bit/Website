# Plan: Nach dem Hero geht die Geschichte weiter

Stand: 2026-10-14 · Auftrag Pharrel: herausfinden, wie weit der Rest der Startseite hinter dem
Scroll-Hero zurückbleibt, welche Erwartung der Hero weckt, und den Rest so anpassen, dass sie nicht
abflacht. Gebaut in `GeredeEcho.astro`, `lib/echo.ts`, `home/Leistungen.astro`,
`home/Arbeitsweise.astro`, `NumberedRows.astro`, `home/Kontakt.astro`; Inhalt in `company.json` als
`heroEchos`.

> **Teilweise abgelöst am 2026-10-14** durch [`RUHE_PLAN.md`](RUHE_PLAN.md): Die Zitate über den
> Kapiteln sind entfernt; drei der Sätze leben in der Wahlhilfe von Leistungen weiter, der Schlusspunkt
> im Kontakt bleibt (stehend).

---

## 1. Was der Hero verspricht

Der Hero (`docs/HERO_KLARTEXT_PLAN.md`) erzählt in drei Schritten: „Sie erzählen. Ich höre zu.“, dann
Kundengerede, dann landen vier Wörter daraus in der H1 „Ihre Probleme, klar gelöst.“ Daraus entstehen
drei Erwartungen:

1. **Inhaltlich: „Er hat zugehört.“** Wer das Gerede gelesen hat (Baukasten-Website, Excel-Tabelle,
   Steuerberatung, Agentur, Kosten vorher klar), erwartet, dass die Seite darauf antwortet. Das ist die
   stärkste der drei, weil der Hero sie wörtlich ausspricht.
2. **Handwerklich: „So sorgfältig ist alles.“** Der Hero ist selbst eine Arbeitsprobe. Er setzt das
   Maß, an dem der Rest gemessen wird.
3. **Im Umgang: „Scrollen bewirkt etwas.“** Im Hero treibt das Scrollen eine Geschichte voran.

## 2. Befund vor dieser Änderung

| Abschnitt       | Bewegung                                                                               | Bezug zum Hero |
| --------------- | -------------------------------------------------------------------------------------- | -------------- |
| Hero            | Strecke von 240 % Fensterhöhe, rund 95 Wörter, 4 Flüge mit Schweif, Punktefeld, Marker | –              |
| 01 Arbeiten     | Linie, Kopf 8 px, Bild zieht auf (7 bewegte Elemente)                                  | keiner         |
| 02 Leistungen   | Haarlinien, Text 8 px (4)                                                              | keiner         |
| 03 Arbeitsweise | Zeilen nacheinander, 8 px (19)                                                         | keiner         |
| 04 Über         | Absätze 8 px, Foto zieht auf, Parallaxe (5)                                            | keiner         |
| 05 Kontakt      | Linien, Adresse unterstrichen (4)                                                      | keiner         |

Gemessen im Browser nach einem vollständigen Durchlauf des Heros (1440 × 900, dunkel), gezählt sind
Elemente mit `data-bewegt`.

**Der eigentliche Abfall ist nicht die Bewegung, sondern die Geschichte.** Das Gerede zerfällt im Hero
zu Staub und kommt nie wieder vor. Dabei beantwortet der Rest der Seite fast jeden Satz daraus, nur
ohne es zu sagen: „Export für die Steuerberatung“ steht in Leistungen, „was es kostet – vor dem
Projekt“ in Arbeitsweise. Wer zugehört hat, zeigt das, indem er wiederholt, was er gehört hat.

Bewegung allein wäre die falsche Antwort gewesen. Jeder Abschnitt auf Hero-Niveau hätte den Effekt
entwertet (Wiederholung stumpft ab), das Lesen gestört (Leistungen und Arbeitsweise sind Lesetext),
das JavaScript-Budget gesprengt und die Zweckbindung aus `DESIGN.md` gebrochen.

## 3. Entscheidung: Rückbezüge statt mehr Effekt

Die Seite greift das Gerede dort wieder auf, wo sie es beantwortet, mit den Mitteln des Heros, aber
klein: ein Satz läuft Wort für Wort ein wie das Gerede, danach zieht der Marker aus dem Hero über die
Stelle der Antwort.

| Wo                          | Gerede (wörtlich)                                                                          | Antwort mit Marker                               |
| --------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Leistungen · Kl. Programme  | „Jedes Jahr sucht die Steuerberatung die Belege zusammen.“                                 | Export für die Steuerberatung                    |
| Leistungen · Websites       | „Wir haben eine Baukasten-Website, die auf dem Handy komisch aussieht …“                   | auf dem Handy gut aussehen                       |
| Leistungen · Web-Apps       | „… im Laden läuft alles über eine Excel-Tabelle …“                                         | wenn die Tabelle nicht mehr reicht               |
| Arbeitsweise · Klartext     | „Es soll vorher klar sein, was es kostet und wie lange es dauert.“                         | was es kostet – vor dem Projekt                  |
| Arbeitsweise · Pragmatismus | „Eine Agentur wollte uns gleich ein ganzes System verkaufen, aber wir wollen kein System.“ | Kein neues Werkzeug, wenn ein vorhandenes reicht |
| Über Klartext               | „Wir wollen, dass sich jemand unsere Probleme anschaut …“                                  | Hinter Klartext steht Pharrel Sandjo Djomou      |

**01 Arbeiten** bekommt kein Zitat, aber den Marker: Jede Arbeit sagt, wie weit sie ist, und die
„Stand“-Zeile ist genau das Klartext-Versprechen. Ihr Satz trägt den Marker, ans Scrollen gebunden
wie die Flüge im Hero: Er zieht auf, während die Zeile von 95 % bis 55 % der Fensterhöhe steigt, und
läuft beim Zurückscrollen zurück. Nach dem Blättern steht er gleich weit. So kommt das, was den Hero
ausmacht (Scrollen treibt etwas an), direkt nach ihm noch einmal vor, ohne neues Schauspiel.

Dazu ein **Schlusspunkt**: Im Kontakt steht über der Adresse noch einmal „Sie erzählen. Ich höre zu.“
und läuft ein wie das Gerede. Die Seite endet, wo sie angefangen hat; jetzt steht die Adresse
darunter. Der Schluss bleibt im Gedächtnis (Peak-End-Regel), und vorher war er die flachste Stelle
der Seite.

**Regeln dafür** (in `DESIGN.md` als The Echo Rule):

- Wörtlich oder gar nicht. `lib/echo.ts` prüft beim Bauen, dass der Satz in `heroGerede` und die
  Antwort in der Beschreibung steht; sonst bricht der Build. Ein Zitat, das nie gesagt wurde, wäre
  erfunden (`PRODUCT.md`: keine erfundenen Kundenstimmen).
- Neben der Antwort, nie allein. Höchstens ein Rückbezug je Block, und nicht in jedem Block: 01
  Arbeiten bleibt ohne Zitat, Struktur und Lernen auch.
- Der Marker liegt nur auf der Stelle, die antwortet, nicht auf ganzen Sätzen.
- Für alle sichtbar, nicht nur nach dem Hero. „Sie erzählen:“ liest sich auch ohne Hero als typischer
  Satz eines Kunden; wer den Hero gesehen hat, erkennt ihn wieder. So bleibt die Seite für jeden gleich
  hoch, und Scroll-Positionen beim Zurückblättern stimmen.

## 4. Bewegung

- Einmal, wenn die Gruppe zu 40 % im Fenster ist (`inView`), ohne Rückweg.
- Zitat: 300 ms je Wort, 20 ms Versatz, 0,35em Weg, wie das Gerede im Hero. In Leistungen fangen die
  Spalten nacheinander an (0,35 s Abstand).
- Marker: 600 ms, eine Kurve, setzt ein, wenn das letzte Wort steht. Als Hintergrund des `<mark>`,
  damit er Zeilenumbrüchen folgt wie ein Textmarker.
- Ohne Skript und mit reduzierter Bewegung steht alles sofort, Marker inklusive. Läuft das Modul nicht,
  stellt CSS nach 2 s den Endzustand her.

## 5. Bewusst nicht gemacht, offen

- **„Kunden · folgt“ direkt nach dem Hero.** Der Hero verspricht „Ihre Probleme“, und das Erste, was
  danach kommt, ist ein ausgegrauter Reiter ohne Kundenprojekt. Das ist der härteste Erwartungsbruch
  der Seite, und kein Effekt behebt ihn. Er verschwindet erst, wenn PointCare oder JustBeauty
  veröffentlicht sind.
- **01 Arbeiten ohne Zitat.** Kein Satz im Gerede passt ehrlich zu den Arbeiten; ein gezwungener
  Bezug wäre schlechter als keiner. Dort trägt nur der Stand den Marker.
- **04 Über, Text aus Markdown.** Der Rückbezug arbeitet auf dem fertigen HTML von `about.md`
  (`echoHtml` in `lib/echo.ts`). Wer den Satz „Hinter Klartext steht …“ dort umschreibt, bricht den
  Build und muss `heroEchos` mitziehen.
- **Unterseiten** bleiben, wie sie sind. Wer dort landet, hat den Hero meist nicht gesehen.
- **Leere Fläche nach dem Hero.** Nach der Landung bleibt unter Adresse und Knöpfen ein Streifen
  leeres Fenster bis zur Kapitel-Linie von 01 (am Desktop rund 250 px). Der Hero füllt das erste
  Fenster mit Absicht (gleiche Scroll-Positionen beim Zurückblättern); das bleibt so.
