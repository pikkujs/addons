import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetAllInput = z.object({
  listId: z.string(),
  limit: z.number().int().optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get all contacts in a list",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("GET", "/smart-lists/{listId}/contacts", data) as any
  },
})
