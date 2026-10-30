// A line break on the desktop artboard; just a space in the fluid layout, where text wraps on its own.
// A block-level span rather than <br>: the line-reveal splitter always breaks at a <br>, even a hidden one,
// but it reads this from the layout, so it follows whichever layout is showing.
export default function Br() {
  return <>{' '}<span className="br" aria-hidden="true" /></>
}
