import { useLang } from '../lib/i18n.jsx'
import { withBase } from '../lib/asset.js'
import { company, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { Button, Reveal } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

export function FinalCta() {
  const { t, lang } = useLang()

  return (
    <section className="relative isolate overflow-hidden bg-palm text-bone">
      <div aria-hidden className="absolute inset-0">
        <img src={withBase('/images/fabric-01.jpg')} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-palm via-palm/88 to-palm/72" />
      </div>

      <div className="wrap relative py-20 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow !text-sand">
                <Icon name="factory" size={15} />
                {company.legalName} — {company.address.city}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h1 mt-6 max-w-3xl text-bone">{t('final.title')}</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-bone/75">{t('final.body')}</p>
            </Reveal>
          </div>

          <Reveal delay={180} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button variant="light" to="/contact#devis">
              {t('final.primary')}
            </Button>
            <Button variant="outline-light" href={whatsappLink(whatsappMessages.quote[lang])} icon="whatsapp">
              {t('final.secondary')}
            </Button>
            <a href={telLink(0)} dir="ltr" className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-bone/80 underline decoration-bone/30 underline-offset-4 transition-colors hover:text-bone">
              <Icon name="phone" size={15} />
              {company.phones[0].display}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
