import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentGetAllInput = z.object({
  indexId: z.string(),
  size: z.number().int().optional(),
  query: z.record(z.string(), z.unknown()).optional(),
})

export const DocumentGetAllOutput = z.record(z.string(), z.unknown())

export const documentGetAll = pikkuSessionlessFunc({
  description: "Search documents in an index",
  input: DocumentGetAllInput,
  output: DocumentGetAllOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("POST", "/{indexId}/_search", data) as any
  },
})
