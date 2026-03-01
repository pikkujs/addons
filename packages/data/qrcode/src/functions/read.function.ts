import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import jsQR from 'jsqr'
import sharp from 'sharp'

export const QrCodeReadInput = z.object({
  contentKey: z.string().describe('Content key of the image containing a QR code'),
})

export const QrCodeReadOutput = z.object({
  data: z.string().nullable().describe('Decoded QR code text, or null if no QR code found'),
  found: z.boolean().describe('Whether a QR code was found in the image'),
})

export const qrCodeRead = pikkuSessionlessFunc({
  description: 'Read and decode a QR code from an image',
  input: QrCodeReadInput,
  output: QrCodeReadOutput,
  node: { displayName: 'Read QR Code', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey }) => {
    const buffer = await content.readFileAsBuffer(contentKey)

    // Convert to raw RGBA pixel data using sharp
    const { data, info } = await sharp(buffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const result = jsQR(new Uint8ClampedArray(data.buffer), info.width, info.height)

    return {
      data: result?.data ?? null,
      found: result !== null,
    }
  },
})
