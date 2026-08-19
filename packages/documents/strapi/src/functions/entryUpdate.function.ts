import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EntryUpdateInput = z.object({
  contentType: z.string(),
  entryId: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
})

export const EntryUpdateOutput = z.record(z.string(), z.unknown())

export const entryUpdate = pikkuSessionlessFunc({
  description: "Update an entry",
  input: EntryUpdateInput,
  output: EntryUpdateOutput,
  func: async ({ strapi }, data) => {
    return strapi.call("PUT", "/{contentType}/{entryId}", data) as any
  },
})
