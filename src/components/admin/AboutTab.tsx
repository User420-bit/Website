import { usePortfolioContent } from '@/context/PortfolioContext'
import { Button } from '@/components/ui/button'
import { Plus } from '@phosphor-icons/react'
import { AdminSection, TextField, TextareaField, ReorderControls } from './_shared'

export function AboutTab() {
  const { content, updateContent } = usePortfolioContent()
  const a = content.about

  const updateParagraph = (i: number, v: string) => {
    updateContent((prev) => {
      const next = [...prev.about.paragraphs]
      next[i] = v
      return { ...prev, about: { ...prev.about, paragraphs: next } }
    })
  }
  const removeParagraph = (i: number) =>
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: prev.about.paragraphs.filter((_, idx) => idx !== i) },
    }))
  const moveParagraph = (i: number, dir: -1 | 1) => {
    updateContent((prev) => {
      const arr = [...prev.about.paragraphs]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      const tmp = arr[i]
      const other = arr[j]
      if (tmp === undefined || other === undefined) return prev
      arr[i] = other
      arr[j] = tmp
      return { ...prev, about: { ...prev.about, paragraphs: arr } }
    })
  }
  const addParagraph = () =>
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: [...prev.about.paragraphs, ''] },
    }))

  const updateValue = (i: number, key: 'title' | 'description', v: string) => {
    updateContent((prev) => {
      const arr = [...prev.about.values]
      const cur = arr[i]
      if (!cur) return prev
      arr[i] = { ...cur, [key]: v }
      return { ...prev, about: { ...prev.about, values: arr } }
    })
  }
  const removeValue = (i: number) =>
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, values: prev.about.values.filter((_, idx) => idx !== i) },
    }))
  const moveValue = (i: number, dir: -1 | 1) => {
    updateContent((prev) => {
      const arr = [...prev.about.values]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      const tmp = arr[i]
      const other = arr[j]
      if (!tmp || !other) return prev
      arr[i] = other
      arr[j] = tmp
      return { ...prev, about: { ...prev.about, values: arr } }
    })
  }
  const addValue = () =>
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, values: [...prev.about.values, { title: '', description: '' }] },
    }))

  return (
    <>
      <AdminSection title="Paragraphen" description="Fließtext im Über-mich-Bereich.">
        <div className="space-y-3">
          {a.paragraphs.map((p, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1">
                <TextareaField label={`Absatz ${i + 1}`} value={p} onChange={(v) => updateParagraph(i, v)} rows={3} />
              </div>
              <div className="pt-7">
                <ReorderControls
                  index={i}
                  total={a.paragraphs.length}
                  onMove={moveParagraph}
                  onRemove={() => removeParagraph(i)}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addParagraph}>
            <Plus size={14} />
            Absatz hinzufügen
          </Button>
        </div>
      </AdminSection>

      <AdminSection title="Werte" description="Vier Karten unter den Paragraphen.">
        <div className="space-y-3">
          {a.values.map((v, i) => (
            <div key={i} className="rounded-md border border-border p-3">
              <div className="flex items-start justify-between">
                <span className="text-xs text-muted-foreground">Wert {i + 1}</span>
                <ReorderControls
                  index={i}
                  total={a.values.length}
                  onMove={moveValue}
                  onRemove={() => removeValue(i)}
                />
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <TextField label="Titel" value={v.title} onChange={(x) => updateValue(i, 'title', x)} />
                <TextField
                  label="Beschreibung"
                  value={v.description}
                  onChange={(x) => updateValue(i, 'description', x)}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addValue}>
            <Plus size={14} />
            Wert hinzufügen
          </Button>
        </div>
      </AdminSection>
    </>
  )
}
