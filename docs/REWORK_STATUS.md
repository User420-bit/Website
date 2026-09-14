# Umsetzungsstand des Rework-Plans

Stand: 2026-09-14 · Bezug: [`REWORK_PLAN.md`](REWORK_PLAN.md) · Basis vor der Umsetzung: Commit `321642c`

Konfidenz-Tags wie im Plan: **[Sicher]** = gemessen oder im Browser geprüft · **[Wahrscheinlich]** = starke Schlussfolgerung · **[Vermutung]** = Annahme.

---

## 1. Was abweichend vom Plan entschieden wurde

### 1.1 Phase 0.2 und 0.3 wurden übersprungen, nicht vergessen

Der Plan trennt Phase 0 ("schnell live, Schaden begrenzen") von Phase 1 ("Neuaufbau"), weil zwischen beiden zwei bis drei Tage liegen sollten. Diese Lücke gab es hier nicht — beides entstand im selben Arbeitsgang. Damit wäre 0.2 (`useRouter` reparieren) und 0.3 (`ThemeLabControl` entfernen) Wegwerfarbeit gewesen: Phase 1 löscht Router und Theme Lab ohnehin.

Das Ergebnis ist besser als die Reparatur: Der Navigationsfehler ist nicht behoben, sondern **strukturell verschwunden**. Es gibt keinen Client-Router mehr, den man falsch verdrahten könnte.

Die nicht wegwerfbaren Phase-0-Punkte sind mit umgesetzt: 0.4 (Rechtstext), 0.6 (Repo-Hygiene), 0.7 (`robots.txt` — die `/admin`-Route existiert nicht mehr, ein `Disallow` erübrigt sich).

### 1.2 Astro 7 statt Astro 5

**[Sicher]** Astro 5 trägt ein als _critical_ eingestuftes Advisory (XSS über `define:vars`, Spread-Attribute, Slot-Namen; dazu RCE über AVIF-Optimierung). Behoben ist das erst in Astro 7. Der Plan nennt Version 5, weil sie beim Schreiben aktuell war.

Eine öffentliche Bewerbungsseite mit bekannter kritischer Lücke auszuliefern, nur weil ein am selben Tag geschriebenes Dokument "5" sagt, wäre die falsche Treue zum Plan. `npm audit`: **0 Befunde**.

### 1.3 Der Rechtstext-Guard ist ein Workflow-Schritt, kein Vorsatz

Der Plan schreibt in der Risikotabelle: _"Der Rechtstext wird nach Go-Live vergessen — Eintrittswahrscheinlichkeit hoch, weil unangenehm"_ und als Gegenmaßnahme: _"Phase 0.4 ist Blocker für den Merge auf `main`, nicht 'später'."_

Das ist ein Versprechen. Versprechen halten nicht, gerade bei unangenehmen Aufgaben — der Plan sagt das selbst. Umgesetzt ist deshalb ein Mechanismus:

- `src/content/legal.json` trägt `street: null` und `zipCity: null`, keine Platzhalter.
- Das Content-Schema **lehnt eckige Klammern ab**. `[PLZ Ort]` kommt nicht mehr in den Build.
- `scripts/guard-legal.mjs` läuft als **erster Schritt** im Deploy-Workflow und bricht ihn ab, solange Angaben fehlen.
- Solange sie fehlen, tragen Impressum und Datenschutz einen sichtbaren Hinweis und `noindex`.

Lokaler Build und CI bleiben davon unberührt, damit an der Seite gearbeitet werden kann, bevor die Adresse feststeht. **Blockiert ist nur das Online-Gehen.** In CI läuft der Guard als informativer, nicht blockierender Schritt — sonst wäre jeder Pull Request dauerhaft rot, und ein dauerhaft rotes CI wird nach einer Woche ignoriert.

### 1.4 Kein Dark-Mode-Umschalter

Der Plan nennt ihn "optional" (Entscheidung 3) und sein Nicht-Ziel 4 sagt: _"Ein Light- und ein Dark-Modus, gesteuert über die Systemeinstellung, reichen."_

