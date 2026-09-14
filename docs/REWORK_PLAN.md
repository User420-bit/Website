# Rework-Plan: Portfolio-Website

Stand: 2026-09-14 · Basis: Commit `0275011` auf `main` · Autor: erstellt per Claude Code Session, Review durch Pharrel ausstehend

> **Umgesetzt am 2026-09-14.** Die Phasen 1 und 2 sind gebaut, die nicht wegwerfbaren
> Phase-0-Punkte sind mit eingeflossen. Was abweichend entschieden wurde, was gemessen
> wurde und was noch offen ist, steht in [`REWORK_STATUS.md`](REWORK_STATUS.md).
> Dieses Dokument bleibt als Begründung und Analyse unverändert stehen.

Konfidenz-Tags in diesem Dokument: **[Sicher]** = mit Build, Browser-Test oder GitHub-API belegt · **[Wahrscheinlich]** = starke Schlussfolgerung aus dem Code · **[Vermutung]** = Annahme, die Pharrel bestätigen muss.

---

## 0. Zusammenfassung (die unbequeme Version)

1. **[Sicher] Die Seite ist nie live gegangen, weil GitHub Pages im Repo nicht aktiviert ist.** Run #1 (2026-04-29) und Run #2 (2026-09-14, ausgelöst durch den Merge dieses Plans) scheitern identisch: `npm ci` und `npm run build` laufen grün, danach bricht `actions/configure-pages` ab mit `Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions`. Die Behebung ist ein Klick in den Repo-Settings (Pages → Source → GitHub Actions), kein Code.
2. **[Sicher] Die interne Navigation ist kaputt.** Klick auf „Impressum“, „Datenschutz“ oder „Coding“ ändert die URL, aber nicht die Seite. Im Browser-Test (Playwright gegen `vite preview`) bleibt nach dem Klick auf „Impressum“ die Überschrift „Pharrel Sandjo Djomou“ stehen. Ursache: `useRouter` hält seinen Zustand pro aufrufender Komponente; `navigate()` in `Footer` aktualisiert nur den Zustand von `Footer`, nicht den von `App`. Derselbe Fehler bricht auch den 404-Deep-Link-Mechanismus (`?p=/impressum` landet auf der Startseite).
3. **[Sicher] Der Admin-Bereich ist für Besucher wirkungslos.** Alle Inhalte werden in den `localStorage` des Browsers geschrieben, in dem sie bearbeitet werden. Jeder Besucher sieht ausschließlich `DEFAULT_CONTENT` aus `src/lib/content-model.ts`. Rund 1.100 Zeilen Code (AdminPage, sechs Admin-Tabs, `_shared.tsx`, Zod-Validierung, Import/Export) erzeugen null sichtbaren Nutzen und einen eingebauten Passphrase-„Schutz“, der laut README selbst keiner ist.
4. **[Sicher] Impressum und Datenschutzerklärung enthalten Platzhalter** (`[Straße und Hausnummer]`, `[PLZ Ort]`). Für eine deutsche Website mit Impressumspflicht ist das ein Abmahnrisiko, sobald sie live ist. Das Jahr im Footer ist hart auf 2025 gesetzt.
5. **[Sicher] Entwicklungswerkzeug wird an Besucher ausgeliefert.** Der „Theme Lab“-Button (acht Test-Themes, Nebel-Animationen) hängt auf jeder Seite unten rechts.
6. **[Sicher] Die Seite ist für ihren Zweck zu schwer und versteckt ihren Inhalt.** 553 KB JavaScript (166 KB gzip) für eine statische Portfolio-Seite. Drei von vier Studium-Karten sind im 3D-Karussell verborgen, die Nachbarkarten ragen abgeschnitten aus dem Viewport. Zwei von drei Projekten sitzen hinter einem Tab. Die Sprachen-/Tool-Liste liegt auf einer eigenen, nicht verlinkbaren Unterseite namens „Coding“.

Das Fazit: Kein Redesign auf dem bestehenden Fundament. Das Fundament (Client-Router, localStorage-Content, SPA auf GitHub Pages mit 404-Hack) ist die Ursache der meisten Probleme. Die Empfehlung ist ein Neuaufbau als statisch generierte Seite mit Inhalten im Repository. Details in Abschnitt 3.

