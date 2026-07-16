import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllInput = z.object({
  limit: z.number().int().optional(),
  email: z.string().optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "List contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/contacts", data) as any
  },
})
