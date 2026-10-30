import { useState } from 'react'
import { motion } from 'motion/react'
import PageIntro from '../components/PageIntro'
import Br from '../components/Br'
import { NoteArrow } from '../components/Notes'
import { reveal } from '../lib/reveal'
import { Link } from '../lib/router'
import { insightCategories, insights } from '../data/insights'

type Category = (typeof insightCategories)[number]

export default function InsightsPage() {
  const [filter, setFilter] = useState<Category>('All')
  const shown = filter === 'All' ? insights : insights.filter((n) => n.category === filter)

  return (
    <>
      <PageIntro
        tag="Insights"
        title={<>Notes from<Br />chambers</>}
        lede="Short notes on the questions clients ask most about land and property in Gujarat. They are general information, written to help you ask better questions — not legal advice on your matter."
      >
        <motion.div className="filters" {...reveal(3)}>
          <div className="filters__chips" role="group" aria-label="Filter insights">
            {insightCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="chip"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="filters__count">{String(shown.length).padStart(2, '0')} notes</p>
        </motion.div>
      </PageIntro>

      <section className="sheet articles">
        {/* Keyed by filter, so the rows replay their entrance when the selection changes */}
        <ul key={filter} className="articles__list">
          {shown.map((note, i) => (
            <motion.li key={note.slug} {...reveal(i, 20)}>
              <Link className="article-row" to={`/insights/${note.slug}`}>
                <span className="article-row__date">{note.date}</span>
                <span className="article-row__main">
                  <span className="article-row__title">{note.title}</span>
                  <span className="article-row__excerpt">{note.excerpt}</span>
                </span>
                <span className="article-row__meta">{note.category} · {note.read}</span>
                <NoteArrow />
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  )
}
