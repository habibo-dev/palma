import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories, products, tagCount } from '../content/catalog.js'
import { tagById, RangeCard } from '../components/RangeCard.jsx'
import { Icon } from '../components/Icons.jsx'
import { Button, Reveal, Section } from '../components/UI.jsx'
import { Seo } from '../components/Seo.jsx'
import { company, whatsappLink, whatsappMessages } from '../content/company.js'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function RangesPage() {
  const { t, L, lang } = useLang()
  const [params, setParams] = useSearchParams()
  const tag = params.get('tag') || 'all'
  const [q, setQ] = useState('')

  const setTag = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('tag')
    else next.set('tag', id)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return products
      .filter((p) => (tag === 'all' ? true : (p.tags || []).includes(tag)))
      .filter((p) => {
        if (!needle) return true
        const blob = [
          ...Object.values(p.fr),
          ...(p.tags || []).map((id) => Object.values(tagById(id)?.fr || {}).join(' ')),
        ]
          .flat()
          .join(' ')
          .toLowerCase()
        return blob.includes(needle)
      })
  }, [tag, q])

  return (
    <>
      <Seo path="/gammes" title={`${t('nav.ranges')} — ${company.name}, ${company.city}`} description={t('ranges.lead')} />

      <Section tone="shell" className="!pt-[10.5rem] lg:!pt-[15rem]" tight>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">{t('ranges.eyebrow')}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="h1 mt-5">{t('ranges.title')}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-5 max-w-2xl">{t('ranges.lead')}</p>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-4">
            <div className="field">
              <label htmlFor="range-search">{t('ranges.searchLabel')}</label>
              <div className="relative">
                <input id="range-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('ranges.search')} className="input ps-10" />
                <svg className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-stone" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>

        {/* filtres par destination / matière */}
        <Reveal delay={140} className="mt-12 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {[{ id: 'all', name: t('ranges.all') }, ...categories.map((c) => ({ id: c.id, name: L(c).name, text: L(c).text, icon: c.icon }))].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setTag(c.id)}
              aria-pressed={tag === c.id}
              className={`group flex flex-col items-start gap-1.5 p-5 text-start transition-colors duration-[400ms] ${tag === c.id ? 'bg-palm text-bone' : 'bg-shell hover:bg-paper'}`}
            >
              <span className="flex w-full items-center justify-between">
                <span className="h4">{c.name}</span>
                {c.icon ? <Icon name={c.icon} size={17} className={tag === c.id ? 'text-sand' : 'text-stone group-hover:text-palm'} /> : null}
              </span>
              {c.text && <span className={`text-[0.8125rem] leading-snug ${tag === c.id ? 'text-bone/75' : 'text-stone'}`}>{c.text}</span>}
              <span className={`mt-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] ${tag === c.id ? 'text-sand' : 'text-moss'}`}>
                {tagCount(c.id)} {t('ranges.results')}
              </span>
            </button>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="body-sm">
            <span className="font-semibold text-ink tabular">{list.length}</span> {list.length > 1 ? t('ranges.results') : t('ranges.result')}
            {tag !== 'all' && <span className="text-stone"> · {L(tagById(tag)).name}</span>}
          </p>
          <a href={whatsappLink(whatsappMessages.default[lang])} target="_blank" rel="noopener" className="link-arrow">
            {t('sectors.cta')}
          </a>
        </div>

        {list.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 60} className="h-full">
                <RangeCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-soft border border-dashed border-line bg-paper p-10 text-center">
            <p className="mx-auto max-w-md text-ink-soft">{t('ranges.empty')}</p>
            <Link to="/contact#devis" className="btn mt-6 inline-flex">
              {t('cta.quote')}
            </Link>
          </div>
        )}

        <Reveal delay={100} className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-soft border border-line bg-paper p-6">
          <p className="body-sm max-w-xl">
            <span className="font-semibold text-ink">{t('range.availabilityValue')}</span> — {t('range.specsPending')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact#devis">{t('cta.quote')}</Button>
            <Button variant="ghost" to="/contact#catalogue">
              {t('cta.catalogue')}
            </Button>
          </div>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  )
}
