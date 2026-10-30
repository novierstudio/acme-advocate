import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { toHref } from '../lib/router'

type Props = HTMLMotionProps<'a'> & {
  // A route path ("/contact"); pass `href` instead for mailto: and external links
  to?: string
  variant: 'dark' | 'light'
  children: ReactNode
}

export function ArrowIcon() {
  return (
    // Two copies: on hover the first slides out to the right while the second enters from the left
    <span className="btn__icon">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12h18M13 4l8 8-8 8" />
        </svg>
      ))}
    </span>
  )
}

export default function ArrowButton({ to, href, variant, className, children, ...motionProps }: Props) {
  return (
    <motion.a className={`btn btn--${variant}${className ? ` ${className}` : ''}`} href={to ? toHref(to) : href} {...motionProps}>
      {children}
      <ArrowIcon />
    </motion.a>
  )
}
