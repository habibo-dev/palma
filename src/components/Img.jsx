import { useState } from 'react'
import { withBase } from '../lib/asset.js'

/**
 * Image responsive avec ratio reserve a l avance (aucun deplacement de mise en page),
 * lazy-loading hors premier ecran, et fondu a l'arrivee.
 */
export function Img({ src, alt, ratio = 1.28, priority = false, className = '', imgClassName = '', sizes = '100vw' }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`frame ${className}`}
      style={{ aspectRatio: String(ratio) }}
    >
      <img
        src={withBase(src)}
        alt={alt}
        width={1200}
        height={Math.round(1200 / ratio)}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`${imgClassName} h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
