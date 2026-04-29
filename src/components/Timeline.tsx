import { StudyCarousel } from '@/components/StudyCarousel'
import { usePortfolioContent } from '@/context/PortfolioContext'

export function Timeline() {
  const { content } = usePortfolioContent()
  return (
    <section id="study" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Studium &amp; Kenntnisse</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Ein Überblick über die fachlichen Schwerpunkte meines Studiums an der TH Rosenheim.
      </p>
      <div className="mt-10">
        <StudyCarousel sections={content.study} />
      </div>
    </section>
  )
}
