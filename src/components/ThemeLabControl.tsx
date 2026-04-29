import { useState } from 'react'
import { Palette, X } from '@phosphor-icons/react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const PRESETS: { id: string; label: string; swatch: string }[] = [
  { id: 'crimson', label: 'Crimson Fog', swatch: 'oklch(0.55 0.22 25)' },
  { id: 'midnight', label: 'Midnight Blue', swatch: 'oklch(0.5 0.2 250)' },
  { id: 'emerald', label: 'Emerald Mist', swatch: 'oklch(0.55 0.2 160)' },
  { id: 'violet', label: 'Violet Haze', swatch: 'oklch(0.55 0.22 300)' },
  { id: 'amber', label: 'Amber Glow', swatch: 'oklch(0.65 0.2 70)' },
  { id: 'slate', label: 'Slate Smoke', swatch: 'oklch(0.4 0.03 250)' },
  { id: 'rose', label: 'Rose Mist', swatch: 'oklch(0.6 0.2 5)' },
  { id: 'teal', label: 'Teal Night', swatch: 'oklch(0.55 0.18 200)' },
]

export function ThemeLabControl() {
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useLocalStorage<boolean>('testThemeEnabled', false)
  const [preset, setPreset] = useLocalStorage<string>('testThemePreset', 'crimson')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Theme-Einstellungen öffnen"
        className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform hover:scale-105"
        style={{ marginBottom: 'var(--safe-bottom)' }}
      >
        <Palette size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-t-xl border border-border bg-card p-5 shadow-xl sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Theme Lab"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Theme Lab</h2>
                <p className="text-xs text-muted-foreground">
                  Optionale atmosphärische Test-Themes.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Label htmlFor="theme-toggle">Test-Theme aktiv</Label>
              <Switch
                id="theme-toggle"
                checked={enabled}
                onCheckedChange={(v) => setEnabled(v)}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {PRESETS.map((p) => {
                const active = preset === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPreset(p.id)}
                    aria-pressed={active}
                    aria-label={p.label}
                    className={cn(
                      'flex items-center gap-2 rounded-md border p-2 text-left text-xs transition-colors',
                      active
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border hover:bg-accent'
                    )}
                    disabled={!enabled}
                  >
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 rounded-full border border-border"
                      style={{ background: p.swatch }}
                    />
                    {p.label}
                  </button>
                )
              })}
            </div>

            <p className="mt-4 text-[11px] text-muted-foreground">
              Dein Theme wird lokal in deinem Browser gespeichert.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
