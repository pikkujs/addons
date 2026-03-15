import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { deflateSync, inflateSync } from 'fflate'
import { Readable } from 'node:stream'

export const DeflateCompressInput = z.object({
  contentKey: z.string().describe('Content key of the file to compress'),
  outputContentKey: z.string().describe('Content key to write the compressed file to'),
  level: z.number().min(0).max(9).optional().describe('Compression level (0 none, 1 fast, 9 best). Default 6'),
})

export const DeflateCompressOutput = z.object({
  outputContentKey: z.string().describe('Content key of the compressed file'),
  originalSize: z.number().describe('Original size in bytes'),
  compressedSize: z.number().describe('Compressed size in bytes'),
})

export const deflateCompress = pikkuSessionlessFunc({
  description: 'Compress a file using deflate',
  input: DeflateCompressInput,
  output: DeflateCompressOutput,
  node: { displayName: 'Deflate Compress', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey, level }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const compressed = deflateSync(new Uint8Array(buffer), { level: (level ?? 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 })
    await content.writeFile(outputContentKey, Readable.from(Buffer.from(compressed)))
    return {
      outputContentKey,
      originalSize: buffer.length,
      compressedSize: compressed.length,
    }
  },
})

export const DeflateDecompressInput = z.object({
  contentKey: z.string().describe('Content key of the deflate compressed file'),
  outputContentKey: z.string().describe('Content key to write the decompressed file to'),
})

export const DeflateDecompressOutput = z.object({
  outputContentKey: z.string().describe('Content key of the decompressed file'),
  size: z.number().describe('Decompressed size in bytes'),
})

export const deflateDecompress = pikkuSessionlessFunc({
  description: 'Decompress a deflate file',
  input: DeflateDecompressInput,
  output: DeflateDecompressOutput,
  node: { displayName: 'Deflate Decompress', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey, outputContentKey }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const decompressed = inflateSync(new Uint8Array(buffer))
    await content.writeFile(outputContentKey, Readable.from(Buffer.from(decompressed)))
    return {
      outputContentKey,
      size: decompressed.length,
    }
  },
})
