import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentGetAllInput = z.object({
  docType: z.string(),
  fields: z.string().optional(),
  filters: z.string().optional(),
  limit_start: z.number().int().optional(),
  limit_page_length: z.number().int().optional(),
})

export const DocumentGetAllOutput = z.record(z.string(), z.unknown())

export const documentGetAll = pikkuSessionlessFunc({
  description: "Get all documents of a DocType",
  input: DocumentGetAllInput,
  output: DocumentGetAllOutput,
  func: async ({ erpnext }, data) => {
    return erpnext.call("GET", "/api/resource/{docType}", data) as any
  },
})
