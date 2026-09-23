#!/usr/bin/env node
/**
 * Screenshots der Referenzen, als Quelle fuer `screenshots:` in
 * `src/content/projekte/<slug>.md`.
 *
 * Jedes Projekt bekommt eine Aufnahme unter `src/assets/projekte/<slug>.png`.
 * Die Quelle ist die `live`-URL aus der Projektdatei; Projekte ohne
 * oeffentliche Adresse koennen in LOKALE_QUELLEN auf ein gebautes
 * Verzeichnis im Nachbar-Repo zeigen, das dann kurz ueber einen eigenen
 * Static-Server laeuft. Was keine Quelle hat, wird gemeldet, nicht erfunden.
 *
 *   npm run screenshots                     alle Projekte mit Quelle
 *   npm run screenshots -- tiefgang         nur dieses Projekt
 *   npm run screenshots -- --url kleinkram=http://localhost:3000
 *                                           lokalen Dev-Server als Quelle nehmen
 *
 * Das Skript schreibt nur Bilder. Den Eintrag in der Projektdatei (Bild und
 * Bildunterschrift) setzt ein Mensch, weil die Unterschrift Inhalt ist; der
 * passende YAML-Block wird am Ende ausgegeben, wenn er noch fehlt.
 *
 * Browser: das von Playwright gebuendelte Chromium, sonst Edge oder Chrome
 * aus dem System (`channel`), damit kein 150-MB-Download noetig ist.
 */
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PROJEKTE_DIR = 'src/content/projekte'
const OUT_DIR = 'src/assets/projekte'
/** 16:9, wie die Feature-Zeile es zeigt; Astro rechnet daraus 480 und 960 px WebP. */
const VIEWPORT = { width: 1600, height: 900 }
/** Ruhe nach dem Laden, damit Canvas-Spiele und Einblendungen ihren ersten Stand haben. */
const SETTLE_MS = 2000

/**
 * Ergaenzungen je Projekt, wenn die `live`-URL allein nicht reicht:
 *   dir      gebautes Verzeichnis im Nachbar-Repo (relativ zu diesem Repo), wenn es
 *            keine oeffentliche Adresse gibt; fehlt es, wird das Projekt gemeldet
 *   klick    Playwright-Selektor, der nach dem Laden angeklickt wird, etwa ein Gastzugang,
 *            damit das Bild die Anwendung zeigt und nicht ihr Login
 *   hinweis  Zusatz fuer die Meldung, wenn die Quelle fehlt
 */
const QUELLEN = {
  pointcare: { dir: '../PointCare/dist', hinweis: 'vorher `npm run build` im PointCare-Repo' },
  memorytree: { klick: 'text=Als Gast ansehen' },
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

/** `--url slug=http://…` und nackte Slugs aus der Kommandozeile. */
function parseArgs(argv) {
  const urls = {}
  const slugs = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--url') {
      const [slug, ...rest] = (argv[++i] ?? '').split('=')
      if (!slug || rest.length === 0) throw new Error('--url erwartet slug=URL')
      urls[slug] = rest.join('=')
    } else if (argv[i].startsWith('--')) {
      throw new Error(`Unbekannte Option ${argv[i]}`)
    } else {
      slugs.push(argv[i])
    }
  }
  return { urls, slugs }
}

/** Nur `title` und `live` aus dem Frontmatter; mehr braucht die Aufnahme nicht. */
function leseProjekte() {
  return (
    readdirSync(PROJEKTE_DIR)
      // `._*`: AppleDouble-Dateien von macOS auf exFAT, kein Content.
      .filter((name) => name.endsWith('.md') && !name.startsWith('._'))
      .map((name) => {
        // CRLF normalisieren, sonst findet die Frontmatter-Suche auf Windows nichts.
        const text = readFileSync(join(PROJEKTE_DIR, name), 'utf8').replace(/\r\n/g, '\n')
        const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
        const feld = (key) => frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim()
        const live = feld('live')
        return {
          slug: name.replace(/\.md$/, ''),
          title: feld('title') ?? name,
          live: live && live !== 'null' ? live : null,
          text,
        }
      })
      .sort((a, b) => a.slug.localeCompare(b.slug))
  )
}

/** Winziger Static-Server fuer ein gebautes Verzeichnis, nur fuer die Dauer der Aufnahme. */
function serveVerzeichnis(dir) {
  const root = resolve(dir)
  const server = createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let file = join(root, pathname)
    if (!file.startsWith(root)) {
      res.writeHead(403).end()
      return
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    if (!existsSync(file)) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => {
      resolveServer({
        url: `http://127.0.0.1:${server.address().port}/`,
        close: () => server.close(),
      })
    })
  })
}

