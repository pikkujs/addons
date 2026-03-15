import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PrinceOptionsSchema = z.record(z.string(), z.unknown()).optional()
  .describe('Prince XML options for PDF rendering')

export const DocumentCreateInput = z.object({
  name: z.string().describe('Document name (used for download filename)'),
  document_type: z.enum(['pdf', 'xls', 'xlsx']).describe('Output document type'),
  document_content: z.string().optional().describe('HTML content to convert'),
  document_url: z.string().url().optional().describe('URL of the document to convert'),
  test: z.boolean().optional().describe('Set to true for test documents (free, watermarked)'),
  javascript: z.boolean().optional().describe('Enable JavaScript processing in the document'),
  prince_options: PrinceOptionsSchema,
})

export const DocumentCreateOutput = z.object({
  document: z.string().describe('Base64-encoded document content'),
})

export const documentCreate = pikkuSessionlessFunc({
  description: 'Create a PDF, XLS, or XLSX document from HTML content or a URL',
  node: {
    displayName: 'Create Document',
    category: 'Documents',
    type: 'action',
  },
  input: DocumentCreateInput,
  output: DocumentCreateOutput,
  func: async ({ docraptor }, data) => {
    const buffer = await docraptor.createDocument(data)
    const base64 = Buffer.from(buffer).toString('base64')
    return { document: base64 }
  },
})
