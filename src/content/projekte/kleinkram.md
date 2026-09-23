---
title: Kleinkram
summary: Buchhaltung für Kleinunternehmer nach §19 UStG, die auf dem eigenen Rechner läuft. Rechnungen, Angebote, Arbeitszeiten, Fristen und Belege an einem Ort, dazu die Zahlen für die EÜR.
techStack: [Next.js 16, React 19, Drizzle ORM, SQLite, shadcn/ui, Tailwind, Recharts, Docker]
kind: eigenes-produkt
period: August – September 2026
status: Täglich im Einsatz bei Klartext selbst. Der Code ist privat.
github: null
live: null
order: 3
screenshots:
  - image: ../../assets/projekte/kleinkram-uebersicht.png
    caption: 'Die Übersicht mit Beispieldaten: Einnahmen, Ausgaben, Gewinn und offene Forderungen, darunter eine Rechnung im Verzug und der Stand zur Kleinunternehmergrenze'
  - image: ../../assets/projekte/kleinkram-zeiten-woche.png
    caption: 'Zeiten in der Wochenansicht: offene Stunden je Kunde mit einem Klick abrechnen, darunter jeder Eintrag mit Dauer und Stundensatz'
  - image: ../../assets/projekte/kleinkram-zeiten-auswertung.png
    caption: 'Die Auswertung des Jahres: Stunden je Monat und je Kunde, mit Wert und effektivem Stundensatz'
  - image: ../../assets/projekte/kleinkram-uebersicht-dunkel.png
    caption: 'Dieselbe Übersicht im dunklen Farbschema'
features:
  - Übersicht mit Einnahmen, Ausgaben, Gewinn und offenen Forderungen, dazu §19-Umsatzgrenze und Steuerrücklage
  - Rechnungen und Angebote mit PDF, wiederkehrende Rechnungen aus Vorlagen; festgeschriebene Rechnungen werden storniert statt gelöscht
  - Mahnwesen – Rechnungen im Verzug erscheinen in der Übersicht, das Mahnschreiben entsteht auf der Rechnungsseite
  - Zeiterfassung mit Stoppuhr und Wochenansicht, Abrechnung per Klick und Tätigkeitsnachweis je Rechnung, Auswertung mit effektivem Stundensatz je Kunde
  - Kontakte, Fristen mit Wiederkehr-Vorlagen, Belege mit Aufbewahrungsfrist, auch E-Rechnungen im Format XRechnung und ZUGFeRD
  - Anlagenverzeichnis mit Abschreibung, Pauschalen für Homeoffice, Fahrten und Verpflegung, Bankumsätze aus CSV mit Zuordnung zu offenen Rechnungen
  - Quartals- und Jahresauswertung als Grundlage für die EÜR, Jahresabschluss mit Checkliste und Abgabepaket, CSV-Export für Excel
  - Katalog aller Pflichten mit Rechtsgrundlage, daraus erzeugt die Verfahrensdokumentation
engineering:
  - Alle Daten bleiben lokal in SQLite – kein Konto, kein Cloud-Sync
  - Oberfläche aus Glas im hellen und dunklen Farbschema, die Kontraste prüft ein Skript bei jedem Check
  - Läuft über Docker, damit die Installation ein Befehl ist
  - Auf dem Mac als eigene App startbar, ohne Browser und Terminal; der Schreibtisch scheint durch das Fenster
  - Automatische Tests für die Rechenregeln – Geld, Steuer, Kalenderwochen
  - Randfälle in Backups behandelt – exFAT-Laufwerke und AppleDouble-Dateien
learnings:
  - Fachlichkeit zuerst – die §19-Grenze und die EÜR bestimmen das Datenmodell, nicht das UI
  - Drei Regeln haben die Erweiterung getragen – Geld nur in ganzen Cent, „heute“ nur in Ortszeit, abgeleitete Zustände nie speichern
  - Empty-States sind Teil des Designs, nicht ein Nachtrag
---

Ein Werkzeug für Einzelunternehmer, die keine Steuerberatungs-Suite brauchen, aber Excel entwachsen
sind. Die Übersicht zeigt auf einen Blick, was eingenommen und ausgegeben wurde, welche Rechnungen offen
oder im Verzug sind und wie nah der Umsatz an der Kleinunternehmergrenze liegt.

Im August 2026 entstand der Kern mit Rechnungen, Kontakten, Fristen und Berichten. Im September kamen
Angebote, Zeiterfassung, Mahnwesen, Bank, Anlagen, Pauschalen und der Jahresabschluss dazu, zuletzt eine
neue Oberfläche mit hellem und dunklem Farbschema. Alle Daten bleiben in einer Datei auf dem eigenen
Rechner.
