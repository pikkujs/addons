import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MoveBinaryDataInput = z.object({
  mode: z
    .enum(['jsonToBinary', 'binaryToJson'])
    .describe('Direction to move data between the JSON and binary channels'),
  data: z
    .any()
    .optional()
    .describe('JSON value to encode (required for jsonToBinary)'),
  base64: z
    .string()
    .optional()
    .describe('Base64-encoded file bytes to decode (required for binaryToJson)'),
  encoding: z
    .enum(['utf8', 'ascii', 'latin1', 'utf16le'])
    .optional()
    .describe('Text encoding used when converting (default: utf8)'),
  keepAsString: z
    .boolean()
    .optional()
    .describe('For binaryToJson, keep the decoded text as-is instead of parsing it as JSON'),
})

export const MoveBinaryDataOutput = z.object({
  base64: z.string().optional().describe('Base64-encoded file bytes (jsonToBinary result)'),
  data: z.any().optional().describe('Decoded JSON value (binaryToJson result)'),
})

export const moveBinaryData = pikkuSessionlessFunc({
  description: 'Move data between the JSON and binary channels in either direction',
  input: MoveBinaryDataInput,
  output: MoveBinaryDataOutput,
  node: { displayName: 'Move Binary Data', category: 'Binary', type: 'action' },
  func: async (_services, { mode, data, base64, encoding, keepAsString }) => {
    const charset = encoding ?? 'utf8'
    if (mode === 'jsonToBinary') {
      const text = typeof data === 'string' ? data : JSON.stringify(data)
      return { base64: Buffer.from(text, charset).toString('base64') }
    }
    if (base64 === undefined) {
      throw new Error('moveBinaryData binaryToJson requires a base64 input')
    }
    const text = Buffer.from(base64, 'base64').toString(charset)
    if (keepAsString) {
      return { data: text }
    }
    try {
      return { data: JSON.parse(text) }
    } catch {
      return { data: text }
    }
  },
})
