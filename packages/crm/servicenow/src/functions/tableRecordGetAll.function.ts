import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableRecordGetAllInput = z.object({
  tableName: z.string(),
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const TableRecordGetAllOutput = z.record(z.string(), z.unknown())

export const tableRecordGetAll = pikkuSessionlessFunc({
  description: "Get all table records",
  input: TableRecordGetAllInput,
  output: TableRecordGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/{tableName}", data) as any
  },
})
