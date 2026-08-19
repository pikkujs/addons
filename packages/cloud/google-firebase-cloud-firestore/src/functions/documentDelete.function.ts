import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentDeleteInput = z.object({
  projectId: z.string(),
  database: z.string(),
  collection: z.string(),
  documentId: z.string(),
})

export const DocumentDeleteOutput = z.record(z.string(), z.unknown())

export const documentDelete = pikkuSessionlessFunc({
  description: "Delete a document",
  input: DocumentDeleteInput,
  output: DocumentDeleteOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("DELETE", "/{projectId}/databases/{database}/documents/{collection}/{documentId}", data) as any
  },
})
