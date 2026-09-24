---
title: JustBeauty
summary: Bestandsaufnahme, neues Design und ein klickbarer Entwurf mit zwölf Seiten für einen Kosmetik-Shop.
techStack: [Astro, GSAP, Lenis, TypeScript, Docker]
kind: kundenprojekt
period: September 2026
status: Prototyp und Konzept sind fertig für die Präsentation.
github: null
live: null
order: 2
# Vorerst nicht veröffentlicht (Entscheidung vom 2026-09-24): Solange Screenshot und Live-Link
# fehlen, gibt es nichts zu zeigen. Zum Freischalten die Zeile löschen.
published: false
features:
  - Ist-Analyse, Design-Rework, Tracking-Konzept und Roadmap
  - Konkurrenzanalyse als Battlecard
  - Entwurf mit zwölf Seiten – Shop, Kategorien, Produktseiten, Bestseller, Routinen, Beratung, Händler, Über uns, Prämien, Kontakt, Suche und Warenkorb mit Kassen-Schritt
  - 315 Produkte automatisch aus dem Live-Shop importiert
engineering:
  - Zentrales Master-Timing für alle Animationen – kein Modul definiert eigene Kurven
  - Dev-Server über Docker Desktop startbar, damit der Kunde den Prototyp ohne Node-Setup ansehen kann
  - 12 Pull Requests in 30 Commits – jede Route ein nachvollziehbarer Schritt
learnings:
  - Echte Produktdaten im Prototyp verhindern Diskussionen über Platzhalter
  - Ein Animationssystem mit einer Zeitbasis fühlt sich ruhiger an als zehn gute Einzelanimationen
  - 'Eine Demo muss ohne Internet laufen: Messe- und Büro-WLAN sind der häufigste Grund, warum eine Vorführung scheitert'
---

Konzept- und Prototyp-Arbeit für justbeauty-shop.com. Der Kunde bekam nicht nur Mockups, sondern
einen klickbaren Shop mit seinen eigenen 315 Produkten, dazu eine schriftliche Analyse mit Roadmap und
einer Einordnung gegenüber der Konkurrenz.
