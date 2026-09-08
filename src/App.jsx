import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider, useLang } from './lib/i18n.jsx'
import { Header } from './components/Header.jsx'
import { Footer, FloatingContact } from './components/Footer.jsx'
import Home from './pages/Home.jsx'

const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

/** Ancrage : remonte en haut sur un nouveau chemin, descend en douceur vers #ancre. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      const id = hash.replace('#', '')
      let raf = 0
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 1024 ? 84 : 116)
          window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
        } else if (attempts < 24) {
          raf = requestAnimationFrame(() => tryScroll(attempts + 1))
        }
      }
      tryScroll()
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])
  return null
}

function Shell() {
  return (
    <>
      <a href="#contenu" className="skip">
        <SkipLabel />
      </a>
      <Header />
      <ScrollManager />
      <main id="contenu" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Products />} />
            <Route path="/collections/:slug" element={<ProductDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

function SkipLabel() {
  const { t } = useLang()
  return <span>{t('aria.main')}</span>
}

function PageFallback() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center pt-32">
      <div className="flex flex-col items-center gap-4 text-stone">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Chargement…</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LangProvider>
  )
}
