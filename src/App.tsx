import { useEffect } from 'react'
import { useRouter } from '@/hooks/use-router'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { MainPage } from '@/components/MainPage'
import { AdminPage } from '@/components/AdminPage'
import { AiToolsPage } from '@/components/AiToolsPage'
import { ImpressumPage } from '@/components/ImpressumPage'
import { DatenschutzPage } from '@/components/DatenschutzPage'
import { CrimsonFogBlobs } from '@/components/CrimsonFogBlobs'
import { ThemeLabControl } from '@/components/ThemeLabControl'

export function App() {
  const { path } = useRouter()
  const [themeEnabled] = useLocalStorage<boolean>('testThemeEnabled', false)
  const [themePreset] = useLocalStorage<string>('testThemePreset', 'crimson')

  useEffect(() => {
    const body = document.body
    if (themeEnabled) {
      body.setAttribute('data-test-enabled', 'true')
      body.setAttribute('data-test-theme', themePreset || 'crimson')
    } else {
      body.removeAttribute('data-test-enabled')
      body.removeAttribute('data-test-theme')
    }
  }, [themeEnabled, themePreset])

  // Restore SPA path from GitHub Pages 404 redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('p')
    if (redirect) {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      const target = base + redirect
      window.history.replaceState({}, '', target)
    }
  }, [])

  let page
  if (path === '/admin') page = <AdminPage />
  else if (path === '/ai-tools') page = <AiToolsPage />
  else if (path === '/impressum') page = <ImpressumPage />
  else if (path === '/datenschutz') page = <DatenschutzPage />
  else page = <MainPage />

  return (
    <>
      {themeEnabled && <CrimsonFogBlobs />}
      {page}
      <ThemeLabControl />
    </>
  )
}
