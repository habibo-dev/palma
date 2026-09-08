import { useLang } from '../lib/i18n.jsx'
import { whatsappLink } from '../content/company.js'
import { Button, Reveal } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

export function FinalCta() {
  const { t, lang } = useLang()

  return (
    <section className="relative isolate overflow-hidden bg-palm text-bone">
      <div aria-hidden className="absolute inset-0">
        <img src="/images/hero-02.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-palm via-palm/85 to-palm/70" />
      </div>

      <div className="wrap relative py-24 lg:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow !text-rattan">
                <Icon name="palm" size={15} />
                Palma — {lang === 'ar' ? 'الروبية، الجزائر العاصمة' : lang === 'en' ? 'Rouiba, Algiers' : 'Rouiba, Alger'}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h-hero mt-6 max-w-3xl text-bone">{t('final.title')}</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-bone/75">{t('final.body')}</p>
            </Reveal>
          </div>

          <Reveal delay={180} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button variant="light" to="/contact#devis">
              {t('final.primary')}
            </Button>
            <Button variant="outline-light" href={whatsappLink('Bonjour, je souhaite avoir plus d’informations concernant vos produits.')} icon="whatsapp">
              {t('final.secondary')}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
