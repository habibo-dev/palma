import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { sectors } from '../content/entities.js'
import { company } from '../content/company.js'
import { Img } from '../components/Img.jsx'
import { Reveal, Section, SectionHead } from '../components/UI.jsx'

/**
 * Liste editoriale des secteurs. Sur desktop, une image suit la ligne survolee ;
 * sur mobile, chaque ligne porte sa propre image.
 */
export function Sectors() {
  const { t, L } = useLang()
  const [active, setActive] = useState(sectors[0].id)
  const activeSector = sectors.find((s) => s.id === active) || sectors[0]

  return (
    <Section id="pour-qui" tone="bone">
      <SectionHead eyebrow={t('sectors.eyebrow')} title={t('sectors.title')} lead={t('sectors.lead')} />

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        {/* panneau visuel (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-32">
            <div className="relative overflow-hidden rounded-soft bg-sand-soft" style={{ aspectRatio: '0.8' }}>
              {sectors.map((s) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt={`${L(s).name} — ${company.name}, ${company.city}`}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-quart)] ${
                    s.id === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-bone/70">{t('sectors.approach')}</p>
                <p className="mt-2 font-display text-[1.35rem] leading-tight text-bone">{L(activeSector).name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* lignes */}
        <ul className="lg:col-span-7" onMouseLeave={() => setActive(sectors[0].id)}>
          {sectors.map((s, i) => {
            const copy = L(s)
            const on = s.id === active
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 60}
                className="group border-t border-line last:border-b"
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
              >
                <div className="relative py-6">
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 -start-4 w-px bg-palm transition-transform duration-500 ease-[var(--ease-out-quart)] ${
                      on ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className={`mt-1 font-display text-[0.8125rem] tabular transition-colors duration-500 ${on ? 'text-clay' : 'text-stone'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 grow">
                      <h3 className={`h3 transition-colors duration-500 ${on ? 'text-palm' : 'text-ink'}`}>{copy.name}</h3>

                      <p className="mt-2 text-[0.9375rem] text-ink-soft">
                        <span className="tag me-1.5 align-middle">{t('sectors.problem')}</span>
                        {copy.problem}
                      </p>
                      <p className="body-sm mt-2 max-w-2xl">{copy.text}</p>

                      {/* image en ligne sur mobile */}
                      <div className="mt-4 lg:hidden">
                        <Img src={s.image} alt={`${copy.name} — ${company.name}, ${company.city}`} ratio={1.6} sizes="(max-width:1024px) 92vw, 0px" />
                      </div>

                      {i === 0 && (
                        <Link to="/contact#devis" className="link-arrow mt-4 inline-flex">
                          {t('sectors.cta')}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