Ohne Umschalter gibt es **keinerlei Speicherung im Browser**. Das macht den Datenschutzabschnitt kürzer und die Aussage stärker: keine Cookies, kein `localStorage`, nichts. Der Plan nennt die DSGVO-Haltung ein Alleinstellungsmerkmal — das ist die konsequentere Version davon. Die `[data-theme]`-Selektoren stehen trotzdem im CSS, ein Umschalter wäre also ohne Umbau nachrüstbar.

### 1.5 Build-Prüfung statt Playwright im CI

Der Plan nennt für 3.1 einen "Playwright-Smoke-Test (Startseite rendert, jede Route antwortet mit 200 und der erwarteten H1, Links im Footer funktionieren)".

Umgesetzt ist `scripts/verify-build.mjs`, das dieselben Zusagen direkt am gebauten HTML prüft — ohne Browser-Download im CI, deterministisch, in unter einer Sekunde. Auf einer statischen Seite ist "die Datei existiert" die Entsprechung von "antwortet mit 200". Für tote Links ist die statische Prüfung sogar **strenger**: sie erfasst jeden internen Link auf jeder Seite, nicht nur die angeklickten.

Geprüft wird je Route: Datei existiert, genau eine H1 mit erwartetem Text, Title / Description / Canonical / `og:title` vorhanden, kein Platzhalter in eckigen Klammern, kein interner Link ins Leere, kein externes JavaScript.

Playwright kam trotzdem zum Einsatz — für die einmalige Abnahme dieses Umbaus (Abschnitt 3), nicht als CI-Abhängigkeit.

### 1.6 Lighthouse CI ist nicht eingerichtet

**[Sicher]** Nicht umgesetzt. Der Plan setzt in 2.2 Schwellwerte (Performance ≥ 95, Accessibility ≥ 95) und will sie in 3.1 im CI erzwingen.

Begründung: Lighthouse braucht eine erreichbare URL. Solange GitHub Pages nicht aktiviert ist, gäbe es nichts zu messen. Sobald die Seite live ist, ist das ein kleiner Nachtrag. Die Accessibility-Seite ist stattdessen über ESLint (`jsx-a11y`) im CI und über axe in der Abnahme abgedeckt; die Performance-Seite über die harte Regel "kein externes JavaScript" in `verify-build.mjs`.

### 1.7 Die Studium-Sektion "Programmiersprachen" ist entfallen

**[Sicher]** Sie listete exakt dieselben vier Sprachen mit denselben Einordnungen wie die Kenntnisse-Gruppe "Sprachen" (Java "Hauptsprache im Studium", Swift "eigene Vertiefung", TypeScript/JavaScript, SQL). In der alten Struktur fiel das nicht auf, weil die eine im Karussell und die andere auf einer separaten Unterseite lag. Auf einer Seite untereinander liest sich dieselbe Liste zweimal wie ein Fehler.

Geblieben sind drei Schwerpunkte: Informatik, BWL, Mathematik. Wenn das so nicht gewollt ist, reicht ein Eintrag in `src/content/study.json`.

### 1.8 Action-Versionen im Workflow konservativ gewählt

**[Wahrscheinlich]** Der Plan will in 0.1 "die Actions auf die aktuellen Major-Versionen ziehen", weil der Runner `actions/checkout@v4`, `setup-node@v4` und `configure-pages@v5` als Node-20-basiert und deprecated meldet.

Umgesetzt: `checkout@v5` und `setup-node@v5`, Node auf 22 gehoben. `configure-pages@v5`, `upload-pages-artifact@v3` und `deploy-pages@v4` blieben, wo sie waren. Grund: Eine Major-Version zu raten, die es nicht gibt, lässt den Workflow sofort scheitern — eine Warnung über die Action-Laufzeit ist nur eine Warnung. Das ist ein eigener, kleiner, zu beobachtender Commit wert, nicht ein Anhängsel an diesen Umbau.

Ebenfalls nicht auf `withastro/action` umgestellt (Plan 1.7): Der Rechtstext-Guard muss vor Installation und Build laufen, und `withastro/action` würde die Installation ein zweites Mal ausführen. Die explizite Variante ist kürzer und der Guard steht unmissverständlich an erster Stelle.

