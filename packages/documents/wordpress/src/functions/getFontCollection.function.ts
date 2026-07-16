import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetFontCollectionInput = z.object({
  slug: z.string(),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetFontCollectionOutput = z.object({
  slug: z.string().optional().describe("Unique identifier for the font collection."),
  name: z.string().optional().describe("The name for the font collection."),
  description: z.string().optional().describe("The description for the font collection."),
  font_families: z.array(z.string()).optional().describe("The font families for the font collection."),
  categories: z.array(z.string()).optional().describe("The categories for the font collection."),
})

export const getFontCollection = pikkuSessionlessFunc({
  input: GetFontCollectionInput,
  output: GetFontCollectionOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/font-collections/{slug}", data) as any
  },
})
