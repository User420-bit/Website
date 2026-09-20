# Plan: Kapitel statt Steckbrief – klare Übergänge und ein aufgeräumter Kontakt

Stand: 2026-09-20 · Basis: Commit `d00ee8f` auf `main` · Status: umgesetzt am 2026-09-20 · Autor: erstellt per Claude Code Session, Review durch Pharrel ausstehend

> **Umgesetzt am 2026-09-20** in vier Commits auf `claude/keen-shannon-2a1sed`: Kapitelkopf (`5645b67`), `NumberedRows` (`af70d55`), Kontakt (`5717e7f`), Designsystem (der Commit, der diesen Vermerk trägt). Abweichungen vom Plan, alle bewusst:
>
> - **Erreichbarkeit steht links unter dem Knopf, nicht rechts** (1.3). Rechts hätte die alte Schieflage wiederholt: kurze linke Spalte neben langer rechter. Jetzt enden beide Spalten fast auf gleicher Höhe. Die Antwortzeit bleibt im Sektions-Intro; `responseTime` ist ein ganzer Satz, für eine Zeile „Antwort – …“ bräuchte es ein neues Inhaltsfeld.
> - **„Oder an“ statt „Bis das Postfach zustellt“** (1.3). Eine Startseite, die ankündigt, dass das eigene Postfach nicht zustellt, schadet dem Absender. Die Zeile verschwindet mit `fallbackEmail: null` von selbst.
> - **Commit 2 hat beide Nummernlisten ersetzt**, nicht nur Arbeitsweise (1.6): so ist er ein reiner Refactor ohne sichtbare Änderung, und Commit 3 trägt nur den Kontakt.
> - **Die H2 nutzt den Token Headline** (`tracking-tight`, 1,111) statt `.display`; so braucht das Designsystem keinen neuen Token. Der Feature-Titel bekommt dafür **Title Medium** (1,5rem), weil er sonst nur eine Fünftel-Stufe unter der H2 stünde.
> - Der LinkedIn-Link in der Kontakt-Meta-Liste trägt kein `rel="me"` mehr; die generische `MetaList` setzt `noopener noreferrer`. Der Link in „Über Klartext“ behält `me`.
>
> Geprüft: `npm run verify` grün; Screenshots 1440 px und 390 px, hell und dunkel; beide Kopier-Knöpfe schreiben die richtige Adresse und melden „Kopiert.“ in der eigenen Zeile; die Tintenlinie wirkt im Dunkelmodus nicht härter als im Hellmodus (Risiko aus Abschnitt 4 entfällt); der aktive Navigationsanker springt mit der größeren Kapitelluft nicht um.

Konfidenz-Tags wie in [`REWORK_PLAN.md`](REWORK_PLAN.md): **[Sicher]** = im Code oder im Screenshot des Builds belegt (Chromium, 1440 px und 390 px, hell und dunkel) · **[Wahrscheinlich]** = starke Schlussfolgerung · **[Vermutung]** = Annahme, die Pharrel bestätigen muss.

---

## 0. Zusammenfassung (die unbequeme Version)

Die Übergänge wirken nicht willkürlich, weil etwas fehlt, sondern weil alles gleich aussieht. Das Werkstattbuch hat nur eine Linienstärke, eine Überschriftengröße und einen Abstand im Einsatz – damit kann das Auge Kapitel und Zeile nicht unterscheiden.

