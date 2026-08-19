import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactEditDoNotContactListInput = z.object({
  contactId: z.string(),
  channel: z.string(),
  action: z.string(),
})

export const ContactEditDoNotContactListOutput = z.record(z.string(), z.unknown())

export const contactEditDoNotContactList = pikkuSessionlessFunc({
  description: "Edit the do-not-contact list for a contact",
  input: ContactEditDoNotContactListInput,
  output: ContactEditDoNotContactListOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/contacts/{contactId}/dnc/{channel}/{action}", data) as any
  },
})
