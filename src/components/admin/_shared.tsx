import type { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, Plus, X } from '@phosphor-icons/react'

export interface AdminSectionProps {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
}

export function AdminSection({ title, description, children, actions }: AdminSectionProps) {
  return (
    <Card className="mt-4">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: TextFieldProps) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5"
      />
    </div>
  )
}

interface TextareaFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}

export function TextareaField({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: TextareaFieldProps) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1.5"
      />
    </div>
  )
}

interface ReorderControlsProps {
  index: number
  total: number
  onMove: (i: number, dir: -1 | 1) => void
  onRemove: () => void
}

export function ReorderControls({ index, total, onMove, onRemove }: ReorderControlsProps) {
  return (
    <div className="flex shrink-0 gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onMove(index, -1)}
        disabled={index === 0}
        aria-label="Nach oben"
      >
        <ArrowUp size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onMove(index, 1)}
        disabled={index === total - 1}
        aria-label="Nach unten"
      >
        <ArrowDown size={14} />
      </Button>
      <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Entfernen">
        <X size={14} />
      </Button>
    </div>
  )
}

interface StringListEditorProps {
  label: string
  values: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}

export function StringListEditor({
  label,
  values,
  onChange,
  placeholder,
}: StringListEditorProps) {
  const update = (i: number, v: string) => {
    const next = [...values]
    next[i] = v
    onChange(next)
  }
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= values.length) return
    const next = [...values]
    const a = next[i]
    const b = next[j]
    if (a === undefined || b === undefined) return
    next[i] = b
    next[j] = a
    onChange(next)
  }
  const add = () => onChange([...values, ''])

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
            />
            <ReorderControls
              index={i}
              total={values.length}
              onMove={move}
              onRemove={remove.bind(null, i)}
            />
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={add}>
          <Plus size={14} />
          Hinzufügen
        </Button>
      </div>
    </div>
  )
}

const MAX_IMAGE_BYTES = 1_048_576

export async function fileToDataUrl(file: File): Promise<string> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Bild zu groß (max. ${Math.round(MAX_IMAGE_BYTES / 1024)} KB).`)
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const r = reader.result
      if (typeof r === 'string') resolve(r)
      else reject(new Error('Konnte Datei nicht lesen.'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('Lesefehler'))
    reader.readAsDataURL(file)
  })
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

interface ImageUploadProps {
  label: string
  value: string | undefined
  onChange: (dataUrl: string | undefined) => void
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-16 w-16 rounded border border-border object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded border border-dashed border-border" />
        )}
        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" size="sm">
            <label className="cursor-pointer">
              Bild wählen
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  try {
                    const url = await fileToDataUrl(f)
                    onChange(url)
                  } catch (err) {
                    alert(err instanceof Error ? err.message : 'Fehler beim Lesen.')
                  }
                  e.target.value = ''
                }}
              />
            </label>
          </Button>
          {value && (
            <Button variant="ghost" size="sm" onClick={() => onChange(undefined)}>
              Entfernen
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
