import { useSyncExternalStore, type AnchorHTMLAttributes } from 'react'
import { scrollToTop } from './smoothScroll'

// Hash routing (#/practice/land-title) so deep links survive GitHub Pages, which has no SPA fallback.
// Anything that isn't a "#/" path (an empty hash, a stray "#top") resolves to the home page.
function readPath() {
  const hash = window.location.hash.slice(1)
  if (!hash.startsWith('/')) return '/'
  const path = hash.split(/[?#]/)[0].replace(/\/+$/, '')
  return path || '/'
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function usePath() {
  return useSyncExternalStore(subscribe, readPath)
}

export const toHref = (path: string) => `#${path}`

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

// A plain anchor to a route. Clicking the page you're already on scrolls back to the top instead.
export function Link({ to, onClick, ...props }: LinkProps) {
  return (
    <a
      href={toHref(to)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && readPath() === to) {
          event.preventDefault()
          scrollToTop()
        }
      }}
      {...props}
    />
  )
}
