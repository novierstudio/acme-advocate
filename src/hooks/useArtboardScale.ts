import { useEffect } from 'react'

export const ARTBOARD_WIDTH = 1920
// Below this the artboard would shrink type too far, so the CSS switches to a fluid layout
// (the matching @media block in index.css) and the artboard is left unscaled.
export const FLUID_QUERY = '(max-width: 1199px)'

// Scales every 1920px artboard to the window width via --scale, and exposes the window
// height in artboard pixels as --page-height so each section fills exactly one viewport.
export function useArtboardScale() {
  useEffect(() => {
    const root = document.documentElement
    const fluid = window.matchMedia(FLUID_QUERY)
    const update = () => {
      const scale = fluid.matches ? 1 : root.clientWidth / ARTBOARD_WIDTH
      root.style.setProperty('--scale', String(scale))
      root.style.setProperty('--page-height', `${window.innerHeight / scale}px`)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
}
