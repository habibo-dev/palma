import { useLang } from '../lib/i18n.jsx'
import { ambiances } from '../content/entities.js'
import { Img } from '../components/Img.jsx'
import { Icon } from '../components/Icons.jsx'
import { Reveal, Section } from '../components/UI.jsx'

const SPAN = { wide: 'lg:col-span-8', tall: 'lg:col-span-4 lg:row-span-2', square: 'lg:col-span-4' }
const RATIO = { wide: 1.62, tall: 0.78, square: 1.06 }

/**
 * « Applications » et non « Réalisations » : aucune référence client n’est
 * affirmée tant que l’entreprise n’a pas autorisé la publication des photos.
 */
export function Applications() {
  const { t, L } = useLang()

  return (
    <Section id="applications" tone="ink" className="!bg-ink !text-bone">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow !text-rattan">
              <Icon name="layers" size={14} />
              {t('applications.eyebrow')}
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="h2 mt-5 text-bone">{t('applications.title')}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead mt-5 text-bone/70">{t('applications.lead')}</p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="flex max-w-64 items-start gap-2 border-s border-rattan/40 ps-4 text-[0.75rem] leading-snug text-bone/55">
            <Icon name="measure" size={14} className="mt-0.5 shrink-0 text-rattan" />
            {t('applications.note')}
          </p>
        </Reveal>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {ambiances.map((a, i) => {
          const copy = L(a)
          return (
            <Reveal as="li" key={a.image + i} delay={(i % 3) * 90} className={`${SPAN[a.span]} group relative`}>
              <div className="relative h-full overflow-hidden rounded-soft">
                <Img
                  src={a.image}
                  alt={`${copy.title} — ${copy.text}`}
                  ratio={RATIO[a.span]}
                  className="h-full"
                  imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="font-display text-[1.15rem] leading-tight text-bone sm:text-[1.3rem]">{copy.title}</p>
                    <p className="mt-1.5 text-[0.8125rem] leading-snug text-bone/70">{copy.text}</p>
                  </div>
                  <span className="hidden shrink-0 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-rattan sm:block">{String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
