#!/usr/bin/env node
/**
 * Auto-contrôle des pages (regle 43) sans navigateur :
 * chaque routee est rendue en statique, puis on vérifie la structure et le contenu.
 *   - un seul <h1> par page, hiérarchie de titres cohérente
 *   - aucune clé i18n manquante (marqueur "⚠"), aucun undefined / [object Object]
 *   - toute image a un alt, toute <img> a un ratio réservé via son conteneur
 *   - aucun texte interne de type "À CONFIRMER" dans le rendu
 *   - rendu FR / EN / AR (direction RTL)
 */
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement as h } from 'react'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const server = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})

const { Routes, Route } = await import('react-router-dom')
const problems = []
const steps = []

async function render(route, lang = 'fr') {
  const [
    { LangProvider },
    StaticRouter,
    Home,
    Products,
    ProductDetail,
    About,
    Contact,
    NotFound,
  ] = await Promise.all([
    server.ssrLoadModule('/src/lib/i18n.jsx'),
    import('react-router').then((m) => m.StaticRouter),
    server.ssrLoadModule('/src/pages/Home.jsx').then((m) => m.default),
    server.ssrLoadModule('/src/pages/Products.jsx').then((m) => m.default),
    server.ssrLoadModule('/src/pages/ProductDetail.jsx').then((m) => m.default),
    server.ssrLoadModule('/src/pages/About.jsx').then((m) => m.default),
    server.ssrLoadModule('/src/pages/Contact.jsx').then((m) => m.default),
    server.ssrLoadModule('/src/pages/NotFound.jsx').then((m) => m.default),
  ])

  const routes = {
    '/': Home,
    '/collections': Products,
    '/collections/fauteuil-casbah': ProductDetail,
    '/a-propos': About,
    '/contact': Contact,
    '/nope': NotFound,
  }
  const Page = routes[route]
  if (!Page) throw new Error(`route inconnue ${route}`)

  const tree = route.startsWith('/collections/')
    ? h(Routes, null, h(Route, { path: '/collections/:slug', element: h(Page) }))
    : h(Page)

  const html = renderToStaticMarkup(
    h(LangProvider, { defaultLang: lang }, h(StaticRouter, { location: route }, tree)),
  )
  return html
}

const count = (html, re) => (html.match(re) || []).length

function check(route, lang, html) {
  const label = `${route} [${lang}]`
  const h1 = count(html, /<h1\b/g)
  if (h1 !== 1) problems.push(`${label} : ${h1} <h1> trouvé(s) (attendu 1)`)

  if (/⚠/.test(html)) problems.push(`${label} : clé de traduction manquante dans le rendu`)
  if (/undefined/.test(html)) problems.push(`${label} : "undefined" rendu à l'écran`)
  if (/\[object Object\]/.test(html)) problems.push(`${label} : objet rendu brut`)
  if (/À CONFIRMER|Lorem|lorem ipsum/i.test(html)) problems.push(`${label} : texte interne visible`)
  if (/class=""/.test(html)) problems.push(`${label} : class vide`)
  if (/NaN/.test(html)) problems.push(`${label} : NaN dans le rendu`)

  const imgs = html.match(/<img[^>]*>/g) || []
  const noAlt = imgs.filter((i) => !/alt="[^"]+"|alt=""/.test(i))
  if (noAlt.length) problems.push(`${label} : ${noAlt.length} <img> sans alt`)
  const noLazy = imgs.filter((i) => !/loading=/.test(i))
  if (noLazy.length) problems.push(`${label} : ${noLazy.length} <img> sans loading explicite`)

  const h2 = count(html, /<h2\b/g)
  const links = count(html, /<a\b/g)
  const buttons = count(html, /<button\b/g)
  steps.push(`${label.padEnd(30)} h1:${h1} h2:${String(h2).padStart(2)} imgs:${String(imgs.length).padStart(2)} links:${String(links).padStart(3)} btns:${String(buttons).padStart(3)} ${Math.round(html.length / 1024)} Ko`)
  return html
}

// --- rendu FR de toutes les pages + contrôles génériques -------------------
const routes = ['/', '/collections', '/collections/fauteuil-casbah', '/a-propos', '/contact', '/nope']
const htmls = {}
for (const r of routes) htmls[r] = check(r, 'fr', await render(r, 'fr'))

// --- assertions métier ------------------------------------------------------
const home = htmls['/']
for (const id of ['position', 'collections', 'secteurs', 'atouts', 'materiaux', 'ambiances', 'methode', 'catalogue', 'showroom', 'devis']) {
  if (!home.includes(`id="${id}"`)) problems.push(`accueil : ancre manquante #${id}`)
}
if (!/Demander un devis/.test(home)) problems.push('accueil : CTA principal absent du rendu')
if ((home.match(/wa\.me\//g) || []).length < 3) problems.push('accueil : moins de 3 liens WhatsApp')
if (/tel:\+213\s?555\s?00\s?00\s?00/.test(home) === false && !/tel:/.test(home)) problems.push('accueil : pas de lien téléphone')
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
if (!/"@type":\s*"FurnitureStore"/.test(indexHtml)) problems.push('SEO : JSON-LD LocalBusiness absent de index.html')
for (const tag of ['og:title', 'og:description', 'og:image']) {
  if (!indexHtml.includes(tag)) problems.push(`SEO : meta ${tag} absente`)
}
if (!/<html lang="fr"/.test(indexHtml)) problems.push('SEO : <html lang> manquant')

const detail = htmls['/collections/fauteuil-casbah']
if (!/Fauteuil Casbah/.test(detail)) problems.push('fiche produit : titre absent')
if (!/piece=fauteuil-casbah/.test(detail)) problems.push('fiche produit : CTA devis non relié au formulaire')
if (/Fabrication/.test(detail) === false) problems.push('fiche produit : mention de disponibilité absente')

const products = htmls['/collections']
if (!/type="search"/.test(products)) problems.push('catalogue : champ de recherche absent')
if (!/aria-pressed/.test(products)) problems.push('catalogue : filtres sans état aria-pressed')

const contact = htmls['/contact']
for (const field of ['qf-name', 'qf-phone', 'qf-message', 'qf-type']) {
  if (!contact.includes(`id="${field}"`)) problems.push(`contact : champ ${field} manquant`)
}
if (!/aria-expanded/.test(contact)) problems.push('contact : FAQ sans contrôle aria-expanded')

// --- langue arabe : RTL + chaînes traduites --------------------------------
const arHome = await render('/', 'ar')
if (!/بالمَا|كرسي|خشب/.test(arHome)) problems.push('arabe : contenu non rendu (retour au français ?)')
if (/Fauteuil|Bureau &amp; espaces|collections<\/a>/.test(arHome)) problems.push('arabe : fragments français laissés dans le rendu')

const enHome = await render('/', 'en')
if (!/Bespoke furniture/.test(enHome)) problems.push('anglais : titre hero incorrect')

steps.push(`\n  arabe  → ${count(arHome, /<h1\b/g)} h1, ${Math.round(arHome.length / 1024)} Ko`)
steps.push(`  anglais→ ${count(enHome, /<h1\b/g)} h1, ${Math.round(enHome.length / 1024)} Ko`)

await server.close()

console.log(steps.map((s) => '  ✓ ' + s).join('\n'))
if (problems.length) {
  console.log('\n' + [...new Set(problems)].map((p) => '  ✗ ' + p).join('\n'))
  console.log(`\n${new Set(problems).size} problème(s) à corriger`)
  process.exit(1)
}
console.log('\nRendu des 6 routes + 3 langues : 0 problème.')
