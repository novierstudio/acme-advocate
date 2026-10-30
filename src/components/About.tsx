import { motion } from 'motion/react'
import ArrowButton from './ArrowButton'
import Br from './Br'
import Signature from './Signature'
import { reveal, split } from '../lib/reveal'
import { chambers } from '../data/site'
import { team } from '../data/team'

export default function About() {
  return (
    <section className="page about">
      <h2 className="about__title" {...split(0)}>One Chamber<Br />Every Record</h2>
      <div className="about__body">
        <motion.span className="tag" {...reveal(1)}>The chambers</motion.span>
        <p className="about__text" {...split(2)}>
          At {chambers.name}, a small team of advocates works on land and property<Br />
          in Gujarat. The advocate who reads your records is the one who drafts the<Br />
          deed, appears at the hearing and answers your call — so nothing is lost<Br />
          between the first question and the final order.
        </p>
        <ArrowButton to="/about" variant="dark" {...reveal(3)}>About the chambers</ArrowButton>
      </div>
      {/* Revealed on scroll by GSAP (see useScrollEffects) */}
      <div className="team">
        {team.map((person, i) => (
          // On hover the monogram shrinks into the top-left corner, their title and a line about
          // them rise in at the foot of the card and their signature is traced out beside it (index.css)
          <div key={person.name} className="team__card" tabIndex={0} aria-label={`${person.name}, ${person.role}`}>
            <div className="monogram" aria-hidden="true">
              <span className="monogram__initials">{person.initials}</span>
              <span className="monogram__name">{person.name}</span>
            </div>
            <div className="team__sign"><Signature index={i} /></div>
            <div className="team__info">
              <p className="team__title">{person.title}</p>
              <p className="team__line">{person.line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
