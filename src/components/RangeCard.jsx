import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories } from '../content/catalog.js'
import { Img } from './Img.jsx'
import { company } from '../content/company.js'
import { Icon } from './Icons.jsx'

export const tagById = (id) => categories.find((c) => c.id === id)
export const tagsOf = (range) => (range.tags || []).map(tagById).filter(Boolean)

/** Carte de gamme — niveau famille, jamais produit nominatif. */
export function RangeCard({ product, priority = false }) {
  const { t, L, Ls, lang } = useLang()
  const copy = L(product)
  const tags = tagsOf(product)
  const typologies = copy.typologies || []

  return (
    <article className="card card--hover group flex h-full flex-col overflow-hidden">
      <Link to={`/gammes/${product.slug}`} className="flex h-full flex-col" aria-label={copy.name}>
        <div className="relative">
          <Img src={product.image} alt={`${copy.name} — ${company.name}, ${company.city}`} ratio={product.ratio || 1.32} priority={priority} />
          {product.mark && (
            <span className="absolute start-3 top-3 rounded-[2px] bg-palm/92 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-[2px]">
              {Ls(product.mark)}
            </span>
          )}
          <span className="absolute end-3 top-3 rounded-[2px] border border-line bg-paper/92 px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-stone">
            {typologies.length} {t('ranges.itemsWord')}
          </span>
        </div>

        <div className="flex grow flex-col p-5">
          <p className="tag">{tags.map((c) => L(c).name).join(' · ')}</p>
          <h3 className="h3 mt-2 transition-colors group-hover:text-palm">{copy.name}</h3>
          <p className="body-sm mt-2.5 grow">{copy.desc}</p>

          <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
            {typologies.slice(0, 3).map((x) => (
              <li key={x} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-soft">
                <span aria-hidden className="mt-[0.45rem] h-px w-3 shrink-0 bg-moss" />
                {x}
              </li>
            ))}
            {typologies.length > 3 && (
              <li className="pt-0.5 text-[0.75rem] font-semibold text-moss">
                + {typologies.length - 3} {t('ranges.itemsWord')}
              </li>
            )}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <div className="leading-tight">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-stone">{t('range.priceLabel')}</p>
              <p className="mt-1 font-display text-[1rem] text-ink">{t('range.priceValue')}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-palm">
              {t('cta.details')}
              <Icon name="arrow" size={15} className="flip transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
