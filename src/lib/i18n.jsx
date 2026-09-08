import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fr } from '../content/i18n/fr.js'
import { en } from '../content/i18n/en.js'
import { ar } from '../content/i18n/ar.js'

const DICTS = { fr, en, ar }

export const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'ع', name: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
]

const STORAGE_KEY = 'palma:lang'
const LangContext = createContext(null)

/** resolution "a.b.c" dans un dictionnaire imbrique, repli sur FR */
function path(obj, key) {
  if (!key) return undefined
  if (obj[key] !== undefined) return obj[key]
  return key.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

export function LangProvider({ children, defaultLang = 'fr' }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return defaultLang
    const stored = window.localStorage?.getItem(STORAGE_KEY)
    if (stored && DICTS[stored]) return stored
    /* l’offre est rédigée en français d’abord : on ne dévie vers une autre
       langue que si le navigateur est explicitement arabe (public cible). */
    const nav = navigator.language?.slice(0, 2).toLowerCase()
    return nav === 'ar' ? 'ar' : defaultLang
  })

  const setLang = useCallback((code) => {
    if (!DICTS[code]) return
    setLangState(code)
    try {
      window.localStorage?.setItem(STORAGE_KEY, code)
    } catch {
      /* stockage indisponible : on garde la langue en mémoire */
    }
  }, [])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
  }, [lang, dir])

  /** titre + meta description par page (voir <Seo/>) */
  const t = useCallback((key, dict) => path(dict || DICTS[lang], key) ?? path(fr, key) ?? `⚠ ${key}`, [lang])

  /** selectionne la version locale d'une entite de contenu {fr:{},ar:{},en:{}} */
  const L = useCallback(
    (entity) => {
      if (!entity) return {}
      if (entity[lang]) return { ...entity.fr, ...entity[lang] }
      return entity.fr ?? entity
    },
    [lang],
  )

  /** pour une carte de chaines localisees {fr:'',ar:'',en:''} */
  const Ls = useCallback(
    (map) => (map ? (map[lang] ?? map.fr ?? '') : ''),
    [lang],
  )

  const value = useMemo(
    () => ({ lang, dir, setLang, t, L, Ls, isRTL: dir === 'rtl' }),
    [lang, dir, setLang, t, L, Ls],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang doit etre utilise a l interieur de <LangProvider>')
  return ctx
}

export const dict = DICTS
