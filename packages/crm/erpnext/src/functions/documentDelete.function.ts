import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentDeleteInput = z.object({
  docType: z.string(),
  documentName: z.string(),
})

export const DocumentDeleteOutput = z.record(z.string(), z.unknown())

export const documentDelete = pikkuSessionlessFunc({
  description: "Delete a document",
  input: DocumentDeleteInput,
  output: DocumentDeleteOutput,
  func: async ({ erpnext }, data) => {
    return erpnext.call("DELETE", "/api/resource/{docType}/{documentName}", data) as any
  },
})
