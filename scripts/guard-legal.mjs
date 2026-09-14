#!/usr/bin/env node
/**
 * Blockiert den Deploy, solange die Pflichtangaben im Impressum fehlen.
 *
 * Der Rework-Plan wollte das als Vorsatz loesen ("Phase 0.4 ist Blocker fuer
 * den Merge"). Vorsaetze halten nicht. Der Deploy-Workflow ruft dieses Skript
 * als ersten Schritt auf: ohne ladungsfaehige Anschrift geht die Seite nicht
 * online. Lokaler Build und CI bleiben davon unberuehrt, damit man an der
 * Seite arbeiten kann, bevor die Adresse feststeht — die Rechtstexte tragen
 * in dem Fall einen sichtbaren Hinweis und `noindex`.
 */
import { readFileSync } from 'node:fs'

const FILE = 'src/content/legal.json'
const REQUIRED = [
  ['name', 'Name des Diensteanbieters'],
  ['street', 'Strasse und Hausnummer'],
  ['zipCity', 'PLZ und Ort'],
  ['country', 'Land'],
  ['email', 'Kontakt-E-Mail'],
]

const legal = JSON.parse(readFileSync(FILE, 'utf8')).main
const problems = []

for (const [key, label] of REQUIRED) {
  const value = legal?.[key]
  if (value === null || value === undefined || String(value).trim() === '') {
    problems.push(`${key} (${label}) ist leer`)
  } else if (/\[.*\]/.test(String(value))) {
    problems.push(`${key} (${label}) enthaelt noch einen Platzhalter: ${value}`)
  }
}

if (problems.length > 0) {
  console.error('\nDeploy abgebrochen: Das Impressum ist unvollstaendig.\n')
  for (const problem of problems) console.error(`  - ${problem}`)
  console.error(
    `\nNachzutragen in ${FILE}. Eine deutsche Website mit Impressumspflicht darf nicht mit` +
      '\nPlatzhaltern oder ohne ladungsfaehige Anschrift online gehen (§ 5 DDG).\n',
  )
  process.exit(1)
}

console.log('Impressum vollstaendig — Deploy freigegeben.')
