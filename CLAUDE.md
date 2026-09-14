# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page portfolio for Pharrel Sandjo Djomou (React 19 + Vite 7 + Tailwind CSS 4 + TypeScript),
deployed as a static site to GitHub Pages at `https://user420-bit.github.io/Website/`.

## Commands

```bash
npm install          # or npm ci
npm run dev          # dev server — NOTE: http://localhost:5173/Website/ (base path, not /)
npm run check        # tsc -b --noEmit && eslint — the verification gate before committing
npm run build        # tsc -b && vite build → dist/
npm run preview      # serve the built dist/
npm run lint:fix     # eslint --fix
npm run format       # prettier --write (no check-only variant; not run in CI)
```

**There is no test suite** — no test runner, no test files, no test script. `npm run check` is the
only automated verification. Do not claim tests pass; verify behaviour by building and exercising the
app. Lint currently emits 3 `react-refresh/only-export-components` warnings (exit code 0) — that is
the clean baseline, not a regression to fix.

Do **not** run `npm run deploy`. It shells out to `gh-pages`, which is dead configuration: real
deployment is `.github/workflows/deploy.yml` (`actions/deploy-pages`) on push to `main`.

## Architecture

### Content is data, not markup — the central invariant

Every piece of user-visible content (text, bullet lists, images, project details) lives in a single
`PortfolioContent` object, not in JSX. Components never hardcode copy; they read it via
`usePortfolioContent()`.

The flow is: `DEFAULT_CONTENT` (`src/lib/content-model.ts`) → `PortfolioProvider`
(`src/context/PortfolioContext.tsx`) → `useLocalStorage('portfolio:content')` → consumers.

**Adding or changing a content field requires three files in lockstep:**

1. `src/lib/content-model.ts` — the TS interface *and* the matching entry in `DEFAULT_CONTENT`.
2. `src/lib/content-validation.ts` — the mirrored zod schema. If you skip this, JSON import in the
   admin area silently rejects the file (`portfolioContentSchema.safeParse`), which is easy to miss
   because everything else still works.
3. The corresponding editor in `src/components/admin/*Tab.tsx`.

Mutations go through `updateContent(prev => next)` from the context, which stamps
`ui.lastUpdatedAt`. Use it rather than `setContent` for edits; `setContent` is for wholesale
replacement (JSON import).

### There is no server persistence — admin edits are local-only

This surprises people. Admin changes write to the **editor's own browser localStorage**. Visitors to
the deployed site have an empty localStorage and therefore always see `DEFAULT_CONTENT`.

So: **to change what the live site shows, edit `DEFAULT_CONTENT` in `src/lib/content-model.ts` and
redeploy.** The admin area is a live preview plus a JSON export/import workflow, not a CMS. The
export/import round-trip (`AdminPage.tsx`) is the only way to move content between browsers.

### Routing is hand-rolled — no react-router

`src/hooks/use-router.ts` derives the path by stripping `import.meta.env.BASE_URL` from
`window.location.pathname` and listens to `popstate`. Routes are a literal if/else chain in
`src/App.tsx`; add a route there (`/admin`, `/ai-tools`, `/impressum`, `/datenschutz`, else
`MainPage`). `navigate()` re-prefixes the base and scrolls to top.

In-page section links are *not* routes: `Navigation.tsx` scrolls to `#about` / `#study` /
`#projects` / `#contact` with a 64px header offset and tracks the active section with an
`IntersectionObserver`.

Deep links survive GitHub Pages via a fallback pair: `public/404.html` encodes the path into `?p=`
and redirects to the base; the second `useEffect` in `App.tsx` reads `?p=` and restores the URL with
`history.replaceState`. If you touch either side, check both.

**The base path `/Website/` is hardcoded in two places** — `vite.config.ts` (`base`) and
`public/404.html` (the `base` variable). Renaming the repo means changing both, plus the README URLs.

### localStorage hook and same-tab sync

`src/hooks/use-local-storage.ts` backs all persisted state. The native `storage` event only fires in
*other* tabs, so the hook dispatches a custom `local-storage-change` event on every write and listens
for both. That is why two components reading the same key stay in sync within one tab (e.g. the theme
picker and `App.tsx`). Keep that dispatch if you refactor the hook.

Keys in use: `portfolio:content`, `psd_admin_session`, `testThemeEnabled`, `testThemePreset`.

### Theming is CSS-first (Tailwind v4) and attribute-driven

There is **no `tailwind.config.js`** — Tailwind 4 is wired through the `@tailwindcss/vite` plugin and
configured inside `src/index.css` via `@theme` / `@theme inline`. `postcss.config.js` only adds
autoprefixer.

Design tokens are oklch CSS custom properties on `:root`. The eight optional "Theme Lab" presets are
plain CSS blocks selected by body attributes:
`body[data-test-enabled='true'][data-test-theme='<id>']`. `App.tsx` sets those attributes from
localStorage; `ThemeLabControl.tsx` writes the values; `CrimsonFogBlobs.tsx` renders the animated
blobs (only mounted when a test theme is enabled) using the `--fog-*` tokens.

**Adding a preset means two edits:** a CSS block in `src/index.css` and an entry in the `PRESETS`
array in `ThemeLabControl.tsx`.

Note the `@custom-variant dark` declared in `index.css` is currently inert — nothing ever applies a
`.dark` class and no `dark:` utility is used anywhere. Use the test-theme mechanism, not `dark:`.

## Conventions and constraints

- **All UI copy is German.** Identifiers and comments are English. Keep new user-facing strings German.
- **DSGVO/privacy is a hard product constraint**, not a preference: no external fonts (the `@theme`
  font stack is system-only), no analytics, no cookies, no third-party requests. Do not introduce a
  CDN font, tracker, or remote API. The privacy policy in `DatenschutzPage.tsx` asserts this.
- `src/components/ui/` is shadcn-style primitives and is **excluded from ESLint**
  (`eslint.config.js` ignores it). Treat it as generated-ish; prefer composing over editing.
- TypeScript is strict with `noUncheckedIndexedAccess` — array indexing yields `T | undefined`. This
  is why array-reorder helpers in `src/components/admin/_shared.tsx` guard with
  `if (a === undefined) return`. Follow that pattern instead of non-null assertions.
- `@typescript-eslint/no-explicit-any` is an **error**, not a warning.
- Prettier: no semicolons, single quotes, 100 columns, ES5 trailing commas.
- Import via the `@/` alias (defined in both `vite.config.ts` and `tsconfig.app.json`), not deep
  relative paths.

## Gotchas

- **`tsconfig.app.tsbuildinfo` and `tsconfig.node.tsbuildinfo` are git-tracked.** Every `npm run
  check` or `npm run build` dirties the working tree. Do not sweep that churn into a commit —
  `git checkout tsconfig.*.tsbuildinfo` before staging.
- The admin passphrase compares against `import.meta.env.VITE_ADMIN_PASSPHRASE` and **falls back to
  the literal `'changeme'`** when unset. Because `VITE_`-prefixed vars are inlined into the client
  bundle, this is a speed bump, not access control — do not describe it as security. Local override
  goes in `.env.local` (gitignored); CI reads the `VITE_ADMIN_PASSPHRASE` repo secret.
- Admin image uploads are base64 data URLs stored inside the content object, capped at 1 MB
  (`MAX_IMAGE_BYTES` in `_shared.tsx`). The ~5 MB localStorage quota is the real ceiling; several
  large images will silently fail the write (the hook only `console.warn`s).
- The production bundle is ~553 kB (over Vite's 500 kB warning threshold) because everything is in
  one chunk. Expect that warning on every build.
