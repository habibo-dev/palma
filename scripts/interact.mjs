#!/usr/bin/env node
/**
 * Parcours réel du site en DOM (jsdom) : on monte l’application et on clique.
 * Complète smoke-render.mjs (rendu statique) sur ce que le statique ne peut pas
 * prouver : navigation SPA, filtres, tunnel de devis, sélecteur de langue + RTL,
 * menu mobile, carte montée au clic, liens téléphone/WhatsApp, 404.
 *
 *   node scripts/interact.mjs
 */
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { act, createElement as h } from 'react'

const problems = []
const steps = []
const fail = (m) => problems.push(m)
const ok = (m) => steps.push(m)

/* ------------------------------------------------------------------ DOM --- */
const dom = new JSDOM('<!doctype html><html lang="fr" dir="ltr"><head><title>t</title></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost:4173/',
  pretendToBeVisual: true,
})
const { window } = dom

const scrollCalls = []
window.scrollTo = (opts) => scrollCalls.push(opts)
window.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })
class IO {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true, target: el, intersectionRatio: 1 }], this)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.IntersectionObserver = IO
window.HTMLElement.prototype.scrollIntoView = function () {}
const clip = {
  value: '',
  writeText(t) {
    this.value = t
    return Promise.resolve()
  },
}
Object.defineProperty(window.navigator, 'clipboard', { value: clip, configurable: true })

