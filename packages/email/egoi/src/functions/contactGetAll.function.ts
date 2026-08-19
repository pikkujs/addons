import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetAllInput = z.object({
  listId: z.string(),
  limit: z.number().optional(),
})

export const ContactGetAllOutput = z.object({
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get many contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ egoi }, data) => {
    return egoi.call("GET", "/lists/{listId}/contacts", data) as any
  },
})
