import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetAllInput = z.object({
  limit: z.number().int().optional(),
  start: z.number().int().optional(),
  search: z.string().optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "List contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("GET", "/contacts", data) as any
  },
})
