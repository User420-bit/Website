/**
 * Baut aus dem Astro-Build die eine CSS-Datei, die der Konverter als
 * `cssEntry` liest.
 *
 * Warum es diesen Schritt gibt: Astro legt die Schrift NICHT in die
 * kompilierte Stylesheet-Datei. Die `@font-face`-Regeln und `--font-klartext`
 * stehen in einem `<style>`-Block im `<head>` jeder Seite. Nur das Stylesheet
 * hochzuladen hiesse: `--font-klartext` ist undefiniert, `--font-sans` faellt
 * auf `ui-sans-serif` zurueck, und jeder Entwurf saehe in der Systemschrift
 * aus statt in Instrument Sans.
 *
 * Ausserdem traegt der Astro-Build Hashes im Dateinamen (`BaseLayout.*.css`)
 * und im Schriftnamen (`Instrument Sans-<hash>`). Beide wechseln bei jedem
 * Build, deshalb sucht dieses Skript die Dateien statt sie zu benennen, und
 * setzt den Schriftnamen auf den lesbaren Familiennamen zurueck.
 *
 *   npm run build && node .design-sync/prep.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'

const DIST = 'dist'
const OUT = '.design-sync/.cache'

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('[PREP] dist/ fehlt — zuerst `npm run build` ausfuehren.')
  process.exit(1)
}

// 1. Schrift-Block aus dem <head> holen (Astro Fonts API rendert ihn inline).
const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const blocks = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1])
const fontBlock = blocks.find((b) => b.includes('@font-face'))
if (!fontBlock) {
  console.error('[PREP] kein @font-face im <head> gefunden — Astro-Fonts-Ausgabe geaendert?')
  process.exit(1)
}

// 2. Gehashte Familiennamen auf lesbare Namen zuruecksetzen. Laengster Treffer
//    zuerst, sonst zerschneidet die kurze Ersetzung den Fallback-Namen.
let css = fontBlock
const families = [...new Set([...css.matchAll(/Instrument Sans-[0-9a-f]+(?: fallback: [A-Za-z]+)?/g)].map((m) => m[0]))]
  .sort((a, b) => b.length - a.length)
for (const fam of families) {
  css = css.split(fam).join(fam.includes('fallback') ? 'Instrument Sans Fallback' : 'Instrument Sans')
}

// 2b. Den metrisch angepassten Arial-Ersatz entfernen. Er hat kein `url()`,
//     sondern nur `local("Arial")` — der Konverter kann solche Regeln nicht in
//     `fonts/fonts.css` uebernehmen (extractFonts braucht eine Datei zum
//     Kopieren). Bliebe die Familie in `--font-klartext` stehen, zeigte das
//     Token auf eine Familie, die es im Bundle nicht gibt. Der Ersatz
//     verhindert nur den Layout-Sprung waehrend die Schrift laedt; in einem
//     Entwurf faellt das nicht an.
css = css.replace(/@font-face\{[^}]*Instrument Sans Fallback[^}]*\}/g, '')
css = css.replace(/"Instrument Sans Fallback",/g, '')

// 3. Schriftdatei neben die CSS legen und die url() darauf zeigen lassen.
//    extractFonts() im Konverter loest url() relativ zum CSS-Verzeichnis auf.
const fontsDir = join(DIST, '_astro', 'fonts')
mkdirSync(join(OUT, 'fonts'), { recursive: true })
let copied = 0
for (const f of readdirSync(fontsDir)) {
  if (!/\.(woff2?|ttf|otf)$/.test(f)) continue
  cpSync(join(fontsDir, f), join(OUT, 'fonts', 'InstrumentSans-Variable.woff2'))
  css = css.split(`/_astro/fonts/${basename(f)}`).join('./fonts/InstrumentSans-Variable.woff2')
  copied++
}
if (copied !== 1) {
  console.error(`[PREP] erwartet: genau eine Schriftdatei, gefunden: ${copied}`)
  process.exit(1)
}

// 4. Kompiliertes Tailwind-Stylesheet anhaengen (aufgeloeste Tokens + Utilities).
const cssFiles = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css'))
if (!cssFiles.length) {
  console.error('[PREP] kein kompiliertes Stylesheet in dist/_astro/ gefunden.')
  process.exit(1)
}
for (const f of cssFiles.sort()) {
  css += `\n/* ${f} */\n` + readFileSync(join(DIST, '_astro', f), 'utf8')
}

writeFileSync(join(OUT, 'klartext.css'), css)
console.error(`[PREP] .design-sync/.cache/klartext.css — ${families.length} Schriftfamilien, ${cssFiles.length} Stylesheet(s), ${(css.length / 1024).toFixed(0)} KB`)
