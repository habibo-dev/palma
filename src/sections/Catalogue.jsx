import { useLang } from '../lib/i18n.jsx'
import { whatsappLink } from '../content/company.js'
import { Button, Reveal, Section } from '../components/UI.jsx'
import { Icon } from '../components/Icons.jsx'

/**
 * Zone catalogue : le PDF n'existe pas encore, on ne fait donc pas semblant.
 * L'action mene vers une demande reelle (WhatsApp / formulaire).
 */
export function CatalogueBand() {
  const { t, lang } = useLang()

  return (
    <Section id="catalogue" tone="palm" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:url('/images/material-01.jpg')] [background-size:cover] [background-position:center] mix-blend-luminosity"
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow !text-rattan">{t('catalogue.eyebrow')}</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="h2 mt-5 max-w-xl text-bone">{t('catalogue.title')}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-bone/75">{t('catalogue.body')}</p>
          </Reveal>
          <Reveal delay={200} className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="light" to="/contact#devis">
              {t('catalogue.primary')}
            </Button>
            <Button variant="outline-light" href={whatsappLink(lang === 'ar' ? 'السلام، أرغب في تلقي الكتالوج ونماذج المواد.' : lang === 'en' ? 'Hello, I would like the Palma catalogue and material samples.' : 'Bonjour, je souhaite recevoir le catalogue Palma et le nuancier.')} icon="whatsapp">
              {t('catalogue.secondary')}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={120} className="rounded-soft border border-bone/15 bg-bone/[0.06] p-6">
            <ul className="space-y-4 text-[0.9375rem] text-bone/85">
              {[
                { label: lang === 'ar' ? 'نماذج الأخشاب والأقمشة' : lang === 'en' ? 'Timber & fabric samples' : 'Échantillons bois & tissu', icon: 'layers' },
                { label: lang === 'ar' ? 'قائمة الخيارات والتشطيبات' : lang === 'en' ? 'Option & finish list' : 'Liste des options et finitions', icon: 'tool' },
                { label: lang === 'ar' ? 'مقاسات قياسية وقابلة للتعديل' : lang === 'en' ? 'Standard and adjustable sizes' : 'Formats standard et modifiables', icon: 'measure' },
                { label: lang === 'ar' ? 'صور القطع في الورشة' : lang === 'en' ? 'Photos from the workshop' : 'Photos des pièces en atelier', icon: 'palm' },
              ].map((row) => (
                <li key={row.label} className="flex items-center gap-3 border-b border-bone/10 pb-4 last:border-0 last:pb-0">
                  <Icon name={row.icon} size={17} className="shrink-0 text-rattan" />
                  {row.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.75rem] leading-snug text-bone/55">{t('catalogue.note')}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
