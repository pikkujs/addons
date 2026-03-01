import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const CompositeInput = z.object({
  contentKey: z.string().describe('Content key of the base image'),
  overlayContentKey: z.string().describe('Content key of the overlay image'),
  outputContentKey: z.string().describe('Content key to write the composited image to'),
  left: z.number().optional().describe('Left offset for overlay'),
  top: z.number().optional().describe('Top offset for overlay'),
  gravity: z.enum(['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'centre']).optional().describe('Overlay gravity (default: northwest)'),
  blend: z.enum(['over', 'in', 'out', 'atop', 'dest', 'dest-over', 'dest-in', 'dest-out', 'dest-atop', 'xor', 'add', 'saturate', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'colour-dodge', 'colour-burn', 'hard-light', 'soft-light', 'difference', 'exclusion']).optional().describe('Blend mode'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const CompositeOutput = z.object({
  outputContentKey: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
})

export const imageComposite = pikkuSessionlessFunc({
  description: 'Composite (overlay) one image on top of another',
  input: CompositeInput,
  output: CompositeOutput,
  node: { displayName: 'Composite Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, overlayContentKey, outputContentKey, left, top, gravity, blend, format, quality }) => {
    const baseBuffer = await content.readFileAsBuffer(contentKey)
    const overlayBuffer = await content.readFileAsBuffer(overlayContentKey)

    const compositeOptions: sharp.OverlayOptions = { input: overlayBuffer }
    if (left !== undefined && top !== undefined) {
      compositeOptions.left = left
      compositeOptions.top = top
    } else if (gravity) {
      compositeOptions.gravity = gravity
    }
    if (blend) {
      compositeOptions.blend = blend
    }

    let pipeline = sharp(baseBuffer).composite([compositeOptions])
    if (format) {
      pipeline = pipeline.toFormat(format, { quality })
    }
    const output = await pipeline.toBuffer({ resolveWithObject: true })
    await content.writeFile(outputContentKey, Readable.from(output.data))
    return {
      outputContentKey,
      width: output.info.width,
      height: output.info.height,
      size: output.info.size,
    }
  },
})
