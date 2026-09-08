import { useEffect, useRef, useState } from 'react'

/**
 * Reveal au scroll — une seule IntersectionObserver partagnee par toute la page
 * (pas d'ecouteur de scroll, pas de lib d'animation).
 */
let observer = null
const registry = new Map()

function getObserver() {
  if (observer) return observer
  if (typeof IntersectionObserver === 'undefined') return null
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const node = entry.target
        node.classList.add('is-in')
        observer.unobserve(node)
        registry.delete(node)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

export function useRevealNode() {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const obs = getObserver()
    if (!obs || reduce) {
      node.classList.add('is-in')
      return
    }
    registry.set(node, true)
    obs.observe(node)
    return () => {
      obs?.unobserve(node)
      registry.delete(node)
    }
  }, [])
  return ref
}

/** Petit hook "in view" pour les effets dependants de la visibilite */
export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect()))
    }, options)
    io.observe(node)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/** verrouille le scroll (menu mobile, modale) */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > offset))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [offset])
  return scrolled
}
