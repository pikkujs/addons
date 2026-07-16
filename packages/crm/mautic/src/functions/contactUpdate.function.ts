import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  contactId: z.string(),
  email: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update a contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("PATCH", "/contacts/{contactId}/edit", data) as any
  },
})
