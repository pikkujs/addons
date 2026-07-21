import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetCategoryInput = z.object({
  id: z.string().describe("Unique identifier for the term."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetCategoryOutput = z.object({
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

export const getCategory = pikkuSessionlessFunc({
  input: GetCategoryInput,
  output: GetCategoryOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/categories/{id}", data) as any
  },
})
