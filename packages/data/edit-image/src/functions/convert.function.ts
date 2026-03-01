import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'
import { Readable } from 'node:stream'

export const ConvertInput = z.object({
  contentKey: z.string().describe('Content key of the image to convert'),
  outputContentKey: z.string().describe('Content key to write the converted image to'),
  format: z.enum(['jpeg', 'png', 'webp', 'avif', 'tiff', 'gif']).describe('Target format'),
  quality: z.number().min(1).max(100).optional().describe('Output quality (1-100)'),
})

export const ConvertOutput = z.object({
  outputContentKey: z.string(),
  format: z.string(),
  size: z.number(),
})

export const imageConvert = pikkuSessionlessFunc({
  description: 'Convert an image to a different format',
  input: ConvertInput,
  output: ConvertOutput,
  node: { displayName: 'Convert Image', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, format, quality }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const output = await sharp(buffer)
      .toFormat(format, { quality })
      .toBuffer({ resolveWithObject: true })
    await content.writeFile(outputContentKey, Readable.from(output.data))
    return {
      outputContentKey,
      format: output.info.format,
      size: output.info.size,
    }
  },
})
