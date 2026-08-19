import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentUpdateInput = z.object({
  docType: z.string(),
  documentName: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const DocumentUpdateOutput = z.record(z.string(), z.unknown())

export const documentUpdate = pikkuSessionlessFunc({
  description: "Update a document",
  input: DocumentUpdateInput,
  output: DocumentUpdateOutput,
  func: async ({ erpnext }, data) => {
    return erpnext.call("PUT", "/api/resource/{docType}/{documentName}", data) as any
  },
})
