import { Link, useParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { byCategory, findProduct, products } from '../content/catalog.js'
import { materials } from '../content/entities.js'
import { company, whatsappLink } from '../content/company.js'
import { catById, ProductCard } from '../components/ProductCard.jsx'
import { Icon } from '../components/Icons.jsx'
import { Img } from '../components/Img.jsx'
import { Button, Reveal, Section } from '../components/UI.jsx'
import { Seo } from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const { t, L, lang } = useLang()
  const product = findProduct(slug)

  if (!product) return <NotFound />

  const copy = L(product)
  const cat = catById(product.category)
  const catCopy = L(cat)
  const related = byCategory(product.category).filter((p) => p.slug !== product.slug)
  const quoteMessage =
    lang === 'ar'
      ? `السلام، أرغب في عرض سعر لـ «${copy.name}».`
      : lang === 'en'
        ? `Hello, I would like a quote for the ${copy.name}.`
        : `Bonjour, je souhaite un devis pour la pièce « ${copy.name} » vue sur votre site.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: copy.name,
    description: copy.desc,
    category: catCopy.name,
    brand: { '@type': 'Brand', name: company.name },
    image: `https://palma.dz${product.image}`,
    offers: { '@type': 'Offer', availability: 'https://schema.org/LimitedAvailability', priceCurrency: 'DZD', description: t('product.priceValue') },
  }

  return (
    <>
      <Seo path={`/collections/${product.slug}`} title={`${copy.name} — Palma, ${catCopy.name}`} description={copy.desc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section tone="shell" className="!pt-[8.5rem] lg:!pt-[10.5rem]" tight>
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-stone">
          <Link to="/" className="hover:text-ink">
            {t('nav.home')}
          </Link>
          <span aria-hidden>/</span>
          <Link to="/collections" className="hover:text-ink">
            {t('nav.collections')}
          </Link>
          <span aria-hidden>/</span>
          <Link to={`/collections?cat=${cat.id}`} className="hover:text-ink">
            {catCopy.name}
          </Link>
        </nav>
      </Section>

      <Section tone="shell" className="!pt-4 lg:!pt-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-14">
          <Reveal variant="mask" className="lg:col-span-7">
            <Img src={product.image} alt={`${copy.name} — ${catCopy.name}, fabrication Palma à Rouiba`} ratio={1.24} priority sizes="(max-width:1024px) 100vw, 58vw" />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">
                <Icon name={cat.icon} size={14} />
                {catCopy.name}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="h1 mt-4">{copy.name}</h1>
            </Reveal>
            <Reveal delay={110}>
              <p className="lead mt-5">{copy.desc}</p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-soft">{copy.detail}</p>
            </Reveal>

            <Reveal delay={190} className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-soft border border-line bg-line">
              <div className="bg-paper p-4">
                <p className="tag">{t('product.priceLabel')}</p>
                <p className="mt-1.5 font-display text-[1.0625rem]">{t('product.priceValue')}</p>
              </div>
              <div className="bg-paper p-4">
                <p className="tag">{t('product.availability')}</p>
                <p className="mt-1.5 text-[0.875rem] text-ink-soft">{t('materials.cta')}</p>
              </div>
            </Reveal>

            {(product.materialsKey || []).length > 0 && (
              <Reveal delay={220} className="mt-8">
                <p className="tag">{t('product.materials')}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.materialsKey.map((key) => {
                    const m = materials.find((x) => x.id === key)
                    if (!m) return null
                    const mc = L(m)
                    return (
                      <li key={key} className="chip">
                        <i aria-hidden className="h-2 w-2 rounded-full" style={{ background: m.tint }} />
                        {mc.name}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )}

            <Reveal delay={260} className="mt-8 rounded-soft border border-line bg-bone px-4 py-3.5">
              <p className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-stone">
                <Icon name="measure" size={16} className="mt-0.5 shrink-0 text-moss" />
                {t('product.specsPending')}
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-8 flex flex-wrap gap-3">
              <Button to={`/contact?piece=${product.slug}#devis`}>{t('product.askThis')}</Button>
              <Button variant="ghost" href={whatsappLink(quoteMessage)} icon="whatsapp">
                {t('product.whatsappThis')}
              </Button>
            </Reveal>

            <Reveal delay={340} className="mt-8 border-t border-line pt-5">
              <Link to="/collections" className="link-arrow">
                <Icon name="arrow" size={15} className="rotate-180" />
                {t('cta.back')}
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="bone">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h2 className="h3">{t('product.page.nav')}</h2>
            <Link to={`/collections?cat=${cat.id}`} className="link-arrow shrink-0">
              {catCopy.name}
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 70} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
          <p className="body-sm mt-8 max-w-2xl">
            {products.length} {t('collections.results')} {t('product.availability').toLowerCase()} — {t('collections.lead')}
          </p>
        </Section>
      )}
    </>
  )
}
