import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CollectionGetAllInput = z.object({
  projectId: z.string(),
  database: z.string(),
  pageSize: z.number().int().optional(),
})

export const CollectionGetAllOutput = z.record(z.string(), z.unknown())

export const collectionGetAll = pikkuSessionlessFunc({
  description: "List collection ids",
  input: CollectionGetAllInput,
  output: CollectionGetAllOutput,
  func: async ({ googleFirebaseCloudFirestore }, data) => {
    return googleFirebaseCloudFirestore.call("POST", "/{projectId}/databases/{database}/documents:listCollectionIds", data) as any
  },
})
