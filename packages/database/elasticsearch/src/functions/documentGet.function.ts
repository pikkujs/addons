import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentGetInput = z.object({
  indexId: z.string(),
  documentId: z.string(),
})

export const DocumentGetOutput = z.record(z.string(), z.unknown())

export const documentGet = pikkuSessionlessFunc({
  description: "Get a document by id",
  input: DocumentGetInput,
  output: DocumentGetOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("GET", "/{indexId}/_doc/{documentId}", data) as any
  },
})
