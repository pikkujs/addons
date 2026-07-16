import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecipientGetInput = z.object({
  recipientId: z.string(),
})

export const RecipientGetOutput = z.record(z.string(), z.unknown())

export const recipientGet = pikkuSessionlessFunc({
  description: "Get a recipient",
  input: RecipientGetInput,
  output: RecipientGetOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/recipients/{recipientId}", data) as any
  },
})
