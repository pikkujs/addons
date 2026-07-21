import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentUpdateInput = z.object({
  indexId: z.string(),
  documentId: z.string(),
  doc: z.record(z.string(), z.unknown()).optional(),
})

export const DocumentUpdateOutput = z.record(z.string(), z.unknown())

export const documentUpdate = pikkuSessionlessFunc({
  description: "Update a document by id",
  input: DocumentUpdateInput,
  output: DocumentUpdateOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("POST", "/{indexId}/_update/{documentId}", data) as any
  },
})
