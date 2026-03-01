import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import sharp from 'sharp'

export const MetadataInput = z.object({
  contentKey: z.string().describe('Content key of the image'),
})

export const MetadataOutput = z.object({
  width: z.number().nullable(),
  height: z.number().nullable(),
  format: z.string().nullable(),
  channels: z.number().nullable(),
  space: z.string().nullable(),
  hasAlpha: z.boolean(),
  orientation: z.number().nullable(),
  density: z.number().nullable(),
  size: z.number().nullable().describe('File size in bytes'),
})

export const imageMetadata = pikkuSessionlessFunc({
  description: 'Get image metadata (dimensions, format, etc.)',
  input: MetadataInput,
  output: MetadataOutput,
  node: { displayName: 'Image Metadata', category: 'Image', type: 'action' },
  func: async ({ content }, { contentKey }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const meta = await sharp(buffer).metadata()
    return {
      width: meta.width ?? null,
      height: meta.height ?? null,
      format: meta.format ?? null,
      channels: meta.channels ?? null,
      space: meta.space ?? null,
      hasAlpha: meta.hasAlpha ?? false,
      orientation: meta.orientation ?? null,
      density: meta.density ?? null,
      size: meta.size ?? null,
    }
  },
})
