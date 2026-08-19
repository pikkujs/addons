import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetMediaInput = z.object({
  id: z.string().describe("Unique identifier for the post."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetMediaOutput = z.object({
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
})

export const getMedia = pikkuSessionlessFunc({
  input: GetMediaInput,
  output: GetMediaOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/media/{id}", data) as any
  },
})
