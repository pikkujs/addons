import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const ContactGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get many Contact",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Contact", data) as any
  },
})
