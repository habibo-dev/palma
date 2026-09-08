import { useEffect, useRef, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { company, primaryPhone, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { products } from '../content/catalog.js'
import { sectors } from '../content/entities.js'
import { Button, Reveal } from '../components/UI.jsx'
import { Img } from '../components/Img.jsx'
import { Icon } from '../components/Icons.jsx'

/** Léger déplacement de l’image au scroll — désactivé si l’utilisateur limite les animations. */
function useParallax(strength = 0.07) {
  const ref = useRef(null)
  const [shift, setShift] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = -1
    const onScroll = () => {
      if (last === window.scrollY) return
      last = window.scrollY
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setShift(y < 1200 ? Math.round(y * strength * 10) / 10 : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return [ref, shift]
}

export function Hero() {
  const { t, lang, Ls } = useLang()
  const facts = t('hero.facts')
  const addressLines = company.address.label[lang].split(' — ')
  const [visualRef, shift] = useParallax()

  const tickerItems = [
    ...products.map((p) => p[lang]?.name || p.fr.name),
    t('hero.countPrice'),
    t('cta.quote'),
  ]

  return (
    <section className="relative overflow-hidden bg-bone pt-[10.5rem] pb-0 lg:pt-[15rem]">
      {/* trame technique */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,rgba(21,24,27,0.045)_1px,transparent_1px),linear-gradient(rgba(21,24,27,0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(80%_60%_at_30%_20%,#000,transparent)]"
      />
      <div aria-hidden className="drift pointer-events-none absolute -end-56 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(51,69,79,0.16),transparent_62%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -start-40 top-[38%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,69,54,0.10),transparent_65%)] blur-2xl" />

      <div className="wrap relative">
        {/* ligne d’index — uniquement des données issues du catalogue */}
        <Reveal className="mb-12 hidden items-center justify-between gap-8 border-y border-line py-3 lg:flex">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-stone">
            <span>
              <span className="me-1.5 font-display text-[1rem] tracking-normal text-ink tabular">{products.length}</span>
              {t('hero.countFamilies')}
            </span>
            <span aria-hidden className="h-px w-7 bg-line" />
            <span>
              <span className="me-1.5 font-display text-[1rem] tracking-normal text-ink tabular">{sectors.length}</span>
              {t('hero.countBuyers')}
            </span>
            <span aria-hidden className="h-px w-7 bg-line" />
            <span className="text-moss">{t('hero.countPrice')}</span>
          </p>
          <a href={telLink(0)} dir="ltr" className="link-arrow shrink-0 !border-none !p-0">
            <Icon name="phone" size={15} />
            {primaryPhone.display}
          </a>
        </Reveal>

        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12 lg:pb-20">
          {/* texte */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-oak" aria-hidden />
                {t('hero.badge')}
              </p>
            </Reveal>

            <h1 className="h-hero mt-6">
              <Reveal as="span" variant="mask" className="block overflow-hidden">
                <span className="block">{t('hero.titleTop')}</span>
              </Reveal>
              <Reveal as="span" variant="mask" delay={110} className="block overflow-hidden">
                <span className="block text-palm">{t('hero.titleBottom')}</span>
              </Reveal>
            </h1>

            <Reveal delay={220}>
              <p className="lead mt-7 max-w-xl">{t('hero.lead')}</p>
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/contact#devis">{t('hero.primary')}</Button>
              <Button variant="ghost" to="/gammes">
                {t('hero.secondary')}
              </Button>
              <a href={whatsappLink(whatsappMessages.default[lang])} target="_blank" rel="noopener" className="link-arrow ms-1">
                <Icon name="whatsapp" size={16} />
                WhatsApp
              </a>
            </Reveal>

            {/* fiche d’identité pro — uniquement des données déclarées */}
            <Reveal delay={380} className="mt-11">
              <dl className="spec-grid sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={460} className="mt-9 hidden lg:block">
              <a href="#gammes" className="group inline-flex items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-stone transition-colors hover:text-ink">
                <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-line">
                  <span className="absolute inset-x-0 top-0 h-3.5 animate-[palma-scroll_2.4s_var(--ease-out-quart)_infinite] bg-palm" />
                </span>
                {t('hero.scroll')}
              </a>
            </Reveal>
          </div>

          {/* visuel */}
          <div className="lg:col-span-6">
            <div ref={visualRef} className="relative" style={{ transform: `translate3d(0, ${-shift}px, 0)` }}>
              <Reveal variant="mask" className="relative z-10 border-[7px] border-shell bg-shell shadow-[var(--shadow-plate)]">
                <Img
                  src="/images/hero-01.jpg"
                  imgClassName="drift"
                  alt={Ls({
                    fr: 'Espace de travail équipé de bureaux et rangements en bois et métal fournis par Palma Meuble à Constantine.',
                    ar: 'فضاء عمل مجهز بمكاتب و خزائن من الخشب والمعدن من Palma Meuble بقسنطينة.',
                    en: 'Open-plan workspace fitted with desks and storage in wood and steel by Palma Meuble, Constantine.',
                  })}
                  ratio={1.16}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute end-3 top-3 z-20 rounded-[2px] border border-bone/25 bg-ink/70 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-[2px]">
                  {t('visual.tag')}
                </span>
                <figcaption className="flex items-start gap-2.5 bg-shell px-4 py-3 text-start text-[0.75rem] leading-snug text-stone">
                  <Icon name="layers" size={14} className="mt-0.5 shrink-0 text-moss" />
                  {t('hero.caption')}
                </figcaption>
              </Reveal>

              {/* seconde ligne métier, en insert : le scolaire */}
              <Reveal delay={260} className="absolute -bottom-14 -end-5 z-20 hidden w-[42%] xl:block">
                <div className="border-[6px] border-shell bg-shell shadow-[var(--shadow-plate)]">
                  <Img src="/images/range-06.jpg" alt={t('hero.insetAlt')} ratio={1.06} sizes="(max-width: 1280px) 0px, 30vw" />
                  <p className="bg-palm px-3 py-2 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-bone">
                    {products.find((p) => p.slug === 'mobilier-scolaire')?.[lang]?.name || ''}
                  </p>
                </div>
              </Reveal>

              {/* étiquette d’adresse, côté image */}
              <Reveal delay={200} className="absolute -bottom-6 -start-4 z-30 hidden lg:block">
                <div className="rounded-soft border border-line bg-paper px-4 py-3 shadow-[var(--shadow-lift)]">
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-stone">{t('address.eyebrow')}</p>
                  <p className="mt-1.5 font-display text-[1.0625rem] leading-tight text-ink">{addressLines[0]}</p>
                  <p className="text-[0.8125rem] text-stone">{addressLines[1]}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* barre de capacités — ce que l’acheteur retient */}
        <Reveal delay={120} className="pt-4 lg:pt-0">
          <ul className="grid gap-px overflow-hidden rounded-soft border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
            {t('capabilities.items').map((c, i) => (
              <li key={c.title} className="group flex gap-3.5 bg-shell p-5 transition-colors duration-500 hover:bg-paper">
                <span className="mt-0.5 shrink-0 text-[0.6875rem] font-bold tracking-[0.2em] text-moss tabular">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="h4">{c.title}</h2>
                  <p className="body-sm mt-1.5">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* bandeau des familles — plein cadre, rythmique, sans promesse chiffrée */}
      <div aria-hidden className="ticker mt-16 border-y border-ink/12 bg-palm py-3.5 lg:mt-20">
        <div className="ticker__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {tickerItems.map((label) => (
                <li key={`${copy}-${label}`} className="flex items-center gap-5 whitespace-nowrap px-5 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-bone/85">
                  {label}
                  <span className="h-1 w-1 rounded-full bg-sand" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
