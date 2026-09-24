/**
 * Registry: Slug einer Referenz → ihre Bühne. Ein Projekt ohne Eintrag sieht
 * aus wie bisher; eine neue Referenz braucht also keine Szene, um zu
 * erscheinen (docs/PROJEKTSZENEN_PLAN.md, Abschnitt 1.3).
 */
import AvailablyScene from './AvailablyScene.astro'
import DealersimScene from './DealersimScene.astro'
import FeynmanScene from './FeynmanScene.astro'
import JustbeautyScene from './JustbeautyScene.astro'
import KleinkramScene from './KleinkramScene.astro'
import MemorytreeScene from './MemorytreeScene.astro'
import NotelistScene from './NotelistScene.astro'
import PointcareScene from './PointcareScene.astro'
import TiefgangScene from './TiefgangScene.astro'
import VaulterScene from './VaulterScene.astro'

export const SCENES = {
  availably: AvailablyScene,
  dealersim: DealersimScene,
  feynman: FeynmanScene,
  justbeauty: JustbeautyScene,
  kleinkram: KleinkramScene,
  memorytree: MemorytreeScene,
  notelist: NotelistScene,
  pointcare: PointcareScene,
  tiefgang: TiefgangScene,
  vaulter: VaulterScene,
} as const

export function sceneFor(slug: string) {
  return (SCENES as Record<string, (typeof SCENES)[keyof typeof SCENES] | undefined>)[slug]
}
