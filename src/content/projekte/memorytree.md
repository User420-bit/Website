---
title: MemoryTree
summary: Web-App als gemeinsames Erinnerungsbuch für Paare. Fotos und Meilensteine wachsen als Baum, dazu Zeitleiste, Karte und Galerie.
techStack: [Python, FastAPI, SQLAlchemy, Alembic, Postgres, Vercel, Tailwind, Docker]
kind: eigenes-produkt
period: Juli – August 2026
status: Läuft auf Vercel. Öffentlich unter MIT-Lizenz.
github: null
live: null
order: 5
features:
  - Erinnerungen, Fotos und Meilensteine als organischer SVG-Baum
  - Timeline, Karte und Galerie als alternative Sichten
  - Mandantenfähig – jedes Paar sieht nur seine Daten
  - Registrierung nur per Einladungscode
  - Mehrsprachig über eigenes i18n-System
engineering:
  - Migration von SQLite lokal auf Postgres, Vercel Serverless und Vercel Blob – Alembic als einzige Schema-Quelle
  - Rate-Limiting pro IP und Account, TrustedHost, X-Forwarded-For korrekt behandelt, ein CVE-Fix
  - Regressionsskript, das die Mandanten-Isolation bei jeder Änderung prüft
  - DB-Roundtrips pro Seite reduziert, Tailwind vom CDN auf Prebuild umgestellt, Region fra1
learnings:
  - Mandanten-Isolation ist keine Eigenschaft des Codes, sondern ein Test, der bei jedem Commit läuft
  - Serverless verändert das Datenbank-Denken – jeder Roundtrip zählt
---

Eine private Web-App mit echten Nutzerdaten, deshalb mit dem Sicherheitsanspruch einer öffentlichen
Anwendung gebaut. Der Code ist öffentlich, die Daten der Paare nicht: keine offene Registrierung,
Isolation zwischen Mandanten per Regressionstest abgesichert.
