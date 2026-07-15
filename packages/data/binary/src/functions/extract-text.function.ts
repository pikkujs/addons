import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtractTextInput = z.object({
  base64: z.string().describe('Base64-encoded file bytes'),
  encoding: z
    .enum(['utf8', 'ascii', 'latin1', 'utf16le'])
    .optional()
    .describe('Text encoding of the file bytes (default: utf8)'),
})

export const ExtractTextOutput = z.object({
  text: z.string().describe('Decoded text content'),
})

export const extractText = pikkuSessionlessFunc({
  description: 'Decode base64 file bytes into a text string',
  input: ExtractTextInput,
  output: ExtractTextOutput,
  node: { displayName: 'Extract Text From File', category: 'Binary', type: 'action' },
  func: async (_services, { base64, encoding }) => {
    const text = Buffer.from(base64, 'base64').toString(encoding ?? 'utf8')
    return { text }
  },
})