1. **[Sicher] Eine Linie für alles.** Dieselbe 1-px-Haarlinie in Liniengrau trennt Sektionen (`src/components/Section.astro:21`), Feature-Zeilen, Ledger-Zeilen, Aufklapper, Nummernlisten, „Weitere Arbeiten“ und die Anfrage-Zeile (`src/pages/index.astro:110`). In „Arbeiten“ stehen neun identische Linien; die Sektionslinie ist eine davon.
2. **[Sicher] Die Hierarchie steht auf dem Kopf.** Die H2 hat 1,25 rem (`Section.astro:31`), die Projekttitel darunter 1,875 rem (`src/components/ProjectFeature.astro:39`), die E-Mail-Adresse ebenfalls 1,875 rem (`src/components/CopyEmail.astro:18`). Das Auge findet „PointCare“, nicht „01 Arbeiten“.
3. **[Sicher] Abstände unterscheiden nicht zwischen innen und außen.** Sektion: `py-16` = 4 rem. Innerhalb von „Arbeiten“ steht die Anfrage-Zeile mit `mt-12` + `pt-8` = 5 rem Abstand, „Weitere Arbeiten“ mit `mt-12` = 3 rem. Innen ist teils mehr Luft als zwischen den Sektionen.
4. **[Sicher] Kontakt stapelt drei Raster.** Das Sektionsraster `11rem | 1fr`, darunter zwei gleich große Adressen mit Kopier-Knopf auf der Grundlinie (unterschiedliche x-Positionen, dazwischen „oder“), darunter ein `2fr | 3fr`-Raster (`index.astro:299`) mit einer kurzen linken Spalte (Button, zwei Textzeilen) neben einer langen rechten (drei Schritte). Dazu ein Hinweissatz und der dritte „E-Mail schreiben“-Knopf der Seite.
5. **[Sicher] Es gibt kein Formular.** `#kontakt` besteht aus Adresse, Knopf und Schrittliste; in `src/` existiert kein `<form>`. Ein echtes Formular bräuchte einen Empfänger-Dienst und widerspräche PRODUCT.md (keine Drittanbieter, keine Speicherung). Es bleibt bei E-Mail.

**Entschieden am 2026-09-20 (Rückfrage an Pharrel):** Tintenlinie als Kapitel-Linie plus große H2 – ja. Gmail-Adresse als kleine Ausweich-Zeile statt zweiter großer Adresse – ja.

**Rahmen:** `DESIGN.md` und `.impeccable/design.json` bleiben verbindlich (flach, keine Karten, keine Flächen, eine Akzentfarbe, geschlossene Bewegungsliste). Section-IDs und H1 ändern sich nicht; `scripts/verify-build.mjs` prüft Anker und Claim.

---

## 1. Umsetzung

### 1.1 `src/components/Section.astro` – Kapitelkopf

- Außenlinie: `border-t border-fg` (Tintenlinie) statt `border-border`. Die Tinte gehört damit der Sektion; alles Innere bleibt Haarlinie.
- Abstand: `py-16 sm:py-24` (4 rem / 6 rem) statt `py-12 sm:py-16`. Inhalt unter dem Kopf `mt-10 sm:mt-12`.
- Kopf-Raster bleibt `lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-12`, der Inhalt verteilt sich neu:
  - Randspalte: nur die Nummer (`text-sm text-fg-muted tabular-nums`).
  - Inhaltsspalte: H2 in **Headline** (`display text-3xl sm:text-4xl`, also 1,875 / 2,25 rem, Gewicht 600, −0,03 em), darunter das Intro `mt-4 max-w-[65ch] text-fg-muted` (bleibt Body 1 rem).
  - Unter `lg`: Nummer, H2, Intro gestapelt (`mt-1` / `mt-4`).
- Kommentar am Dateianfang anpassen: Kapitelöffnung = Tintenlinie + Nummer + große H2.

### 1.2 Innere Hierarchie an die neue H2 anpassen

- `ProjectFeature.astro:39`: nicht-kompakt `text-2xl sm:text-3xl` → `text-xl sm:text-2xl` (1,5 rem), kompakt `text-xl`. Der Titel bleibt damit unter der H2.
- `index.astro:129`, Leistungsspalten: `border-t border-fg` → `border-t border-border`.
- Zwischentitel („Weitere Arbeiten“ `:86`, „Im Einzelnen“ `:139`, „So läuft eine Anfrage ab“ `:339`) auf ein Muster bringen: `mt-12 mb-0 text-sm font-medium text-fg-muted`, optionaler Erklärsatz `mt-1 text-sm`, Liste `mt-3 border-t border-border`. Heute stehen `mt-6`, `mt-12` und `m-0` nebeneinander.
- Anfrage-Zeile `index.astro:110`: `mt-12 border-t border-border pt-8` → `mt-10 border-t border-border pt-6`. Regel: innen höchstens 3 rem, außen 4 bis 6 rem.
- Die Nummernliste in „Arbeitsweise“ (`index.astro:191`) und die Kontakt-Schritte (`index.astro:343`) sind dasselbe Muster mit zwei leicht abweichenden Klassensätzen. Beide wandern in `src/components/NumberedRows.astro` (Props: `items: { title, description }[]`, optionales `titleWidth` für die 10-rem-Spalte der Arbeitsweise).

