import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CollectionUpdateInput = z.object({
  id: z.string(),
  externalId: z.string().optional(),
})

export const CollectionUpdateOutput = z.record(z.string(), z.unknown())

export const collectionUpdate = pikkuSessionlessFunc({
  description: "Update a collection",
  input: CollectionUpdateInput,
  output: CollectionUpdateOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("PUT", "/public/collections/{id}", data) as any
  },
})
