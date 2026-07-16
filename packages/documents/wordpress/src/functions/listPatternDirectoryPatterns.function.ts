import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListPatternDirectoryPatternsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(100).describe("Maximum number of items to be returned in result set."),
  search: z.unknown().optional().describe("Limit results to those matching a string."),
  category: z.number().int().min(1).optional().describe("Limit results to those matching a category ID."),
  keyword: z.number().int().min(1).optional().describe("Limit results to those matching a keyword ID."),
  slug: z.string().optional().describe("Limit results to those matching a pattern (slug)."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["author", "date", "id", "include", "modified", "parent", "relevance", "slug", "include_slugs", "title", "favorite_count"]).optional().default("date").describe("Sort collection by post attribute."),
})

export const ListPatternDirectoryPatternsOutput = z.array(z.object({
  id: z.number().int().min(1).optional().describe("The pattern ID."),
  title: z.string().min(1).optional().describe("The pattern title, in human readable format."),
  content: z.string().min(1).optional().describe("The pattern content."),
  categories: z.array(z.string()).optional().describe("The pattern's category slugs."),
  keywords: z.array(z.string()).optional().describe("The pattern's keywords."),
  description: z.string().min(1).optional().describe("A description of the pattern."),
  viewport_width: z.number().int().optional().describe("The preferred width of the viewport when previewing a pattern, in pixels."),
  block_types: z.array(z.string()).optional().describe("The block types which can use this pattern."),
}))

export const listPatternDirectoryPatterns = pikkuSessionlessFunc({
  input: ListPatternDirectoryPatternsInput,
  output: ListPatternDirectoryPatternsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/pattern-directory/patterns", data) as any
  },
})
