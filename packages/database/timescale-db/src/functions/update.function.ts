import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateInput = z.object({
  body: z.string().optional(),
})

export const UpdateOutput = z.record(z.string(), z.unknown())

export const update = pikkuSessionlessFunc({
  description: "Update",
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ timescaleDb }, data) => {
    return timescaleDb.call("POST", "/update", data) as any
  },
})
