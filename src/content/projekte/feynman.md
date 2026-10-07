---
title: Feynman-Prototyp
summary: Lernprogramm mit einer KI, die auf dem eigenen Rechner läuft. Man erklärt einen Lernstoff in eigenen Worten, die KI prüft jede Aussage dagegen und weist auf Fehler hin, ohne die Lösung gleich zu verraten.
techStack: [Python, Flask, Ollama, JavaScript, pytest]
kind: prototyp
period: Juli – Oktober 2026
status: Prototyp mit Testsuite. Läuft nur auf dem eigenen Rechner, deshalb ohne Live-Demo.
github: null
live: null
order: 7
screenshots:
  - image: ../../assets/projekte/feynman.png
    caption: 'Die Tafel nach drei Runden zum Mauerfall: links das Arbeitsblatt mit Markierungen, in der Mitte das Gespräch, rechts das Urteil des Prüfers'
  - image: ../../assets/projekte/feynman-arbeitsblatt.png
    caption: 'Das Arbeitsblatt: Grün ist richtig erklärt, Blau ist der Satz, der die Frage des Lernenden beantwortet'
  - image: ../../assets/projekte/feynman-pruefer.png
    caption: 'Der Prüfer: „Ok, dann war es 1989“ wird als Antwort auf die frühere Behauptung geprüft, die Frage im Lernstoff nachgeschlagen'
  - image: ../../assets/projekte/feynman-handy.png
    caption: 'Auf dem Handy wechseln Reiter zwischen Lernstoff, Gespräch und Prüfer'
features:
  - Prüfer-Tutor-Architektur nach der Feynman-Methode – der Prüfer urteilt über jede einzelne Aussage, der Tutor führt das Gespräch
  - Tafel mit drei Flügeln – Arbeitsblatt mit farbigen Markierungen, Gespräch und die Notizen des Prüfers
  - Hinweisleiter pro Fehler – erst benennen, dann die Stelle auf dem Arbeitsblatt markieren, erst beim dritten Mal die Lösung
  - Fragen werden im Lernstoff nachgeschlagen, nicht aus dem Wissen des Modells beantwortet
  - Läuft komplett lokal über Ollama – keine Daten verlassen den Rechner
  - Testsuite, geteilt in schnelle und langsame Marker
engineering:
  - Der Prüfer sieht nur den Lernstoff und die eine Aussage, keinen Verlauf – so kann er dem Lernenden nicht nach dem Mund reden. Das Gedächtnis des Gesprächs liegt als Fehlerregister im Code
  - Polaritätsprüfung als Gegenprobe – ein zweiter, getrennter Aufruf prüft, ob der Beleg die Aussage stützt oder ihr widerspricht. Sind sich beide uneinig, gilt die Aussage als unsicher
  - Grounding-Fix gegen halluzinierte Lücken – jeder Befund braucht einen Beleg im Lernstoff, und der Prüfer darf dem Lernenden kein Zitat unterschieben
  - Welcher Fehler als Nächstes drankommt, entscheidet fester Code ohne Sprachmodell. Der Tutor formuliert nur, und ein Filter fängt ab, wenn er die Lösung zu früh verrät
  - Latenz-Experimente dokumentiert, auch die verworfenen
learnings:
  - Ein LLM als Prüfer braucht selbst einen Prüfer – ohne Grounding erfindet es Lücken
  - Testsuites für LLM-Anwendungen müssen in schnell und langsam getrennt sein, sonst laufen sie nicht
  - Das Gedächtnis gehört in den Code, nicht ins Modell. Solange der Tutor nur die aktuelle Runde sah, vergaß er in Runde 2 einen noch offenen Fehler
  - Schon ein Hinweis kann die Lösung verraten. „Welche Rolle spielte die Pressekonferenz von Günter Schabowski?“ enthielt die Antwort, deshalb zeigt eine Lücke jetzt nur noch auf ihren Satz
---

Ein Prototyp, um zu prüfen, ob ein lokales Sprachmodell als Lernpartner taugt. Die Antwort war: ja,
aber nur mit Kontrollen. Die interessanten Teile sind nicht die Prompts, sondern die Mechanismen, die
das Modell daran hindern, Lücken zu erfinden oder eine Erklärung zu loben, die dem Thema widerspricht.

Seit Ende September führt der Prototyp ein Gespräch statt einzelner Prüfungen: Er merkt sich offene
Fehler über die Runden, spricht sie wieder an und gibt die Lösung erst beim dritten Mal. Jede Runde
zeigt ihre gemessene Zeit. Im Durchlauf auf den Bildern (6. Oktober 2026, RTX 4070) brauchte die erste
Runde 112 Sekunden, weil das Modell erst in den Grafikspeicher geladen wurde, die beiden folgenden 14
und 11 Sekunden.
