import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactTagDeleteInput = z.object({
  contactId: z.string(),
  ids: z.string().optional(),
})

export const ContactTagDeleteOutput = z.record(z.string(), z.unknown())

export const contactTagDelete = pikkuSessionlessFunc({
  description: "Remove tags from a contact",
  input: ContactTagDeleteInput,
  output: ContactTagDeleteOutput,
  func: async ({ keap }, data) => {
    return keap.call("DELETE", "/contacts/{contactId}/tags", data) as any
  },
})
