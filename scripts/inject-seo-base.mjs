#!/usr/bin/env node
/**
 * Après build : rend absolues les URL qui doivent l’être (Open Graph, Twitter,
 * canonical, JSON-LD) à partir de VITE_SITE_URL. Sans cette variable, le build
 * reste intact — aucun domaine n’est inventé pour le client.
 *
 *   VITE_SITE_URL=https://exemple.dz npm run build
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
void fileURLToPath

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const base = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '')
const outDir = process.env.DIST_DIR || 'dist'
const file = join(root, outDir, 'index.html')

if (!base) {
  // aucune injection, mais on valide quand même le HTML livré (build client)
  const html = readFileSync(file, 'utf8')
  const problems = await validate(html, '')
  if (problems.length) {
    console.error('seo-base : HTML du build invalide →\n  - ' + problems.join('\n  - '))
    process.exit(1)
  }
  console.log('seo-base : VITE_SITE_URL non défini → canonical et OG laissés relatifs (aucun domaine inventé). HTML validé.')
  process.exit(0)
}
if (!existsSync(file)) {
  console.error(`seo-base : ${outDir}/index.html introuvable — lancer \`npm run build\` d’abord.`)
  process.exit(1)
}
if (!/^https?:\/\//.test(base)) {
  console.error(`seo-base : VITE_SITE_URL invalide (${base}) — attendu https://…`)
  process.exit(1)
}

/** Relit le HTML livré : une balise mal formée doit faire échouer le build. */
async function validate(src, prefix) {
  const { JSDOM } = await import('jsdom')
  const doc = new JSDOM(src).window.document
  const meta = (sel) => doc.querySelector(sel)
  const errs = []
  if (!/<title>[^<]+<\/title>/.test(src)) errs.push('<title> absente ou vide')
  if (!meta('meta[name="description"]')?.getAttribute('content')) errs.push('meta description absente')
  if (!meta('meta[property="og:type"]')?.getAttribute('content')) errs.push('og:type absent ou abîmé')
  if (!meta('meta[property="og:title"]')?.getAttribute('content')) errs.push('og:title absent ou abîmé')
  if (!meta('meta[property="og:image"]')?.getAttribute('content')) errs.push('og:image absent')
  if (!meta('link[rel="icon"]')?.getAttribute('href')) errs.push('favicon non déclaré')
  const counted = (src.match(/<meta\s[^>]*content="/g) || []).length
  const parsed = doc.querySelectorAll('head meta[content]').length
  if (counted !== parsed) errs.push(`${counted - parsed} balise(s) méta en trop ou imbriquées`)
  if (prefix) {
    if (!meta('link[rel="canonical"]')?.getAttribute('href')?.startsWith(prefix)) errs.push('canonical absent ou non absolu')
    if (!meta('meta[property="og:url"]')?.getAttribute('content')?.startsWith(prefix)) errs.push('og:url absent ou non absolu')
    if (!meta('meta[property="og:image"]')?.getAttribute('content')?.startsWith(prefix + '/')) errs.push('og:image non absolu')
  } else if (/<link rel="canonical"|https?:\/\/[^"]*(?:exemple|preview|vercel|netlify)/i.test(src)) {
    errs.push('URL absolue publiée alors qu’aucun domaine n’est confirmé')
  }
  return errs
}

let html = readFileSync(file, 'utf8')
const before = html
const done = []

// og:image / og:image:alt / twitter:image → absolus
/**
 * Vite préfixe déjà les URL de l’HTML par la `base` de build (ex. /palma/).
 * On normalise : on retire ce préfixe, puis on pose l’URL absolue du site.
 */
const buildBase = (process.env.VITE_BASE || '/').replace(/\/$/, '')
const absolutize = (attr, value) => {
  const re = new RegExp(`(<meta[^>]+${attr}="${value}" content=")\/(?:${buildBase}\/)?([^"]+)(")`, 'g')
  const before = html
  html = html.replace(re, `$1${base}/$2$3`)
  if (before !== html) done.push(`${attr}:${value}`)
}
absolutize('property', 'og:image')
absolutize('name', 'twitter:image')

// og:url (insertion d’une balise complète, jamais d’un fragment)
if (!/<meta property="og:url"/.test(html)) {
  const re = /([ \t]*)<meta property="og:type"/
  if (re.test(html)) {
    html = html.replace(re, `$1<meta property="og:url" content="${base}/" />\n$1<meta property="og:type"`)
    done.push('og:url')
  } else {
    console.error('seo-base : balise og:type introuvable — insertion de og:url annulée.')
    process.exit(1)
  }
}

if (!/<link rel="canonical"/.test(html)) {
  html = html.replace(/([ \t]*)(<\/head>)/, `$1<link rel="canonical" href="${base}/" />\n$1$2`)
  done.push('canonical')
}

// JSON-LD : url de l’organisation + images absolues
html = html.replace(/("@context": "https:\/\/schema\.org",\s*\n(\s*)"@type": "FurnitureStore")/, `$1,\n$2"url": "${base}/"`)
html = html.replace(/"image": "\/(?:[^"]*\/)?images\/([^"]+)"/g, `"image": "${base}/images/$1"`)
done.push('json-ld')

const errors = await validate(html, base)
if (errors.length) {
  console.error('seo-base : HTML final invalide →\n  - ' + errors.join('\n  - '))
  process.exit(1)
}

writeFileSync(file, html)

// robots.txt + sitemap.xml : uniquement quand une base réelle est fournie
const robots = join(root, outDir, 'robots.txt')
if (existsSync(robots)) {
  const body = readFileSync(robots, 'utf8').trimEnd()
  writeFileSync(robots, `${body}\n\nSitemap: ${base}/sitemap.xml\n`)
}
const { products } = await import('../src/content/catalog.js')
const routes = ['/', '/gammes', '/a-propos', '/contact', ...products.map((x) => `/gammes/${x.slug}`)]
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => `  <url><loc>${base}${r === '/' ? '' : r}</loc><xhtml:link rel="alternate" hreflang="x-default" href="${base}${r === '/' ? '' : r}"/></url>`),
  '</urlset>',
].join('\n')
writeFileSync(join(root, outDir, 'sitemap.xml'), `${xml}\n`)
done.push('robots + sitemap')
console.log(`seo-base : dist/index.html aligné sur ${base} (${[...new Set(done)].join(', ')})${before === html ? ' — aucune modification nécessaire' : ''}`)
