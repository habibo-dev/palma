import { Seo } from '../components/Seo.jsx'
import { Hero } from '../sections/Hero.jsx'
import { Position } from '../sections/Position.jsx'
import { Collections } from '../sections/Collections.jsx'
import { Sectors } from '../sections/Sectors.jsx'
import { Advantages, Materials } from '../sections/Advantages.jsx'
import { Ambiances } from '../sections/Ambiances.jsx'
import { Process } from '../sections/Process.jsx'
import { CatalogueBand } from '../sections/Catalogue.jsx'
import { Showroom } from '../sections/Showroom.jsx'
import { ContactSection } from '../sections/ContactSection.jsx'
import { FinalCta } from '../sections/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Position />
      <Collections />
      <Sectors />
      <Advantages />
      <Materials />
      <Ambiances />
      <Process />
      <CatalogueBand />
      <Showroom />
      <ContactSection />
      <FinalCta />
    </>
  )
}
