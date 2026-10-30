import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PageIntro from '../components/PageIntro'
import Br from '../components/Br'
import ArrowButton from '../components/ArrowButton'
import { reveal, split } from '../lib/reveal'
import { practices } from '../data/practices'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const steps = [
  { name: 'First meeting', text: 'You tell us what happened and what you need. Bring whatever papers you have.' },
  { name: 'Records', text: 'We collect and read the revenue records, deeds and orders that bear on it.' },
  { name: 'Advice', text: 'A written note: where you stand, the options, the risks and the likely time.' },
  { name: 'Action', text: 'Drafting, filing, registration or hearings — by the advocate who advised you.' },
  { name: 'Closure', text: 'Certified entries, registered documents or an order, and a file you can keep.' },
]

export default function PracticePage() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageIntro
        tag="Practice"
        title={<>From the record<Br />to the courtroom</>}
        lede="Five areas of work, all of them about land and property. Most matters touch more than one — a title search leads to a sale deed, an inheritance to a varsai entry — so one team carries it through."
      />

      <section className="sheet svc">
        <ol className="svc__list">
          {practices.map((practice, i) => {
            const isOpen = open === i
            return (
              <motion.li key={practice.slug} className={`svc__item${isOpen ? ' is-open' : ''}`} {...reveal(i, 20)}>
                <h2>
                  <button
                    type="button"
                    className="svc__row"
                    aria-expanded={isOpen}
                    aria-controls={`practice-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="service__index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="service__name">{practice.name}</span>
                    <span className="service__desc">{practice.desc[0]}<Br />{practice.desc[1]}</span>
                    <span className="svc__toggle" aria-hidden="true" />
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`practice-${i}`}
                      className="svc__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                    >
                      <div className="svc__detail">
                        <div className="svc__text">
                          <p>{practice.body[0]}</p>
                          <ArrowButton to={`/practice/${practice.slug}`} variant="dark">Read more</ArrowButton>
                        </div>
                        <div>
                          <p className="label">We handle</p>
                          <ul className="svc__deliverables">
                            {practice.handles.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ol>
      </section>

      <section className="sheet process">
        <motion.span className="tag" {...reveal(0)}>Process</motion.span>
        <h2 className="section-title" {...split(1)}>How a matter<Br />moves through chambers</h2>
        <ol className="process__steps">
          {steps.map((step, i) => (
            <motion.li key={step.name} className="step" {...reveal(i, 20)}>
              <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="step__name">{step.name}</h3>
              <p className="step__text">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>
    </>
  )
}
