---
title: Vaulter
summary: Mac-Werkzeug, das aus einem Link zu YouTube, Instagram oder TikTok eine deutsche Notiz für die eigene Wissenssammlung in Obsidian macht. Nimmt auch Online-Besprechungen auf und schreibt live mit.
techStack: [Python, FastAPI, yt-dlp, mlx-whisper, Claude, Swift, pytest]
kind: eigenes-produkt
period: September 2026
status: Im eigenen Gebrauch, alles Geplante ist gebaut. Einige Wege sind bisher nur durch Tests gedeckt, etwa TikTok und die Aufnahme ohne Kopfhörer. Der Code ist privat.
github: null
live: null
order: 9
screenshots:
  - image: ../../assets/projekte/vaulter-links.png
    caption: 'Links einreihen: einfügen oder aufs Fenster ziehen, auf Wunsch mit Auswertung der Bilder oder ganz ohne KI'
  - image: ../../assets/projekte/vaulter-bibliothek.png
    caption: 'Die Bibliothek: wie viel Platz die Einträge belegen und zu jedem Eintrag die Notiz. „Medien löschen“ gibt Platz frei, Transkript und Zusammenfassung bleiben'
  - image: ../../assets/projekte/vaulter-meeting.png
    caption: 'Ein Gespräch aufnehmen: Der Knopf bleibt gesperrt, bis bestätigt ist, dass alle Teilnehmenden einverstanden sind'
features:
  - Ein Link zu einem YouTube-Video, einem Instagram-Reel oder -Bildbeitrag oder einem TikTok wird zur Notiz mit Transkript, Zusammenfassung, Kernaussagen und einer Einschätzung, wie viel Substanz der Inhalt hat
  - Bei Bildbeiträgen liest die KI den Text auf den Bildern, bei Videos beschreibt sie auf Wunsch einzelne Standbilder
  - Viele Links auf einmal über eine Warteschlange, auch vom Handy über eine Datei in iCloud Drive oder per Lesezeichen im Browser
  - Gespräche aus Teams, Zoom, Meet oder Discord werden lokal aufgenommen, live mitgeschrieben und danach als Notiz abgelegt
  - Bedienung über die Kommandozeile oder eine Oberfläche im Browser, auf dem Mac auch als eigene App
  - Bibliothek mit dem Speicherbedarf je Eintrag; Löschen legt in den Papierkorb, nie endgültig
engineering:
  - Die KI liefert strukturierte Daten, die Notiz entsteht aus einer eigenen Vorlage – so stimmt das Format immer, egal was das Modell antwortet
  - Ohne KI, etwa bei einem Ausfall, entsteht trotzdem eine gültige Notiz aus Metadaten und Transkript
  - Transkription lokal auf dem Mac mit Whisper; bei YouTube reichen vorhandene Untertitel, dann wird gar nichts heruntergeladen
  - Jede Stufe speichert ihr Ergebnis – ein zweiter Lauf lädt, transkribiert und fragt nichts erneut
  - Eine Quelle, eine Notiz – vorhandene Notizen erkennt Vaulter an der Quelle, nicht am Titel, und einsortierte Notizen fasst es nie an
  - Mikrofon und Systemton als zwei getrennte Spuren über einen eigenen Swift-Helfer, so ist ohne Sprechererkennung klar, wer spricht
learnings:
  - Downloader brechen ohne Vorwarnung, sobald eine Plattform etwas ändert – ein Update auf Knopfdruck und Fehlermeldungen mit konkreter Anweisung sind deshalb Kernfunktionen
  - Whisper erfindet Text, wenn niemand spricht – Pausen werden deshalb vorher herausgeschnitten
  - Bewusst nur lokal und nur für den eigenen Gebrauch – Plattformen sperren Anfragen aus Rechenzentren, und ein KI-Abo darf keinen Dienst für andere tragen
---

Ein Werkzeug für die eigene Wissenssammlung: Wer ein Video, einen Beitrag oder eine Besprechung
festhalten will, gibt den Link ein oder startet die Aufnahme. Danach liegt in Obsidian eine Notiz auf
Deutsch, mit Zusammenfassung, Kernaussagen und dem vollständigen Transkript. Vaulter legt nur neue
Notizen an, eingeordnet wird von Hand.

Entstanden im September 2026 in zehn geplanten Schritten. Das Transkript entsteht auf dem Mac, nur für
Zusammenfassung und Kernaussagen geht der Text an Claude. Über 400 Tests laufen ohne Netz.
