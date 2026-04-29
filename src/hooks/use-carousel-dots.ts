import { useState, useCallback } from 'react'

export function useCarouselDots(total: number, initial = 0) {
  const [active, setActive] = useState<number>(initial)

  const next = useCallback(() => {
    setActive((a) => (a + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + total) % total)
  }, [total])

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= total) return
      setActive(i)
    },
    [total]
  )

  return { active, next, prev, goTo, setActive }
}
