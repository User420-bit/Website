---
title: DealerSim
summary: Aufbau- und Managementspiel im Pixel-Look, das auch weiterläuft, wenn niemand spielt. Startet ohne Installation direkt im Browser.
techStack: [HTML, JavaScript, Canvas, Python-Tooling, Docker]
kind: eigenes-produkt
period: Juli – August 2026
status: Spielbar. Weiterentwicklung pausiert zugunsten von TIEFGANG.
github: null
live: https://dealersim.vercel.app
order: 8
screenshots:
  - image: ../../assets/projekte/dealersim.png
    caption: 'Der erste Raum in DealerSim: isometrisches Raster mit den drei Stationen der Produktionskette'
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
  - Ein Spiel ohne Build-Schritt ist bequem zu teilen und unbequem zu warten, sobald es wächst
  - Playtest-Reports mit Messdaten schlagen Bauchgefühl beim Balancing
---

Mein erstes größeres Spielprojekt und der Vorläufer von TIEFGANG. Vieles, was dort sauber ist –
headless Simulation, geseedete Tests, dokumentierte Playtests – wurde hier zum ersten Mal gebraucht und
in der nächsten Iteration besser gemacht.
