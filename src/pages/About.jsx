import { useLang } from '../lib/i18n.jsx'
import { withBase } from '../lib/asset.js'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.jsx'
import { Button, PageHead, Reveal, Section } from '../components/UI.jsx'
import { Advantages, Materials } from '../sections/Advantages.jsx'
import { Process } from '../sections/Process.jsx'
import { Sectors } from '../sections/Sectors.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'
import { company, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { Icon } from '../components/Icons.jsx'

export default function About() {
  const { t, lang } = useLang()
  const body = t('position.body')

  return (
    <>
      <Seo path="/a-propos" title={`${t('nav.about')} — ${company.legalName}, ${company.city}`} description={body[0]} />

      <PageHead eyebrow={t('position.eyebrow')} title={t('position.title')} lead={t('position.lead')}>
        <Button to="/contact#devis">{t('cta.quote')}</Button>
        <Button variant="ghost" href={whatsappLink(whatsappMessages.default[lang])} icon="whatsapp">
          {t('cta.whatsapp')}
        </Button>
      </PageHead>

      <Section tone="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-5">
              {body.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className={i === 0 ? 'text-[1.15rem] leading-relaxed text-ink-soft' : 'text-[0.9375rem] leading-relaxed text-stone'}>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160} className="mt-10 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-3">
              {t('position.pillars').map((p, i) => (
                <div key={p.title} className="bg-paper p-5">
                  <p className="text-[0.625rem] font-bold tracking-[0.2em] text-moss tabular">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="h4 mt-3">{p.title}</h2>
                  <p className="body-sm mt-1.5">{p.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={220} className="mt-10">
              <dl className="spec-grid sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt>{t('address.addressTitle')}</dt>
                  <dd>{company.address.label[lang]}</dd>
                </div>
                <div>
                  <dt>{t('address.phoneTitle')}</dt>
                  <dd>
                    {company.phones.map((p, i) => (
                      <a key={p.tel} href={telLink(i)} dir="ltr" className="block tabular hover:text-palm">
                        {p.display}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>{t('hero.facts.0.k')}</dt>
                  <dd>{company.activity[lang].join(' · ')}</dd>
                </div>
                <div>
                  <dt>{t('address.areasTitle')}</dt>
                  <dd>{company.areaServed[lang].join(' · ')}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="mask" delay={120}>
              <div className="border-[7px] border-shell bg-shell shadow-[var(--shadow-plate)]">
                <img
                  src={withBase('/images/fabric-01.jpg')}
                  alt={`${company.name} — ${t('address.lead')}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                  style={{ aspectRatio: '0.86', objectFit: 'cover' }}
                />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-sm mt-4 flex items-start gap-2">
                <Icon name="factory" size={15} className="mt-0.5 shrink-0 text-moss" />
                {t('catalogue.body')}
              </p>
              <Link to="/gammes" className="link-arrow mt-4 inline-flex">
                {t('cta.allRanges')}
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <Advantages />
      <Process />
      <Materials />
      <Sectors />
      <CatalogueBand />
      <FinalCta />
    </>
  )
}
