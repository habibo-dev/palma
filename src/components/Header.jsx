import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang, LANGS } from '../lib/i18n.jsx'
import { useScrolled, useScrollLock } from '../lib/motion.js'
import { Icon, Logo } from './Icons.jsx'
import { Button } from './UI.jsx'
import { company, telLink } from '../content/company.js'

/* --------------------------------------------------------------- LangSwitch */

export function LangSwitch({ tone = 'ink' }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => !box.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = LANGS.find((l) => l.code === lang)

  return (
    <div className="relative" ref={box}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={useLang().t('aria.language')}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] transition-colors ${
          tone === 'light'
            ? 'border-bone/30 text-bone hover:border-bone'
            : 'border-ink/15 text-ink hover:border-ink/45'
        }`}
      >
        <Icon name="globe" size={13} />
        {current?.label}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-soft border border-line bg-paper py-1 shadow-[var(--shadow-lift)]"
        >
          {LANGS.map((l) => (
            <li key={l.code} role="none">
              <button
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-start text-sm transition-colors hover:bg-bone ${
                  l.code === lang ? 'font-bold text-palm' : 'text-ink-soft'
                }`}
              >
                <span dir={l.code === 'ar' ? 'rtl' : 'ltr'}>{l.name}</span>
                <span className="text-[0.625rem] font-bold tracking-[0.14em] text-stone">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------- Header */

export function Header() {
  const { t, lang } = useLang()
  const { pathname, hash } = useLocation()
  const scrolled = useScrolled(12)
  const [menu, setMenu] = useState(false)
  useScrollLock(menu)

  useEffect(() => setMenu(false), [pathname, hash])

  const items = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.collections'), to: '/collections' },
    { label: t('nav.sectors'), to: '/#secteurs' },
    { label: t('nav.ambiances'), to: '/#ambiances' },
    { label: t('nav.showroom'), to: '/contact#showroom' },
    { label: t('nav.about'), to: '/a-propos' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* bandeau info — disparaît au scroll */}
      <div
        className={`overflow-hidden bg-palm text-bone transition-[max-height,opacity] duration-500 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="wrap flex h-10 items-center justify-between gap-4 text-[0.75rem]">
          <p className="flex items-center gap-2 truncate">
            <Icon name="pin" size={14} className="shrink-0 text-rattan" />
            <span className="truncate">{t('top.location')}</span>
            <span aria-hidden className="hidden opacity-40 sm:inline">·</span>
            <span className="hidden opacity-75 md:inline">{company.hoursNote[lang]}</span>
          </p>
          <div className="flex items-center gap-4">
            <a href={telLink()} className="hidden items-center gap-2 hover:underline sm:flex">
              <Icon name="phone" size={14} className="text-rattan" />
              <span className="tabular">{company.phone.display}</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-shell/95 backdrop-blur-[6px] shadow-[0_1px_0_rgba(22,21,15,0.04)]'
            : 'border-b border-transparent bg-bone/70 backdrop-blur-[2px]'
        }`}
      >
        <div className={`wrap flex items-center justify-between gap-6 transition-all ${scrolled ? 'h-16' : 'h-20'}`}>
          <Link to="/" aria-label="Palma — accueil" className="shrink-0">
            <Logo className={`transition-transform duration-500 ${scrolled ? 'scale-95' : ''}`} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {items.map((item) => {
              const active = item.to === '/' ? pathname === '/' && !hash : pathname === item.to.replace(/#.*$/, '')
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-2 text-[0.9375rem] font-medium transition-colors ${
                    active ? 'text-ink' : 'text-stone hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-palm transition-transform duration-[400ms] ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <LangSwitch />
            <Button to="/contact#devis" size={undefined} className="hidden !py-2.5 !text-[0.8125rem] md:inline-flex">
              {t('cta.quote')}
            </Button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
              aria-expanded={menu}
              aria-controls="palma-menu"
              onClick={() => setMenu((v) => !v)}
            >
              <span className="sr-only">{menu ? t('aria.close') : t('aria.menu')}</span>
              <Icon name={menu ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menu} items={items} lang={lang} onClose={() => setMenu(false)} />
    </header>
  )
}

function MobileMenu({ open, items, onClose, lang }) {
  const { t } = useLang()
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    panel.current?.querySelector('a,button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-[400ms] lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <nav
        id="palma-menu"
        ref={panel}
        aria-label="Menu mobile"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-0 z-[45] bg-shell pt-24 pb-8 transition-transform duration-500 ease-[var(--ease-out-quart)] lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="wrap">
          <p className="eyebrow">{t('nav.home')} — {company.descriptor[lang]}</p>
          <ul className="mt-5 flex flex-col">
            {items.map((item, i) => (
              <li key={item.to} className="border-t border-line last:border-b">
                <Link
                  to={item.to}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between py-4 font-display text-[1.6rem] leading-none text-ink"
                >
                  {item.label}
                  <span className="text-[0.6875rem] font-sans font-bold tracking-[0.2em] text-stone tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Button to="/contact#devis" tabIndex={open ? 0 : -1}>
              {t('cta.quote')}
            </Button>
            <Button variant="ghost" href={telLink()} tabIndex={open ? 0 : -1} icon="phone" showIcon>
              {company.phone.display}
            </Button>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
            <p className="body-sm max-w-[16rem]">{company.hoursNote[lang]}</p>
            <LangSwitch />
          </div>
        </div>
      </nav>
    </>
  )
}
