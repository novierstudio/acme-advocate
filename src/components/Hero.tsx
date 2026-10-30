import ArrowButton from './ArrowButton'
import Br from './Br'
import Signature from './Signature'
import { rise, split } from '../lib/reveal'
import { Link } from '../lib/router'

// An illustrative mutation register (Village Form 6) for a made-up parcel: the chain the chambers
// reads before advising, oldest entry first. The last entry is the one being worked on now.
const entries = [
  { no: '1184', date: '12.03.1979', nature: 'Sale', note: 'Registered deed no. 642', status: 'Certified' },
  { no: '2017', date: '04.08.1996', nature: 'Varsai', note: 'Heirs of the occupant entered', status: 'Certified' },
  { no: '3341', date: '19.11.2008', nature: 'Tenure', note: 'New to old tenure, premium paid', status: 'Certified' },
  { no: '4702', date: '27.06.2026', nature: 'Sale', note: 'Agreement checked, deed drafted', status: 'In hand' },
]

const facts = [
  { label: 'Practising since', value: '2011' },
  { label: 'Languages', value: 'Gujarati · Hindi · English' },
  { label: 'Chambers', value: 'Ahmedabad, across Gujarat' },
]

// The landing screen: the headline and the way in on the left; on the right, the register the
// headline is about. Its rows rise in one after another, a pen ring is drawn round the entry in
// hand and the reviewing advocate's signature is traced at its foot (useScrollEffects).
export default function Hero() {
  return (
    <section className="page hero">
      <div className="page__stage">
        <span className="tag hero__tag" {...rise(0, 0)}>Advocates · Ahmedabad</span>
        <h1 className="hero__title" {...split(0, 0.1)}>
          Land and property law,<Br />read line by line.
        </h1>
        {/* Wider line gap than the default, so each line of the subheadline visibly follows the last */}
        <p className="hero__lede" {...split(0, 0.5, 0.15)}>
          Title, transactions, revenue matters and litigation<Br />across Gujarat — every entry read before we advise.
        </p>
        <div className="hero__actions" {...rise(0, 0.8)}>
          <ArrowButton to="/contact" variant="dark">Talk to an advocate</ArrowButton>
          <Link className="hero__link" to="/practice">See the practice</Link>
        </div>

        <figure className="ledger" aria-label="Illustration: a mutation register read entry by entry" {...rise(0, 0.2)}>
          <figcaption className="ledger__head">
            <span className="label">Village Form 6 · Mutation entries</span>
            <span className="label">Survey 214/2 · Bopal</span>
          </figcaption>
          <div className="ledger__cols label" aria-hidden="true">
            <span>Entry</span><span>Date</span><span>Nature</span><span>Status</span>
          </div>
          <ol className="ledger__rows">
            {entries.map((entry, i) => (
              <li key={entry.no} className={`ledger__row${i === entries.length - 1 ? ' is-current' : ''}`} {...rise(0, 0.5 + i * 0.18)}>
                <span className="ledger__no">
                  {entry.no}
                  {/* A ring drawn round the entry being worked on */}
                  {i === entries.length - 1 && (
                    <svg className="ledger__ring" viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                      <path pathLength="1" d="M70 6C40 2 8 12 6 30C4 50 46 58 78 54C106 50 118 38 112 22C106 8 78 4 52 8" />
                    </svg>
                  )}
                </span>
                <span className="ledger__date">{entry.date}</span>
                <span className="ledger__nature">
                  <span>{entry.nature}</span>
                  <span className="ledger__note">{entry.note}</span>
                </span>
                <span className="ledger__status">{entry.status}</span>
              </li>
            ))}
          </ol>
          <div className="ledger__foot">
            <span className="label">Chain read 1979 → 2026</span>
            <span className="ledger__sign"><Signature index={0} /></span>
          </div>
        </figure>

        <dl className="hero__facts" {...rise(0, 1)}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
