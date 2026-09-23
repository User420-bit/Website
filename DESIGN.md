---
name: Klartext
description: Ruhig, sachlich, warm – ein Werkstattbuch mit einem einzigen orangen Signal.
colors:
  bg: 'oklch(0.99 0.002 80)'
  bg-elevated: 'oklch(1 0 0)'
  fg: 'oklch(0.18 0.005 80)'
  fg-muted: 'oklch(0.43 0.008 80)'
  accent: 'oklch(0.52 0.16 50)'
  accent-fg: 'oklch(0.99 0 0)'
  border: 'oklch(0.89 0.004 80)'
  bg-dark: 'oklch(0.17 0.004 80)'
  bg-elevated-dark: 'oklch(0.22 0.005 80)'
  fg-dark: 'oklch(0.96 0.003 80)'
  fg-muted-dark: 'oklch(0.74 0.008 80)'
  accent-dark: 'oklch(0.78 0.15 60)'
  accent-fg-dark: 'oklch(0.17 0.02 60)'
  border-dark: 'oklch(0.38 0.006 80)'
typography:
  display:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: 'clamp(2.5rem, 1.6rem + 4.5vw, 4.5rem)'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.03em'
  headline-lg:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '3rem'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.03em'
  headline:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '2.25rem'
    fontWeight: 600
    lineHeight: 1.111
    letterSpacing: '-0.025em'
  title-lg:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1.875rem'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.03em'
  title-md:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.03em'
  title:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: '-0.025em'
  title-sm:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.556
    letterSpacing: '-0.025em'
  subhead:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.5
  body-lead:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  prose:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.429
  label:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.429
  label-sm:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '0.8125rem'
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif"
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.333
  mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 2
  code:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: '0.25rem'
  md: '0.5rem'
  lg: '0.75rem'
spacing:
  gutter: '1rem'
  margin-column: '11rem'
  column-gap: '3rem'
  group-gap: '2rem'
  block-gap: '3rem'
  section-y: '4rem'
  section-y-lg: '6rem'
  footer-offset: '4rem'
  footer-offset-lg: '6rem'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-fg}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.625rem 1rem'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.fg}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.625rem 1rem'
  button-secondary-hover:
    textColor: '{colors.accent}'
  button-text:
    backgroundColor: 'transparent'
    textColor: '{colors.fg}'
    typography: '{typography.label}'
    padding: '0.625rem 0'
  header-cta:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-fg}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.375rem 0.75rem'
  kind-label:
    textColor: '{colors.fg-muted}'
    typography: '{typography.label-sm}'
  kind-label-accent:
    textColor: '{colors.accent}'
    typography: '{typography.label-sm}'
  ledger-row:
    textColor: '{colors.fg}'
    typography: '{typography.subhead}'
    padding: '1rem 0'
  feature-row:
    textColor: '{colors.fg}'
    typography: '{typography.title-md}'
    padding: '2rem 0'
  numbered-row:
    textColor: '{colors.fg}'
    typography: '{typography.subhead}'
    padding: '1rem 0'
  disclosure:
    textColor: '{colors.fg}'
    typography: '{typography.subhead}'
    padding: '1rem 0'
  meta-list:
    textColor: '{colors.fg}'
    typography: '{typography.body-sm}'
    padding: '0.625rem 0'
  copy-email:
    textColor: '{colors.fg}'
    typography: '{typography.title-lg}'
  copy-email-inline:
    textColor: '{colors.fg}'
    typography: '{typography.body-sm}'
  code-block:
    backgroundColor: '{colors.bg-elevated}'
    textColor: '{colors.fg}'
    typography: '{typography.code}'
    rounded: '{rounded.lg}'
    padding: '1rem'
  nav-link:
    textColor: '{colors.fg-muted}'
    typography: '{typography.body-sm}'
    padding: '0.25rem'
  nav-link-active:
    textColor: '{colors.fg}'
---

# Design System: Klartext

## Overview

**Creative North Star: "Das Werkstattbuch"**

Die Seite liest sich wie ein sauber geführtes Arbeitsbuch: Jede Aussage steht an ihrem Platz, jeder
Punkt hat seinen Beleg, und nichts wird geschönt. Das Design tritt hinter den Inhalt zurück. Es ordnet,
statt zu inszenieren: warmes Papierweiß, tintenschwarze Überschriften, bleistiftgraue Erläuterungen und
ein einziges Werkstatt-Orange, das dort auftaucht, wo gehandelt, belegt oder fokussiert wird.

