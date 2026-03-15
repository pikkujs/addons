import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PrinceOptionsSchema = z.record(z.string(), z.unknown()).optional()
  .describe('Prince XML options for PDF rendering')

export const DocumentCreateAsyncInput = z.object({
  name: z.string().describe('Document name (used for download filename)'),
  document_type: z.enum(['pdf', 'xls', 'xlsx']).describe('Output document type'),
  document_content: z.string().optional().describe('HTML content to convert'),
  document_url: z.string().url().optional().describe('URL of the document to convert'),
  test: z.boolean().optional().describe('Set to true for test documents (free, watermarked)'),
  javascript: z.boolean().optional().describe('Enable JavaScript processing in the document'),
  prince_options: PrinceOptionsSchema,
})

export const DocumentCreateAsyncOutput = z.object({
  status_id: z.string().describe('Status ID to poll for document completion'),
})

export const documentCreateAsync = pikkuSessionlessFunc({
  description: 'Create a document asynchronously and return a status ID for polling',
  node: {
    displayName: 'Create Document (Async)',
    category: 'Documents',
    type: 'action',
  },
  input: DocumentCreateAsyncInput,
  output: DocumentCreateAsyncOutput,
  func: async ({ docraptor }, data) => {
    return await docraptor.createAsyncDocument(data)
  },
})
