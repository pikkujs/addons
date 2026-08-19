import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  starValue: z.string().optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "Create a contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("POST", "/api/contacts", data) as any
  },
})
