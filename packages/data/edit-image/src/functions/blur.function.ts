import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const BlurInput = z.object({
  contentKey: z.string().describe('Content key of the image to blur'),
  outputContentKey: z.string().describe('Content key to write the blurred image to'),
  sigma: z.number().min(0.3).max(1000).describe('Gaussian blur sigma (0.3-1000)'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const BlurOutput = z.object({
  outputContentKey: z.string(),
  size: z.number(),
})

export const imageBlur = pikkuSessionlessFunc({
  description: 'Apply Gaussian blur to an image',
  input: BlurInput,
  output: BlurOutput,
  node: { displayName: 'Blur Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, sigma, format, quality }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    let pipeline = sharp(buffer).blur(sigma)
    if (format) {
      pipeline = pipeline.toFormat(format, { quality })
    }
    const output = await pipeline.toBuffer({ resolveWithObject: true })
    await content.writeFile(outputContentKey, Readable.from(output.data))
    return {
      outputContentKey,
      size: output.info.size,
    }
  },
})
