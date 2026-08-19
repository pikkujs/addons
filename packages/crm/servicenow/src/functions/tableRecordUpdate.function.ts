import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableRecordUpdateInput = z.object({
  tableName: z.string(),
  recordId: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const TableRecordUpdateOutput = z.record(z.string(), z.unknown())

export const tableRecordUpdate = pikkuSessionlessFunc({
  description: "Update a table record",
  input: TableRecordUpdateInput,
  output: TableRecordUpdateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("PATCH", "/now/table/{tableName}/{recordId}", data) as any
  },
})
