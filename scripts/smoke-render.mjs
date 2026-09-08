#!/usr/bin/env node
/**
 * Auto-contrôle des pages sans navigateur : chaque route est rendue en statique
 * (React SSR) dans les trois langues, puis la structure et le contenu sont audités.
 *
 *   - un seul <h1>, hiérarchie de titres, images avec alt + loading
 *   - aucune clé i18n manquante (marqueur ⚠), aucun undefined / [object Object]
 *   - toutes les ancres promises par la navigation sont réellement rendues
 *   - coordonnées réelles présentes, aucun prix publié, aucun résidu de marque inventée
 *   - arabe : volume de texte cohérent, classes logiques uniquement (aucune left-/right-)
 *   - index.html : JSON-LD, méta ouvertes, aucun champ vide fabriqué
 */
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement as h } from 'react'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
void fileURLToPath

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const problems = []
const esc = (x) => x.replace(/&/g, '&amp;')
const steps = []
const fail = (m) => problems.push(m)

const server = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})

const RR = await import('react-router')
const { Routes, Route } = await import('react-router-dom')
const StaticRouter = RR.StaticRouter

const modules = await Promise.all([
  server.ssrLoadModule('/src/lib/i18n.jsx'),
  server.ssrLoadModule('/src/pages/Home.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/pages/Ranges.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/pages/RangeDetail.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/pages/About.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/pages/Contact.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/pages/NotFound.jsx').then((m) => m.default),
  server.ssrLoadModule('/src/content/company.js'),
])
const [{ LangProvider }, Home, Ranges, RangeDetail, About, Contact, NotFound, companyMod] = modules
const [{ Header }, { Footer }, catalog, { fr: frDict }] = await Promise.all([
  server.ssrLoadModule('/src/components/Header.jsx'),
  server.ssrLoadModule('/src/components/Footer.jsx'),
  server.ssrLoadModule('/src/content/catalog.js'),
  server.ssrLoadModule('/src/content/i18n/fr.js'),
])
const range0 = catalog.products[0]
const company = companyMod.company

const TREE = [
  { path: '/', el: Home },
  { path: '/gammes', el: Ranges },
  { path: '/gammes/:slug', el: RangeDetail },
  { path: '/a-propos', el: About },
  { path: '/contact', el: Contact },
  { path: '*', el: NotFound },
]

function render(location, lang) {
  const tree = h(
    Routes,
    null,
    TREE.map((r) => h(Route, { key: r.path, path: r.path, element: h(r.el) })),
  )
  return renderToStaticMarkup(h(LangProvider, { defaultLang: lang }, h(StaticRouter, { location }, tree)))
}

const count = (html, re) => (html.match(re) || []).length
const MIN_TEXT = { fr: 1200, ar: 1200, en: 1200 }
const ANCHORS = {
  '/': ['gammes', 'pour-qui', 'atouts', 'materiaux', 'applications', 'methode', 'catalogue', 'nous-trouver', 'devis', 'faq'],

  '/a-propos': ['atouts', 'methode', 'materiaux', 'pour-qui', 'catalogue'],
  '/contact': ['nous-trouver', 'catalogue', 'devis', 'faq'],
}

const ROUTES = [
  '/',
  '/gammes',
  '/gammes/bureaux-postes-de-travail',
  '/gammes/slug-inexistant',
  '/a-propos',
  '/contact',
  '/contact?gamme=salles-de-classe',
  '/n-existe-pas',
]

const rendered = {}

for (const lang of ['fr', 'ar', 'en']) {
  for (const route of ROUTES) {
    const key = `${route} [${lang}]`
    let html = ''
    try {
      html = render(route, lang)
    } catch (e) {
      fail(`${key} : exception au rendu — ${e.message}`)
      continue
    }
    if (lang === 'fr') rendered[route] = html

    // --- structure ---------------------------------------------------------
    const h1 = count(html, /<h1\b/g)
    if (h1 !== 1) fail(`${key} : ${h1} <h1> (attendu 1)`)
    if (/⚠/.test(html)) fail(`${key} : clé de traduction manquante`)
    if (/undefined/.test(html)) fail(`${key} : « undefined » affiché`)
    if (/\[object Object\]/.test(html)) fail(`${key} : objet affiché brut`)
    if (/class=""/.test(html)) fail(`${key} : class vide`)
    if (/NaN/.test(html)) fail(`${key} : NaN affiché`)
    if (/\[[ÀA] CONFIRMER\]|lorem ipsum|Lorem Ipsum/i.test(html)) fail(`${key} : marqueur interne visible dans le rendu`)

    // --- images ------------------------------------------------------------
    const imgs = html.match(/<img[^>]*>/g) || []
    const noAlt = imgs.filter((i) => !/alt="[^"]+"|alt=""/.test(i))
    if (noAlt.length) fail(`${key} : ${noAlt.length} <img> sans alt`)
    const noLoading = imgs.filter((i) => !/loading="/.test(i))
    if (noLoading.length) fail(`${key} : ${noLoading.length} <img> sans loading explicite`)

    // --- RTL : uniquement des propriétés logiques -------------------------
    const physical = (html.match(/class="[^"]*\b(?:left|right)-[a-z0-9[\]]+/g) || []).filter((x) => !/text-(?:left|right)/.test(x))
    if (physical.length) fail(`${key} : classes physiques (casse le RTL) → ${physical.slice(0, 3).join(', ')}`)
    if (/text-(?:left|right)/.test(html)) fail(`${key} : text-left/text-right au lieu de text-start/text-end`)

    // --- volume de contenu par langue --------------------------------------
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length < MIN_TEXT[lang] && route !== '/n-existe-pas' && route !== '/gammes/slug-inexistant') {
      fail(`${key} : volume de texte insuffisant (${text.length} < ${MIN_TEXT[lang]}) — traduction incomplète ?`)
    }

    // --- ancres promises -----------------------------------------------------
    for (const id of ANCHORS[route] || []) {
      if (!html.includes(`id="${id}"`)) fail(`${key} : ancre #${id} absente (lien de navigation mort)`)
    }

    steps.push(`${key.padEnd(44)} h1:${h1} h2:${String(count(html, /<h2\b/g)).padStart(2)} img:${String(imgs.length).padStart(2)} a:${String(count(html, /<a\b/g)).padStart(3)} btn:${String(count(html, /<button\b/g)).padStart(2)} ${Math.round(html.length / 1024)} Ko`)
  }
}

