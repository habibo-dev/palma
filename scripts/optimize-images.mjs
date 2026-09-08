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
  // hero
  { name: 'hero-01', ratio: 1.12, width: 1500, q: 78 },
  { name: 'hero-02', ratio: 1.9, width: 1600, q: 72 },
  // catalogue
  { name: 'product-01', ratio: 0.82, width: 900 },
  { name: 'product-02', ratio: 1.28, width: 1100 },
  { name: 'product-03', ratio: 1.28, width: 1100 },
  { name: 'product-04', ratio: 0.82, width: 900 },
  { name: 'product-05', ratio: 1.28, width: 1100 },
  { name: 'product-06', ratio: 0.82, width: 900 },
  { name: 'product-07', ratio: 1.28, width: 1100 },
  { name: 'product-08', ratio: 0.82, width: 900 },
  // ambiances
  { name: 'ambiance-01', ratio: 1.72, width: 1280, fallback: 'product-05' },
  { name: 'ambiance-02', ratio: 0.72, width: 720, fallback: 'product-06' },
  { name: 'ambiance-03', ratio: 1.02, width: 720, fallback: 'hero-01' },
  { name: 'ambiance-04', ratio: 1.02, width: 950, fallback: 'product-08' },
  { name: 'ambiance-05', ratio: 1.72, width: 1280, fallback: 'product-03' },
  // matieres — recadrages serres dans les photos produits existantes
  { name: 'material-01', ratio: 1.28, width: 700, src: 'product-03', crop: { x: 0.18, y: 0.42, w: 0.5, h: 0.42 } },
  { name: 'material-02', ratio: 1.28, width: 700, src: 'product-01', crop: { x: 0.3, y: 0.5, w: 0.42, h: 0.34 } },
  { name: 'material-03', ratio: 1.28, width: 700, src: 'product-02', crop: { x: 0.34, y: 0.45, w: 0.4, h: 0.32 } },
  { name: 'material-04', ratio: 1.28, width: 700, src: 'product-06', crop: { x: 0.2, y: 0.6, w: 0.45, h: 0.32 } },
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