### 1.3 Kontakt neu ordnen (`index.astro:281-359`, `CopyEmail.astro`)

Ein Raster, keine Freischweber. Unter dem Kopf ein zweispaltiges Raster ab `sm`, das an der linken Kante beginnt wie jeder andere Inhalt: `sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-12`. Beide Spalten öffnen mit derselben Haarlinie (`border-t border-border pt-6`), damit sie auf einer Höhe starten.

**Links – die Handlung**

1. Hauptadresse groß (Title Large 1,875 rem, `underline decoration-border underline-offset-8`). Kopier-Knopf und Status stehen **darunter**, nicht daneben (`flex flex-col items-start gap-3`).
2. Ausweich-Zeile in Body Small, Bleistiftgrau: „Bis das Postfach zustellt: klartextpsd.info@gmail.com“ als Link plus kleiner Kopier-Knopf in Text-Form und eigener Status. Nur gerendert, wenn `adressen.length > 1`; verschwindet mit `fallbackEmail: null` von selbst.
3. Der Satz „Öffnet sich kein Mailprogramm …“ wird zur Caption (`text-xs`) unter dem Kopier-Knopf statt eigener Absatz.
4. `Button` primär „E-Mail schreiben“ (`mt-8`) – die einzige Hauptaktion des Bereichs.

**Rechts – der Ablauf**

- Zwischentitel „So läuft eine Anfrage ab“ und `NumberedRows` mit `contact.steps`.
- Darunter die Erreichbarkeit als `dl` im `MetaList`-Muster (`grid-cols-[6rem_1fr]`, Haarlinien, Body Small): „Antwort – innerhalb eines Werktags“, „Ort – Bruckmühl, Bayern“, „Profil – LinkedIn“ (nur wenn gesetzt), „Code – GitHub“ (nur wenn gesetzt). `responseTime` fällt dafür aus dem Sektions-Intro (`index.astro:285`); sonst steht der Satz dreimal auf der Seite. `MetaList.astro` ist heute auf Projektdaten typisiert: Props zu `rows: { label, value }[]` generalisieren, `[slug].astro` entsprechend anpassen.

**Mobil:** Adresse → Knopf → Ausweich-Zeile → Button → Ablauf → Erreichbarkeit, einspaltig, gleiche Haarlinien.

**`CopyEmail.astro`:** Prop `size: 'large' | 'inline'`. `large` = heutige Rolle, vertikal gestapelt; `inline` = Adresse als normaler Link, Knopf als unterstrichener Text-Button in der Zeile. Das Script bleibt, sucht den Status aber über `parentElement`; bei der neuen Struktur müssen Knopf und Status im selben Wrapper liegen, sonst bricht `parentElement?.querySelector`.

### 1.4 Hero und Footer

- Hero (`index.astro:43`): `pb-14 sm:pb-20` → `pb-16 sm:pb-24`, damit die erste Tintenlinie nicht am Hero klebt. Die Adresszeile (`:59`) bleibt.
- `src/components/Footer.astro:13`: `mt-24` → `mt-16 sm:mt-24`; die Linie bleibt Haarlinie, der Footer ist kein Kapitel.

### 1.5 Designsystem nachziehen

