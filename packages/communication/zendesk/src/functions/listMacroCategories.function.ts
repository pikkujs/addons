import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListMacroCategoriesOutput = z.object({
  categories: z.array(z.string()).optional(),
})

export const listMacroCategories = pikkuSessionlessFunc({
  description: "Lists all macro categories available to the current user.\n\n#### Allowed For\n* Agents",
  output: ListMacroCategoriesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/macros/categories") as any
  },
})
