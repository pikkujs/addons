import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListBlocksRevisionsInput = z.object({
  parent: z.string().describe("The ID for the parent of the revision."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["date", "id", "include", "relevance", "slug", "include_slugs", "title"]).optional().default("date").describe("Sort collection by object attribute."),
})

export const ListBlocksRevisionsOutput = z.array(z.object({
  author: z.number().int().optional().describe("The ID for the author of the revision."),
  date: z.string().datetime().optional().describe("The date the revision was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the revision was published, as GMT."),
  guid: z.object({
    raw: z.string().optional().describe("GUID for the post, as it exists in the database."),
    rendered: z.string().optional().describe("GUID for the post, transformed for display."),
  }).optional().describe("The globally unique identifier for the post."),
  id: z.number().int().optional().describe("Unique identifier for the revision."),
  modified: z.string().datetime().optional().describe("The date the revision was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the revision was last modified, as GMT."),
  parent: z.number().int().optional().describe("The ID for the parent of the revision."),
  slug: z.string().optional().describe("An alphanumeric identifier for the revision unique to its type."),
  title: z.object({
    raw: z.string().optional().describe("Title for the post, as it exists in the database."),
  }).optional().describe("The title for the post."),
  content: z.object({
    raw: z.string().optional().describe("Content for the post, as it exists in the database."),
    block_version: z.number().int().optional().describe("Version of the content block format used by the post."),
    protected: z.boolean().optional().describe("Whether the content is protected with a password."),
  }).optional().describe("The content for the post."),
  excerpt: z.object({
    raw: z.string().optional().describe("Excerpt for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML excerpt for the post, transformed for display."),
    protected: z.boolean().optional().describe("Whether the excerpt is protected with a password."),
  }).optional().describe("The excerpt for the post."),
  meta: z.object({
    wp_pattern_sync_status: z.enum(["partial", "unsynced"]).optional(),
    footnotes: z.string().optional().default(""),
  }).optional().describe("Meta fields."),
  preview_link: z.string().url().optional().describe("Preview link for the post."),
}))

export const listBlocksRevisions = pikkuSessionlessFunc({
  input: ListBlocksRevisionsInput,
  output: ListBlocksRevisionsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/blocks/{parent}/revisions", data) as any
  },
})
