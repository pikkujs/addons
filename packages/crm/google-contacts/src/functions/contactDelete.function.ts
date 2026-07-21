import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  contactId: z.string(),
})

export const ContactDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const contactDelete = pikkuSessionlessFunc({
  description: "Delete a contact",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ googleContacts }, data) => {
    return googleContacts.call("DELETE", "/people/{contactId}:deleteContact", data) as any
  },
})
