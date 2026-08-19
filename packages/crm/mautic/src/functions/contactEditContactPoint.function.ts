import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactEditContactPointInput = z.object({
  contactId: z.string(),
  action: z.string(),
  points: z.string(),
})

export const ContactEditContactPointOutput = z.record(z.string(), z.unknown())

export const contactEditContactPoint = pikkuSessionlessFunc({
  description: "Add or subtract points for a contact",
  input: ContactEditContactPointInput,
  output: ContactEditContactPointOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/contacts/{contactId}/points/{action}/{points}", data) as any
  },
})
