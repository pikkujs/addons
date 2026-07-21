import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListSearchInput = z.object({
  context: z.enum(["view", "embed"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  type: z.enum(["post", "term", "post-format"]).optional().default("post").describe("Limit results to items of an object type."),
  subtype: z.array(z.enum(["post", "page", "category", "post_tag", "any"])).optional().describe("Limit results to items of one or more object subtypes."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
})

export const ListSearchOutput = z.array(z.object({
  id: z.union([z.number().int(), z.string()]).optional().describe("Unique identifier for the object."),
  title: z.string().optional().describe("The title for the object."),
  url: z.string().url().optional().describe("URL to the object."),
  type: z.enum(["post", "term", "post-format"]).optional().describe("Object type."),
  subtype: z.enum(["post", "page", "category", "post_tag"]).optional().describe("Object subtype."),
}))

export const listSearch = pikkuSessionlessFunc({
  input: ListSearchInput,
  output: ListSearchOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/search", data) as any
  },
})
