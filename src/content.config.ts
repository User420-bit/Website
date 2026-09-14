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

const profile = defineCollection({
  loader: file('src/content/profile.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subtitle: z.string(),
      institution: z.string(),
      location: z.string(),
      /** Zeile im Hero: "sucht Werkstudentenstelle ab ..." — null blendet sie aus. */
      availability: z.string().nullable(),
      intro: z.string(),
      bullets: z.array(z.string()).min(1),
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
  }),
})

const projekte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projekte' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      techStack: z.array(z.string()).min(1),
      category: z.enum(['eigenstaendig', 'ai-unterstuetzt']),
      github: z.url().nullable(),
      features: z.array(z.string()).default([]),
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
      /** Sortierung auf der Startseite, kleiner zuerst. */
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

const study = defineCollection({
  loader: file('src/content/study.json'),
  schema: z.object({
    order: z.number().int(),
    category: z.string(),
    title: z.string(),
    items: z.array(z.string()).min(1),
    note: z.string().nullable(),
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
    name: z.string().refine(noPlaceholder, placeholderMessage),
    street: z.string().nullable().refine(noPlaceholder, placeholderMessage),
    zipCity: z.string().nullable().refine(noPlaceholder, placeholderMessage),
    country: z.string().refine(noPlaceholder, placeholderMessage),
    email: z.email(),
    privacyLastUpdated: z.string().regex(/^\d{4}-\d{2}$/, 'Format: YYYY-MM'),
  }),
})

const contact = defineCollection({
  loader: file('src/content/contact.json'),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
  }),
})

export const collections = { profile, about, projekte, skills, study, legal, contact }
