import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { zipSync, unzipSync } from 'fflate'
import { Readable } from 'node:stream'

export const ZipCompressInput = z.object({
  files: z.array(z.object({
    contentKey: z.string().describe('Content key of the file'),
    fileName: z.string().describe('File name inside the zip archive'),
  })).describe('Files to compress into the zip archive'),
  outputContentKey: z.string().describe('Content key to write the zip file to'),
  level: z.number().min(0).max(9).optional().describe('Compression level (0 none, 1 fast, 9 best). Default 6'),
})

export const ZipCompressOutput = z.object({
  outputContentKey: z.string().describe('Content key of the zip file'),
  fileCount: z.number().describe('Number of files in the archive'),
  compressedSize: z.number().describe('Compressed zip size in bytes'),
})

export const zipCompress = pikkuSessionlessFunc({
  description: 'Compress one or more files into a zip archive',
  input: ZipCompressInput,
  output: ZipCompressOutput,
  node: { displayName: 'Zip Compress', category: 'Data', type: 'action' },
  func: async ({ content }, { files, outputContentKey, level }) => {
    const entries: Record<string, Uint8Array> = {}
    for (const file of files) {
      const buffer = await content.readFileAsBuffer(file.contentKey)
      entries[file.fileName] = new Uint8Array(buffer)
    }
    const compressed = zipSync(entries, { level: level ?? 6 })
    await content.writeFile(outputContentKey, Readable.from(Buffer.from(compressed)))
    return {
      outputContentKey,
      fileCount: files.length,
      compressedSize: compressed.length,
    }
  },
})

export const ZipDecompressInput = z.object({
  contentKey: z.string().describe('Content key of the zip file'),
  outputPrefix: z.string().describe('Content key prefix for extracted files (e.g. "extracted/")'),
})

export const ZipDecompressOutput = z.object({
  files: z.array(z.object({
    fileName: z.string().describe('File name from the archive'),
    contentKey: z.string().describe('Content key of the extracted file'),
    size: z.number().describe('Decompressed size in bytes'),
  })).describe('Extracted files'),
})

export const zipDecompress = pikkuSessionlessFunc({
  description: 'Decompress a zip archive into individual files',
  input: ZipDecompressInput,
  output: ZipDecompressOutput,
  node: { displayName: 'Zip Decompress', category: 'Data', type: 'action' },
  func: async ({ content }, { contentKey, outputPrefix }) => {
    const buffer = await content.readFileAsBuffer(contentKey)
    const entries = unzipSync(new Uint8Array(buffer))
    const files: Array<{ fileName: string; contentKey: string; size: number }> = []
    for (const [fileName, data] of Object.entries(entries)) {
      // Skip macOS resource fork directories
      if (fileName.startsWith('__MACOSX/')) continue
      // Skip directory entries
      if (fileName.endsWith('/')) continue
      const outputKey = `${outputPrefix}${fileName}`
      await content.writeFile(outputKey, Readable.from(Buffer.from(data)))
      files.push({ fileName, contentKey: outputKey, size: data.length })
    }
    return { files }
  },
})
