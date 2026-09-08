import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { categories, products, tagCount } from '../content/catalog.js'
import { RangeCard } from '../components/RangeCard.jsx'
import { Button, Reveal, Section, SectionHead } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

/** Bloc « Nos gammes » de la page d’accueil : filtres par destination / matière. */
export function Ranges({ preview = 6, showFilters = true }) {
  const { t, L } = useLang()
  const [tag, setTag] = useState('all')

  const list = useMemo(() => {
    const base = tag === 'all' ? products : products.filter((p) => (p.tags || []).includes(tag))
    return base.slice(0, preview)
  }, [tag, preview])

  return (
    <Section id="gammes" tone="bone">
      <SectionHead
        eyebrow={t('ranges.eyebrow')}
        title={t('ranges.title')}
        lead={t('ranges.lead')}
        action={
          <Button variant="ghost" to="/gammes" className="hidden md:inline-flex">
            {t('cta.allRanges')}
          </Button>
        }
      />

      {showFilters && (
        <Reveal delay={140} className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label={t('ranges.filterLabel')}>
          <button type="button" onClick={() => setTag('all')} aria-pressed={tag === 'all'} className={`chip transition-colors ${tag === 'all' ? 'chip--active' : 'hover:border-palm/50'}`}>
            {t('ranges.all')}
            <span className="tabular opacity-60">{products.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} type="button" onClick={() => setTag(c.id)} aria-pressed={tag === c.id} className={`chip transition-colors ${tag === c.id ? 'chip--active' : 'hover:border-palm/50'}`}>
              <Icon name={c.icon} size={14} />
              {L(c).name}
              <span className="tabular opacity-60">{tagCount(c.id)}</span>
            </button>
          ))}
        </Reveal>
      )}

      {list.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={Math.min(i, 2) * 70} className="h-full">
              <RangeCard product={p} priority={i === 0 && tag === 'all'} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-soft border border-dashed border-line bg-shell px-5 py-8 text-center text-sm text-stone">{t('ranges.empty')}</p>
      )}

      <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="body-sm max-w-xl">
          <span className="font-semibold text-ink">{t('range.availabilityValue')}</span> — {t('range.specsPending')}
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" to="/gammes" className="md:hidden">
            {t('cta.allRanges')}
          </Button>
          <Button to="/contact#devis">{t('cta.quote')}</Button>
        </div>
      </Reveal>
    </Section>
  )
}
