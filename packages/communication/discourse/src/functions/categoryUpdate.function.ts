import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CategoryUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const CategoryUpdateOutput = z.record(z.string(), z.unknown())

export const categoryUpdate = pikkuSessionlessFunc({
  description: "Update a category",
  input: CategoryUpdateInput,
  output: CategoryUpdateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("PUT", "/categories/{id}.json", data) as any
  },
})
