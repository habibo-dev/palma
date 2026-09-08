import { useSearchParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { findProduct } from '../content/catalog.js'
import { Seo } from '../components/Seo.jsx'
import { Button, PageHead } from '../components/UI.jsx'
import { company, telLink, whatsappLink, whatsappMessages } from '../content/company.js'
import { Address } from '../sections/Address.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { ContactSection, Faq } from '../sections/ContactSection.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function Contact() {
  const { t, L, lang } = useLang()
  const [params] = useSearchParams()
  const gamme = params.get('gamme')
  const product = gamme ? findProduct(gamme) : null
  const context = product ? L(product).name : params.get('sujet') || ''

  return (
    <>
      <Seo
        path="/contact"
        title={`${t('nav.contact')} — ${company.name}, ${company.city}`}
        description={`${t('contact.lead')} ${t('address.lead')}`}
      />

      <PageHead eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('contact.lead')}>
        <Button href={whatsappLink(whatsappMessages.quote[lang])} icon="whatsapp">
          {t('cta.whatsapp')}
        </Button>
        <Button variant="ghost" href={telLink(0)} icon="phone">
          <span dir="ltr">{company.phones[0].display}</span>
        </Button>
      </PageHead>

      <Address />
      <CatalogueBand />
      <ContactSection context={context} />
      <Faq />
      <FinalCta />
    </>
  )
}
