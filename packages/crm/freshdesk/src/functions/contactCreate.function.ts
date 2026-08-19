import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "ContactCreate",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("POST", "/contacts", data) as any
  },
})
