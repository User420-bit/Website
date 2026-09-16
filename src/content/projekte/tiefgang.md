---
title: TIEFGANG
summary: Push-your-luck-Mining-Roguelite für den Browser. Handy-Hochformat, einhändig, offline spielbar als PWA.
techStack: [TypeScript, Canvas 2D, Vite, PWA, Cloudflare Pages, GitHub Actions]
kind: eigenes-produkt
period: Juli – September 2026
status: Spielbar. Nächster Schritt ist M6 – Balancing und Beta mit 5 bis 10 Testspielern.
github: null
live: https://tiefgang.pages.dev
order: 4
features:
  - Core Loop mit drei Schichten, jede mit eigenen Gefahren
  - Vier Upgrade-Pfade und Verbrauchsgegenstände
  - Save-System mit Export und Import
  - Tagesmine mit Datums-Seed und Bestenliste
  - Haptik, Pause, Einstellungen für Ton, Vibration, Textgröße, Farbsehen-Hilfe und Tastenbelegung
  - Story mit Charakterporträts und lokalem Text-Studio für alle Story-Texte
engineering:
  - Keine Game-Engine, keine Asset-Dateien – Sprites prozedural, Sound generativ über Web Audio
  - Simulation strikt vom Rendering getrennt, damit sie headless läuft
  - Deterministische Weltgenerierung aus einem Seed
  - Eigener Balance-Simulator statt Test-Runner – 30 Bot-Runs und eine 400-Seed-Dichteprüfung
  - Deploy per GitHub Actions auf Cloudflare Pages bei jedem Push
learnings:
  - Ein Spiel ohne Engine zwingt zu einer sauberen Trennung von Zustand, Simulation und Darstellung
  - Balancing ist messbar, wenn die Simulation ohne Browser läuft
  - 61 Pull Requests im Solo-Projekt – die Disziplin lohnt sich beim Rückbau von Fehlentscheidungen
---

Mein größtes Projekt bisher: 184 Commits, 61 Pull Requests, sechs abgeschlossene Meilensteine (M0 bis
M5). Das Spiel ist auf Deutsch, läuft im Browser auf Handy und Desktop und funktioniert nach dem ersten
Laden auch offline.

Der Kern ist ein Push-your-luck-Loop: tiefer graben bringt mehr, aber jede Schicht hat eigene Gefahren.
Alles – Welt, Sprites, Sound – entsteht zur Laufzeit aus Code. Die Simulation kennt keinen Canvas, deshalb
kann ein Bot-Harness hunderte Runs durchspielen und die Balance in Zahlen ausgeben, bevor ein Mensch
spielt.
