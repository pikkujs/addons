import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  email: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  company: z.string().optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "Create a contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/contacts/new", data) as any
  },
})
