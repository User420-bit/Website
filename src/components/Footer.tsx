import { useRouter } from '@/hooks/use-router'

export function Footer() {
  const { navigate } = useRouter()
  return (
    <footer className="border-t border-border bg-background/60 py-8 text-sm text-muted-foreground">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p>© 2025 Pharrel Sandjo Djomou</p>
        <nav aria-label="Rechtliches" className="flex gap-6">
          <button
            onClick={() => navigate('/impressum')}
            className="hover:text-foreground hover:underline"
          >
            Impressum
          </button>
          <button
            onClick={() => navigate('/datenschutz')}
            className="hover:text-foreground hover:underline"
          >
            Datenschutz
          </button>
        </nav>
      </div>
    </footer>
  )
}
