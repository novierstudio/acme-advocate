import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowIcon } from './ArrowButton'

const KEY = 'acme-chambers-disclaimer'
const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Agreement lasts for the browser session, so a returning visitor sees the notice again
export const disclaimerAccepted = () => {
  try { return sessionStorage.getItem(KEY) === 'yes' } catch { return false }
}

// Back where the visitor came from, if that was another site; otherwise a search page
const leaveTo = () => {
  const from = document.referrer
  return from && !from.startsWith(window.location.origin) ? from : 'https://www.google.com/'
}

// The Bar Council of India's rules bar advocates from soliciting work or advertising, so the site
// opens behind this notice and only shows itself once the visitor confirms they came looking.
export default function Disclaimer({ onAgree }: { onAgree: () => void }) {
  const agree = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('disclaimer-open')
    agree.current?.focus({ preventScroll: true })
    return () => html.classList.remove('disclaimer-open')
  }, [])

  const accept = () => {
    try { sessionStorage.setItem(KEY, 'yes') } catch { /* private mode: ask again next time */ }
    onAgree()
  }

  return (
    <motion.div
      className="disclaimer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="disclaimer__card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <span className="tag">Disclaimer</span>
        <h2 id="disclaimer-title" className="disclaimer__title">Before you continue</h2>
        <p className="disclaimer__text">
          The Bar Council of India does not permit advocates to solicit work or advertise. By choosing
          “I agree”, you acknowledge that:
        </p>
        <ol className="disclaimer__list">
          <li>there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort from us or any of our members to solicit work through this website;</li>
          <li>you wish to know more about us for your own information and use;</li>
          <li>the information here is provided at your request, is not legal advice, and using this site does not create an advocate–client relationship.</li>
        </ol>
        <div className="disclaimer__foot">
          <button ref={agree} type="button" className="btn btn--dark" onClick={accept}>I agree <ArrowIcon /></button>
          <a className="disclaimer__leave" href={leaveTo()}>Leave the site</a>
        </div>
      </motion.div>
    </motion.div>
  )
}