/** Gebuendeltes Chromium, sonst Edge, sonst Chrome. */
async function starteBrowser() {
  const versuche = [
    { name: 'Chromium (Playwright)', options: {} },
    { name: 'Microsoft Edge', options: { channel: 'msedge' } },
    { name: 'Google Chrome', options: { channel: 'chrome' } },
  ]
  const fehler = []
  for (const { name, options } of versuche) {
    try {
      const browser = await chromium.launch({ headless: true, ...options })
      return { browser, name }
    } catch (error) {
      fehler.push(`${name}: ${error.message.split('\n')[0]}`)
    }
  }
  throw new Error(
    `Kein Browser gefunden.\n  ${fehler.join('\n  ')}\n` +
      'Entweder Edge/Chrome installieren oder `npx playwright install chromium`.',
  )
}

async function aufnehmen(browser, url, datei, klick) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'de-DE',
    // Einblendungen und Scroll-Effekte sollen ihren Endzustand zeigen, nicht Frame 3.
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  try {
    // networkidle scheitert bei Seiten mit Dauerverbindung (Service Worker, Polling);
    // dann reicht `load` plus Ruhezeit.
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 }).catch(async () => {
      await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
    })
    if (klick) {
      await page.click(klick)
      await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => {})
    }
    await page.waitForTimeout(SETTLE_MS)
    await page.screenshot({ path: datei, type: 'png' })
  } finally {
    await context.close()
  }
}

async function main() {
  const { urls, slugs } = parseArgs(process.argv.slice(2))
  const alle = leseProjekte()
  const unbekannt = slugs.filter((slug) => !alle.some((p) => p.slug === slug))
  if (unbekannt.length > 0) throw new Error(`Kein Projekt: ${unbekannt.join(', ')}`)
  const projekte = slugs.length > 0 ? alle.filter((p) => slugs.includes(p.slug)) : alle

  mkdirSync(OUT_DIR, { recursive: true })
  const { browser, name } = await starteBrowser()
  console.log(`Browser: ${name}\n`)

  const ergebnis = { aufgenommen: [], uebersprungen: [], fehlgeschlagen: [] }
  try {
    for (const projekt of projekte) {
      const datei = join(OUT_DIR, `${projekt.slug}.png`)
      const extra = QUELLEN[projekt.slug] ?? {}
      let quelle = urls[projekt.slug] ?? projekt.live
      let server = null

      if (!quelle && extra.dir) {
        if (existsSync(extra.dir)) {
          server = await serveVerzeichnis(extra.dir)
          quelle = server.url
        } else {
          ergebnis.uebersprungen.push(
            `${projekt.title}: ${extra.dir} fehlt${extra.hinweis ? ` (${extra.hinweis})` : ''}`,
          )
          continue
        }
      }
      if (!quelle) {
        ergebnis.uebersprungen.push(
          `${projekt.title}: keine Quelle. \`live\` ist null und kein \`dir\` in QUELLEN.`,
        )
        continue
      }

      process.stdout.write(`${projekt.title} <- ${quelle} ... `)
      try {
        await aufnehmen(browser, quelle, datei, extra.klick)
        const kb = Math.round(statSync(datei).size / 1024)
        console.log(`${datei} (${kb} KB)`)
        ergebnis.aufgenommen.push({ ...projekt, datei })
      } catch (error) {
        console.log('fehlgeschlagen')
        ergebnis.fehlgeschlagen.push(`${projekt.title}: ${error.message.split('\n')[0]}`)
      } finally {
        server?.close()
      }
    }
  } finally {
    await browser.close()
  }

  const drucke = (titel, zeilen) => {
    if (zeilen.length === 0) return
    console.log(`\n${titel}`)
    for (const zeile of zeilen) console.log(`  - ${zeile}`)
  }
  drucke('Uebersprungen', ergebnis.uebersprungen)
  drucke('Fehlgeschlagen', ergebnis.fehlgeschlagen)

  // Der Eintrag in der Projektdatei bleibt Handarbeit: die Unterschrift ist Inhalt.
  const ohneEintrag = ergebnis.aufgenommen.filter(
    (p) => !p.text.includes(`assets/projekte/${p.slug}.png`),
  )
  if (ohneEintrag.length > 0) {
    console.log('\nNoch nicht in der Projektdatei eingetragen. Vorlage fuer das Frontmatter:')
    for (const p of ohneEintrag) {
      console.log(`\n  # ${PROJEKTE_DIR}/${p.slug}.md`)
      console.log('  screenshots:')
      console.log(`    - image: ../../assets/projekte/${p.slug}.png`)
      console.log(`      caption: ${p.title} - was das Bild zeigt`)
    }
  }

  process.exitCode = ergebnis.fehlgeschlagen.length > 0 ? 1 : 0
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
