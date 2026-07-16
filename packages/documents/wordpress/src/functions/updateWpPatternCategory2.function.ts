import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateWpPatternCategory2Input = z.object({
  id: z.string().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const UpdateWpPatternCategory2Output = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  count: z.number().int().optional().describe("Number of published posts for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  link: z.string().url().optional().describe("URL of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  taxonomy: z.literal("wp_pattern_category").optional().describe("Type attribution for the term."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const updateWpPatternCategory2 = pikkuSessionlessFunc({
  input: UpdateWpPatternCategory2Input,
  output: UpdateWpPatternCategory2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/wp_pattern_category/{id}", data) as any
  },
})
