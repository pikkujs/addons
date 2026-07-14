import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

// A document to OCR: either a URL to a PDF/document, or an image (URL or
// `data:` base64 URI). Mirrors Mistral's DocumentURLChunk / ImageURLChunk.
export const OcrDocument = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('document_url'),
    documentUrl: z.string().url().describe('URL of a PDF or document to OCR'),
    documentName: z.string().optional().describe('Optional display name for the document'),
  }),
  z.object({
    type: z.literal('image_url'),
    imageUrl: z.string().describe('Image URL or a data:image/...;base64,... URI to OCR'),
  }),
])

export const OcrProcessInput = z.object({
  document: OcrDocument.describe('The document or image to run OCR on'),
  model: z.string().default('mistral-ocr-latest').describe('OCR model id (e.g. mistral-ocr-latest)'),
  pages: z
    .array(z.number())
    .optional()
    .describe('Specific 0-indexed pages to process. Omit to process every page.'),
  includeImageBase64: z
    .boolean()
    .optional()
    .describe('Include extracted image bytes as base64 in the response'),
})

const OcrImage = z.object({
  id: z.string(),
  topLeftX: z.number().nullable().optional(),
  topLeftY: z.number().nullable().optional(),
  bottomRightX: z.number().nullable().optional(),
  bottomRightY: z.number().nullable().optional(),
  imageBase64: z.string().nullable().optional(),
})

const OcrPage = z.object({
  index: z.number().describe('0-indexed page number'),
  markdown: z.string().describe('The page contents rendered as markdown'),
  images: z.array(OcrImage).describe('Images extracted from the page'),
})

const OcrUsageInfo = z.object({
  pagesProcessed: z.number(),
  docSizeBytes: z.number().nullable().optional(),
})

export const OcrProcessOutput = z.object({
  model: z.string(),
  pages: z.array(OcrPage).describe('Per-page OCR results, in document order'),
  usageInfo: OcrUsageInfo,
})

type Input = z.infer<typeof OcrProcessInput>
type Output = z.infer<typeof OcrProcessOutput>

export const ocrProcess = pikkuSessionlessFunc({
  description: 'Extract text (as markdown) from a PDF or image using Mistral OCR',
  node: { displayName: 'Run OCR', category: 'OCR', type: 'action' },
  input: OcrProcessInput,
  output: OcrProcessOutput,
  func: async ({ mistral }, data: Input) => {
    const res = await mistral.ocr.process({
      model: data.model,
      document: data.document,
      pages: data.pages,
      includeImageBase64: data.includeImageBase64,
    })
    return res as unknown as Output
  },
})
