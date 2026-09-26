# Plan: Mehr Bewegung – die Arbeiten bewegen sich, der Text steht

Stand: 2026-09-26 · Basis: Commit `01a7eda` auf `main` · Status: Punkt 1 umgesetzt auf
`feat/bewegung-kachel-uebergang`, alle anderen Punkte offen · Autor: erstellt per Claude Code Session,
Review durch Pharrel ausstehend

---

## 0. Zusammenfassung

Die Projektseiten bewegen sich schon: Jede hat eine Bühne mit eigener Szene
([`PROJEKTSZENEN_PLAN.md`](PROJEKTSZENEN_PLAN.md)). Die Startseite, die jeder Besucher sieht, steht
dagegen fast still. Die Kacheln zeigen Standbilder, drei davon (NoteList, Feynman, Availably) nur
einen Satz auf weißer Fläche, und die Bewegung der Szenen erreicht die Startseite nie.

Der Plan bringt Bewegung dorthin, wo sie etwas zeigt: an die Arbeiten. Der Leitsatz:

> **Die Arbeiten bewegen sich, der Text steht.**

Grund: Text, der beim Scrollen einfliegt, erleben Besucher wie eine Ladezeit (Nielsen Norman Group
2017, im Vault-Bericht „Was Nutzer 2026 auf einer Website hält und weiterklicken lässt“, Abschnitt
3.5). Bewegt werden deshalb Belege, Linien und Übergänge, nie Überschriften oder Fließtext.

Technik: CSS zuerst, keine Animationsbibliothek, nichts von fremden Servern. Die
Datenschutzerklärung bleibt dadurch gültig, und `scripts/verify-build.mjs` braucht keine Ausnahme.

## 1. Regeln für jeden Punkt

- Bewegung nur bei `prefers-reduced-motion: no-preference`; ohne Bewegung steht der Endzustand.
- Die H1 bleibt das Erste, was steht (LCP). Kein Einblenden von Text.
- Kurve und Dauern aus dem System: `--ease-quiet`, 120 / 200 / 320 ms. Länger nur in Szenen und
  Aufnahmen.
- Schleifen nur bei echten Produktaufnahmen und in Szenen. Was von selbst länger als 5 s läuft,
  braucht eine Pause-Taste (WCAG 2.2.2).
- Aufnahmen zeigen nur Beispieldaten, nie echte Rechnungen oder Kontakte.
- Vor und nach jeder Phase messen: LCP bleibt die H1, CLS 0, Lighthouse Accessibility ≥ 95, einmal
  auf dem iPhone in Safari. Firefox kann keine scrollgesteuerten Animationen und keinen Übergang
  zwischen Dokumenten; dort steht alles, und das ist gewollt.

## 2. Die Punkte

| Nr. | Punkt                                                                  | Aufwand  | DESIGN.md                           | Status                   |
| --- | ---------------------------------------------------------------------- | -------- | ----------------------------------- | ------------------------ |
|     | **Phase 1: die Arbeiten zeigen**                                       |          |                                     |                          |
| 1   | Kachel wächst in die Projektseite                                      | klein    | erweitert „Seitenwechsel“           | umgesetzt (Abschnitt 3)  |
| 2   | Echte Bildschirmaufnahmen in den Kacheln                               | groß     | neuer Eintrag nötig                 | offen, Entscheidung      |
| 3   | Die Bühne oben spielt die Aufnahme                                     | mittel   | neuer Eintrag nötig                 | offen, hängt an 2        |
| 4   | Satzkacheln (NoteList, Feynman, Availably) bekommen Aufnahme oder Bild | mittel   | ändert „Don't: Szene in die Kachel“ | offen, Entscheidung      |
|     | **Phase 2: Rhythmus über die Seite**                                   |          |                                     |                          |
| 5   | Kapitel-Linie zieht beim Hereinscrollen auf                            | klein    | neuer Eintrag nötig                 | offen                    |
| 6   | Ablauf-Linien füllen sich beim Scrollen                                | klein    | neuer Eintrag nötig                 | offen                    |
| 7   | Umschalter blendet das Raster über                                     | klein    | ändert „wechseln ohne Übergang“     | offen                    |
| 8   | Knöpfe geben beim Drücken nach, Häkchen beim Kopieren                  | klein    | neuer Eintrag nötig                 | offen                    |
|     | **Phase 3: Projektseiten**                                             |          |                                     |                          |
| 9   | Lightbox: Vorschaubild wächst ins große Bild                           | mittel   | neuer Eintrag, braucht Skript       | offen                    |
| 10  | Vor/Zurück schiebt in Blätterrichtung                                  | mittel   | neuer Eintrag, braucht Skript       | offen                    |
| 11  | Szenen ohne Bewegung ergänzen                                          | je Szene | keine (Bühnenlizenz)                | offen                    |
|     | **Optional**                                                           |          |                                     |                          |
| 12  | Loop des Bühnenprojekts neben der H1                                   | mittel   | ändert „Keine Hero-Animation“       | nach Phase 1 entscheiden |

