import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentUpsertInput = z.object({
  projectId: z.string(),
  database: z.string(),
  writes: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const DocumentUpsertOutput = z.record(z.string(), z.unknown())

export const documentUpsert = pikkuSessionlessFunc({
  description: "Upsert documents",
  input: DocumentUpsertInput,
  output: DocumentUpsertOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("POST", "/{projectId}/databases/{database}/documents:batchWrite", data) as any
  },
})
