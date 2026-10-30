import type { MotionProps } from 'motion/react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Fade-and-rise entrance, played once when the element scrolls into view.
// `order` staggers siblings; the end state is the untouched layout.
export function reveal(order = 0, distance = 28): MotionProps {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.9, delay: order * 0.09, ease: EASE_OUT },
  }
}

// Marks a heading or block of copy for the line-by-line reveal: each line rises out of its own
// mask, like the rolling practice details (see useScrollEffects). `order` delays it behind siblings;
// `delay` (seconds) replaces that, to sequence a group one after another; `stagger` overrides the
// gap between its lines.
export function split(order = 0, delay?: number, stagger?: number) {
  return { 'data-split': order, 'data-delay': delay, 'data-stagger': stagger }
}

// A fade-and-rise played by GSAP rather than Motion, so it can wait for the intro curtain
// (see useScrollEffects). For elements that are on screen when the home page first loads.
export function rise(order = 0, delay?: number) {
  return { 'data-rise': order, 'data-delay': delay }
}
