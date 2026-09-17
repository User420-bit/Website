---
target: Startseite
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Volumes/PortableSSD/ClaudeProjekte/Website/src/pages/index.astro"
target_fingerprint: "sha256:cb33683ac0ed13559f49880192aa537d584ca574cf6740afcf9b19ed240a438c"
target_path: /Volumes/PortableSSD/ClaudeProjekte/Website/src/pages/index.astro
timestamp: 2026-09-16T11-49-59Z
slug: src-pages-index-astro
---
Method: dual-agent (A: Design-Review-Subagent · B: Detektor-Subagent)

# Critique: Startseite (`src/pages/index.astro`)

## Design Health Score

| # | Heuristik | Score | Kernproblem |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | „Arbeitsweise“ und „Werkzeuge“ (etwa 26 % der Seitenhöhe) haben keinen Navigationseintrag; dort ist nichts markiert. „Anfrage schreiben“ sagt nicht, dass sich ein Mailprogramm öffnet. |
| 2 | Übereinstimmung mit der realen Welt | 2 | Hero verspricht „ohne Fachchinesisch“, danach „Rate-Limiting“, „Drizzle, Prisma, SQLAlchemy und Alembic“, „Push-your-luck-Mining-Roguelite“. „Insellösungen“ klingt im Betriebsalltag negativ. |
| 3 | Kontrolle und Freiheit | 3 | Nirgends gefangen (Sticky-Navigation, Skip-Link, „← Alle Arbeiten“); Projektseiten enden ohne nächsten Schritt. |
| 4 | Konsistenz und Standards | 2 | Visuell einheitlich, textlich widersprüchlich: „Drei Arten von Software“ gegenüber vier anders benannten Gruppen; „Seit März 2026 … neueste zuerst“ über Karten von Dezember 2025 in anderer Reihenfolge. |
| 5 | Fehlervermeidung | 2 | Einzige Konversion ist `mailto:` ohne Betreff und ohne sichtbare Adresse im Hero; Webmail am PC klickt ins Leere. |
| 6 | Wiedererkennen statt Erinnern | 3 | Alles beschriftet; Beleg-Links nennen Projekte (MemoryTree, Feynman), bevor sie vorgestellt werden. |
| 7 | Flexibilität und Effizienz | n/a | Persuade-Seite ohne wiederkehrende Aufgaben. |
| 8 | Ästhetik und Minimalismus | 2 | Optisch ruhig, inhaltlich überladen: 16 Detailpunkte, 11 gleichrangige Karten, 26 Werkzeug-Einträge. |
| 9 | Fehler erkennen und beheben | 2 | Scheitert `mailto:` im Hero, gibt es keinen Ausweg; die Adresse steht erst etwa 5.800 px (Desktop) bzw. 11.100 px (mobil) tiefer. |
| 10 | Hilfe und Dokumentation | n/a | Keine Bedienung, die Hilfe braucht; das fehlende „Was passiert nach der Anfrage?“ steht unter Priority Issues. |
| **Gesamt** | | **19/32 (59 %)** | **Acceptable** |

**Kognitive Last: hoch.** 4 von 8 Checklistenpunkten verfehlt (Single focus, Chunking, Minimal choices, Progressive disclosure). Entscheidungspunkte mit mehr als 4 Optionen: 11 Projektkarten ohne Empfehlung; „Im Einzelnen“ mit 16 Punkten und 20 Beleg-Links (20 Tab-Stopps vor der ersten Projektkarte).

## Design Specificity Verdict

**LLM-Bewertung:** Sauber, ruhig und stimmig, im Aufbau aber das übliche Entwickler-Portfolio: Eyebrow über großem Claim, grauer Intro, zwei Buttons, danach gleichförmig Überschrift, grauer Intro und Kartenraster, dazu Pillen-Badges, Monospace-Chips, Skills-Sektion, Sticky-Header mit Unschärfe und Scroll-Einblenden. Mit anderem Text passt dasselbe Layout für einen Freelancer in Berlin. Wirklich eigen sind die Beleg-Zeilen, die ehrliche Trennung von Kundenprojekt und Prototyp und die orangen Randnotizen. Das „Werkstattbuch“ bleibt Behauptung: Ehrliche Grenzen und „Erkenntnisse“, der eigentliche Unterschied, stehen nur auf Unterseiten; kein „Hier hat ein fertiges Werkzeug gereicht“; kein Bild echter Arbeit; die Person erst in Sektion 6; Rosenheim nur als graue Zeile.

