#!/usr/bin/env node
/**
 * Pipeline images — 100% local (sharp).
 *  .imgsrc/*.jpg      fichiers bruts generes (hors git)
 *  public/images/     versions web, recadrees au ratio exact du composant
 *
 * Le recadrage « cover » au ratio demande garantit zero saut de mise en page
 * (le composant <Img/> reserve exactement le meme ratio) et des poids maitrises.
 * Si un brut manque, `fallback` sert de source (detail recadre) : le site ne
 * casse jamais pendant la production des visuels.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = join(root, '.imgsrc')
const OUT = join(root, 'public', 'images')
mkdirSync(OUT, { recursive: true })

const MANIFEST = [
  // accueil
  { name: 'hero-01', ratio: 1.16, width: 1400, q: 80 },
  { name: 'fabric-01', ratio: 1.9, width: 1400, q: 74 },
  // gammes (cartes 4/3)
  ...[1, 2, 3, 4, 5, 6, 7].map((i) => ({ name: `range-0${i}`, ratio: 1.32, width: 1080, q: 78 })),
  // applications (tuiles de la galerie)
  { name: 'apply-01', ratio: 1.62, width: 1400, q: 76 },
  // matieres — recadrages serres dans les visuels produits
  { name: 'material-01', ratio: 1.28, width: 720, src: 'range-01', crop: { x: 0.1, y: 0.28, w: 0.55, h: 0.42 } },
  { name: 'material-02', ratio: 1.28, width: 720, src: 'range-07', crop: { x: 0.08, y: 0.2, w: 0.42, h: 0.55 } },
  { name: 'material-03', ratio: 1.28, width: 720, src: 'range-07', crop: { x: 0.5, y: 0.12, w: 0.45, h: 0.6 } },
  { name: 'material-04', ratio: 1.28, width: 720, src: 'range-04', crop: { x: 0.05, y: 0.5, w: 0.5, h: 0.4 } },
]

const KB = (b) => (b / 1024).toFixed(0)
const report = []

for (const item of MANIFEST) {
  const ownRaw = join(RAW, `${item.name}.jpg`)
  const fallbackRaw = item.fallback ? join(RAW, `${item.fallback}.jpg`) : null
  const srcFile = existsSync(ownRaw) ? ownRaw : fallbackRaw && existsSync(fallbackRaw) ? fallbackRaw : item.src ? join(RAW, `${item.src}.jpg`) : null

  if (!srcFile || !existsSync(srcFile)) {
    report.push({ ...item, status: 'MISSING SOURCE' })
    continue
  }

  try {
    let pipeline = sharp(srcFile, { failOn: 'none' }).rotate()
    const meta = await sharp(srcFile, { failOn: 'none' }).metadata()
    let W = meta.width
    let H = meta.height

    if (item.crop) {
      pipeline = pipeline.extract({
        left: Math.round(item.crop.x * W),
        top: Math.round(item.crop.y * H),
        width: Math.max(32, Math.round(item.crop.w * W)),
        height: Math.max(32, Math.round(item.crop.h * H)),
      })
      W = Math.max(32, Math.round(item.crop.w * W))
      H = Math.max(32, Math.round(item.crop.h * H))
    }

    // Crop « cover » au ratio exact, sans jamais agrandir la source :
    // le ratio de sortie == celui reserve par <Img/>, donc zero saut de mise en page.
    const ratio = item.ratio
    let cropW = Math.min(W, H * ratio)
    let cropH = cropW / ratio
    if (cropH > H) {
      cropH = H
      cropW = cropH * ratio
    }
    const outW = Math.max(160, Math.min(item.width, Math.round(cropW)))
    const outH = Math.round(outW / ratio)

    const info = await pipeline
      .resize({ width: outW, height: outH, fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: item.q ?? 76, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true })

    writeFileSync(join(OUT, `${item.name}.jpg`), info.data)

    report.push({
      name: item.name,
      status: item.crop || item.src ? 'crop-detail' : ownRaw === srcFile ? 'ok' : 'fallback',
      dims: `${info.info.width}×${info.info.height}`,
      kb: KB(info.info.size),
    })
  } catch (err) {
    report.push({ name: item.name, status: `ERROR ${err.message.slice(0, 60)}` })
  }
}

// petit manifeste lu par le composant <Img/> pour eventuellement indexer les variantes
writeFileSync(
  join(OUT, 'manifest.json'),
  JSON.stringify(
    MANIFEST.map((m) => ({ src: `/images/${m.name}.jpg`, ratio: m.ratio })),
    null,
    2,
  ),
)

const table = report.map((r) => `${String(r.name).padEnd(14)} ${String(r.status).padEnd(13)} ${String(r.dims || '-').padEnd(10)} ${String(r.kb || '-').padStart(5)} KB`)
const total = report.reduce((acc, r) => acc + (Number(r.kb) || 0), 0)
console.log(table.join('\n'))
console.log(`\n${report.length} visuels · ${total} KB total · ${OUT.replace(root + '/', '')}/`)
if (report.some((r) => r.status.startsWith('MISSING') || r.status.startsWith('ERROR'))) process.exitCode = 1
