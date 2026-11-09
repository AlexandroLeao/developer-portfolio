import { afterEach, describe, expect, it, vi } from 'vitest'
import { centerMobileSelection } from './centerMobileSelection'

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.replaceChildren()
})

function createSelector() {
  const track = document.createElement('div')
  track.dataset.mobileSelectionTrack = ''
  const button = document.createElement('button')
  track.append(button)
  document.body.append(track)

  Object.defineProperties(track, {
    clientWidth: { configurable: true, value: 300 },
    scrollWidth: { configurable: true, value: 900 },
    scrollLeft: { configurable: true, value: 0 },
  })
  track.getBoundingClientRect = vi.fn().mockReturnValue({ left: 20 })
  button.getBoundingClientRect = vi.fn().mockReturnValue({ left: 390, width: 120 })
  track.scrollTo = vi.fn()
  return { track, button }
}

describe('centerMobileSelection', () => {
  it('centers a selected mobile option inside its own horizontal track', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
    const { track, button } = createSelector()

    centerMobileSelection(button, 1024)

    expect(track.scrollTo).toHaveBeenCalledWith({ left: 280, behavior: 'smooth' })
  })

  it('never moves a desktop selector or the page', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const { track, button } = createSelector()
    const windowScrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    centerMobileSelection(button, 640)

    expect(track.scrollTo).not.toHaveBeenCalled()
    expect(windowScrollTo).not.toHaveBeenCalled()
    windowScrollTo.mockRestore()
  })

  it('respects reduced motion and clamps the last item to the track end', () => {
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
    })))
    const { track, button } = createSelector()
    button.getBoundingClientRect = vi.fn().mockReturnValue({ left: 1000, width: 100 })

    centerMobileSelection(button, 1024)

    expect(track.scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'instant' })
  })
})
