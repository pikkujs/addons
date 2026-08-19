import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateTag2Input = z.object({
  id: z.string().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const UpdateTag2Output = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  count: z.number().int().optional().describe("Number of published posts for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  link: z.string().url().optional().describe("URL of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  taxonomy: z.literal("post_tag").optional().describe("Type attribution for the term."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const updateTag2 = pikkuSessionlessFunc({
  input: UpdateTag2Input,
  output: UpdateTag2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/tags/{id}", data) as any
  },
})
