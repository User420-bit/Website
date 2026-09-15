# Klartext — Website

Statisch generierte Website des Einzelunternehmens Klartext (Astro 7 + Tailwind CSS 4):
Insellösungen, Websites und Web-Apps aus Rosenheim. Die Person hinter Klartext wird auf der
Startseite nur in der Sektion "Über Klartext" genannt und im Impressum, wo § 5 DDG den Namen
verlangt.

- **Kein JavaScript** auf den Unterseiten, ein kleines Inline-Script auf der Startseite
- **Keine Cookies, kein Tracking, keine Drittanbieter-Ressourcen** — auch keine Speicherung im Browser
- Jede Seite ist echtes HTML mit eigener URL, eigenem Title und eigenen Meta-Tags

Der Rework-Plan mit Ist-Analyse und Begründungen liegt in
[`docs/REWORK_PLAN.md`](docs/REWORK_PLAN.md), der Umsetzungsstand in
[`docs/REWORK_STATUS.md`](docs/REWORK_STATUS.md).

## Schnellstart

```bash
npm install
npm run dev
```

Erreichbar unter <http://localhost:4321/Website/>.

## Inhalt ändern

Alle Texte liegen als Dateien im Repository. Es gibt keinen Admin-Bereich und keine
Datenbank — ändern heißt: Datei editieren, committen, fertig. Der Deploy läuft
automatisch.

| Was                                       | Datei                            |
| ----------------------------------------- | -------------------------------- |
| Firmenname, Claim (H1), Intro, Leistungen | `src/content/company.json`       |
| Inhaber, Werkstudenten-Hinweis, Portrait  | `src/content/profile.json`       |
| Text und Werte "Über Klartext"            | `src/content/about.md`           |
| Eine Referenz                             | `src/content/projekte/<name>.md` |
| Werkzeug-Gruppen                          | `src/content/skills.json`        |
| Kontakt-Abschnitt                         | `src/content/contact.json`       |
| Impressum und Datenschutz                 | `src/content/legal.json`         |

Wer den Claim in `company.json` ändert, muss ihn auch in `scripts/verify-build.mjs` unter
`ROUTES['']` nachziehen — der Build-Check prüft die H1 der Startseite gegen diesen Text.

### Logo einbauen

Das Klartext-Logo liegt noch nicht als Datei vor. Bis dahin steht im Header ein oranges
Quadrat mit "K" (`src/components/Header.astro`) und dasselbe Motiv als `public/favicon.svg`.
Sobald das Logo da ist: SVG unter `src/assets/` ablegen, im Header statt des Platzhalter-Spans
einbinden und `public/favicon.svg` ersetzen. Die Akzentfarbe steht in `src/styles/global.css`.

### Eine Referenz hinzufügen

Neue Datei `src/content/projekte/mein-projekt.md`:

```markdown
---
title: Mein Projekt
summary: Ein Satz, der erklärt, was es tut.
techStack: [Java, PostgreSQL]
category: eigenstaendig # oder: ai-unterstuetzt
github: https://github.com/<nutzer>/<repo> # oder: null
order: 4 # Reihenfolge auf der Startseite
features:
  - Was es kann
learnings:
  - Welche Erkenntnis das Projekt gebracht hat
---

Der Fließtext hier erscheint als Überblick auf der Referenzseite.
```

Der Dateiname wird zur URL: `/projekte/mein-projekt/`. Die Karte auf der Startseite
und die Detailseite entstehen automatisch.

### Ein Bild hinzufügen

Bilder unter `src/assets/` ablegen und relativ zur Inhaltsdatei referenzieren, also
aus `src/content/profile.json` heraus als `"../assets/portrait.jpg"`. Astro erzeugt
daraus automatisch WebP in mehreren Größen. Bilder in `public/` werden **nicht**
optimiert.

### Felder, die `null` sein dürfen

`github`, `linkedin`, `portrait`, `openTo`, `street` und `zipCity` akzeptieren
`null`. Das bedeutet "noch nicht bestätigt" und wird nirgends gerendert — ein toter
Link ist schlechter als kein Link. Ein Platzhalter in eckigen Klammern (`[PLZ Ort]`)
wird vom Schema abgelehnt und bricht den Build.

## Scripts

| Befehl                | Wirkung                                                        |
| --------------------- | -------------------------------------------------------------- |
| `npm run dev`         | Dev-Server mit Hot Reload                                      |
| `npm run build`       | Produktions-Build nach `dist/`                                 |
| `npm run preview`     | Vorschau des Builds                                            |
| `npm run check`       | Typecheck (`astro check`)                                      |
| `npm run lint`        | ESLint inklusive Accessibility-Regeln                          |
| `npm run format`      | Prettier                                                       |
| `npm run test:build`  | Prüft `dist/`: Routen, H1, Meta-Tags, tote Links, externes JS  |
| `npm run guard:legal` | Prüft, ob das Impressum vollständig ist (blockiert den Deploy) |
| `npm run verify`      | Alles davon in einem Durchlauf — vor jedem Push empfohlen      |

## Deployment

Push auf `main` löst `.github/workflows/deploy.yml` aus. Auf jedem Pull Request
läuft `.github/workflows/ci.yml`.

**Einmalig nötig, sonst schlägt jeder Deploy fehl:** In den Repository-Settings
unter **Pages → Source** auf **GitHub Actions** stellen. Ohne diesen Schritt bricht
`actions/configure-pages` mit `Get Pages site failed` ab — das war die Ursache,
warum die Seite nie live ging.

Live-URL nach der Aktivierung: <https://user420-bit.github.io/Website/>

### Der Deploy bricht mit "Das Impressum ist unvollständig" ab

Das ist Absicht. Eine deutsche Website mit Impressumspflicht darf nicht ohne
ladungsfähige Anschrift online gehen. `street` und `zipCity` in
`src/content/legal.json` eintragen, dann läuft der Deploy.

### Base-Pfad

`astro.config.mjs` setzt `site: 'https://user420-bit.github.io'` und
`base: '/Website/'`. Bei Umbenennung des Repositories oder Umzug auf eine eigene
Domain beide Werte anpassen — und die Sitemap-Zeile in `public/robots.txt`.

Interne Links immer über den Helfer `href()` aus `src/lib/site.ts` bauen, damit der
Base-Pfad und der abschließende Slash stimmen.

## Datenschutz

Keine externen Schriften, kein Analytics, keine Cookies, keine Speicherung im
Browser. Der Hell-/Dunkel-Modus folgt der Systemeinstellung und wird nicht
gespeichert. Hosting durch GitHub (Microsoft) — Details in der
Datenschutzerklärung der Seite.

## Lizenz

MIT
