import { Link } from '../lib/router'
import { chambers } from '../data/site'

type Props = {
  menuOpen: boolean
  onToggleMenu: () => void
}

// White text with mix-blend-mode: difference, so it inverts whatever section scrolls beneath it
// (including the black menu panel, where it reads as white).
export default function Header({ menuOpen, onToggleMenu }: Props) {
  return (
    <header className={`site-header${menuOpen ? ' is-open' : ''}`}>
      <Link className="logo" to="/">{chambers.name.toUpperCase()}</Link>
      <button className="menu" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={onToggleMenu}>
        {/* Both words stay in place; one blurs out as the other comes into focus (index.css) */}
        <span className="menu__label">
          <span aria-hidden={menuOpen}>Menu</span>
          <span aria-hidden={!menuOpen}>Close</span>
        </span>
        {/* A plus that turns into a cross */}
        <span className="menu__icon" />
      </button>
    </header>
  )
}
