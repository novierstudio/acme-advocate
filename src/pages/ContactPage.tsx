import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import Br from '../components/Br'
import { ArrowIcon } from '../components/ArrowButton'
import { reveal, split } from '../lib/reveal'
import { chambers } from '../data/site'
import { practices } from '../data/practices'

const types = [...practices.map((p) => p.short), 'Other']

// There's no backend, so sending opens the visitor's email app with the enquiry filled in.
function composeMail(form: HTMLFormElement) {
  const data = new FormData(form)
  const field = (name: string) => String(data.get(name) ?? '').trim()
  const body = [
    `Name: ${field('name')}`,
    `Email: ${field('email')}`,
    field('phone') && `Phone: ${field('phone')}`,
    `Matter: ${field('type')}`,
    field('location') && `Land / property: ${field('location')}`,
    '',
    field('message'),
  ].filter((line) => line !== '').join('\n')
  const subject = `Enquiry — ${field('type')} — ${field('name')}`
  return `mailto:${chambers.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = composeMail(event.currentTarget)
    setSent(true)
  }

  return (
    <section className="sheet contact">
      <div className="contact__info">
        <motion.span className="tag" {...reveal(0)}>Contact</motion.span>
        <h1 className="intro__title contact__title" {...split(1)}>Tell us about<Br />your matter</h1>
        <motion.dl className="contact__details" {...reveal(2)}>
          <div>
            <dt className="label">Email</dt>
            <dd><a href={`mailto:${chambers.email}`}>{chambers.email}</a></dd>
          </div>
          <div>
            <dt className="label">Phone</dt>
            <dd><a href={`tel:${chambers.phone.replace(/\s/g, '')}`}>{chambers.phone}</a></dd>
          </div>
          <div>
            <dt className="label">Chambers</dt>
            <dd>{chambers.address.map((line) => <span key={line}>{line}</span>)}</dd>
          </div>
          <div>
            <dt className="label">Hours</dt>
            <dd>{chambers.hours}</dd>
          </div>
        </motion.dl>
      </div>

      <motion.form className="form" onSubmit={submit} {...reveal(2)}>
        <fieldset className="form__types">
          <legend className="label">Kind of matter</legend>
          <div className="filters__chips">
            {types.map((type, i) => (
              <label key={type} className="chip chip--radio">
                <input type="radio" name="type" value={type} defaultChecked={i === 0} />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span className="label">Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className="field">
          <span className="label">Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span className="label">Phone <em>(optional)</em></span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field">
          <span className="label">Village / survey no. <em>(optional)</em></span>
          <input name="location" />
        </label>
        <label className="field field--wide">
          <span className="label">What has happened</span>
          <textarea name="message" rows={4} required />
        </label>
        <div className="form__foot">
          <button type="submit" className="btn btn--dark">Send enquiry <ArrowIcon /></button>
          <p className="form__note" role="status">
            {sent
              ? 'Your email app should open with the enquiry ready to send.'
              : 'Please don’t send confidential documents yet. An enquiry doesn’t make us your advocates until we confirm in writing.'}
          </p>
        </div>
      </motion.form>
    </section>
  )
}
