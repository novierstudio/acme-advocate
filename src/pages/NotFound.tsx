import { motion } from 'motion/react'
import ArrowButton from '../components/ArrowButton'
import Br from '../components/Br'
import { reveal, split } from '../lib/reveal'

export default function NotFound() {
  return (
    <section className="sheet missing">
      <motion.span className="tag" {...reveal(0)}>404</motion.span>
      <h1 className="intro__title" {...split(1)}>This page is not<Br />on the record</h1>
      <ArrowButton to="/" variant="dark" {...reveal(2)}>Back to home</ArrowButton>
    </section>
  )
}
