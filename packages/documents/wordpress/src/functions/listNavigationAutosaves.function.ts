import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListNavigationAutosavesInput = z.object({
  id: z.string(),
  parent: z.string().optional().describe("The ID for the parent of the autosave."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const ListNavigationAutosavesOutput = z.array(z.object({
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
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  preview_link: z.string().url().optional().describe("Preview link for the post."),
}))

export const listNavigationAutosaves = pikkuSessionlessFunc({
  input: ListNavigationAutosavesInput,
  output: ListNavigationAutosavesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/navigation/{id}/autosaves", data) as any
  },
})
