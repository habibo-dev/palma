import { useLang } from '../lib/i18n.jsx'
import { company, mapsLink, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { Icon } from '../components/Icons.jsx'
import { MapBlock } from '../components/MapBlock.jsx'
import { Reveal, Section, SectionHead } from '../components/UI.jsx'

/** Adresse professionnelle : usine, stockage, bureau d’études. Pas de showroom inventé. */
export function Address() {
  const { t, lang, Ls } = useLang()

  const blocks = [
    {
      icon: 'pin',
      title: t('address.addressTitle'),
      lines: company.address.label[lang].split(' — '),
      action: { href: mapsLink(), label: t('cta.directions'), external: true },
    },
    {
      icon: 'phone',
      title: t('address.phoneTitle'),
      lines: company.phones.map((p) => p.display),
      dirs: company.phones.map(() => 'ltr'),
      hrefs: company.phones.map((_, i) => telLink(i)),
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      lines: [Ls({ fr: 'Réponse en journée ouvrée', ar: 'الرد في أيام العمل', en: 'Answered on working days' })],
      action: { href: whatsappLink(whatsappMessages.default[lang]), label: t('cta.whatsapp'), external: true },
    },
    {
      icon: 'clock',
      title: t('address.visitTitle'),
      lines: [company.hours || Ls(company.hoursNote), t('address.callBefore')],
    },
  ]

  return (
    <Section id="nous-trouver" tone="shell">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <SectionHead eyebrow={t('address.eyebrow')} title={t('address.title')} lead={t('address.lead')} />

          <ul className="mt-10 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 70} className="bg-shell p-5">
                <p className="flex items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-stone">
                  <Icon name={b.icon} size={14} className="text-moss" />
                  {b.title}
                </p>
                <div className="mt-2.5 space-y-1">
                  {b.lines.map((line, j) =>
                    b.hrefs?.[j] ? (
                      <a key={line} href={b.hrefs[j]} dir={b.dirs?.[j]} className="block font-display text-[1.0625rem] leading-snug text-ink transition-colors hover:text-palm">
                        {line}
                      </a>
                    ) : (
                      <p key={line + j} dir={b.dirs?.[j]} className={`leading-snug text-ink ${j === 0 ? 'font-display text-[1.0625rem]' : 'body-sm'}`}>
                        {line}
                      </p>
                    ),
                  )}
                </div>
                {b.action && (
                  <a href={b.action.href} target={b.action.external ? '_blank' : undefined} rel="noopener noreferrer" className="link-arrow mt-3 inline-flex !text-[0.8125rem]">
                    {b.action.label}
                  </a>
                )}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-8 border-t border-line pt-6">
            <p className="tag">{t('address.areasTitle')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {company.areaServed[lang].map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>
            <p className="body-sm mt-6 flex items-start gap-2">
              <Icon name="archive" size={15} className="mt-0.5 shrink-0 text-moss" />
              {t('address.lead')}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <MapBlock height="28rem" />
          <Reveal delay={160} className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href={whatsappLink(whatsappMessages.quote[lang])} target="_blank" rel="noopener" className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
              <span className="text-[0.9375rem] font-semibold">{t('cta.quote')}</span>
              <Icon name="whatsapp" size={18} className="text-palm" />
            </a>
            <a href={telLink(1)} className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
              <span className="text-[0.9375rem] font-semibold">{t('cta.callLandline')}</span>
              <Icon name="phone" size={18} className="text-palm" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
