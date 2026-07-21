import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentCreateInput = z.object({
  docType: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const DocumentCreateOutput = z.record(z.string(), z.unknown())

export const documentCreate = pikkuSessionlessFunc({
  description: "Create a document of a DocType",
  input: DocumentCreateInput,
  output: DocumentCreateOutput,
  func: async ({ erpnext }, data) => {
    return erpnext.call("POST", "/api/resource/{docType}", data) as any
  },
})
