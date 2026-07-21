import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionUpdateInput = z.object({
  collectionId: z.string(),
  title: z.string().optional(),
  public: z.boolean().optional(),
  view: z.string().optional(),
})

export const CollectionUpdateOutput = z.record(z.string(), z.unknown())

export const collectionUpdate = pikkuSessionlessFunc({
  description: "Update a collection",
  input: CollectionUpdateInput,
  output: CollectionUpdateOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("PUT", "/collection/{collectionId}", data) as any
  },
})
