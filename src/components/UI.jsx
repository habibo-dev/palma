import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { useRevealNode } from '../lib/motion.js'
import { Icon } from './Icons.jsx'

/* ------------------------------------------------------------------ Reveal */

export function Reveal({ children, as: Tag = 'div', variant = 'fade', delay = 0, className = '', ...rest }) {
  const ref = useRevealNode()
  const cls = variant === 'mask' ? 'mask-up' : 'reveal'
  return (
    <Tag
      ref={ref}
      className={`${cls} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ Buttons */

function Arrow() {
  return (
    <svg className="arrow flip" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Button({ variant = 'solid', size, icon = 'arrow', showIcon = true, to, href, onClick, type, children, className = '', ...rest }) {
  const cls = ['btn', variant !== 'solid' && `btn--${variant}`, size === 'sm' && 'btn--sm', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {showIcon && icon && (
        <span className="arrow">
          <Icon name={icon} size={16} />
        </span>
      )}
    </>
  )

  if (to) {
    const isExternal = /^https?:|^mailto:|^tel:/.test(to)
    if (isExternal) return <a className={cls} href={to} {...rest}>{inner}</a>
    return <Link className={cls} to={to} {...rest}>{inner}</Link>
  }
  if (href) return <a className={cls} href={href} {...rest}>{inner}</a>
  return (
    <button className={cls} type={type || 'button'} onClick={onClick} {...rest}>
      {inner}
    </button>
  )
}

export function LinkArrow({ to, children, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="link-arrow">
      {children}
      <Icon name="arrow" size={15} className="flip" />
    </Link>
  )
}

/* ------------------------------------------------------------------ Section */

export function PageHead({ eyebrow, title, lead, children }) {
  return (
    <div className="wrap pt-[8.5rem] pb-4 lg:pt-[11.5rem]">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={60}>
            <h1 className="h1 mt-5 max-w-3xl">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-2xl">{lead}</p>
            </Reveal>
          )}
        </div>
        {children && (
          <Reveal delay={160} className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
            {children}
          </Reveal>
        )}
      </div>
    </div>
  )
}

export function Section({ id, children, className = '', tone = 'bone', tight = false, as: Tag = 'section' }) {
  const bg =
    tone === 'palm'
      ? 'bg-palm text-bone'
      : tone === 'shell'
        ? 'bg-shell'
        : tone === 'paper'
          ? 'bg-paper'
          : ''
  return (
    <Tag id={id} className={`section ${tight ? 'section--tight' : ''} ${bg} ${className}`}>
      <div className="wrap">{children}</div>
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, lead, align = 'left', size = 'h2', as: Tag = 'h2', action, className = '' }) {
  const centered = align === 'center'
  return (
    <div className={`grid gap-6 lg:grid-cols-12 ${centered && 'text-center'} ${className}`}>
      <div className={centered ? 'mx-auto max-w-3xl lg:col-span-12' : 'lg:col-span-7'}>
        {eyebrow && (
          <Reveal>
            <p className={`eyebrow ${centered && 'justify-center'}`}>{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={60}>
          <Tag className={`${size} mt-4`}>{title}</Tag>
        </Reveal>
        {lead && (
          <Reveal delay={120}>
            <p className="lead mt-5 max-w-2xl">{lead}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal className={`flex items-end ${centered ? 'justify-center lg:col-span-12' : 'lg:col-span-5 lg:justify-end'}`} delay={160}>
          {action}
        </Reveal>
      )}
    </div>
  )
}
