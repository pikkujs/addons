import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreatePostsAutosavesInput = z.object({
  id: z.string(),
  parent: z.number().int().optional().describe("The ID for the parent of the autosave."),
  date: z.string().datetime().nullable().optional().describe("The date the post was published, in the site's timezone."),
  date_gmt: z.string().datetime().nullable().optional().describe("The date the post was published, as GMT."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post unique to its type."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the post."),
  password: z.string().optional().describe("A password to protect access to the content and excerpt."),
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
  format: z.enum(["standard", "aside", "chat", "gallery", "link", "image", "quote", "status", "video", "audio"]).optional().describe("The format for the post."),
  meta: z.object({
  footnotes: z.string().optional().default(""),
}).optional().describe("Meta fields."),
  sticky: z.boolean().optional().describe("Whether or not the post should be treated as sticky."),
  template: z.string().optional().describe("The theme file to use to display the post."),
  categories: z.array(z.number().int()).optional().describe("The terms assigned to the post in the category taxonomy."),
  tags: z.array(z.number().int()).optional().describe("The terms assigned to the post in the post_tag taxonomy."),
})

export const CreatePostsAutosavesOutput = z.object({
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
    rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
  }).optional().describe("The title for the post."),
  content: z.object({
    raw: z.string().optional().describe("Content for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML content for the post, transformed for display."),
    block_version: z.number().int().optional().describe("Version of the content block format used by the post."),
    protected: z.boolean().optional().describe("Whether the content is protected with a password."),
  }).optional().describe("The content for the post."),
  excerpt: z.object({
    raw: z.string().optional().describe("Excerpt for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML excerpt for the post, transformed for display."),
    protected: z.boolean().optional().describe("Whether the excerpt is protected with a password."),
  }).optional().describe("The excerpt for the post."),
  meta: z.object({
    footnotes: z.string().optional().default(""),
  }).optional().describe("Meta fields."),
  preview_link: z.string().url().optional().describe("Preview link for the post."),
})

export const createPostsAutosaves = pikkuSessionlessFunc({
  input: CreatePostsAutosavesInput,
  output: CreatePostsAutosavesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/posts/{id}/autosaves", data) as any
  },
})
