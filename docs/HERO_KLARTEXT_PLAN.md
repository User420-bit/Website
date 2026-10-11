# Plan: Hero „Aus Gerede wird Klartext“

Stand: 2026-10-11 · Ergebnis eines Interviews zwischen Pharrel und Claude Code.
Gebaut in `src/components/home/Hero.astro`, Rohtext in `company.json` als `heroGerede`.

Version 2 vom 2026-10-11: Die Animation läuft nicht mehr nach Zeit, sondern mit dem Scrollen.
Version 1 (1,5 s nach dem Laden) war vorbei, bevor man gemerkt hatte, dass sie anfängt. Die
Regeln aus `DESIGN.md` zu Dauer und Weg gelten für diesen Hero ausdrücklich nicht (Entscheidung
Pharrel: „Die Regeln sind unwichtig“).

Version 3 vom 2026-10-11: Man kam schwer darauf, dass man scrollen muss, und die Fläche um die
fliegenden Wörter war leer. Dazu kamen: Selbststart der Marker, ein deutlicher
Hinweis mit Fortschrittsbalken und ein Himmel aus Punktefeld, Staub, Schweifen und Landefunken.

Version 4 vom 2026-10-11: Die Seite startet erst mit einer Überschrift, dann kommt das Gerede.
Die Eröffnungszeile „Sie erzählen. Ich höre zu.“ (`heroAuftakt` in `company.json`) steht sofort an
der Stelle der späteren H1. Darunter läuft das Gerede Wort für Wort ein. Beim Scrollen macht die
Zeile Platz, und die H1 landet dort. Erzählung: Haltung, Lärm, Antwort.

Version 5 vom 2026-10-11: Der Hinweis-Knopf (Maus-Symbol, fest am unteren Fensterrand, Klick
spielte ab) überlappte je nach Fensterhöhe mit dem Gerede. Er ist ersetzt durch ein Textfeld im
Fluss direkt unter dem Gerede, das nach Art eines iOS-Hinweises zweimal hüpft, ruht und wieder
hüpft. Ein Klick-zum-Abspielen gibt es nicht mehr.

---

## 0. Die Idee in einem Satz

Die Startseite öffnet mit Kundengerede und einem Hinweis zum Scrollen. Beim Scrollen werden vier
Wörter darin markiert, steigen aus dem Text, fliegen über die Seite und landen als H1
„Ihre Probleme, klar gelöst.“ Ist die H1 erreicht, gibt es kein Zurück mehr.

Was die Animation sagt: Klartext hört zu, zieht aus viel Gerede das Wesentliche, und was bleibt,
ist klar. Der Name wird vorgeführt, nicht behauptet.

## 1. Wann sie spielt

| Aufruf                                       | Animation                         |
| -------------------------------------------- | --------------------------------- |
| Direkt, Lesezeichen, fremde Seite, neuer Tab | ja                                |
| Neuladen (auch weit unten)                   | ja, die Seite beginnt wieder oben |
| Zurück von einer eigenen Unterseite per Link | nein, H1 sofort                   |
| Zurück-Knopf des Browsers                    | nein, alte Scrollposition         |
| Adresse mit Sprungziel (`/#arbeiten`)        | nein, direkt zum Ziel             |
| Ohne Skript, reduzierte Bewegung             | nein, H1 sofort                   |

Der Hero füllt in jedem Fall das erste Fenster unter dem Header. So stimmt die Scrollposition
beim Zurückblättern, egal ob vorher animiert wurde oder nicht.

## 2. Der Rohtext (vorläufig)

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

Der Text wird später überarbeitet (Pharrel, 2026-10-11). Bis dahin bleibt er so.

## 3. Ablauf

**Ohne Scrollen.**

| Zeit      | Was passiert                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------ |
| 0 s       | „Sie erzählen.“ / „Ich höre zu.“ steht sofort in Display-Größe, an der Stelle der späteren H1    |
| 0,8–3,0 s | Darunter läuft das Gerede Wort für Wort ein (20 ms je Wort, reines CSS)                          |
| 2,9–3,9 s | Die vier Claim-Wörter werden nacheinander markiert                                               |
| 3,8 s     | Unter dem Gerede erscheint der Hinweis: ein Textfeld „Scrollen ↓“, auf Touch-Geräten „Wischen ↑“ |
| ab 4,5 s  | Das Feld hüpft zweimal 8 px hoch und runter, ruht gut 3 s, hüpft wieder, bis gescrollt wird      |

Das Feld steht im Fluss unter dem Text und kann ihn deshalb nie verdecken. In niedrigen Fenstern
(bis 740 px Höhe) werden die Abstände enger und am Computer die Gerede-Schrift eine Stufe kleiner,
damit alles ins erste Fenster passt. Im Hintergrund wimmelt ein Punktefeld. Scrollt jemand, bevor
das Gerede steht, steht es sofort komplett, mit Markern.

