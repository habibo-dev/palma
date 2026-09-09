#!/usr/bin/env node
/**
 * Prépare la publication GitHub Pages : construit le site dans `docs/`, sous le
 * sous-répertoire /palma/, avec un repli SPA (404.html) pour que les liens profonds
 * partagés fonctionnent, et un .nojekyll pour ne pas passer par Jekyll.
 *
 *   node scripts/publish-pages.mjs          # puis commit + push de docs/
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.PAGES_BASE || '/palma/docs/'
const SITE = (process.env.PAGES_SITE_URL || 'https://habibo-dev.github.io/palma/docs').replace(/\/+$/, '')
const OUT = join(root, 'docs')

const env = {
  ...process.env,
  VITE_BASE: BASE,
  VITE_SITE_URL: SITE,
  DIST_DIR: 'dist',
}

console.log(`pages : build base=${BASE} url=${SITE}`)
execSync('npm run build', { cwd: root, env, stdio: 'inherit' })

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
cpSync(join(root, 'dist'), OUT, { recursive: true })

// Repli SPA : GitHub Pages sert 404.html (à la racine publiée = racine du dépôt ici)
// pour toute URL inconnue ; le routeur React reprend alors le chemin demandé.
const html = readFileSync(join(OUT, 'index.html'), 'utf8')
writeFileSync(join(OUT, '404.html'), html)
writeFileSync(join(OUT, '.nojekyll'), '')
writeFileSync(join(root, '404.html'), html)
writeFileSync(join(root, '.nojekyll'), '')
for (const f of ['robots.txt', 'sitemap.xml']) {
  if (existsSync(join(OUT, f))) cpSync(join(OUT, f), join(root, f))
}

const files = []
const walk = (dir, prefix = '') => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name), join(prefix, e.name))
    else files.push(join(prefix, e.name))
  }
}
walk(OUT)
console.log(`pages : ${files.length} fichiers dans docs/ + repli 404.html à la racine publiée`)
console.log(`pages : URL -> ${SITE}/`)
