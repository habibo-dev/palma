import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories, products } from '../content/catalog.js'
import { company, mailLink, mapsLink, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { Icon, Logo } from './Icons.jsx'
import { Button, Reveal } from './UI.jsx'

export function Footer() {
  const { t, lang, Ls, L } = useLang()
  const year = new Date().getFullYear()
  const emailHref = mailLink()

  const nav = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.ranges'), to: '/gammes' },
    { label: t('nav.applications'), to: '/#applications' },
    { label: t('nav.approach'), to: '/a-propos#methode' },
    { label: t('nav.about'), to: '/a-propos' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const craft = [
    { label: t('nav.sectors'), to: '/#pour-qui' },
    { label: t('materials.title'), to: '/a-propos#materiaux' },
    { label: t('catalogue.eyebrow'), to: '/contact#catalogue' },
    { label: t('faq.eyebrow'), to: '/contact#faq' },
  ]

  return (
    <footer className="bg-palm text-bone">
      <div className="wrap py-16 lg:py-20">
        <Reveal className="grid gap-12 lg:grid-cols-12">
          {/* identité */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-bone/75">{t('footer.tagline')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline-light" size="sm" to="/contact#devis">
                {t('cta.quote')}
              </Button>
              <Button variant="outline-light" size="sm" href={whatsappLink(whatsappMessages.default[lang])} icon="whatsapp">
                WhatsApp
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-[0.75rem] text-bone/60">
              {company.activity[lang].map((a) => (
                <li key={a} className="rounded-full border border-bone/20 px-2.5 py-1">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* navigation */}
          <div className="lg:col-span-2">
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.nav')}</h2>
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

          {/* gammes */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.services')}</h2>
            <ul className="mt-4 space-y-2.5">
              {products.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/gammes/${p.slug}`} className="text-[0.9375rem] text-bone/80 transition-colors hover:text-bone">
                    {L(p).name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/gammes?tag=${c.id}`} className="text-[0.8125rem] text-bone/55 underline decoration-bone/20 underline-offset-4 hover:text-bone">
                    {L(c).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.contact')}</h2>
            <address className="mt-4 space-y-3.5 text-[0.9375rem] not-italic">
              <p className="flex gap-2.5 text-bone/80">
                <Icon name="pin" size={16} className="mt-1 shrink-0 text-rattan" />
                <span>
                  {company.address.label[lang]}
                  <a href={mapsLink()} target="_blank" rel="noopener" className="mt-1 block w-fit text-[0.8125rem] text-bone underline decoration-bone/30 hover:decoration-bone">
                    {t('cta.directions')}
                  </a>
                </span>
              </p>
              {company.phones.map((p, i) => (
                <p key={p.tel}>
                  <a href={telLink(i)} dir="ltr" className="flex items-center gap-2.5 tabular text-bone/85 hover:text-bone">
                    <Icon name="phone" size={16} className="shrink-0 text-rattan" />
                    {p.display}
                    <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-bone/45">{i === 0 ? 'WhatsApp' : t('cta.callLandline')}</span>
                  </a>
                </p>
              ))}
              {emailHref ? (
                <p>
                  <a href={emailHref} dir="ltr" className="flex items-center gap-2.5 break-all text-bone/85 hover:text-bone">
                    <Icon name="mail" size={16} className="shrink-0 text-rattan" />
                    {company.email}
                  </a>
                </p>
              ) : (
                <p className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-bone/50">
                  <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-rattan" />
                  {t('address.emailPending')}
                </p>
              )}
              <p className="flex gap-2.5 text-bone/70">
                <Icon name="clock" size={16} className="mt-1 shrink-0 text-rattan" />
                <span>{Ls(company.hoursNote)}</span>
              </p>
            </address>

            <h3 className="mt-7 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-rattan">{t('footer.areas')}</h3>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[0.8125rem] text-bone/70">
              {company.areaServed[lang].map((a) => (
                <span key={a}>
                  {a}
                  <span aria-hidden className="ms-2 text-bone/25">
                    /
                  </span>
                </span>
              ))}
            </p>
            <ul className="mt-5 space-y-2">
              {craft.map((x) => (
                <li key={x.label}>
                  <Link to={x.to} className="text-[0.875rem] text-bone/70 underline decoration-bone/20 underline-offset-4 hover:text-bone">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/15 pt-6 text-[0.75rem] text-bone/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {company.legalName} — {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {company.demo.enabled && (
              <span className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-3 py-1 text-[0.6875rem] text-bone/70">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rattan" />
                {Ls({ fr: 'Concept de présentation — non officiel', en: 'Presentation concept — unofficial', ar: 'تصوّر مقترح — غير رسمي' })}
              </span>
            )}
            <span className="max-w-lg leading-snug text-bone/45">{t('footer.demo')}</span>
            {company.socials.length > 0 &&
              company.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              ))}
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex shrink-0 items-center gap-1.5 hover:text-bone">
              {t('footer.back')}
              <Icon name="chevron" size={14} className="rotate-180" />
            </button>
          </div>
        </div>
        <p className="mt-4 text-[0.6875rem] leading-snug text-bone/40">{t('footer.legal')}</p>
      </div>
    </footer>
  )
}

/* ---------------------------------------------------- Boutons flottants */

export function FloatingContact() {
  const { t, lang } = useLang()

  return (
    <div className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:end-6">
      <a
        href={whatsappLink(whatsappMessages.default[lang])}
        target="_blank"
        rel="noopener"
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-palm px-4 py-3 text-bone shadow-[0_16px_34px_-18px_rgba(21,24,27,0.7)] transition-transform duration-[400ms] ease-[var(--ease-out-quart)] hover:-translate-y-0.5"
        aria-label={t('cta.whatsapp')}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-palm/20 [animation-duration:3.8s]" />
        <Icon name="whatsapp" size={19} className="relative" />
        <span className="relative hidden text-[0.875rem] font-semibold sm:inline">{t('cta.whatsapp')}</span>
      </a>
      <a
        href={telLink(0)}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-shell/95 px-3.5 py-2 text-[0.8125rem] font-semibold text-ink backdrop-blur-sm transition-colors hover:border-ink/40 sm:hidden"
        aria-label={t('top.phoneLabel')}
      >
        <Icon name="phone" size={15} />
        {t('cta.call')}
      </a>
    </div>
  )
}
