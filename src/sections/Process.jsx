import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { process as steps } from '../content/entities.js'
import { Button, Reveal, Section, SectionHead } from '../components/UI.jsx'

export function Process() {
  const { t, L } = useLang()

  return (
    <Section id="methode" tone="bone">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead eyebrow={t('process.eyebrow')} title={t('process.title')} lead={t('process.lead')} />
            <Reveal delay={200} className="mt-9 hidden lg:block">
              <Button to="/contact#devis">{t('cta.quote')}</Button>
              <p className="body-sm mt-4 max-w-sm">{t('contact.lead')}</p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((s, i) => {
            const copy = L(s)
            return (
              <Reveal as="li" key={i} delay={i * 70} className="group relative border-t border-line py-7 last:border-b">
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="num shrink-0 transition-colors duration-500 group-hover:text-clay">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 grow">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="h3">{copy.title}</h3>
                      <span className="chip !border-transparent !bg-transparent !px-0 !text-[0.6875rem] !tracking-[0.14em] uppercase">
                        {copy.step}
                      </span>
                    </div>
                    <p className="body-sm mt-2.5 max-w-2xl">{copy.text}</p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-palm transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-x-100"
                />
              </Reveal>
            )
          })}
        </ol>
      </div>

      <Reveal delay={140} className="mt-9 flex flex-wrap items-center justify-between gap-4 lg:hidden">
        <p className="body-sm max-w-md">{t('process.lead')}</p>
        <Link to="/contact#devis" className="link-arrow">
          {t('cta.quote')}
        </Link>
      </Reveal>
    </Section>
  )
}