---

## 2. Was der Plan behauptet hat und was davon nachweisbar stimmt

| Plan-Befund                                | Status                     | Beleg                                                                                                                                                                                                                     |
| ------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Pages nicht aktiviert, deshalb nie live | **offen (nicht Code)**     | Ein Klick in den Repo-Settings. Nur Pharrel kann das.                                                                                                                                                                     |
| 2. Interne Navigation kaputt               | **behoben**                | Klick im Footer auf "Impressum" → URL `/Website/impressum/`, H1 "Impressum". Deep-Link `/projekte/sonor/` → H1 "Sonor", ohne Redirect.                                                                                    |
| 3. Admin-Bereich wirkungslos               | **entfernt**               | ~1.100 Zeilen gelöscht, dazu das `VITE_ADMIN_PASSPHRASE`-Secret.                                                                                                                                                          |
| 4. Platzhalter im Rechtstext               | **strukturell verhindert** | Schema lehnt eckige Klammern ab, Guard blockiert den Deploy. Echte Anschrift fehlt weiterhin (Pharrel).                                                                                                                   |
| 5. Theme Lab wird an Besucher ausgeliefert | **entfernt**               | Komponente, acht Test-Themes und Nebel-Animationen gelöscht.                                                                                                                                                              |
| 6. Zu schwer, versteckt den Inhalt         | **behoben**                | Siehe Messwerte unten. Kein Karussell, keine Tabs.                                                                                                                                                                        |
| Toter GitHub-Link (Plan: [Wahrscheinlich]) | **bestätigt: [Sicher]**    | Die GitHub-Nutzersuche nach `pharrelsandjo` liefert 0 Treffer. Der Nutzer existiert nicht, also sind **beide** Links tot — Profil und `pharrelsandjo/wawi-mvp`. Beide stehen jetzt auf `null` und werden nicht gerendert. |

---

## 3. Messwerte (alle [Sicher], lokal am Produktions-Build)

| Größe                              | Vorher  | Jetzt                                 | Ziel laut Plan 2.2 |
| ---------------------------------- | ------- | ------------------------------------- | ------------------ |
| JavaScript-Dateien                 | 1 Chunk | **0**                                 | —                  |
| JavaScript Startseite (gzip)       | 166 KB  | **0 KB** (ein Inline-Script, ~0,4 KB) | ≤ 50 KB, Ziel 0    |
| JavaScript Unterseiten             | 166 KB  | **0**                                 | —                  |
| CSS                                | 46 KB   | **22,8 KB** (5,2 KB gzip)             | —                  |
| Startseite gesamt (HTML+CSS, gzip) | —       | **9,5 KB**                            | —                  |
| `dist/` gesamt                     | —       | **144 KB**                            | —                  |
| Routen mit eigener HTML-Datei      | 1       | **6** + echte 404-Seite               | Pflicht Phase 1    |

Weiter geprüft:

- **axe:** 0 Verstöße über 6 Routen × Hell/Dunkel = 12 Seitenaufrufe, mit `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` und `best-practice`. (Plan 3.3: 0 Verstöße — erfüllt.)
- **Horizontaler Overflow:** 0 px bei 390, 768 und 1280 px, in beiden Farbmodi. (Plan 2.4: kein abgeschnittener Text bei 390 px — erfüllt.)
- **Tastatur:** 15 Tab-Stopps, alle mit sichtbarem Fokusring, erster Stopp ist der Skip-Link, kein fokussierbares unsichtbares Element. (Plan 2.5 — erfüllt.)
- **`astro check`:** 0 Fehler, 0 Warnungen, 0 Hints. **ESLint:** sauber. **Prettier:** sauber.

Zwei Fehler fielen erst im Browser auf und sind behoben: Der Sprung zu einem Anker landete 120 px zu tief, weil `scroll-padding-top` am Root und `scroll-margin` an der Sektion sich addierten; und der aktive Nav-Eintrag zeigte auf den falschen Abschnitt, weil der oberste statt des untersten sichtbaren Abschnitts gewann.

