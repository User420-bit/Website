# Pharrel Sandjo Djomou — Portfolio

Statisch generierte Portfolio-Website (Astro 7 + Tailwind CSS 4).

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

| Was                          | Datei                            |
| ---------------------------- | -------------------------------- |
| Name, Intro, Links, Portrait | `src/content/profile.json`       |
| Text und Werte "Über mich"   | `src/content/about.md`           |
| Ein Projekt                  | `src/content/projekte/<name>.md` |
| Kenntnisse-Gruppen           | `src/content/skills.json`        |
| Studium-Schwerpunkte         | `src/content/study.json`         |
| Kontakt-Abschnitt            | `src/content/contact.json`       |
| Impressum und Datenschutz    | `src/content/legal.json`         |

### Ein Projekt hinzufügen

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
  - Was ich dabei gelernt habe
---

Der Fließtext hier erscheint als Überblick auf der Projektseite.
```

Der Dateiname wird zur URL: `/projekte/mein-projekt/`. Die Karte auf der Startseite
und die Detailseite entstehen automatisch.

### Ein Bild hinzufügen

Bilder unter `src/assets/` ablegen und relativ zur Inhaltsdatei referenzieren, also
aus `src/content/profile.json` heraus als `"../assets/portrait.jpg"`. Astro erzeugt
daraus automatisch WebP in mehreren Größen. Bilder in `public/` werden **nicht**
optimiert.

### Felder, die `null` sein dürfen

`github`, `linkedin`, `portrait`, `availability`, `street` und `zipCity` akzeptieren
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
