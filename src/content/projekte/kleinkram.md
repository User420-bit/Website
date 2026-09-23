---
title: Kleinkram
summary: Buchhaltungs-Übersicht für Kleinunternehmer nach §19 UStG, die auf dem eigenen Rechner läuft. Rechnungen, Fristen und Dokumente an einem Ort, dazu die Grundlage für die EÜR.
techStack: [Next.js 16, Drizzle ORM, SQLite, shadcn/ui, Tailwind, Recharts, Docker]
kind: eigenes-produkt
period: August – September 2026
status: Täglich im Einsatz bei Klartext selbst. Der Code ist privat.
github: null
live: null
order: 3
features:
  - Rechnungen, Angebote und Mahnungen mit PDF; Rechnungen werden festgeschrieben und storniert statt gelöscht
  - Zeiterfassung mit Stoppuhr, Wochenansicht und Abrechnung per Klick, dazu ein Tätigkeitsnachweis je Rechnung
  - Kontakte, Fristen mit Wiederkehr-Vorlagen, Belege mit Aufbewahrungsfrist, Anlagenverzeichnis, Bankumsätze aus CSV
  - Verknüpfungen zwischen allen Einträgen
  - Quartals- und Jahresauswertung als Grundlage für die EÜR, Jahresabschluss mit Checkliste und Abgabepaket, CSV-Export für Excel
  - Backups, §19-Umsatzampel und Steuerrücklage auf einen Blick
engineering:
  - Alle Daten bleiben lokal in SQLite – kein Konto, kein Cloud-Sync
  - Eigenes Design-System mit Farb-Tokens, Empty-States und Status-Badges
  - Läuft über Docker, damit die Installation ein Befehl ist
  - Auf dem Mac als eigene App startbar, ohne Browser und Terminal
  - Randfälle in Backups behandelt – exFAT-Laufwerke und AppleDouble-Dateien
learnings:
  - Fachlichkeit zuerst – die §19-Grenze und die EÜR bestimmen das Datenmodell, nicht das UI
  - Empty-States sind Teil des Designs, nicht ein Nachtrag
---

Ein Werkzeug für Einzelunternehmer, die keine Steuerberatungs-Suite brauchen, aber Excel entwachsen
sind. Das Dashboard zeigt auf einen Blick, welche Rechnungen offen sind, welche Fristen anstehen und wie
nah der Umsatz an der Kleinunternehmergrenze liegt.
