import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EntryGetInput = z.object({
  contentType: z.string(),
  entryId: z.string(),
})

export const EntryGetOutput = z.record(z.string(), z.unknown())

export const entryGet = pikkuSessionlessFunc({
  description: "Get an entry",
  input: EntryGetInput,
  output: EntryGetOutput,
  func: async ({ strapi }, data) => {
    return strapi.call("GET", "/{contentType}/{entryId}", data) as any
  },
})
