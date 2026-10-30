import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Curtain from './components/Curtain'
import Disclaimer, { disclaimerAccepted } from './components/Disclaimer'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Page from './pages/Page'
import { usePath } from './lib/router'
import { scrollToTop, startSmoothScroll } from './lib/smoothScroll'
import { finishIntro } from './lib/intro'
import { chambers, pageTitle } from './data/site'
import { useArtboardScale } from './hooks/useArtboardScale'
import { useScrollEffects } from './hooks/useScrollEffects'

function App() {
  const main = useRef<HTMLElement>(null)
  const shell = useRef<HTMLDivElement>(null)
  const path = usePath()
  // The intro curtain plays only when the site is opened (or reloaded) on the home page;
  // until it has loaded, nothing is mounted beneath it. Route changes swap pages directly.
  const [intro] = useState(path === '/')
  const [loaded, setLoaded] = useState(!intro)
  const [lifted, setLifted] = useState(!intro)
  // The Bar Council disclaimer comes up once the curtain has lifted, until the visitor agrees
  const [agreed, setAgreed] = useState(disclaimerAccepted)
  const view = loaded ? path : null
  const [menuOpen, setMenuOpen] = useState(false)

  useArtboardScale()
  useEffect(startSmoothScroll, [])
  // Entrance animations wait until the curtain is up and the disclaimer agreed
  useEffect(() => {
    if (lifted && agreed) finishIntro()
  }, [lifted, agreed])
  // Each new page starts at the top; before useScrollEffects, which measures what's on screen
  useLayoutEffect(() => {
    if (view !== null) scrollToTop(true)
  }, [view])
  useScrollEffects(main, view)

  useEffect(() => {
    if (view !== null) document.title = view === '/' ? `${chambers.name} — Advocates` : `${pageTitle(view)} — ${chambers.name}`
  }, [view])

  return (
    <MotionConfig reducedMotion="user">
      {intro && <Curtain onCover={() => setLoaded(true)} onLift={() => setLifted(true)} />}
      <AnimatePresence>
        {lifted && !agreed && <Disclaimer onAgree={() => setAgreed(true)} />}
      </AnimatePresence>
      {view !== null && (
        <>
          <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
          <Menu open={menuOpen} path={view} onClose={() => setMenuOpen(false)} shell={shell} />
          {/* The page, which the menu shrinks aside; while it's shrunk, tapping it closes the menu */}
          <div
            ref={shell}
            className="shell"
            inert={!agreed}
            onClickCapture={menuOpen ? (event) => { event.preventDefault(); event.stopPropagation(); setMenuOpen(false) } : undefined}
          >
            <main ref={main} key={view}>
              <Page path={view} />
            </main>
            <Footer cta={view !== '/contact'} />
          </div>
        </>
      )}
    </MotionConfig>
  )
}

export default App