Die Ordnung kommt aus dem Buch selbst: Jedes Kapitel öffnet mit einer Tintenlinie, darunter Nummer,
Überschrift und einleitender Satz, dann der Inhalt, gegliedert durch Haarlinien. Arbeiten stehen als linierte Zeilen wie
in einem Hauptbuch, nicht als Karten. Ein Kasten entsteht nur dort, wo wirklich etwas ein Behälter ist.

Die Stimmung ist **ruhig, sachlich, warm**. Ruhig heißt: viel vertikale Luft zwischen den Sektionen,
begrenzte Zeilenbreite, flache Flächen ohne Schatten. Sachlich heißt: eine einzige, selbst gehostete
Schrift, klare Größenstufen, Tabellenziffern für Zeiträume und Nummern, Monospace nur für technische
Namen auf Projektseiten. Warm heißt: Alle Grautöne tragen einen leichten Gelbstich (Farbton 80), und
der Akzent ist ein erdiges Orange statt eines kühlen Blaus.

Hell und dunkel sind gleichwertige Ausprägungen desselben Buchs. Beide folgen ausschließlich der
Systemeinstellung des Besuchers.

**Key Characteristics:**

- Eine Akzentfarbe (Werkstatt-Orange), sonst nur warme Neutraltöne
- Eine selbst gehostete Schrift (Instrument Sans), Hierarchie über Größe und Gewicht 600 mit enger
  Laufweite
- Kapitelkopf gestapelt: Tintenlinie oben, darunter Nummer, H2, Intro und Inhalt an derselben
  linken Kante; Haarlinien statt Karten
- Flach: keine Schatten, keine Transluzenz, Struktur aus 1-px-Linien in Liniengrau und Tinte
- Eine zentrierte Spalte (max. 64rem), Fließtext max. 65ch
- Leise Zustände: Farbe oder Linie ändert sich, Hover und Tastaturfokus sehen gleich aus
- Bewegung aus einer geschlossenen Liste, nur bei `prefers-reduced-motion: no-preference`

## Colors

Warme Neutraltöne wie Papier, Tinte und Bleistift, dazu ein einziges Werkstatt-Orange als Signal.
OKLCH ist das kanonische Format (definiert in `src/styles/global.css` über `@theme`). Alle Komponenten
nutzen die Tailwind-Utilities dieser Tokens (`bg-bg`, `text-fg-muted`, `border-border`, `bg-accent` …).

### Primary

