import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const FlipInput = z.object({
  bucket: z.string().describe('Storage bucket containing the image'),
  contentKey: z.string().describe('Content key of the image'),
  outputContentKey: z.string().describe('Content key to write the flipped image to'),
  direction: z.enum(['horizontal', 'vertical', 'both']).describe('Flip direction'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const FlipOutput = z.object({
  outputContentKey: z.string(),
  size: z.number(),
})

export const imageFlip = pikkuSessionlessFunc({
  description: 'Flip an image horizontally or vertically',
  input: FlipInput,
  output: FlipOutput,
  node: { displayName: 'Flip Image', category: 'Image', type: 'action' },
  func: async ({ content }, { bucket, contentKey, outputContentKey, direction, format, quality }) => {
    const buffer = await content.readFileAsBuffer({ bucket, key: contentKey })
    let pipeline = sharp(buffer)
    if (direction === 'vertical' || direction === 'both') {
      pipeline = pipeline.flip()
    }
    if (direction === 'horizontal' || direction === 'both') {
      pipeline = pipeline.flop()
    }
    if (format) {
      pipeline = pipeline.toFormat(format, { quality })
    }
    const output = await pipeline.toBuffer({ resolveWithObject: true })
    await content.writeFile({ bucket, key: outputContentKey, stream: Readable.from(output.data) })
    return {
      outputContentKey,
      size: output.info.size,
    }
  },
})
