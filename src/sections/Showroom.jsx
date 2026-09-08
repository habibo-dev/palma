import { useLang } from '../lib/i18n.jsx'
import { company, mailLink, telLink, whatsappLink } from '../content/company.js'
import { Icon } from '../components/Icons.jsx'
import { MapBlock } from '../components/MapBlock.jsx'
import { Reveal, Section, SectionHead } from '../components/UI.jsx'

export function Showroom() {
  const { t, lang, Ls } = useLang()

  const rows = [
    {
      icon: 'pin',
      title: t('showroom.addressTitle'),
      body: company.address.label[lang],
      action: { href: whatsappLink('Bonjour, je souhaite les coordonnées exactes du showroom.'), label: t('cta.whatsapp') },
    },
    { icon: 'phone', title: t('showroom.phoneTitle'), body: company.phone.display, dir: 'ltr', href: telLink() },
    { icon: 'mail', title: t('showroom.emailTitle'), body: company.email, dir: 'ltr', href: mailLink() },
    { icon: 'clock', title: t('showroom.visitTitle'), body: company.hours ? `${company.hours}` : Ls(company.hoursNote) },
  ]

  return (
    <Section id="showroom" tone="shell">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <SectionHead eyebrow={t('showroom.eyebrow')} title={t('showroom.title')} lead={t('showroom.lead')} />

          <ul className="mt-10 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2">
            {rows.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 70} className="bg-shell p-5">
                <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-stone">
                  <Icon name={r.icon} size={14} className="text-moss" />
                  {r.title}
                </p>
                {r.href ? (
                  <a href={r.href} dir={r.dir} className="mt-2.5 block font-display text-[1.15rem] leading-snug text-ink transition-colors hover:text-palm">
                    {r.body}
                  </a>
                ) : (
                  <p dir={r.dir} className="mt-2.5 font-display text-[1.15rem] leading-snug text-ink">
                    {r.body}
                  </p>
                )}
                {r.action && (
                  <a href={r.action.href} target="_blank" rel="noopener" className="link-arrow mt-2.5 inline-flex !text-[0.8125rem]">
                    {r.action.label}
                  </a>
                )}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-8 border-t border-line pt-6">
            <p className="tag">{t('showroom.areasTitle')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {company.areaServed[lang].map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>
            <p className="body-sm mt-6 flex items-start gap-2">
              <Icon name="tool" size={15} className="mt-0.5 shrink-0 text-moss" />
              {t('showroom.private')}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <MapBlock height="30rem" />
          <Reveal delay={160} className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappLink('Bonjour, je souhaite visiter le showroom de Rouiba.')}
              target="_blank"
              rel="noopener"
              className="card card--hover flex items-center justify-between gap-3 bg-paper p-4"
            >
              <span className="text-[0.9375rem] font-semibold">{t('cta.book')}</span>
              <Icon name="whatsapp" size={18} className="text-palm" />
            </a>
            <a href={telLink()} className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
              <span className="text-[0.9375rem] font-semibold">{t('cta.call')}</span>
              <Icon name="phone" size={18} className="text-palm" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
