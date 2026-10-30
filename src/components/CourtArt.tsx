// A courthouse front in single hairlines — pediment, entablature, six columns and the steps —
// drawn out stroke by stroke when the hero opens (useScrollEffects). viewBox 0 0 640 800.

const COLUMNS = [60, 160, 260, 340, 440, 540]
const SHAFT = 40

const lines = [
  // Pediment and its inner rake
  'M20 210L320 40L620 210Z',
  'M80 200L320 70L560 200',
  // Entablature
  'M10 210H630', 'M10 240H630', 'M10 262H630',
  // Columns: capital, shaft edges and fluting, base
  ...COLUMNS.flatMap((x) => [
    `M${x - 10} 262H${x + SHAFT + 10}V284H${x - 10}Z`,
    `M${x} 284V690`, `M${x + SHAFT} 284V690`, `M${x + SHAFT / 2} 300V676`,
    `M${x - 10} 690H${x + SHAFT + 10}V712H${x - 10}Z`,
  ]),
  // Steps
  'M0 712H640', 'M-20 738H660', 'M-40 764H680', 'M-60 790H700',
]

export default function CourtArt({ className = '' }: { className?: string }) {
  return (
    <svg className={`court ${className}`} viewBox="-60 0 760 800" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {lines.map((d) => <path key={d} d={d} pathLength="1" vectorEffect="non-scaling-stroke" />)}
    </svg>
  )
}
