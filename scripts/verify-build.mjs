#!/usr/bin/env node
/**
 * Smoke-Test gegen `dist/`, ohne Browser.
 *
 * Prueft die Akzeptanzkriterien aus dem Rework-Plan, die sich am gebauten
 * HTML festmachen lassen: Jede Route existiert als eigene Datei (auf einer
 * statischen Seite ist das die Entsprechung von "antwortet mit 200"), traegt
 * genau eine H1 mit dem erwarteten Text, hat Title/Description/Canonical, und
 * kein interner Link zeigt ins Leere.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const BASE = '/'

/**
 * Projektrouten kommen aus dem Content, nicht aus einer Liste hier: Jede Datei
 * in `src/content/projekte/` muss als Seite gebaut sein und ihren `title` als
 * H1 tragen. Sonst veraltet diese Pruefung mit dem naechsten Projekt.
 */
const PROJEKTE_DIR = 'src/content/projekte'
const projektRouten = Object.fromEntries(
  readdirSync(PROJEKTE_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const title = readFileSync(join(PROJEKTE_DIR, name), 'utf8').match(/^title:\s*(.+)$/m)?.[1]
      return [`projekte/${name.replace(/\.md$/, '')}`, title?.trim()]
    }),
)

/** Route -> erwartete H1. */
const ROUTES = {
  '': 'Kleine Software, klar gebaut.',
  impressum: 'Impressum',
  datenschutz: 'Datenschutzerklärung',
  ...projektRouten,
}

const errors = []
const pages = new Map()

const fail = (message) => errors.push(message)

for (const [route, expectedH1] of Object.entries(ROUTES)) {
  const file = join(DIST, route, 'index.html')
  if (!existsSync(file)) {
    fail(`Route /${route} fehlt: ${file} wurde nicht gebaut`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  pages.set(route, html)

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  )
  if (h1s.length !== 1) fail(`/${route}: erwartet genau eine H1, gefunden ${h1s.length}`)
  else if (h1s[0] !== expectedH1) fail(`/${route}: H1 ist "${h1s[0]}", erwartet "${expectedH1}"`)

  for (const [tag, pattern] of [
    ['<title>', /<title>[^<]+<\/title>/],
    ['meta description', /<meta name="description" content="[^"]+"/],
    ['canonical', /<link rel="canonical" href="[^"]+"/],
    ['og:title', /<meta property="og:title" content="[^"]+"/],
  ]) {
    if (!pattern.test(html)) fail(`/${route}: ${tag} fehlt`)
  }

  if (/\[[A-ZÄÖÜ][^\]]*\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    fail(`/${route}: sieht nach einem Platzhalter in eckigen Klammern aus`)
  }
}

if (!existsSync(join(DIST, '404.html'))) fail('404.html fehlt')
if (!existsSync(join(DIST, 'sitemap-index.xml'))) fail('sitemap-index.xml fehlt')
if (!existsSync(join(DIST, 'robots.txt'))) fail('robots.txt fehlt')

// Interne Links: jeder muss auf eine gebaute Datei oder einen Anker zeigen.
for (const [route, html] of pages) {
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
  for (const link of links) {
    if (!link.startsWith(BASE)) continue
    const [path, hash] = link.slice(BASE.length).split('#')
    if (path === '' && hash) {
      // Anker auf die Startseite.
      if (!pages.get('')?.includes(`id="${hash}"`)) fail(`/${route}: Anker #${hash} existiert nicht`)
      continue
    }
    const clean = path.replace(/\/$/, '')
    const asFile = join(DIST, clean)
    const asDir = join(DIST, clean, 'index.html')
    if (!existsSync(asFile) && !existsSync(asDir)) {
      fail(`/${route}: interner Link ${link} zeigt ins Leere`)
    }
  }
}

// Nichts darf mehr JavaScript nachladen: Ziel aus Plan 2.2 ist 0 KB.
for (const [route, html] of pages) {
  const external = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1])
  if (external.length > 0) {
    fail(`/${route}: laedt externes JavaScript (${external.join(', ')})`)
  }
}

if (errors.length > 0) {
  console.error('\nBuild-Pruefung fehlgeschlagen:\n')
  for (const error of errors) console.error(`  - ${error}`)
  console.error('')
  process.exit(1)
}

console.log(`Build-Pruefung bestanden: ${pages.size} Routen, keine toten internen Links.`)
