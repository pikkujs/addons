import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InsertInput = z.object({
  table: z.string().describe("Name of the table to insert into"),
  columns: z.string().optional().describe("Comma-separated list of columns"),
  database: z.string().optional(),
  schema: z.string().optional(),
})

export const InsertOutput = z.object({
  statementHandle: z.string().optional(),
  message: z.string().optional(),
})

export const insert = pikkuSessionlessFunc({
  description: "Insert rows into a table",
  input: InsertInput,
  output: InsertOutput,
  func: async ({ snowflake }, data) => {
    return snowflake.call("POST", "/statements/insert", data) as any
  },
})
