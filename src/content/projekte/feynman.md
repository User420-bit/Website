---
title: Feynman-Prototyp
summary: Lerntool mit lokalem Sprachmodell. Der Nutzer erklärt ein Thema, das Modell findet Verständnislücken und tutort nach.
techStack: [Python, Flask, Ollama, pytest]
kind: prototyp
period: Juli – August 2026
status: Prototyp mit Testsuite. Latenz-Experimente dokumentiert.
github: null
live: null
order: 7
features:
  - Prüfer-Tutor-Architektur nach der Feynman-Methode
  - Läuft komplett lokal über Ollama – keine Daten verlassen den Rechner
  - Testsuite, geteilt in schnelle und langsame Marker
engineering:
  - Polaritätsprüfung schließt die Schwäche reiner Wortüberlappungs-Checks – widerspricht die Erklärung der Kernaussage?
  - Grounding-Fix gegen halluzinierte Lücken
  - Latenz-Experimente dokumentiert, auch die verworfenen
learnings:
  - Ein LLM als Prüfer braucht selbst einen Prüfer – ohne Grounding erfindet es Lücken
  - Testsuites für LLM-Anwendungen müssen in schnell und langsam getrennt sein, sonst laufen sie nicht
---

Ein Prototyp, um zu prüfen, ob ein lokales Sprachmodell als Lernpartner taugt. Die Antwort war: ja,
aber nur mit Kontrollen. Die interessanten Teile sind nicht die Prompts, sondern die Mechanismen, die
das Modell daran hindern, Lücken zu erfinden oder eine Erklärung zu loben, die dem Thema widerspricht.
