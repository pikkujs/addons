import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactTagGetAllInput = z.object({
  contactId: z.string(),
  limit: z.number().int().optional(),
})

export const ContactTagGetAllOutput = z.record(z.string(), z.unknown())

export const contactTagGetAll = pikkuSessionlessFunc({
  description: "List tags applied to a contact",
  input: ContactTagGetAllInput,
  output: ContactTagGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/contacts/{contactId}/tags", data) as any
  },
})
