import { useState, useEffect, useCallback } from 'react'

export function useRouter() {
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/'
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    let p = window.location.pathname
    if (base && p.startsWith(base)) p = p.slice(base.length) || '/'
    return p || '/'
  })

  useEffect(() => {
    const onPopState = () => {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      let p = window.location.pathname
      if (base && p.startsWith(base)) p = p.slice(base.length) || '/'
      setPath(p || '/')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to: string) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const target = base + (to.startsWith('/') ? to : `/${to}`)
    window.history.pushState({}, '', target)
    setPath(to)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return { path, navigate }
}
