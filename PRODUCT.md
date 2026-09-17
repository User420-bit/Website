# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primär: potenzielle Kunden.** Selbstständige, kleine Unternehmen und kleine Teams, vor allem im Raum
Rosenheim, die eine Website, eine Web-App oder ein kleines Werkzeug für einen konkreten Prozess brauchen
und dafür weder eine Agentur noch einen Baukasten noch eine große Software-Suite wollen. Meist keine
Technik-Profis. Sie kommen mit drei Fragen: Kann Klartext mein Problem lösen? Ist die Arbeit gut? Ist die
Person dahinter vertrauenswürdig und gut ansprechbar?

**Sekundär: Arbeitgeber.** Personaler und Fachbereichsleiter, die eine Werkstudentenstelle
Wirtschaftsinformatik im Raum Rosenheim besetzen. Die Seite nennt diese Verfügbarkeit, richtet sich aber
nicht danach aus. (Der ältere `docs/REWORK_PLAN.md` nannte Arbeitgeber als Hauptzielgruppe. Am 2026-09-16
vom Inhaber geändert: Kunden zuerst.)

## Product Purpose

Die Seite stellt Klartext vor, ein Einzelunternehmen aus Rosenheim von Pharrel Sandjo Djomou
(Wirtschaftsinformatik-Student an der TH Rosenheim). Klartext baut kleine Programme, Websites und
Web-Apps für kleine Unternehmen. Zweck der Seite: aus einem interessierten Besucher ein Gespräch machen.

Erfolg zählt in jeder dieser Formen:

- Der Besucher schreibt eine E-Mail-Anfrage (Haupt-Handlungsaufforderung).
- Der Besucher öffnet eine Referenzseite und prüft die Belege.
- Der Besucher vernetzt sich oder schreibt über LinkedIn.

## Positioning

Der Name ist das Versprechen: verständliche Sprache statt Fachchinesisch, ehrliche Aussagen zu Aufwand,
Nutzen und Grenzen **bevor** eine Zeile Code entsteht, und ein klares „Das Werkzeug von der Stange
reicht“, wenn das stimmt. Jede Leistung ist mit einem echten, benannten Projekt belegt. Jede Referenzseite
zeigt auch, was nicht funktioniert hat („Erkenntnisse“). Claim: „Kleine Software, klar gebaut.“

## Operating Context

- Besucher kommen über Direktlink, Suche, LinkedIn oder eine Bewerbung. Viele lesen am Handy.
- Sprache: nur Deutsch. Das Content-Modell soll Englisch später nicht verbauen.
- Inhalte liegen als Dateien im Repository: `src/content/*.json`, `about.md`, `projekte/*.md`. Kein CMS,
  kein Admin-Bereich, keine Datenbank. Inhalt ändern heißt: Datei bearbeiten, committen.
- Hosting: GitHub Pages unter der eigenen Domain `https://web-klartext.de/`, Base-Pfad `/`. Push auf
  `main` deployt automatisch.

## Capabilities and Constraints

- Vorhandener Stack: Astro 7 (statisch) und Tailwind CSS 4. CI prüft Typen, ESLint mit
  Accessibility-Regeln, Prettier und den Build (`scripts/verify-build.mjs`: Routen, H1 der Startseite
  gegen den Claim in `company.json`, Meta-Tags, tote Links, externes JS).
- Seiten: Startseite (Arbeiten, Leistungen, Arbeitsweise, Über Klartext, Kontakt), eine Seite pro
  Projekt unter `/projekte/<slug>/`, alle Arbeiten unter `/projekte/`, Werkzeuge unter `/werkzeuge/`, Impressum, Datenschutz, 404.
- Recht: Impressumspflicht nach § 5 DDG. `scripts/guard-legal.mjs` blockiert den Deploy, bis `street`
  und `zipCity` in `src/content/legal.json` gesetzt sind. Beide sind noch `null`, die Seite ist also
  nicht live.
