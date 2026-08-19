import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListMenuItemsAutosavesInput = z.object({
  id: z.string(),
  parent: z.string().optional().describe("The ID for the parent of the autosave."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const ListMenuItemsAutosavesOutput = z.array(z.object({
  author: z.number().int().optional().describe("The ID for the author of the revision."),
  date: z.string().datetime().optional().describe("The date the revision was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the revision was published, as GMT."),
  guid: z.string().optional().describe("GUID for the revision, as it exists in the database."),
  id: z.number().int().optional().describe("Unique identifier for the revision."),
  modified: z.string().datetime().optional().describe("The date the revision was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the revision was last modified, as GMT."),
  parent: z.number().int().optional().describe("The ID for the parent of the revision."),
  slug: z.string().optional().describe("An alphanumeric identifier for the revision unique to its type."),
  title: z.union([z.string(), z.record(z.string(), z.unknown())]).optional().describe("The title for the object."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  preview_link: z.string().url().optional().describe("Preview link for the post."),
}))

export const listMenuItemsAutosaves = pikkuSessionlessFunc({
  input: ListMenuItemsAutosavesInput,
  output: ListMenuItemsAutosavesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/menu-items/{id}/autosaves", data) as any
  },
})
