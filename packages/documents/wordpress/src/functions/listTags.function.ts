import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTagsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("asc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["id", "include", "name", "slug", "include_slugs", "term_group", "description", "count"]).optional().default("name").describe("Sort collection by term attribute."),
  hide_empty: z.string().optional().describe("Whether to hide terms not assigned to any posts."),
  post: z.string().optional().describe("Limit result set to terms assigned to a specific post."),
  slug: z.array(z.string()).optional().describe("Limit result set to terms with one or more specific slugs."),
})

export const ListTagsOutput = z.array(z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  count: z.number().int().optional().describe("Number of published posts for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  link: z.string().url().optional().describe("URL of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  taxonomy: z.literal("post_tag").optional().describe("Type attribution for the term."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
}))

export const listTags = pikkuSessionlessFunc({
  input: ListTagsInput,
  output: ListTagsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/tags", data) as any
  },
})
