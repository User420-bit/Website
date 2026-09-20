## Klartext — design layer only, no components

Klartext is an Astro site. Its building blocks are `.astro` files that compile
to HTML at build time; there are no React components to import.
**`window.Klartext` is empty — don't look there for building blocks.** What
this system ships is the design layer: colors, type, radii, motion, and a
handful of named classes. Build the surface from your own elements and dress
it in these tokens.

The site is in German. Write German copy unless asked otherwise.

**Where the truth lives:** `styles.css` (it loads `fonts/fonts.css` and
`_ds_bundle.css`, which hold every token and class) and `guidelines/DESIGN.md`,
the full design specification — that one is written in German.

### Setup

No provider, no theme object. Include `styles.css` and you're done: `body`
picks up its background, text color, `font-family` and smoothing on its own.
Color mode follows the system setting (`prefers-color-scheme`); to force it,
set `data-theme="dark"` or `data-theme="light"` on `<html>`.
**Never hardcode a color** — every token flips with the mode.

### The idiom: CSS variables, not utility classes

Style through `var(--*)`. That is the reliable path, because the bundled
stylesheet is cut down to what the website itself uses.

| Purpose  | Token                                                                                              |
| -------- | -------------------------------------------------------------------------------------------------- |
| Surfaces | `--color-bg` (paper), `--color-bg-elevated` (code block only)                                      |
| Text     | `--color-fg` (ink), `--color-fg-muted` (pencil)                                                    |
| Signal   | `--color-accent` (orange), `--color-accent-fg` (text on it)                                        |
| Rules    | `--color-border`                                                                                   |
| Type     | `--font-sans`, `--font-mono`                                                                       |
| Radii    | `--radius-sm` (4 px), `--radius-lg` (12 px)                                                        |
| Motion   | `--ease-quiet`, `--duration-fast` (120 ms), `--duration-base` (200 ms), `--duration-slow` (320 ms) |

There is **no** `--radius-md`, even though DESIGN.md names one: the site never
uses it, so it isn't in the built stylesheet.

**Tailwind classes only from this list.** The stylesheet is built, not
generated — it contains exactly what the website uses and nothing else.
Anything else (`bg-fg`, `rounded-md`, `text-border`, arbitrary spacing) fails
silently. Available: `bg-bg`, `bg-bg-elevated`, `bg-accent`, `bg-accent/10`,
`text-fg`, `text-fg-muted`, `text-accent`, `text-accent-fg`, `border-border`,
`border-fg`, `border-fg/25`, `border-accent/50`, `decoration-border`,
`rounded-sm`, `rounded-lg`, `ease-quiet`.

**Named classes** the system ships: `.display` (large heading, tightly set),
`.prose-flow` (hyphenation on narrow columns), `.row-title` (underline wipes in
when the whole row is hovered, pair it with `.group`), `.disclosure` and
`.disclosure-mark` (expander, plus turns into minus), `.site-header`,
`.nav-link` (active via `aria-current="true"`).

### The rules that carry the result

Flat, without exception: no shadow, no glow, no translucency. Order comes from
hairlines — `--color-border` for rows and blocks, `--color-fg` as the chapter
rule above a section. Exactly one accent on the page; orange is a signal, not
decoration. A single centered column of 64rem with 1rem of side padding, body
text at 65ch. Lists are ruled rows, not boxes. Breakpoints at 640 px and
1024 px. The focus ring is already set (2 px `--color-accent`, 2 px offset) —
don't remove it.

### Example

```html
<section style="border-top:1px solid var(--color-fg); padding:4rem 1rem">
  <div style="max-width:64rem; margin-inline:auto">
    <h2 class="display" style="font-size:2.25rem; margin:0">Arbeiten</h2>
    <p style="max-width:65ch; color:var(--color-fg-muted); margin:1rem 0 0">
      Ausgewaehlte Projekte, in Zeilen statt in Kacheln.
    </p>
    <a
      class="row-title group"
      href="/projekte/"
      style="display:inline-block; margin-top:2.5rem; color:var(--color-fg)"
    >
      Alle Projekte
    </a>
  </div>
</section>
```
