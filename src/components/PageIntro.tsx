import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { reveal, split } from '../lib/reveal'

type Props = {
  tag: string
  title: ReactNode
  lede: ReactNode
  children?: ReactNode
}

// Opening block of every inner page: tag, large serif title, and a lede in the right-hand column
// (the same column the home page's About text sits in).
export default function PageIntro({ tag, title, lede, children }: Props) {
  return (
    <section className="sheet intro">
      <motion.span className="tag intro__tag" {...reveal(0)}>{tag}</motion.span>
      <h1 className="intro__title" {...split(1)}>{title}</h1>
      <div className="intro__side">
        <p className="intro__lede" {...split(2)}>{lede}</p>
      </div>
      {children}
    </section>
  )
}
