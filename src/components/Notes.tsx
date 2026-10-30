import { motion } from 'motion/react'
import ArrowButton from './ArrowButton'
import { reveal, split } from '../lib/reveal'
import { Link } from '../lib/router'
import { insights } from '../data/insights'

export function NoteArrow() {
  return (
    <svg className="service__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h18M13 4l8 8-8 8" />
    </svg>
  )
}

// The latest three notes on the home page: tall typographic cards on the mist band
export default function Notes() {
  return (
    <section className="sheet notes">
      <div className="notes__head">
        <div>
          <motion.span className="tag" {...reveal(0)}>Insights</motion.span>
          <h2 className="section-title" {...split(1)}>Notes from chambers</h2>
        </div>
        <ArrowButton to="/insights" variant="dark" {...reveal(2)}>All insights</ArrowButton>
      </div>
      <ul className="notes__grid">
        {insights.slice(0, 3).map((note, i) => (
          <motion.li key={note.slug} {...reveal(i, 30)}>
            <Link className="note" to={`/insights/${note.slug}`}>
              <div className="note__top">
                <span className="label">{note.category}</span>
                <NoteArrow />
              </div>
              <h3 className="note__title">{note.title}</h3>
              <p className="note__excerpt">{note.excerpt}</p>
              <p className="note__meta">{note.date} · {note.read} read</p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
