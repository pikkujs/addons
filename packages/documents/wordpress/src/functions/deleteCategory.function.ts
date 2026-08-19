import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteCategoryInput = z.object({
  id: z.string().describe("Unique identifier for the term."),
  force: z.boolean().optional().default(false).describe("Required to be true, as terms do not support trashing."),
})

export const DeleteCategoryOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  count: z.number().int().optional().describe("Number of published posts for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  link: z.string().url().optional().describe("URL of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  taxonomy: z.literal("category").optional().describe("Type attribution for the term."),
  parent: z.number().int().optional().describe("The parent term ID."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const deleteCategory = pikkuSessionlessFunc({
  input: DeleteCategoryInput,
  output: DeleteCategoryOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/categories/{id}", data) as any
  },
})
