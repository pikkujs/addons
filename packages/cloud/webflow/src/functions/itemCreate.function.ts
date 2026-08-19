import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItemCreateInput = z.object({
  collectionId: z.string(),
  isArchived: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  fieldData: z.record(z.string(), z.unknown()).optional(),
})

export const ItemCreateOutput = z.object({
  id: z.string().optional(),
})

export const itemCreate = pikkuSessionlessFunc({
  description: "Create a collection item",
  input: ItemCreateInput,
  output: ItemCreateOutput,
  func: async ({ webflow }, data) => {
    return webflow.call("POST", "/collections/{collectionId}/items", data) as any
  },
})
