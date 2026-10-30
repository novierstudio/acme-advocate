import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Inertial smooth scrolling. Lenis eases the native scroll position, so position: fixed and
// ScrollTrigger keep working; it runs on GSAP's ticker so scroll effects stay in step.
// With prefers-reduced-motion, Lenis tracks the input 1:1 and jumps instantly.
let lenis: Lenis | null = null

const LOCK_CLASSES = ['is-loading', 'menu-open', 'menu-closing', 'disclaimer-open']

export function startSmoothScroll() {
  const instance = new Lenis({ autoRaf: false, lerp: 0.09 })
  lenis = instance
  const tick = (time: number) => instance.raf(time * 1000)
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  // On touch-only devices, touch scrolling runs through ScrollTrigger so the browser's address bar
  // stays put: otherwise it slides away mid-scroll and shifts everything, the pinned practice
  // section included, by its height. Nested scrollers (the menu panel) still scroll natively.
  const touchOnly = ScrollTrigger.isTouch === 1
  const normalize = (on: boolean) => {
    if (touchOnly) ScrollTrigger.normalizeScroll(on ? { allowNestedScroll: true } : false)
  }

  // The curtain, the disclaimer and the menu lock the page with a class on <html> (see index.css); pause with them
  const root = document.documentElement
  const syncLock = () => {
    const locked = LOCK_CLASSES.some((name) => root.classList.contains(name))
    if (locked) instance.stop()
    else instance.start()
    // Scripted scrolling ignores overflow: hidden, so it pauses with the lock too
    normalize(!locked)
  }
  const observer = new MutationObserver(syncLock)
  observer.observe(root, { attributes: true, attributeFilter: ['class'] })
  syncLock()

  return () => {
    observer.disconnect()
    normalize(false)
    gsap.ticker.remove(tick)
    instance.destroy()
    lenis = null
  }
}

// `immediate` jumps (used while the curtain covers a route change); otherwise glides.
// `force` lets it run even while the page is locked.
export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
}