**Mit Scrollen.** Die Strecke ist 240 % der Fensterhöhe lang (Desktop rund 1 900 px). Der Rahmen
klebt währenddessen unter dem Header, unten zeigt ein Balken den Fortschritt. Fortschritt p:

| p         | Was passiert                                                                   |
| --------- | ------------------------------------------------------------------------------ |
| 0,02–0,16 | Die Eröffnungszeile steigt 24 px nach oben und verblasst                       |
| 0,04–0,26 | Jedes Wort steigt aus seiner Zeile, staubt orange und wächst, die Lücke bleibt |
| 0,12–0,38 | Der Rest des Geredes zerfällt von links nach rechts zu Staub                   |
| 0,11–0,89 | Flug mit Sternschnuppen-Schweif und Funken über die Seite in die H1            |
| 0,20–0,80 | Das Punktefeld ordnet sich vom Gewimmel zum ruhigen Raster                     |
| 0,40–0,85 | Hinter der H1 glimmt es auf                                                    |
| 0,77–0,96 | Landung: ein Rahmen rastet um jedes Wort ein, Funken springen ab               |
| 0,88–0,95 | Marker laufen aus, Komma und Punkt erscheinen                                  |
| 0,86–1,00 | „Für wen“, Intro, Knöpfe, Adresse ziehen ein, zuletzt der Strich               |
| 0,90–1,00 | Der Himmel blendet aus                                                         |
| 1         | Fertig. Die Strecke verschwindet, der Rahmen klebt nicht mehr                  |

Bis p = 1 läuft alles mit dem Scrollen vor und zurück. Bei p = 1 wird die Strecke entfernt und
um genau ihre Länge zurückgescrollt: Für das Auge ändert sich nichts, aber oberhalb der H1 ist
keine Strecke mehr, in die man zurückscrollen könnte.

## 4. Technik

- **Bühne und Rahmen.** `[data-hero-buehne]` ist Fensterhöhe plus Strecke hoch, `[data-hero-rahmen]`
  klebt darin (`position: sticky`) unter dem Header. Die Header-Höhe setzt ein Inline-Skript als
  `--hero-kopf`.
- **Kopien statt echter Wörter.** Die vier fliegenden Wörter sind Kopien in Display-Schrift. Sie
  liegen am Ziel (ihrem Wort in der H1) und werden per `transform` an Quelle, Wegpunkt und Ziel
  gesetzt. Gemessen wird immer der Glyphenkasten des Textes (Range), nicht der Zeilenkasten. Ablösen
  und Landung sitzen auf 0 px genau.
- **Kein Zurück.** Abschluss bei p = 1: Kopien weg, H1 sichtbar, `data-hero="fertig"`, Strecke weg,
  `scrollBy` um die verschwundene Strecke.
- **Sprung während der Strecke.** Ein Klick auf einen Anker der Seite (Navigation, „Arbeiten
  ansehen“) schließt die Animation vorher ab, damit der Browser das richtige Ziel berechnet.
- **Neuladen.** `history.scrollRestoration = 'manual'`, solange die Animation läuft, danach wieder
  `auto`.
- **Himmel.** Ein Canvas hinter allem, nur während der Animation. Punktefeld, Staub, Schweife,
  Funken und Landerahmen werden jedes Bild aus p gezeichnet, also auch rückwärts richtig. Zufall
  mit fester Saat, damit jeder Besuch gleich aussieht. Farben kommen aus den Tokens (OKLCH, im
  Skript nach RGB umgerechnet). Im Dunkelmodus leuchten Schweife additiv.
- **Neuladen wirklich oben.** Stellt der Browser die alte Scrollposition erst nach dem Start
  wieder her, setzt das Skript in der ersten 1,5 s wieder auf oben, solange niemand selbst scrollt.
- **Sicherheitsnetz.** Läuft das Modul nach 2 s nicht, stellt CSS den fertigen Hero her und nimmt
  die Strecke weg.
- **Zugänglichkeit.** Gerede, Kopien und Hinweis tragen `aria-hidden`. Für Screenreader gibt es
  die H1 vom ersten Moment an.

## 5. Bekannte Kosten

- Wer nur den Claim lesen will, muss erst durch die Strecke. Das ist gewollt.
- Der Largest Contentful Paint ist jetzt das Gerede, nicht die H1.
- Hinweis und Punktefeld bewegen sich endlos, solange man nicht scrollt.
- JavaScript-Budget von 90 auf 100 KB je Seite angehoben; der Himmel braucht rund 11 KB.

## 6. Prüfung

`npm run verify` grün. Im Browser, 1280 × 800 und 390 × 844, hell und dunkel: Ablösen und Landung
pixelgenau, Abschluss ohne Sprung, Hochscrollen nach dem Abschluss bringt die Animation nicht
zurück. Dazu alle Fälle aus Abschnitt 1 und ein ausgefallenes Modul.
