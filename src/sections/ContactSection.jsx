import { useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { faq } from '../content/entities.js'
import { company, telLink, whatsappLink, whatsappMessages, mailLink } from '../content/company.js'
import { Icon } from '../components/Icons.jsx'
import { QuoteForm } from '../components/QuoteForm.jsx'
import { Reveal, Section, SectionHead } from '../components/UI.jsx'

/** Bloc devis : formulaire + canaux réellement disponibles. */
export function ContactSection({ withForm = true, context = '' }) {
  const { t, lang } = useLang()
  const emailHref = mailLink()

  return (
    <Section id="devis" tone="bone">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('contact.lead')} />

          <Reveal delay={140} className="mt-10">
            <p className="tag">{t('contact.or')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href={whatsappLink(whatsappMessages.quote[lang])} target="_blank" rel="noopener" className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
                <span className="text-[0.9375rem] font-semibold">{t('cta.whatsapp')}</span>
                <Icon name="whatsapp" size={18} className="text-palm" />
              </a>
              {company.phones.map((p, i) => (
                <a key={p.tel} href={telLink(i)} dir="ltr" className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
                  <span className="tabular text-[0.9375rem] font-semibold">{p.display}</span>
                  <span className="flex items-center gap-1.5 text-stone">
                    <Icon name="phone" size={16} />
                    <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]">{i === 0 ? t('cta.call') : t('cta.callLandline')}</span>
                  </span>
                </a>
              ))}
              {emailHref ? (
                <a href={emailHref} dir="ltr" className="card card--hover flex items-center justify-between gap-3 bg-paper p-4">
                  <span className="text-[0.9375rem] font-semibold">{company.email}</span>
                  <Icon name="mail" size={18} className="text-palm" />
                </a>
              ) : (
                <p className="flex items-start gap-2.5 rounded-soft border border-dashed border-line bg-shell p-4 text-[0.8125rem] leading-snug text-stone">
                  <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-moss" />
                  {t('address.emailPending')}
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">{withForm && <QuoteForm context={context} />}</div>
      </div>
    </Section>
  )
}

/** FAQ — réponses sobres, sans engagement commercial inventé. */
export function Faq() {
  const { t, L } = useLang()
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" tone="shell">
      <SectionHead eyebrow={t('faq.eyebrow')} title={t('faq.title')} />

      <ul className="mt-10 grid gap-px overflow-hidden rounded-soft border border-line bg-line lg:grid-cols-2">
        {faq.map((f, i) => {
          const copy = L(f)
          const on = open === i
          return (
            <Reveal as="li" key={i} delay={(i % 2) * 70} className="bg-shell">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  className="flex w-full items-start justify-between gap-5 px-5 py-5 text-start transition-colors hover:bg-paper"
                >
                  <span className="font-display text-[1.1rem] leading-snug">{copy.q}</span>
                  <Icon name="chevron" size={18} className={`mt-1 shrink-0 text-stone transition-transform duration-500 ${on ? 'rotate-180 text-palm' : ''}`} />
                </button>
              </h3>
              <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!on} className="px-5 pb-5">
                <p className="body-sm max-w-2xl border-t border-line pt-4">{copy.a}</p>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
