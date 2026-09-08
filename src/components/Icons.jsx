/** Jeu d'icones dessine pour Palma — traits fins 1.4, grille 24. Pas de librairie externe. */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

export function Icon({ name, size = 20, className = '', ...rest }) {
  const Cmp = ICONS[name] || ICONS.arrow
  return <Cmp width={size} height={size} {...(className ? { className } : {})} {...base} {...rest} />
}

const Chair = (p) => (
  <svg {...p}>
    <path d="M7 4v7h10V4" />
    <path d="M5 11h14l-1 3H6l-1-3Z" />
    <path d="M7.5 14v6M16.5 14v6" />
  </svg>
)
const Table = (p) => (
  <svg {...p}>
    <path d="M3 8h18" />
    <path d="M5 8v11M19 8v11" />
    <path d="M5 12h14" />
  </svg>
)
const PalmLeaf = (p) => (
  <svg {...p}>
    <path d="M12 21V11" />
    <path d="M12 11C12 7 9.5 5 5 5c0 4 2.5 6 7 6Z" />
    <path d="M12 11c0-4 2.5-6 7-6 0 4-2.5 6-7 6Z" />
    <path d="M12 15c-2.2-2-4.6-2.5-6.6-1.7.7 2 3.2 3.4 6.6 1.7Z" />
    <path d="M12 15c2.2-2 4.6-2.5 6.6-1.7-.7 2-3.2 3.4-6.6 1.7Z" />
  </svg>
)
const Building = (p) => (
  <svg {...p}>
    <path d="M4 21V6l7-3v18" />
    <path d="M11 9h9v12" />
    <path d="M14.5 12.5h2M14.5 16.5h2M7 9h.01M7 13h.01M7 17h.01" />
  </svg>
)
const Measure = (p) => (
  <svg {...p}>
    <rect x="2.5" y="9" width="19" height="6" rx="1" />
    <path d="M7 9v3M11 9v2M15 9v3M19 9v2" />
  </svg>
)
const Tool = (p) => (
  <svg {...p}>
    <path d="M14.5 3.5a4 4 0 0 0 5 5L11 17l-4-4 7.5-9.5Z" />
    <path d="M7 13 3.5 20.5 11 17" />
  </svg>
)
const Layers = (p) => (
  <svg {...p}>
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
    <path d="M3 12l9 4.5L21 12" />
    <path d="M3 16.5 12 21l9-4.5" />
  </svg>
)
const Hand = (p) => (
  <svg {...p}>
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M11 10.5V4.8a1.5 1.5 0 0 1 3 0V11" />
    <path d="M14 10.5V6.6a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6 7s-6-2.4-6-6v-3l-1.2-1a1.4 1.4 0 0 1 1.7-2.2L8 11" />
  </svg>
)
const Repair = (p) => (
  <svg {...p}>
    <path d="M6.5 17.5 3 21l3.5-.5L6.5 17.5Z" />
    <path d="M7 17l7.5-7.5" />
    <path d="M13 5.5a3.5 3.5 0 0 1 5 4.5l-3-3Z" />
    <path d="M16.5 13a3.5 3.5 0 0 1-4.5-5l3 3Z" />
  </svg>
)
const Clock = (p) => (
  <svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)
const Arrow = (p) => (
  <svg {...p}>
    <path d="M4 12h15" />
    <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
  </svg>
)
const Phone = (p) => (
  <svg {...p}>
    <path d="M5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1-.8 1.7-1.8 1.6C9.7 18.9 5.1 14.3 3.4 5.3 3.3 4.3 4 3.5 5 3.5Z" />
  </svg>
)
const Whatsapp = (p) => (
  <svg {...p} strokeWidth={1.5}>
    <path d="M20 11.7A7.9 7.9 0 0 1 8.2 18.8L4 20l1.3-4.1A7.9 7.9 0 1 1 20 11.7Z" />
    <path d="M9.2 9c.3-.8.7-.8 1.1-.8h.5c.2 0 .4 0 .6.5l.7 1.7c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7a7 7 0 0 0 2.6 2.2c.3.1.5 0 .7-.1l.5-.6c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5v.6c0 .5-.5 1.3-1.6 1.4-1 .1-2.6-.2-4.7-1.6a11 11 0 0 1-3.5-4c-.6-1.2-.6-2.2-.3-2.9Z" />
  </svg>
)
const Mail = (p) => (
  <svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)
