import { useEffect, useRef } from 'react'

type Language = 'pt' | 'en'

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

  useEffect(() => {
    let frameId: number | null = null
    const useAnimationFrame = typeof window.requestAnimationFrame === 'function'

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

      frameId = useAnimationFrame
        ? window.requestAnimationFrame(updateProgress)
        : window.setTimeout(updateProgress, 16)
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(scheduleUpdate)
      : null

    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver?.disconnect()

      if (frameId !== null) {
        if (useAnimationFrame) window.cancelAnimationFrame(frameId)
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] bg-(--color-border)"
    >
      <div
        ref={fillRef}
        aria-hidden="true"
        className="absolute inset-0 origin-left bg-(--color-primary)"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export default ScrollProgress
