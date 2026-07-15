import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ToJsonFileInput = z.object({
  data: z.any().describe('JSON value to write into the file'),
  pretty: z
    .boolean()
    .optional()
    .describe('Pretty-print the JSON with 2-space indentation (default: false)'),
})

export const ToJsonFileOutput = z.object({
  base64: z.string().describe('Base64-encoded JSON file bytes'),
})

export const toJsonFile = pikkuSessionlessFunc({
  description: 'Serialize a JSON value into base64 file bytes',
  input: ToJsonFileInput,
  output: ToJsonFileOutput,
  node: { displayName: 'Convert JSON To File', category: 'Binary', type: 'action' },
  func: async (_services, { data, pretty }) => {
    const text = JSON.stringify(data, null, pretty ? 2 : undefined)
    const base64 = Buffer.from(text, 'utf8').toString('base64')
    return { base64 }
  },
})
