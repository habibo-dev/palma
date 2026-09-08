import { useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { company, mapsLink, osmEmbed } from '../content/company.js'
import { Icon } from './Icons.jsx'
import { Reveal } from './UI.jsx'

/** Carte OpenStreetMap chargee seulement a l'affichage (pas de poids inutile au 1er octet). */
export function MapBlock({ height = '20rem', caption }) {
  const { t } = useLang()
  const [wantMap, setWantMap] = useState(false)

  return (
    <Reveal className="card overflow-hidden">
      <div className="relative bg-rattan-soft" style={{ height }}>
        {wantMap ? (
          <iframe
            title={`Plan — ${company.address.label.fr}`}
            src={osmEmbed()}
            loading="lazy"
            className="h-full w-full border-0 grayscale-[0.25] contrast-[1.05]"
          />
        ) : (
          <button
            type="button"
            onClick={() => setWantMap(true)}
            className="group grid h-full w-full place-items-center bg-[repeating-linear-gradient(45deg,rgba(36,64,45,0.07)_0_1px,transparent_1px_13px)] transition-colors hover:bg-[repeating-linear-gradient(45deg,rgba(36,64,45,0.13)_0_1px,transparent_1px_13px)]"
          >
            <span className="flex flex-col items-center gap-2 px-6 py-4 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-palm text-bone transition-transform duration-500 group-hover:scale-105">
                <Icon name="pin" size={19} />
              </span>
              <span className="text-sm font-semibold">{t('cta.directions')}</span>
              <span className="body-sm max-w-64">{company.address.label.fr}</span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
        <p className="body-sm">{caption || t('showroom.mapCaption')}</p>
        <a href={mapsLink()} target="_blank" rel="noopener" className="link-arrow shrink-0">
          <Icon name="arrow" size={14} className="flip" />
          {t('cta.directions')}
        </a>
      </div>
    </Reveal>
  )
}
