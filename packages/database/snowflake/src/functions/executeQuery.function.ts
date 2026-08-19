import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExecuteQueryInput = z.object({
  statement: z.string().describe("The SQL statement to execute"),
  database: z.string().optional(),
  schema: z.string().optional(),
  warehouse: z.string().optional(),
  timeout: z.number().int().optional(),
})

export const ExecuteQueryOutput = z.object({
  statementHandle: z.string().optional(),
  message: z.string().optional(),
})

export const executeQuery = pikkuSessionlessFunc({
  description: "Execute an SQL query",
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ snowflake }, data) => {
    return snowflake.call("POST", "/statements", data) as any
  },
})
