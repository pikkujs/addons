import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactTagCreateInput = z.object({
  contactId: z.string(),
  tagIds: z.array(z.string()).optional(),
})

export const ContactTagCreateOutput = z.record(z.string(), z.unknown())

export const contactTagCreate = pikkuSessionlessFunc({
  description: "Apply tags to a contact",
  input: ContactTagCreateInput,
  output: ContactTagCreateOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/contacts/{contactId}/tags", data) as any
  },
})