// --- langage : la version arabe ne doit rien laisser en français --------------
const htmlAr = render('/', 'ar')
const textAr = htmlAr.replace(/<[^>]*>/g, ' ')
for (const leak of ['Demander un devis', 'Nos gammes', 'Zone Industrielle', 'Fabriqué', 'Sur devis']) {
  if (textAr.includes(leak)) fail(`arabe : fragment français résiduel « ${leak} »`)
}
if (!/خشب|مكتب|مدرسي/.test(htmlAr)) fail('arabe : contenu non traduit (retour au français ?)')

// --- assertions métier (rendu FR) ---------------------------------------------
const home = rendered['/']
if (!/Demander un devis/.test(home)) fail('accueil : CTA principal absent')
if (count(home, /wa\.me\//g) < 3) fail(`accueil : ${count(home, /wa\.me\//g)} liens WhatsApp (≥3 attendus)`)
const CONTACT_ROUTES = ['/', '/a-propos', '/contact']
for (const must of ['+213 555 034 016', '+213 31 606 806', 'Zone Industrielle Palma', 'Constantine']) {
  for (const route of CONTACT_ROUTES) {
    if (!rendered[route].includes(must)) fail(`${route} : donnée réelle absente (${must})`)
  }
}
// bandeau de statut + mention de bas de page : rendus par le shell (Header/Footer)
const shell = (route, lang = 'fr') =>
  renderToStaticMarkup(
    h(LangProvider, { defaultLang: lang }, h(StaticRouter, { location: route }, h('div', null, h(Header), h(Footer)))),
  )
const headerHtml = shell('/')
const ribbon = companyMod.company.demo.ribbon.fr
if (!headerHtml.includes(ribbon.slice(0, 40))) fail('Header : bandeau « concept de présentation » non rendu')
if (!headerHtml.includes('+213 31 606 806')) fail('Header : standard non affiché dans le bandeau supérieur')
if (!headerHtml.includes('/contact#devis')) fail('Header : le CTA principal ne pointe pas vers le formulaire de devis')
if (!shell('/').includes('Concept de présentation')) fail('Footer : mention de statut non officiel absente')
if (!shell('/contact').includes('Éditeur : PALMA MEUBLE EURL')) fail('Footer : mentions légales (éditeur) absentes')
for (const l of ['fr', 'ar', 'en']) {
  const h2 = shell('/', l)
  if (!/aria-expanded|aria-controls/.test(h2)) fail(`Header [${l}] : menu mobile sans contrôle aria`)
  if (count(h2, /href="tel:/g) < 2) fail(`Header [${l}] : moins de 2 liens téléphone`)
  if (h2.includes('mailto:')) fail(`Header [${l}] : lien e-mail rendu alors que l’adresse n’est pas confirmée`)
}

// aucune donnée tarifaire inventée
for (const [route, html] of Object.entries(rendered)) {
  const price = html.match(/\b\d{2,4}\s?(?:DA|DZD|dzd)\b/g)
  if (price) fail(`${route} : prix publié (${price[0]}) — aucun tarif n’a été fourni`)
  if (/Certifi[ée]|ISO\s?9001|garantie [0-9]+ an/i.test(html)) fail(`${route} : certification/garantie chiffrée non fournie`)
  if (['/', '/gammes', '/gammes/bureaux-postes-de-travail'].includes(route) && !/Sur devis/.test(html)) {
    fail(`${route} : mention « Sur devis » absente`)
  }
}

// formulaire de devis : champs attendus, pas de fausse confirmation
const contactHtml = rendered['/contact']
for (const id of ['qf-name', 'qf-phone', 'qf-message', 'qf-type', 'qf-place', 'qf-size']) {
  if (!contactHtml.includes(`id="${id}"`)) fail(`/contact : champ ${id} manquant`)
}
if (/Merci.{0,40}reçu/i.test(contactHtml)) fail('/contact : message de confirmation rendu avant soumission (fausse promesse)')
if (!/aria-expanded/.test(rendered['/'])) fail('FAQ sans aria-expanded')

// page gamme : pas de fausse fiche produit, données non confirmées annoncées
const range = rendered[`/gammes/${range0.slug}`]
if (!range.includes(esc(range0.fr.name))) fail(`page gamme : titre de la gamme absent (${range0.fr.name})`)
if (!range.includes(`contact?gamme=${range0.slug}#devis`)) fail('page gamme : CTA non relié au formulaire avec contexte')
if (!/wa\.me\//.test(range)) fail('page gamme : WhatsApp sans contexte de gamme')
if (!/catalogue/.test(range)) fail('page gamme : renvoi catalogue absent')
if (!/dimensions/i.test(range)) fail('page gamme : les dimensions non confirmées ne sont pas annoncées comme telles')
for (const p of catalog.products) {
  if (!rendered['/gammes'].includes(esc(p.fr.name))) fail(`/gammes : gamme absente de la liste (${p.fr.name})`)
  if (!rendered['/gammes'].includes(p.image)) fail(`/gammes : visuel non référencé (${p.image})`)
}
if (rendered['/gammes'].includes('data:image/svg')) fail('/gammes : image placeholder en dur')

// liste des gammes : recherche + filtres accessibles
const list = rendered['/gammes']
if (!/type="search"/.test(list)) fail('/gammes : champ de recherche absent')
if (!/aria-pressed/.test(list)) fail('/gammes : filtres sans aria-pressed')

// 404
for (const bad of ['/gammes/slug-inexistant', '/n-existe-pas', '/collections']) {
  const html = rendered[bad] || render(bad, 'fr')
  if (!html.includes(frDict.notFound.title)) fail(`${bad} : la page 404 ne s’affiche pas (attendu « ${frDict.notFound.title} »)`)
  if (!/href="\/gammes"/.test(html)) fail(`${bad} : pas de retour vers /gammes`)
  if (/href="\/collections"/.test(html)) fail(`${bad} : lien mort vers /collections`)
  rendered[bad] = html
}
// routes de l’ancienne arborescence : rendues en 404, jamais en erreur blanche
if (!rendered['/collections'].includes('Retour')) fail('/collections : page de repli incomplete')

// --- index.html ---------------------------------------------------------------
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
for (const tag of ['og:title', 'og:description', 'og:image', 'twitter:card', 'name="description"', 'rel="icon"']) {
  if (!indexHtml.includes(tag)) fail(`index.html : ${tag} manquant`)
}
if (!/"@type":\s*"FurnitureStore"/.test(indexHtml)) fail('index.html : JSON-LD FurnitureStore manquant')
if (!/<html lang="fr" dir="ltr">/.test(indexHtml)) fail('index.html : lang/dir absents')
if (/17, Rue Didouche/.test(indexHtml)) fail('index.html : adresse de la maquette fictive encore présente')
for (const must of ['+213 555 034 016', '+213 31 606 806', 'Zone Industrielle Palma', 'Constantine']) {
  if (!indexHtml.includes(must)) fail(`index.html : donnée réelle absente (${must})`)
}
if (/"email":\s*""/.test(indexHtml)) fail('index.html : champ email vide dans le JSON-LD (à retirer tant que non confirmé)')

// canonical/hreflang désactivés tant que le domaine n’est pas confirmé
const ranges = [
  ['siteUrl', companyMod.siteUrl === null],
  ['email', company.email === null],
  ['hours', company.hours === null],
  ['responseTime', company.responseTime === null],
]
for (const [label, ok] of ranges) if (!ok) fail(`company.js : ${label} — attendu`)
if (/<link rel="canonical"/.test(indexHtml)) fail('index.html : canonical absoluf publié alors que le domaine n’est pas confirmé')
if (/hreflang=/.test(indexHtml)) fail('index.html : hreflang publié alors que le domaine n’est pas confirmé')
for (const f of ['src/components/Seo.jsx']) {
  const src = readFileSync(join(root, f), 'utf8')
  if (!/siteUrl/.test(src)) fail(`${f} : le canonical n’est pas conditionné au domaine confirmé`)
}

await server.close()

console.log(steps.map((s) => '  ✓ ' + s).join('\n'))
if (problems.length) {
  const uniq = [...new Set(problems)]
  console.log('\n' + uniq.map((p) => '  ✗ ' + p).join('\n'))
  console.log(`\n${uniq.length} problème(s) à corriger`)
  process.exit(1)
}
console.log(`\n${ROUTES.length} routes × 3 langues : rendu, ancres, coordonnées et langue arabe validés — 0 problème.`)
