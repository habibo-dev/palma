import { useLang } from '../lib/i18n.jsx'
import { whatsappLink, whatsappMessages } from '../content/company.js'
import { Button, Reveal, Section } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

/**
 * Zone catalogue : aucun PDF fictif n’est publié. Les planches de gammes,
 * finitions et bordereau de quantitatif sont demandés (WhatsApp ou formulaire).
 */
export function CatalogueBand() {
  const { t, lang } = useLang()

  return (
    <Section id="catalogue" tone="palm" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:url('/images/material-02.jpg')] [background-size:cover] [background-position:center] mix-blend-luminosity" />
      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow !text-rattan">
              <Icon name="archive" size={14} />
              {t('catalogue.eyebrow')}
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="h2 mt-5 max-w-xl text-bone">{t('catalogue.title')}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-bone/75">{t('catalogue.body')}</p>
          </Reveal>
          <Reveal delay={200} className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="light" to="/contact#devis">
              {t('catalogue.primary')}
            </Button>
            <Button variant="outline-light" href={whatsappLink(whatsappMessages.catalogue[lang])} icon="whatsapp">
              {t('cta.whatsapp')}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={120} className="rounded-soft border border-bone/15 bg-bone/[0.06] p-6">
            <ul className="divide-y divide-bone/10">
              {t('catalogue.rows').map((row, i) => (
                <li key={row} className="flex items-center gap-3 py-3.5 text-[0.9375rem] text-bone/85 first:pt-0 last:pb-0">
                  <span className="text-[0.6875rem] font-bold tracking-[0.18em] text-rattan tabular">{String(i + 1).padStart(2, '0')}</span>
                  {row}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-bone/10 pt-4 text-[0.75rem] leading-snug text-bone/55">{t('catalogue.note')}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
