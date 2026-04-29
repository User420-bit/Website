import { motion, AnimatePresence } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { StudyCard } from '@/components/StudyCard'
import { useCarouselDots } from '@/hooks/use-carousel-dots'
import { cn } from '@/lib/utils'
import type { StudySection } from '@/lib/content-model'

interface StudyCarouselProps {
  sections: StudySection[]
}

export function StudyCarousel({ sections }: StudyCarouselProps) {
  const total = sections.length
  const { active, next, prev, goTo } = useCarouselDots(total)

  if (total === 0) return null

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) next()
    else if (info.offset.x > 50) prev()
  }

  const getOffset = (i: number): number => {
    let diff = i - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <div className="relative">
      <div
        className="relative mx-auto h-[460px] w-full max-w-2xl overflow-visible sm:h-[420px]"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence initial={false}>
          {sections.map((section, i) => {
            const offset = getOffset(i)
            const isActive = offset === 0
            const isNeighbor = Math.abs(offset) === 1
            const isVisible = Math.abs(offset) <= 1
            return (
              <motion.div
                key={section.id}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `${offset * 60}%`,
                  scale: isActive ? 1 : isNeighbor ? 0.85 : 0.7,
                  opacity: isActive ? 1 : isNeighbor ? 0.55 : 0,
                  zIndex: isActive ? 10 : isNeighbor ? 5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className={cn(
                  'absolute inset-0 mx-auto px-2',
                  isVisible ? 'pointer-events-auto' : 'pointer-events-none',
                  isActive && 'cursor-grab active:cursor-grabbing'
                )}
                aria-hidden={!isActive}
              >
                <StudyCard section={section} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={prev} aria-label="Vorherige Karte">
          <CaretLeft size={18} />
        </Button>
        <div className="flex gap-2" role="tablist" aria-label="Karussell-Indikatoren">
          {sections.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Karte ${i + 1}: ${s.title}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
              )}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={next} aria-label="Nächste Karte">
          <CaretRight size={18} />
        </Button>
      </div>
    </div>
  )
}
