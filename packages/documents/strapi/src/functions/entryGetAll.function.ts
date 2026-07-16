import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EntryGetAllInput = z.object({
  contentType: z.string(),
  sort: z.string().optional(),
  limit: z.number().optional(),
})

export const EntryGetAllOutput = z.record(z.string(), z.unknown())

export const entryGetAll = pikkuSessionlessFunc({
  description: "Get many entries",
  input: EntryGetAllInput,
  output: EntryGetAllOutput,
  func: async ({ strapi }, data) => {
    return strapi.call("GET", "/{contentType}", data) as any
  },
})
