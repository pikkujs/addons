import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMediaInput = z.object({
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
  search_semantics: z.literal("exact").optional().describe("How to interpret the search input."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["author", "date", "id", "include", "modified", "parent", "relevance", "slug", "include_slugs", "title"]).optional().default("date").describe("Sort collection by post attribute."),
  parent: z.array(z.number().int()).optional().describe("Limit result set to items with particular parent IDs."),
  parent_exclude: z.array(z.number().int()).optional().describe("Limit result set to all items except those of a particular parent ID."),
  search_columns: z.array(z.enum(["post_title", "post_content", "post_excerpt"])).optional().describe("Array of column names to be searched."),
  slug: z.array(z.string()).optional().describe("Limit result set to posts with one or more specific slugs."),
  status: z.array(z.enum(["inherit", "private", "trash"])).optional().describe("Limit result set to posts assigned one or more statuses."),
  media_type: z.array(z.enum(["image", "video", "text", "application", "audio"])).optional().describe("Limit result set to attachments of a particular media type or media types."),
  mime_type: z.array(z.string()).optional().describe("Limit result set to attachments of a particular MIME type or MIME types."),
})

export const ListMediaOutput = z.array(z.object({
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
  permalink_template: z.string().optional().describe("Permalink template for the post."),
  generated_slug: z.string().optional().describe("Slug automatically generated from the post title."),
  class_list: z.array(z.string()).optional().describe("An array of the class names for the post container element."),
  title: z.object({
    raw: z.string().optional().describe("Title for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
  }).optional().describe("The title for the post."),
  author: z.number().int().optional().describe("The ID for the author of the post."),
  featured_media: z.number().int().optional().describe("The ID of the featured media for the post."),
  comment_status: z.enum(["open", "closed"]).optional().describe("Whether or not comments are open on the post."),
  ping_status: z.enum(["open", "closed"]).optional().describe("Whether or not the post can be pinged."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  template: z.string().optional().describe("The theme file to use to display the post."),
  alt_text: z.string().optional().describe("Alternative text to display when attachment is not displayed."),
  caption: z.object({
    raw: z.string().optional().describe("Caption for the attachment, as it exists in the database."),
    rendered: z.string().optional().describe("HTML caption for the attachment, transformed for display."),
  }).optional().describe("The attachment caption."),
  description: z.object({
    raw: z.string().optional().describe("Description for the attachment, as it exists in the database."),
    rendered: z.string().optional().describe("HTML description for the attachment, transformed for display."),
  }).optional().describe("The attachment description."),
  media_type: z.enum(["image", "file"]).optional().describe("Attachment type."),
  mime_type: z.string().optional().describe("The attachment MIME type."),
  media_details: z.record(z.string(), z.unknown()).optional().describe("Details about the media file, specific to its type."),
  post: z.number().int().optional().describe("The ID for the associated post of the attachment."),
  source_url: z.string().url().optional().describe("URL to the original attachment file."),
  missing_image_sizes: z.array(z.string()).optional().describe("List of the missing image sizes of the attachment."),
}))

export const listMedia = pikkuSessionlessFunc({
  input: ListMediaInput,
  output: ListMediaOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/media", data) as any
  },
})
