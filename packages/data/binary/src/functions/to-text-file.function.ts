import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ToTextFileInput = z.object({
  text: z.string().describe('Text content to write into the file'),
  encoding: z
    .enum(['utf8', 'ascii', 'latin1', 'utf16le'])
    .optional()
    .describe('Text encoding for the file bytes (default: utf8)'),
})

export const ToTextFileOutput = z.object({
  base64: z.string().describe('Base64-encoded file bytes'),
})

export const toTextFile = pikkuSessionlessFunc({
  description: 'Encode a text string into base64 file bytes',
  input: ToTextFileInput,
  output: ToTextFileOutput,
  node: { displayName: 'Convert Text To File', category: 'Binary', type: 'action' },
  func: async (_services, { text, encoding }) => {
    const base64 = Buffer.from(text, encoding ?? 'utf8').toString('base64')
    return { base64 }
  },
})
