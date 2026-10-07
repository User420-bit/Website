---
title: NoteList
summary: Notizen auf einer freien Fläche, verbunden wie ein Stammbaum und von mehreren Leuten gemeinsam bearbeitet. Läuft auf einem eigenen Kleinstrechner statt in einer Cloud.
techStack: [Python, FastAPI, SQLite, Vanilla JS, Tailwind]
kind: eigenes-produkt
period: Mai – Juli 2026
status: Läuft seit Sommer 2026 für eine kleine Gruppe.
github: null
live: null
order: 6
screenshots:
  - image: ../../assets/projekte/notelist.png
    caption: 'Aus einer frischen Installation, nicht aus den Notizen der Gruppe: das Feature-Audit vom 5. Mai 2026 aus dem Changelog als Space. Oben die Wurzelnotiz, darunter drei Äste, gestrichelt eine Querverbindung zwischen zwei Notizen'
  - image: ../../assets/projekte/notelist-suche.png
    caption: 'Die Suche per Cmd+K findet Notizen in allen Spaces und zeigt, unter welcher Notiz ein Treffer hängt'
  - image: ../../assets/projekte/notelist-verlauf.png
    caption: 'Der Verlauf einer Notiz: links die frühere Fassung, rechts die aktuelle, wiederherstellen mit einem Klick'
  - image: ../../assets/projekte/notelist-handy.png
    caption: 'Auf dem Handy: ein Ast herangezoomt, oben nur Suche, neue Notiz, Menü und Zurück'
features:
  - Spaces für eigene oder geteilte Arbeitsbereiche, mit den Rollen Owner, Editor und Viewer
  - Notizen hängen als Fäden aneinander wie ein Stammbaum, dazu gestrichelte Querverbindungen zwischen beliebigen Notizen
  - Freie Fläche mit Pan und Zoom, auch per Touch und Pinch. Doppelklick oder Doppeltippen legt eine Notiz an
  - Volltextsuche über alle Spaces mit SQLite FTS5, per Cmd+K, die Fundstelle markiert
  - Mehrere Leute im selben Space – Änderungen der anderen erscheinen nach spätestens 15 Sekunden. Ändern zwei dieselbe Notiz, fragt die App, welche Fassung gilt, statt still zu überschreiben
  - Verlauf je Notiz mit den letzten zehn Fassungen, wiederherstellen per Klick
  - Anhänge bis 10 MB – Bilder mit Vorschaubild, PDF und Word-Dateien mit Vorschau im Fenster
  - Farben mit Filter, Auswahlmodus zum Löschen oder Kopieren mehrerer Notizen
  - Export je Space als JSON oder Markdown, konsistente Backups über den Backup-Befehl von SQLite statt Dateikopie
engineering:
  - Ausgelegt auf einen Raspberry Pi Zero 2 W mit 512 MB RAM – kein Frontend-Framework, kein JavaScript-Build. Nur das CSS baut Tailwind vorab auf dem Laptop, der Pi braucht zur Laufzeit kein Node
  - FTS5 statt externer Suche, weil der Pi keine zweite Datenbank verträgt
  - Die Fäden werden nicht gespeichert, sondern aus der Elternnotiz abgeleitet. Nur Querverbindungen sind eigene Zeilen in der Datenbank
  - Der Abgleich holt nur, was sich seit dem letzten Mal geändert hat. Gelöschte Notizen protokolliert ein SQLite-Trigger
  - Beim Ziehen bewegt sich eine Notiz nur per CSS-Transform, gespeichert wird einmal beim Loslassen
  - Uvicorn mit reinem Python-Stack (asyncio, h11), weil die nativen Beschleuniger auf neuen Python-Versionen und macOS/ARM abstürzten
  - Die App startet nicht ohne eigenen geheimen Schlüssel, und jede Änderung über die API braucht ein CSRF-Token
learnings:
  - Zielhardware zuerst festlegen, dann den Stack wählen – nicht umgekehrt
  - Abgleich und Speichern müssen voneinander wissen. Kommt ein Abgleich, während eine verschobene Notiz noch gespeichert wird, darf er sie nicht zurücksetzen. Seit Juni pausiert er, bis die neue Position gespeichert ist
  - Kein Umbau ohne Tests. Die Datei notes.js hat rund 1.900 Zeilen, weil Auswahl, Ziehen, Größe und Verbinden denselben Pointer-Zustand teilen. Aufgeteilt wird erst, wenn Browser-Tests diese Gesten absichern
---

Eine App für eine kleine Gruppe, die ihre Notizen nicht in einer Cloud haben will. Statt Listen gibt es
eine freie Fläche: Jede Notiz hängt an einer anderen wie in einem Stammbaum, und wo zwei Gedanken
zusammengehören, verbindet sie ein gestrichelter Faden. Mehrere Leute arbeiten im selben Space, am
Laptop wie am Handy.

Das Gerät ist ein Raspberry Pi Zero 2 W mit 512 MB Arbeitsspeicher, und das hat jede technische
Entscheidung bestimmt: eine SQLite-Datei statt eines Datenbankservers, Seiten vom Server statt eines
Frontend-Frameworks, die Suche in derselben Datei statt in einer zweiten Datenbank.
