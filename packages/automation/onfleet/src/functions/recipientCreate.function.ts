import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecipientCreateInput = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
})

export const RecipientCreateOutput = z.record(z.string(), z.unknown())

export const recipientCreate = pikkuSessionlessFunc({
  description: "Create a recipient",
  input: RecipientCreateInput,
  output: RecipientCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/recipients", data) as any
  },
})
