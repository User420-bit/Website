# Plan: Eine ruhige Seite, Bewegung nur mit Aufgabe

Stand: 2026-10-14 · Auftrag Pharrel nach dem Merge der Kapitel-Signaturen: „viel zu schnell und
unübersichtlich“. Wenn der Text überall einfliegt, wirkt das an vielen Stellen komisch. Verstehen,
wie ein Kunde die Seite anschaut, die Bewegung danach richten, nichts Unnötiges mit Bewegung
verschönern, sondern neue, eigene Elemente einbauen, die nicht einfach nur da sind.

Löst ab: das Einziehen aus [`BEWEGUNG_PLAN.md`](BEWEGUNG_PLAN.md) (Abschnitt 1, Regeln 3 bis 5),
die Signaturen aus [`SEKTIONEN_SIGNATUR_PLAN.md`](SEKTIONEN_SIGNATUR_PLAN.md) und die Rückbezüge
aus [`NACH_DEM_HERO_PLAN.md`](NACH_DEM_HERO_PLAN.md). Der Scroll-Hero
([`HERO_KLARTEXT_PLAN.md`](HERO_KLARTEXT_PLAN.md)) und die Bühnen der Projektseiten bleiben.

---

## 1. Wie ein Kunde die Seite anschaut

Laut `PRODUCT.md` kommen Kunden meist am Handy, über einen Link, mit drei Fragen: Kann Klartext mein
Problem lösen? Ist die Arbeit gut? Ist die Person ansprechbar? Daraus folgt, wie gelesen wird:

1. **Den Hero schauen sie.** Er ist eine Geschichte, und sie scrollen hindurch.
2. **Danach überfliegen sie.** Überschriften, ein Blick auf die Arbeiten, dann gezielt die Stelle,
   die ihre Frage beantwortet. Sie scrollen schnell und halten an, wo etwas passt.
3. **Wo sie anhalten, lesen sie.** Und genau dort lief vorher noch etwas: Zeilen zogen 8 px ein,
   Zitate liefen Wort für Wort ein, Belege rückten nach, die Adresse tippte sich. Wer anhielt, sah
   Text erscheinen, während er ihn schon lesen wollte. Wer schnell scrollte, sah leere Stellen, die
   sich erst danach füllten.

Bewegung, die von selbst beim Scrollen kommt, trifft also immer den falschen Moment: Sie kommt beim
Überfliegen zu spät und beim Lesen zu früh.

## 2. Regeln

- **Nichts erscheint von selbst** (The Still Page Rule in `DESIGN.md`). Text, Linien, Bilder und
  Felder stehen, wenn das Auge ankommt, auf jeder Seite. Ausnahmen: der Scroll-Hero und die Bühnen.
- **Bewegung antwortet.** Sie folgt einer Handlung und zeigt deren Ergebnis: Hover, Druck,
  Aufklapper, Blättern, Umschalten, Lightbox, Seitenwechsel, Wahl in der Wahlhilfe.
- **Neue Elemente statt Verschönerung.** Wo etwas fehlt, kommt ein Element mit einer Aufgabe dazu.

## 3. Was weg ist

| Wo                 | Vorher                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Kapitelkopf (alle) | Tintenlinie zog auf, Nummer, H2 und Intro zogen ein                                         |
| 01 Arbeiten        | Bild zog sich auf, Text zog ein, Kontaktabzug kam gestaffelt; Stand-Marker hing am Scrollen |
| 02 Leistungen      | Haarlinien, Text; Zitate liefen ein; Belege rückten nach                                    |
| 03 Arbeitsweise    | Zeilen bauten sich auf; Zitate; Fahrplan-Linie                                              |
| 04 Über            | Absätze zogen ein; Zitat; Foto zog sich auf und schwenkte                                   |
| 05 Kontakt         | Linie zog auf; Adresse tippte sich; Zeilen der Erreichbarkeit                               |
| Hero ohne Gerede   | „Für wen“, Intro, Knöpfe und Adresse zogen ein                                              |
| Unterseiten, Fuß   | Blöcke, Linien, Listen, Kontaktabzug, Fuß zogen ein                                         |
| Aufklapper         | Punkte zogen beim Öffnen gestaffelt ein (die Höhe bleibt)                                   |

Die Zitate über den Kapiteln (`GeredeEcho`) sind gelöscht. Der Stand-Marker bleibt, aber stehend.
JavaScript je Seite fiel dabei von 94 auf 74 KB.

## 4. Was neu ist

**Wahlhilfe in 02 Leistungen.** „Was davon kennen Sie?“ und drei Sätze wörtlich aus dem Gerede. Wer
einen wählt, bekommt die Antwort: Die anderen Spalten treten zurück, die antwortende Stelle bekommt
den Marker, „Im Einzelnen“ öffnet sich mit den Belegen, am Handy führt die Seite hin. Noch einmal
tippen hebt die Wahl auf. „Nichts davon? Erzählen Sie es.“ führt zum Kontakt. Das Element beantwortet
die erste Kundenfrage, und seine Bewegung zeigt genau diese Antwort. Nur mit Skript.

**Antworttermin in 05 Kontakt.** „Heute geschrieben, Antwort in der Regel bis Donnerstag, 15. Oktober.“ und die nächsten sieben Tage als Kalenderfelder: heute, Antwort, freie Tage. Aus einem
Versprechen („innerhalb eines Werktags“) wird ein Datum für genau diesen Besuch. Wochenenden und
bayerische Feiertage zählen nicht. Geprüft: Freitag vor Allerheiligen → Montag, Gründonnerstag →
Dienstag nach Ostern, Mittwoch vor Christi Himmelfahrt → Freitag. Nur mit Skript.

## 5. Offen

- Weitere Elemente mit Aufgabe, falls ein Kapitel zu still wirkt, etwa für 03 Arbeitsweise. Erst
  bauen, wenn klar ist, welche Frage es beantwortet.
- Safari auf dem iPhone nicht geprüft.
