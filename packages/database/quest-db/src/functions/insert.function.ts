import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InsertInput = z.object({
  body: z.string().optional(),
})

export const InsertOutput = z.record(z.string(), z.unknown())

export const insert = pikkuSessionlessFunc({
  description: "Insert",
  input: InsertInput,
  output: InsertOutput,
  func: async ({ questDb }, data) => {
    return questDb.call("POST", "/insert", data) as any
  },
})
