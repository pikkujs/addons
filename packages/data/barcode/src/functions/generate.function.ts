import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import bwipjs from 'bwip-js'
import { Readable } from 'node:stream'

export const BarcodeGenerateInput = z.object({
  text: z.string().describe('Text to encode in the barcode'),
  outputContentKey: z.string().describe('Content key to write the barcode image to'),
  type: z.enum([
    'code128', 'code39', 'ean13', 'ean8', 'upca', 'upce',
    'itf14', 'isbn', 'issn', 'ismn',
    'datamatrix', 'pdf417', 'azteccode',
    'interleaved2of5', 'code93', 'codabar',
  ]).optional().describe('Barcode type (default: code128)'),
  scale: z.number().min(1).max(10).optional().describe('Scale factor (default: 3)'),
  height: z.number().min(1).optional().describe('Bar height in millimeters (default: 10)'),
  includeText: z.boolean().optional().describe('Include human-readable text below barcode (default: true)'),
  textSize: z.number().min(1).optional().describe('Text font size (default: 10)'),
  rotate: z.enum(['N', 'R', 'L', 'I']).optional().describe('Rotation: N=none, R=right, L=left, I=inverted'),
})

export const BarcodeGenerateOutput = z.object({
  outputContentKey: z.string().describe('Content key of the generated barcode'),
  size: z.number().describe('File size in bytes'),
})

export const barcodeGenerate = pikkuSessionlessFunc({
  description: 'Generate a barcode image from text',
  input: BarcodeGenerateInput,
  output: BarcodeGenerateOutput,
  node: { displayName: 'Generate Barcode', category: 'Data', type: 'action' },
  func: async ({ content }, { text, outputContentKey, type, scale, height, includeText, textSize, rotate }) => {
    const buffer = await bwipjs.toBuffer({
      bcid: type ?? 'code128',
      text,
      scale: scale ?? 3,
      height: height ?? 10,
      includetext: includeText ?? true,
      textsize: textSize ?? 10,
      rotate: rotate ?? 'N',
    })

    await content.writeFile(outputContentKey, Readable.from(buffer))
    return {
      outputContentKey,
      size: buffer.length,
    }
  },
})
