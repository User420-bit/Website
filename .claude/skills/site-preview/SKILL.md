---
name: site-preview
description: >-
  Build a static site and publish it as a shareable Artifact preview — a viewer
  with a route rail, viewport-width toggles and the project's real check results,
  so a site can be reviewed from any device without a local dev server. Use this
  whenever someone wants to see, review, share or "run" a website that lives in a
  repo — "starte die Website", "zeig mir die Seite", "kann ich das irgendwo
  anschauen", "preview this", "share the build", "check it on mobile", a design
  review, a client hand-off, or a before/after after a merge or redesign. Reach for
  it even when they only ask to start a dev server: a dev server on a remote or
  ephemeral machine is unreachable for them, and this is the thing that actually
  gets the site in front of their eyes.
---

# Site preview

A dev server is the obvious answer to "let me see the site" and the wrong one
whenever the person asking is not on the machine running it — a cloud session, a
container, a colleague's laptop, a phone. This skill produces the thing they can
actually open: the real build output, published as a private Artifact, with
enough harness around it to review properly.

## When this does not fit

Say so early rather than producing a broken preview:

- **Server-rendered or dynamic sites** (SSR, API routes, auth, a database). Only
  what the build emits as files can be previewed. Offer screenshots of a locally
  running server instead.
- **Client-routed SPAs.** Only the entry route resolves from static files; deep
  links 404. The script warns when it finds the base path baked into JS. A
  single-route preview is still often useful — just name the limitation.
- **A site that will not build.** Fix the build or report the failure. Never
  publish a preview of a stale `dist/` and present it as current.

## Workflow

### 1. Build it

Find the build command and its output directory. Check `package.json` scripts and
the framework config before guessing:

| Stack                   | Build                                             | Output           | Base path lives in                             |
| ----------------------- | ------------------------------------------------- | ---------------- | ---------------------------------------------- |
| Astro                   | `npm run build`                                   | `dist`           | `base` in `astro.config.*`                     |
| Vite / SvelteKit static | `npm run build`                                   | `dist` / `build` | `base` in `vite.config.*` / `svelte.config.js` |
| Next static export      | `npm run build`                                   | `out`            | `basePath` in `next.config.*`                  |
| Nuxt generate           | `npx nuxi generate`                               | `.output/public` | `app.baseURL`                                  |
| Eleventy / Jekyll       | `npx @11ty/eleventy` / `bundle exec jekyll build` | `_site`          | `pathPrefix` / `baseurl`                       |
| Hugo                    | `hugo`                                            | `public`         | `baseURL`                                      |
| Plain HTML              | —                                                 | the repo itself  | usually none                                   |

The base path matters more than it looks. A site built for `/Repo/` references
every asset from there, and getting it wrong means a preview with no CSS.

### 2. Run the project's own checks

Run what a contributor runs — typecheck, lint, format, tests, whatever the repo
defines — and record the real outcome of each. These become the chips along the
top of the viewer, and they are the reason a reviewer can trust what they are
looking at.

Record what happened, not what should have happened. A failing check belongs in
the preview as a red chip with its real number; hiding it turns the preview into
a sales pitch and costs the reviewer the one signal they cannot get by looking.
If a check does not exist in the repo, leave it out rather than inventing one.

### 3. Make the preview

```bash
python3 .claude/skills/site-preview/scripts/make_preview.py \
  --dist dist \
  --base /Repo/ \
  --out .preview \
  --title "Distinctive Name" \
  --subtitle "What this build is" \
  --meta "$(git rev-parse --short HEAD) · 15 pages" \
  --check "typecheck|0 errors|ok" \
  --check "lint|clean|ok" \
  --check "tests|3 failing|fail" \
  --lang de
```

It copies the build, rewrites root-relative URLs to paths relative to each
page's own depth, appends `index.html` to directory URLs, walks the HTML for
routes (labelled by their `<h1>`, falling back to `<title>`), and writes
`.preview/viewer.html`, `.preview/site/**`, `.preview/routes.json` and
`.preview/files.json`.

Read its output. It reports pages, rewritten paths, any page **without an H1**,
and any base path baked into JS. Those are findings worth passing on — a missing
H1 on a route is usually a real bug, not preview noise.

Grouping is derived from the directory structure, which is a decent guess and
only a guess. To group the way a human would think about the site, edit
`.preview/routes.json` and re-run with `--routes .preview/routes.json`.

Add `.preview/` to `.gitignore` — it is build output.

### 4. Publish

The viewer is the Artifact's main page and the site goes underneath it as
supporting files. This is not a style choice: publishing wraps the main file in
its own HTML skeleton, so a full `<html>` document handed over as the main page
nests inside another one. The viewer is written as a fragment for exactly that
reason, and loads the real pages in a same-origin iframe.

`.preview/files.json` is already the publish map — pass its contents as `files`,
with `root` set to `.preview/site` and each key prefixed `site/`.

Give the artifact a real name (two to four words, specific to the site — not
"Preview" or "Website Preview") and a one-sentence description.

### 5. Report

Give them the link, the checks as they actually came out, and anything the
script flagged. If a check failed or a route lost its H1, lead with that — they
opened the preview to find problems, and finding them for free is the point.

## Details worth knowing

**Width toggles resize the iframe.** Media queries respond correctly, which
makes this genuinely useful for layout review. User agent, device pixel ratio,
touch behaviour and safe-area insets do not change, so it does not answer "how
does this feel on an iPhone". Say which question you are answering.

**The theme buttons set `data-theme` on the previewed page's `<html>`.** Sites
keyed on that attribute switch instantly; sites keyed only on
`prefers-color-scheme` will not respond, and the OS setting still decides. Worth
mentioning when a site has a dark mode.

**The rail tracks the clicked route, not the frame's location.** Reading
`contentWindow.location` works on the Artifact host but throws under `file://`,
so the last route set is the source of truth and the frame's location only
refines it. Keep that order if you touch the viewer — inverting it silently
breaks local testing.

**Looking before publishing.** One screenshot of `.preview/viewer.html` via
Playwright is worth it, with one caveat: under `file://` the iframe is an opaque
origin, so route highlighting and the theme buttons will look broken there while
working fine once published. Judge layout from the screenshot, not those two.

## Re-running

A preview is worth refreshing after every meaningful change. Rebuild, re-run the
checks, re-run the script, and republish to the **same artifact URL** so the link
the person already has keeps working — a second link for the same site is how
review threads get confusing.