const Pin = (p) => (
  <svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
const Chevron = (p) => (
  <svg {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
)
const Menu = (p) => (
  <svg {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </svg>
)
const Close = (p) => (
  <svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)
const Globe = (p) => (
  <svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" />
  </svg>
)
const Board = (p) => (
  <svg {...p}>
    <rect x="3" y="4.5" width="18" height="11" rx="1" />
    <path d="M12 15.5V19M8.5 19h7" />
    <path d="M6.5 8.5h7M6.5 11.5h4.5" />
  </svg>
)
const Archive = (p) => (
  <svg {...p}>
    <rect x="3.5" y="4" width="17" height="4" rx="1" />
    <path d="M5 8v11.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V8" />
    <path d="M9.5 12h5" />
  </svg>
)
const Wood = (p) => (
  <svg {...p}>
    <rect x="3" y="6.5" width="18" height="11" rx="1" />
    <path d="M3 10h18M3 14h18" opacity="0.55" />
    <path d="M8 6.5v11M14 6.5v11" opacity="0.35" />
  </svg>
)
const Metal = (p) => (
  <svg {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="1" />
    <path d="M12 3.5v17M4 12h16" />
    <path d="M9 7.5h1.5M13.5 7.5H15M9 16.5h1.5M13.5 16.5H15" />
  </svg>
)
const Factory = (p) => (
  <svg {...p}>
    <path d="M3 20.5h18" />
    <path d="M4.5 20.5V10l5 3V10l5 3V7.5h4.5V20.5" />
    <path d="M7 17h1.5M12 17h1.5M17 17h1" />
  </svg>
)
const Truck = (p) => (
  <svg {...p}>
    <path d="M2.5 6.5h10v10h-10z" />
    <path d="M12.5 10h4l3 3v3.5h-7z" />
    <circle cx="6.5" cy="18.5" r="1.8" />
    <circle cx="16.5" cy="18.5" r="1.8" />
  </svg>
)
const WoodMetal = (p) => (
  <svg {...p}>
    <path d="M3.5 5.5h8v8h-8z" />
    <path d="M12.5 10.5h8v8h-8z" />
    <path d="M12.5 5.5h8M3.5 18.5h8" opacity="0.55" />
  </svg>
)
const Swoosh = (p) => (
  <svg {...p}>
    <path d="M4 19c3-9 8-13 16-14-1 8-5 13-11 14-2.5.4-4.4.3-5 0Z" />
    <path d="M8 16c1.5-4 4.5-6.5 8.5-7.5" />
  </svg>
)
const Saw = (p) => (
  <svg {...p}>
    <path d="M3 14h8l2-3 2 3h2l2-3 2 3v3H3z" />
    <path d="M5 20h14" />
  </svg>
)

const ICONS = {
  chair: Chair,
  table: Table,
  palm: PalmLeaf,
  building: Building,
  measure: Measure,
  tool: Tool,
  layers: Layers,
  hand: Hand,
  repair: Repair,
  clock: Clock,
  arrow: Arrow,
  phone: Phone,
  whatsapp: Whatsapp,
  mail: Mail,
  pin: Pin,
  chevron: Chevron,
  menu: Menu,
  close: Close,
  globe: Globe,
  leaf: Swoosh,
  saw: Saw,
  board: Board,
  archive: Archive,
  wood: Wood,
  metal: Metal,
  factory: Factory,
  truck: Truck,
  'wood-metal': WoodMetal,
}

/** Monogramme Palma Meuble : plateau + traverse (bois sur métal), wordmark serif. */
export function Logo({ className = '', tone = 'ink', compact = false, place = true }) {
  const fg = tone === 'light' ? 'var(--color-bone)' : 'var(--color-ink)'
  const accent = tone === 'light' ? 'var(--color-oak)' : 'var(--color-palm)'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()} dir="ltr">
      <svg width={compact ? 22 : 26} height={compact ? 22 : 26} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="3" fill={accent} />
        <path d="M6 11.5h20" stroke={tone === 'light' ? 'var(--color-ink)' : 'var(--color-bone)'} strokeWidth="2.6" strokeLinecap="square" />
        <path d="M9.5 11.5V25M22.5 11.5V25" stroke={tone === 'light' ? 'var(--color-ink)' : 'var(--color-bone)'} strokeWidth="1.7" strokeLinecap="square" opacity="0.9" />
        <path d="M9.5 18.5h13" stroke={tone === 'light' ? 'var(--color-ink)' : 'var(--color-bone)'} strokeWidth="1.7" strokeLinecap="square" opacity="0.6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.25rem] font-semibold tracking-[0.04em]" style={{ color: fg }}>
          Palma <span className="font-normal">Meuble</span>
        </span>
        {place && (
          <span
            className="mt-1 text-[0.5625rem] font-bold uppercase tracking-[0.22em]"
            style={{ color: tone === 'light' ? 'rgba(241,238,231,0.6)' : 'var(--color-stone)' }}
          >
            EURL · Constantine
          </span>
        )}
      </span>
    </span>
  )
}
