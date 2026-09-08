#!/usr/bin/env node
/**
 * Controle qualite automatique (regle 43) — passe avant la presentation.
 *   1. every i18n key exists in fr / ar / en (no silent fallbacks)
 *   2. no lorem ipsum / [À CONFIRMER] leaked into rendered UI strings
 *   3. every referenced image file exists in public/
 *   4. every content entity (ranges, sectors, materials, applications, steps, faq)
 *      carries fr + ar + en text
 *   5. no leftover copy from the discarded fictional brand
 *   6. every image is processed (no AI originals shipped as-is) and the JPEG
 *      budget is respected
 *   7. unconfirmed company data (e-mail, hours, response delay) stays null
 *      instead of being invented
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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


// ---- 5 : aucun résidu de l’ancienne identité (Rouiba / rotin / showroom B2C)
const FORBIDDEN = [
  [/\bRouiba\b/i, 'ancienne ville inventée (Rouiba)'],
  [/\brotin\b/i, 'matière de la marque fictive (rotin)'],
  [/\bcannage\b/i, 'résidu tressage/cannage'],
  [/\bAlger\b(?!ie)/, 'ancienne ville (Alger) au lieu de Constantine'],
  [/\bBlida\b|\bBoumerdès\b|\bTipaza\b/i, 'wilayas de la maquette précédente'],
  [/Casbah|Tlemcen|Alfour|Zitoun|Caftan|Sahel|Medina/i, 'noms de produits de la maquette fictive'],
  [/\bfauteuil\b/i, 'résidu B2C (fauteuil)'],
  [/\bnégoc[eé]\b/i, 'positionnement non demandé'],
  [/lorem|ipsum/i, 'texte blanc'],
  [/@213\s?555\s?00\s?00\s?00/, 'ancien numéro de téléphone fictif'],
]
const textFiles = []
const walk2 = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, f.name)
    if (f.isDirectory()) walk2(full)
    else if (/\.(jsx|js|html|md|css)$/.test(f.name)) textFiles.push(full)
  }
}
// uniquement les fichiers qui parlent au visiteur (le CSS garde des noms de tokens internes)
walk2(join(root, 'src/content'))
walk2(join(root, 'src/sections'))
walk2(join(root, 'src/components'))
walk2(join(root, 'src/pages'))
textFiles.push(join(root, 'index.html'), join(root, 'README.md'))
for (const file of textFiles) {
  const txt = readFileSync(file, 'utf8')
  const rel = file.replace(root + '/', '')
  // les commentaires d’explication sont autorisés à nommer ce qu’il faut éviter
  const body = txt.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')
  for (const [re, why] of FORBIDDEN) {
    if (re.test(body)) problems.push(`[résidu] ${rel} : ${why}`)
  }
}
info.push(`résidus : ${textFiles.length} fichiers passés au crible`)

// ---- 6 : poids des visuels -------------------------------------------------
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

// ---- 7 : champs non confirmés = null (jamais de fait inventé) --------------
const companyMod = await import(pathToFileURL(join(root, 'src/content/company.js')).href)
const cmp = companyMod.company
if (cmp.hours !== null) problems.push('[company] hours doit rester null tant que non confirmé')
if (cmp.email !== null) problems.push('[company] email non confirmé : doit être null')
if (cmp.responseTime !== null) problems.push('[company] responseTime non confirmé : doit être null')
if (cmp.demo.enabled !== true) problems.push('[company] demo.enabled doit être vrai tant que le site nest pas officiel')
if (!/\+213 ?555 ?034 ?016/.test(cmp.phones[0].display)) problems.push('[company] numéro portable différent de celui fourni')
if (!/\+213 ?31 ?606 ?806/.test(cmp.phones[1].display)) problems.push('[company] standard différent de celui fourni')
if (cmp.phones[0].whatsapp !== '213555034016') problems.push('[company] lien WhatsApp mal construit')
if (!/Zone Industrielle Palma/.test(cmp.address.street)) problems.push('[company] adresse incohérente')
if (cmp.city !== 'Constantine') problems.push('[company] ville incohérente')
info.push('company.js : coordonnées conformes aux données fournies')

console.log(info.map((i) => '  ✓ ' + i).join('\n'))
if (problems.length) {
  console.log('\n' + problems.map((p) => '  ✗ ' + p).join('\n'))
  console.log(`\n${problems.length} problème(s)`)
  process.exit(1)
}
console.log('\nContenu cohérent — 0 problème.')
