// One-time generator: rasterizes scripts/og.svg -> public/og.png (1200x630).
// Social scrapers (Discord, X, etc.) don't render SVG, so the share card must be PNG.
// Run with: node scripts/gen-og.mjs   (requires the `sharp` dev dependency)
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(here, 'og.svg'))
const out = join(here, '..', 'public', 'og.png')

// Rasterize at 2x density then downscale for crisp text.
await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile(out)

console.log('Wrote', out)
