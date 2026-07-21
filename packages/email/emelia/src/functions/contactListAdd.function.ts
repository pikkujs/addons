import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListAddInput = z.object({
  contactListId: z.string(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const ContactListAddOutput = z.object({
  contactId: z.string().optional(),
})

export const contactListAdd = pikkuSessionlessFunc({
  description: "Add a contact to a contact list",
  input: ContactListAddInput,
  output: ContactListAddOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/contact-lists/{contactListId}/contacts", data) as any
  },
})
