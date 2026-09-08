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
const file = join(root, 'dist/index.html')

if (!base) {
  console.log('seo-base : VITE_SITE_URL non défini → canonical et OG laissés relatifs (aucun domaine inventé).')
  process.exit(0)
}
if (!existsSync(file)) {
  console.error('seo-base : dist/index.html introuvable — lancer `npm run build` d’abord.')
  process.exit(1)
}
if (!/^https?:\/\//.test(base)) {
  console.error(`seo-base : VITE_SITE_URL invalide (${base}) — attendu https://…`)
  process.exit(1)
}

let html = readFileSync(file, 'utf8')
const before = html
const done = []

/** Insère une balise <meta> complète juste avant la balise repérée par `anchor`. */
function insertMetaBefore(anchor, tag) {
  const re = new RegExp(`([ \\t]*)(${anchor})`)
  if (!re.test(html)) return false
  html = html.replace(re, (_m, indent, a) => `${indent}<meta ${tag} />\n${indent}${a}`)
  return true
}
const hasTag = (attr, value) => new RegExp(`<meta[^>]+${attr}="${value}"`).test(html)

// og:image / og:image:alt / twitter:image → absolus
html = html.replace(/(<meta[^>]*content=")\/((?:images|og)\/[^"]+)/g, '$1' + base + '/$2')
if (/content="\/images\//.test(html)) {
  html = html.replace(/content="\/images\//g, `content="${base}/images/`)
  done.push('og:image')
} else if (html.includes(base + '/images/')) done.push('og:image')

// og:url + canonical
if (!hasTag('property', 'og:url')) {
  if (insertMetaBefore('property="og:type"', `property="og:url" content="${base}/"`)) done.push('og:url')
} else done.push('og:url')

if (!/<link rel="canonical"/.test(html)) {
  html = html.replace(/([ \t]*)(<\/head>)/, `$1<link rel="canonical" href="${base}/" />\n$1$2`)
  done.push('canonical')
}

// JSON-LD : url de l’organisation + images absolues
html = html.replace(/("@context": "https:\/\/schema\.org",\s*\n(\s*)"@type": "FurnitureStore")/, `$1,\n$2"url": "${base}/"`)
html = html.replace(/"image": "(\/images\/[^"]+)"/g, `"image": "${base}$1"`)
done.push('json-ld')

/* garde-fous : jamais de balise cassée ni de doublon */
const broken = html.match(/<meta[^>]*content="[^"]*"\s+content="[^>]*>/g) || []
if (broken.length) {
  console.error(`seo-base : balises méta mal formées générées →\n  ${broken.join('\n  ')}`)
  process.exit(1)
}
if ((html.match(/<link rel="canonical"/g) || []).length > 1) {
  console.error('seo-base : canonical dupliqué')
  process.exit(1)
}

writeFileSync(file, html)

// robots.txt + sitemap.xml : uniquement quand une base réelle est fournie
const robots = join(root, 'dist/robots.txt')
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
writeFileSync(join(root, 'dist/sitemap.xml'), `${xml}\n`)
done.push('robots + sitemap')
console.log(`seo-base : dist/index.html aligné sur ${base} (${[...new Set(done)].join(', ')})${before === html ? ' — aucune modification nécessaire' : ''}`)
