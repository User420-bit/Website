#!/usr/bin/env node
/**
 * Schreibt `docs/ARCHITEKTUR.md`: wie die Website gebaut ist und was über die
 * Architektur jedes Projekts bekannt ist.
 *
 * Nichts davon steht hier als Liste. Projekte, Stack, Entscheidungen, Seiten,
 * Bühnen, Routen, Collections und CI-Schritte liest das Skript aus dem Code
 * und den Projektdateien. Von Hand gepflegt ist nur der Rahmentext unten.
 *
 *   node scripts/architektur.mjs           schreibt die Datei neu
 *   node scripts/architektur.mjs --check   bricht ab, wenn sie veraltet ist (CI)
 *
 * Keine Daten aus der Git-Historie: CI checkt flach aus, und das Dokument wäre
 * dort ein anderes als lokal.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import * as prettier from 'prettier'
import { parse } from 'yaml'

const ZIEL = 'docs/ARCHITEKTUR.md'
const PROJEKTE_DIR = 'src/content/projekte'
const SEITEN_DIR = 'src/components/projekte'
const SZENEN_DIR = 'src/components/scenes'
const AUFNAHMEN_DIR = 'public/aufnahmen'

/**
 * Das Diagramm unten nennt diese Dateien beim Namen. Fehlt eine, ist der
 * Rahmentext veraltet; dann lieber abbrechen als Falsches schreiben.
 */
const TRAGENDE_DATEIEN = [
  'src/content.config.ts',
  'src/pages/projekte/[slug].astro',
  'src/pages/projekte/index.astro',
  'src/pages/index.astro',
  `${SEITEN_DIR}/index.ts`,
  'src/components/ProjectPage.astro',
  'src/components/ProjectScene.astro',
]

const lies = (pfad) => readFileSync(pfad, 'utf8')
// `._<name>`: AppleDouble-Dateien von macOS auf exFAT, kein Inhalt.
const dateien = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((name) => !name.startsWith('._'))
        .sort()
    : []

for (const pfad of TRAGENDE_DATEIEN) {
  if (!existsSync(pfad)) {
    console.error(`${pfad} fehlt. Den Rahmentext in scripts/architektur.mjs anpassen.`)
    process.exit(1)
  }
}

/**
 * Text aus den Projektdateien als Markdown, das genau diesen Text zeigt:
 * `__proto__` darf nicht fett werden, `<x>` kein HTML.
 */
const md = (text) =>
  String(text)
    .replace(/[\\`*_]/g, '\\$&')
    .replace(/</g, '&lt;')

/** Zelle einer Markdown-Tabelle: kein Umbruch, kein ungeschützter Strich. */
const zelle = (text) =>
  md(text)
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\|/g, '\\|')

/** Anker, den GitHub aus einer Überschrift macht: „Feynman-Prototyp“ → `feynman-prototyp`. */
const anker = (titel) =>
  titel
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-')

/** Wie `firstSentence` in `src/lib/site.ts`; die Karte zeigt denselben Satz. */
const ersterSatz = (text) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text

/** `KIND_LABELS` aus `src/lib/site.ts`, damit die Bezeichnungen der Seite gelten. */
const ARTEN = Object.fromEntries(
  [
    ...(lies('src/lib/site.ts').match(/KIND_LABELS[^{]*\{([^}]*)\}/)?.[1] ?? '').matchAll(
      /'?([\w-]+)'?:\s*'([^']+)'/g,
    ),
  ].map(([, schluessel, label]) => [schluessel, label]),
)

const code = (text) => `\`${text}\``

// --- Projekte ---------------------------------------------------------------

const projekte = dateien(PROJEKTE_DIR)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const slug = name.replace(/\.md$/, '')
    const frontmatter = lies(join(PROJEKTE_DIR, name)).match(/^---\n([\s\S]*?)\n---/)?.[1]
    if (!frontmatter) throw new Error(`${PROJEKTE_DIR}/${name}: kein Frontmatter`)
    const data = parse(frontmatter)
    return {
      slug,
      datei: `${PROJEKTE_DIR}/${name}`,
      title: data.title,
      summary: data.summary,
      techStack: data.techStack ?? [],
      kind: data.kind,
      period: data.period,
      status: data.status ?? null,
      live: data.live ?? null,
      engineering: data.engineering ?? [],
      screenshots: (data.screenshots ?? []).length,
      codeExample: data.codeExample ? data.codeExample.language : null,
      order: data.order,
      published: data.published !== false,
    }
  })
  .sort((a, b) => a.order - b.order)

