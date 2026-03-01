import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import QRCode from 'qrcode'

export const QrCodeToDataUrlInput = z.object({
  text: z.string().describe('Text or URL to encode in the QR code'),
  width: z.number().min(1).optional().describe('Width in pixels (default: 200)'),
  margin: z.number().min(0).optional().describe('Margin in modules (default: 4)'),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).optional().describe('Error correction level (default: M)'),
  darkColor: z.string().optional().describe('Dark module color as hex (default: #000000)'),
  lightColor: z.string().optional().describe('Light module color as hex (default: #ffffff)'),
})

export const QrCodeToDataUrlOutput = z.object({
  dataUrl: z.string().describe('Base64 data URL of the QR code image'),
})

export const qrCodeToDataUrl = pikkuSessionlessFunc({
  description: 'Generate a QR code as a base64 data URL for embedding in HTML',
  input: QrCodeToDataUrlInput,
  output: QrCodeToDataUrlOutput,
  node: { displayName: 'QR Code to Data URL', category: 'Data', type: 'action' },
  func: async (_services, { text, width, margin, errorCorrectionLevel, darkColor, lightColor }) => {
    const dataUrl = await QRCode.toDataURL(text, {
      width: width ?? 200,
      margin: margin ?? 4,
      errorCorrectionLevel: errorCorrectionLevel ?? 'M',
      color: {
        dark: darkColor ?? '#000000',
        light: lightColor ?? '#ffffff',
      },
    })
    return { dataUrl }
  },
})
