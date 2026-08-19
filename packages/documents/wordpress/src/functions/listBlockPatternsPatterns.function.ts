import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListBlockPatternsPatternsOutput = z.array(z.object({
  name: z.string().optional().describe("The pattern name."),
  title: z.string().optional().describe("The pattern title, in human readable format."),
  content: z.string().optional().describe("The pattern content."),
  description: z.string().optional().describe("The pattern detailed description."),
  viewport_width: z.number().optional().describe("The pattern viewport width for inserter preview."),
  inserter: z.boolean().optional().describe("Determines whether the pattern is visible in inserter."),
  categories: z.array(z.string()).optional().describe("The pattern category slugs."),
  keywords: z.array(z.string()).optional().describe("The pattern keywords."),
  block_types: z.array(z.string()).optional().describe("Block types that the pattern is intended to be used with."),
  post_types: z.array(z.string()).optional().describe("An array of post types that the pattern is restricted to be used with."),
  template_types: z.array(z.string()).optional().describe("An array of template types where the pattern fits."),
  source: z.enum(["core", "plugin", "theme", "pattern-directory/core", "pattern-directory/theme", "pattern-directory/featured"]).optional().describe("Where the pattern comes from e.g. core"),
}))

export const listBlockPatternsPatterns = pikkuSessionlessFunc({
  output: ListBlockPatternsPatternsOutput,
  func: async ({ wordpress }) => {
    return wordpress.call("GET", "/block-patterns/patterns") as any
  },
})
