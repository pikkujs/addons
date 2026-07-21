import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentCreateInput = z.object({
  projectId: z.string(),
  database: z.string(),
  collection: z.string(),
  documentId: z.string().optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
})

export const DocumentCreateOutput = z.record(z.string(), z.unknown())

export const documentCreate = pikkuSessionlessFunc({
  description: "Create a document",
  input: DocumentCreateInput,
  output: DocumentCreateOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("POST", "/{projectId}/databases/{database}/documents/{collection}", data) as any
  },
})
