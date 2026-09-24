# Klartext — Website

Statisch generierte Website des Einzelunternehmens Klartext (Astro 7 + Tailwind CSS 4):
kleine Programme, Websites und Web-Apps aus Bruckmühl. Die Person hinter Klartext wird auf der
Startseite nur in der Sektion "Über Klartext" genannt und im Impressum, wo § 5 DDG den Namen
verlangt.

- **Kein JavaScript** auf den Unterseiten, ein kleines Inline-Script auf der Startseite
- **Keine Cookies, kein Tracking, keine Drittanbieter-Ressourcen** — auch keine Speicherung im Browser
- Jede Seite ist echtes HTML mit eigener URL, eigenem Title und eigenen Meta-Tags

Der Rework-Plan mit Ist-Analyse und Begründungen liegt in
[`docs/REWORK_PLAN.md`](docs/REWORK_PLAN.md), der Umsetzungsstand in
[`docs/REWORK_STATUS.md`](docs/REWORK_STATUS.md). Der Umbau der Startseite zu klaren
Kapiteln und einem aufgeräumten Kontakt (September 2026) ist in
[`docs/STARTSEITE_PLAN.md`](docs/STARTSEITE_PLAN.md) begründet und dokumentiert.

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

| Was                                                | Datei                            |
| -------------------------------------------------- | -------------------------------- |
| Firmenname, Claim (H1), Für wen, Intro, Leistungen | `src/content/company.json`       |
| Leistungen im Einzelnen, mit Belegen               | `src/content/leistungen.json`    |
| Inhaber, Werkstudenten-Hinweis, Portrait           | `src/content/profile.json`       |
| Text, Werte, Arbeitsweise                          | `src/content/about.md`           |
| Eine Referenz                                      | `src/content/projekte/<name>.md` |
| Werkzeug-Gruppen                                   | `src/content/skills.json`        |
| Kontakt-Abschnitt                                  | `src/content/contact.json`       |
| Impressum und Datenschutz                          | `src/content/legal.json`         |

Wer den Claim in `company.json` ändert, muss ihn auch in `scripts/verify-build.mjs` unter
`ROUTES['']` nachziehen — der Build-Check prüft die H1 der Startseite gegen diesen Text.

### Logo einbauen

Das Klartext-Logo liegt noch nicht als Datei vor. Bis dahin steht im Header die Wortmarke als
reiner Text (`src/components/Header.astro`), und `public/favicon.svg` zeigt ein oranges Quadrat mit
"K" als Platzhalter. Sobald das Logo da ist: SVG unter `src/assets/` ablegen, im Header neben der
Wortmarke einbinden und `public/favicon.svg` ersetzen. Die Akzentfarbe steht in
`src/styles/global.css`.

### Eine Referenz hinzufügen

Neue Datei `src/content/projekte/mein-projekt.md`:

```markdown
---
title: Mein Projekt
summary: Ein Satz, der erklärt, was es tut.
techStack: [Java, PostgreSQL]
kind: eigenes-produkt # oder: kundenprojekt, prototyp
period: März 2026
status: Läuft, nächster Schritt ist X # oder: null
github: https://github.com/<nutzer>/<repo> # oder: null
live: https://example.com # oder: null
order: 4 # Reihenfolge, kleiner zuerst; die Startseite zeigt die ersten sechs
features:
  - Was es kann
engineering:
  - Welche technische Entscheidung das Projekt trägt
learnings:
  - Welche Erkenntnis das Projekt gebracht hat
---

Der Fließtext hier erscheint als Überblick auf der Referenzseite.
```

Der Dateiname wird zur URL: `/projekte/mein-projekt/`. Die Zeile auf `/projekte/` und auf der
Startseite (unter den ersten sechs nach `order` Kundenprojekte und Arbeiten mit Screenshot groß
oben, der Rest als Index darunter) sowie die Detailseite entstehen automatisch, und `npm run test:build` prüft die neue Route
ohne weiteres Zutun. Ein Eintrag in `leistungen.json` kann das Projekt unter `evidence`
als Beleg nennen – der Slug ist der Dateiname ohne `.md`.

### Ein Bild hinzufügen

Bilder unter `src/assets/` ablegen und relativ zur Inhaltsdatei referenzieren, also
aus `src/content/profile.json` heraus als `"../assets/portrait.jpg"`. Astro erzeugt
daraus automatisch WebP in mehreren Größen. Bilder in `public/` werden **nicht**
optimiert.

### Screenshots der Referenzen

