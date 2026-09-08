import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { categories } from '../content/catalog.js'
import { materials } from '../content/entities.js'
import { Img } from './Img.jsx'
import { Icon } from './Icons.jsx'

export const catById = (id) => categories.find((c) => c.id === id)

export function ProductCard({ product, index = 0, priority = false }) {
  const { t, L, Ls } = useLang()
  const cat = catById(product.category)
  const copy = L(product)
  const catCopy = cat ? L(cat) : { name: '' }

  return (
    <article className="card card--hover group flex h-full flex-col overflow-hidden">
      <Link to={`/collections/${product.slug}`} className="flex h-full flex-col" aria-label={copy.name}>
        <div className="relative">
          <Img src={product.image} alt={`${copy.name} — ${catCopy.name}`} ratio={product.ratio} priority={priority} />
          {product.badge && (
            <span className="absolute start-3 top-3 rounded-full bg-palm/92 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-[2px]">
              {Ls(product.badge)}
            </span>
          )}
        </div>

        <div className="flex grow flex-col p-5">
          <p className="tag">{catCopy.name}</p>
          <h3 className="h3 mt-2 transition-colors group-hover:text-palm">{copy.name}</h3>
          <p className="body-sm mt-2.5 grow">{copy.desc}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {(product.materialsKey || []).slice(0, 3).map((key) => {
              const m = materials.find((x) => x.id === key)
              if (!m) return null
              const mc = L(m)
              return (
                <span key={key} className="chip !bg-transparent !text-[0.6875rem]">
                  <i aria-hidden className="h-2 w-2 rounded-full" style={{ background: m.tint }} />
                  {mc.name}
                </span>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <div className="leading-tight">
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-stone">{t('product.priceLabel')}</p>
              <p className="mt-1 font-display text-[1.0625rem] text-ink">{t('product.priceValue')}</p>
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
