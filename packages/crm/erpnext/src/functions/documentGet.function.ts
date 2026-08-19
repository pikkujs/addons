import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentGetInput = z.object({
  docType: z.string(),
  documentName: z.string(),
})

export const DocumentGetOutput = z.record(z.string(), z.unknown())

export const documentGet = pikkuSessionlessFunc({
  description: "Get a single document",
  input: DocumentGetInput,
  output: DocumentGetOutput,
  func: async ({ erpnext }, data) => {
    return erpnext.call("GET", "/api/resource/{docType}/{documentName}", data) as any
  },
})
