import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListPagesInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  after: z.unknown().optional().describe("Limit response to posts published after a given ISO8601 compliant date."),
  modified_after: z.unknown().optional().describe("Limit response to posts modified after a given ISO8601 compliant date."),
  author: z.array(z.number().int()).optional().describe("Limit result set to posts assigned to specific authors."),
  author_exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes posts assigned to specific authors."),
  before: z.unknown().optional().describe("Limit response to posts published before a given ISO8601 compliant date."),
  modified_before: z.unknown().optional().describe("Limit response to posts modified before a given ISO8601 compliant date."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  menu_order: z.string().optional().describe("Limit result set to posts with a specific menu_order value."),
  search_semantics: z.literal("exact").optional().describe("How to interpret the search input."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["author", "date", "id", "include", "modified", "parent", "relevance", "slug", "include_slugs", "title", "menu_order"]).optional().default("date").describe("Sort collection by post attribute."),
  parent: z.array(z.number().int()).optional().describe("Limit result set to items with particular parent IDs."),
  parent_exclude: z.array(z.number().int()).optional().describe("Limit result set to all items except those of a particular parent ID."),
  search_columns: z.array(z.enum(["post_title", "post_content", "post_excerpt"])).optional().describe("Array of column names to be searched."),
  slug: z.array(z.string()).optional().describe("Limit result set to posts with one or more specific slugs."),
  status: z.array(z.enum(["publish", "future", "draft", "pending", "private", "trash", "auto-draft", "inherit", "request-pending", "request-confirmed", "request-failed", "request-completed", "any"])).optional().describe("Limit result set to posts assigned one or more statuses."),
})

export const ListPagesOutput = z.array(z.object({
  date: z.string().datetime().nullable().optional().describe("The date the post was published, in the site's timezone."),
  date_gmt: z.string().datetime().nullable().optional().describe("The date the post was published, as GMT."),
  guid: z.object({
    raw: z.string().optional().describe("GUID for the post, as it exists in the database."),
    rendered: z.string().optional().describe("GUID for the post, transformed for display."),
  }).optional().describe("The globally unique identifier for the post."),
  id: z.number().int().optional().describe("Unique identifier for the post."),
  link: z.string().url().optional().describe("URL to the post."),
  modified: z.string().datetime().optional().describe("The date the post was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the post was last modified, as GMT."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post unique to its type."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the post."),
  type: z.string().optional().describe("Type of post."),
  password: z.string().optional().describe("A password to protect access to the content and excerpt."),
  permalink_template: z.string().optional().describe("Permalink template for the post."),
  generated_slug: z.string().optional().describe("Slug automatically generated from the post title."),
  class_list: z.array(z.string()).optional().describe("An array of the class names for the post container element."),
  parent: z.number().int().optional().describe("The ID for the parent of the post."),
  title: z.object({
    raw: z.string().optional().describe("Title for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
  }).optional().describe("The title for the post."),
  content: z.object({
    raw: z.string().optional().describe("Content for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML content for the post, transformed for display."),
    block_version: z.number().int().optional().describe("Version of the content block format used by the post."),
    protected: z.boolean().optional().describe("Whether the content is protected with a password."),
  }).optional().describe("The content for the post."),
  author: z.number().int().optional().describe("The ID for the author of the post."),
  excerpt: z.object({
    raw: z.string().optional().describe("Excerpt for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML excerpt for the post, transformed for display."),
    protected: z.boolean().optional().describe("Whether the excerpt is protected with a password."),
  }).optional().describe("The excerpt for the post."),
  featured_media: z.number().int().optional().describe("The ID of the featured media for the post."),
  comment_status: z.enum(["open", "closed"]).optional().describe("Whether or not comments are open on the post."),
  ping_status: z.enum(["open", "closed"]).optional().describe("Whether or not the post can be pinged."),
  menu_order: z.number().int().optional().describe("The order of the post in relation to other posts."),
  meta: z.object({
    footnotes: z.string().optional().default(""),
  }).optional().describe("Meta fields."),
  template: z.string().optional().describe("The theme file to use to display the post."),
}))

export const listPages = pikkuSessionlessFunc({
  input: ListPagesInput,
  output: ListPagesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/pages", data) as any
  },
})
