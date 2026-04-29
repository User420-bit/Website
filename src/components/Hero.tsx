import { motion } from 'framer-motion'
import { EnvelopeSimple, FolderOpen } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { usePortfolioContent } from '@/context/PortfolioContext'

export function Hero() {
  const { content } = usePortfolioContent()
  const { profile } = content

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="container mx-auto max-w-6xl px-4 py-12 md:py-20"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl text-primary font-medium">{profile.subtitle}</p>
          <p className="mt-1 text-base text-muted-foreground">
            {profile.institution} · {profile.location}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {profile.intro}
          </p>

          <ul className="mt-6 space-y-2">
            {profile.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={scrollToContact} size="lg">
              <EnvelopeSimple size={18} />
              Kontakt aufnehmen
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToProjects}>
              <FolderOpen size={18} />
              Projekte ansehen
            </Button>
          </div>
        </motion.div>

        {profile.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full bg-primary/20 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={profile.imageUrl}
                alt={`Portrait von ${profile.name}`}
                className="relative h-56 w-56 rounded-full object-cover shadow-xl ring-2 ring-border sm:h-72 sm:w-72"
                loading="eager"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
