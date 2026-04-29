import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useRouter } from '@/hooks/use-router'
import { usePortfolioContent } from '@/context/PortfolioContext'
import { portfolioContentSchema } from '@/lib/content-validation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, SignOut, Upload, Download } from '@phosphor-icons/react'
import { formatDate } from '@/lib/utils'
import { ProfileTab } from '@/components/admin/ProfileTab'
import { AboutTab } from '@/components/admin/AboutTab'
import { StudyTab } from '@/components/admin/StudyTab'
import { ProjectsTab } from '@/components/admin/ProjectsTab'
import { CodingTab } from '@/components/admin/CodingTab'
import { ContactTab } from '@/components/admin/ContactTab'

interface Session {
  expiresAt: number
}

const SESSION_KEY = 'psd_admin_session'
const SESSION_HOURS = 8

function getDefaultPassphrase(): string {
  return (import.meta.env.VITE_ADMIN_PASSPHRASE as string | undefined) ?? 'changeme'
}

export function AdminPage() {
  const { navigate } = useRouter()
  const [session, setSession, removeSession] = useLocalStorage<Session | null>(SESSION_KEY, null)
  const [passphraseInput, setPassphraseInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated =
    session !== null && typeof session.expiresAt === 'number' && session.expiresAt > Date.now()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (passphraseInput === getDefaultPassphrase()) {
      setSession({ expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000 })
      setPassphraseInput('')
    } else {
      setError('Falsche Passphrase.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">Bitte Passphrase eingeben.</p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="passphrase">Passphrase</Label>
                <Input
                  id="passphrase"
                  type="password"
                  autoFocus
                  value={passphraseInput}
                  onChange={(e) => setPassphraseInput(e.target.value)}
                  className="mt-2"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Anmelden
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Abbrechen
                </Button>
              </div>
            </form>
            <p className="mt-6 text-xs text-muted-foreground">
              Hinweis: Der Passphrase-Schutz ist eine pragmatische Hürde, keine echte Sicherheit.
              Inhalte werden ausschließlich lokal im Browser gespeichert.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <AdminDashboard onLogout={() => removeSession()} />
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { navigate } = useRouter()
  const { content, setContent, resetContent } = usePortfolioContent()
  const [importStatus, setImportStatus] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(
    null
  )

  useEffect(() => {
    if (!importStatus) return
    const t = setTimeout(() => setImportStatus(null), 4000)
    return () => clearTimeout(t)
  }, [importStatus])

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      const parsed: unknown = JSON.parse(text)
      const result = portfolioContentSchema.safeParse(parsed)
      if (!result.success) {
        setImportStatus({
          kind: 'err',
          msg: `Validierung fehlgeschlagen: ${
            result.error.issues[0]?.message ?? 'Schema mismatch'
          }`,
        })
        return
      }
      setContent({
        ...result.data,
        ui: { ...(result.data.ui ?? {}), lastUpdatedAt: new Date().toISOString() },
      })
      setImportStatus({ kind: 'ok', msg: 'Import erfolgreich.' })
    } catch (e) {
      setImportStatus({
        kind: 'err',
        msg: `Import-Fehler: ${e instanceof Error ? e.message : 'unbekannt'}`,
      })
    }
  }

  const handleReset = () => {
    if (!window.confirm('Wirklich auf Standardinhalte zurücksetzen?')) return
    resetContent()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Admin</h1>
            <p className="text-xs text-muted-foreground">
              Zuletzt aktualisiert: {formatDate(content.ui?.lastUpdatedAt) || 'nie'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" size="sm" asChild>
              <label className="cursor-pointer">
                <Upload size={16} />
                Import
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) void handleImport(f)
                    e.target.value = ''
                  }}
                />
              </label>
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <SignOut size={16} />
              Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              aria-label="Schließen"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        {importStatus && (
          <div
            className={`px-4 py-2 text-sm ${
              importStatus.kind === 'ok'
                ? 'bg-primary/10 text-primary'
                : 'bg-destructive/10 text-destructive'
            }`}
          >
            {importStatus.msg}
          </div>
        )}
      </header>

      <main className="container mx-auto max-w-6xl flex-1 px-4 py-6">
        <p className="mb-4 text-xs text-muted-foreground">
          Änderungen sind sofort auf der Hauptseite sichtbar (Live-Preview via localStorage).
        </p>
        <Tabs defaultValue="profile">
          <TabsList className="flex h-auto w-full flex-wrap gap-1">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="about">Über mich</TabsTrigger>
            <TabsTrigger value="study">Studium</TabsTrigger>
            <TabsTrigger value="projects">Projekte</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="contact">Kontakt</TabsTrigger>
            <TabsTrigger value="danger">Reset</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
          <TabsContent value="study">
            <StudyTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="coding">
            <CodingTab />
          </TabsContent>
          <TabsContent value="contact">
            <ContactTab />
          </TabsContent>
          <TabsContent value="danger">
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-lg font-semibold">Auf Standardinhalte zurücksetzen</h2>
                <p className="text-sm text-muted-foreground">
                  Setzt alle Inhalte auf die im Code hinterlegten Defaults zurück. Aktion ist nicht
                  rückgängig zu machen (außer per erneutem Import).
                </p>
                <Button variant="destructive" onClick={handleReset}>
                  Reset durchführen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
