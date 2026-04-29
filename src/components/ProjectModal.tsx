import { GithubLogo } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/content-model'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {project && (
          <>
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>

            {project.detailOverview && (
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Überblick
                </h3>
                <p className="text-sm leading-relaxed">{project.detailOverview}</p>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Features
                </h3>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.screenshots && project.screenshots.length > 0 && (
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Screenshots
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {project.screenshots.map((s, i) => (
                    <figure key={i} className="space-y-1">
                      <img
                        src={s.url}
                        alt={s.caption ?? `${project.title} Screenshot ${i + 1}`}
                        className="rounded-md border border-border object-cover"
                        loading="lazy"
                      />
                      {s.caption && (
                        <figcaption className="text-xs text-muted-foreground">
                          {s.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Lernerfolge
                </h3>
                <ul className="space-y-1.5">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.codeExample && (
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Code-Beispiel ({project.codeExample.language})
                </h3>
                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs font-mono leading-relaxed">
                  <code>{project.codeExample.snippet}</code>
                </pre>
              </section>
            )}

            {project.githubUrl && (
              <div className="pt-2">
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={18} />
                    Auf GitHub ansehen
                  </a>
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
