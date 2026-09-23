---
title: TIEFGANG
summary: Browser-Spiel über eine Mine. Wer tiefer gräbt, holt mehr heraus und geht mehr Risiko ein. Fürs Handy im Hochformat, mit einer Hand und auch ohne Internet spielbar.
techStack: [TypeScript, Canvas 2D, Vite, PWA, Cloudflare Pages, GitHub Actions]
kind: eigenes-produkt
period: Juli – September 2026
status: Spielbar. Nächster Schritt ist M6 – Balancing und Beta mit 5 bis 10 Testspielern.
github: null
live: https://tiefgang.pages.dev
order: 4
screenshots:
  - image: ../../assets/projekte/tiefgang-mine.webp
    caption: 'Eine Fahrt auf 525 m: links Tiefe, Energie für den Rückweg und Ladung, rechts Werkzeuge, Energie und Fracht'
  - image: ../../assets/projekte/tiefgang-eisschicht.png
    caption: 'Die Eisschicht auf 330 m: Jede Schicht hat eigenes Gestein und eigene Erze, hier Frostquarz'
  - image: ../../assets/projekte/tiefgang-montagehalle.png
    caption: 'Die Montagehalle: Mit dem Erz aus der Mine werden Bohrkopf, Rumpf, Düse und die übrigen Teile ausgebaut'
  - image: ../../assets/projekte/tiefgang-handy.webp
    caption: 'Auf dem Handy im Hochformat: Anzeigen oben, Werkzeuge, Energie und Fracht unten'
  - image: ../../assets/projekte/tiefgang-handy-story.png
    caption: 'Die Story in kurzen Einblendungen: Dr. Nadia Ferreira kommentiert die Lava in der Tiefe'
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
  - Mehr als 50 einzeln geprüfte Schritte im Solo-Projekt – die Disziplin lohnt sich beim Rückbau von Fehlentscheidungen
---

Mein größtes Projekt bisher: über 160 Änderungen in mehr als 50 einzeln geprüften Schritten, sechs
abgeschlossene Meilensteine (M0 bis M5), dazu ein Weltensystem mit drei Schächten und ein optionales
Konto für den Spielstand. Das Spiel ist auf Deutsch, läuft im Browser auf Handy und Desktop und funktioniert nach dem ersten
Laden auch offline.

Der Kern ist ein Push-your-luck-Loop: tiefer graben bringt mehr, aber jede Schicht hat eigene Gefahren.
Alles – Welt, Sprites, Sound – entsteht zur Laufzeit aus Code. Die Simulation kennt keinen Canvas, deshalb
kann ein Bot-Harness hunderte Runs durchspielen und die Balance in Zahlen ausgeben, bevor ein Mensch
spielt.
