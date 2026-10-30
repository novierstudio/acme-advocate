// The mockup is shared as one link per person: whatever follows the site's address names the
// chambers (/mehta-chambers → "Mehta Chambers", /krupal-savjani → "Krupal Savjani"). Pages are in
// the hash (#/practice), so the name stays put while the visitor moves around. No name → Acme.

const DEFAULT = { name: 'Acme Chambers', mark: 'Acme' }

// Trailing words that describe the firm rather than name it, left out of the large wordmarks
const FIRM_WORDS = /\s+(chambers|associates|advocates|law|legal|partners|&\s*co\.?|and\s+co\.?)$/i

function readName() {
  const base = import.meta.env.BASE_URL
  let path = window.location.pathname
  if (path.startsWith(base)) path = path.slice(base.length)
  const segment = path.split('/').find((part) => part && part !== 'index.html')
  if (!segment) return null
  let text: string
  try {
    text = decodeURIComponent(segment)
  } catch {
    return null
  }
  text = text.replace(/[-_+.]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40)
  if (!/\p{L}/u.test(text)) return null
  // Lowercase words are capitalised; anything typed with capitals (LLP, McKenzie) is kept as is
  return text.split(' ').map((word) => word === word.toLowerCase() ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ')
}

const name = readName()

export const brand = name ? { name, mark: name.replace(FIRM_WORDS, '') || name } : DEFAULT
