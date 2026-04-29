import { createContext, useContext, useCallback, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { DEFAULT_CONTENT, type PortfolioContent } from '@/lib/content-model'

interface PortfolioContextValue {
  content: PortfolioContent
  setContent: (next: PortfolioContent | ((prev: PortfolioContent) => PortfolioContent)) => void
  resetContent: () => void
  updateContent: (updater: (prev: PortfolioContent) => PortfolioContent) => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

const STORAGE_KEY = 'portfolio:content'

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent, removeContent] = useLocalStorage<PortfolioContent>(
    STORAGE_KEY,
    DEFAULT_CONTENT
  )

  const updateContent = useCallback(
    (updater: (prev: PortfolioContent) => PortfolioContent) => {
      setContent((prev) => {
        const next = updater(prev)
        return {
          ...next,
          ui: { ...(next.ui ?? {}), lastUpdatedAt: new Date().toISOString() },
        }
      })
    },
    [setContent]
  )

  const resetContent = useCallback(() => {
    removeContent()
  }, [removeContent])

  return (
    <PortfolioContext.Provider value={{ content, setContent, resetContent, updateContent }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContent(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolioContent must be used within PortfolioProvider')
  return ctx
}
