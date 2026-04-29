import { useState, useEffect, useCallback } from 'react'

type SetValue<T> = T | ((prev: T) => T)

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}":`, error)
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStoredValue((prev) => {
        const valueToStore =
          typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          window.dispatchEvent(
            new CustomEvent('local-storage-change', { detail: { key } })
          )
        } catch (error) {
          console.warn(`useLocalStorage: error writing key "${key}":`, error)
        }
        return valueToStore
      })
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`useLocalStorage: error removing key "${key}":`, error)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handler = (e: Event) => {
      if (e instanceof StorageEvent && e.key !== null && e.key !== key) return
      if (e instanceof CustomEvent && e.detail?.key !== key) return
      setStoredValue(readValue())
    }
    window.addEventListener('storage', handler)
    window.addEventListener('local-storage-change', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('local-storage-change', handler)
    }
  }, [key, readValue])

  return [storedValue, setValue, removeValue]
}
