---
title: wawi-mvp
summary: Warenwirtschafts-System als CLI-Anwendung mit Domain-Driven Design.
techStack: [Java, DDD, CLI, Maven]
kind: studienprojekt
period: Dezember 2025
github: null
order: 9
features:
  - Artikel-, Lager- und Bewegungsverwaltung
  - Domain Events für Bestandsänderungen
  - CLI mit klarer Befehlsstruktur
  - Unit-Tests für Domänenlogik
learnings:
  - DDD-Konzepte praktisch angewendet
  - Trade-offs bei Aggregatgrenzen
  - Test-First für die Kerndomäne
codeExample:
  language: bash
  snippet: java -jar wawi-mvp.jar demo
---

Eigenständiger Entwurf einer schlanken Warenwirtschaft. Der Fokus liegt auf sauberer Trennung von
Domäne, Anwendungsschicht und Infrastruktur: Die Domäne kennt weder Datenbank noch CLI, die
Anwendungsschicht orchestriert Anwendungsfälle, die Infrastruktur liefert Persistenz und Eingabe.
