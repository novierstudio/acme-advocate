import Home from './Home'
import AboutPage from './AboutPage'
import PracticePage from './PracticePage'
import PracticeDetail from './PracticeDetail'
import InsightsPage from './InsightsPage'
import ArticlePage from './ArticlePage'
import ContactPage from './ContactPage'
import NotFound from './NotFound'
import { practices } from '../data/practices'
import { insights } from '../data/insights'

export default function Page({ path }: { path: string }) {
  switch (path) {
    case '/': return <Home />
    case '/about': return <AboutPage />
    case '/practice': return <PracticePage />
    case '/insights': return <InsightsPage />
    case '/contact': return <ContactPage />
  }
  const practice = practices.find((p) => path === `/practice/${p.slug}`)
  if (practice) return <PracticeDetail practice={practice} />
  const insight = insights.find((n) => path === `/insights/${n.slug}`)
  return insight ? <ArticlePage insight={insight} /> : <NotFound />
}
