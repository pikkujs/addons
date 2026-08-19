import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EntryCreateInput = z.object({
  contentType: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
})

export const EntryCreateOutput = z.record(z.string(), z.unknown())

export const entryCreate = pikkuSessionlessFunc({
  description: "Create an entry",
  input: EntryCreateInput,
  output: EntryCreateOutput,
  func: async ({ strapi }, data) => {
    return strapi.call("POST", "/{contentType}", data) as any
  },
})
