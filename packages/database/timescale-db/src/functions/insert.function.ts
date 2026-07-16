import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InsertInput = z.object({
  body: z.string().optional(),
})

export const InsertOutput = z.record(z.string(), z.unknown())

export const insert = pikkuSessionlessFunc({
  description: "Insert",
  input: InsertInput,
  output: InsertOutput,
  func: async ({ timescaleDb }, data) => {
    return timescaleDb.call("POST", "/insert", data) as any
  },
})
