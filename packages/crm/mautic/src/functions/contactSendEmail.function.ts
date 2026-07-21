import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactSendEmailInput = z.object({
  campaignEmailId: z.string(),
  contactId: z.string(),
})

export const ContactSendEmailOutput = z.record(z.string(), z.unknown())

export const contactSendEmail = pikkuSessionlessFunc({
  description: "Send an email to a contact",
  input: ContactSendEmailInput,
  output: ContactSendEmailOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/emails/{campaignEmailId}/contact/{contactId}/send", data) as any
  },
})
