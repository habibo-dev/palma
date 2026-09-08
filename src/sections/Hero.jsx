import { useLang } from '../lib/i18n.jsx'
import { Button, Reveal } from '../components/UI.jsx'
import { Img } from '../components/Img.jsx'
import { Icon } from '../components/Icons.jsx'
import { company } from '../content/company.js'

export function Hero() {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden bg-bone pt-[7.25rem] pb-14 lg:pt-[11rem] lg:pb-20">
      {/* trame verticale discrète */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(90deg,rgba(22,21,15,0.05)_1px,transparent_1px)] [background-size:25%_100%] max-lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 -top-32 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,191,149,0.42),transparent_62%)] blur-2xl"
      />

      <div className="wrap relative">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          {/* colonne texte */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
                {t('hero.badge')}
              </p>
            </Reveal>

            <h1 className="h-hero mt-6">
              <Reveal as="span" variant="mask" className="block overflow-hidden">
                <span className="block">{t('hero.titleTop')}</span>
              </Reveal>
              <Reveal as="span" variant="mask" delay={110} className="block overflow-hidden">
                <span className="block italic text-palm">{t('hero.titleBottom')}</span>
              </Reveal>
            </h1>

            <Reveal delay={220}>
              <p className="lead mt-7 max-w-xl">{t('hero.lead')}</p>
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/contact#devis">{t('hero.primary')}</Button>
              <Button variant="ghost" to="/collections">
                {t('hero.secondary')}
              </Button>
            </Reveal>

            <Reveal delay={380} className="mt-11 border-t border-line pt-6">
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
                {t('hero.strip').map((item, i) => (
                  <li key={item} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-soft">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0 text-moss">
                      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* colonne visuelle */}
          <div className="lg:col-span-6">
            <div className="relative">
              <Reveal variant="mask" className="relative z-10">
                <Img
                  src="/images/hero-01.jpg"
                  alt="Showroom Palma à Rouiba : fauteuil en rotin tressé et table de chêne dans un espace baigné de lumière."
                  ratio={1.12}
                  priority
                  imgClassName="drift"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </Reveal>

              {/* étiquette verticale */}
              <span
                aria-hidden
                className="absolute -start-[3.4rem] top-8 hidden text-[0.625rem] font-bold uppercase tracking-[0.34em] text-stone [writing-mode:vertical-rl] xl:block"
              >
                Palma — Atelier {company.address.city}
              </span>

              {/* vignette secondaire chevauchante */}
              <Reveal delay={200} className="absolute -bottom-10 -start-6 z-20 hidden w-[42%] max-w-[15rem] sm:block">
                <div className="rotate-[-2.2deg] border-[6px] border-shell bg-shell shadow-[var(--shadow-lift)] transition-transform duration-700 hover:rotate-0">
                  <Img src="/images/product-01.jpg" alt="Détail du tressage main d'un fauteuil Palma." ratio={0.94} sizes="240px" />
                  <p className="px-2 pb-2 pt-2.5 text-[0.6875rem] leading-snug text-stone">{t('hero.caption')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* bandeau défilant — matières et savoir-faire */}
      <div className="relative mt-16 border-y border-line py-3.5 sm:mt-24">
        <div className="ticker" aria-hidden>
          <div className="ticker__track">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center gap-8 pe-8 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-stone">
              {(lang === 'ar'
                ? ['خشب البلوط', 'خيزران مضفور يدويًا', 'تنجيد في الورشة', 'قياس في المكان', 'قطع قابلة للإصلاح', 'الروبية — الجزائر']
                : lang === 'en'
                  ? ['Oak & walnut', 'Hand-woven rattan', 'Upholstery in-house', 'Measured on site', 'Repairable pieces', 'Rouiba — Algiers']
                  : ['Chêne & noyer', 'Rotin tressé main', 'Tapisserie d’atelier', 'Métrés sur place', 'Pièces réparables', 'Rouiba — Alger'
                ]
              ).map((w) => (
                <span key={w} className="flex items-center gap-8">
                  {w}
                  <Icon name="leaf" size={13} className="text-moss" />
                </span>
              ))}
            </span>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
