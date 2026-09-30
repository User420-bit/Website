---
title: Availably
summary: iPhone-App für zwei Personen. Jeder setzt von Hand einen Status – Verfügbar, Beschäftigt, Fokus, Ruhe –, auf Wunsch mit Zeitlimit, und sieht ohne Nachfrage, ob der andere gerade ansprechbar ist.
techStack: [Swift, SwiftUI, TypeScript, Cloudflare Workers, Cloudflare D1]
kind: prototyp
period: Dezember 2025, Umbau September 2026
status: Prototyp. Alle Muss-Funktionen sind gebaut und im Simulator mit lokalem Server getestet. Der Server ist nicht in Betrieb, auf echten iPhones ist die App noch nicht durchgeklickt.
github: null
order: 11
screenshots:
  - image: ../../assets/projekte/availably.png
    caption: 'Availably auf zwei iPhones: Jonas hat „Fokus“ gesetzt, Lea sieht es. Aufnahmen aus dem Simulator in gezeichneten Rahmen'
  - image: ../../assets/projekte/availably-partner-fokus.png
    caption: 'Home bei Jonas: Lea ist im Fokus, noch 30 Minuten, darunter ihre Ortszeit'
  - image: ../../assets/projekte/availably-status-aendern.png
    caption: 'Status ändern: vier Zustände und fünf Dauern, kein Textfeld und keine Frage nach dem Grund'
  - image: ../../assets/projekte/availably-einladung.png
    caption: 'Einladung mit sechsstelligem Code, gültig für 24 Stunden und nur einmal'
  - image: ../../assets/projekte/availably-pause.png
    caption: 'Teilen pausiert: Der Partner sieht dann nur „Pausiert“'
  - image: ../../assets/projekte/availably-mitteilungen.png
    caption: 'Mitteilungen ohne Push-Dienst: Die App sagt offen, dass iOS entscheidet, wann sie nachsieht'
  - image: ../../assets/projekte/availably-ueber.png
    caption: 'Über Availably: die vier Prinzipien, was geteilt wird und was nicht'
  - image: ../../assets/projekte/availably-einstieg-dunkel.png
    caption: 'Der Einstieg im Dunkelmodus: „Kein Tracking. Keine Historie.“'
features:
  - Vier Zustände, auf Wunsch mit Zeitlimit von 15 Minuten bis 2 Stunden, danach wieder „Verfügbar“
  - Koppeln über einen sechsstelligen Code oder einen Link; die Einladung gilt 24 Stunden und nur einmal
  - Teilen mit einem Tipp pausieren; der Partner sieht dann „Pausiert“
  - 'Leise Mitteilungen bei einem Statuswechsel, ohne Push-Dienst: iOS entscheidet, wann die App nachsieht'
  - Auf Wunsch die Ortszeit des Partners; übertragen wird nur die Zeitzone, kein Standort
  - Kein Standort, kein „zuletzt online“, keine Historie, kein Chat
engineering:
  - 'Eigener kleiner Server: ein Cloudflare Worker mit D1. Mit einem kostenlosen Apple-Konto gibt es weder iCloud-Abgleich noch Push, deshalb wurde die Regel „ohne eigenes Backend“ bewusst gebrochen'
  - Der Server kennt je Gerät nur den aktuellen Stand, keine Historie. Gerätetoken und IP-Adressen liegen dort nur als Hash
  - Vor dem ersten Verbinden spricht die App mit keinem Server
  - Offline gesetzter Status wartet in einer Warteschlange; der neueste Wert gewinnt
  - 'Entscheidungsregel aus dem Produktdokument: Macht das die App ruhiger oder lauter? Was lauter macht, wird nicht gebaut'
learnings:
  - Ein Produktdokument, das Nicht-Ziele nennt, spart mehr Arbeit als eine Funktionsliste
---

Ein Versuch, wie wenig eine App zeigen darf, damit sie nützlich bleibt. Erfolg heißt hier wenig
Nutzung: kurz hinsehen, genug wissen. Entstanden ist der Prototyp in einer Woche im Dezember 2025,
damals mit Apples iCloud-Datenbank. Im September 2026 kam ein eigener kleiner Server dazu, weil ein
kostenloses Apple-Konto weder den Abgleich über iCloud noch Push erlaubt. Die App ist nicht im App
Store und nicht in TestFlight. Die Referenz steht hier, weil sie zeigt, wie Klartext an ein Produkt
herangeht, nicht als fertige App.
