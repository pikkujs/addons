import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import bwipjs from 'bwip-js'

export const BarcodeToDataUrlInput = z.object({
  text: z.string().describe('Text to encode in the barcode'),
  type: z.enum([
    'code128', 'code39', 'ean13', 'ean8', 'upca', 'upce',
    'itf14', 'isbn', 'issn', 'ismn',
    'datamatrix', 'pdf417', 'azteccode',
    'interleaved2of5', 'code93', 'codabar',
  ]).optional().describe('Barcode type (default: code128)'),
  scale: z.number().min(1).max(10).optional().describe('Scale factor (default: 3)'),
  height: z.number().min(1).optional().describe('Bar height in millimeters (default: 10)'),
  includeText: z.boolean().optional().describe('Include human-readable text below barcode (default: true)'),
})

export const BarcodeToDataUrlOutput = z.object({
  dataUrl: z.string().describe('Base64 data URL of the barcode image'),
})

export const barcodeToDataUrl = pikkuSessionlessFunc({
  description: 'Generate a barcode as a base64 data URL for embedding in HTML',
  input: BarcodeToDataUrlInput,
  output: BarcodeToDataUrlOutput,
  node: { displayName: 'Barcode to Data URL', category: 'Data', type: 'action' },
  func: async (_services, { text, type, scale, height, includeText }) => {
    const buffer = await bwipjs.toBuffer({
      bcid: type ?? 'code128',
      text,
      scale: scale ?? 3,
      height: height ?? 10,
      includetext: includeText ?? true,
    })
    const dataUrl = `data:image/png;base64,${buffer.toString('base64')}`
    return { dataUrl }
  },
})
