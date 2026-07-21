import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const EmailGetAllOutput = z.record(z.string(), z.unknown())

export const emailGetAll = pikkuSessionlessFunc({
  description: "List emails",
  input: EmailGetAllInput,
  output: EmailGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/emails", data) as any
  },
})