- Aktuelle Umsetzungsentscheidungen, vom Inhaber **nicht als verbindlich bestätigt**: kein Tracking,
  keine Cookies, keine Drittanbieter-Ressourcen, keine Speicherung im Browser, fast kein JavaScript,
  Hell-/Dunkelmodus nach Systemeinstellung. Die Datenschutzerklärung beschreibt diesen Zustand. Jede
  Änderung daran muss deshalb auch `src/content/legal.json` und die Datenschutz-Seite anpassen.
- Es gibt noch keine Logo-Datei. Der Header zeigt die Wortmarke als Text, das Favicon ein oranges
  Quadrat mit „K“ als Platzhalter.
- Es gibt noch kein Portrait (`profile.json` → `portrait: null`).
- Felder mit `null` bedeuten „nicht bestätigt“ und werden nicht gerendert. Platzhalter in eckigen
  Klammern brechen absichtlich den Build.

## Brand Commitments

- Name: **Klartext**. Claim: **„Kleine Software, klar gebaut.“**
- Stimme: klares Deutsch, kein Fachchinesisch, ehrlich und konkret, keine Superlative. Grenzen und
  Fehler werden offen benannt.
- Anrede: „Sie“, und nur dort, wo die Seite Besucher direkt anspricht. Sonst unpersönlich
  („Klartext baut …“). Am 2026-09-16 vom Inhaber festgelegt.
- Begriffe: „kleine Programme“ statt „Insellösungen“, „KI“ statt „AI“. Leistungen werden als Ergebnis
  für den Betrieb beschrieben; Technologienamen stehen auf den Projektseiten, nicht in Texten der
  Startseite.
- Website-Inhalte bei Kunden pflegt Klartext: Kunden schicken Änderungen per E-Mail, Klartext setzt
  sie um. Am 2026-09-16 vom Inhaber bestätigt.
- Die Person wird nur in der Sektion „Über Klartext“ und im Impressum genannt.
- KI-Werkzeuge werden eingesetzt und einmal offen deklariert, in der Arbeitsweise, nicht als Badge auf
  jeder Karte.
- Werte laut `src/content/about.md`: Klartext, Struktur, Pragmatismus, Lernen.

## Evidence on Hand

- 9 Referenzen in `src/content/projekte/`: TIEFGANG (eigenes Produkt, spielbar unter
  https://tiefgang.pages.dev, 184 Commits, 61 Pull Requests), PointCare (Kundenprojekt für point-care.de,
  Live-Link folgt), JustBeauty (Analyse und Prototyp), kleinkram, MemoryTree, NoteList, Feynman,
  DealerSim, Availably.
- Leistungsbereiche mit Projektbelegen in `src/content/leistungen.json`: Websites, Web-Apps und kleine
  Programme, Browser-Spiele und Interaktives, KI und Konzept.
- Kontakt: E-Mail `info@web-klartext.de`, LinkedIn. Antwort in der Regel innerhalb eines Werktags.
- **Nicht vorhanden, nicht erfinden:** Kundenstimmen, Kundenlogos, Preise oder Pakete, Bewertungen,
  Kennzahlen über die Projektdateien hinaus, Portrait, Logo, GitHub-Profil-Link.

## Product Principles

1. **Belege statt Behauptungen.** Jedes Versprechen zeigt auf ein echtes Projekt. Ohne Beleg keine Aussage.
2. **Klartext vor Code.** Die Seite selbst muss für einen Inhaber ohne Technikwissen so verständlich
   sein wie die Leistung, die sie anbietet.
3. **Ehrliche Grenzen.** Zeigen, was nicht funktioniert hat, und wann eine kleinere Lösung oder ein
   fertiges Werkzeug reicht.
4. **Ein Gespräch beginnt leicht.** Die E-Mail-Anfrage ist immer einen offensichtlichen Schritt entfernt.
5. **Pflegbar durch eine Datei.** Inhaltsänderungen brauchen nie mehr Werkzeug als Git.

## Accessibility & Inclusion

Das Repository zielt auf Lighthouse Accessibility ≥ 95 und 0 axe-Verstöße, erzwingt jsx-a11y-Regeln im
Lint und respektiert `prefers-reduced-motion`. Einen darüber hinausgehenden Standard hat der Inhaber
nicht festgelegt.
