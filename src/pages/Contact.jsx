import { useSearchParams } from 'react-router-dom'
import { useLang } from '../lib/i18n.jsx'
import { findProduct } from '../content/catalog.js'
import { Seo } from '../components/Seo.jsx'
import { Button, PageHead } from '../components/UI.jsx'
import { whatsappLink } from '../content/company.js'
import { Showroom } from '../sections/Showroom.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { ContactSection, Faq } from '../sections/ContactSection.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function Contact() {
  const { t, L } = useLang()
  const [params] = useSearchParams()
  const piece = params.get('piece')
  const product = piece ? findProduct(piece) : null
  const context = product ? L(product).name : params.get('sujet') || ''

  return (
    <>
      <Seo
        path="/contact"
        title={`${t('nav.contact')} — Palma, Rouiba (Alger)`}
        description={`${t('contact.lead')} ${t('showroom.lead')}`}
      />
      <PageHead
        eyebrow={t('nav.contact')}
        title={t('showroom.title')}
        lead={t('contact.lead')}
      >
        <Button href={whatsappLink('Bonjour, je souhaite avoir plus d’informations concernant vos produits.')} icon="whatsapp">
          {t('cta.whatsapp')}
        </Button>
        <Button variant="ghost" to="/collections">
          {t('cta.collections')}
        </Button>
      </PageHead>
      <Showroom />
      <CatalogueBand />
      <ContactSection context={context} />
      <Faq />
      <FinalCta />
    </>
  )
}
