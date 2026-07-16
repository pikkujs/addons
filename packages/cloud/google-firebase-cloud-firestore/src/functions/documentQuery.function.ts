import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentQueryInput = z.object({
  projectId: z.string(),
  database: z.string(),
  structuredQuery: z.record(z.string(), z.unknown()).optional(),
})

export const DocumentQueryOutput = z.record(z.string(), z.unknown())

export const documentQuery = pikkuSessionlessFunc({
  description: "Query documents",
  input: DocumentQueryInput,
  output: DocumentQueryOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("POST", "/{projectId}/databases/{database}/documents:runQuery", data) as any
  },
})
