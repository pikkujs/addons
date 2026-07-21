import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ItemUpdateInput = z.object({
  collectionId: z.string(),
  itemId: z.string(),
  isArchived: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  fieldData: z.record(z.string(), z.unknown()).optional(),
})

export const ItemUpdateOutput = z.object({
  id: z.string().optional(),
})

export const itemUpdate = pikkuSessionlessFunc({
  description: "Update a collection item",
  input: ItemUpdateInput,
  output: ItemUpdateOutput,
  func: async ({ webflow }, data) => {
    return webflow.call("PATCH", "/collections/{collectionId}/items/{itemId}", data) as any
  },
})
