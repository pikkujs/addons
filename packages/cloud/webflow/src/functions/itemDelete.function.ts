import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItemDeleteInput = z.object({
  collectionId: z.string(),
  itemId: z.string(),
})

export const ItemDeleteOutput = z.record(z.string(), z.unknown())

export const itemDelete = pikkuSessionlessFunc({
  description: "Delete a collection item",
  input: ItemDeleteInput,
  output: ItemDeleteOutput,
  func: async ({ webflow }, data) => {
    return webflow.call("DELETE", "/collections/{collectionId}/items/{itemId}", data) as any
  },
})