- **Werkstatt-Orange** (`accent`, hell #ad4400): Primärbutton und Header-Anfrage, Belege und Links im
  Text, das Wort „Kundenprojekt“, „Zur Referenz“, Hover-Farbe von Sekundärbutton, Aufklapper und
  Zurück-Link, Unterstrich der aktiven Navigation, Fokus-Outline und Textauswahl. Im Hellmodus bewusst dunkel gehalten, damit Orange als
  Textfarbe 5,7 : 1 auf Papierweiß hält.
- **Werkstatt-Orange, Nacht** (`accent-dark`, #fc9e47): dieselbe Rolle im Dunkelmodus, heller und
  gelber (Farbton 60), 9,2 : 1 auf Nachtpapier.
- **Schrift auf Orange** (`accent-fg` #fcfcfc hell, `accent-fg-dark` #160d07 dunkel): Text auf
  orangen Flächen, also Primärbutton, Skip-Link und Auswahl.

Abgeleitete Tönungen entstehen nur über Tailwind-Deckkraft, nie als eigene Farbe: `accent/10` und
`accent/50` (Fläche und Rand des Hinweiskastens), `fg/25` (Rand von Sekundärbutton und
„Adresse kopieren“).

### Neutral

- **Papierweiß** (`bg`, #fcfcfa) / **Nachtpapier** (`bg-dark`, #100f0d): Seitengrund.
- **Karteikartenweiß** (`bg-elevated`, #ffffff) / **Werkbankschwarz** (`bg-elevated-dark`, #1c1a18):
  nur noch der Codeblock. Hebt sich minimal vom Grund ab; die Linie macht die Kante.
- **Tintenschwarz** (`fg`, #13110f) / **Kreideweiß** (`fg-dark`, #f3f1ef): Überschriften, Titel,
  Namen von Einträgen, aktive Navigation. 18,3 : 1 hell, 17,0 : 1 dunkel.
- **Bleistiftgrau** (`fg-muted`, #524f4b) / **Staubgrau** (`fg-muted-dark`, #adaaa5): alles
  Erklärende. Intro, Beschreibungen, Fließtext, Metadaten, Footer, inaktive Navigation. 7,9 : 1 hell,
  8,3 : 1 dunkel.
- **Liniengrau** (`border`, #dcdad8) / **Nachtlinie** (`border-dark`, #44423f): Haarlinien über
  Sektionen und zwischen Zeilen, Header- und Footer-Trennlinie, Bildränder, ruhender Link-Unterstrich.
  Mit 1,35 : 1 bzw. 1,91 : 1 rein strukturell; eine Linie trägt nie allein Bedeutung.

### Named Rules

**The One Signal Rule.** Werkstatt-Orange ist die einzige bunte Farbe im System. Es markiert Handlung,
Beleg, Einordnung und Fokus, nie Sektionsflächen, Illustrationen oder Dekoration. Auf einem
Bildschirm bleibt es eine Minderheit.

**The Twin Token Rule.** Jede Farbe existiert als Paar mit derselben Rolle in hell und dunkel.
Komponenten verwenden nur Tokens, nie Rohwerte; so stimmt der Dunkelmodus ohne Zusatzarbeit.

**The System Decides Rule.** Der Farbmodus kommt ausschließlich aus `prefers-color-scheme`. Die
`[data-theme]`-Selektoren in `global.css` bleiben ein technischer Haken, keine Besucher-Funktion.

## Typography

**Display Font:** Instrument Sans, variabel, selbst gehostet (`'Instrument Sans', ui-sans-serif, system-ui, Arial, sans-serif`)
**Body Font:** dieselbe Instrument Sans
**Label/Mono Font:** System-Monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** Eine einzige Schrift vom eigenen Server: `src/assets/fonts/InstrumentSans-Variable.woff2`
(OFL, Gewichte 400–700, Latin-Subset, 30 KB), eingebunden über Astros Fonts-API als `--font-klartext`
mit metrisch angepasstem Arial-Fallback. Die Systemschrift ist nur noch Rückfall. Charakter entsteht
über Gewicht 600 und enge Laufweite in den Überschriften gegen ruhiges Regular im Text. Zeiträume,
Sektionsnummern und Zählungen stehen in Tabellenziffern (`tabular-nums`). Pfeile sind Inline-SVG
(`Arrow.astro`), weil das Subset keine Pfeilzeichen enthält.

### Hierarchy

Große Überschriften tragen die Klasse `.display`: Laufweite −0,03em, Zeilenhöhe 1,02.

- **Display** (600, `clamp(2.5rem, 1.6rem + 4.5vw, 4.5rem)`, 1,02, −0,03em): nur die H1 der
  Startseite, der Claim. Max. 20ch, `text-balance`.
- **Headline Large** (600, 3rem, 1,02, −0,03em; unter 640 px 2,25rem): H1 der Projektseiten und von
  `/werkzeuge/`.
- **Headline** (600, 2,25rem, 1,111, −0,025em; unter 640 px 1,875rem): die H2 der fünf
  Startseiten-Kapitel sowie die H1 von Impressum, Datenschutz und 404.
- **Title Large** (600, 1,875rem, 1,02, −0,03em; unter 640 px 1,5rem): die Hauptadresse im Kontakt.
- **Title Medium** (600, 1,5rem, 1,02, −0,03em; unter 640 px 1,25rem): Titel einer Feature-Zeile.
  Bewusst eine Stufe unter der H2, damit ein Projekt nie größer steht als sein Kapitel.
- **Title** (600, 1,25rem, 1,4, −0,025em): jede H2 auf Projekt-, Werkzeug- und Rechtsseiten.
- **Title Small** (600, 1,125rem, 1,556, −0,025em): Titel der drei Leistungsspalten und die Wortmarke.
- **Subhead** (500, 1rem, 1,5): Titel einer Ledger-Zeile, eines Aufklappers, Name eines Werts.
- **Body Lead** (400, 1,125rem, 1,625): Hero-Intro (max. 60ch) und Summary auf Unterseiten.
- **Body** (400, 1rem, 1,5) und **Prose** (400, 1rem, 1,625): Sektions-Intros bzw. längerer
  Fließtext (Über Klartext, Projekttext, Rechtstexte). Max. 65ch, Rechtstexte 68ch.
- **Body Small** (400, 0,875rem, 1,429): Beschreibungen in Zeilen und Aufklappern, Zeiträume,
  Meta-Liste, Footer, Navigation.
- **Label** (500, 0,875rem): Button-Text, Namen von Listeneinträgen und die leisen
  Zwischenüberschriften in Bleistiftgrau („Weitere Arbeiten“, „Im Einzelnen“).
- **Label Small** (500, 0,8125rem): Art des Projekts (KindLabel).
- **Caption** (400, 0,75rem): Belegzeile und der Webmail-Hinweis im Kontakt.
- **Mono** (400, 0,75rem, Zeilenhöhe 1,5rem) und **Code** (400, 0,875rem, 1,625): Zeile „Technik“ der
  Meta-Liste und Codeblöcke. Beides nur auf Projektseiten.

Die Wortmarke „Klartext“ im Header ist reiner Text in Gewicht 600 (1,125rem, eng), ohne Bildzeichen.

Silbentrennung: `.prose-flow` trennt nur unter 40rem Breite (`hyphens: auto`,
`hyphenate-limit-chars: 12 5 5`). Auf breiten Spalten wird nicht getrennt.

### Named Rules

**The One Family Rule.** Eine selbst gehostete Familie für alles, ausgeliefert vom eigenen Server,
ohne Drittanbieter. Monospace nur für technische Namen und Code auf Projektseiten. Hierarchie
entsteht über Größe und Gewicht, nie über eine zweite Schriftfamilie.

**The Ink For Names Rule.** Tintenschwarz gehört Überschriften und Namen, Bleistiftgrau allem, was
erklärt. Wer einen Absatz in `fg` setzt, macht ihn zur Überschrift. Einzige Ausnahme ist die
Randnotiz „Erkenntnisse“, deren Text bewusst in voller Tinte läuft.

**The Measure Rule.** Fließtext läuft nie breiter als 65ch, die H1 nie breiter als 20ch.

## Layout

Eine zentrierte Spalte: `max-width` 64rem, seitlicher Rand 1rem. Die Startseite ist eine Folge
gestapelter Sektionen: Hero, 01 Arbeiten, 02 Leistungen, 03 Arbeitsweise, 04 Über Klartext,
05 Kontakt. Jede ist so hoch wie ihr Inhalt; es gibt keine erzwungene Vollbildhöhe. Der Beweis
(Arbeiten) steht vor dem Angebot (Leistungen).

**Sektions-Anatomie** (`Section.astro`): Tintenlinie oben, vertikaler Innenabstand 4rem (ab 640 px
6rem). Zuoberst der Kopf, in einer Spalte gestapelt: die Nummer („01“–„05“, `aria-hidden`,
Tabellenziffern, Bleistiftgrau), 0,25rem darunter die H2 in Headline (2,25rem, unter 640 px
1,875rem) und 1rem darunter das optionale Intro in Bleistiftgrau (max. 65ch). Der Inhalt folgt
2,5rem darunter (ab 640 px 3rem) über die volle Spaltenbreite. Alle vier stehen an derselben linken
Kante, in jeder Breite gleich: Der Kopf liest sich von oben nach unten, und neben langen Inhalten
bleibt keine leere Randspalte stehen. Innerhalb eines Kapitels ist kein
Abstand größer als 3rem; die Kapitelluft bleibt die größte Pause auf der Seite und der Kapitelanfang
ist auch in der verkleinerten Ganzseite zu finden. Der Hero steht außerhalb dieses Rasters und nutzt
ebenfalls die volle Spalte.

**Zeilen statt Raster:** Listen sind linierte Zeilen. Arbeiten: Kundenprojekte als Feature-Zeilen,
darunter „Weitere Arbeiten“ als Ledger (Titel · Art · Zeitraum · Pfeil; ab 640 px Spalten
`1fr | 9rem | 11rem | 1rem`). Leistungen: drei Spalten ab 640 px unter je einer Haarlinie, darunter
Aufklapper. Arbeitsweise: Nummernzeilen (`NumberedRows`, ab 640 px `2rem | 10rem | 1fr`). Kontakt:
ab 640 px zwei Spalten `3fr | 2fr` mit 3rem Abstand, die auf derselben Haarlinie beginnen — links
Adresse, Knopf und Erreichbarkeit (Meta-Liste), rechts die Schritte als Nummernzeilen (`2rem | 1fr`).
Inhalte in Aufklappern laufen 1 → 2 Spalten ab 640 px mit 2rem Spaltenabstand.

**Unterseiten:** Projektseiten und `/werkzeuge/` stapeln ihre Blöcke wie die Startseite: Haarlinie
oben, Label (H2) darüber dem Inhalt, 1rem Abstand zum Inhalt, 3rem zwischen Blöcken. Text bleibt
bei 65ch.
Rechtstexte sitzen in einer eigenen 68ch-Spalte mit 3–4rem Innenabstand.

**Header und Scrollen:** Der Header klebt oben. Er trägt Wortmarke, Navigation (Arbeiten, Leistungen,
Arbeitsweise, Über) und die kleine Anfrage-Schaltfläche. Ab 640 px eine Zeile (65 px hoch), darunter
zwei: Wortmarke und Anfrage oben, Linkzeile unten (89 px bei 375 px Breite).
`scroll-padding-top: 6rem` auf `:root` ist der einzige Scroll-Versatz; Sektionen tragen kein eigenes
`scroll-margin`. Der Footer beginnt 4rem (ab 640 px 6rem) unter dem Inhalt und führt zu Werkzeuge, Impressum und
Datenschutz.

**Breakpoints:** 640 px (`sm`) und 1024 px (`lg`), Tailwind-Standard. Die Silbentrennung schaltet bei
40rem.

### Named Rules

**The Single Offset Rule.** Nur `scroll-padding-top` gleicht den Sticky-Header aus. Ein zusätzliches
`scroll-margin` addiert sich und verschiebt die Ankersprünge.

**The Chapter Rule.** Die Tintenlinie öffnet ein Kapitel der Startseite und markiert sonst nichts.
Innerhalb eines Kapitels ist kein Abstand größer als 3rem, und kein Titel steht größer als die H2
seines Kapitels.

## Elevation & Depth

Das System ist flach, ohne Ausnahme. Es gibt keinen Schatten, keine Unschärfe und keine Transluzenz:
Der Sticky-Header ist deckend in Papierweiß (`bg-bg`). Seine untere Haarlinie erscheint erst nach dem
Scrollen (scrollgesteuerte CSS-Animation, `animation-timeline: scroll(root)`, Bereich 0–4rem). Ohne
Browser-Unterstützung oder bei reduzierter Bewegung steht die Linie immer.

Struktur entsteht aus zwei Linien derselben Stärke: Liniengrau (`border-border`) für Zeilen,
Zwischenblöcke und den Footer, Tinte (`border-fg`) als Kapitel-Linie über jeder Sektion der
Startseite und über der Vor-/Zurück-Navigation der Projektseiten. Weil die Tintenlinie nur dort
steht, trennt sie Kapitel von Zeile ohne Fläche und ohne Schatten. Eine zweite Flächenebene (`bg-elevated`) gibt es nur beim
Codeblock.

### Named Rules

**The Flat Page Rule.** Keine Schatten, kein Glow, kein Anheben, keine Transluzenz. Ordnung wird durch
Linie sichtbar, ein Zustand durch Farbe.

## Shapes

Kantig mit kaum merklicher Rundung. 4 px (`sm`) für alles Bedienbare und Abgebildete: Buttons,
Header-Anfrage, „Adresse kopieren“, Skip-Link, Fokusring, Bilder und Screenshots. 12 px (`lg`) nur für
echte Behälter: Codeblock und Hinweiskasten. 8 px (`md`) bleibt als Token definiert, gehört aber
keinem Baustein des Systems. Pillen gibt es nicht.

Wiederkehrende Linien-Motive:

- **Haarlinie:** 1 px Liniengrau über Zwischenblöcken und den beiden Kontaktspalten, unter jeder
  Zeile, unter dem Header (nach dem Scrollen) und über dem Footer.
- **Tintenlinie:** 1 px Tintenschwarz über jeder Sektion der Startseite (Kapitel-Linie) und über der
  Vor-/Zurück-Navigation der Projektseiten.
- **Randnotiz:** Label über dem Text, Haarlinie oben. Für „Erkenntnisse“ läuft der Text in voller
  Tinte statt in Bleistiftgrau. Kein farbiger Seitenstreifen.
- **Unterstrich:** Links im Fließtext und im Footer mit 4 px Abstand zur Grundlinie. Text-Button und
  E-Mail-Adresse tragen einen Unterstrich in Liniengrau, der bei Hover orange wird. In der Navigation
  und bei Zeilentiteln wird ein 1-px-Strich von links aufgezogen.
- **Plus/Minus:** Marke des Aufklappers aus zwei 1-px-Linien (0,75rem), die senkrechte dreht sich beim
  Öffnen in die waagerechte.
- **Pfeil:** Inline-SVG, 0,85em, Strichstärke 1,5, `currentColor`, rein dekorativ (`aria-hidden`).

Das Favicon (`public/favicon.svg`) ist ein Platzhalter mit 14/64 Eckradius und einem helleren Orange
außerhalb der Tokens. Es wird durch das Logo ersetzt, sobald die Datei vorliegt. Im Header steht kein
Bildzeichen mehr.

### Named Rules

**The Size-Matched Corner Rule.** Bedienbares und Bilder 4 px, echte Behälter 12 px. Keine Rundung
über 12 px, keine Pillen.

## Components

Zurückhaltend und solide: Zeilen, feine Linien, kaum gerundete Ecken. Zustände zeigen sich leise über
Farbe und Linie, nie über Schatten oder Sprünge. Hover und Tastaturfokus (`group-focus-within`) sehen
immer gleich aus. Übergänge nutzen die Tokens aus `global.css`: Kurve `--ease-quiet`
(`cubic-bezier(0.2, 0, 0, 1)`), Dauern 120 / 200 / 320 ms, Standard 200 ms. Sie entfallen bei
`prefers-reduced-motion: reduce`.

### Buttons

`Button.astro` mit drei Varianten und zwei Größen.

- **Shape:** 4 px, Innenabstand 0,625rem × 1rem (`sm`: 0,375rem × 0,75rem), Label-Schrift (500,
  0,875rem).
- **Primary:** Fläche Werkstatt-Orange, Schrift auf Orange. Genau eine Hauptaktion pro Bereich
  („E-Mail schreiben“, „Live ansehen“). Hover auf 90 % Deckkraft.
- **Secondary:** transparent mit 1 px Rand in `fg/25` und Tintenschwarz; bei Hover werden Rand und
  Schrift orange („GitHub“, „Code auf GitHub“).
- **Text:** unterstrichener Link in Tinte mit Pfeil für den leiseren zweiten Weg („Arbeiten ansehen“,
  „Womit gearbeitet wird“). Unterstrich Liniengrau, bei Hover orange; der Pfeil rückt 2 px.
- **Header-CTA:** kleiner Primary „Anfrage“ im Header, führt zu `/#kontakt`.
- **Focus:** überall 2 px Outline in Orange mit 2 px Abstand.

### Labels

- **KindLabel:** Art des Projekts als reiner Text (500, 0,8125rem), keine Pille. Nur „Kundenprojekt“
  trägt Werkstatt-Orange, alle anderen Bleistiftgrau (The One Signal Rule).

### Rows

- **Feature-Zeile** (`ProjectFeature`): große linierte Zeile für Kundenprojekte. Links (ab 640 px,
  9rem) Art und Zeitraum, rechts Titel in Title Medium, Summary (max. 60ch), optional „Stand: …“
  (nur der erste Satz) und der erste Screenshot (16:9, 4 px, 1 px Liniengrau), dann „Zur Referenz“
  mit Pfeil in Orange und, falls vorhanden, „Live ansehen“ als eigener Link über dem gestreckten
  Titel-Link. 2rem Innenabstand oben und unten. Keine Technik-Namen. Die Variante `compact`
  (Titel 1,25rem, 1,5rem Innenabstand) trägt die vollständige Liste unter `/projekte/`.
- **Ledger-Zeile** (`ProjectRow`): Titel · Art · Zeitraum · Pfeil, 1rem Innenabstand, Haarlinie
  unten. Unter 640 px zweizeilig.
- **Beide:** Der Titel-Link ist auf die ganze Zeile gestreckt, der Fokus bleibt am Titel. Bei Hover
  oder Fokus zieht der Unterstrich des Titels von links auf und der Pfeil rückt 2 px; in der
  Ledger-Zeile rückt zusätzlich der Titel 4 px.
- **Meta-Liste** (`MetaList`): `dl` mit Haarlinien, Spalten `6rem | 1fr`, Body Small; die Seite gibt
  die Zeilen als `rows` vor. Projektseiten: Art, Zeitraum, Stand, Technik — „Technik“ steht in Mono,
  Bleistiftgrau, verbunden mit „ · “, und nur dort. Kontakt: Ort, Profil, Code; Werte mit `href` sind
  orange Links, externe öffnen im neuen Tab und sagen das für Screenreader dazu.
- **Nummernzeile** (`NumberedRows`): Ziffer (Body Small, Tabellenziffern, `aria-hidden`), Titel
  (Subhead), Erklärung (Body Small, max. 55ch), 1rem Innenabstand, Haarlinie unten. Arbeitsweise mit
  eigener Titelspalte ab 640 px (`2rem | 10rem | 1fr`), die Kontakt-Schritte ohne (`2rem | 1fr`).
- **Vor/Zurück:** Navigation am Ende der Projektseite unter einer Tintenlinie; Label mit Pfeil in
  Bleistiftgrau, darunter der Titel mit aufziehendem Unterstrich.

### Anfrage-Zeile

`InquiryPrompt`: ruhige Zeile nach „Arbeiten“, am Ende jeder Projektseite und unter `/projekte/`.
Links ein Satz aus `contact.json` (Titel in Tinte, Rest in Bleistiftgrau), rechts „E-Mail schreiben“
als Sekundärbutton und ein Textlink zum Ablauf im Kontaktbereich. Sekundär, weil die Hauptaktion des
Bereichs schon vergeben ist.

### Disclosure

Natives `<details>`: funktioniert ohne JavaScript, per Tastatur und mit der Seitensuche. Zeile mit
Titel (500), optionaler Zählung rechts („4 Punkte“, Tabellenziffern) und Plus/Minus-Marke; Haarlinie
unten, Hover färbt die Zeile orange. Die Höhe animiert nur, wo der Browser `interpolate-size` und
`::details-content` kennt.

### CopyEmail

Die Adresse als markierbarer Link in Title Large (Unterstrich mit 8 px Abstand), darunter — nicht
daneben — „Adresse kopieren“ im Stil des Sekundärbuttons. Der Knopf erscheint erst, wenn der Browser die Zwischenablage anbietet; die
Rückmeldung („Kopiert.“) steht in einem `role="status"`-Element neben dem Knopf und verschwindet
nach zwei Sekunden. Gespeichert wird nichts.

### Kontaktblock

Ein Raster, keine Freischweber: ab 640 px zwei Spalten `3fr | 2fr` mit 3rem Abstand, beide öffnen mit
derselben Haarlinie und beginnen so auf einer Höhe. Links die Handlung: die Adresse (`CopyEmail`),
der Webmail-Hinweis
als Caption, der einzige Primärbutton des Bereichs, darunter die Erreichbarkeit als Meta-Liste (Ort,
Profil, Code). Rechts der Ablauf: Zwischenüberschrift „So läuft eine Anfrage ab“ und drei
Nummernzeilen. Unter 640 px stapelt sich alles in dieser Reihenfolge. Genau ein großes Element (die
Adresse) und genau ein oranger Knopf.

### Containers

Nur wo etwas wirklich ein Behälter ist. Keine Kartenraster.

- **Codeblock:** 12 px, Karteikartenweiß bzw. Werkbankschwarz, 1 px Liniengrau, 1rem Innenabstand,
  Code-Schrift, horizontal scrollbar.
- **Hinweiskasten** (unvollständiger Rechtstext): 12 px, `accent/10` Fläche, `accent/50` Rand, 1rem
  Innenabstand.
- **Shadow Strategy:** keine (siehe Elevation & Depth).

### Navigation

- **Header:** deckend, Wortmarke als Text links, Ankerlinks in Body Small und Bleistiftgrau, rechts
  der Header-CTA.
- **Zustände:** Hover und aktiver Anker wechseln auf Tintenschwarz und ziehen einen 1-px-Strich in Orange
  von links auf. Den aktiven Anker setzt auf der Startseite ein IntersectionObserver
  (`aria-current="true"`).
- **Mobil:** Wortmarke und Anfrage in der ersten Zeile, Linkzeile darunter, Links umbrechen bei Bedarf.
- **Footer:** Copyright und Links (Werkzeuge, Impressum, Datenschutz) in Body Small, Bleistiftgrau,
  unterstrichen, Hover Tintenschwarz.
- **Skip-Link:** „Zum Inhalt springen“, bei Fokus als oranges 4-px-Feld oben links.
- **Zurück-Link:** Pfeil nach links und Text in Body Small, Bleistiftgrau, Hover orange.

### Belegzeile (Signature)

Unter jedem Leistungspunkt in den Aufklappern von „Leistungen“ steht „Beleg:“ in 0,75rem
Bleistiftgrau, gefolgt von den Projektnamen als orange Links ohne Unterstrich. Sie ist das sichtbare
Versprechen des Werkstattbuchs: kein Punkt ohne Nachweis.

### Bewegung (Signature Motion)

Eine Kurve, drei Dauern: `--ease-quiet` `cubic-bezier(0.2, 0, 0, 1)`, 120 / 200 / 320 ms, Standard
200 ms. Erlaubt ist nur diese geschlossene Liste:

- **Zeile bei Hover/Fokus:** Titel rückt 4 px, Unterstrich zieht über `background-size` auf, Pfeil
  rückt 2 px.
- **Aufklapper:** Höhe über `interpolate-size` und `::details-content` (320 ms, hinter `@supports`);
  Plus wird Minus.
- **Header-Haarlinie:** erscheint scrollgesteuert zwischen 0 und 4rem.
- **Seitenwechsel:** native View Transition zwischen Dokumenten (`@view-transition { navigation: auto }`,
  200 ms); der Header trägt einen eigenen `view-transition-name` und bleibt stehen.
- **Kopier-Rückmeldung:** der Statustext erscheint und verschwindet.
- **Ankersprünge:** `scroll-behavior: smooth`.

Keine Hero-Animation, kein Einblenden beim Scrollen: Die H1 ist das Erste, was gemalt wird, und steht
sofort. Alles liegt hinter `prefers-reduced-motion`; ohne Bewegung ist jeder Inhalt sofort sichtbar.

### Skripte

Kein externes Skript. Zwei winzige Inline-Skripte (`NavHighlight`, `CopyEmail`), jeweils ohne Import
und unter 4 KB, damit Astro sie inline ausliefert. Alles andere funktioniert ohne JavaScript.

## Do's and Don'ts

### Do:

- **Do** Farben nur über die Tokens `bg`, `bg-elevated`, `fg`, `fg-muted`, `accent`, `accent-fg` und
  `border` setzen und jeder neuen Farbe einen Dunkel-Zwilling geben.
- **Do** Werkstatt-Orange für Handlung, Beleg, Einordnung und Fokus reservieren (The One Signal Rule).
- **Do** Listen als linierte Zeilen bauen: Haarlinie in Liniengrau. Die Tintenlinie öffnet ein Kapitel
  und markiert sonst nichts (The Chapter Rule).
- **Do** neue Blöcke mit einem gestapelten Kopf beginnen (Tintenlinie oben auf der Startseite,
  Haarlinie auf Unterseiten) und Nummer, Überschrift, Intro und Inhalt an derselben linken Kante
  untereinander stellen statt nebeneinander.
- **Do** Überschriften in Tintenschwarz mit Gewicht 600 setzen, große mit `.display` (−0,03em, 1,02),
  Erklärungen in Bleistiftgrau.
- **Do** Zeiträume, Nummern und Zählungen mit `tabular-nums` setzen und Pfeile über `Arrow.astro`.
- **Do** Hover und Tastaturfokus gleich aussehen lassen (`group-hover` immer mit `group-focus-within`).
- **Do** Bewegung an `prefers-reduced-motion: no-preference` koppeln und Inhalt ohne Animation sofort
  sichtbar lassen.
- **Do** den sichtbaren Fokus erhalten: 2 px Outline in Orange, 2 px Abstand.

### Don't:

- **Don't** eine Theme-Auswahl, Test-Themes oder einen Farbmodus-Umschalter für Besucher einbauen. Hell
  und dunkel folgen der Systemeinstellung.
- **Don't** Schatten, Glow, Anheben, Unschärfe oder Transluzenz für Tiefe oder Hover verwenden.
- **Don't** eine zweite Akzentfarbe oder farbige Flächen einführen.
- **Don't** Rohfarbwerte in Komponenten schreiben; sie brechen den Dunkelmodus.
- **Don't** Fließtext breiter als 65ch laufen lassen.
- **Don't** Listen als Kartenraster bauen. Ein Kasten nur, wo etwas wirklich ein Behälter ist.
- **Don't** Pillen, Badges oder Chips auf der Startseite verwenden; Einordnung ist Text.
- **Don't** farbige Seitenstreifen (`border-l` in Akzent) als Hervorhebung setzen.
- **Don't** Inhalte beim Scrollen einblenden oder den Hero animieren.
- **Don't** innerhalb eines Kapitels mehr Abstand lassen als zwischen zwei Kapiteln, und keinen Titel
  größer setzen als die H2 des Kapitels.
- **Don't** Technik-Namen auf der Startseite nennen; sie stehen in der Meta-Liste der Projektseite.
- **Don't** Schriften von Drittanbietern laden oder eine zweite Familie einführen.
- **Don't** Pfeile als Schriftzeichen setzen; das Subset enthält sie nicht.