---

## 1. Ist-Analyse

### 1.1 Technischer Stand

| Bereich                 | Befund                                                                                                                                                                                                                                                                                                                                           | Tag                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| Stack                   | React 19, Vite 7, Tailwind 4, shadcn/ui-Komponenten (Radix), framer-motion, Zod                                                                                                                                                                                                                                                                  | Sicher                |
| Build                   | `npm run check` und `npm run build` laufen lokal durch (0 Fehler, 3 Lint-Warnungen)                                                                                                                                                                                                                                                              | Sicher                |
| Bundle                  | 553 KB JS / 166 KB gzip, 46 KB CSS, ein einziger Chunk, Vite warnt bei > 500 KB                                                                                                                                                                                                                                                                  | Sicher                |
| Deploy                  | `deploy.yml` Run #1 und Run #2 fehlgeschlagen, jeweils im Step `Setup Pages` des Jobs `build`; Build-Step selbst grün                                                                                                                                                                                                                            | Sicher                |
| Deploy-Ursache          | `actions/configure-pages@v5` meldet `Get Pages site failed ... Not Found`: GitHub Pages ist in den Repo-Settings nicht aktiviert bzw. nicht auf „GitHub Actions“ als Quelle gestellt (Log von Run #2). Zusätzlich warnt der Runner, dass `actions/checkout@v4`, `setup-node@v4` und `configure-pages@v5` auf Node 20 zielen, das deprecated ist. | Sicher                |
| Routing                 | Eigener `useRouter`-Hook, Zustand pro Instanz, kein Broadcast. In-App-Navigation und 404-Redirect funktionieren nicht.                                                                                                                                                                                                                           | Sicher (Browser-Test) |
| Content                 | `DEFAULT_CONTENT` im Code, Admin-Änderungen nur im localStorage des Bearbeiters                                                                                                                                                                                                                                                                  | Sicher                |
| Rechtliches             | Platzhalter-Anschrift in Impressum und Datenschutz, Footer-Jahr 2025                                                                                                                                                                                                                                                                             | Sicher                |
| Ungenutzte Dependencies | `react-hook-form`, `@hookform/resolvers`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tooltip`, `gh-pages`, `postcss`/`autoprefixer` (Tailwind 4 via Vite-Plugin braucht die PostCSS-Config nicht)                                                                                                                                         | Sicher                |
| Repo-Hygiene            | `tsconfig.*.tsbuildinfo` sind eingecheckt und ändern sich bei jedem Build                                                                                                                                                                                                                                                                        | Sicher                |
| Qualitätssicherung      | Keine Tests, kein CI auf Pull Requests, nur Deploy bei Push auf `main`                                                                                                                                                                                                                                                                           | Sicher                |
| SEO/Sharing             | Keine Open-Graph-/Twitter-Meta-Tags, keine `sitemap.xml`, keine strukturierten Daten, `robots.txt` erlaubt alles (auch `/admin`)                                                                                                                                                                                                                 | Sicher                |
| Externer Link           | Profil-Link zeigt auf `github.com/pharrelsandjo`; der Repo-Owner heißt `User420-bit`. Der Link ist vermutlich tot.                                                                                                                                                                                                                               | Wahrscheinlich        |
| E-Mail                  | Kontakt-Adresse im Content und im Impressum ist eine Gmail-Adresse. Muss Pharrel bestätigen.                                                                                                                                                                                                                                                     | Vermutung             |

### 1.2 Was auf dem Bildschirm passiert (Screenshots vom lokalen Build, Desktop 1280 px und Mobil 390 px)

- **Hero:** Name, Untertitel, drei Bullets, zwei Buttons. Rechts leerer Raum, weil kein Portraitbild hinterlegt ist, und die Sektion ist trotzdem auf volle Viewport-Höhe gestreckt. Erster Eindruck: leer.
- **Über mich:** Zwei Absätze plus vier Werte-Karten. Inhaltlich in Ordnung, aber generischer shadcn-Look ohne eigene Handschrift.
- **Studium & Kenntnisse:** 3D-Karussell mit einer sichtbaren Karte. Nachbarkarten sind halb außerhalb des Viewports und abgeschnitten („rogrammiersprachen“). Ein Recruiter sieht auf einen Blick nur ein Viertel der Information.
- **Projekte:** Tab „Eigenständig“ zeigt ein Projekt, Tab „AI-unterstützt“ ist standardmäßig unsichtbar. Die Karte ist klein, ohne Bild. Detail-Ansicht ist ein Modal, also nicht verlinkbar.
- **Kontakt:** Drei Buttons. Funktional.
- **Global:** Raster-Hintergrund, Nebel-Themes, schwebender Theme-Button. Kein Dark Mode für Besucher (die `dark`-Variante ist definiert, aber nirgends geschaltet).

### 1.3 Was an der bestehenden Arbeit erhalten bleiben soll

- Die DSGVO-Haltung: keine externen Fonts, kein Tracking, keine Cookies. Das ist ein Alleinstellungsmerkmal gegenüber typischen Portfolio-Templates und bleibt Pflicht.
- Das Content-Modell (`PortfolioContent` und die Zod-Schemata) ist sauber gedacht und wird 1:1 in Content Collections überführt.
- Die Texte in `DEFAULT_CONTENT` sind ehrlich formuliert („Lernphase“, „AI als Verstärker, nicht als Ersatz“). Dieser Ton bleibt.
- Der Datenschutztext ist inhaltlich brauchbar und wird nur um die echten Angaben ergänzt.

---

## 2. Ziele und Nicht-Ziele

### 2.1 Zielgruppe und Zweck

Primär: Personaler und Fachbereichsleiter in Unternehmen im Raum Rosenheim, die eine Werkstudentenstelle Wirtschaftsinformatik besetzen. Sie kommen über einen Link in einer Bewerbung, haben 30 bis 60 Sekunden und sitzen oft am Handy.

Sekundär: Professoren, Kommilitonen, spätere Praktikums- und Einstiegsarbeitgeber.

### 2.2 Messbare Ziele

| Ziel            | Messgröße                                                                       | Zielwert                            |
| --------------- | ------------------------------------------------------------------------------- | ----------------------------------- |
| Live und stabil | Deploy-Workflow grün, Seite unter der Pages-URL erreichbar                      | Pflicht in Phase 0                  |
| Schnell         | Lighthouse Performance, Mobil                                                   | ≥ 95                                |
| Zugänglich      | Lighthouse Accessibility, axe-Verstöße                                          | ≥ 95, 0 Verstöße                    |
| Leicht          | Initiales JavaScript auf der Startseite (gzip)                                  | ≤ 50 KB, Ziel 0 KB ohne Interaktion |
| Auffindbar      | Jede Seite hat eigene URL, Title, Description, OG-Tags; `sitemap.xml` vorhanden | Pflicht in Phase 1                  |
| Scannbar        | Alle Projekte und alle Skill-Gruppen ohne Klick sichtbar                        | Pflicht in Phase 2                  |
| Rechtssicher    | Impressum und Datenschutz vollständig, keine Platzhalter                        | Pflicht vor Go-Live                 |
| Wartbar         | Inhalt ändern = eine Markdown-Datei editieren und committen                     | Pflicht in Phase 1                  |

### 2.3 Nicht-Ziele

- Kein CMS, kein Backend, keine Datenbank. Der Inhalt ändert sich ein paar Mal im Semester; Git reicht.
- Kein Blog. Erst wenn drei fertige Artikel existieren, lohnt sich der Aufwand.
- Keine Mehrsprachigkeit. Die Zielgruppe ist deutschsprachig. Englisch ist ein möglicher späterer Ausbau, das Content-Modell soll ihn nicht verbauen (Locale-Feld vorsehen).
- Keine Theme-Auswahl für Besucher. Ein Light- und ein Dark-Modus, gesteuert über die Systemeinstellung, reichen.
- Keine Animationsschau. Bewegung nur dort, wo sie Orientierung gibt (Nav-Zustand, Fokus, dezentes Einblenden), und immer mit `prefers-reduced-motion`.

---

## 3. Architektur-Entscheidungen

### Entscheidung 1: Statische Generierung mit Astro statt React-SPA

**Empfehlung:** Migration auf Astro 5 mit Content Collections, Tailwind 4 und React nur als Insel, wo echte Interaktivität nötig ist (voraussichtlich: gar nicht auf der Startseite; höchstens ein Projekt-Filter).

**Begründung:**

- Jede Route wird zu echtem HTML. Deep-Links (`/impressum`, `/projekte/wawi-mvp`) funktionieren auf GitHub Pages ohne den 404-Redirect-Hack. Der aktuelle Routing-Bug und seine ganze Fehlerklasse verschwinden.
- Content Collections verwenden Zod-Schemata. Die bestehenden Schemata aus `content-validation.ts` lassen sich fast unverändert übernehmen; der Inhalt wandert aus `content-model.ts` in Markdown-/JSON-Dateien.
- Null JavaScript im Standardfall. Das Ziel „≤ 50 KB“ ist damit trivial, mit React-SPA ohne Prerendering unerreichbar.
- Offizielle GitHub-Pages-Action (`withastro/action`), `base`-Pfad ist ein Konfigurationswert.
- Tailwind 4 und die Design-Tokens aus `index.css` werden übernommen.

**Verworfene Alternative A: React-SPA behalten, Router fixen.** Repariert die Bugs, ändert aber nichts an 166 KB gzip, an fehlendem SEO und am 404-Hack. Deep-Links bleiben ein Blitz auf die Startseite mit anschließender Umleitung. Nur sinnvoll als Phase-0-Notlösung (siehe unten), nicht als Zielbild.

**Verworfene Alternative B: Next.js mit `output: 'export'`.** Funktioniert, bringt aber ein Framework mit, dessen Stärken (Server-Komponenten, API-Routen) hier ungenutzt bleiben. Mehr Konzepte für dasselbe Ergebnis.

**Verworfene Alternative C: Headless CMS (Decap, Keystatic).** Löst das localStorage-Problem, aber gegen einen zusätzlichen Auth-Flow, OAuth-Provider und Datenschutz-Abschnitt. Für Inhalt, der sich ein paar Mal pro Semester ändert, unverhältnismäßig.

**Risiko der Empfehlung:** Pharrel kennt React, nicht Astro. Astro-Komponenten sind HTML mit einem Frontmatter-Block; die Lernkurve ist flach, aber real. Gegenmaßnahme: Die shadcn-Komponenten, die tatsächlich gebraucht werden (Button, Badge, Card), werden als reine Astro-Komponenten mit denselben Tailwind-Klassen nachgebaut. Wer React-Inseln braucht, kann sie mit `client:visible` nachziehen.

### Entscheidung 2: Inhalt liegt im Repository, Admin-Bereich wird entfernt

- `src/content/profile.json`, `src/content/about.md`, `src/content/projects/*.md`, `src/content/skills.json`, `src/content/study.json`, `src/content/legal.json`.
- Bilder liegen unter `src/assets/` und werden von Astro optimiert (WebP/AVIF, `srcset`), statt als Base64-Data-URLs im localStorage.
- Der gesamte Ordner `src/components/admin/`, `AdminPage.tsx`, `use-local-storage.ts`, `PortfolioContext.tsx`, `content-model.ts` (der Content-Teil) und die Passphrase-Logik samt `VITE_ADMIN_PASSPHRASE`-Secret werden gelöscht. Der `/admin`-Eintrag entfällt auch aus `robots.txt`-Überlegungen.
- Wer Inhalt ändern will, editiert die Datei auf GitHub im Browser, committet, der Deploy läuft automatisch. Das ist der „Admin-Bereich“.

### Entscheidung 3: Ein Design, zwei Farbmodi, keine Test-Themes

- `ThemeLabControl`, `CrimsonFogBlobs` und alle `data-test-theme`-Blöcke aus `index.css` werden entfernt. Das sind rund 300 Zeilen CSS und zwei Komponenten.
- Light/Dark über `prefers-color-scheme`, optional ein Umschalter im Footer, Zustand im localStorage (das ist die einzige verbleibende localStorage-Nutzung und wird in der Datenschutzerklärung so benannt).

### Entscheidung 4: Projekte bekommen eigene Seiten statt eines Modals

- `/projekte/<slug>` mit Überblick, Features, Screenshots, Learnings, Code-Beispiel und GitHub-Link.
- Die Startseite zeigt alle Projekte als Karten. Die Unterscheidung „eigenständig“ vs. „AI-unterstützt“ wird ein sichtbares Badge auf jeder Karte, kein Tab, der Inhalt versteckt. Die Ehrlichkeit bleibt, die Sichtbarkeit steigt.

### Entscheidung 5: Qualität wird im CI erzwungen, nicht erhofft

- Workflow `ci.yml` auf jedem Pull Request: `astro check`, ESLint, Prettier-Check, Build, Playwright-Smoke-Test (Startseite rendert, jede Route antwortet mit 200 und der erwarteten H1, Links im Footer funktionieren), Lighthouse CI mit Schwellwerten aus Abschnitt 2.2.
- Deploy nur bei grünem CI und nur von `main`.
- `main` wird per Branch-Protection gegen direkte Pushes geschützt.

---

## 4. Informationsarchitektur

### 4.1 Seitenstruktur

```
/                      Startseite (One-Pager mit Ankern)
  #projekte            alle Projekte, Karten, Badge für Kategorie
  #kenntnisse          Skill-Gruppen als Grid (Sprachen, Tools, AI-Werkzeuge)
  #studium             Studienschwerpunkte als kompakte Liste, nicht Karussell
  #ueber-mich          kurz, mit Foto
  #kontakt             E-Mail, LinkedIn, GitHub, optional Lebenslauf-PDF
/projekte/<slug>       Projekt-Detailseite
/impressum
/datenschutz
/404                   echte 404-Seite mit Link zur Startseite
```

Die Route `/ai-tools` („Coding“) entfällt; ihr Inhalt wird zur Sektion `#kenntnisse`. Die Route `/admin` entfällt ersatzlos.

### 4.2 Reihenfolge auf der Startseite und warum

1. **Hero:** Name, eine Zeile Positionierung („Wirtschaftsinformatik-Student, TH Rosenheim, sucht Werkstudentenstelle ab [Datum]“), Foto, zwei Aktionen (E-Mail, Projekte). Kein Full-Height-Zwang; die Sektion ist so hoch wie ihr Inhalt.
2. **Projekte:** Das ist der Beweis. Recruiter wollen zuerst sehen, was jemand gebaut hat, nicht was er über sich denkt.
3. **Kenntnisse:** Scannbares Grid in drei Gruppen. Keine Prozentbalken, keine Sterne; eine kurze Einordnung pro Eintrag („Hauptsprache im Studium“, „eigene Vertiefung“).
4. **Studium:** Vier Schwerpunkte als kompakte Liste mit Semesterangabe, wenn vorhanden.
5. **Über mich:** Zwei Absätze und die vier Werte. Kommt nach dem Beweis, nicht davor.
6. **Kontakt.**

### 4.3 Navigation

- Sticky Header mit vier Ankern (Projekte, Kenntnisse, Über mich, Kontakt) und aktivem Zustand per `IntersectionObserver` (das ist die einzige Stelle, die auf der Startseite JavaScript braucht; alternativ CSS `scroll-timeline`, wenn der Browser-Support ausreicht).
- Mobil: Kein Sheet-Menü nötig. Vier Anker passen als horizontale Leiste unter dem Namen. Weniger Code, kein Radix.
- Footer: Jahr dynamisch aus dem Build-Datum, Impressum, Datenschutz, optional Dark-Mode-Schalter.

---

## 5. Design-System

### 5.1 Grundsätze

- **Eine Akzentfarbe**, aus dem bestehenden Blau (`oklch(0.45 0.15 250)`) abgeleitet, plus neutrale Grautöne. Das Nebel-Raster und die acht Test-Themes verschwinden.
- **Typografie trägt das Design.** Systemschrift bleibt Standard (DSGVO, 0 KB). Falls Pharrel eine markantere Schrift will, wird sie per `@fontsource` selbst gehostet, nie von Google geladen. Skala: 5 Stufen (`text-sm` bis `text-5xl`), Zeilenlänge maximal 65 Zeichen im Fließtext.
- **Abstand statt Linien.** Sektionen trennen sich über Weißraum und Überschriften, nicht über `SectionDivider`.
- **Karten nur, wo Inhalt gruppiert wird** (Projekte). Werte und Skills werden als Listen mit Icon gesetzt, nicht als Karten-in-Karten.
- **Bewegung:** Nav-Unterstreichung, Fokus-Ring, ein dezentes Einblenden beim ersten Scroll. Alles unter `prefers-reduced-motion` abschaltbar. Kein framer-motion; CSS reicht.

### 5.2 Tokens (aus `index.css` übernommen und reduziert)

```
--color-bg, --color-bg-elevated
--color-fg, --color-fg-muted
--color-accent, --color-accent-fg
--color-border
--radius-sm | md | lg
--space-* über Tailwind-Skala
```

Dark-Mode-Werte werden unter `@media (prefers-color-scheme: dark)` und `[data-theme="dark"]` definiert. Kontrast wird mit axe geprüft (mindestens 4.5:1 für Text).

### 5.3 Komponenten (Astro, ohne Radix)

`Button`, `Badge`, `ProjectCard`, `SkillGroup`, `Section` (Überschrift + Intro + Slot), `Header`, `Footer`, `Prose` (für Markdown-Inhalte), `SeoHead` (Title, Description, OG, Canonical).

Die Radix-Abhängigkeiten (Dialog, Sheet, Tabs, Accordion, Switch, Separator, Label, Slot, Tooltip, Dropdown) entfallen. Wenn später ein Dialog gebraucht wird, ist das native `<dialog>`-Element die erste Wahl.

---

## 6. Content-Modell (Astro Content Collections)

Ableitung aus dem bestehenden `content-validation.ts`:

```ts
// src/content.config.ts (Skizze)
profile:  { name, tagline, institution, location, availableFrom?, intro, bullets[], social{email, github, linkedin}, portrait (image) }
about:    Markdown-Body + { values: {title, description}[] }
projects: Markdown-Body als Überblick + { title, summary, techStack[], category: 'eigenstaendig' | 'ai-unterstuetzt', github?, features[], learnings[], screenshots[{image, caption}], codeExample?{language, snippet}, order, featured }
skills:   { groups: {id, title, description, items: {name, note, logo?}[]}[] }
study:    { sections: {id, category, title, items[], note?}[] }
legal:    { name, street, zipCity, country, email, responsiblePerson, privacyLastUpdated }
```

Migration: Ein einmaliges Skript liest `DEFAULT_CONTENT` und schreibt die Dateien. Danach wird `content-model.ts` gelöscht.

---

## 7. Phasenplan

Aufwandsangaben sind **[Vermutung]** für eine Person, die mit Claude Code arbeitet.

### Phase 0: Live bekommen und Schaden begrenzen (0,5 bis 1 Tag)

Ziel: Der aktuelle Stand ist erreichbar und blamiert niemanden. Alles hier ist klein und wird beim Neuaufbau nicht weggeworfen, sondern mitgenommen.

| #   | Aufgabe                                                                                                                                                                                                                                                                   | Akzeptanzkriterium                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 0.1 | In den Repo-Settings Pages → Source auf „GitHub Actions“ stellen. Danach `deploy.yml` per `workflow_dispatch` starten. Im selben Zug Node-Version im Workflow auf 22 heben und die Actions auf die aktuellen Major-Versionen ziehen (Runner-Warnung: Node 20 deprecated). | Run grün, Pages-URL liefert die Seite                                               |
| 0.2 | `useRouter` reparieren: Zustand in einen Kontext oder ein globales Event heben, `navigate` feuert ein `popstate`-ähnliches Event, `?p=`-Redirect setzt den Pfad in den Router                                                                                             | Playwright-Test: Klick auf „Impressum“ zeigt H1 „Impressum“, `?p=/impressum` ebenso |
| 0.3 | `ThemeLabControl` und `CrimsonFogBlobs` aus `App.tsx` entfernen                                                                                                                                                                                                           | Kein schwebender Button mehr                                                        |
| 0.4 | Impressum und Datenschutz mit echten Angaben füllen (Anschrift, E-Mail); Footer-Jahr dynamisch                                                                                                                                                                            | Keine eckigen Klammern mehr im Rechtstext                                           |
| 0.5 | GitHub-Profil-Link und E-Mail-Adresse im Content prüfen und korrigieren                                                                                                                                                                                                   | Beide Links im Browser getestet                                                     |
| 0.6 | `tsbuildinfo` aus Git entfernen und in `.gitignore` aufnehmen; ungenutzte Dependencies entfernen                                                                                                                                                                          | `git status` nach Build sauber, `npm ls` ohne verwaiste Pakete                      |
| 0.7 | `robots.txt`: `/admin` per `Disallow` ausschließen, solange die Route existiert                                                                                                                                                                                           | Datei aktualisiert                                                                  |

### Phase 1: Neues Fundament (2 bis 3 Tage)

| #   | Aufgabe                                                                                                                 | Akzeptanzkriterium                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1.1 | Astro-Projekt im selben Repo aufsetzen (`base: '/Website/'`, Tailwind 4, `@astrojs/sitemap`, optional `@astrojs/react`) | `npm run build` erzeugt `dist/` mit `index.html`, `impressum/index.html`, `datenschutz/index.html` |
| 1.2 | Content Collections nach Abschnitt 6 anlegen, Inhalte aus `DEFAULT_CONTENT` migrieren                                   | `astro check` grün, alle Inhalte in Dateien                                                        |
| 1.3 | Layout, `SeoHead`, Header, Footer, 404-Seite                                                                            | Jede Seite hat eigenen Title, Description, Canonical, OG-Tags                                      |
| 1.4 | Startseite mit allen Sektionen in neuer Reihenfolge, noch mit Basis-Styling                                             | Alle Inhalte sichtbar ohne Klick                                                                   |
| 1.5 | Projekt-Detailseiten aus der Collection generieren                                                                      | `/projekte/wawi-mvp` rendert alle Felder                                                           |
| 1.6 | Alten React-Code, Admin, Themes, Radix, framer-motion entfernen                                                         | Keine ungenutzten Dateien oder Pakete, Bundle-Ziel aus 2.2 erreicht                                |
| 1.7 | Deploy-Workflow auf `withastro/action` umstellen                                                                        | Deploy grün, Deep-Link `/Website/impressum` liefert direkt HTTP 200 ohne Redirect                  |

### Phase 2: Design (2 bis 3 Tage)

| #   | Aufgabe                                                        | Akzeptanzkriterium                                                         |
| --- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 2.1 | Tokens und Dark Mode nach Abschnitt 5.2                        | Beide Modi bestehen den Kontrast-Check                                     |
| 2.2 | Hero mit Foto und Positionierungszeile                         | Foto als optimiertes Bild, LCP < 2,5 s mobil                               |
| 2.3 | Projektkarten mit Kategorie-Badge, optional Vorschaubild       | Alle Projekte auf einen Blick                                              |
| 2.4 | Kenntnisse-Grid, Studium-Liste, Über-mich-Sektion              | Kein Karussell, kein abgeschnittener Text bei 390 px                       |
| 2.5 | Bewegung und Fokus-Zustände                                    | `prefers-reduced-motion` schaltet alles ab, Tastaturnavigation vollständig |
| 2.6 | Review auf drei Breiten (390, 768, 1280) mit Screenshots im PR | Screenshots im PR angehängt                                                |

### Phase 3: Qualitätssicherung (1 Tag)

| #   | Aufgabe                                                                  | Akzeptanzkriterium                                   |
| --- | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| 3.1 | `ci.yml` mit Check, Lint, Format, Build, Playwright-Smoke, Lighthouse CI | Läuft auf jedem PR, blockiert Merge bei Rot          |
| 3.2 | Branch-Protection auf `main`                                             | Direkter Push abgelehnt                              |
| 3.3 | axe-Lauf über alle Seiten                                                | 0 Verstöße                                           |
| 3.4 | README neu schreiben: Inhalt ändern, lokal starten, deployen             | Ein Kommilitone kann in 10 Minuten einen Text ändern |

### Phase 4: Inhalt (laufend, beginnt parallel zu Phase 1)

Das ist der Teil, den kein Code löst und der am Ende über Zusagen entscheidet.

| #   | Aufgabe                                                                                                                                       | Wer     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 4.1 | Portraitfoto in guter Qualität                                                                                                                | Pharrel |
| 4.2 | Ladungsfähige Anschrift für das Impressum                                                                                                     | Pharrel |
| 4.3 | Korrekte GitHub-Profil-URL, LinkedIn-URL, E-Mail                                                                                              | Pharrel |
| 4.4 | Pro Projekt: 1 bis 2 Screenshots, ein echtes Code-Beispiel (nicht nur `java -jar`), ein ehrlicher Satz zu „was würde ich heute anders machen“ | Pharrel |
| 4.5 | „Availably“ hat weder Link noch Learnings. Entweder ausbauen oder rausnehmen. Ein dünnes Projekt schadet mehr als keines.                     | Pharrel |
| 4.6 | Verfügbarkeitsdatum und Stundenumfang für die Werkstudentenstelle in den Hero                                                                 | Pharrel |
| 4.7 | Optional: Lebenslauf als PDF unter `/lebenslauf.pdf`                                                                                          | Pharrel |

---

## 8. Risiken und offene Fragen

| Risiko / Frage                                               | Einschätzung                                                                                                    | Umgang                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Pages wird aktiviert, bevor der Rechtstext vollständig ist   | Dann ist eine Seite mit Platzhalter-Impressum öffentlich                                                        | Phase 0.1 und 0.4 im selben Arbeitsgang erledigen; notfalls 0.4 zuerst                         |
| Repo ist privat und Pages braucht dafür einen bezahlten Plan | Vermutung; das Konto hat laut GitHub-API genau ein öffentliches Repo, also ist dieses wahrscheinlich öffentlich | In den Repo-Settings prüfen                                                                    |
| Astro-Lernkurve                                              | Flach, aber vorhanden                                                                                           | Phase 1 klein halten, React-Inseln als Ausweg                                                  |
| Der Rechtstext wird nach Go-Live vergessen                   | Hoch, weil unangenehm                                                                                           | Phase 0.4 ist Blocker für den Merge auf `main`, nicht „später“                                 |
| Zu wenige Projekte für eine Projekt-first-Startseite         | Real: derzeit ein vorzeigbares Projekt mit Link                                                                 | Phase 4.4/4.5; im Zweifel zwei starke Projekte statt drei halbe                                |
| Ich habe Pharrels Geschmack nicht gesehen                    | Design-Phase ohne Briefing                                                                                      | Phase 2 startet mit einem Vorschlag in drei Breiten als PR-Screenshot, nicht mit fertigem Code |

---

## 9. Entscheidungen, die ohne Rückfrage getroffen wurden

Weil Pharrel diese Analyse nicht live begleiten konnte, gelten folgende Annahmen bis auf Widerspruch:

1. Die Sprache der Seite bleibt Deutsch.
2. Die Zielgruppe ist Werkstudentenstelle im Raum Rosenheim (aus dem Hero-Text übernommen).
3. Das Repo bleibt `User420-bit/Website` mit Base-Pfad `/Website/`. Eine eigene Domain wäre besser für den Lebenslauf, ist aber nicht Teil dieses Plans.
4. Der Admin-Bereich wird gelöscht, nicht repariert. Wer ihn behalten will, braucht ein Backend, und das ist außerhalb des Zwecks dieser Seite.
5. Astro ist die Empfehlung. Wer bei React bleiben will, kann Phase 0 vollständig umsetzen und Phase 1 durch „Vite SPA + `vite-react-ssg` für Prerendering“ ersetzen; die Phasen 2 bis 4 gelten dann unverändert.

---

## 10. Nächster konkreter Schritt

Phase 0.4 (Impressum und Datenschutz vervollständigen) und direkt danach Phase 0.1 (Pages in den Repo-Settings aktivieren, Workflow starten). Erst wenn die Pages-URL antwortet, beginnt Phase 0.2.