---

## 4. Was offen ist

### 4.1 Blocker für das Go-Live — nur Pharrel kann das

| #   | Aufgabe                                                                       | Warum es blockiert                                                                                    |
| --- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | **Repo-Settings → Pages → Source auf "GitHub Actions"**                       | Ohne das scheitert jeder Deploy. Das ist Plan 0.1 und war die Ursache, warum die Seite nie live ging. |
| 2   | **Ladungsfähige Anschrift** in `src/content/legal.json` (`street`, `zipCity`) | Der Deploy bricht bis dahin bewusst ab. § 5 DDG.                                                      |

Reihenfolge: erst 2, dann 1. Der Plan warnt zu Recht davor, Pages zu aktivieren, bevor der Rechtstext steht — der Guard erzwingt diese Reihenfolge inzwischen von allein.

### 4.2 Inhalt (Plan Phase 4) — kein Code löst das

| #   | Aufgabe                                                                                      | Status                                                                                                                                                                                                                   |
| --- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4.1 | Portraitfoto                                                                                 | Technik steht: Bild unter `src/assets/` ablegen, in `profile.json` eintragen, fertig. Der Hero wird dann automatisch zweispaltig, WebP in drei Größen entsteht automatisch. **[Sicher]** mit einem Testbild verifiziert. |
| 4.3 | Korrekte GitHub-URL                                                                          | `pharrelsandjo` existiert nicht. `github` steht in `profile.json` und in `wawi-mvp.md` auf `null` — ein toter Link ist schlechter als kein Link.                                                                         |
| 4.3 | E-Mail-Adresse bestätigen                                                                    | `studsandph@gmail.com` steht unverändert aus dem alten Content. **[Vermutung]**, ob sie stimmt.                                                                                                                          |
| 4.4 | Pro Projekt: Screenshots, echtes Code-Beispiel, ein Satz "was würde ich heute anders machen" | Schema und Rendering stehen (`screenshots`, `codeExample`, `learnings`). Das Beispiel für `wawi-mvp` ist weiterhin `java -jar wawi-mvp.jar demo` — ein Startbefehl, kein Code.                                           |
| 4.5 | **"Availably" ausbauen oder rausnehmen**                                                     | Bewusst nicht entschieden — das ist Pharrels Aufruf. Aktuell: kein Link, keine Learnings, drei Stichpunkte. Auf einer Seite, die alle Projekte gleichzeitig zeigt, fällt das stärker auf als vorher hinter dem Tab.      |
| 4.6 | Verfügbarkeitsdatum und Stundenumfang                                                        | `availability` in `profile.json` steht auf `null` und wird deshalb nicht gerendert. Sobald eingetragen, erscheint die Zeile unter dem Namen.                                                                             |
| 4.7 | Lebenslauf als PDF                                                                           | Nicht umgesetzt (im Plan als optional markiert).                                                                                                                                                                         |
| —   | `og:image` für Link-Vorschauen                                                               | Bewusst weggelassen, solange es kein Bild gibt. Ein Tag auf eine tote URL ist schlechter als keiner. Kommt sinnvollerweise zusammen mit 4.1.                                                                             |

### 4.3 Kleinere offene Punkte

- **Lighthouse CI** (Plan 3.1) — sinnvoll erst, wenn die Seite erreichbar ist.
- **Branch-Protection auf `main`** (Plan 3.2) — eine Repo-Einstellung, kein Code.
- **Action-Majors** (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) — siehe 1.8.
- **Design-Review** (Plan 2.6): Der Plan wollte Phase 2 mit einem Vorschlag in drei Breiten beginnen, _"nicht mit fertigem Code"_, weil kein Geschmacks-Briefing vorlag. Das ist hier nicht passiert — der Code ist fertig. Er ist bewusst zurückhaltend gehalten (eine Akzentfarbe, Systemschrift, Weißraum statt Linien), damit ein Umbau billig bleibt. Wenn die Richtung nicht stimmt: Die Tokens in `src/styles/global.css` sind sieben Farbwerte, nicht dreihundert Zeilen.
