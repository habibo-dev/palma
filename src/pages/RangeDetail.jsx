import { Link, useParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { byCategory, findProduct, categories } from '../content/catalog.js'
import { company, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { tagById, RangeCard } from '../components/RangeCard.jsx'
import { Icon } from '../components/Icons.jsx'
import { Img } from '../components/Img.jsx'
import { Button, Reveal, Section } from '../components/UI.jsx'
import { Seo } from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'

export default function RangeDetail() {
  const { slug } = useParams()
  const { t, L, Ls, lang } = useLang()
  const product = findProduct(slug)

  if (!product) return <NotFound />

  const copy = L(product)
  const tags = (product.tags || []).map(tagById).filter(Boolean)
  const related = [...new Set(product.tags || [])].flatMap((id) => byCategory(id)).filter((p, i, arr) => p.slug !== product.slug && arr.indexOf(p) === i)
  const contextMessage = (whatsappMessages.piece[lang] || whatsappMessages.piece.fr)(copy.name)
  const materials = (product.tags || []).filter((x) => x === 'bois' || x === 'metal').map((x) => L(categories.find((c) => c.id === x)).name)
  const materialLine = materials.length ? materials.join(' + ') : t('materials.title')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: copy.name,
    description: copy.desc,
    category: tags.map((c) => L(c).name).join(' / '),
    brand: { '@type': 'Brand', name: company.legalName },
    audience: { '@type': 'BusinessAudience' },
  }

  return (
    <>
      <Seo path={`/gammes/${product.slug}`} title={`${copy.name} — Palma Meuble, ${company.city}`} description={copy.desc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section tone="shell" className="!pt-[10.5rem] lg:!pt-[15rem]" tight>
        <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-stone">
          <Link to="/" className="hover:text-ink">
            {t('nav.home')}
          </Link>
          <span aria-hidden>/</span>
          <Link to="/gammes" className="hover:text-ink">
            {t('nav.ranges')}
          </Link>
          {tags[0] && (
            <>
              <span aria-hidden>/</span>
              <Link to={`/gammes?tag=${tags[0].id}`} className="hover:text-ink">
                {L(tags[0]).name}
              </Link>
            </>
          )}
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-7">
            <Reveal variant="mask" className="relative">
              <Img src={product.image} alt={`${copy.name} — ${company.name}, ${company.city}`} ratio={1.24} priority sizes="(max-width:1024px) 100vw, 56vw" />
              <span className="absolute end-3 top-3 z-10 rounded-[2px] border border-bone/25 bg-ink/70 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-[2px]">
                {t('visual.tag')}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <p className="body-sm mt-3 flex items-start gap-2 text-stone">
                <Icon name="layers" size={14} className="mt-0.5 shrink-0 text-moss" />
                {t('visual.caption')}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">
                <Icon name={tags[0]?.icon || 'layers'} size={14} />
                {tags.map((c) => L(c).name).join(' · ')}
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

            <Reveal delay={190} className="mt-8">
              <dl className="spec-grid sm:grid-cols-2">
                <div>
                  <dt>{t('range.priceLabel')}</dt>
                  <dd>{t('range.priceValue')}</dd>
                </div>
                <div>
                  <dt>{t('range.availabilityLabel')}</dt>
                  <dd>{t('range.availabilityValue')}</dd>
                </div>
                <div>
                  <dt>{t('range.uses')}</dt>
                  <dd>{tags.map((c) => L(c).name).join(', ')}</dd>
                </div>
                <div>
                  <dt>{t('range.materials')}</dt>
                  <dd>{materialLine}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={230} className="mt-8">
              <p className="tag">{t('ranges.typologies')}</p>
              <ul className="mt-3 grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2">
                {(copy.typologies || []).map((x) => (
                  <li key={x} className="flex items-start gap-2.5 bg-shell px-4 py-3 text-[0.875rem] leading-snug text-ink-soft">
                    <span aria-hidden className="mt-[0.5rem] h-px w-3 shrink-0 bg-moss" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={270} className="mt-8 rounded-soft border border-line bg-bone px-4 py-3.5">
              <p className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-stone">
                <Icon name="measure" size={16} className="mt-0.5 shrink-0 text-moss" />
                {t('range.specsPending')}
              </p>
            </Reveal>

            <Reveal delay={310} className="mt-8 flex flex-wrap gap-3">
              <Button to={`/contact?gamme=${product.slug}#devis`}>{t('range.askThis')}</Button>
              <Button variant="ghost" href={whatsappLink(contextMessage)} icon="whatsapp">
                {t('range.whatsappThis')}
              </Button>
              <Button variant="ghost" to="/contact#catalogue" icon="arrow">
                {t('cta.catalogue')}
              </Button>
              <a href={telLink(0)} dir="ltr" className="link-arrow self-center">
                <Icon name="phone" size={15} />
                {company.phones[0].display}
              </a>
            </Reveal>

            <Reveal delay={340} className="mt-8 border-t border-line pt-5">
              <Link to="/gammes" className="link-arrow">
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
            <h2 className="h3">{t('range.page.nav')}</h2>
            <Link to="/gammes" className="link-arrow shrink-0">
              {t('cta.allRanges')}
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 70} className="h-full">
                <RangeCard product={p} />
              </Reveal>
            ))}
          </ul>
          <p className="body-sm mt-8 max-w-2xl">{t('ranges.lead')}</p>
        </Section>
      )}
    </>
  )
}