**Deterministischer Scan: 0 Befunde.**
- CLI über `index.astro`, 9 Komponenten, 2 Layouts: Erster Lauf Exit 1, weil die macOS-Dateien `._*` auf der SSD kein gültiges UTF-8 sind (`stream did not contain valid UTF-8`). Mit expliziter Dateiliste Exit 0 und `[]`, auch mit `--no-config`. Eine Gegenprobe mit Testdatei erkannte Anti-Patterns korrekt.
- Browser: `detect.js` sechsmal eingespielt (Desktop 1280 px und mobil 375 px, hell und dunkel), jedes Mal „No anti-patterns found.“
- False Positive: 33× `low-contrast` auf den Projektkarten, nur direkt nach einem Wechsel des Farbmodus ohne Neuladen (Karte noch im `transition-colors`). Nach dem Übergang und frisch geladen 0.
- Lücke: 4 Elemente am Anfang von `#leistungen` nicht auswertbar, weil `.reveal` sie beim Scan halbtransparent hielt; rechnerisch etwa 8:1, unkritisch.

**Übereinstimmung:** Beide bestätigen eine handwerklich saubere Oberfläche: keine generischen KI-Muster, Kontraste mindestens 5:1, sichtbarer Fokus auf allen 43 Tab-Stopps. Der Detektor prüft Oberflächenmuster, nicht Struktur und Text. Die Hauptprobleme sieht er nicht; sein sauberes Ergebnis widerlegt die Specificity-Kritik nicht.

**Visuelle Overlays:** Einspielung erfolgreich, aber ohne Befunde zeichnet der Detektor keine Markierungen. Der `[Human]`-Tab zeigt nur die Konsolenmeldung.

## Overall Impression

Technisch und visuell solide, ehrlich im Detail, aber gebaut für jemanden, der Entwickler prüft, nicht für eine Betriebsinhaberin, die Hilfe sucht. Die richtige Stimme existiert schon (Hero-Intro, drei Leistungskarten, „Wenn Excel nicht mehr reicht, aber eine große Suite zu viel ist.“), wird ab „Im Einzelnen“ aber von Technik zugedeckt. Größte Chance: die Startseite auf die Kundenfrage zuschneiden und zeigen, was Klartext unterscheidet (Belege, Grenzen, Erkenntnisse), statt es zu behaupten.

## What's Working

1. **Beleg-Zeilen** (`index.astro:90–105`): Jeder Leistungspunkt verweist auf ein benanntes Projekt. Einziges wirklich eigenes Muster, belegt statt behauptet und der natürliche Weg in die Referenzen.
2. **Barrierearme, ehrliche Technik:** Alle gemessenen Texte mindestens 5:1 in hell und dunkel, logische Fokusreihenfolge ab dem Skip-Link, Einblenden versteckt nie Inhalt, keine Drittanbieter-Ressourcen. Der Detektor bestätigt 0 Anti-Patterns.
3. **Die Stimme ist da:** „eine Bestandsliste, ein Kalender, ein Export, der bisher von Hand lief“ und „Was geht, was nicht geht und was es kostet – vor dem Projekt, nicht danach.“ treffen die Zielgruppe genau.

## Priority Issues

**[P1] Fachchinesisch bricht das eigene Versprechen**
- **What:** `leistungen.json` („Deployment mit automatischem Deploy“, „Mandantenfähige Web-Apps … Rate-Limiting und Security-Härtung“, „Drizzle, Prisma, SQLAlchemy und Alembic“, „Ollama und Flask … Grounding-Prüfungen“); Karten-Zusammenfassungen („Push-your-luck-Mining-Roguelite“, „CLI-Anwendung mit Domain-Driven Design“); Monospace-Chips auf jeder Karte; „Aus den Commit-Historien ablesbar“. „Inhalte pflegbar über Markdown-Dateien statt Admin-Panel“ liest eine Laiin als „Ich kann nichts selbst ändern“.
- **Why it matters:** Der Name ist das Versprechen. Wer „ohne Fachchinesisch“ liest und dann „Alembic“ sieht, glaubt dem Rest weniger.
- **Fix:** Jeden Punkt als Ergebnis für den Betrieb formulieren, Technologienamen auf die Projektseiten verschieben; Chips auf den Startseiten-Karten durch „Für wen, mit welchem Ergebnis“ ersetzen; „Insellösungen“ umbenennen; festlegen, wer bei Kunden Inhalte pflegt, und das aus Kundensicht sagen.
- **Suggested command:** `/impeccable clarify`