Notizen zu den offenen Punkten:

- **2 und 3:** Aufnahme mit Playwright (`scripts/screenshots.mjs` erweitern), Umwandlung mit ffmpeg
  in WebM und MP4, 4 bis 8 s, stumm, höchstens 500 KB je Clip, `preload="none"`, das heutige
  Standbild als Poster. Am Desktop spielt der Loop bei Hover, am Handy, sobald er im Bild ist; dafür
  braucht es ein kleines Skript wie `NavHighlight`. Am Handy gehört eine Pause-Taste dazu.
- **4:** Entweder eine Aufnahme wie in 2 oder ein ruhiger Ausschnitt der Szene. Der zweite Weg bricht
  die heutige Regel, dass Farben und Bewegung einer Szene die Bühne nicht verlassen.
- **5 und 6:** `animation-timeline: view()` hinter `@supports`, in Langschreibweise wegen des
  Minifiers. Die Linie bewegt sich, der Text daneben steht sofort.
- **7:** reines CSS: `transition` auf `opacity` und `display` mit `allow-discrete` und
  `@starting-style`, 200 ms.
- **9:** Ohne Skript geht nur ein Einblenden mit `@starting-style`. Ein echtes Wachsen vom Vorschaubild
  aus braucht `document.startViewTransition`.
- **10:** Ein Inline-Skript unter 1 KB setzt in `pageswap` und `pagereveal` einen Übergangstyp
  (`vor` oder `zurueck`); das CSS schiebt danach links oder rechts.

## 3. Punkt 1: Kachel wächst in die Projektseite

**Was passiert.** Ein Klick auf eine Kachel, auf die Bühne oben oder auf eine Zeile mit Bild unter
`/projekte/` lässt deren Bildfeld in 320 ms an die Stelle des ersten großen Bildes der Projektseite
wachsen. Die übrige Seite blendet wie bisher in 200 ms über. Mit „Zurück“ läuft es umgekehrt. Das
alte Bild blendet in 120 ms aus, damit es nicht vergrößert über dem neuen steht; das neue ist live und
spielt die Ladebewegung seiner Szene schon im wachsenden Rahmen.

**Technik.** Native View Transition zwischen Dokumenten, die für den Seitenwechsel schon lief. Beide
Seiten markieren ihr Element mit `data-uebergang`. Den Namen `projekt-<slug>` liefert `uebergang()`
aus `src/lib/site.ts`: Kachel, Bühne und Zeile setzen ihn selbst, auf der Projektseite setzt ihn der
`<article>` und das markierte Element erbt ihn. Das CSS steht in `src/styles/global.css` unter
„Seitenwechsel“.

Zwei Befunde aus dem Test haben die Umsetzung geformt:

- **Namen nur während des Übergangs** (`:root:active-view-transition`). Ein Name macht das Element
  zum eigenen Stapelkontext. Dauerhaft gesetzt, lag das Bild der Bühne oben über ihrem gestreckten
  Link, und ein Klick darauf führte nirgends hin.
- **Namen nur im Fenster** (`ProjectTransition.astro`, winziges Inline-Skript im `<head>`). Ohne das
  flog die Bühne nach dem Lesen einer Projektseite beim Zurück von weit oben in ihre Kachel, und über
  einen Beleg-Link in „Leistungen“ kam eine Kachel von außerhalb des Fensters herein. Ein reiner
  CSS-Weg über `animation-timeline: view()` greift nur auf der alten Seite: Auf der neuen gibt es
  beim ersten Bild noch kein Layout, und der Übergang fiel ganz weg.

**Ziel je Projektseite.** Das erste große Bild im ersten Bildschirm, gemessen bei 1280 × 800 und
390 × 844:

| Projekt               | Ziel                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Kleinkram             | Leitbild der Galerie, derselbe Screenshot wie in der Kachel                                       |
| TIEFGANG              | erste Schicht der Mine („Erdreich“)                                                               |
| MemoryTree            | Baum-Szene                                                                                        |
| NoteList              | Wurzel-Notiz mit Titel und Summary                                                                |
| Feynman               | Tafel                                                                                             |
| DealerSim             | Raum                                                                                              |
| Vaulter               | Eingang mit Reitern, Feld und Notiz                                                               |
| Availably             | die zwei Telefone                                                                                 |
| PointCare, JustBeauty | noch keins, beide unveröffentlicht. Beim Veröffentlichen meldet `verify-build` das fehlende Ziel. |

**Grenzen.**

- Chrome und Edge ab 126, Safari ab 18.2. Firefox wechselt die Seite ohne Übergang.
- Beim Zurück kommt die Startseite im Normalfall aus dem Back-Forward-Cache, dann morpht es. Lädt sie
  neu, steht sie beim ersten Bild oft noch oben, und die Bühne ist neu ausgelost. Dann blendet sie nur
  über, statt ins Leere zu morphen.
- Ohne JavaScript morpht jedes Paar, auch von außerhalb des Fensters.

**Geprüft am 2026-09-26.**

- `npm run verify` grün; die neue Prüfung in `verify-build` findet genau ein Ziel je Projektseite und
  jedes Projekt auf der Startseite.
- Im Build-CSS geprüft, dass der Minifier die Regeln unverändert lässt.
- Testlauf mit Playwright gegen `dist/` in Chromium 153 (neuer Headless-Modus, Back-Forward-Cache an),
  147 Prüfungen grün: alle acht Projekte bei 1280 × 800 und 390 × 844 hin und zurück (zurück jeweils
  aus dem Cache), die Bühne oben je Projekt, eine Zeile unter `/projekte/`, die drei Sonderfälle
  (gelesen und zurück, Projektseite → „Leistungen“, Beleg-Link) ohne Morph, bei
  `prefers-reduced-motion: reduce` kein Übergang. Keine Konsolenfehler, keine doppelten Namen, die
  Mitte jedes Bildfelds trifft den Link.
- Zeitlupen-Aufnahmen (20-fach langsamer) je Projekt früh, spät und beim Zurück durchgesehen.
- **Nicht geprüft:** Safari. Playwright hat hier kein WebKit installiert. Vor dem Zusammenführen
  einmal auf dem iPhone ansehen.

## 4. Offene Entscheidungen für Pharrel

1. **DESIGN.md öffnen?** Die Punkte 2 bis 10 verstoßen gegen die heutige geschlossene Liste der
   Bewegungen und gegen „Bewegung nur auf der Bühne“. Die Liste bekäme neue Einträge, statt
   wegzufallen.
2. **Echte Bildschirmaufnahmen:** ja oder nein, und von welchen Projekten? Dafür müssen die Apps lokal
   mit Beispieldaten laufen.
3. **Loop neben der H1:** ja, nein oder erst nach Phase 1?