/** Slug → Seitenkomponente, aus der Registry statt aus einer Liste hier. */
const registry = lies(`${SEITEN_DIR}/index.ts`)
const importe = Object.fromEntries(
  [...registry.matchAll(/^import (\w+) from '\.\/([\w.-]+\.astro)'/gm)].map(([, name, datei]) => [
    name,
    `${SEITEN_DIR}/${datei}`,
  ]),
)
const seiten = Object.fromEntries(
  [...(registry.match(/PAGES = \{([\s\S]*?)\}/)?.[1] ?? '').matchAll(/([\w-]+):\s*(\w+)/g)].map(
    ([, slug, komponente]) => [slug, importe[komponente]],
  ),
)

/** Eigene Importe einer `.astro`- oder `.ts`-Datei als Pfade im Repo. */
function eigeneImporte(datei) {
  return [...lies(datei).matchAll(/^import\s[^'"]*?from\s+['"]([^'"]+)['"]/gm)]
    .map(([, ziel]) => ziel)
    .filter((ziel) => ziel.startsWith('@/') || ziel.startsWith('.'))
    .map((ziel) =>
      ziel.startsWith('@/') ? join('src', ziel.slice(2)) : join(dirname(datei), ziel),
    )
    .map((ziel) => (existsSync(ziel) ? ziel : `${ziel}.ts`))
    .filter((ziel) => existsSync(ziel))
}

/**
 * Alles unter `src/components/scenes/`, was die Seite eines Projekts direkt
 * oder über ihre Bühne einbindet. Gemeinsame Bausteine (Button, MetaList …)
 * gehören keinem Projekt und tauchen hier nicht auf.
 */
function szenenDateien(seite) {
  const gesehen = new Set()
  const offen = [seite]
  while (offen.length) {
    for (const ziel of eigeneImporte(offen.pop())) {
      if (!ziel.startsWith(SZENEN_DIR) || gesehen.has(ziel)) continue
      gesehen.add(ziel)
      offen.push(ziel)
    }
  }
  return [...gesehen].sort()
}

/**
 * Technik, die in mehreren Projekten steckt. Gezählt wird der Eintrag in
 * `techStack` ohne Versionsnummer, damit „Next.js 16“ und „Next.js“ eins sind.
 */
const ohneVersion = (eintrag) => eintrag.replace(/\s+\d[\d.]*$/, '')
const verwendung = new Map()
for (const p of projekte) {
  for (const eintrag of new Set(p.techStack.map(ohneVersion))) {
    verwendung.set(eintrag, [...(verwendung.get(eintrag) ?? []), p])
  }
}
const querschnitt = [...verwendung]
  .filter(([, nutzer]) => nutzer.length > 1)
  .sort(([a, x], [b, y]) => y.length - x.length || a.localeCompare(b))

// --- Website ----------------------------------------------------------------

const pkg = JSON.parse(lies('package.json'))

const collections = [
  ...lies('src/content.config.ts').matchAll(
    /const (\w+) = defineCollection\(\{\s*loader: (file|glob)\(([^)]*)\)/g,
  ),
].map(([, name, loader, argumente]) => {
  if (loader === 'file') return { name, quelle: argumente.match(/'([^']+)'/)[1] }
  const pattern = argumente.match(/pattern:\s*'([^']+)'/)[1]
  const base = argumente.match(/base:\s*'([^']+)'/)[1]
  return { name, quelle: `${base}/${pattern}` }
})

/** Seiten unter `src/pages/` als Routen; dynamische wie `[slug]` stehen unten einzeln. */
function seitenDateien(dir) {
  return dateien(dir).flatMap((name) => {
    const pfad = join(dir, name)
    if (statSync(pfad).isDirectory()) return seitenDateien(pfad)
    return name.endsWith('.astro') ? [relative('src/pages', pfad)] : []
  })
}
const statischeRouten = seitenDateien('src/pages')
  .filter((datei) => !datei.includes('[') && datei !== '404.astro')
  .map((datei) => `/${datei.replace(/(^|\/)?index\.astro$/, '').replace(/\.astro$/, '/')}`)
  .map((route) => route.replace(/([^/])$/, '$1/'))
  .sort((a, b) => a.localeCompare(b))

const EREIGNISSE = {
  pull_request: 'jedem Pull Request',
  push: 'jedem Push',
  workflow_dispatch: 'Start von Hand',
}

const workflows = dateien('.github/workflows')
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => {
    const datei = `.github/workflows/${name}`
    const wf = parse(lies(datei))
    const ausloeser = Object.entries(wf.on ?? {}).map(([ereignis, filter]) => {
      const name = EREIGNISSE[ereignis] ?? code(ereignis)
      if (filter?.branches) return `${name} auf ${filter.branches.map(code).join(', ')}`
      if (filter?.['branches-ignore'])
        return `${name} außer auf ${filter['branches-ignore'].map(code).join(', ')}`
      return name
    })
    const jobs = Object.entries(wf.jobs ?? {}).map(([job, def]) => ({
      job,
      schritte: (def.steps ?? []).map((schritt) => schritt.name ?? schritt.uses ?? schritt.run),
    }))
    return { datei, name: wf.name ?? name, ausloeser, jobs }
  })

