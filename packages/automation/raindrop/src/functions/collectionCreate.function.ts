import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionCreateInput = z.object({
  title: z.string().optional(),
  public: z.boolean().optional(),
  view: z.string().optional(),
})

export const CollectionCreateOutput = z.record(z.string(), z.unknown())

export const collectionCreate = pikkuSessionlessFunc({
  description: "Create a collection",
  input: CollectionCreateInput,
  output: CollectionCreateOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("POST", "/collection", data) as any
  },
})
