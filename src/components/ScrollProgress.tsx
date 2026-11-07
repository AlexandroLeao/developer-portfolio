import { useEffect, useRef, useState } from 'react'

type Language = 'pt' | 'en'

const sections = [
  { id: 'about', pt: 'Sobre', en: 'About' },
  { id: 'skills', pt: 'Tecnologias', en: 'Technologies' },
  { id: 'projects', pt: 'Projetos', en: 'Projects' },
  { id: 'experience', pt: 'Experiência', en: 'Experience' },
  { id: 'certifications', pt: 'Certificações', en: 'Certifications' },
  { id: 'contact', pt: 'Contato', en: 'Contact' },
] as const

type SectionStop = {
  id: string
  position: number
}

function getScrollableHeight() {
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  )

  return Math.max(0, documentHeight - window.innerHeight)
}

function ScrollProgress({ language }: { language: Language }) {
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [stops, setStops] = useState<SectionStop[]>([])

  useEffect(() => {
    let frameId: number | null = null

    function updateProgress() {
      frameId = null

      const scrollableHeight = getScrollableHeight()
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0

      fillRef.current?.style.setProperty('transform', `scaleX(${progress})`)
      barRef.current?.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
    }

    function scheduleUpdate() {
      if (frameId !== null) return

      frameId = window.requestAnimationFrame
        ? window.requestAnimationFrame(updateProgress)
        : window.setTimeout(updateProgress, 16)
    }

    function measureSections() {
      const scrollableHeight = getScrollableHeight()

      const nextStops = sections.flatMap(({ id }) => {
        const section = document.getElementById(id)
        if (!section || scrollableHeight === 0) return []

        const documentTop = section.getBoundingClientRect().top + window.scrollY
        return [{
          id,
          position: Math.min(0.99, Math.max(0.01, documentTop / scrollableHeight)),
        }]
      })

      setStops((current) =>
        current.length === nextStops.length &&
        current.every((stop, index) =>
          stop.id === nextStops[index].id &&
          Math.abs(stop.position - nextStops[index].position) < 0.001,
        )
          ? current
          : nextStops,
      )

      scheduleUpdate()
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measureSections)
      : null

    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', measureSections)
    measureSections()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', measureSections)
      resizeObserver?.disconnect()

      if (frameId !== null) {
        if (window.requestAnimationFrame) window.cancelAnimationFrame(frameId)
        else window.clearTimeout(frameId)
      }
    }
  }, [])

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-label={language === 'pt' ? 'Progresso de leitura da página' : 'Page scroll progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-(--color-border)"
    >
      <div
        ref={fillRef}
        aria-hidden="true"
        className="absolute inset-0 origin-left bg-(--color-primary)"
        style={{ transform: 'scaleX(0)' }}
      />
      {stops.map(({ id, position }) => {
        const section = sections.find((item) => item.id === id)!
        return (
          <span
            key={id}
            aria-hidden="true"
            title={section[language]}
            className="absolute top-1/2 z-10 h-1.5 w-px -translate-x-1/2 -translate-y-1/2 bg-(--color-text-muted)"
            style={{ left: `${position * 100}%` }}
          />
        )
      })}
    </div>
  )
}

export default ScrollProgress
