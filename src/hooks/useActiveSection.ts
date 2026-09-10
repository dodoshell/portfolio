import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(ids: readonly T[]): T | '' {
  const [active, setActive] = useState<T | ''>('')

  useEffect(() => {
    const elements = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry): entry is { id: T; el: HTMLElement } => entry.el !== null)

    if (elements.length === 0) return

    const idByElement = new Map(elements.map(({ id, el }) => [el, id]))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (!top) return

        const id = idByElement.get(top.target as HTMLElement)
        if (id) setActive(id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
