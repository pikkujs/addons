import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EntryDeleteInput = z.object({
  contentType: z.string(),
  entryId: z.string(),
})

export const EntryDeleteOutput = z.record(z.string(), z.unknown())

export const entryDelete = pikkuSessionlessFunc({
  description: "Delete an entry",
  input: EntryDeleteInput,
  output: EntryDeleteOutput,
  func: async ({ strapi }, data) => {
    return strapi.call("DELETE", "/{contentType}/{entryId}", data) as any
  },
})
