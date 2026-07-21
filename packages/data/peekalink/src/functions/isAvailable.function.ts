import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IsAvailableInput = z.object({
  body: z.string().optional(),
})

export const IsAvailableOutput = z.record(z.string(), z.unknown())

export const isAvailable = pikkuSessionlessFunc({
  description: "Is available",
  input: IsAvailableInput,
  output: IsAvailableOutput,
  func: async ({ peekalink }, data) => {
    return peekalink.call("POST", "/is-available", data) as any
  },
})
