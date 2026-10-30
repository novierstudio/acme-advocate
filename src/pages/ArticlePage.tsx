import { motion } from 'motion/react'
import { NoteArrow } from '../components/Notes'
import { reveal, split } from '../lib/reveal'
import { Link } from '../lib/router'
import { insights, type Insight } from '../data/insights'

export default function ArticlePage({ insight }: { insight: Insight }) {
  const index = insights.indexOf(insight)
  const next = insights[(index + 1) % insights.length]

  return (
    <>
      <section className="sheet intro article-head">
        <motion.span className="tag intro__tag" {...reveal(0)}>{insight.category}</motion.span>
        <h1 className="intro__title article-head__title" {...split(1)}>{insight.title}</h1>
        <motion.dl className="article-head__meta" {...reveal(2)}>
          <div><dt className="label">Published</dt><dd>{insight.date}</dd></div>
          <div><dt className="label">Reading time</dt><dd>{insight.read}</dd></div>
        </motion.dl>
      </section>

      <article className="sheet article">
        <aside className="article__aside">
          <motion.p className="article__excerpt" {...reveal(0)}>{insight.excerpt}</motion.p>
        </aside>
        <div className="article__body">
          {insight.sections.map((section, i) => (
            <section key={i}>
              {section.heading && <h2 className="article__heading" {...split(0)}>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph} {...split(1)}>{paragraph}</p>)}
            </section>
          ))}
          <p className="article__note">
            This note is general information about the law as we understand it at the date above. It is not legal
            advice; the answer for your land depends on its records. Please speak to an advocate before acting on it.
          </p>
        </div>
      </article>

      <Link className="sheet next" to={`/insights/${next.slug}`}>
        <span className="label">Next note</span>
        <span className="next__name next__name--serif">{next.title}</span>
        <NoteArrow />
      </Link>
    </>
  )
}
