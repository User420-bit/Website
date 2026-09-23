import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { file, glob } from 'astro/loaders'

/**
 * Content Collections ersetzen das frühere `DEFAULT_CONTENT` aus
 * `src/lib/content-model.ts` samt localStorage-Admin. Inhalt ändern heißt ab
 * jetzt: eine Datei unter `src/content/` editieren und committen.
 */

const socialSchema = z.object({
  // `null` bedeutet bewusst "noch nicht bestätigt" und wird nirgends gerendert.
  // Ein toter Link ist schlechter als kein Link.
  email: z.email(),
  github: z.url().nullable(),
  linkedin: z.url().nullable(),
})

/**
 * Das Unternehmen. Trägt Header, Footer, Hero und Leistungen — die Seite
 * dreht sich um Klartext, nicht um die Person dahinter.
 */
const company = defineCollection({
  loader: file('src/content/company.json'),
  schema: z.object({
    name: z.string(),
    /** Die H1 der Startseite. `scripts/verify-build.mjs` erwartet denselben Text. */
    claim: z.string(),
    intro: z.string(),
    location: z.string(),
    email: z.email(),
    services: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
  }),
})

/**
 * Die Person hinter Klartext. Erscheint auf der Startseite nur in der
 * Sektion "Über Klartext" und im Impressum (dort verlangt § 5 DDG den Namen).
 */
const profile = defineCollection({
  loader: file('src/content/profile.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      subtitle: z.string(),
      institution: z.string(),
      /** Dezenter Hinweis auf Werkstudentenstellen — null blendet ihn aus. */
      openTo: z.string().nullable(),
      social: socialSchema,
      portrait: image().nullable(),
      portraitAlt: z.string().nullable(),
    }),
})

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: 'src/content' }),
  schema: z.object({
    values: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
    /**
     * Arbeitsweise, aus den Commit-Historien ablesbar. Ersetzt das frühere
     * Badge "eigenständig / AI-unterstützt" pro Projekt: Fast alles seit 2026
     * ist mit Claude Code entstanden, ein Badge auf jeder Karte trägt dann
     * keine Information mehr. Ehrlich ist die Beschreibung an einer Stelle.
     */
    workflow: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
  }),
})

const projekte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projekte' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      techStack: z.array(z.string()).min(1),
      /** Art des Projekts — für Kunden und Arbeitgeber lesbarer als "eigenständig / AI-unterstützt". */
      kind: z.enum(['kundenprojekt', 'eigenes-produkt', 'prototyp']),
      /** Zeitraum als Text, z. B. "Juli – September 2026". */
      period: z.string(),
      /**
       * Stand oder nächster Schritt, z. B. "Live. M6 Balancing folgt". Die Karte zeigt nur den
       * ersten Satz, die Projektseite den ganzen Text. null blendet aus.
       */
      status: z.string().nullable().default(null),
      github: z.url().nullable(),
      /** Live-Demo oder Kundenseite. null = noch nicht gelauncht oder nicht öffentlich. */
      live: z.url().nullable().default(null),
      features: z.array(z.string()).default([]),
      /** Technische Entscheidungen, die das Projekt tragen. */
      engineering: z.array(z.string()).default([]),
      learnings: z.array(z.string()).default([]),
      screenshots: z
        .array(
          z.object({
            image: image(),
            caption: z.string(),
          }),
        )
        .default([]),
      codeExample: z
        .object({
          language: z.string(),
          snippet: z.string(),
        })
        .nullable()
        .default(null),
      /** Sortierung, kleiner zuerst. Die Startseite zeigt die ersten sechs, /projekte/ alle. */
      order: z.number().int(),
    }),
})

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({
    /** Reihenfolge im Grid, kleiner zuerst — sonst sortiert Astro alphabetisch. */
    order: z.number().int(),
    title: z.string(),
    description: z.string(),
    items: z
      .array(
        z.object({
          name: z.string(),
          note: z.string(),
        }),
      )
      .min(1),
  }),
})

/**
 * Leistungen: was aus den gelieferten Projekten ableitbar ist. Jede Gruppe
 * nennt in `evidence` die Projekte, die den Anspruch belegen — ohne Beleg
 * kein Eintrag.
 */
const leistungen = defineCollection({
  loader: file('src/content/leistungen.json'),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    description: z.string(),
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          /** Slugs aus `src/content/projekte/`, werden verlinkt. */
          evidence: z.array(z.string()).default([]),
        }),
      )
      .min(1),
  }),
})

/**
 * Rechtsangaben. `street` und `zipCity` dürfen `null` sein, damit lokale
 * Entwicklung ohne Pharrels Anschrift möglich ist — der Deploy-Workflow ruft
 * aber `npm run guard:legal` auf und bricht ab, solange sie fehlen.
 * Platzhalter in eckigen Klammern werden hier hart abgelehnt: Genau die sind
 * in der alten Fassung bis in den Produktionscode durchgerutscht.
 */
const noPlaceholder = (value: string | null) => value === null || !/\[.*\]/.test(value)
const placeholderMessage =
  'Platzhalter in eckigen Klammern sind nicht erlaubt — echten Wert oder null eintragen.'

const legal = defineCollection({
  loader: file('src/content/legal.json'),
  schema: z.object({
    /** Bezeichnung des Einzelunternehmens; `name` bleibt der Inhaber. */
    company: z.string().refine(noPlaceholder, placeholderMessage),
    name: z.string().refine(noPlaceholder, placeholderMessage),
    street: z.string().nullable().refine(noPlaceholder, placeholderMessage),
    zipCity: z.string().nullable().refine(noPlaceholder, placeholderMessage),
    country: z.string().refine(noPlaceholder, placeholderMessage),
    email: z.email(),
    privacyLastUpdated: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM'),
  }),
})

/**
 * Der Kontaktmoment. Hier stehen nur Zusagen, die der Inhaber bestätigt hat —
 * keine Preise, keine Fristen außer der Antwortzeit.
 */
const contact = defineCollection({
  loader: file('src/content/contact.json'),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    /** Einzige Stelle mit der Antwortzeit; Hero und Kontakt lesen sie von hier. */
    responseTime: z.string(),
    /** Betreff aller Anfrage-Links. Wird URL-kodiert, Umlaute sind erlaubt. */
    subject: z.string(),
    /** Ablauf nach der Anfrage, in dieser Reihenfolge. */
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(1),
    /** Ruhige Anfrage-Zeile nach "Arbeiten" und am Ende jeder Projektseite. */
    prompt: z.object({
      title: z.string(),
      text: z.string(),
    }),
  }),
})

export const collections = {
  company,
  profile,
  about,
  projekte,
  leistungen,
  skills,
  legal,
  contact,
}
