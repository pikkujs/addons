import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TableRecordGetInput = z.object({
  tableName: z.string(),
  recordId: z.string(),
  sysparm_fields: z.string().optional(),
})

export const TableRecordGetOutput = z.record(z.string(), z.unknown())

export const tableRecordGet = pikkuSessionlessFunc({
  description: "Get a table record",
  input: TableRecordGetInput,
  output: TableRecordGetOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/{tableName}/{recordId}", data) as any
  },
})
