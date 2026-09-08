import { useEffect } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { company, siteUrl } from '../content/company.js'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Metées par page et par langue. Le canonical n’est posé que si le domaine est confirmé. */
export function Seo({ title, description, path = '/' }) {
  const { t, lang } = useLang()
  const fullTitle = title || t('meta.title')
  const desc = description || t('meta.description')

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:site_name', company.name)
    setMeta('property', 'og:locale', lang === 'ar' ? 'ar_DZ' : lang === 'en' ? 'en_US' : 'fr_DZ')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)

    const link = document.head.querySelector('link[rel="canonical"]')
    if (link) {
      if (siteUrl) link.href = `${siteUrl}${path === '/' ? '/' : path}`
      else link.remove()
    }
  }, [fullTitle, desc, lang, path])

  return null
}
