import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactCreateInput = z.object({
  lastName: z.string().optional(),
})

export const ContactCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const contactCreate = pikkuSessionlessFunc({
  description: "Create Contact",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Contact", data) as any
  },
})
