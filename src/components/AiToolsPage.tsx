import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { usePortfolioContent } from '@/context/PortfolioContext'
import type { CodingCategory, CodingItem } from '@/lib/content-model'

const SECTIONS: { key: CodingCategory; title: string; description: string }[] = [
  {
    key: 'ai-tools',
    title: 'AI-Tools',
    description: 'Werkzeuge, die ich gezielt im Entwicklungs- und Lernprozess einsetze.',
  },
  {
    key: 'software-os',
    title: 'Software & Betriebssysteme',
    description: 'Tägliche Arbeitsumgebung für Entwicklung und Studium.',
  },
  {
    key: 'languages',
    title: 'Programmiersprachen',
    description: 'Sprachen, mit denen ich aktiv arbeite.',
  },
]

function ItemAccordion({ items }: { items: CodingItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Keine Einträge.</p>
  }
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              {item.logoUrl && (
                <img
                  src={item.logoUrl}
                  alt=""
                  className="h-6 w-6 rounded object-contain"
                  loading="lazy"
                />
              )}
              <span>{item.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">{item.details}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AiToolsPage() {
  const { content } = usePortfolioContent()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Coding</h1>
        <p className="mt-3 text-muted-foreground">
          Tools, Sprachen und Software, mit denen ich arbeite.
        </p>

        <div className="mt-10 space-y-12">
          {SECTIONS.map((s) => {
            const items = content.coding.filter((c) => c.category === s.key)
            return (
              <section key={s.key}>
                <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4">
                  <ItemAccordion items={items} />
                </div>
              </section>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
