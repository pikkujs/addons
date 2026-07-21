import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CategoryCreateInput = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  text_color: z.string().optional(),
})

export const CategoryCreateOutput = z.record(z.string(), z.unknown())

export const categoryCreate = pikkuSessionlessFunc({
  description: "Create a category",
  input: CategoryCreateInput,
  output: CategoryCreateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("POST", "/categories.json", data) as any
  },
})
