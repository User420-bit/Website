import { EnvelopeSimple, LinkedinLogo, GithubLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { usePortfolioContent } from '@/context/PortfolioContext'

export function Contact() {
  const { content } = usePortfolioContent()
  const { contact, profile } = content
  const { social } = profile

  return (
    <section id="contact" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{contact.heading}</h2>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
        {contact.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {social.email && (
          <Button asChild size="lg">
            <a href={`mailto:${social.email}`} aria-label={`E-Mail an ${social.email}`}>
              <EnvelopeSimple size={18} />
              E-Mail
            </a>
          </Button>
        )}
        {social.linkedin && (
          <Button asChild variant="outline" size="lg">
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinLogo size={18} />
              LinkedIn
            </a>
          </Button>
        )}
        {social.github && (
          <Button asChild variant="outline" size="lg">
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={18} />
              GitHub
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