- `DESIGN.md`: „Layout / Sektions-Anatomie“ (Tintenlinie, `section-y` 4 rem / `section-y-lg` 6 rem, Nummer links, H2 in der Inhaltsspalte), „Elevation & Depth“ (Tintenlinie öffnet ein Kapitel, nicht mehr die Leistungsspalten), „Typography / Hierarchy“ (H2 der Startseite = Headline, Feature-Titel = Title 1,5 rem), „Components / CopyEmail“ (zwei Größen), Kontakt-Anatomie; Frontmatter-Werte `feature-row.typography` und `spacing` passend.
- `.impeccable/design.json`: dieselben Stellen (`extensions.layout`, `feature-row`, `copy-email`) sowie die Do-Zeile „Tintenlinie für die stärkere Regel“ → „Tintenlinie öffnet ein Kapitel“.

### 1.6 Reihenfolge

Ein Branch, vier Commits, damit jeder Schritt einzeln im Screenshot prüfbar bleibt:

1. Section-Kopf, Tintenlinie, Abstände, Feature-Titel, Leistungsspalten (1.1, 1.2 ohne Komponente, 1.4).
2. `NumberedRows.astro` ausziehen und in Arbeitsweise einsetzen.
3. Kontakt (1.3) inklusive `CopyEmail`-Größen und `MetaList`-Generalisierung.
4. `DESIGN.md` und `design.json` (1.5).

---

## 2. Nicht anfassen

Section-IDs, `NAV_ITEMS` in `src/lib/site.ts`, H1 und Claim, die Bewegungsliste, Farb-Tokens, `scroll-padding-top`. Keine neuen Farben, Flächen, Schatten oder Karten. Kein Einblenden beim Scrollen.

---

## 3. Verifikation

1. `npm run verify` – `astro check`, ESLint mit jsx-a11y, Prettier, Build, `verify-build.mjs` (Anker `#arbeiten` bis `#kontakt` müssen weiter existieren, H1 muss dem Claim entsprechen).
2. Screenshots des Builds mit Playwright gegen `dist/` (Chromium liegt unter `/opt/pw-browsers`): Desktop 1440 px und Mobil 390 px, hell und dunkel, jeweils Ganzseite und `#kontakt`. Sichtprüfung:
   - Jeder Sektionsanfang liest sich auch in der Ganzseiten-Miniatur: Tintenlinie → Luft → Nummer und große H2.
   - In keiner Sektion ist ein innerer Abstand größer als die Sektionsluft.
   - Kontakt: linke und rechte Spalte beginnen auf gleicher Höhe; genau ein großes Element (die Adresse), genau ein oranger Knopf; keine Zeile ragt schräg heraus.
3. Kopier-Knopf beider Adressen klicken: „Kopiert.“ erscheint in der jeweiligen Zeile. Tastaturfokus auf Adresse und Knopf sichtbar.
4. Dunkelmodus: Die Tintenlinie ist `border-fg`, also Kreideweiß. Prüfen, ob sie härter wirkt als im Hellmodus.

---

## 4. Offene Punkte und Risiken

- **[Vermutung]** Die Tintenlinie könnte im Dunkelmodus zu hart sein. Eine Deckkraft-Ableitung (`fg/60`) ist laut `DESIGN.md` nur für `fg/25` vorgesehen. Falls nötig: Regel bewusst um einen Wert erweitern und dokumentieren, nicht still brechen.
- **[Wahrscheinlich]** Drei „E-Mail schreiben“-Knöpfe bleiben (Hero, Anfrage-Zeile, Kontakt). Die Anfrage-Zeile ist in der Critique vom 2026-09-16 begründet und nicht Teil dieses Plans; der Kontakt-Knopf bleibt der einzige primäre unterhalb des Heros.
- **[Wahrscheinlich]** Mit der H2 in 2,25 rem wird „Über Klartext“ auf 390 px breit; `text-balance` und `text-3xl` unter `sm` fangen das ab. Im Mobil-Screenshot prüfen.
- **[Vermutung]** Die IntersectionObserver-Schwellen in `NavHighlight.astro` sind auf die heutige Sektionshöhe abgestimmt. Mit 6 rem Sektionsluft könnte der aktive Anker später umspringen; im Browser prüfen, ggf. `rootMargin` anpassen.
