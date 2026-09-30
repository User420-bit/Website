#!/usr/bin/env node
/**
 * Kachelbild fuer Availably: zwei iPhones nebeneinander auf weissem Grund,
 * mit Schatten. Die App laeuft nur auf dem iPhone, ein Browser-Screenshot wie
 * bei den anderen Referenzen (`scripts/screenshots.mjs`) geht also nicht.
 *
 * Die Bildschirme sind echte Aufnahmen aus dem Simulator und kommen aus dem
 * Nachbar-Repo (`../Availably/docs/vorschau/`). Gezeichnet sind nur die
 * Rahmen, mit denselben Massen wie in `src/components/scenes/AvailablyScene.astro`.
 *
 *   node scripts/kachelbild-availably.mjs
 *
 * Schreibt `src/assets/projekte/availably.png` (3200 x 1800, also 16:9 in
 * doppelter Aufloesung). Browser: Chrome oder Edge aus dem System.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const QUELLE = resolve('../Availably/docs/vorschau')
const ZIEL = 'src/assets/projekte/availably.png'
/** Das Paar aus dem Briefing: Jonas hat „Fokus“ gesetzt, Lea sieht es. */
const BILDER = { jonas: '26-paar-jonas-hell.png', lea: '27-paar-lea-hell.png' }

for (const datei of Object.values(BILDER)) {
  if (!existsSync(resolve(QUELLE, datei))) {
    console.error(`Aufnahme fehlt: ${resolve(QUELLE, datei)}`)
    process.exit(1)
  }
}
const url = (datei) => pathToFileURL(resolve(QUELLE, datei)).href

const geraet = (wer) => `
  <div class="geraet ${wer}">
    <div class="iphone">
      <span class="taste aktion"></span><span class="taste lauter"></span>
      <span class="taste leiser"></span><span class="taste seite"></span>
      <span class="kamerasteuerung"></span>
      <div class="glas"><img src="${url(BILDER[wer])}" alt="" /></div>
    </div>
  </div>`

const html = `<!doctype html>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1600px; height: 900px; overflow: hidden; background: #fff; }
  /* Die iPhones sind hoeher als das Bild und laufen unten heraus: So bleiben sie
     in der kleinen Kachel lesbar. */
  .paar { --w: 500px; display: flex; justify-content: center; gap: 150px; padding-top: 96px; }
  .geraet { perspective: 2600px; }
  .jonas { perspective-origin: 130% 30%; --dreh: 9deg;
    --rand: #b8a08b; --rand-hell: #e2d1c1; --rand-dunkel: #7b6858; }
  .lea { perspective-origin: -30% 30%; --dreh: -9deg;
    --rand: #b2ada5; --rand-hell: #dcd8d1; --rand-dunkel: #75706a; }
  .iphone {
    position: relative; width: var(--w); height: calc(var(--w) * 2.0896);
    padding: calc(var(--w) * 0.014); border-radius: calc(var(--w) * 0.179);
    background: linear-gradient(90deg, var(--rand-dunkel), var(--rand-hell) 1.2%, var(--rand) 3%,
      var(--rand) 97%, var(--rand-hell) 98.8%, var(--rand-dunkel)), var(--rand);
    transform: rotateY(var(--dreh));
    filter: drop-shadow(0 6px 10px rgb(20 16 12 / 0.16)) drop-shadow(0 50px 70px rgb(20 16 12 / 0.22));
  }
  .taste, .kamerasteuerung { position: absolute; width: calc(var(--w) * 0.016); border-radius: calc(var(--w) * 0.01); }
  .taste { z-index: -1; background: linear-gradient(90deg, var(--rand-dunkel), var(--rand-hell) 45%, var(--rand)); }
  .aktion, .lauter, .leiser { left: calc(var(--w) * -0.012); }
  .aktion { top: 18.5%; height: 5.2%; }
  .lauter { top: 26.5%; height: 9%; }
  .leiser { top: 37.5%; height: 9%; }
  .seite { right: calc(var(--w) * -0.012); top: 28%; height: 14%; }
  .kamerasteuerung { right: 0; top: 57%; height: 10.5%; background: linear-gradient(90deg, #2c2c2e, #6e6e73 55%, #3a3a3c); }
  .glas { height: 100%; padding: calc(var(--w) * 0.022); border-radius: calc(var(--w) * 0.165); background: #0a0a0b; }
  .glas img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: calc(var(--w) * 0.143); }
</style>
<div class="paar">${geraet('jonas')}${geraet('lea')}</div>`

const browser = await (async () => {
  for (const channel of ['chrome', 'msedge', undefined]) {
    try {
      return await chromium.launch({ headless: true, ...(channel ? { channel } : {}) })
    } catch {
      // naechsten Browser versuchen
    }
  }
  console.error('Kein Browser gefunden: Chrome oder Edge installieren.')
  process.exit(1)
})()

const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
})
// Eine leere Datei als Seite, damit die Aufnahmen per file:// geladen werden duerfen.
await page.goto(pathToFileURL(resolve('scripts/kachelbild-availably.mjs')).href)
await page.setContent(html, { waitUntil: 'load' })
await page.screenshot({ path: ZIEL })
await browser.close()
console.log(`Geschrieben: ${ZIEL}`)
