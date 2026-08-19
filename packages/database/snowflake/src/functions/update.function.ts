import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateInput = z.object({
  table: z.string().describe("Name of the table to update"),
  updateKey: z.string().describe("Column used to match rows to update"),
  columns: z.string().optional().describe("Comma-separated list of columns to update"),
  database: z.string().optional(),
  schema: z.string().optional(),
})

export const UpdateOutput = z.object({
  statementHandle: z.string().optional(),
  message: z.string().optional(),
})

export const update = pikkuSessionlessFunc({
  description: "Update rows in a table",
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ snowflake }, data) => {
    return snowflake.call("POST", "/statements/update", data) as any
  },
})
