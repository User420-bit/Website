import { usePortfolioContent } from '@/context/PortfolioContext'
import type { CodingItem, CodingCategory } from '@/lib/content-model'
import { Button } from '@/components/ui/button'
import { Plus } from '@phosphor-icons/react'
import {
  AdminSection,
  TextField,
  TextareaField,
  ReorderControls,
  ImageUpload,
  newId,
} from './_shared'

const CATEGORY_LABEL: Record<CodingCategory, string> = {
  'ai-tools': 'AI-Tools',
  'software-os': 'Software & OS',
  languages: 'Sprachen',
}

export function CodingTab() {
  const { content, updateContent } = usePortfolioContent()
  const list = content.coding

  const update = (i: number, patch: Partial<CodingItem>) => {
    updateContent((prev) => {
      const arr = [...prev.coding]
      const cur = arr[i]
      if (!cur) return prev
      arr[i] = { ...cur, ...patch }
      return { ...prev, coding: arr }
    })
  }
  const remove = (i: number) =>
    updateContent((prev) => ({ ...prev, coding: prev.coding.filter((_, idx) => idx !== i) }))
  const move = (i: number, dir: -1 | 1) => {
    updateContent((prev) => {
      const arr = [...prev.coding]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      const a = arr[i]
      const b = arr[j]
      if (!a || !b) return prev
      arr[i] = b
      arr[j] = a
      return { ...prev, coding: arr }
    })
  }
  const add = () =>
    updateContent((prev) => ({
      ...prev,
      coding: [
        ...prev.coding,
        { id: newId('coding'), name: 'Neuer Eintrag', category: 'ai-tools', details: '' },
      ],
    }))

  return (
    <AdminSection
      title="Coding"
      description="Tools, Sprachen und Software für die Coding-Seite."
      actions={
        <Button variant="outline" size="sm" onClick={add}>
          <Plus size={14} />
          Eintrag hinzufügen
        </Button>
      }
    >
      <div className="space-y-3">
        {list.map((c, i) => (
          <div key={c.id} className="rounded-md border border-border p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
              <ReorderControls
                index={i}
                total={list.length}
                onMove={move}
                onRemove={() => remove(i)}
              />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <TextField label="Name" value={c.name} onChange={(v) => update(i, { name: v })} />
              <div>
                <label className="text-sm font-medium leading-none">Kategorie</label>
                <select
                  value={c.category}
                  onChange={(e) => update(i, { category: e.target.value as CodingCategory })}
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {(Object.keys(CATEGORY_LABEL) as CodingCategory[]).map((k) => (
                    <option key={k} value={k}>
                      {CATEGORY_LABEL[k]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <TextareaField
                label="Details"
                value={c.details}
                onChange={(v) => update(i, { details: v })}
                rows={2}
              />
            </div>
            <div className="mt-3">
              <ImageUpload
                label="Logo (optional)"
                value={c.logoUrl}
                onChange={(url) => update(i, { logoUrl: url })}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminSection>
  )
}