**[P1] Reihenfolge und Menge dienen Entwicklern und Arbeitgebern, nicht Kunden**
- **What:** Mobil ist die Seite 11.910 px lang: „Im Einzelnen“ 2.380 px, Arbeitsweise 1.132 px, Werkzeuge 2.248 px. Arbeitsweise und Werkzeuge stehen zwischen Belegen und Kontakt. Die erste Referenz ist ein Spiel (TIEFGANG); die Kundenprojekte stehen auf Platz 2 und 5.
- **Why it matters:** Die Kundin muss durch das tiefste Tal, bevor Person und Kontakt kommen. PRODUCT.md sagt: Kunden zuerst.
- **Fix:** Hero, 3 Leistungen, Kundenprojekte zuerst (höchstens 6 Karten plus „Alle 11 Arbeiten“), Werte, Über, Kontakt. „Im Einzelnen“ als `<details>` (kein JavaScript nötig). „Werkzeuge“ hinter den Kontakt oder auf eine eigene Seite.
- **Suggested command:** `/impeccable distill`

**[P1] Der Kontaktmoment beruhigt nicht und ist fragil**
- **What:** Das Kontakt-Intro mischt Kunden- und Werkstudentenanfragen (`contact.json:4`). Der Button ist die nackte Adresse, ohne Wort zu Ablauf, Kosten des Erstgesprächs oder Inhalt der Mail. Zwischen den beiden Anfrage-Buttons liegen mobil etwa 11.100 px; Projektseiten enden ohne Anfrage. `mailto:` ohne Betreff und ohne Ausweichweg.
- **Adresse:** `company.json` und `profile.json` nennen seit 13:14 `info@web-klartext.de`. Der laufende Dev-Server liefert noch `studsandph@gmail.com` (veralteter Inhaltsstand), PRODUCT.md ebenso. Ist das Postfach unter der Domain beim Livegang nicht eingerichtet, gehen alle Anfragen verloren; dann P0.
- **Why it matters:** Einer unbekannten Ein-Personen-Firma zu schreiben ist der riskanteste Moment; dort hängt die einzige Konversion.
- **Fix:** Button „E-Mail schreiben“ plus Adresse als markierbarer Text; `mailto:` mit Betreff; 2 bis 3 Sätze zum Ablauf, nur mit bestätigten Zusagen; Werkstudenten-Satz aus dem Kontakt-Intro, LinkedIn hinein; ruhige Anfrage-Zeile nach „Arbeiten“ und am Ende jeder Projektseite; Zustellung an `info@web-klartext.de` vor dem Deploy testen.
- **Suggested command:** `/impeccable harden`

**[P2] Belege ohne Anschauung**
- **What:** Kein einziges Bild auf der Seite. Die einzige Kunden-Website (PointCare) ist auch auf ihrer Referenzseite reiner Text („Der Live-Link folgt nach dem Launch“). Der einzige öffentlich prüfbare Beleg, TIEFGANG, hat seinen Live-Link nur auf der Unterseite.
- **Why it matters:** Laien beurteilen Qualität durch Sehen und Ausprobieren, nicht über den Tech-Stack.
- **Fix:** Statuszeile („Live“, „In Abnahme“) statt Chips; „Live ansehen“ direkt auf Karten mit Live-Link; Bildplatz, der erst mit echten Screenshots erscheint (Schema hat `screenshots` schon); stärkste Erkenntnis als eine Zeile auf die Karte.
- **Suggested command:** `/impeccable layout`

**[P2] Kleine Widersprüche untergraben „Belege statt Behauptungen“**
- **What:** „Seit März 2026 … neueste zuerst“ (`index.astro:119`) über drei Karten von Dezember 2025 und nicht passender Reihenfolge; „Hinter jedem Punkt steht das Projekt, das ihn belegt“, aber „Statische Websites mit Astro“ hat keinen Beleg; `about.md` sagt „nicht als Badge auf jeder Karte“, die Sonor- und Availably-Zusammenfassungen tragen trotzdem „AI-unterstützt“; „in der Arbeitsweise unten“, obwohl die Sektion weiter oben steht; KI und AI gemischt, ein einzelnes „bei dir“; Sätze an einen unsichtbaren Prüfer („nichts liegt hinter einem Tab“, „Ohne Prozentbalken und Sterne“).
- **Why it matters:** Wer Genauigkeit verkauft, darf keine nachprüfbar falschen Sätze haben.
- **Fix:** Intro oder Sortierung korrigieren; unbelegten Punkt streichen oder belegen; AI-Vermerke aus den Zusammenfassungen; „unten“ in „oben“; eine Schreibweise und eine Anrede; Prüfer-Sätze streichen.
- **Suggested command:** `/impeccable polish`

