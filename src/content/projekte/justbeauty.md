---
title: JustBeauty Rework
summary: Ist-Analyse, Design-Rework und lauffähiger Multi-Page-Prototyp mit 11 Routen für einen Kosmetik-Shop.
techStack: [Astro, GSAP, Lenis, TypeScript, Docker]
kind: kundenprojekt
period: September 2026
status: Prototyp und Konzept liegen dem Kunden vor.
github: null
live: null
order: 2
features:
  - Ist-Analyse, Design-Rework, Tracking-Konzept und Roadmap
  - Konkurrenzanalyse als Battlecard
  - Prototyp mit 11 Routen – Shop, Kategorien, Produktseiten, Bestseller, Routinen, Beratung, Händler/B2B, Über uns, Prämien, Kontakt
  - 315 Produkte automatisch aus dem Live-Shop importiert
engineering:
  - Zentrales Master-Timing für alle Animationen – kein Modul definiert eigene Kurven
  - Dev-Server über Docker Desktop startbar, damit der Kunde den Prototyp ohne Node-Setup ansehen kann
  - 12 Pull Requests in 30 Commits – jede Route ein nachvollziehbarer Schritt
learnings:
  - Echte Produktdaten im Prototyp verhindern Diskussionen über Platzhalter
  - Ein Animationssystem mit einer Zeitbasis fühlt sich ruhiger an als zehn gute Einzelanimationen
---

Konzept- und Prototyp-Arbeit für justbeauty-shop.com. Der Kunde bekam nicht nur Mockups, sondern
einen klickbaren Shop mit seinen eigenen 315 Produkten, dazu eine schriftliche Analyse mit Roadmap und
einer Einordnung gegenüber der Konkurrenz.
