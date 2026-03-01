import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { gzipSync, gunzipSync } from 'fflate'
import { Readable } from 'node:stream'

export const GzipCompressInput = z.object({
  contentKey: z.string().describe('Content key of the file to compress'),
  outputContentKey: z.string().describe('Content key to write the compressed file to'),
  level: z.number().min(0).max(9).optional().describe('Compression level (0 none, 1 fast, 9 best). Default 6'),
})

export const GzipCompressOutput = z.object({
  outputContentKey: z.string().describe('Content key of the compressed file'),
  originalSize: z.number().describe('Original size in bytes'),
  compressedSize: z.number().describe('Compressed size in bytes'),
})

export const gzipCompress = pikkuSessionlessFunc({
  description: 'Compress a file using gzip',
  input: GzipCompressInput,
  output: GzipCompressOutput,
  node: { displayName: 'Gzip Compress', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, level }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const compressed = gzipSync(new Uint8Array(buffer), { level: level ?? 6 })
    await content.writeFile(outputContentKey, Readable.from(Buffer.from(compressed)))
    return {
      outputContentKey,
      originalSize: buffer.length,
      compressedSize: compressed.length,
    }
  },
})

export const GzipDecompressInput = z.object({
  contentKey: z.string().describe('Content key of the gzip compressed file'),
  outputContentKey: z.string().describe('Content key to write the decompressed file to'),
})

export const GzipDecompressOutput = z.object({
  outputContentKey: z.string().describe('Content key of the decompressed file'),
  size: z.number().describe('Decompressed size in bytes'),
})

export const gzipDecompress = pikkuSessionlessFunc({
  description: 'Decompress a gzip file',
  input: GzipDecompressInput,
  output: GzipDecompressOutput,
  node: { displayName: 'Gzip Decompress', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const decompressed = gunzipSync(new Uint8Array(buffer))
    await content.writeFile(outputContentKey, Readable.from(Buffer.from(decompressed)))
    return {
      outputContentKey,
      size: decompressed.length,
    }
  },
})
