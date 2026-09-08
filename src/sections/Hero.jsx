import { useLang } from '../lib/i18n.jsx'
import { Button, Reveal } from '../components/UI.jsx'
import { Img } from '../components/Img.jsx'
import { Icon } from '../components/Icons.jsx'
import { company } from '../content/company.js'

export function Hero() {
  const { t, lang, Ls } = useLang()
  const facts = t('hero.facts')
  const addressLines = company.address.label[lang].split(' — ')

  return (
    <section className="relative overflow-hidden bg-bone pt-[12.5rem] pb-14 lg:pt-[15.5rem] lg:pb-20">
      {/* trame technique */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,rgba(21,24,27,0.045)_1px,transparent_1px),linear-gradient(rgba(21,24,27,0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(80%_60%_at_30%_20%,#000,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute -end-56 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(51,69,79,0.14),transparent_62%)] blur-2xl" />

      <div className="wrap relative">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
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
          </div>

          {/* visuel */}
          <div className="lg:col-span-6">
            <div className="relative">
              <Reveal variant="mask" className="relative z-10 border-[7px] border-shell bg-shell shadow-[var(--shadow-plate)]">
                <Img
                  src="/images/hero-01.jpg"
                  alt={Ls({
                    fr: 'Espace de travail équipé de bureaux et rangements en bois et métal fournis par Palma Meuble à Constantine.',
                    ar: 'فضاء عمل مجهز بمكاتب و خزائن من الخشب والمعدن من Palma Meuble بقسنطينة.',
                    en: 'Open-plan workspace fitted with desks and storage in wood and steel by Palma Meuble, Constantine.',
                  })}
                  ratio={1.16}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <figcaption className="flex items-start gap-2.5 bg-shell px-4 py-3 text-start text-[0.75rem] leading-snug text-stone">
                  <Icon name="layers" size={14} className="mt-0.5 shrink-0 text-moss" />
                  {t('hero.caption')}
                </figcaption>
              </Reveal>

              {/* étiquette d’adresse, côté image */}
              <Reveal delay={200} className="absolute -bottom-6 -start-4 z-20 hidden lg:block">
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
        <Reveal delay={120} className="mt-16 lg:mt-20">
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
    </section>
  )
}
