import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateInput = z.object({
  schema: z.string().optional().describe("Name of the schema the table belongs to"),
  table: z.string().optional().describe("Name of the table to update"),
  updateKey: z.string().optional().describe("Column used to decide which rows to update"),
  columns: z.string().optional().describe("Comma-separated list of columns to update"),
})

export const UpdateOutput = z.object({
  rowcount: z.number().optional(),
})

export const update = pikkuSessionlessFunc({
  description: "Update rows in a table",
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ cratedb }, data) => {
    return cratedb.call("POST", "/_sql/update", data) as any
  },
})
