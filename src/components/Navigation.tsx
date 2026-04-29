import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { List, ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter } from '@/hooks/use-router'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'Über mich', href: '#about' },
  { id: 'study', label: 'Studium', href: '#study' },
  { id: 'projects', label: 'Projekte', href: '#projects' },
  { id: 'contact', label: 'Kontakt', href: '#contact' },
]

export function Navigation() {
  const { path, navigate } = useRouter()
  const [activeSection, setActiveSection] = useState<string>('about')
  const [open, setOpen] = useState(false)

  const isMain = path === '/'

  useEffect(() => {
    if (!isMain) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isMain])

  const scrollTo = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    const headerH = 64
    const top = el.getBoundingClientRect().top + window.scrollY - headerH
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (!isMain) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 max-w-6xl items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            aria-label="Zurück zur Startseite"
          >
            <ArrowLeft size={18} />
            <span>Zurück zur Startseite</span>
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <button
          onClick={() => scrollTo('#about')}
          className="text-sm font-bold tracking-tight"
          aria-label="Zum Anfang"
        >
          PSD
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => navigate('/ai-tools')}
          >
            Coding
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü öffnen">
              <List size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className="rounded-md px-3 py-3 text-left text-base font-medium hover:bg-accent"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  navigate('/ai-tools')
                }}
                className="mt-2 rounded-md border border-border px-3 py-3 text-left text-base font-medium hover:bg-accent"
              >
                Coding
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
