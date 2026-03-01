import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import QRCode from 'qrcode'
import { Readable } from 'node:stream'

export const QrCodeGenerateInput = z.object({
  text: z.string().describe('Text or URL to encode in the QR code'),
  outputContentKey: z.string().describe('Content key to write the QR code image to'),
  format: z.enum(['png', 'svg']).optional().describe('Output format (default: png)'),
  width: z.number().min(1).optional().describe('Width in pixels (default: 200)'),
  margin: z.number().min(0).optional().describe('Margin in modules (default: 4)'),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).optional().describe('Error correction level (default: M)'),
  darkColor: z.string().optional().describe('Dark module color as hex (default: #000000)'),
  lightColor: z.string().optional().describe('Light module color as hex (default: #ffffff)'),
})

export const QrCodeGenerateOutput = z.object({
  outputContentKey: z.string().describe('Content key of the generated QR code'),
  format: z.string().describe('Output format used'),
  size: z.number().describe('File size in bytes'),
})

export const qrCodeGenerate = pikkuSessionlessFunc({
  description: 'Generate a QR code image from text or URL',
  input: QrCodeGenerateInput,
  output: QrCodeGenerateOutput,
  node: { displayName: 'Generate QR Code', category: 'Data', type: 'action' },
  func: async ({ content }, { text, outputContentKey, format, width, margin, errorCorrectionLevel, darkColor, lightColor }) => {
    const fmt = format ?? 'png'
    const options: QRCode.QRCodeToBufferOptions & QRCode.QRCodeToStringOptions = {
      width: width ?? 200,
      margin: margin ?? 4,
      errorCorrectionLevel: errorCorrectionLevel ?? 'M',
      color: {
        dark: darkColor ?? '#000000',
        light: lightColor ?? '#ffffff',
      },
    }

    let buffer: Buffer
    if (fmt === 'svg') {
      const svg = await QRCode.toString(text, { ...options, type: 'svg' })
      buffer = Buffer.from(svg)
    } else {
      buffer = await QRCode.toBuffer(text, options)
    }

    await content.writeFile(outputContentKey, Readable.from(buffer))
    return {
      outputContentKey,
      format: fmt,
      size: buffer.length,
    }
  },
})
