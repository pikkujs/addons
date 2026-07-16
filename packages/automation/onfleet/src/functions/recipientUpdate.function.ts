import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecipientUpdateInput = z.object({
  recipientId: z.string(),
  name: z.string().optional(),
})

export const RecipientUpdateOutput = z.record(z.string(), z.unknown())

export const recipientUpdate = pikkuSessionlessFunc({
  description: "Update a recipient",
  input: RecipientUpdateInput,
  output: RecipientUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/recipients/{recipientId}", data) as any
  },
})
