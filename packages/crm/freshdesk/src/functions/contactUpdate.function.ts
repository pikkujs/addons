import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "ContactUpdate",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("PUT", "/contacts/{id}", data) as any
  },
})
