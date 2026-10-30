import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { chambers } from '../data/site'

type Props = {
  // Called while the curtain fully covers the screen, to mount the page beneath it
  onCover: () => void
  // Called once the curtain has fully lifted
  onLift: () => void
}

const EASE = 'power4.inOut'
const LIFT = 1.1
const STAGGER = 0.16

const WORD = chambers.mark.toUpperCase()

// The count as shown: at least two digits, 00 to 100
const label = (value: number) => String(Math.round(value)).padStart(2, '0')

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fonts, so the first page never paints half-loaded. Capped so a slow network can't hold the
// curtain down forever.
function assetsReady() {
  return Promise.race([
    Promise.all([document.fonts.ready, document.fonts.load('1em Lora')]),
    wait(5000),
  ])
}

// The intro, played once when the home page loads: a black panel with a light layer behind it.
// The dim wordmark fills with white, then the panel lifts and the light layer follows a beat
// later, uncovering the page.
export default function Curtain({ onCover, onLift }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {})
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const html = document.documentElement
    let cancelled = false
    html.classList.add('is-loading')

    const run = async () => {
      const el = root.current!
      const q = gsap.utils.selector(el)
      const [fill, count, track, bar] = [q('.curtain__fill'), q('.curtain__count'), q('.curtain__track'), q('.curtain__bar')]
      const loaded = assetsReady()
      await Promise.race([document.fonts.load('600 1em "DM Sans"'), wait(1500)])
      if (cancelled) return

      const progress = { value: 0 }
      let span = 0

      // A hairline across the foot fills left to right, and the count rides just above its leading
      // edge; the label's right edge follows the line's tip, held back at the start so it stays on screen
      const draw = (value: number) => {
        bar[0].style.transform = `scaleX(${value / 100})`
        count[0].textContent = label(value)
        gsap.set(count, { x: Math.max(0, (value / 100) * span - count[0].offsetWidth) })
      }

      const filled = reduce ? null : ctx.add(() =>
        gsap.timeline()
          .to([count, track], { autoAlpha: 1, duration: 0.3 })
          .to(progress, {
            value: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onStart: () => { span = track[0].clientWidth },
            onUpdate: () => {
              gsap.set(fill, { clipPath: `inset(0% ${100 - progress.value}% 0% 0%)` })
              draw(progress.value)
            },
          }, '<')
          // Holds on 100 for a beat before fading
          .to([count, track], { autoAlpha: 0, duration: 0.3, delay: 0.35 }),
      )
      await Promise.all([loaded, filled])
      if (cancelled) return

      onCover()
      await nextFrame()
      await ctx.add(() =>
        reduce
          ? gsap.to(el, { autoAlpha: 0, duration: 0.4 })
          : gsap.timeline()
            .to(q('.curtain__front'), { yPercent: -100, duration: LIFT, ease: EASE })
            .to(q('.curtain__word'), { yPercent: -60, duration: LIFT, ease: EASE }, '<')
            .to(q('.curtain__back'), { yPercent: -100, duration: LIFT, ease: EASE }, `<${STAGGER}`),
      )
      gsap.set(el, { visibility: 'hidden' })
      html.classList.remove('is-loading')
      onLift()
    }
    run()

    return () => {
      cancelled = true
      ctx.revert()
      html.classList.remove('is-loading')
    }
    // Runs once per load; the callbacks only flip flags in App
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={root} className="curtain" aria-hidden="true">
      <div className="curtain__layer curtain__back" />
      <div className="curtain__layer curtain__front">
        <div className="curtain__word" style={{ '--chars': Math.max(4, WORD.length) } as CSSProperties}>
          {['curtain__muted', 'curtain__fill'].map((layer) => (
            <span key={layer} className={layer}>
              {WORD}
            </span>
          ))}
        </div>
        <div className="curtain__foot">
          <span className="curtain__count">00</span>
          <span className="curtain__track"><span className="curtain__bar" /></span>
        </div>
      </div>
    </div>
  )
}
