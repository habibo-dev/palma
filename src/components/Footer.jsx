import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories } from '../content/catalog.js'
import { company, mailLink, telLink, whatsappLink } from '../content/company.js'
import { Icon, Logo } from './Icons.jsx'
import { Button, Reveal } from './UI.jsx'

export function Footer() {
  const { t, lang, Ls } = useLang()
  const year = new Date().getFullYear()

  const nav = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.collections'), to: '/collections' },
    { label: t('nav.ambiances'), to: '/#ambiances' },
    { label: t('nav.about'), to: '/a-propos' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const craft = [
    { label: t('nav.sectors'), to: '/#secteurs' },
    { label: t('nav.approach'), to: '/a-propos#methode' },
    { label: t('materials.title'), to: '/a-propos#materiaux' },
    { label: t('catalogue.title'), to: '/contact#catalogue' },
    { label: 'FAQ', to: '/contact#faq' },
  ]

  return (
    <footer className="bg-palm text-bone">
      <div className="wrap py-16 lg:py-20">
        <Reveal className="grid gap-12 lg:grid-cols-12">
          {/* Identite */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-bone/75">{t('footer.tagline')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline-light" size="sm" to="/contact#devis">
                {t('cta.quote')}
              </Button>
              <Button variant="outline-light" size="sm" href={whatsappLink('Bonjour, je souhaite avoir plus d’informations concernant vos produits.')} icon="whatsapp">
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.nav')}</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((x) => (
                <li key={x.to}>
                  <Link to={x.to} className="text-[0.9375rem] text-bone/80 transition-colors hover:text-bone">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Savoir-faire */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.services')}</h2>
            <ul className="mt-4 space-y-2.5">
              {craft.map((x) => (
                <li key={x.label}>
                  <Link to={x.to} className="text-[0.9375rem] text-bone/80 transition-colors hover:text-bone">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/collections?cat=${c.id}`} className="text-[0.8125rem] text-bone/55 underline decoration-bone/20 underline-offset-4 hover:text-bone">
                    {L(c).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.contact')}</h2>
            <ul className="mt-4 space-y-3.5 text-[0.9375rem]">
              <li className="flex gap-2.5 text-bone/80">
                <Icon name="pin" size={16} className="mt-1 shrink-0 text-rattan" />
                <span>{company.address.label[lang]}
                  <a href={whatsappLink()} className="mt-1 block w-fit text-[0.8125rem] text-bone underline decoration-bone/30 hover:decoration-bone">
                    {t('cta.directions')}
                  </a>
                </span>
              </li>
              <li>
                <a href={telLink()} dir="ltr" className="flex items-center gap-2.5 tabular text-bone/85 hover:text-bone">
                  <Icon name="phone" size={16} className="shrink-0 text-rattan" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a href={mailLink()} className="flex items-center gap-2.5 break-all text-bone/85 hover:text-bone">
                  <Icon name="mail" size={16} className="shrink-0 text-rattan" />
                  {company.email}
                </a>
              </li>
              <li className="flex gap-2.5 text-bone/70">
                <Icon name="clock" size={16} className="mt-1 shrink-0 text-rattan" />
                <span>{Ls(company.hoursNote)}</span>
              </li>
            </ul>

            <h3 className="mt-7 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.areas')}</h3>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.8125rem] text-bone/70">
              {company.areaServed[lang].map((a) => (
                <span key={a}>
                  {a}
                  <span aria-hidden className="ms-2 text-bone/25">/</span>
                </span>
              ))}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/15 pt-6 text-[0.75rem] text-bone/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name} — {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {company.demo.enabled && (
              <span className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-3 py-1 text-[0.6875rem] text-bone/70">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rattan" />
                {Ls(company.demo.label)}
              </span>
            )}
            {company.socials.length > 0 &&
              company.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 hover:text-bone"
            >
              {t('footer.back')}
              <Icon name="chevron" size={14} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------------------------------------------- Boutons flottants */

export function FloatingContact() {
  const { t, lang } = useLang()
  return (
    <div
      className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:end-6"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <a
        href={whatsappLink('Bonjour, je souhaite avoir plus d’informations concernant vos produits.')}
        target="_blank"
        rel="noopener"
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-palm px-4 py-3 text-bone shadow-[0_16px_34px_-18px_rgba(22,21,15,0.7)] transition-transform duration-[400ms] ease-[var(--ease-out-quart)] hover:-translate-y-0.5"
        aria-label={t('cta.whatsapp')}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-palm/25 [animation-duration:3.6s]" />
        <Icon name="whatsapp" size={19} className="relative" />
        <span className="relative hidden text-[0.875rem] font-semibold sm:inline">{t('cta.whatsapp')}</span>
      </a>
      <a
        href={telLink()}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-shell/95 px-3.5 py-2 text-[0.8125rem] font-semibold text-ink backdrop-blur-sm transition-colors hover:border-ink/40 sm:hidden"
        aria-label={t('top.phoneLabel')}
      >
        <Icon name="phone" size={15} />
        {t('cta.call')}
      </a>
    </div>
  )
}
