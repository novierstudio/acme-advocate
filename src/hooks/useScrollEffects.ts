import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { introDone } from '../lib/intro'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// The art layer overhangs its section by 8% top and bottom (see .page__bg),
// so it can travel ±6% of its own height without exposing an edge.
const PARALLAX_TRAVEL = 6

// Headings and copy (marked with split() from lib/reveal) rise line by line out of masks
const LINE_STAGGER = 0.08
const LINE_DURATION = 0.75
// Lines start a little below their mask, which is padded to keep descenders clear
const LINE_FROM = 115

const clipFrom = { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power3.out', clearProps: 'clipPath' }

// Scroll-linked effects, rebuilt for each page (`page` is the route on screen). Art layers scroll
// slower than the page (parallax); the courthouse hairlines are traced in; advocate cards wipe up
// into view; headings and copy rise in line by line.
export function useScrollEffects(scope: RefObject<HTMLElement | null>, page: string | null) {
  useGSAP(() => {
    // Nothing is mounted until the intro curtain has loaded the first page
    if (!page || !scope.current) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Entrances are held paused until their element scrolls into view and the intro (curtain and
      // disclaimer) has finished, so nothing plays out of sight beneath it
      // An explicit data-delay (seconds) wins over the stagger from the element's order
      const delayOf = (el: HTMLElement, order: string | undefined) =>
        el.dataset.delay ? Number(el.dataset.delay) : Number(order) * 0.09

      // Anything already on screen when the page opens plays at once, however close to the bottom edge
      const playOnEnter = (el: Element) => ({
        trigger: el,
        start: el.getBoundingClientRect().top < window.innerHeight ? 'top bottom' : 'top 90%',
        once: true,
        toggleActions: 'none none none none',
        onEnter: (self: ScrollTrigger) => { introDone.then(() => self.animation?.play()) },
      })

      // The courthouse is drawn line by line: the outline first, the columns rising after it
      gsap.utils.toArray<SVGSVGElement>(document.querySelectorAll('.shell .court')).forEach((court) => {
        gsap.fromTo(court.querySelectorAll('path'), { strokeDashoffset: 1 }, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
          stagger: 0.035,
          scrollTrigger: playOnEnter(court),
        })
      })

      // The hero's register: a pen ring round the entry in hand, then the reviewing signature,
      // once its rows have risen in
      gsap.utils.toArray<SVGPathElement>(document.querySelectorAll('.ledger__ring path, .ledger__sign path')).forEach((path, i) => {
        gsap.fromTo(path, { strokeDashoffset: 1 }, {
          strokeDashoffset: 0,
          duration: i === 0 ? 0.9 : 1.5,
          ease: 'power2.inOut',
          delay: 1.5 + i * 0.8,
          scrollTrigger: playOnEnter(path),
        })
      })

      gsap.utils.toArray<HTMLElement>(document.querySelectorAll('.shell .page__bg')).forEach((bg) => {
        gsap.fromTo(bg, { yPercent: -PARALLAX_TRAVEL }, {
          yPercent: PARALLAX_TRAVEL,
          ease: 'none',
          scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.team').forEach((team) => {
        gsap.from(team.querySelectorAll('.team__card'), {
          ...clipFrom,
          stagger: 0.12,
          scrollTrigger: { trigger: team, start: 'top 85%', once: true },
        })
      })

      document.querySelectorAll<HTMLElement>('main [data-rise]').forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 28, duration: 0.9, ease: 'power3.out', delay: delayOf(el, el.dataset.rise), scrollTrigger: playOnEnter(el) })
      })

      // The closing CTA and footer sit outside `scope` but are re-split along with each page
      document.querySelectorAll<HTMLElement>('.shell [data-split]').forEach((el) => {
        const delay = delayOf(el, el.dataset.split)
        let played = false
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          // Re-splits when the width or fonts change; once played, the new lines just stay put
          autoSplit: true,
          onSplit: (self) => {
            if (played) return
            return gsap.from(self.lines, {
              yPercent: LINE_FROM,
              duration: LINE_DURATION,
              ease: 'power4.out',
              stagger: el.dataset.stagger ? Number(el.dataset.stagger) : LINE_STAGGER,
              delay,
              scrollTrigger: playOnEnter(el),
              onStart: () => { played = true },
            })
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.js-clip').forEach((block) => {
        gsap.from(block, { ...clipFrom, scrollTrigger: { trigger: block, start: 'top 85%', once: true } })
      })
    })
  }, { scope, dependencies: [page], revertOnUpdate: true })
}
