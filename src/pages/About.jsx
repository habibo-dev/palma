import { useLang } from '../lib/i18n.jsx'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.jsx'
import { Reveal, Section } from '../components/UI.jsx'
import { Advantages, Materials } from '../sections/Advantages.jsx'
import { Process } from '../sections/Process.jsx'
import { Sectors } from '../sections/Sectors.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function About() {
  const { t, L } = useLang()
  const body = t('position.body')

  return (
    <>
      <Seo path="/a-propos" title={`${t('nav.about')} — Palma, mobilier & aménagement`} description={body[0]} />

      <Section tone="shell" className="!pt-[9rem] lg:!pt-[12rem]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{t('position.eyebrow')}</p>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="h1 mt-5 max-w-2xl">{t('position.title')}</h1>
            </Reveal>
            <div className="mt-8 max-w-2xl space-y-5">
              {body.map((p, i) => (
                <Reveal key={i} delay={110 + i * 80}>
                  <p className={i === 0 ? 'text-[1.15rem] leading-relaxed text-ink-soft' : 'text-[0.9375rem] leading-relaxed text-stone'}>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={260} className="mt-10 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-3">
              {t('position.pillars').map((p, i) => (
                <div key={p.title} className="bg-paper p-5">
                  <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-moss tabular">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="h4 mt-3">{p.title}</h2>
                  <p className="body-sm mt-1.5">{p.text}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="mask" delay={120}>
              <div className="border-[7px] border-shell bg-shell shadow-[var(--shadow-lift)]">
                <img src="/images/ambiance-05.jpg" alt="Atelier Palma : plan de travail en chêne et assises en rotin en cours de finition." loading="lazy" decoding="async" className="w-full" style={{ aspectRatio: '0.86', objectFit: 'cover' }} />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-sm mt-4 flex items-start gap-2">
                <Link to="/contact" className="link-arrow ms-auto shrink-0">
                  {t('nav.contact')}
                </Link>
              </p>
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
