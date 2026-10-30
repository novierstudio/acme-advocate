import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '../lib/router'
import { nav, chambers } from '../data/site'

type Props = {
  open: boolean
  path: string
  onClose: () => void
  // The page (main + footer), which shrinks aside to uncover the menu behind it
  shell: RefObject<HTMLDivElement | null>
}

// One curve for both directions, so closing is the opening played back
const EASE = 'power4.inOut'
const DURATION = 1
// Corner radius of the shrunk page, in screen pixels
const RADIUS = 24

// Gap above and below the shrunk page on laptops and up, in screen pixels
const EDGE = 16

// Where the page goes. Laptops and up: the whole page shrinks a little and slides left, so its
// right edge stops where the menu column (`body`, sized in index.css) begins; nothing covers it.
// Smaller screens: it slides most of the way left.
const layout = (body: HTMLElement) => {
  const width = window.innerWidth
  if (width >= 1200) {
    const scale = (window.innerHeight - EDGE * 2) / window.innerHeight
    // Scaled from its right edge, then moved left by the column's width
    return { scale, x: -body.offsetWidth, originX: '100%' }
  }
  const narrow = width < 700
  return { scale: narrow ? 0.88 : 0.86, x: -(narrow ? 0.74 : 0.46) * width, originX: '50%' }
}

// Clips the page to what's on screen, so the shrunk card has rounded corners where the viewport
// is. `radius` is in screen pixels; the clip is drawn in the page's own, scaled-down pixels.
const clip = (shell: HTMLElement, radius: number) => {
  const top = window.scrollY
  const bottom = Math.max(0, shell.offsetHeight - top - window.innerHeight)
  const scale = Number(gsap.getProperty(shell, 'scaleX')) || 1
  return `inset(${top}px 0px ${bottom}px 0px round ${radius / scale}px)`
}

// Off-canvas navigation. The menu waits behind the page; opening it shrinks the page into a
// rounded card that slides left, and the links slide in beside it. Closing runs it all back.
export default function Menu({ open, path, onClose, shell }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  // The corner radius is tweened as a plain number and the clip path rebuilt from it each frame:
  // tweening the clip-path string itself let the browser's rewritten form throw the numbers out
  // of step, so the corners snapped square
  const corner = useRef({ radius: 0 })

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.documentElement.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // A plain effect, not a layout effect: when a menu link changes the page, this runs after the
  // new page has been scrolled to the top, so the page shrinks back from the right place
  useEffect(() => {
    const page = shell.current
    const menu = panel.current
    if (!page || !menu || open === wasOpen.current) return
    wasOpen.current = open
    const html = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const body = menu.querySelector<HTMLElement>('.menu-panel__body')!
    const links = gsap.utils.toArray<HTMLElement>(menu.querySelectorAll('.menu-link, .menu-panel__meta'))

    if (reduce) {
      gsap.to(menu, { autoAlpha: open ? 1 : 0, duration: 0.3 })
      return
    }

    const shape = corner.current
    const draw = () => { page.style.clipPath = clip(page, shape.radius) }
    const origin = (originX: string) => `${originX} ${window.scrollY + window.innerHeight / 2}px`

    if (open) {
      gsap.set(menu, { autoAlpha: 1 })
      // Measured once the panel shows, so the column has its width
      const { scale, x, originX } = layout(body)
      html.classList.remove('menu-closing')
      gsap.set(page, { transformOrigin: origin(originX) })
      draw()
      gsap.to(page, { x, scale, duration: DURATION, ease: EASE, overwrite: true })
      gsap.to(shape, { radius: RADIUS, duration: DURATION, ease: EASE, overwrite: true, onUpdate: draw })
      gsap.fromTo(links, { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.05, delay: 0.35, overwrite: true })
      return
    }

    // Closing: the scroll stays locked until the page is back at full size, so nothing shifts mid-way
    html.classList.add('menu-closing')
    gsap.set(page, { transformOrigin: origin(layout(body).originX) })
    draw()
    // The links leave first, last one first, sliding back the way they came
    gsap.to(links, { x: 40, autoAlpha: 0, duration: 0.45, ease: 'power2.in', stagger: { each: 0.035, from: 'end' }, overwrite: true })
    // The corners round off with the page's travel, reaching square only as it fills the screen
    gsap.to(shape, { radius: 0, duration: DURATION, ease: EASE, delay: 0.1, overwrite: true, onUpdate: draw })
    gsap.to(page, {
      x: 0,
      scale: 1,
      duration: DURATION,
      ease: EASE,
      delay: 0.1,
      overwrite: true,
      onComplete: () => {
        gsap.set(page, { clearProps: 'transform,transformOrigin,clipPath' })
        gsap.set(menu, { autoAlpha: 0 })
        html.classList.remove('menu-closing')
        // Positions measured while the page was shrunk are off; measure again at full size
        ScrollTrigger.refresh()
      },
    })
  }, [open, shell])

  return (
    <div
      ref={panel}
      id="site-menu"
      className="menu-panel"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
    >
      <div className="menu-panel__body">
        <nav aria-label="Main">
          <ol className="menu-panel__list">
            {nav.map((item) => (
              <li key={item.to} className="menu-link">
                <Link to={item.to} aria-current={item.to === path ? 'page' : undefined} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-panel__meta">
          <p><a href={`mailto:${chambers.email}`}>{chambers.email}</a></p>
          <p><a href={`tel:${chambers.phone.replace(/\s/g, '')}`}>{chambers.phone}</a></p>
          <p className="menu-panel__social">
            {chambers.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
