---
title: DealerSim
summary: Aufbau- und Managementspiel im Pixel-Look, das auch weiterläuft, wenn niemand spielt. Startet ohne Installation direkt im Browser.
techStack: [HTML, JavaScript, Canvas, Python-Tooling, Docker]
kind: eigenes-produkt
period: August – September 2026
status: Spielbar. Grundausbau abgeschlossen, offen ist ein Spieltest mit echten Personen.
github: null
live: https://dealersim.vercel.app
order: 8
screenshots:
  - image: ../../assets/projekte/dealersim-raum-ausgebaut.png
    caption: 'Ein ausgebauter Raum auf Level 41: Maschinen bis Stufe 10, eigenes Personal und Einrichtung'
  - image: ../../assets/projekte/dealersim-skills.png
    caption: 'Der Skill-Baum mit vier Zweigen: Produktion, Geschäft, Ruf und Betrieb'
  - image: ../../assets/projekte/dealersim-raum-menue.png
    caption: 'Das Raum-Menü: Produktionskette, Raumgröße und Maschinen zum Kaufen'
  - image: ../../assets/projekte/dealersim-maschine.png
    caption: 'Eine Maschine im Detail: Stufe, Qualität, Zustand, Wartung und Ausbau'
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

Ein Spiel um eine fiktive, legale Manufaktur mit Anbau, Verarbeitung und Verkauf: Mein erstes
größeres Spielprojekt und der Vorläufer von TIEFGANG. Vieles, was dort sauber ist –
headless Simulation, geseedete Tests, dokumentierte Playtests – wurde hier zum ersten Mal gebraucht und
in der nächsten Iteration besser gemacht.
