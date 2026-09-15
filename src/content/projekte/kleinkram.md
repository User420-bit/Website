---
title: Kleinkram
summary: Lokales Buchhaltungs-Dashboard für Kleinunternehmer nach §19 UStG. Rechnungen, Fristen, Dokumente, EÜR-Grundlage.
techStack: [Next.js 16, Drizzle ORM, SQLite, shadcn/ui, Tailwind, Recharts, Docker]
kind: eigenes-produkt
period: August 2026
status: Lokal nutzbar. Repo ist privat, ein öffentlicher Link ist in Prüfung.
github: null
live: null
order: 3
features:
  - Ein- und Ausgangsrechnungen mit Status und Fälligkeit, Rechnungs-PDFs
  - Kontakte, Fristen mit Wiederkehr-Vorlagen, Dokumentenablage mit Tags
  - Verknüpfungen zwischen allen Objekten
  - Jahres- und Quartalsberichte als EÜR-Grundlage, CSV-Export für Excel
  - Backups und §19-Umsatzampel
engineering:
  - Alle Daten bleiben lokal in SQLite – kein Konto, kein Cloud-Sync
  - Eigenes Design-System mit Farb-Tokens, Empty-States und Status-Badges
  - Läuft über Docker, damit die Installation ein Befehl ist
  - Randfälle in Backups behandelt – exFAT-Laufwerke und AppleDouble-Dateien
learnings:
  - Fachlichkeit zuerst – die §19-Grenze und die EÜR bestimmen das Datenmodell, nicht das UI
  - Empty-States sind Teil des Designs, nicht ein Nachtrag
---

Ein Werkzeug für Einzelunternehmer, die keine Steuerberatungs-Suite brauchen, aber Excel entwachsen
sind. Das Dashboard zeigt auf einen Blick, welche Rechnungen offen sind, welche Fristen anstehen und wie
nah der Umsatz an der Kleinunternehmergrenze liegt.
