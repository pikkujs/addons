import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentGetStatusInput = z.object({
  status_id: z.string().describe('Status ID from an async document creation'),
})

export const DocumentGetStatusOutput = z.object({
  status: z.string().describe('Current status of the document (e.g., completed, failed)'),
  download_url: z.string().url().optional().describe('URL to download the completed document'),
})

export const documentGetStatus = pikkuSessionlessFunc({
  description: 'Check the status of an asynchronously created document',
  node: {
    displayName: 'Get Document Status',
    category: 'Documents',
    type: 'action',
  },
  input: DocumentGetStatusInput,
  output: DocumentGetStatusOutput,
  func: async ({ docraptor }, { status_id }) => {
    return await docraptor.getAsyncStatus(status_id)
  },
})
