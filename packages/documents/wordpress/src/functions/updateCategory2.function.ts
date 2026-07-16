import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateCategory2Input = z.object({
  id: z.string().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  parent: z.number().int().optional().describe("The parent term ID."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const UpdateCategory2Output = z.object({
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

export const updateCategory2 = pikkuSessionlessFunc({
  input: UpdateCategory2Input,
  output: UpdateCategory2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/categories/{id}", data) as any
  },
})
