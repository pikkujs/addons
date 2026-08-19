import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItemGetInput = z.object({
  collectionId: z.string(),
  itemId: z.string(),
})

export const ItemGetOutput = z.object({
  id: z.string().optional(),
})

export const itemGet = pikkuSessionlessFunc({
  description: "Get a collection item",
  input: ItemGetInput,
  output: ItemGetOutput,
  func: async ({ webflow }, data) => {
    return webflow.call("GET", "/collections/{collectionId}/items/{itemId}", data) as any
  },
})
