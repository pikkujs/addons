import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetGlobalStylesRevisionInput = z.object({
  parent: z.string().describe("The ID for the parent of the global styles revision."),
  id: z.string().describe("Unique identifier for the global styles revision."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetGlobalStylesRevisionOutput = z.object({
  author: z.number().int().optional().describe("The ID for the author of the revision."),
  date: z.string().datetime().optional().describe("The date the revision was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the revision was published, as GMT."),
  id: z.number().int().optional().describe("ID of global styles config."),
  modified: z.string().datetime().optional().describe("The date the revision was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the revision was last modified, as GMT."),
  parent: z.number().int().optional().describe("The ID for the parent of the revision."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
})

export const getGlobalStylesRevision = pikkuSessionlessFunc({
  input: GetGlobalStylesRevisionInput,
  output: GetGlobalStylesRevisionOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/{parent}/revisions/{id}", data) as any
  },
})
