# Pharrel Sandjo Djomou — Portfolio

Single-Page-Portfolio-Website (React 19 + Vite 7 + Tailwind CSS 4) für Pharrel Sandjo Djomou (Wirtschaftsinformatik, TH Rosenheim).

- DSGVO-konform: keine externen Tracker, keine Cookies, keine Drittanbieter-Schriften
- Inhalte werden ausschließlich lokal (`localStorage`) im Browser bearbeitet (Admin-Bereich)
- Bereitstellung als statische Seite via GitHub Pages

## Rework

Der vollständige Rework-Plan (Ist-Analyse, Architektur-Entscheidungen, Phasenplan) liegt in [`docs/REWORK_PLAN.md`](docs/REWORK_PLAN.md).

## Schnellstart

```bash
npm install
npm run dev
```

Standardmäßig erreichbar unter <http://localhost:5173/Website/>.

## Scripts

- `npm run dev` — Vite-Dev-Server
- `npm run build` — Produktions-Build nach `dist/`
- `npm run preview` — Vorschau des Builds
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` — Prettier
- `npm run check` — Typecheck + Lint
- `npm run deploy` — Build (für CI)

## Admin

- URL: `/admin`
- Passphrase über Vite-Env-Variable `VITE_ADMIN_PASSPHRASE` setzen.
  - Beispiel lokal: `.env.local` mit `VITE_ADMIN_PASSPHRASE=meinPasswort` (NICHT committen).
  - In GitHub: Repository Secret `VITE_ADMIN_PASSPHRASE` setzen — wird im Workflow injiziert.
- **Hinweis:** Da Vite-Env-Variablen mit Prefix `VITE_` in den Client-Build kompiliert werden, ist dies kein echter Schutz, sondern eine pragmatische Hürde. Für ernsthafte Sicherheit wäre ein Backend nötig.
- Inhalte werden ausschließlich im Browser des Bearbeiters in `localStorage` gespeichert. Es gibt **keine Server-Persistenz**. Über Export/Import (JSON) kann der Stand mitgenommen oder eingespielt werden.

## Deployment auf GitHub Pages

1. Repository: `User420-bit/Website` (privat oder öffentlich)
2. In den Repository-Settings → Pages → Source auf "GitHub Actions" stellen.
3. Optional Secret `VITE_ADMIN_PASSPHRASE` setzen.
4. Push auf `main` triggert `.github/workflows/deploy.yml`.
5. Live-URL: <https://user420-bit.github.io/Website/>

### Base-Path

`vite.config.ts` setzt `base: '/Website/'`. Bei Umbenennung des Repositories anpassen (auch `public/404.html`).

## DSGVO

- Keine externen Schriften, keine Analytics, keine Cookies.
- Hosting durch GitHub (Microsoft) — vgl. Datenschutzerklärung in der App.
- Inhalte (Texte, Bilder, Links) werden lokal im Browser persistiert, nicht serverseitig.

## Lizenz

MIT
