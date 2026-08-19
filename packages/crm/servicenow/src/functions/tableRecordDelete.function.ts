import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableRecordDeleteInput = z.object({
  tableName: z.string(),
  recordId: z.string(),
})

export const TableRecordDeleteOutput = z.record(z.string(), z.unknown())

export const tableRecordDelete = pikkuSessionlessFunc({
  description: "Delete a table record",
  input: TableRecordDeleteInput,
  output: TableRecordDeleteOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("DELETE", "/now/table/{tableName}/{recordId}", data) as any
  },
})
