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
}

/** Logo Palma : palme stylisee + typographie serif. */
export function Logo({ className = '', tone = 'ink', id = 'palma-logo' }) {
  const fg = tone === 'light' ? 'var(--color-bone)' : 'var(--color-ink)'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()} dir="ltr">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <title>{id}</title>
        <path
          d="M16 27V12"
          stroke={fg}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16 12C16 7.6 12.7 5 7.5 5.5 8 10 11.3 12.6 16 12ZM16 12c0-4.4 3.3-7 8.5-6.5C24 10 20.7 12.6 16 12ZM16 18.5c-3-2.8-6.9-3.4-9.8-2.1.9 3 5 4.7 9.8 2.1ZM16 18.5c3-2.8 6.9-3.4 9.8-2.1-.9 3-5 4.7-9.8 2.1Z"
          fill={fg}
          opacity="0.9"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.35rem] font-semibold tracking-[0.16em] uppercase"
          style={{ color: fg }}
        >
          Palma
        </span>
      </span>
    </span>
  )
}
