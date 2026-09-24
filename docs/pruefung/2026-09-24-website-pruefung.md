# Website-Prüfung web-klartext.de, 2026-09-24

**Gesamturteil.** Technisch hält die Seite alles, was Besucher heute erwarten: sie steht in unter einer halben Sekunde, nichts springt, nichts verdeckt, nichts Fremdes lädt, keine Effekte bremsen. Sie verliert an zwei Stellen, die beide Vertrauen betreffen: Es gibt kein Gesicht und keinen Kundenbeleg, und die Seite verspricht im ersten Satz "was es kostet, steht vorher fest", nennt aber nirgends einen Preisrahmen.

**Die drei wirksamsten Maßnahmen.**
1. Unter "Leistungen" je Leistung einen Preisrahmen nennen ("ab … €" oder Stundensatz mit typischer Spanne) und die Dauer in Wochen. Hängt am Stundensatz in `kontext/leistungen.md`. · Punkt 6
2. Auf der Startseite ein Portrait im Abschnitt "Über Klartext" und je Referenz ein Bild (die Screenshots aus `docs/vorschau/` liegen bereit; die Referenz kleinkram hat schon vier). · Punkt 7 und 2
3. Die fünf H2 von Etiketten zu Aussagen machen ("Arbeiten" wird "Fünf Arbeiten, bei jeder steht, was davon fertig ist"; "Kontakt" wird "Antwort innerhalb eines Werktags") und die H1 um das "für wen" ergänzen. · Punkt 3 und 2

**Geprüft.** Quelle: live, https://web-klartext.de (GitHub Pages, Astro-Build). Seiten: Startseite, /projekte/pointcare/, /projekte/justbeauty/, /projekte/kleinkram/. Geräte: Handy 390 × 844, Desktop 1440 × 900. Browser: Google Chrome (headless). Messung: Scratchpad `pruefung-klartext`, Werte in `befund.json`. Felddaten: keine. PageSpeed Insights blieb nach 60 s beim Laden hängen; die Seite ist jung und klein, CrUX-Daten sind unwahrscheinlich.

**Nicht gemessen.** INP mit echten Nutzern; die Funktion von "Adresse kopieren" (JavaScript, nicht geklickt); Seiten /werkzeuge/, Impressum, Datenschutz.

## Übersicht

| Nr. | Punkt | Urteil | Kurzbefund |
| --- | --- | --- | --- |
| 1 | Ladezeit und Reaktion | erfüllt | LCP 0,2 s, CLS 0, TBT 0 ms, 45 KB, 4 Anfragen (Labor, Handy) |
| 2 | Erster Bildschirm | teilweise | Fünf-Sekunden-Test bestanden, ein Knopf, aber H1 ohne "für wen" und kein Bild |
| 3 | Scannbarer Text | teilweise | LIX 43, kein Absatz über 80 Wörter, aber alle fünf H2 sind Etiketten |
| 4 | Nächster Schritt | erfüllt | Jede Seite endet mit "E-Mail schreiben"; Referenzen verweisen auf die nächste Arbeit |
| 5 | Tote Klicks | erfüllt | 0 Treffer, 1 bis 2 kleine Tippziele (Pfeil-Links) |
| 6 | Sichtbare Angaben | teilweise | Kontakt und Antwortzeit auf Bildschirm 1; Preis nur als Wort, Dauer nirgends |
| 7 | Belege | teilweise | Ehrliche Stände und Daten, aber kein Foto, keine Kundenstimme, 0 Bilder auf der Startseite |
| 8 | Nichts verdeckt den Einstieg | erfüllt | Keine Overlays, keine Dialoge, kein Autoplay |
| 9 | Bewegung | erfüllt | 38 Übergänge, keiner über 200 ms, kein Text wartet auf Scrollen |
| 10 | Personalisierung und Fremdes | erfüllt | 0 fremde Hosts, Schriften lokal, kein Chat, kein Tracking |

## Die zehn Punkte

### 1. Ladezeit und Reaktion · erfüllt

