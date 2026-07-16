import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListFontCollectionsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
})

export const ListFontCollectionsOutput = z.array(z.object({
  slug: z.string().optional().describe("Unique identifier for the font collection."),
  name: z.string().optional().describe("The name for the font collection."),
  description: z.string().optional().describe("The description for the font collection."),
  font_families: z.array(z.string()).optional().describe("The font families for the font collection."),
  categories: z.array(z.string()).optional().describe("The categories for the font collection."),
}))

export const listFontCollections = pikkuSessionlessFunc({
  input: ListFontCollectionsInput,
  output: ListFontCollectionsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/font-collections", data) as any
  },
})
