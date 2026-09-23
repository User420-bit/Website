---
title: NoteList
summary: Notizen auf einer freien Fläche, verbunden wie ein Stammbaum. Läuft auf einem eigenen Kleinstrechner statt in einer Cloud.
techStack: [Python, FastAPI, SQLite, Vanilla JS, Tailwind]
kind: eigenes-produkt
period: Mai – Juli 2026
status: Fertig gebaut für den Betrieb auf einem Raspberry Pi.
github: null
live: null
order: 6
features:
  - Hierarchische Notizen als SVG-Fäden auf einer Canvas
  - Pan und Zoom mit Touch, Inline-Bearbeitung
  - Volltextsuche über SQLite FTS5, per Cmd+K
  - Rollen (Owner, Editor, Viewer) und Session-Auth mit bcrypt
  - Konsistente SQLite-Backups
  - Anhänge mit Vorschau, Verlauf je Notiz mit Wiederherstellen, Export als Text oder Markdown
engineering:
  - Ausgelegt auf ein Gerät mit 512 MB RAM – kein Framework im Frontend, kein Build
  - FTS5 statt externer Suche, weil der Pi keine zweite Datenbank verträgt
learnings:
  - Zielhardware zuerst festlegen, dann den Stack wählen – nicht umgekehrt
---

Eine App für eine kleine Gruppe, die ihre Notizen nicht in einer Cloud haben will. Das Gerät ist ein
Raspberry Pi Zero 2 W, und das hat jede technische Entscheidung bestimmt.
