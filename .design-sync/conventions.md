## Klartext — nur Gestaltungsebene, keine Komponenten

Klartext ist eine Astro-Seite. Ihre Bausteine sind `.astro`-Dateien, die beim
Bauen zu HTML werden; es gibt keine React-Komponenten zum Einbinden.
**`window.Klartext` ist leer — such dort nicht nach Bausteinen.** Was dieses
System liefert, ist die Gestaltungsebene: Farben, Schrift, Radien, Bewegung
und ein paar benannte Klassen. Bau die Oberflaeche aus eigenen Elementen und
kleide sie in diese Tokens.

**Wo die Wahrheit steht:** `styles.css` (laedt `fonts/fonts.css` und
`_ds_bundle.css` — dort stehen alle Tokens und Klassen) und
`guidelines/DESIGN.md`, die vollstaendige Gestaltungsvorschrift.

### Einrichtung

Kein Provider, kein Theme-Objekt. `styles.css` einbinden, fertig: `body` bekommt
Grund- und Schriftfarbe, `font-family` und geglaettete Kanten von selbst.
Der Farbmodus folgt der Systemeinstellung (`prefers-color-scheme`); zum
Erzwingen `data-theme="dark"` oder `data-theme="light"` auf `<html>` setzen.
**Schreib nie eine Farbe fest** — alle Tokens kippen im dunklen Modus mit.

### Idiom: CSS-Variablen, nicht Utility-Klassen

Style ueber `var(--*)`. Das ist der verlaessliche Weg, weil das mitgelieferte
Stylesheet auf den Bestand der Website zurechtgeschnitten ist.

| Zweck    | Token                                                                                              |
| -------- | -------------------------------------------------------------------------------------------------- |
| Flaechen | `--color-bg` (Papier), `--color-bg-elevated` (nur Codeblock)                                       |
| Text     | `--color-fg` (Tinte), `--color-fg-muted` (Bleistift)                                               |
| Signal   | `--color-accent` (Orange), `--color-accent-fg` (Schrift darauf)                                    |
| Linien   | `--color-border`                                                                                   |
| Schrift  | `--font-sans`, `--font-mono`                                                                       |
| Radien   | `--radius-sm` (4 px), `--radius-lg` (12 px)                                                        |
| Bewegung | `--ease-quiet`, `--duration-fast` (120 ms), `--duration-base` (200 ms), `--duration-slow` (320 ms) |

Ein `--radius-md` gibt es **nicht**, obwohl DESIGN.md es nennt: die Seite
benutzt es nirgends, also steht es nicht im gebauten Stylesheet.

**Tailwind-Klassen nur aus dieser Liste.** Das Stylesheet ist gebaut, nicht
generiert — es enthaelt ausschliesslich, was die Website selbst verwendet.
Alles andere (`bg-fg`, `rounded-md`, `text-border`, beliebige Abstaende) faellt
still ins Leere. Vorhanden sind: `bg-bg`, `bg-bg-elevated`, `bg-accent`,
`bg-accent/10`, `text-fg`, `text-fg-muted`, `text-accent`, `text-accent-fg`,
`border-border`, `border-fg`, `border-fg/25`, `border-accent/50`,
`decoration-border`, `rounded-sm`, `rounded-lg`, `ease-quiet`.

**Benannte Klassen** aus dem System: `.display` (grosse Ueberschrift, eng
gesetzt), `.prose-flow` (Silbentrennung auf schmalen Spalten), `.row-title`
(Unterstrich zieht beim Hover der ganzen Zeile auf, zusammen mit `.group`),
`.disclosure` und `.disclosure-mark` (Aufklapper, Plus wird Minus),
`.site-header`, `.nav-link` (aktiv ueber `aria-current="true"`).

### Gestaltungsregeln, die das Ergebnis tragen

Flach, ohne Ausnahme: kein Schatten, kein Glow, keine Transluzenz. Ordnung
entsteht aus Haarlinien — `--color-border` fuer Zeilen und Bloecke,
`--color-fg` als Kapitellinie ueber einer Sektion. Genau ein Akzent auf der
Seite; Orange ist ein Signal, keine Dekoration. Eine zentrierte Spalte von
64rem mit 1rem Rand, Fliesstext bei 65ch. Listen sind linierte Zeilen, keine
Kaesten. Umbruchpunkte 640 px und 1024 px. Der Fokusring ist bereits gesetzt
(2 px `--color-accent`, 2 px Abstand) — nimm ihn nicht weg.

### Beispiel

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
