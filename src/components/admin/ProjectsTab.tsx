import { usePortfolioContent } from '@/context/PortfolioContext'
import type { Project, ProjectCategory } from '@/lib/content-model'
import { Button } from '@/components/ui/button'
import { Plus } from '@phosphor-icons/react'
import {
  AdminSection,
  TextField,
  TextareaField,
  StringListEditor,
  ReorderControls,
  newId,
} from './_shared'

export function ProjectsTab() {
  const { content, updateContent } = usePortfolioContent()
  const list = content.projects

  const update = (i: number, patch: Partial<Project>) => {
    updateContent((prev) => {
      const arr = [...prev.projects]
      const cur = arr[i]
      if (!cur) return prev
      arr[i] = { ...cur, ...patch }
      return { ...prev, projects: arr }
    })
  }
  const remove = (i: number) =>
    updateContent((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))
  const move = (i: number, dir: -1 | 1) => {
    updateContent((prev) => {
      const arr = [...prev.projects]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      const a = arr[i]
      const b = arr[j]
      if (!a || !b) return prev
      arr[i] = b
      arr[j] = a
      return { ...prev, projects: arr }
    })
  }
  const add = () =>
    updateContent((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: newId('proj'),
          title: 'Neues Projekt',
          description: '',
          techStack: [],
          category: 'eigenstaendig',
        },
      ],
    }))

  return (
    <AdminSection
      title="Projekte"
      description="Eigenständige und AI-unterstützte Projekte."
      actions={
        <Button variant="outline" size="sm" onClick={add}>
          <Plus size={14} />
          Projekt hinzufügen
        </Button>
      }
    >
      <div className="space-y-4">
        {list.map((p, i) => (
          <div key={p.id} className="rounded-md border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono text-muted-foreground">{p.id}</span>
              <ReorderControls
                index={i}
                total={list.length}
                onMove={move}
                onRemove={() => remove(i)}
              />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <TextField
                label="Titel"
                value={p.title}
                onChange={(v) => update(i, { title: v })}
              />
              <div>
                <label className="text-sm font-medium leading-none">Kategorie</label>
                <select
                  value={p.category}
                  onChange={(e) => update(i, { category: e.target.value as ProjectCategory })}
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="eigenstaendig">Eigenständig</option>
                  <option value="ai-unterstuetzt">AI-unterstützt</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <TextareaField
                label="Kurzbeschreibung"
                value={p.description}
                onChange={(v) => update(i, { description: v })}
                rows={2}
              />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <TextField
                label="GitHub-URL (optional)"
                type="url"
                value={p.githubUrl ?? ''}
                onChange={(v) => update(i, { githubUrl: v || undefined })}
              />
            </div>
            <div className="mt-3">
              <StringListEditor
                label="Tech Stack"
                values={p.techStack}
                onChange={(next) => update(i, { techStack: next })}
              />
            </div>
            <div className="mt-3">
              <TextareaField
                label="Detail-Überblick (optional)"
                value={p.detailOverview ?? ''}
                onChange={(v) => update(i, { detailOverview: v || undefined })}
                rows={3}
              />
            </div>
            <div className="mt-3">
              <StringListEditor
                label="Features"
                values={p.features ?? []}
                onChange={(next) => update(i, { features: next })}
              />
            </div>
            <div className="mt-3">
              <StringListEditor
                label="Lernerfolge"
                values={p.learnings ?? []}
                onChange={(next) => update(i, { learnings: next })}
              />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <TextField
                label="Code-Beispiel: Sprache"
                value={p.codeExample?.language ?? ''}
                onChange={(v) =>
                  update(i, {
                    codeExample: v
                      ? { language: v, snippet: p.codeExample?.snippet ?? '' }
                      : undefined,
                  })
                }
                placeholder="z. B. bash, java, ts"
              />
            </div>
            <div className="mt-3">
              <TextareaField
                label="Code-Beispiel: Snippet"
                value={p.codeExample?.snippet ?? ''}
                onChange={(v) =>
                  update(i, {
                    codeExample: v
                      ? { language: p.codeExample?.language ?? 'text', snippet: v }
                      : undefined,
                  })
                }
                rows={4}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}