- **Befund.** Startseite Handy: TTFB 50 ms, FCP und LCP 192 ms, CLS 0, TBT 0 ms, keine langen Aufgaben, 45 KB in 4 Anfragen (Dokument 9 KB, Stylesheet 7 KB, Schriften 30 KB). Unterseiten 41 KB; kleinkram mit vier Screenshots 127 KB (Bilder 85 KB). Desktop gleichwertig. Keine fehlgeschlagenen Anfragen, keine Konsolenfehler.
- **Beleg.** `befund.json`, `zeiten` und `netz` je Seite. Schwellen: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 200 ms (Core Web Vitals). Alles Laborwerte eines Ladevorgangs; Felddaten fehlen.
- **Maßnahme.** Keine. Die Schriften sind mit 30 KB der größte Posten; das ist in Ordnung.

### 2. Erster Bildschirm · teilweise

- **Befund.** Fünf-Sekunden-Test am Handy-Bild: "Klartext baut kleine Programme, Websites und Web-Apps für Selbstständige und kleine Betriebe, Kosten und Grenzen stehen vorher fest." Bestanden, aber erst durch den Absatz unter der H1. Die H1 "Kleine Software, klar gebaut." nennt weder Nutzen noch Zielgruppe. Oben genau ein auffälliger Knopf ("E-Mail schreiben"), daneben ein Textlink ("Arbeiten ansehen"), im Kopf "Anfrage" mit derselben Funktion. Kein Bild, kein Gesicht. Unterzeile mit Ort, E-Mail und Antwortzeit ist stark.
- **Beleg.** `start-handy-oben.png`; `ersterBildschirm.h1` = "Kleine Software, klar gebaut.", `auffaelligeCtas` = 1 von 2, `bilder` = leer.
- **Maßnahme.** H1 auf "Kleine Software für Selbstständige, klar gebaut und vorher kalkuliert." oder ähnlich mit "für wen" (8 bis 14 Wörter). Ein Portrait rechts vom Hero auf dem Desktop, unter dem Hero auf dem Handy; bis es da ist, kein Platzhalterbild.

### 3. Scannbarer Text · teilweise

- **Befund.** Startseite 494 Wörter, 7 Wörter je Satz (viele Listen), LIX 43 (mittel), längster Absatz 47 Wörter, 10 Listen. Die H2 lauten "Arbeiten", "Leistungen", "Arbeitsweise", "Über Klartext", "Kontakt": wer nur Überschriften liest, erfährt nichts. Der Abschnitt "Über Klartext" ist ein Textblock aus drei Absätzen ohne Zwischenüberschrift. Referenzseiten: LIX 42 bis 53, H2 "Worum es geht", "Funktionen", "Technische Entscheidungen", "Erkenntnisse", die Listen darunter sind gut scannbar.
- **Beleg.** `ueberschriften.h2Texte`, `text.lix`, `text.laengsterAbsatz`; `start-handy-voll.png`.
- **Maßnahme.** Jede H2 als Aussage: "Fünf Arbeiten, bei jeder steht, was davon fertig ist", "Drei Leistungen mit Preisrahmen", "So läuft ein Auftrag in vier Schritten", "Wer dahintersteht", "Antwort innerhalb eines Werktags". Im Abschnitt "Über Klartext" den ersten Satz jedes Absatzes zur Kernaussage machen. Die 53 Textstellen aus der laufenden Textrevision (Vault, Entwurf vom 23.09.2026) decken einen Teil davon ab.

### 4. Nächster Schritt · erfüllt

- **Befund.** Die Startseite endet mit dem Kontaktabschnitt: E-Mail, Knopf "E-Mail schreiben", "Adresse kopieren", darunter "So läuft eine Anfrage ab" in vier Schritten. Jede Referenz endet mit "Nächste Arbeit → …", dann "Ein ähnliches Vorhaben? E-Mail schreiben" und "So läuft eine Anfrage ab".
- **Beleg.** `naechsterSchritt.seitenende` und `.beispiele`; 6 Links im letzten Drittel der Startseite, 2 auf jeder Referenz.
- **Maßnahme.** Keine.

### 5. Tote Klicks · erfüllt

- **Befund.** Keine Elemente mit Mauszeiger-Hand ohne Funktion, keine leeren Links, keine Buttons ohne Namen. 1 Tippziel unter 24 px auf der Startseite, 2 auf den Referenzen (Pfeil-Symbole neben Textlinks; der Text daneben ist das eigentliche Ziel).
- **Beleg.** `klickverdacht` je Seite.
- **Maßnahme.** Keine. "Adresse kopieren" bei Gelegenheit einmal am Handy prüfen.

