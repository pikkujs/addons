import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const CropInput = z.object({
  contentKey: z.string().describe('Content key of the image to crop'),
  outputContentKey: z.string().describe('Content key to write the cropped image to'),
  left: z.number().describe('Left offset in pixels'),
  top: z.number().describe('Top offset in pixels'),
  width: z.number().describe('Crop width in pixels'),
  height: z.number().describe('Crop height in pixels'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff']).optional().describe('Output format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const CropOutput = z.object({
  outputContentKey: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
})

export const imageCrop = pikkuSessionlessFunc({
  description: 'Crop a region from an image',
  input: CropInput,
  output: CropOutput,
  node: { displayName: 'Crop Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, left, top, width, height, format, quality }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    let pipeline = sharp(buffer).extract({ left, top, width, height })
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