for (const k of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'HTMLTextAreaElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'IntersectionObserver', 'localStorage', 'requestAnimationFrame', 'cancelAnimationFrame', 'getComputedStyle']) {
  if (window[k] === undefined) continue
  try {
    Object.defineProperty(globalThis, k, { value: window[k], configurable: true, writable: true })
  } catch {
    /* globaux en lecture seule sous Node (navigator) : le DOM reste accessible via window */
  }
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

/* ------------------------------------------- erreurs React pendant le parcours */
const consoleIssues = []
for (const level of ['error', 'warn']) {
  const original = console[level].bind(console)
  console[level] = (...args) => {
    const msg = args.map((a) => (a instanceof Error ? a.message : String(a))).join(' ')
    if (!/not wrapped in act|React DevTools|useLayoutEffect does nothing on the server/.test(msg)) consoleIssues.push(`console.${level} : ${msg.slice(0, 200)}`)
    original(...args)
  }
}

/* --------------------------------------------------------- app sous test --- */
const server = await createServer({ configFile: './vite.config.js', server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
const [{ default: App }, companyMod, catalogMod] = await Promise.all([
  server.ssrLoadModule('/src/App.jsx'),
  server.ssrLoadModule('/src/content/company.js'),
  server.ssrLoadModule('/src/content/catalog.js'),
])
const company = companyMod.company

/* langue de départ déterministe : le site détecte la langue du navigateur,
   le test force le français (langue principale de l’offre) puis vérifie la bascule. */
window.localStorage.setItem('palma:lang', 'fr')
window.document.documentElement.lang = 'fr'
window.document.documentElement.dir = 'ltr'

const root = (await import('react-dom/client')).createRoot(window.document.getElementById('root'))
const flush = async (ms = 40) => {
  await act(async () => {
    await new Promise((r) => setTimeout(r, ms))
  })
}
/** attend l’apparition d’un élément : les routes sont chargées à la volée (Suspense) */
async function until(predicate, label, timeout = 2500) {
  const started = Date.now()
  for (;;) {
    const found = predicate()
    if (found) return found
    if (Date.now() - started > timeout) {
      fail(`attente dépassée : ${label} (chunk de route probablement non monté à temps)`)
      return null
    }
    await flush(40)
  }
}
const $ = (sel) => window.document.querySelector(sel)
const $$ = (sel) => [...window.document.querySelectorAll(sel)]
const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim()
const byText = (sel, needle) => $$(sel).find((e) => text(e).toLowerCase().includes(needle.toLowerCase()))

async function click(el, label) {
  if (!el) {
    fail(`élément introuvable : ${label}`)
    return false
  }
  await act(async () => {
    el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  })
  await flush()
  return true
}

async function setValue(el, value) {
  if (!el) return fail('champ introuvable (setValue)')
  const proto = el.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value').set
  await act(async () => {
    setter.call(el, value)
    el.dispatchEvent(new window.Event('input', { bubbles: true }))
    el.dispatchEvent(new window.Event('change', { bubbles: true }))
  })
}

/* ============================================================ 1 — accueil */
await act(async () => {
  root.render(h(App))
})
await flush(120)
await until(() => $('h1'), 'accueil monté')

ok(`montage : ${$$('section').length} sections rendues, ${$$('#contenu a').length} liens dans le contenu`)
if (!$('h1')) fail('accueil : aucun <h1> monté — le rendu a échoué')
if (window.document.documentElement.lang !== 'fr') fail(`langue initiale : html lang=${window.document.documentElement.lang}`)
if (!text($('h1')).includes('Mobilier de bureau')) fail(`accueil : h1 inattendu « ${text($('h1'))} »`)
if (!window.document.body.innerHTML.includes(company.demo.ribbon.fr.slice(0, 28))) fail('accueil : bandeau « concept de présentation » absent du DOM (exigence client)')
if (!text($('footer')).includes('Concept de présentation')) fail('pied de page : mention de statut non officiel absente')
if ($$('.ticker__track li').length < 8) fail('accueil : bandeau des familles de gammes non rendu')
if ($$('img[loading="lazy"]').length < 8) fail('accueil : trop d’images sans lazy-loading')
if (!$$('img')[0]?.getAttribute('loading')) fail('accueil : image du hero sans attribut loading explicite')

/* la trame du hero doit mener au devis */
const heroCta = byText('#contenu a', 'Demander un devis')
if (!heroCta) fail('accueil : pas de CTA « Demander un devis » visible en première vue')
else if (heroCta.getAttribute('href') !== '/contact#devis') fail(`accueil : CTA principal vers ${heroCta.getAttribute('href')} (attendu /contact#devis)`)
else ok('accueil : CTA principal → /contact#devis')

/* ancres internes : le clic doit demander un scroll vers la section */
const scrollBefore = scrollCalls.length
if (await click(byText('header nav a', 'Applications'), 'nav « Applications »')) {
  if (scrollCalls.length === scrollBefore) fail('ancre #applications : aucun scroll demandé (ScrollManager inopérant ?)')
  else if (!$('#applications')) fail('ancre #applications : la section cible n’existe pas')
  else ok('navigation par ancre : scroll demandé vers #applications')
}

/* ===================================================== 2 — gamme + recherche */
if (await click(byText('header nav a', 'Nos gammes'), 'nav « Nos gammes »')) {
  if (window.location.pathname !== '/gammes') fail(`nav : attendu /gammes, obtenu ${window.location.pathname}`)
  await until(() => $('main a[href^="/gammes/"]'), 'liste des gammes montée')
  const cards = $$('main a[href^="/gammes/"]')
  if (cards.length < catalogMod.products.length) fail(`/gammes : ${cards.length} cartes (attendu ${catalogMod.products.length} gammes)`)
  else ok(`/gammes : ${cards.length} cartes de gamme`)

  const filter = byText('button[aria-pressed]', 'colaire')
  const scolaireCount = catalogMod.products.filter((x) => x.tags.includes('scolaire')).length
  if (await click(filter, 'filtre « Mobilier scolaire »')) {
    if (!window.location.search.includes('tag=scolaire')) fail(`/gammes : filtre absent de l’URL (${window.location.search})`)
    const shown = $$('main a[href^="/gammes/"]').length
    if (shown !== scolaireCount) fail(`/gammes : filtre scolaire → ${shown} carte(s) (attendu ${scolaireCount})`)
    else ok(`filtre par destination : URL partagée + ${shown} gamme(s) scolaire(s)`)
    await click(byText('button[aria-pressed]', 'Toutes'), 'filtre « Toutes »')
    if ($$('main a[href^="/gammes/"]').length !== catalogMod.products.length) fail('/gammes : réinitialisation du filtre incomplète')
  }

  const search = $('#range-search')
  if (!search) fail('/gammes : champ de recherche absent')
  else {
    await setValue(search, 'vestiaire')
    const n = $$('main a[href^="/gammes/"]').length
    if (n !== 1) fail(`/gammes : recherche « vestiaire » → ${n} résultat(s) (attendu 1)`)
    else ok('recherche : « vestiaire » → 1 gamme (métal/vestiaires)')
    await setValue(search, 'zzzz')
    if (!$('main .btn')) fail('/gammes : aucun repli (CTA) quand la recherche ne renvoie rien')
    else ok('recherche sans résultat : message de repli + CTA devis')
    await setValue(search, '')
  }

  /* fiche gamme */
  const card = $('main a[href^="/gammes/"]')
  const slug = card.getAttribute('href').split('/').pop()
  if (await click(card, 'carte de gamme')) {
    if (window.location.pathname !== `/gammes/${slug}`) fail(`fiche gamme : ${window.location.pathname} au lieu de /gammes/${slug}`)
    else {
      await until(() => $('main a[href*="gamme="]'), 'liens de la fiche gamme')
      ok(`fiche gamme /gammes/${slug} ouverte`)
      if (!$('#devis') && !$$('main a[href*="/contact"]').length) fail('fiche gamme : aucun chemin vers le devis')
      const quote = $$('main a').find((a) => (a.getAttribute('href') || '').includes(`gamme=${slug}`))
      if (!quote) fail(`fiche gamme : pas de lien avec le contexte ?gamme=${slug} — liens main : ${$$('main a').map((a) => a.getAttribute('href')).slice(0, 12).join(' ')}`)
      else if (await click(quote, 'CTA devis depuis la gamme')) {
        if (window.location.pathname !== '/contact' || !window.location.search.includes(`gamme=${slug}`) || window.location.hash !== '#devis') {
          fail(`tunnel devis : URL ${window.location.pathname}${window.location.search}${window.location.hash}`)
        } else ok(`formulaire pré-rempli en contexte : ${window.location.search}${window.location.hash}`)
        const chip = text($('.field')) && $$('main .chip').map(text)
        if (!chip.some((c) => c.length > 3)) fail('/contact : la gamme demandée n’apparaît pas dans le formulaire')
        else ok(`/contact : gamme reprise dans le formulaire (« ${chip.find((c) => c.length > 3)} »)`)
      }
    }
  }
}

/* ============================================ 3 — formulaire de devis (fin) */
await until(() => $('#devis'), 'bloc devis monté avant reprise du formulaire')
window.history.pushState({}, '', '/contact#devis')
await act(async () => {
  window.dispatchEvent(new window.Event('popstate'))
})
await until(() => $('#qf-message'), 'formulaire de devis monté')

const form = $('#qf-message')?.closest('form')
if (!form) fail('formulaire de devis absent de /contact')
else {
  if (form.hasAttribute('action')) fail('le formulaire a une action POST alors qu’aucun back-end n’est prévu')
  await act(async () => {
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  })
  await flush()
  if (!$('[role="alert"]')) fail('devis : formulaire vide accepté (fausse promesse de prise en charge)')
  else ok('devis : envoi vide refusé, aucun faux message de confirmation')

  await setValue($('#qf-name'), 'Service des moyens généraux')
  await setValue($('#qf-orga'), 'Université — Constantine')
  await setValue($('#qf-phone'), '0555 12 34 56')
  const typeSel = $('#qf-type')
  const firstType = [...typeSel.options].find((o) => o.value)?.value
  await setValue(typeSel, firstType)
  await setValue($('#qf-size'), '12 salles')
  await setValue($('#qf-place'), 'Constantine, bloc C')
  await setValue($('#qf-message'), '30 tables-bancs et 8 armoires de classement, livraison pendant les vacances.')
  await click($('#qf-message').closest('form').querySelector('input[type="checkbox"]'), 'case de consentement')

  await act(async () => {
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  })
  await flush()

  const waSend = byText('main a', 'Envoyer sur WhatsApp')
  const href = waSend?.getAttribute('href') || ''
  if (!waSend) fail('devis : aucun relais WhatsApp après soumission')
  else if (!href.startsWith(`https://wa.me/${company.phones[0].whatsapp}?text=`)) fail(`devis : relais WhatsApp mal construit (${href.slice(0, 60)})`)
  else {
    const payload = decodeURIComponent(href.split('text=')[1] || '')
    for (const needle of ['Service des moyens généraux', '0555 12 34 56', '30 tables-bancs', 'Constantine, bloc C', firstType]) {
      if (!payload.includes(needle)) fail(`devis : champ absent du message transmis (${needle})`)
    }
    ok(`devis : message complet transmis (${payload.split('\n').length} lignes, ${payload.length} caractères)`)
  }
  if (!text($('main')).includes('WhatsApp')) fail('devis : aucune explication du canal d’envoi après soumission')
  if (/Merci.{0,30}(dans l’heure|24 h|sous \d)/i.test(text($('main')))) fail('devis : délai de réponse affirmé alors qu’il n’est pas confirmé')

  const copyBtn = byText('main button', 'Copier')
  if (!(await click(copyBtn, 'bouton copier'))) fail('devis : bouton « copier » absent')
  else if (!clip.value.includes('Service des moyens généraux')) fail('devis : le presse-papiers ne reçoit pas la demande complète')
  else ok('devis : copie au presse-papiers fonctionnelle')

  const back = byText('main button', 'modifier')
  if (back && (await click(back, 'modifier la demande'))) {
    if (!$('#qf-name')) fail('devis : impossible de revenir à l’édition après envoi')
    else if ($('#qf-name').value !== 'Service des moyens généraux') fail('devis : les saisies sont perdues au retour d’édition')
    else ok('devis : retour à l’édition sans perte de saisie')
  }
}

/* ==================================================== 4 — carte et téléphones */
if ($('#nous-trouver') || (await click($('main a[href="#nous-trouver"]') || byText('a[href="#nous-trouver"]', 'Nous trouver'), 'section « Nous trouver »'))) {
  const mapBtn = $('#nous-trouver .card button[type="button"]') || $('#nous-trouver button[type="button"]')
  if (!mapBtn) fail(`carte : aucun bouton de montage dans #nous-trouver (boutons trouvés : ${$$('#nous-trouver button').map((b) => text(b) || b.className).slice(0, 3).join(' / ') || 'aucun'})`)
  const iframeBefore = $$('iframe').length
  if (mapBtn) {
    if (await click(mapBtn, 'charger le plan')) {
      if ($$('iframe').length === iframeBefore) fail('carte : le clic ne monte pas l’iframe')
      else {
        const src = $('iframe').getAttribute('src') || ''
        if (!/openstreetmap\.org/.test(src) || !src.includes(String(company.address.osm.lat))) fail(`carte : iframe vers ${src.slice(0, 70)}`)
        else ok('carte : iframe montée au clic, recentrée sur l’adresse réelle')
      }
    }
  }
}
for (const [i, p] of company.phones.entries()) {
  const link = $$('main a[href]').find((a) => a.getAttribute('href') === `tel:${p.tel}`)
  if (!link) fail(`téléphone : pas de lien cliquable ${p.display} dans le contenu`)
  else if (text(link).replace(/\s+/g, ' ').trim() !== p.display) fail(`téléphone : libellé « ${text(link)} » ≠ ${p.display}`)
  else if (i === 0 && !text(link.parentElement).length) fail('téléphone : libellé vide')
}
if ($$('a[href^="tel:"]').length < 4) fail('téléphone : moins de 4 liens d’appel sur la page courante')
if ($$('a[href^="mailto:"]').length) fail('un lien e-mail est affiché alors que l’adresse n’est pas confirmée')
const wa = $$('a[href^="https://wa.me/"]')
if (!wa.length) fail('WhatsApp : aucun lien sur /contact')
else if (wa.some((a) => !a.getAttribute('href').startsWith(`https://wa.me/${company.phones[0].whatsapp}`))) fail('WhatsApp : un lien ne pointe pas sur le numéro fourni')
else ok(`WhatsApp : ${wa.length} liens vers ${company.phones[0].whatsapp}, message pré-rempli sur ${wa.filter((a) => a.getAttribute('href').includes('text=')).length}`)

/* ==================================================== 5 — langue et RTL */
const langBtn = $('header button[aria-haspopup], header button[aria-label*="Langue" i], #palma-lang')
if (!langBtn) fail('langue : sélecteur introuvable dans l’en-tête')
else {
  await click(langBtn, 'ouvrir le sélecteur de langue')
  const arab = byText('header button, header [role="menu"] button, header a', 'ع') || byText('button', 'العربية')
  if (!(await click(arab, 'choisir العربية'))) fail('langue : option arabe introuvable')
  else {
    if (window.document.documentElement.dir !== 'rtl') fail(`langue : dir=${window.document.documentElement.dir} après passage en arabe (attendu rtl)`)
    else if (window.document.documentElement.lang !== 'ar') fail(`langue : html lang=${window.document.documentElement.lang}`)
    else if (window.localStorage.getItem('palma:lang') !== 'ar') fail('langue : préférence non mémorisée (rechargement = retour au français)')
    else ok('arabe : dir=rtl, html lang=ar, préférence mémorisée')
    if (!text($('h1')).match(/[\u0600-\u06FF]/)) fail('arabe : le titre courant n’est pas en arabe')
    else ok(`arabe : h1 « ${text($('h1'))} »`)
    const physical = $$('[class*="left-"], [class*="right-"]').filter((e) => !/text-(left|right)/.test(e.className))
    if (physical.length) fail(`arabe : ${physical.length} éléments avec classes physiques (gauche/droite)`)
    /* retour au français */
    await click($('header button[aria-haspopup], #palma-lang'), 'rouvrir le sélecteur')
    const fr = byText('header button', 'Français') || byText('button', 'Français')
    if (!(await click(fr, 'choisir Français'))) fail('langue : impossible de revenir au français')
    else if (window.document.documentElement.dir !== 'ltr') fail('langue : dir non rétabli après retour au français')
    else ok('langue : retour au français, ltr rétabli')
  }
}

/* ==================================================== 6 — menu mobile */
const burger = $('header button[aria-controls="palma-menu"]') || byText('header button', 'Menu')
if (!burger) fail('menu mobile : bouton absent')
else {
  await click(burger, 'ouvrir le menu')
  const expanded = burger.getAttribute('aria-expanded')
  const drawer = $('#palma-menu')
  if (expanded !== 'true') fail(`menu mobile : aria-expanded=${expanded} après ouverture`)
  else if (!drawer) fail('menu mobile : panneau #palma-menu non monté')
  else {
    const links = $$(`${'#palma-menu'} a`)
    if (links.length < 4) fail(`menu mobile : ${links.length} liens (navigation incomplète)`)
    else ok(`menu mobile : ${links.length} liens, verrou de scroll actif`)
    await click(links[1], 'lien du menu mobile')
    if (burger.getAttribute('aria-expanded') !== 'false') fail('menu mobile : le panneau reste ouvert après navigation')
    else ok('menu mobile : se referme après un lien')
  }
}

/* ==================================================== 7 — 404 et redirection */
window.history.pushState({}, '', '/piece/inexistante')
await act(async () => {
  window.dispatchEvent(new window.Event('popstate'))
})
await flush(60)
await until(() => $('h1'), 'page 404 montée')
if (!text($('h1')) && !text($('main')).includes('404')) fail('404 : aucune page de repli rendue')
else ok(`404 rendue : « ${text($('h1'))} »`)
if (await click(byText('main a', 'accueil'), 'CTA 404 vers l’accueil')) {
  if (window.location.pathname !== '/') fail(`404 : retour accueil vers ${window.location.pathname}`)
  else ok('404 : retour à l’accueil fonctionnel')
}
window.history.pushState({}, '', '/collections')
await act(async () => {
  window.dispatchEvent(new window.Event('popstate'))
})
await flush(60)
if (window.location.pathname !== '/gammes') fail(`ancienne URL /collections : redirigée vers ${window.location.pathname} (attendu /gammes)`)
else ok('redirection /collections → /gammes (aucun lien mort de la maquette précédente)')

/* ==================================================== 8 — intégrité finale */
if (window.document.body.innerHTML.match(/Rouiba|rattan|rotin\b|Casbah|Tlemcen|fauteuil/i)) fail('résidu de la marque fictive dans le DOM rendu')
if (!window.document.body.innerHTML.includes(company.demo.ribbon.fr.slice(0, 20))) fail('bandeau de concept disparu après navigation (doit rester visible)')
const uniqueIssues = [...new Set(consoleIssues)]
if (uniqueIssues.length) fail(`console : ${uniqueIssues.length} alerte(s) React pendant le parcours → ${uniqueIssues.slice(0, 3).join(' | ')}`)
else ok('console : aucune erreur ni alerte React sur tout le parcours')

await act(async () => root.unmount())
await server.close()
window.close()

console.log(steps.map((s) => '  ✓ ' + s).join('\n'))
if (problems.length) {
  const uniq = [...new Set(problems)]
  console.log('\n' + uniq.map((p) => '  ✗ ' + p).join('\n'))
  console.log(`\n${uniq.length} problème(s) d’interaction`)
  process.exit(1)
}
console.log('\nParcours complet en DOM : navigation, devis, langues, carte, téléphones — 0 problème.')
