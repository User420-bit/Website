---
title: NoteList
summary: Self-hosted Notizen auf einer Canvas mit Eltern-Kind-Verbindungen. Läuft auf einem Raspberry Pi Zero 2 W.
techStack: [Python, FastAPI, SQLite, Vanilla JS, Tailwind]
kind: eigenes-produkt
period: Mai – Juli 2026
status: Im Einsatz für eine kleine Gruppe.
github: null
live: null
order: 8
features:
  - Hierarchische Notizen als SVG-Fäden auf einer Canvas
  - Pan und Zoom mit Touch, Inline-Bearbeitung
  - Volltextsuche über SQLite FTS5, per Cmd+K
  - Rollen (Owner, Editor, Viewer) und Session-Auth mit bcrypt
  - Konsistente SQLite-Backups
engineering:
  - Ausgelegt auf ein Gerät mit 512 MB RAM – kein Framework im Frontend, kein Build
  - FTS5 statt externer Suche, weil der Pi keine zweite Datenbank verträgt
learnings:
  - Zielhardware zuerst festlegen, dann den Stack wählen – nicht umgekehrt
---

Eine App für eine kleine Gruppe, die ihre Notizen nicht in einer Cloud haben will. Das Gerät ist ein
Raspberry Pi Zero 2 W, und das hat jede technische Entscheidung bestimmt.
