import { usePortfolioContent } from '@/context/PortfolioContext'
import type { StudySection } from '@/lib/content-model'
import { Button } from '@/components/ui/button'
import { Plus } from '@phosphor-icons/react'
import {
  AdminSection,
  TextField,
  TextareaField,
  StringListEditor,
  ReorderControls,
  ImageUpload,
  newId,
} from './_shared'

export function StudyTab() {
  const { content, updateContent } = usePortfolioContent()
  const list = content.study

  const updateSection = (i: number, patch: Partial<StudySection>) => {
    updateContent((prev) => {
      const arr = [...prev.study]
      const cur = arr[i]
      if (!cur) return prev
      arr[i] = { ...cur, ...patch }
      return { ...prev, study: arr }
    })
  }
  const remove = (i: number) =>
    updateContent((prev) => ({ ...prev, study: prev.study.filter((_, idx) => idx !== i) }))
  const move = (i: number, dir: -1 | 1) => {
    updateContent((prev) => {
      const arr = [...prev.study]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      const a = arr[i]
      const b = arr[j]
      if (!a || !b) return prev
      arr[i] = b
      arr[j] = a
      return { ...prev, study: arr }
    })
  }
  const add = () =>
    updateContent((prev) => ({
      ...prev,
      study: [
        ...prev.study,
        { id: newId('study'), category: 'Neu', title: 'Neuer Bereich', items: [] },
      ],
    }))

  return (
    <AdminSection
      title="Studium"
      description="Karussell-Karten für Studieninhalte."
      actions={
        <Button variant="outline" size="sm" onClick={add}>
          <Plus size={14} />
          Bereich hinzufügen
        </Button>
      }
    >
      <div className="space-y-4">
        {list.map((s, i) => (
          <div key={s.id} className="rounded-md border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono text-muted-foreground">{s.id}</span>
              <ReorderControls
                index={i}
                total={list.length}
                onMove={move}
                onRemove={() => remove(i)}
              />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <TextField
                label="Kategorie"
                value={s.category}
                onChange={(v) => updateSection(i, { category: v })}
              />
              <TextField
                label="Titel"
                value={s.title}
                onChange={(v) => updateSection(i, { title: v })}
              />
            </div>
            <div className="mt-3">
              <StringListEditor
                label="Items"
                values={s.items}
                onChange={(next) => updateSection(i, { items: next })}
              />
            </div>
            <div className="mt-3">
              <TextareaField
                label="Notiz (optional)"
                value={s.note ?? ''}
                onChange={(v) => updateSection(i, { note: v || undefined })}
                rows={2}
              />
            </div>
            <div className="mt-3">
              <ImageUpload
                label="Logo (optional, max. 1 MB)"
                value={s.logoUrl}
                onChange={(url) => updateSection(i, { logoUrl: url })}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}
