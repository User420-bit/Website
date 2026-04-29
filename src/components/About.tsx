import { Card, CardContent } from '@/components/ui/card'
import { usePortfolioContent } from '@/context/PortfolioContext'

export function About() {
  const { content } = usePortfolioContent()
  const { about } = content

  return (
    <section id="about" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Über mich</h2>
      <div className="mt-6 max-w-3xl space-y-4">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90 sm:text-lg">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {about.values.map((v, i) => (
          <Card key={i} className="bg-card/60 backdrop-blur">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
