import { useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Br from './Br'
import { toHref } from '../lib/router'
import { practices } from '../data/practices'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const featured = practices.slice(0, 4)
const last = featured.length - 1

const ROLL = { duration: 0.75, ease: 'power3.inOut', overwrite: true } as const
// Lines wait well past the mask edge, so no descender or sliver of them shows
const OUT = 150
// The details crossfade: the old ones blur away together, then the new ones come into focus
// one after another, top to bottom
const BLUR = 'blur(8px)'
const SHARP = 'blur(0px)'
const FADE_OUT = { autoAlpha: 0, filter: BLUR, duration: 0.22, ease: 'power1.in' } as const
const FADE_IN = { autoAlpha: 1, filter: SHARP, duration: 0.5, ease: 'power2.out', stagger: 0.06 } as const
// The new details start while the old ones are still leaving
const FADE_GAP = 0.14
// Share of the curtain's travel the numeral inside it makes; below 1 it lags behind the edge
const ART_SPEED = 0.5
// The covered numeral drifts up this far (%) as the next panel rises over it
const DRIFT = 18

// One line per practice, stacked in place; the active one is shown (see roll() below)
function Roll({ items }: { items: ReactNode[] }) {
  return items.map((item, i) => (
    <span key={i} className="roll__item" aria-hidden={i !== 0}>{item}</span>
  ))
}

// Featured practice areas. The section pins while each next panel rises over the last like a
// curtain, its great numeral lagging behind the edge; the index's ones digit rolls up and the
// details crossfade to match.
export default function Practice() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const practice = featured[active]

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      // The first practice is simply there, with no entrance; only moving between them animates
      const slides = q('.proj__slide')
      const arts = q('.practice__numeral')
      // Only the counter rolls; every other detail crossfades
      const rolls = q('.roll:not(.fade)')
      const fades = q('.roll.fade')
      let shown = 0

      rolls.forEach((roll) => gsap.set(Array.from(roll.children).slice(1), { yPercent: OUT }))
      fades.forEach((fade) => gsap.set(Array.from(fade.children).slice(1), { autoAlpha: 0, filter: BLUR }))

      let fade: gsap.core.Timeline | null = null

      // Rolls every detail from practice `prev` to `next`, upward when moving forward
      const roll = (next: number, prev: number) => {
        const dir = next > prev ? 1 : -1
        rolls.forEach((el, k) => {
          Array.from(el.children).forEach((item, j) => {
            item.setAttribute('aria-hidden', String(j !== next))
            if (j === next) gsap.fromTo(item, { yPercent: OUT * dir }, { ...ROLL, yPercent: 0, delay: k * 0.04 })
            else if (j === prev) gsap.to(item, { ...ROLL, yPercent: -OUT * dir, delay: k * 0.04 })
            else gsap.set(item, { yPercent: j < next ? -OUT : OUT, overwrite: true })
          })
        })
        // Name, forum, summary, lead: in reading order, so they settle top to bottom
        const leaving: Element[] = []
        const arriving: Element[] = []
        fades.forEach((el) => {
          Array.from(el.children).forEach((item, j) => {
            item.setAttribute('aria-hidden', String(j !== next))
            if (j === next) arriving.push(item)
            else leaving.push(item)
          })
        })
        fade?.kill()
        fade = gsap.timeline()
          .to(leaving, { ...FADE_OUT, overwrite: true })
          .fromTo(arriving, { autoAlpha: 0, filter: BLUR }, { ...FADE_IN, immediateRender: false }, FADE_GAP)
      }

      const curtain = gsap.timeline({ defaults: { ease: 'none', duration: 1 } })
      for (let i = 1; i <= last; i++) {
        curtain
          .fromTo(slides[i], { yPercent: 100 }, { yPercent: 0 }, i - 1)
          .fromTo(arts[i], { yPercent: -100 * ART_SPEED }, { yPercent: 0 }, i - 1)
          .to(arts[i - 1], { yPercent: -DRIFT }, i - 1)
      }

      ScrollTrigger.create({
        trigger: root.current,
        pin: true,
        // Pinned by transform rather than position: fixed, so it stays inside the page when the menu shrinks it
        pinType: 'transform',
        // Pins a frame early, so a fast swipe doesn't overshoot and jump back
        anticipatePin: 1,
        start: 'top top',
        end: () => `+=${last * window.innerHeight}`,
        scrub: true,
        animation: curtain,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.round(self.progress * last)
          if (next === shown) return
          roll(next, shown)
          shown = next
          setActive(next)
        },
      })

      return () => setActive(0)
    })
  }, { scope: root })

  return (
    // The pin wraps the section: pinning the zoomed artboard itself would scale its fixed size twice
    <div ref={root} className="proj-pin">
      <section className="page page--dark proj practice">
        <div className="proj__slides">
          {featured.map((item, i) => (
            <div key={item.slug} className={`proj__slide practice__slide practice__slide--${i}`}>
              <span className="practice__numeral" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <div className="page__stage">
          <span className="tag tag--light practice__tag">Practice</span>
          {/* Only the ones digit rolls; the tens stay put */}
          <span className="proj__index">
            0<span className="roll"><Roll items={featured.map((_, i) => String(i + 1))} /></span>
          </span>
          <h2 className="proj__name roll fade"><Roll items={featured.map((p) => p.name)} /></h2>
          <p className="proj__meta roll fade"><Roll items={featured.map((p) => <span className="proj__kind">{p.forum}</span>)} /></p>
          {/* Stays still; only where it leads changes */}
          <a className="proj__link" href={toHref(`/practice/${practice.slug}`)}>View practice</a>
          <div className="proj__quote">
            <p className="practice__desc roll fade">
              <Roll items={featured.map((p) => <>{p.desc[0]}<Br />{p.desc[1]}</>)} />
            </p>
            <p className="proj__author roll fade"><Roll items={featured.map((p) => p.lead)} /></p>
            <p className="proj__role">Lead advocate</p>
          </div>
        </div>
      </section>
    </div>
  )
}
