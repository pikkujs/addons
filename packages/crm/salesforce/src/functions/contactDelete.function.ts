import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  id: z.string(),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "Delete Contact",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Contact/{id}", data) as any
  },
})
