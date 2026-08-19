import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeletePagesRevisionInput = z.object({
  parent: z.string().describe("The ID for the parent of the revision."),
  id: z.string().describe("Unique identifier for the revision."),
  force: z.boolean().optional().default(false).describe("Required to be true, as revisions do not support trashing."),
})

export const DeletePagesRevisionOutput = z.object({
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

export const deletePagesRevision = pikkuSessionlessFunc({
  input: DeletePagesRevisionInput,
  output: DeletePagesRevisionOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/pages/{parent}/revisions/{id}", data) as any
  },
})
