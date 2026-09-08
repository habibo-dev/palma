import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories, products } from '../content/catalog.js'
import { catById, ProductCard } from '../components/ProductCard.jsx'
import { Icon } from '../components/Icons.jsx'
import { Reveal, Section } from '../components/UI.jsx'
import { Seo } from '../components/Seo.jsx'
import { whatsappLink } from '../content/company.js'

export default function Products() {
  const { t, L } = useLang()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const [q, setQ] = useState('')

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return products
      .filter((p) => (cat === 'all' ? true : p.category === cat))
      .filter((p) => {
        if (!needle) return true
        const blob = Object.values(p.fr).join(' ') + ' ' + Object.values(catById(p.category)?.fr || {}).join(' ')
        return blob.toLowerCase().includes(needle)
      })
  }, [cat, q])

  return (
    <>
      <Seo
        path="/collections"
        title={`${t('nav.collections')} — Palma, Alger`}
        description={t('collections.lead')}
      />

      <Section tone="shell" className="!pt-[8.5rem] lg:!pt-[11rem]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">{t('collections.eyebrow')}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="h1 mt-5">{t('collections.title')}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-2xl">{t('collections.lead')}</p>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-4">
            <div className="field">
              <label htmlFor="cat-search">{t('collections.searchLabel')}</label>
              <div className="relative">
                <input
                  id="cat-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t('collections.search')}
                  className="input ps-10"
                />
                <svg className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-stone" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>

        {/* categories */}
        <Reveal delay={140} className="mt-12 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[{ id: 'all', name: t('collections.all') }, ...categories.map((c) => ({ id: c.id, name: L(c).name, icon: c.icon, text: L(c).text }))].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={`group flex flex-col items-start gap-1.5 p-5 text-start transition-colors duration-[400ms] ${
                cat === c.id ? 'bg-palm text-bone' : 'bg-shell hover:bg-paper'
              }`}
            >
              <span className="flex w-full items-center justify-between">
                <span className="h4">{c.name}</span>
                {c.icon ? <Icon name={c.icon} size={18} className={cat === c.id ? 'text-rattan' : 'text-stone group-hover:text-palm'} /> : null}
              </span>
              {c.text && <span className={`text-[0.8125rem] leading-snug ${cat === c.id ? 'text-bone/75' : 'text-stone'}`}>{c.text}</span>}
              <span className={`mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] ${cat === c.id ? 'text-rattan' : 'text-moss'}`}>
                {products.filter((p) => c.id === 'all' || p.category === c.id).length} {t('collections.results')}
              </span>
            </button>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="body-sm">
            <span className="font-semibold text-ink tabular">{list.length}</span> {list.length > 1 ? t('collections.results') : t('collections.result')}
            {cat !== 'all' && <span className="text-stone"> · {L(catById(cat)).name}</span>}
          </p>
          <a href={whatsappLink('Bonjour, je cherche une pièce qui ne figure pas dans votre catalogue.')} target="_blank" rel="noopener" className="link-arrow">
            {t('sectors.cta')}
          </a>
        </div>

        {list.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 4) * 60} className="h-full">
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-soft border border-dashed border-line bg-paper p-10 text-center">
            <p className="mx-auto max-w-md text-ink-soft">{t('collections.empty')}</p>
            <Link to="/contact#devis" className="btn mt-6 inline-flex">
              {t('cta.quote')}
            </Link>
          </div>
        )}
      </Section>
    </>
  )
}
