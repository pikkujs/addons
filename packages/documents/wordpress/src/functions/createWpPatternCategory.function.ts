import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateWpPatternCategoryInput = z.object({
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const CreateWpPatternCategoryOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  count: z.number().int().optional().describe("Number of published posts for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  link: z.string().url().optional().describe("URL of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  taxonomy: z.literal("wp_pattern_category").optional().describe("Type attribution for the term."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const createWpPatternCategory = pikkuSessionlessFunc({
  input: CreateWpPatternCategoryInput,
  output: CreateWpPatternCategoryOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/wp_pattern_category", data) as any
  },
})