### 6. Sichtbare Angaben · teilweise

- **Befund.** Kontakt: E-Mail und "Antwort in der Regel innerhalb eines Werktags" auf Bildschirm 1, dazu Ort. Preis: nirgends eine Zahl; das Wort "kostet" auf Bildschirm 1 und "Stundensatz" auf der Referenz kleinkram, sonst nichts. Dauer: auf der Startseite nirgends, die vier Schritte unter "So läuft eine Anfrage ab" nennen keine Zeiten. Rückgabe: nicht anwendbar (Dienstleistung ohne Ware).
- **Beleg.** `angaben.preis` = "kosten (nur Wort)", `angaben.lieferung` = nicht gefunden, `angaben.kontakt` = "info@web-klartext.de", Bildschirm 1.
- **Maßnahme.** Unter "Leistungen" je Leistung eine Zeile "ab … €, … Wochen" oder "Stundensatz … €, typisch … Stunden". In "So läuft eine Anfrage ab" je Schritt eine Dauer ("Erstes Gespräch: 30 Minuten, innerhalb einer Woche"). Voraussetzung: Stundensatz in `kontext/leistungen.md`; das ist derselbe offene Faden, der auch das Shopify-Angebot blockiert.

### 7. Belege · teilweise

- **Befund.** Was da ist: jede Referenz mit Art ("Kundenprojekt", "Eigenes Produkt"), Monat und ehrlichem Stand ("In Abnahme"), auf kleinkram vier Screenshots mit sprechenden Alt-Texten, im Abschnitt "Über Klartext" der Name, das Studium und ein LinkedIn-Link. Was fehlt: kein einziges Bild auf der Startseite, kein Portrait, keine Kundenstimme, keine Zahl mit Einheit ("seit", "Projekte", "Kunden").
- **Beleg.** `belege.bilder` = 0 auf der Startseite, `personenwoerter` = 0, `zahlenMitEinheit` = leer, `datumsangaben` = 6; `start-handy-voll.png`.
- **Maßnahme.** Portrait in "Über Klartext" (im Vault als offen vermerkt). Je Referenz auf der Startseite ein Bild aus `docs/vorschau/`. Sobald PointCare live ist, ein Satz des Kunden mit Vorname, Firma und Monat unter der Referenz. Eine Zeile "Stand September 2026: fünf Arbeiten, zwei Kundenprojekte".

### 8. Nichts verdeckt den Einstieg · erfüllt

- **Befund.** Keine Overlays über 20 % des Bildschirms, keine Dialoge, kein Cookie-Banner (die Seite setzt keine Cookies), kein Autoplay-Video.
- **Beleg.** `overlays` = leer, `dialoge` = leer, `videos` = leer.
- **Maßnahme.** Keine.

### 9. Bewegung · erfüllt

- **Befund.** 38 Elemente mit Übergängen auf der Startseite, längster 200 ms, keiner über 300 ms. Kein Textblock beim Laden unsichtbar, nichts wartet auf Scrollen.
- **Beleg.** `bewegung.maxDauerMs` = 200, `ueber300ms` = 0, `scrollTexte` = 0.
- **Maßnahme.** Keine.

### 10. Personalisierung und Fremdes · erfüllt

- **Befund.** Keine fremden Hosts vor oder nach dem Laden, Schriften selbst gehostet, kein Chat-Widget, kein Tracking, keine Anpassung nach Standort oder Verhalten.
- **Beleg.** `netz.drittanbieter` = leer auf allen vier Seiten.
- **Maßnahme.** Keine. So lassen.

## Bilder

- `docs/pruefung/2026-09-24/start-handy-oben.png` – erster Bildschirm Handy
- `docs/pruefung/2026-09-24/start-desktop-oben.png` – erster Bildschirm Desktop
- `docs/pruefung/2026-09-24/start-handy-voll.png` – ganze Startseite Handy

## Grundlage

Zehn Punkte und Schwellen aus `.claude/skills/website-pruefen/references/kriterien.md`,
Herleitung im Vault: [[Bericht – Was Nutzer 2026 auf einer Website hält und weiterklicken lässt]].
