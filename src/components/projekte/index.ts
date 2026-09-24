/**
 * Registry: Slug einer Referenz → ihre Seitenkomponente. Ein Projekt ohne
 * Eintrag bekommt den gemeinsamen Körper (ProjectPage) unverändert; eine neue
 * Referenz braucht also keine eigene Seite, um zu erscheinen.
 *
 * Jede Seitenkomponente gehört genau einem Projekt. Wer eine Seite gestaltet,
 * arbeitet in `<Name>Page.astro` und den Bausteinen, die nur sie importiert.
 */
import AvailablyPage from './AvailablyPage.astro'
import DealersimPage from './DealersimPage.astro'
import FeynmanPage from './FeynmanPage.astro'
import JustbeautyPage from './JustbeautyPage.astro'
import KleinkramPage from './KleinkramPage.astro'
import MemorytreePage from './MemorytreePage.astro'
import NotelistPage from './NotelistPage.astro'
import PointcarePage from './PointcarePage.astro'
import TiefgangPage from './TiefgangPage.astro'
import VaulterPage from './VaulterPage.astro'

export const PAGES = {
  availably: AvailablyPage,
  dealersim: DealersimPage,
  feynman: FeynmanPage,
  justbeauty: JustbeautyPage,
  kleinkram: KleinkramPage,
  memorytree: MemorytreePage,
  notelist: NotelistPage,
  pointcare: PointcarePage,
  tiefgang: TiefgangPage,
  vaulter: VaulterPage,
} as const

export function pageFor(slug: string) {
  return (PAGES as Record<string, (typeof PAGES)[keyof typeof PAGES] | undefined>)[slug]
}
