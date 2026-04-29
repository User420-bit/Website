import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StudySection } from '@/lib/content-model'

interface StudyCardProps {
  section: StudySection
}

export const StudyCard = memo(function StudyCard({ section }: StudyCardProps) {
  return (
    <Card className="h-full w-full bg-card/80 backdrop-blur shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          {section.logoUrl && (
            <img
              src={section.logoUrl}
              alt=""
              className="h-10 w-10 rounded-md object-contain"
              loading="lazy"
            />
          )}
          <Badge variant="secondary">{section.category}</Badge>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight">{section.title}</h3>
        <ul className="mt-5 space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {section.note && (
          <p className="mt-5 text-sm italic text-muted-foreground">{section.note}</p>
        )}
      </CardContent>
    </Card>
  )
})
