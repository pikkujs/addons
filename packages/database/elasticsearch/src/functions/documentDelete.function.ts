import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentDeleteInput = z.object({
  indexId: z.string(),
  documentId: z.string(),
})

export const DocumentDeleteOutput = z.record(z.string(), z.unknown())

export const documentDelete = pikkuSessionlessFunc({
  description: "Delete a document by id",
  input: DocumentDeleteInput,
  output: DocumentDeleteOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("DELETE", "/{indexId}/_doc/{documentId}", data) as any
  },
})
