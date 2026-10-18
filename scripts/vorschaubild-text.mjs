/**
 * Die Texte des Vorschaubilds (`og:image`), gelesen aus denselben Dateien wie
 * die Seite. `scripts/vorschaubild.mjs` zeichnet sie und legt sie als Stand ab,
 * `scripts/verify-build.mjs` vergleicht den Stand mit dem, was gerade gilt:
 * Ändert sich Claim, Ort oder eine Leistung, wird der Build-Check rot, bis das
 * Bild neu erzeugt ist.
 */
import { readFileSync } from 'node:fs'

export const STAND = 'scripts/vorschaubild.stand.json'
export const ZIEL = 'public/vorschaubild.png'

export function vorschaubildTexte() {
  const company = JSON.parse(readFileSync('src/content/company.json', 'utf8')).main
  const titel = company.services.map((s) => s.title)
  return {
    name: company.name,
    claim: company.claim,
    leistungen: `${titel.slice(0, -1).join(', ')} und ${titel.at(-1)}`,
    ort: `${company.location.split(',')[0]} · ${company.areaServed}`,
    domain: readFileSync('public/CNAME', 'utf8').trim(),
  }
}

/** Der Stand als Text, so wie er in `STAND` liegt. */
export const standText = (texte) => `${JSON.stringify(texte, null, 2)}\n`
