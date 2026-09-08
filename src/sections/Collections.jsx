import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { categories, products } from '../content/catalog.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { Button, Reveal, Section, SectionHead } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

export function Collections({ preview = 8, showFilters = true }) {
  const { t, L } = useLang()
  const [cat, setCat] = useState('all')

  const list = useMemo(() => (cat === 'all' ? products : products.filter((p) => p.category === cat)).slice(0, preview), [cat, preview])

  return (
    <Section id="collections">
      <SectionHead
        eyebrow={t('collections.eyebrow')}
        title={t('collections.title')}
        lead={t('collections.lead')}
        action={
          <Button variant="ghost" to="/collections" className="hidden md:inline-flex">
            {t('cta.allProducts')}
          </Button>
        }
      />

      {showFilters && (
        <Reveal delay={140} className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label={t('collections.filterLabel')}>
          <button type="button" onClick={() => setCat('all')} aria-pressed={cat === 'all'} className={`chip transition-colors ${cat === 'all' ? 'chip--active' : 'hover:border-palm/50'}`}>
            {t('collections.all')}
            <span className="tabular opacity-60">{products.length}</span>
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length
            return (
              <button key={c.id} type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`chip transition-colors ${cat === c.id ? 'chip--active' : 'hover:border-palm/50'}`}>
                <Icon name={c.icon} size={14} />
                {L(c).name}
                <span className="tabular opacity-60">{count}</span>
              </button>
            )
          })}
        </Reveal>
      )}

      {list.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={Math.min(i, 3) * 70} className="h-full">
              <ProductCard product={p} priority={i < 2 && cat === 'all'} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-soft border border-dashed border-line bg-shell px-5 py-8 text-center text-sm text-stone">{t('collections.empty')}</p>
      )}

      <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="body-sm max-w-lg">
          <span className="font-semibold text-ink">{t('product.availability')}.</span> — {t('product.specsPending')}
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" to="/collections" className="md:hidden">
            {t('cta.allProducts')}
          </Button>
          <Button to="/contact#devis">{t('cta.quote')}</Button>
        </div>
      </Reveal>
    </Section>
  )
}
