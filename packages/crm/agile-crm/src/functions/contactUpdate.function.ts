import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  leadScore: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update a contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("PUT", "/api/contacts/edit-properties", data) as any
  },
})
