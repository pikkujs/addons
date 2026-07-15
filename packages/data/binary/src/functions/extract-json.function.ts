import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtractJsonInput = z.object({
  base64: z.string().describe('Base64-encoded JSON file bytes'),
  encoding: z
    .enum(['utf8', 'ascii', 'latin1', 'utf16le'])
    .optional()
    .describe('Text encoding of the file bytes (default: utf8)'),
})

export const ExtractJsonOutput = z.object({
  data: z.any().describe('Parsed JSON value'),
})

export const extractJson = pikkuSessionlessFunc({
  description: 'Parse base64 file bytes as JSON',
  input: ExtractJsonInput,
  output: ExtractJsonOutput,
  node: { displayName: 'Extract JSON From File', category: 'Binary', type: 'action' },
  func: async (_services, { base64, encoding }) => {
    const text = Buffer.from(base64, 'base64').toString(encoding ?? 'utf8')
    return { data: JSON.parse(text) }
  },
})
