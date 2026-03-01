import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

export const ReadPdfInput = z.object({
  assetKey: z.string().describe('Content service asset key for the PDF file'),
  password: z.string().optional().describe('Password for encrypted PDF'),
  maxPages: z.number().optional().describe('Maximum number of pages to extract (0 = all)'),
})

export const ReadPdfOutput = z.object({
  text: z.string().describe('Extracted text content'),
  numPages: z.number().describe('Total number of pages'),
  info: z.any().describe('PDF metadata (title, author, etc.)'),
})

export const readPdf = pikkuSessionlessFunc({
  description: 'Extract text and metadata from a PDF file',
  input: ReadPdfInput,
  output: ReadPdfOutput,
  node: { displayName: 'Read PDF', category: 'Parse', type: 'action' },
  func: async ({ content }, { assetKey, password, maxPages }) => {
    const buffer = await content!.readFileAsBuffer(assetKey)
    const data = new Uint8Array(buffer)

    const loadingTask = getDocument({ data, password: password ?? undefined, useSystemFonts: true })
    const doc = await loadingTask.promise

    const pagesToRead = maxPages && maxPages > 0 ? Math.min(maxPages, doc.numPages) : doc.numPages
    const textParts: string[] = []
    for (let i = 1; i <= pagesToRead; i++) {
      const page = await doc.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items
        .filter((item: any) => 'str' in item)
        .map((item: any) => item.str)
        .join(' ')
      textParts.push(pageText)
    }

    const metadata = await doc.getMetadata()
    const info = metadata?.info ?? {}

    await doc.destroy()

    return {
      text: textParts.join('\n'),
      numPages: doc.numPages,
      info,
    }
  },
})
