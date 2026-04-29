import { useState, memo } from 'react'
import { GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ProjectModal } from '@/components/ProjectModal'
import { usePortfolioContent } from '@/context/PortfolioContext'
import type { Project, ProjectCategory } from '@/lib/content-model'

interface ProjectCardProps {
  project: Project
  onOpen: (p: Project) => void
}

const ProjectCard = memo(function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <Card
      className="group h-full cursor-pointer bg-card/70 backdrop-blur transition-all hover:border-primary/50 hover:shadow-md"
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(project)
        }
      }}
      aria-label={`Projektdetails öffnen: ${project.title}`}
    >
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} auf GitHub`}
              className="text-muted-foreground hover:text-foreground"
            >
              <GithubLogo size={18} />
            </a>
          )}
        </div>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center text-xs text-primary">
          <span>Details</span>
          <ArrowSquareOut size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
        </div>
      </CardContent>
    </Card>
  )
})

export function Projects() {
  const { content } = usePortfolioContent()
  const [selected, setSelected] = useState<Project | null>(null)
  const [tab, setTab] = useState<ProjectCategory>('eigenstaendig')

  const filtered = content.projects.filter((p) => p.category === tab)

  return (
    <section id="projects" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projekte</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Auswahl an Projekten – mit klarer Trennung zwischen eigenständig entwickelten und
        AI-unterstützten Arbeiten.
      </p>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as ProjectCategory)}
        className="mt-8"
      >
        <TabsList>
          <TabsTrigger value="eigenstaendig">Eigenständig</TabsTrigger>
          <TabsTrigger value="ai-unterstuetzt">AI-unterstützt</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Keine Projekte in dieser Kategorie.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={setSelected} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
