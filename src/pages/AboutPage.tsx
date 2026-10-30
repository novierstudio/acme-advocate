import { motion } from 'motion/react'
import PageIntro from '../components/PageIntro'
import Br from '../components/Br'
import CourtArt from '../components/CourtArt'
import { reveal, split } from '../lib/reveal'
import { chambers } from '../data/site'
import { team } from '../data/team'

const habits = [
  { name: 'Records first', text: 'Before any opinion, we read the extracts, the entries and the deeds behind them — every one, in order.' },
  { name: 'Plain answers', text: 'You will hear what the documents say, what they don’t, and what we would do in your place, without the jargon.' },
  { name: 'One advocate', text: 'The advocate who takes your matter on stays with it, from the first meeting to the last hearing.' },
  { name: 'Nothing promised', text: 'We tell you the stages, the risks and the likely time, and we never promise a result no one can promise.' },
]

// Facts about the chambers, not claims about outcomes
const stats = [
  { value: '2011', label: 'Practising since' },
  { value: '04', label: 'Advocates in chambers' },
  { value: '03', label: 'Languages — Gujarati, Hindi, English' },
  { value: '05', label: 'Areas of practice' },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        tag="About"
        title={<>One chamber,<Br />every record</>}
        lede={`${chambers.name} is a practice of advocates in Ahmedabad working on land and property across Gujarat — title and due diligence, transactions, revenue and NA matters, succession, and the litigation that sometimes follows.`}
      />

      <section className="page page--dark band">
        <div className="page__bg band__art"><CourtArt /></div>
        <div className="page__stage">
          <p className="band__quote" {...split(0)}>“Read the record before<Br />you argue the case.”</p>
          <p className="band__caption" {...split(1)}>The first rule of the chambers</p>
        </div>
      </section>

      <section className="sheet habits">
        <motion.span className="tag" {...reveal(0)}>Approach</motion.span>
        <h2 className="section-title" {...split(1)}>Four habits we bring<Br />to every matter</h2>
        <ol className="habits__grid">
          {habits.map((habit, i) => (
            <motion.li key={habit.name} className="habit" {...reveal(i, 20)}>
              <span className="habit__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="habit__name">{habit.name}</h3>
              <p className="habit__text">{habit.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="sheet stats">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} className="stat" {...reveal(i, 20)}>
            <p className="stat__value">{stat.value}</p>
            <p className="stat__label">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="sheet people">
        <div className="people__head">
          <motion.span className="tag" {...reveal(0)}>Advocates</motion.span>
          <h2 className="section-title" {...split(1)}>A small bench,<Br />run as one chamber</h2>
        </div>
        {/* Cards are revealed on scroll by GSAP (see useScrollEffects) */}
        <div className="team people__grid">
          {team.map((person) => (
            <figure key={person.name} className="person">
              <div className="team__card">
                <div className="monogram" aria-hidden="true">
                  <span className="monogram__initials">{person.initials}</span>
                  <span className="monogram__name">{person.name}</span>
                </div>
              </div>
              <figcaption>
                <p className="person__name">{person.name}</p>
                <p className="person__role">{person.role} · Enrolled {person.enrolled}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
