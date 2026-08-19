import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItemGetAllInput = z.object({
  collectionId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

export const ItemGetAllOutput = z.object({
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const itemGetAll = pikkuSessionlessFunc({
  description: "List collection items",
  input: ItemGetAllInput,
  output: ItemGetAllOutput,
  func: async ({ webflow }, data) => {
    return webflow.call("GET", "/collections/{collectionId}/items", data) as any
  },
})
