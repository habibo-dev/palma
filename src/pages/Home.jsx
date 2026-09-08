import { Seo } from '../components/Seo.jsx'
import { Hero } from '../sections/Hero.jsx'
import { Position } from '../sections/Position.jsx'
import { Ranges } from '../sections/Ranges.jsx'
import { Sectors } from '../sections/Sectors.jsx'
import { Advantages, Materials } from '../sections/Advantages.jsx'
import { Applications } from '../sections/Applications.jsx'
import { Process } from '../sections/Process.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { Address } from '../sections/Address.jsx'
import { ContactSection, Faq } from '../sections/ContactSection.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Position />
      <Ranges />
      <Sectors />
      <Advantages />
      <Materials />
      <Applications />
      <Process />
      <CatalogueBand />
      <Address />
      <ContactSection />
      <Faq />
      <FinalCta />
    </>
  )
}