// --- Dokument ---------------------------------------------------------------

const link = (pfad) => `[${code(pfad)}](${relative('docs', pfad)})`
const veroeffentlicht = projekte.filter((p) => p.published)

const teile = []
const schreibe = (...zeilen) => teile.push(...zeilen)

schreibe(
  '# Architektur der Projekte',
  '',
  '<!-- Erzeugt von scripts/architektur.mjs. Nicht von Hand bearbeiten: npm run docs:architektur -->',
  '',
  '> **Erzeugt, nicht geschrieben.** `npm run docs:architektur` schreibt diese Datei aus dem Code und',
  '> den Projektdateien neu. CI prüft bei jedem Pull Request mit `npm run docs:check`, dass sie zum',
  '> Stand des Repositorys passt, und wird rot, wenn nicht. Änderungen also an der Quelle machen, nie',
  '> hier.',
  '',
  '## Was dieses Dokument weiß und was nicht',
  '',
  `Quelle für die Projekte sind die Dateien unter ${link(PROJEKTE_DIR)}: Stack, Art, Stand und die`,
  'technischen Entscheidungen, wie sie auf der Website stehen. Quelle für die Website ist ihr eigener',
  'Code.',
  '',
  'Die Projekte selbst liegen in eigenen Repositories. Ändert sich dort die Architektur, kommt das hier',
  'erst an, wenn die Projektdatei nachgezogen wird. Dann zieht dieses Dokument im selben Commit mit, und',
  'die öffentliche Projektseite gleich dazu.',
  '',
  '## Überblick',
  '',
  `${projekte.length} Projekte, davon ${veroeffentlicht.length} veröffentlicht. Reihenfolge wie auf der Startseite.`,
  '',
  '| Projekt | Art | Stack | Stand | Live | Auf der Website |',
  '| --- | --- | --- | --- | --- | --- |',
  ...projekte.map((p) => {
    const seite = p.published ? code(`/projekte/${p.slug}/`) : 'nicht veröffentlicht'
    const bauart = seiten[p.slug] ? 'eigene Seite' : 'Standardseite'
    return `| [${zelle(p.title)}](#${anker(p.title)}) | ${ARTEN[p.kind] ?? p.kind} | ${zelle(p.techStack.join(', '))} | ${zelle(p.status ? ersterSatz(p.status) : '–')} | ${p.live ? `[Link](${p.live})` : '–'} | ${seite}, ${bauart} |`
  }),
  '',
  '### In mehreren Projekten',
  '',
  'Gezählt aus `techStack`, Versionsnummern zusammengefasst.',
  '',
  '| Technik | Projekte |',
  '| --- | --- |',
  ...querschnitt.map(
    ([eintrag, nutzer]) =>
      `| ${zelle(eintrag)} | ${nutzer.length}: ${nutzer.map((p) => `[${zelle(p.title)}](#${anker(p.title)})`).join(', ')} |`,
  ),
  '',
  '## Die Website',
  '',
  `Astro, statisch generiert, ausgeliefert über GitHub Pages. Abhängigkeiten: ${Object.entries(
    pkg.dependencies,
  )
    .map(([name, version]) => code(`${name} ${version}`))
    .join(', ')}. Node ${code(pkg.engines?.node ?? '–')}.`,
  '',
  '### Routen',
  '',
  ...statischeRouten.map((route) => `- ${code(route)}`),
  `- ${code('/projekte/<slug>/')} für jedes veröffentlichte Projekt: ${veroeffentlicht.map((p) => code(p.slug)).join(', ')}`,
  // Ohne Liste der Ausgaben: n8n legt je Lauf eine an, und der Deploy prüft
  // dieses Dokument mit `docs:check`. Eine Liste hier ließe jeden Lauf scheitern.
  `- ${code('/newsletter/<datum>/')} für jede Ausgabe in ${code('src/content/newsletter/')}`,
  `- ${code('/404.html')}`,
  '',
  '### Inhalte',
  '',
  'Alle Texte liegen als Content Collections im Repository, das Schema steht in',
  `${link('src/content.config.ts')}. Kein CMS, keine Datenbank.`,
  '',
  '| Collection | Quelle |',
  '| --- | --- |',
  ...collections.map((c) => `| ${code(c.name)} | ${code(c.quelle)} |`),
  '',
  '### Wie eine Projektseite entsteht',
  '',
  '```mermaid',
  'flowchart LR',
  '  md["src/content/projekte/&lt;slug&gt;.md"] --> schema["src/content.config.ts<br/>Schema"]',
  '  schema --> route["src/pages/projekte/[slug].astro"]',
  '  schema --> uebersicht["Startseite und /projekte/"]',
  '  route --> registry["src/components/projekte/index.ts"]',
  '  registry -->|eigene Seite| seite["&lt;Name&gt;Page.astro"]',
  '  registry -->|kein Eintrag| koerper["ProjectPage.astro"]',
  '  seite --> koerper',
  '  seite --> buehne["scenes/&lt;Name&gt;Scene.astro<br/>im Rahmen ProjectScene"]',
  '```',
  '',
  `Die Projektdatei ist die einzige Quelle. Ohne Eintrag in ${link(`${SEITEN_DIR}/index.ts`)} bekommt`,
  `ein Projekt den gemeinsamen Körper ${link('src/components/ProjectPage.astro')}; mit Eintrag rendert`,
  'seine eigene Seitenkomponente diesen Körper und füllt dessen Slots, meist mit einer Bühne.',
  '',
  '### Prüfen und Ausliefern',
  '',
)

for (const wf of workflows) {
  schreibe(`**${wf.name}** (${link(wf.datei)}), bei ${wf.ausloeser.join(' und ')}:`, '')
  for (const { job, schritte } of wf.jobs) {
    schreibe(`- ${code(job)}: ${schritte.join(' → ')}`)
  }
  schreibe('')
}

schreibe('## Projekte', '')

for (const p of projekte) {
  const seite = seiten[p.slug]
  const szenen = seite ? szenenDateien(seite) : []
  const aufnahmen = dateien(join(AUFNAHMEN_DIR, p.slug))

  schreibe(
    `### ${md(p.title)}`,
    '',
    md(p.summary),
    '',
    '| | |',
    '| --- | --- |',
    `| Art | ${ARTEN[p.kind] ?? p.kind} |`,
    `| Zeitraum | ${zelle(p.period)} |`,
    `| Stand | ${zelle(p.status ?? '–')} |`,
    `| Live | ${p.live ?? '–'} |`,
    `| Auf der Website | ${p.published ? code(`/projekte/${p.slug}/`) : 'nicht veröffentlicht (`published: false`)'} |`,
    '',
    `**Stack:** ${p.techStack.map(md).join(' · ')}`,
    '',
  )

  if (p.engineering.length) {
    schreibe(
      '**Architektur und technische Entscheidungen**',
      '',
      ...p.engineering.map((punkt) => `- ${md(punkt)}`),
      '',
    )
  } else {
    schreibe('**Architektur und technische Entscheidungen:** in der Projektdatei noch keine.', '')
  }

  schreibe(
    '**Auf der Website gebaut aus**',
    '',
    `- Projektdatei: ${link(p.datei)}`,
    seite
      ? `- Seite: ${link(seite)} über ${link('src/components/ProjectPage.astro')}`
      : `- Seite: gemeinsamer Körper ${link('src/components/ProjectPage.astro')}, keine eigene Komponente`,
    ...(szenen.length
      ? [`- Bühne und Bausteine: ${szenen.map((datei) => link(datei)).join(', ')}`]
      : []),
    `- Bilder: ${p.screenshots ? `${p.screenshots} in der Projektdatei` : 'keine'}`,
    ...(aufnahmen.length
      ? [`- Aufnahmen: ${aufnahmen.length} Clips unter ${code(`${AUFNAHMEN_DIR}/${p.slug}/`)}`]
      : []),
    ...(p.codeExample ? [`- Codebeispiel: ${p.codeExample}`] : []),
    '',
  )
}

const roh = `${teile.join('\n').trimEnd()}\n`
const optionen = (await prettier.resolveConfig(ZIEL)) ?? {}
const inhalt = await prettier.format(roh, { ...optionen, filepath: ZIEL })

if (process.argv.includes('--check')) {
  const vorhanden = existsSync(ZIEL) ? lies(ZIEL) : ''
  if (vorhanden !== inhalt) {
    console.error(
      `${ZIEL} passt nicht mehr zum Code. \`npm run docs:architektur\` ausführen und die Datei mit committen.`,
    )
    process.exit(1)
  }
  console.log(`${ZIEL} ist aktuell.`)
} else {
  writeFileSync(ZIEL, inhalt)
  console.log(`${ZIEL} geschrieben: ${projekte.length} Projekte.`)
}
