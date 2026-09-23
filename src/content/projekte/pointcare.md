---
title: PointCare
summary: Einseitige Website für eine Logistikberatung. Dunkel und filmisch, bewegt sich beim Scrollen mit und ersetzt eine Baukasten-Vorlage.
techStack: [Vite, JavaScript, CSS, Scroll-Animationen, KI-Assets]
kind: kundenprojekt
period: September 2026
status: In Abnahme. Offen sind Portrait-Foto, Impressum, Kontaktformular und lokale Schriften.
github: null
live: null
order: 1
# Kein Screenshot, solange die Seite in Abnahme ist: Der Entwurf zeigt noch Platzhalter wie
# „[15] Jahre“. Erst nach Abnahme neu aufnehmen (`npm run screenshots -- pointcare`).
features:
  - Drei Leistungsbereiche (Lager & Intralogistik, Supply Chain, Transport) als Scroll-Choreografie
  - Hero mit Parallax und Standbildern mit Scroll-Zoom
  - KI-generierte Bild- und Videoassets nach schriftlichem Briefing
  - Headless-Screenshot-Skript für die Abnahme
engineering:
  - Projektplan und Asset-Briefing vor der ersten Zeile Code
  - Umstieg von Videos auf Standbilder mit Scroll-Zoom, weil die Videos die Ladezeit auf Mobilgeräten sprengten
  - Bugfixes an Textüberlappung, Hero und Parallax dokumentiert statt still gefixt
learnings:
  - Video im Hero sieht im Briefing gut aus und kostet auf dem Handy die ersten Sekunden – messen, dann entscheiden
  - Über 30 Änderungen in drei Tagen gehen nur mit einem Plan, der vorher steht
---

Kundenprojekt für point-care.de. Die bestehende Seite kam aus einem Baukasten und sah aus wie jede
andere. Ziel war eine Seite, die Beratung auf Augenhöhe mit großen Logistikern signalisiert: dunkel,
ruhig, mit einer Bewegung pro Scroll-Abschnitt statt Effekten überall.

Bilder und Videos entstanden mit Higgsfield, Kling und Nano Banana aus einem Briefing mit Prompts und
einer Encoding-Pipeline. Der Live-Link folgt nach dem Launch.
