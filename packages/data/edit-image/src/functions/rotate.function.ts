import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const RotateInput = z.object({
  contentKey: z.string().describe('Content key of the image to rotate'),
  outputContentKey: z.string().describe('Content key to write the rotated image to'),
  angle: z.number().describe('Rotation angle in degrees (positive = clockwise)'),
  background: z.string().optional().describe('Background color for uncovered areas (e.g. "#ffffff", "transparent")'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const RotateOutput = z.object({
  outputContentKey: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
})

export const imageRotate = pikkuSessionlessFunc({
  description: 'Rotate an image by a given angle',
  input: RotateInput,
  output: RotateOutput,
  node: { displayName: 'Rotate Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, angle, background, format, quality }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    let pipeline = sharp(buffer).rotate(angle, { background: background ?? '#000000' })
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