## Persona Red Flags

**Jordan (beauftragt zum ersten Mal Software):** „Insellösungen“ unklar oder abschreckend. Weiß bei „Anfrage schreiben“ nicht, dass ein Mailprogramm aufgeht, was hineingehört und ob es kostet. Versteht „Im Einzelnen“ und Chips wie „Drizzle ORM“ nicht. Findet keine Arbeitsprobe zum Anschauen und bricht wahrscheinlich in „Im Einzelnen“ oder „Werkzeuge“ ab.

**Riley (sucht Widersprüche):** Datum und Sortierung gegen das Intro; „Drei Arten“ gegen vier Gruppen; Beleg-Versprechen gegen den unbelegten Punkt; AI-Badge-Aussage gegen zwei AI-Vermerke; „13 Repositories“ gegen 11 Karten; die Adresse in den Quelldateien ist nicht die auf der ausgelieferten Seite; in zwei Sektionen kein aktiver Navigationspunkt; die Hauptreferenz PointCare ist laut eigener Seite unfertig.

**Casey (mobil, einhändig, 375 × 812):** Die Seite ist 11.910 px lang, zwischen den Anfrage-Buttons liegen etwa 11.100 px. Der Sticky-Header nimmt 85 px ein (10,5 % der Höhe), hat nur kleine Textlinks oben und keinen Anfrage-Button. Die Beleg-Links sind 14 px hoch und stehen dicht („TIEFGANG, MemoryTree“); Fehltipps sind wahrscheinlich.

**Projekt-Persona: Inhaberin eines kleinen Betriebs bei Rosenheim** (aus PRODUCT.md: nicht technisch, am Handy, will einen erreichbaren Ansprechpartner): Kein Einstieg über ihr eigenes Problem; sie muss selbst wissen, ob sie „Insellösung“, „Web-App“ oder „Website“ braucht. „Inhalt ändern heißt: eine Datei bearbeiten“ bedeutet für sie „Ich kann nichts selbst ändern“; wer pflegt, steht nirgends. Die Person erscheint erst in Sektion 6, als Student, ohne Foto, „offen für eine Werkstudentenstelle“; das weckt Zweifel an Dauer und Wartung, und zur Betreuung nach der Abgabe gibt es kein Wort. Kein regionaler Bezug in den Referenzen. Am Büro-PC mit Webmail öffnet der Button nichts Brauchbares; keine Telefonnummer.

## Minor Observations

- Die Versalzeile „KLARTEXT · ROSENHEIM, BAYERN“ wiederholt die Wortmarke direkt darüber; der Platz könnte die Zielgruppe nennen.
- Das Arbeiten-Raster endet mit den schwächsten Karten (Sonor, Availably, wawi-mvp).
- „Wie gearbeitet wird“: 5 Punkte in 2 Spalten; „Datenschutz standardmäßig“ steht am Desktop allein.
- Der LinkedIn-Link bricht am Desktop um („Profil auf / LinkedIn“) und fehlt im Kontaktblock.
- Heller Modus: Rand des Sekundärbuttons 1,36:1, Kartenrand 1,39:1. Kein WCAG-Verstoß, der Sekundärbutton wirkt aber fast wie Text.
- „Erkenntnisse" wird mit englischem Schlusszeichen ausgegeben (gerades `"` in `about.md:31`). Das Arbeiten-Intro nutzt einen Geviertstrich „ — “, sonst Halbgeviertstriche.
- Die `._*`-Dateien auf der SSD stören auch `impeccable detect`, nicht nur Git; `dot_clean` behebt beides.
- Der Dev-Server zeigt veralteten Inhalt; nach einem Neustart stimmt die Vorschau.
- PRODUCT.md nennt noch `studsandph@gmail.com` (nicht angepasst).

## Questions to Consider

- Braucht die Startseite überhaupt Technologienamen, wenn jede Projektseite sie zeigt?
- Was wäre, wenn die Startseite nach vorn holt, was kein Mitbewerber zeigt: die Erkenntnisse und ein echtes „Hier hat ein fertiges Werkzeug gereicht“?
- Ist eine unsichtbare Person bei einem Ein-Personen-Betrieb Vertrauensgewinn oder -verlust? Passen „Softwareunternehmen“ und „offen für eine Werkstudentenstelle“ auf dieselbe Seite?
- Sollte ein Mining-Roguelite die erste Referenz sein, die eine Betriebsinhaberin sieht?
- Was muss jemand nach dem Klick auf „Anfrage schreiben“ wissen, um nicht zu zögern, und was davon kann der Inhaber ehrlich zusagen?
