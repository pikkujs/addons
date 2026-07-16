import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListGetAllInput = z.object({
  listId: z.string(),
  limit: z.number().optional(),
})

export const ContactListGetAllOutput = z.record(z.string(), z.unknown())

export const contactListGetAll = pikkuSessionlessFunc({
  description: "Get all contacts in a list",
  input: ContactListGetAllInput,
  output: ContactListGetAllOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("GET", "/list/{listId}/contacts", data) as any
  },
})
