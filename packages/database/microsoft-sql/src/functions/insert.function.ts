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
  func: async ({ microsoftSql }, data) => {
    return microsoftSql.call("POST", "/insert", data) as any
  },
})
