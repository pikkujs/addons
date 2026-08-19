import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactDeleteInput = z.object({
  contactId: z.string(),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "Delete a contact",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ keap }, data) => {
    return keap.call("DELETE", "/contacts/{contactId}", data) as any
  },
})
