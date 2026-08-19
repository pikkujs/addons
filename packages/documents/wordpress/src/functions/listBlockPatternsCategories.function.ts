import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListBlockPatternsCategoriesOutput = z.array(z.object({
  name: z.string().optional().describe("The category name."),
  label: z.string().optional().describe("The category label, in human readable format."),
  description: z.string().optional().describe("The category description, in human readable format."),
}))

export const listBlockPatternsCategories = pikkuSessionlessFunc({
  output: ListBlockPatternsCategoriesOutput,
  func: async ({ wordpress }) => {
    return wordpress.call("GET", "/block-patterns/categories") as any
  },
})
