// Site-wide navigation and chambers details, shared by the menu, footer and contact page.
// Contact details are placeholders until the chambers supply real ones.

import { practices } from './practices'
import { insights } from './insights'
import { brand } from '../lib/brand'

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/practice', label: 'Practice' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
]

export const chambers = {
  name: brand.name,
  // The short form for the large wordmarks (the intro curtain and the footer)
  mark: brand.mark,
  email: 'chambers@acmelaw.in',
  phone: '+91 79 4000 0210',
  address: ['702, Shapath Square', 'Sarkhej–Gandhinagar Highway', 'Ahmedabad 380054'],
  hours: 'Mon – Sat, 10:30 – 19:00',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
}

// Name for the browser tab
export function pageTitle(path: string) {
  const practice = practices.find((p) => path === `/practice/${p.slug}`)
  const insight = insights.find((n) => path === `/insights/${n.slug}`)
  return practice?.name ?? insight?.title ?? nav.find((item) => item.to === path)?.label ?? 'Not found'
}
