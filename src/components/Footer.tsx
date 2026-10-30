import Br from './Br'
import CourtArt from './CourtArt'
import { split } from '../lib/reveal'
import { Link } from '../lib/router'
import { nav, chambers } from '../data/site'
import { practices } from '../data/practices'

// The call to action closing every page: the courthouse in hairlines on black, with a light card
// in its lower right holding one line and the way in. The whole card links to the contact page.
function Cta() {
  return (
    <section className="sheet cta">
      {/* Drifts slower than the page, like the hero's (useScrollEffects) */}
      <div className="page__bg cta__art"><CourtArt /></div>
      <Link className="cta__card" to="/contact">
        {/* "talk it through" is underlined as the link cue */}
        <h2 className="cta__title" {...split(0)}>If a property question is<Br />keeping you up, <span className="cta__talk">let’s talk it through</span>.</h2>
      </Link>
    </section>
  )
}

const mark = chambers.mark.toUpperCase()
// "ACME" fills the column at full size; longer names shrink to keep roughly its proportions
const markScale = Math.min(1, 5 / mark.length)

// `cta` is off on the contact page, which is already the call to action
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <>
      {cta && <Cta />}
      {/* Three columns: the wordmark over the practice list, the pages in large type, and the
          chambers' line, details and the standing disclaimer */}
      <footer className="sheet footer">
        <div className="footer__brand">
          <p className="footer__label">Practice</p>
          <ul className="footer__practice">
            {practices.map((p) => <li key={p.slug}><Link to={`/practice/${p.slug}`}>{p.name}</Link></li>)}
          </ul>
          {/* textLength stretches the wordmark to exactly the column's width; a longer name is set
              smaller (and the box made shorter) so its letters aren't squeezed */}
          <svg className="footer__mark" viewBox={`0 0 1000 ${300 * markScale}`} aria-label={chambers.name} role="img">
            <text x="0" y={292 * markScale} fontSize={330 * markScale} textLength="1000" lengthAdjust="spacingAndGlyphs">{mark}</text>
          </svg>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <p className="footer__label">Navigation</p>
          <ul>
            {nav.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}
          </ul>
        </nav>
        <div className="footer__about">
          <p className="footer__label">Chambers</p>
          <p className="footer__statement">
            Advocates for land and property in Gujarat — title, transactions, revenue matters and the litigation that
            follows them, handled by the same small team from start to finish.
          </p>
          <p className="footer__label footer__label--gap">Info</p>
          <div className="footer__info">
            <p>{chambers.address.join(', ')}</p>
            <p><a href={`mailto:${chambers.email}`}>{chambers.email}</a></p>
            <p><a href={`tel:${chambers.phone.replace(/\s/g, '')}`}>{chambers.phone}</a></p>
            <p className="footer__social">{chambers.social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</p>
          </div>
          <p className="footer__legal">
            In keeping with the Bar Council of India’s rules, this website is for information only and is not an
            advertisement or solicitation. Nothing here is legal advice, and using it creates no advocate–client relationship.
          </p>
        </div>
      </footer>
    </>
  )
}
