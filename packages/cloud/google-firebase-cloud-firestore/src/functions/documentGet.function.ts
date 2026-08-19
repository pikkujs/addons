import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DocumentGetInput = z.object({
  projectId: z.string(),
  database: z.string(),
  documents: z.array(z.string()).optional(),
})

export const DocumentGetOutput = z.record(z.string(), z.unknown())

export const documentGet = pikkuSessionlessFunc({
  description: "Get documents",
  input: DocumentGetInput,
  output: DocumentGetOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("POST", "/{projectId}/databases/{database}/documents:batchGet", data) as any
  },
})
