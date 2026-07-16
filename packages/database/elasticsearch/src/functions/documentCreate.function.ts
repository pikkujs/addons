import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentCreateInput = z.object({
  indexId: z.string(),
  field: z.string().optional(),
  value: z.string().optional(),
})

export const DocumentCreateOutput = z.record(z.string(), z.unknown())

export const documentCreate = pikkuSessionlessFunc({
  description: "Create a document",
  input: DocumentCreateInput,
  output: DocumentCreateOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("POST", "/{indexId}/_doc", data) as any
  },
})
