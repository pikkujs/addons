import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CategoryGetAllOutput = z.record(z.string(), z.unknown())

export const categoryGetAll = pikkuSessionlessFunc({
  description: "Get all categories",
  output: CategoryGetAllOutput,
  func: async ({ discourse }) => {
    return discourse.call("GET", "/categories.json") as any
  },
})