`npm run screenshots` nimmt jede Referenz mit `live`-URL im Browser auf und legt das Bild
unter `src/assets/projekte/<slug>.png` ab (1600 × 900, Edge oder Chrome aus dem System, sonst
das Chromium von Playwright). Projekte ohne öffentliche Adresse stehen in `QUELLEN` in
`scripts/screenshots.mjs` mit dem gebauten Verzeichnis des Nachbar-Repos, zum Beispiel
`../PointCare/dist`; dort lässt sich auch ein Klick nach dem Laden hinterlegen, etwa der
Gastzugang von MemoryTree, damit das Bild die Anwendung zeigt und nicht ihr Login. Ein
laufender Dev-Server geht per `--url kleinkram=http://localhost:3000`. Was keine Quelle hat,
meldet das Skript und lässt es aus.

Das Skript schreibt nur Bilder. Der Eintrag in der Projektdatei ist Handarbeit, weil die
Bildunterschrift Inhalt ist; die Vorlage steht am Ende der Ausgabe:

```yaml
screenshots:
  - image: ../../assets/projekte/tiefgang.png
    caption: Was das Bild zeigt
```

Handaufnahmen, etwa aus dem Spiel heraus oder im Handyformat, liegen daneben als
`<slug>-<ansicht>.png` oder `.webp`, zum Beispiel `tiefgang-montagehalle.png`. Das Skript fasst
sie nicht an und fragt bei Projekten, die schon eigene Bilder eingetragen haben, nicht mehr nach
dem Eintrag.

Das erste Bild im Querformat erscheint in der Zeile auf `/projekte/` und, wenn das Projekt unter
den ersten sechs steht, groß auf der Startseite. Die Projektseite zeigt es über die volle Breite, die übrigen Querformate
zweispaltig und Hochformate (Handy, Dialoge) schmal darunter. Nach einer sichtbaren Änderung am
Projekt das Skript erneut laufen lassen und das Bild mit committen.

### Felder, die `null` sein dürfen

`github`, `live`, `status`, `linkedin`, `portrait`, `openTo`, `street` und `zipCity`
akzeptieren
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
| `npm run screenshots` | Nimmt die Referenzen im Browser auf, siehe oben                |
| `npm run verify`      | Alles davon in einem Durchlauf — vor jedem Push empfohlen      |

## Deployment

Push auf `main` löst `.github/workflows/deploy.yml` aus. Auf jedem Pull Request
läuft `.github/workflows/ci.yml`.

**Einmalig nötig, sonst schlägt jeder Deploy fehl:** In den Repository-Settings
unter **Pages → Source** auf **GitHub Actions** stellen. Ohne diesen Schritt bricht
`actions/configure-pages` mit `Get Pages site failed` ab — das war die Ursache,
warum die Seite nie live ging.

Live-URL nach der Aktivierung: <https://web-klartext.de/>

### Der Deploy bricht mit "Das Impressum ist unvollständig" ab

Das ist Absicht. Eine deutsche Website mit Impressumspflicht darf nicht ohne
ladungsfähige Anschrift online gehen. `street` und `zipCity` in
`src/content/legal.json` eintragen, dann läuft der Deploy.

### Domain

Die Seite läuft unter `https://web-klartext.de/`. `public/CNAME` teilt GitHub Pages
die Domain mit, `astro.config.mjs` setzt `site: 'https://web-klartext.de'` und
`base: '/'`. Bei einem Domainwechsel alle drei Stellen anpassen — und die
Sitemap-Zeile in `public/robots.txt`.

DNS beim Registrar:

| Typ   | Name  | Wert                                                                                       |
| ----- | ----- | ------------------------------------------------------------------------------------------ |
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `user420-bit.github.io`                                                                    |

Danach in den Repository-Settings unter **Pages** die Domain eintragen und
**Enforce HTTPS** aktivieren, sobald das Zertifikat ausgestellt ist.

Die einzige Kontaktadresse ist `info@web-klartext.de` (Postfach bei webspace.bz,
MX und SPF sind gesetzt). Sie steht in `company.json` und `legal.json`.

Interne Links immer über den Helfer `href()` aus `src/lib/site.ts` bauen, damit der
Base-Pfad und der abschließende Slash stimmen.

## Datenschutz

Keine externen Schriften (die Hausschrift Instrument Sans liegt unter `src/assets/fonts/` und
kommt vom eigenen Server; `npm run test:build` prüft das), kein Analytics, keine Cookies, keine Speicherung im
Browser. Der Hell-/Dunkel-Modus folgt der Systemeinstellung und wird nicht
gespeichert. Hosting durch GitHub (Microsoft) — Details in der
Datenschutzerklärung der Seite.

## Lizenz

MIT
