import { useLang } from '../lib/i18n.jsx'
import { LinkArrow, Reveal, Section } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

export function Position() {
  const { t } = useLang()
  const body = t('position.body')
  const mark = String(t('position.titleMark') || '').trim()
  const marked = mark
    ? t('position.title')
        .split(/\s+/)
        .map((w, i) =>
          w.replace(/[.,;:!?]/g, '') === mark ? (
            <em key={i} className="italic text-clay">
              {w}
            </em>
          ) : (
            <span key={i}>{w}</span>
          ),
        )
        .reduce((acc, el, i, arr) => (i ? [...acc, ' ', el] : [el]), [])
    : t('position.title')
  const pillars = t('position.pillars')

  return (
    <Section id="position" tone="shell">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">{t('position.eyebrow')}</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h2 mt-5 max-w-md">{marked}</h2>
            </Reveal>
            <Reveal delay={140} className="mt-8 hidden lg:block">
              <LinkArrow to="/a-propos#methode">{t('position.link')}</LinkArrow>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-5">
            {body.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className={i === 0 ? 'text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.2rem] sm:leading-[1.6]' : 'text-[0.9375rem] leading-relaxed text-stone'}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={100 + i * 90} className="group bg-shell p-5 transition-colors duration-500 hover:bg-paper">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-bold tracking-[0.2em] text-moss tabular">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={['measure', 'saw', 'layers'][i]} size={18} className="text-stone transition-colors duration-500 group-hover:text-palm" />
                </div>
                <h3 className="h4 mt-4">{p.title}</h3>
                <p className="body-sm mt-2">{p.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-6 lg:hidden">
            <LinkArrow to="/a-propos#methode">{t('position.link')}</LinkArrow>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/** Petite variation utilisee sur la page À propos. */
export function PositionShort() {
  const { t } = useLang()
  return (
    <Section tone="bone" tight>
      <div className="rule grid gap-6 pt-10 md:grid-cols-3">
        {t('position.pillars').map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="flex gap-3">
            <Icon name={['measure', 'saw', 'layers'][i]} size={20} className="mt-0.5 shrink-0 text-moss" />
            <div>
              <h3 className="h4">{p.title}</h3>
              <p className="body-sm mt-1">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
