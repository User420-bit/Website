# design-sync — Notizen zu diesem Repo

## Form: Tokens-only

Klartext ist eine Astro-Seite, kein React-Komponentenpaket. Die 17 Bausteine in
`src/components/` sind `.astro`-Dateien; sie werden beim Bauen zu HTML und
lassen sich nicht in ein Browser-Bundle packen, aus dem die Entwurfs-Oberflaeche
Komponenten aufrufen koennte. Synchronisiert wird deshalb **nur die
Gestaltungsebene** (`[ZERO_MATCH] ... treating as tokens-only DS`).
`.design-sync/tokens-entry.js` ist der leere Einstiegspunkt, der den Konverter
in diesen Modus schaltet.

Wer Komponentenkarten will, muesste die `.astro`-Dateien als React nachbauen —
eine zweite Quelle der Wahrheit ohne Moeglichkeit, die Gleichheit zu pruefen.
Bewusst nicht gemacht.

## Befunde

- **Astro legt die Schrift nicht ins Stylesheet.** Die `@font-face`-Regeln und
  `--font-klartext` stehen in einem `<style>`-Block im `<head>` jeder Seite.
  Nur `dist/_astro/BaseLayout.*.css` hochzuladen hiesse: `--font-klartext` ist
  undefiniert und jeder Entwurf laeuft in der Systemschrift.
  `.design-sync/prep.mjs` naeht beides zusammen.
- **Hashes wechseln pro Build** — im Dateinamen (`BaseLayout.<hash>.css`) und im
  Schriftnamen (`Instrument Sans-<hash>`). `prep.mjs` sucht die Dateien, statt
  sie zu benennen, und setzt den Familiennamen auf `Instrument Sans` zurueck.
- **Der metrisch angepasste Arial-Ersatz faellt weg.** Er hat nur
  `local("Arial")` und kein `url()`; `extractFonts()` im Konverter kann solche
  Regeln nicht uebernehmen. `prep.mjs` entfernt ihn samt Verweis in
  `--font-klartext`, damit das Token nicht auf eine fehlende Familie zeigt.
  Folge: waehrend die Schrift laedt, springt das Layout minimal — in einem
  Entwurf ohne Belang.
- **Tailwind v4 schneidet zurecht.** Das gebaute Stylesheet enthaelt nur
  Utilities und Theme-Variablen, die die Website selbst benutzt. Konkret fehlt
  `--radius-md`, obwohl `src/styles/global.css` und `DESIGN.md` es definieren.
  Die Liste vorhandener Utility-Klassen in `conventions.md` ist daraus
  abgeleitet, nicht aus dem Quelltext.
- **Dokumentation darf nicht mitgescannt werden.** Tailwind durchsucht das
  Projektverzeichnis nach Klassennamen. `conventions.md` nennt Klassen auch als
  Gegenbeispiele ("gibt es nicht") — dadurch erzeugte Tailwind genau diese
  Klassen (`bg-fg`, `rounded-md`, `text-border`, `--radius-md`), sie landeten im
  ausgelieferten Stylesheet der Seite, und die Aussage der Datei wurde durch ihr
  eigenes Dasein falsch. `src/styles/global.css` schliesst `.design-sync/`
  deshalb per `@source not` aus. Wer den Ausschluss entfernt, blaeht das
  Stylesheet der Seite auf und macht `conventions.md` unwahr.
- **`tokens/` bleibt leer.** `copyTokens()` liest nur aus einem npm-Paket
  (`cfg.tokensPkg`). Die Klartext-Tokens liegen im Repo und erreichen die
  Entwuerfe ueber `_ds_bundle.css`, das `styles.css` importiert — also
  vollstaendig, nur an anderer Stelle.
- **Konverter-Abhaengigkeiten bleiben draussen.** `react`, `react-dom`,
  `esbuild`, `ts-morph` und `playwright` werden in `.ds-sync/` installiert,
  nicht in `package.json`. Die Seite selbst braucht nichts davon.
- **Playwright muss zur vorinstallierten Browser-Revision passen.** In dieser
  Umgebung liegt Chromium 1194 unter `/opt/pw-browsers`, dazu gehoert
  `playwright@1.56.0`. Eine neuere Version sucht eine Revision, die es dort
  nicht gibt, und `package-validate.mjs` bricht mit `[RENDER_SKIPPED]` ab.
- **Noch nicht hochgeladen.** In dieser Sitzung (claude.ai/code) fehlte die
  DesignSync-Autorisierung, deshalb gibt es kein `projectId` in der Konfiguration.
  Der Aufruf meldet: einmal `/design-login` in einem interaktiven Claude Code im
  Terminal ausfuehren, danach laesst sich der Upload nachholen.

## Ablauf

```bash
npm ci
npm run build && node .design-sync/prep.mjs     # = cfg.buildCmd
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules ./.ds-sync/node_modules --out ./ds-bundle
```

Das Staging von `.ds-sync/` und die Installation von `esbuild ts-morph
@types/react react react-dom playwright@1.56.0` gehen voraus (siehe
Skill-Anleitung, Abschnitt 7).

## Re-sync-Risiken

- `prep.mjs` haengt an zwei Details der Astro-Ausgabe: dem `<style>`-Block mit
  `@font-face` in `dist/index.html` und genau einer Schriftdatei unter
  `dist/_astro/fonts/`. Aendert Astro seine Fonts-API, bricht das Skript laut ab
  (es prueft beides) — es liefert dann nichts Halbes.
- Die Utility-Liste in `conventions.md` ist eine Momentaufnahme dessen, was die
  Website benutzt. Nach groesseren Aenderungen an den Seiten neu gegen
  `ds-bundle/_ds_bundle.css` pruefen; `conventions.md` gehoert den Autoren und
  wird nicht automatisch neu geschrieben, nur nachgeprueft.
- `conventions.md` ist auf Englisch, `DESIGN.md` bleibt Deutsch — die
  Vorschrift ist die Quelle der Wahrheit und wird nicht uebersetzt, damit sie
  nicht von ihr abzweigt. Die Entwurfs-Oberflaeche bekommt also einen englischen
  Kopf und eine deutsche Vorschrift; der Kopf sagt das ausdruecklich.
- Die Playwright-Version ist an die jeweilige Umgebung gebunden, nicht an das
  Repo. Auf einer anderen Maschine kann eine andere Version noetig sein.
- `.design-sync/.cache/` ist gitignored. `prep.mjs` muss vor jedem
  Konverter-Lauf gelaufen sein, sonst fehlt `cssEntry`.
- Geprueft wurde die Vollstaendigkeit des Bundles (`package-validate.mjs`,
  0 Fehler) — nicht, wie ein fertiger Entwurf in der Entwurfs-Oberflaeche
  aussieht. Das laesst sich erst nach dem ersten Upload beurteilen.
