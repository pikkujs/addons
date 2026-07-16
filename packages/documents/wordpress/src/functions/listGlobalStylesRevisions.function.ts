import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGlobalStylesRevisionsInput = z.object({
  parent: z.string().describe("The ID for the parent of the revision."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().describe("Maximum number of items to be returned in result set."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
})

export const ListGlobalStylesRevisionsOutput = z.array(z.object({
  author: z.number().int().optional().describe("The ID for the author of the revision."),
  date: z.string().datetime().optional().describe("The date the revision was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the revision was published, as GMT."),
  id: z.number().int().optional().describe("ID of global styles config."),
  modified: z.string().datetime().optional().describe("The date the revision was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the revision was last modified, as GMT."),
  parent: z.number().int().optional().describe("The ID for the parent of the revision."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
}))

export const listGlobalStylesRevisions = pikkuSessionlessFunc({
  input: ListGlobalStylesRevisionsInput,
  output: ListGlobalStylesRevisionsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/{parent}/revisions", data) as any
  },
})
