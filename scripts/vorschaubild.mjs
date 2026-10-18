#!/usr/bin/env node
/**
 * Vorschaubild für geteilte Links (LinkedIn, WhatsApp, Suchtreffer): 1200 x 630,
 * typografisch in Hausschrift und Hausfarben. Wortmarke, Claim mit dem orangen
 * Strich aus dem Hero, darunter Leistungen und Ort. Ein Logo gibt es noch nicht;
 * kommt es, gehört es oben links an die Stelle der Wortmarke.
 *
 *   npm run vorschaubild
 *
 * Schreibt `public/vorschaubild.png` und den Stand der Texte nach
 * `scripts/vorschaubild.stand.json`. Beides wird committet. Browser: das
 * Chromium von Playwright, sonst Chrome oder Edge aus dem System; ein anderer
 * Pfad geht über `BROWSER=/pfad/zu/chrome`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
import { STAND, ZIEL, standText, vorschaubildTexte } from './vorschaubild-text.mjs'

const texte = vorschaubildTexte()
const schrift = pathToFileURL(resolve('src/assets/fonts/InstrumentSans-Variable.woff2')).href
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// Farben wie die Tokens in `src/styles/global.css` (helles Schema).
const html = `<!doctype html>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Instrument Sans'; src: url('${schrift}') format('woff2'); font-weight: 400 700; }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 64px 80px 60px;
    display: flex; flex-direction: column;
    font-family: 'Instrument Sans', sans-serif;
    background: oklch(0.99 0.002 80); color: oklch(0.17 0.006 80);
  }
  .kopf { display: flex; justify-content: space-between; align-items: baseline;
    padding-bottom: 22px; border-bottom: 1px solid oklch(0.87 0.005 80); }
  .marke { font-size: 40px; font-weight: 600; letter-spacing: -0.02em; }
  .domain { font-size: 24px; color: oklch(0.4 0.01 80); }
  .claim { margin-top: auto; font-size: 96px; font-weight: 600; line-height: 1.02;
    letter-spacing: -0.03em; max-width: 15ch; text-wrap: balance; }
  .strich { width: 132px; height: 7px; margin-top: 30px; background: oklch(0.5 0.17 50); }
  .fuss { margin-top: auto; font-size: 30px; line-height: 1.35; }
  .fuss span { display: block; color: oklch(0.4 0.01 80); font-size: 26px; }
</style>
<div class="kopf"><span class="marke">${escape(texte.name)}</span><span class="domain">${escape(texte.domain)}</span></div>
<p class="claim">${escape(texte.claim)}</p>
<div class="strich"></div>
<p class="fuss">${escape(texte.leistungen)}<span>${escape(texte.ort)}</span></p>`

const versuche = [
  ...(process.env.BROWSER ? [{ executablePath: process.env.BROWSER }] : []),
  {},
  { channel: 'chrome' },
  { channel: 'msedge' },
]
let browser
for (const optionen of versuche) {
  try {
    browser = await chromium.launch({ headless: true, ...optionen })
    break
  } catch {
    // nächsten Browser versuchen
  }
}
if (!browser) {
  console.error('Kein Browser gefunden: Chrome oder Edge installieren, oder BROWSER=/pfad setzen.')
  process.exit(1)
}

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
// Eine Datei als Seite, damit die Schrift per file:// geladen werden darf.
await page.goto(pathToFileURL(resolve('scripts/vorschaubild.mjs')).href)
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const fehlt = await page.evaluate(() => !document.fonts.check("600 96px 'Instrument Sans'"))
if (fehlt) {
  console.error('Hausschrift nicht geladen, Bild nicht geschrieben.')
  process.exit(1)
}
await page.screenshot({ path: ZIEL })
await browser.close()

writeFileSync(STAND, standText(texte))
console.log(
  `Geschrieben: ${ZIEL} (${Math.round(readFileSync(ZIEL).length / 1024)} KB) und ${STAND}`,
)
