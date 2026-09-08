import { useEffect } from 'react'
import { useLang } from '../lib/i18n.jsx'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Mettees par page (titre, description, OG) — alignees sur la langue active. */
export function Seo({ title, description, path = '/' }) {
  const { t, lang } = useLang()
  const fullTitle = title || t('meta.title')
  const desc = description || t('meta.description')

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:locale', lang === 'ar' ? 'ar_DZ' : lang === 'en' ? 'en_US' : 'fr_DZ')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (link) link.href = `https://palma.dz${path}`
  }, [fullTitle, desc, lang, path])

  return null
}
