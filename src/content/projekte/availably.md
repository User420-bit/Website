---
title: Availably
summary: iPhone-App für zwei Personen. Jeder setzt von Hand einen Status – verfügbar, beschäftigt, Fokus, Ruhe – und sieht ohne Nachfrage, ob der andere gerade ansprechbar ist.
techStack: [Swift, SwiftUI, CloudKit]
kind: prototyp
period: Dezember 2025
status: Früher Prototyp. Status setzen und Koppeln per Code funktionieren, Benachrichtigungen fehlen.
github: null
order: 11
features:
  - Vier Zustände mit optionalem Zeitlimit, danach automatisch wieder verfügbar
  - Koppeln zweier Geräte über einen sechsstelligen Code
  - Kein Standort, kein „zuletzt online“, keine Historie, kein Chat
engineering:
  - Kein eigener Server – die Daten liegen in Apples iCloud-Datenbank
  - 'Entscheidungsregel aus dem Produktdokument: Macht das die App ruhiger oder lauter? Was lauter macht, wird nicht gebaut'
learnings:
  - Ein Produktdokument, das Nicht-Ziele nennt, spart mehr Arbeit als eine Funktionsliste
---

Ein Versuch, wie wenig eine App zeigen darf, damit sie nützlich bleibt. Erfolg heißt hier wenig
Nutzung: kurz hinsehen, genug wissen. Der Stand ist ein früher Prototyp aus einer Woche im Dezember
2025; Benachrichtigungen, Einführung und ein Pause-Schalter fehlen. Die Referenz steht hier, weil sie
zeigt, wie Klartext an ein Produkt herangeht, nicht als fertige App.
