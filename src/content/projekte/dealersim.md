---
title: DealerSim
summary: Isometrisches Idle-/Management-Spiel in Pixel-Art. Eine einzige HTML-Datei, über 10.000 Zeilen JavaScript, kein Build-Schritt.
techStack: [HTML, JavaScript, Canvas, Python-Tooling, Docker]
kind: eigenes-produkt
period: Juli – August 2026
status: Spielbar. Weiterentwicklung pausiert zugunsten von TIEFGANG.
github: null
live: null
order: 8
features:
  - Produktions- und Qualitätsmodell mit Nachfrage-Segmenten und B2B-Verträgen
  - Offline-Produktion, Prestige-System, Achievements
  - Multi-Room-Architektur und Desktop-Cockpit-Layout
  - Mobile-first, läuft ohne Installation
engineering:
  - Eigenes Sprite-Studio als Node-Dev-Server, das pixelweise bearbeitet und in die HTML-Datei zurückschreibt
  - Headless-Test-Harnesse treiben die echten Game-Klassen ohne DOM
  - Economy-Harness auf Reproduzierbarkeit repariert – Math.random geseedet
  - Security-Fix beim Save-Parsing – Keys wie __proto__ werden verworfen
learnings:
  - Ein Spiel ohne Build-Schritt ist bequem zu teilen und unbequem zu warten – ab 10.000 Zeilen kippt es
  - Playtest-Reports mit Messdaten schlagen Bauchgefühl beim Balancing
---

Mein erstes größeres Spielprojekt und der Vorläufer von TIEFGANG. Vieles, was dort sauber ist –
headless Simulation, geseedete Tests, dokumentierte Playtests – wurde hier zum ersten Mal gebraucht und
in der nächsten Iteration besser gemacht.
