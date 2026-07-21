import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  contactId: z.string(),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "Delete a contact",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("DELETE", "/contacts/{contactId}", data) as any
  },
})
