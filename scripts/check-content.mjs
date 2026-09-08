#!/usr/bin/env node
/**
 * Controle qualite automatique (regle 43) — passe avant la presentation.
 *   1. every i18n key exists in fr / ar / en (no silent fallbacks)
 *   2. no lorem ipsum / [À CONFIRMER] leaked into rendered UI strings
 *   3. every referenced image file exists in public/
 *   4. every content entity (products, sectors, materials, ambiances, steps, faq)
 *      carries fr + ar + en text
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const problems = []
const info = []

const import_ = (p) => import(p)

// ---- 1 & 2 : dictionnaires -------------------------------------------------
const langs = ['fr', 'ar', 'en']
const dicts = {}
for (const l of langs) {
  const mod = await import_(`${root}/src/content/i18n/${l}.js`)
  dicts[l] = mod[l]
}

const flat = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if ('fr' in v || 'ar' in v || 'en' in v) return [[key, JSON.stringify(v)]]
      return flat(v, key)
    }
    return [[key, JSON.stringify(v)]]
  })

const keysOf = (d) => new Set(flat(d).map(([k]) => k))
const frKeys = keysOf(dicts.fr)

for (const l of langs) {
  const other = keysOf(dicts[l])
  const missing = [...frKeys].filter((k) => !other.has(k))
  const extra = [...other].filter((k) => !frKeys.has(k))
  if (missing.length) problems.push(`[i18n:${l}] clés manquantes → ${missing.join(', ')}`)
  if (extra.length) problems.push(`[i18n:${l}] clés en trop → ${extra.join(', ')}`)
}
info.push(`i18n : ${frKeys.size} clés × ${langs.length} langues`)

for (const l of langs) {
  for (const [key, raw] of flat(dicts[l])) {
    if (/lorem|ipsum|TODO|FIXME|placeholder|Image here/i.test(raw)) problems.push(`[copy:${l}] ${key} contient du texte non rédactionnel`)
    if (/À CONFIRMER/.test(raw)) problems.push(`[copy:${l}] ${key} expose une mention interne`)
    if (/undefined|\[object/.test(raw)) problems.push(`[copy:${l}] ${key} valeur cassée`)
  }
}

// ---- 3 : images référencées ------------------------------------------------
const refs = new Set()
const walk = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, f.name)
    if (f.isDirectory()) walk(full)
    else if (/\.(jsx|js)$/.test(f.name)) {
      const src = readFileSync(full, 'utf8')
      for (const m of src.matchAll(/['"`](\/images\/[\w.-]+\.jpg)['"`]/g)) refs.add(m[1])
      for (const m of src.matchAll(/image:\s*['"`]([^'"`]+)['"`]/g)) if (m[1].startsWith('/images/')) refs.add(m[1])
    }
  }
}
walk(join(root, 'src'))
for (const r of [...refs].sort()) {
  if (!existsSync(join(root, 'public', r))) problems.push(`[image] fichier absent → ${r}`)
}
info.push(`images : ${refs.size} chemins référencés`)

// ---- 4 : entités traduites -------------------------------------------------
const catalogs = await Promise.all([import_(`${root}/src/content/catalog.js`), import_(`${root}/src/content/entities.js`)])
const [catalog, entities] = catalogs
const items = [
  ...catalog.products.map((p) => ['product:' + p.slug, p]),
  ...catalog.categories.map((c) => ['category:' + c.id, c]),
  ...entities.sectors.map((s) => ['sector:' + s.id, s]),
  ...entities.materials.map((m) => ['material:' + m.id, m]),
  ...entities.advantages.map((a) => ['advantage:' + a.icon, a]),
  ...entities.ambiances.map((a, i) => ['ambiance:' + i, a]),
  ...entities.process.map((p, i) => ['step:' + i, p]),
  ...entities.faq.map((f, i) => ['faq:' + i, f]),
]

for (const [label, item] of items) {
  for (const l of langs) {
    const v = item[l]
    if (!v) problems.push(`[data] ${label} sans traduction ${l}`)
    else if (typeof v === 'object' && !Object.keys(v).length) problems.push(`[data] ${label}.${l} vide`)
  }
  if (item.image && !existsSync(join(root, 'public', item.image))) problems.push(`[data] ${label} image absente → ${item.image}`)
}
info.push(`données : ${items.length} entités multilingues`)

// ---- 5 : poids des visuels -------------------------------------------------
const imgDir = join(root, 'public/images')
if (existsSync(imgDir)) {
  const files = readdirSync(imgDir).filter((f) => f.endsWith('.jpg'))
  let total = 0
  let heaviest = { name: '-', kb: 0 }
  for (const f of files) {
    const kb = readFileSync(join(imgDir, f)).length / 1024
    total += kb
    if (kb > heaviest.kb) heaviest = { name: f, kb }
  }
  if (total / files.length > 260) problems.push(`[poids] moyenne JPEG > 260 Ko (${Math.round(total / files.length)} Ko)`)
  info.push(`poids : ${files.length} jpg, ${Math.round(total)} Ko total, max ${heaviest.name} ${Math.round(heaviest.kb)} Ko`)
}

console.log(info.map((i) => '  ✓ ' + i).join('\n'))
if (problems.length) {
  console.log('\n' + problems.map((p) => '  ✗ ' + p).join('\n'))
  console.log(`\n${problems.length} problème(s)`)
  process.exit(1)
}
console.log('\nContenu cohérent — 0 problème.')
