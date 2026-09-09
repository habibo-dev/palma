import { useLang } from '../lib/i18n.jsx'
import { withBase } from '../lib/asset.js'
import { company } from '../content/company.js'
import { advantages, materials } from '../content/entities.js'
import { Reveal, Section, SectionHead } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

export function Advantages() {
  const { t, L } = useLang()

  return (
    <Section id="atouts" tone="shell">
      <SectionHead eyebrow={t('advantages.eyebrow')} title={t('advantages.title')} lead={t('advantages.lead')} align="left" />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
        {advantages.map((a, i) => {
          const copy = L(a)
          return (
            <Reveal as="li" key={a.icon} delay={(i % 3) * 80} className="group relative bg-shell p-6 transition-colors duration-500 hover:bg-paper">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-clay transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-x-100"
              />
              <Icon name={a.icon} size={22} className="text-moss transition-colors duration-500 group-hover:text-palm" />
              <h3 className="h4 mt-5">{copy.title}</h3>
              <p className="body-sm mt-2.5">{copy.text}</p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}

export function Materials({ head = true }) {
  const { t, L } = useLang()

  return (
    <Section id="materiaux" tone="bone" tight={!head}>
      {head && <SectionHead eyebrow={t('materials.eyebrow')} title={t('materials.title')} lead={t('materials.lead')} />}

      <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 lg:grid-cols-8">
        {materials.map((m, i) => {
          const copy = L(m)
          return (
            <Reveal key={m.id} delay={i * 45} className="w-40 shrink-0 snap-start md:w-auto">
              <figure className="group">
                <div className="relative overflow-hidden rounded-soft" style={{ aspectRatio: '0.78' }}>
                  <img
                    src={withBase(m.texture)}
                    alt={`${copy.name} — ${company.name}, ${company.city}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.08]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: m.tint, opacity: 0.55 }}
                  />
                  <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-ink/10" style={{ background: `linear-gradient(160deg, ${m.tint}55, transparent 65%)` }} />
                </div>
                <figcaption className="mt-3">
                  <p className="text-[0.875rem] font-semibold leading-tight">{copy.name}</p>
                  {head && <p className="body-sm mt-1 text-[0.8125rem] leading-snug">{copy.text}</p>}
                </figcaption>
              </figure>
            </Reveal>
          )
        })}
      </div>

      {head && <p className="body-sm mt-7 border-t border-line pt-5 max-w-2xl">{t('materials.note')}</p>}
    </Section>
  )
}
