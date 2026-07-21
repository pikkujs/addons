import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdatePage2Input = z.object({
  id: z.string().describe("Unique identifier for the post."),
  date: z.string().datetime().nullable().optional().describe("The date the post was published, in the site's timezone."),
  date_gmt: z.string().datetime().nullable().optional().describe("The date the post was published, as GMT."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post unique to its type."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the post."),
  password: z.string().optional().describe("A password to protect access to the content and excerpt."),
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
})

export const UpdatePage2Output = z.object({
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
})

export const updatePage2 = pikkuSessionlessFunc({
  input: UpdatePage2Input,
  output: UpdatePage2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/pages/{id}", data) as any
  },
})
