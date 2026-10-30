import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import CourtArt from '../components/CourtArt'
import { NoteArrow } from '../components/Notes'
import { reveal, split } from '../lib/reveal'
import { Link } from '../lib/router'
import { practices, type Practice } from '../data/practices'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function PracticeDetail({ practice }: { practice: Practice }) {
  const index = practices.indexOf(practice)
  const next = practices[(index + 1) % practices.length]
  const [open, setOpen] = useState(-1)
  const facts = [
    ['Forum', practice.forum.split(' · ')[0]],
    ['Lead', practice.lead],
    ['Languages', 'Gujarati, Hindi, English'],
    ['First meeting', 'In chambers or online'],
  ]

  return (
    <>
      <section className="page page--dark detail-hero">
        <div className="page__bg hero__art"><CourtArt /></div>
        <div className="page__stage">
          <motion.span className="proj__index" {...reveal(0)}>{String(index + 1).padStart(2, '0')}</motion.span>
          <h1 className="proj__name" {...split(1)}>{practice.name}</h1>
          <p className="proj__type" {...split(2)}>{practice.forum}</p>
          <motion.dl className="facts" {...reveal(2)}>
            {facts.map(([label, value]) => (
              <div key={label} className="facts__item">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section className="sheet overview">
        <motion.span className="tag overview__tag" {...reveal(0)}>Overview</motion.span>
        <h2 className="overview__statement" {...split(1)}>{practice.statement}</h2>
        <div className="overview__body">
          {practice.body.map((paragraph, i) => <p key={paragraph} {...split(2 + i)}>{paragraph}</p>)}
          <motion.p className="label" {...reveal(3)}>We handle</motion.p>
          <motion.ul className="overview__scope" {...reveal(4)}>
            {practice.handles.map((item) => <li key={item} className="tag">{item}</li>)}
          </motion.ul>
        </div>
      </section>

      <section className="sheet bring">
        <div>
          <motion.span className="tag" {...reveal(0)}>First meeting</motion.span>
          <h2 className="section-title" {...split(1)}>What to bring</h2>
        </div>
        <ol className="bring__list">
          {practice.documents.map((doc, i) => (
            <motion.li key={doc} className="bring__item" {...reveal(i, 16)}>
              <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
              <span>{doc}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="sheet faq">
        <div>
          <motion.span className="tag" {...reveal(0)}>Questions</motion.span>
          <h2 className="section-title" {...split(1)}>Often asked</h2>
        </div>
        <ul className="faq__list">
          {practice.faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <li key={faq.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" className="faq__row" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{faq.q}</span>
                    <span className="svc__toggle" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className="svc__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                      <p className="faq__answer">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </section>

      <Link className="sheet next" to={`/practice/${next.slug}`}>
        <span className="label">Next practice</span>
        <span className="next__name">{next.name}</span>
        <NoteArrow />
      </Link>
    </>
  )
}
