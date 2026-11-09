/** Center an option inside its own mobile selector without scrolling the page. */
export function centerMobileSelection(option: HTMLElement, desktopBreakpoint: number) {
  const track = option.closest<HTMLElement>('[data-mobile-selection-track]')
  if (!track || typeof track.scrollTo !== 'function') return

  const isDesktop = window.matchMedia
    ? window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).matches
    : window.innerWidth >= desktopBreakpoint
  if (isDesktop || track.scrollWidth <= track.clientWidth) return

  const trackRect = track.getBoundingClientRect()
  const optionRect = option.getBoundingClientRect()
  const optionCenter = optionRect.left - trackRect.left + track.scrollLeft + optionRect.width / 2
  const maxScroll = track.scrollWidth - track.clientWidth
  const destination = Math.max(0, Math.min(maxScroll, optionCenter - track.clientWidth / 2))

  if (Math.abs(destination - track.scrollLeft) < 1) return
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  track.scrollTo({ left: destination, behavior: reducedMotion ? 'instant' : 'smooth' })
}
