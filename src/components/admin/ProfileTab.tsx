import { usePortfolioContent } from '@/context/PortfolioContext'
import {
  AdminSection,
  TextField,
  TextareaField,
  StringListEditor,
  ImageUpload,
} from './_shared'

export function ProfileTab() {
  const { content, updateContent } = usePortfolioContent()
  const p = content.profile

  return (
    <AdminSection
      title="Profil"
      description="Hauptangaben für den Hero-Bereich und die Kontaktverknüpfungen."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Name"
          value={p.name}
          onChange={(v) =>
            updateContent((prev) => ({ ...prev, profile: { ...prev.profile, name: v } }))
          }
        />
        <TextField
          label="Untertitel"
          value={p.subtitle}
          onChange={(v) =>
            updateContent((prev) => ({ ...prev, profile: { ...prev.profile, subtitle: v } }))
          }
        />
        <TextField
          label="Institution"
          value={p.institution}
          onChange={(v) =>
            updateContent((prev) => ({ ...prev, profile: { ...prev.profile, institution: v } }))
          }
        />
        <TextField
          label="Ort"
          value={p.location}
          onChange={(v) =>
            updateContent((prev) => ({ ...prev, profile: { ...prev.profile, location: v } }))
          }
        />
      </div>

      <TextareaField
        label="Intro-Text"
        value={p.intro}
        rows={4}
        onChange={(v) =>
          updateContent((prev) => ({ ...prev, profile: { ...prev.profile, intro: v } }))
        }
      />

      <StringListEditor
        label="Bullet-Punkte"
        values={p.bullets}
        placeholder="z. B. Fundament in Informatik, BWL und Mathematik"
        onChange={(next) =>
          updateContent((prev) => ({ ...prev, profile: { ...prev.profile, bullets: next } }))
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <TextField
          label="E-Mail"
          type="email"
          value={p.social.email}
          onChange={(v) =>
            updateContent((prev) => ({
              ...prev,
              profile: { ...prev.profile, social: { ...prev.profile.social, email: v } },
            }))
          }
        />
        <TextField
          label="GitHub-URL"
          type="url"
          value={p.social.github}
          onChange={(v) =>
            updateContent((prev) => ({
              ...prev,
              profile: { ...prev.profile, social: { ...prev.profile.social, github: v } },
            }))
          }
        />
        <TextField
          label="LinkedIn-URL"
          type="url"
          value={p.social.linkedin}
          onChange={(v) =>
            updateContent((prev) => ({
              ...prev,
              profile: { ...prev.profile, social: { ...prev.profile.social, linkedin: v } },
            }))
          }
        />
      </div>

      <ImageUpload
        label="Profilbild (max. 1 MB)"
        value={p.imageUrl}
        onChange={(url) =>
          updateContent((prev) => ({ ...prev, profile: { ...prev.profile, imageUrl: url } }))
        }
      />
    </AdminSection>
  )
}
