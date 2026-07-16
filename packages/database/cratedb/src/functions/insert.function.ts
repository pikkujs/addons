import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InsertInput = z.object({
  schema: z.string().optional().describe("Name of the schema the table belongs to"),
  table: z.string().optional().describe("Name of the table to insert into"),
  columns: z.string().optional().describe("Comma-separated list of columns"),
})

export const InsertOutput = z.object({
  rowcount: z.number().optional(),
})

export const insert = pikkuSessionlessFunc({
  description: "Insert rows into a table",
  input: InsertInput,
  output: InsertOutput,
  func: async ({ cratedb }, data) => {
    return cratedb.call("POST", "/_sql/insert", data) as any
  },
})
