import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  id: z.string(),
  lastName: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Update Contact",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Contact/{id}", data) as any
  },
})
