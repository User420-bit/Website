import { usePortfolioContent } from '@/context/PortfolioContext'
import { AdminSection, TextField, TextareaField } from './_shared'

export function ContactTab() {
  const { content, updateContent } = usePortfolioContent()
  const c = content.contact

  return (
    <AdminSection title="Kontakt" description="Überschrift und Kurztext im Kontakt-Bereich.">
      <TextField
        label="Überschrift"
        value={c.heading}
        onChange={(v) =>
          updateContent((prev) => ({ ...prev, contact: { ...prev.contact, heading: v } }))
        }
      />
      <TextareaField
        label="Beschreibung"
        value={c.description}
        rows={3}
        onChange={(v) =>
          updateContent((prev) => ({ ...prev, contact: { ...prev.contact, description: v } }))
        }
      />
    </AdminSection>
  )
}
