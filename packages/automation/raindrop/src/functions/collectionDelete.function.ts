import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionDeleteInput = z.object({
  collectionId: z.string(),
})

export const CollectionDeleteOutput = z.record(z.string(), z.unknown())

export const collectionDelete = pikkuSessionlessFunc({
  description: "Delete a collection",
  input: CollectionDeleteInput,
  output: CollectionDeleteOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("DELETE", "/collection/{collectionId}", data) as any
  },
})
