import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const ResizeInput = z.object({
  contentKey: z.string().describe('Content key of the image to resize'),
  outputContentKey: z.string().describe('Content key to write the resized image to'),
  width: z.number().optional().describe('Target width in pixels'),
  height: z.number().optional().describe('Target height in pixels'),
  fit: z.enum(['cover', 'contain', 'fill', 'inside', 'outside']).optional().describe('How the image should fit (default: cover)'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const ResizeOutput = z.object({
  outputContentKey: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number().describe('Output file size in bytes'),
})

export const imageResize = pikkuSessionlessFunc({
  description: 'Resize an image',
  input: ResizeInput,
  output: ResizeOutput,
  node: { displayName: 'Resize Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, width, height, fit, format, quality }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    let pipeline = sharp(buffer).resize({ width, height, fit: fit ?? 'cover' })
    if (format) {
      pipeline = pipeline.toFormat(format, { quality })
    } else if (quality) {
      pipeline = pipeline.jpeg({ quality })
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
