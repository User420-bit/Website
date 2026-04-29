import { z } from 'zod'

export const socialLinksSchema = z.object({
  email: z.string().email().or(z.literal('')),
  github: z.string().url().or(z.literal('')),
  linkedin: z.string().url().or(z.literal('')),
})

export const profileSchema = z.object({
  name: z.string().min(1),
  subtitle: z.string(),
  institution: z.string(),
  location: z.string(),
  intro: z.string(),
  bullets: z.array(z.string()),
  social: socialLinksSchema,
  imageUrl: z.string().optional(),
})

export const aboutValueSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
})

export const aboutSchema = z.object({
  paragraphs: z.array(z.string()),
  values: z.array(aboutValueSchema),
})

export const studySectionSchema = z.object({
  id: z.string().min(1),
  category: z.string(),
  title: z.string().min(1),
  items: z.array(z.string()),
  note: z.string().optional(),
  logoUrl: z.string().optional(),
})

export const projectScreenshotSchema = z.object({
  url: z.string(),
  caption: z.string().optional(),
})

export const codeExampleSchema = z.object({
  language: z.string(),
  snippet: z.string(),
})

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  techStack: z.array(z.string()),
  category: z.enum(['eigenstaendig', 'ai-unterstuetzt']),
  githubUrl: z.string().optional(),
  detailOverview: z.string().optional(),
  features: z.array(z.string()).optional(),
  screenshots: z.array(projectScreenshotSchema).optional(),
  learnings: z.array(z.string()).optional(),
  codeExample: codeExampleSchema.optional(),
})

export const codingItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['ai-tools', 'software-os', 'languages']),
  logoUrl: z.string().optional(),
  details: z.string(),
})

export const contactSchema = z.object({
  heading: z.string(),
  description: z.string(),
})

export const portfolioContentSchema = z.object({
  profile: profileSchema,
  about: aboutSchema,
  study: z.array(studySectionSchema),
  projects: z.array(projectSchema),
  coding: z.array(codingItemSchema),
  contact: contactSchema,
  ui: z
    .object({
      lastUpdatedAt: z.string().optional(),
    })
    .optional(),
})

export type PortfolioContentSchema = z.infer<typeof portfolioContentSchema>
