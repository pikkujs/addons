import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DocumentGetAllInput = z.object({
  projectId: z.string(),
  database: z.string(),
  collection: z.string(),
  pageSize: z.number().int().optional(),
})

export const DocumentGetAllOutput = z.record(z.string(), z.unknown())

export const documentGetAll = pikkuSessionlessFunc({
  description: "Get all documents",
  input: DocumentGetAllInput,
  output: DocumentGetAllOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("GET", "/{projectId}/databases/{database}/documents/{collection}", data) as any
  },
})
