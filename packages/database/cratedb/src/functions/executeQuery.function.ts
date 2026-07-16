import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteQueryInput = z.object({
  stmt: z.string().optional().describe("The SQL statement to execute"),
  args: z.array(z.string()).optional().describe("Positional query parameters"),
})

export const ExecuteQueryOutput = z.object({
  rowcount: z.number().optional(),
  duration: z.number().optional(),
})

export const executeQuery = pikkuSessionlessFunc({
  description: "Execute a SQL query",
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ cratedb }, data) => {
    return cratedb.call("POST", "/_sql", data) as any
  },
})
