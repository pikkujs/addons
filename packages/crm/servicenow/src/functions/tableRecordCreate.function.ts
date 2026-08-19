import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableRecordCreateInput = z.object({
  tableName: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const TableRecordCreateOutput = z.record(z.string(), z.unknown())

export const tableRecordCreate = pikkuSessionlessFunc({
  description: "Create a table record",
  input: TableRecordCreateInput,
  output: TableRecordCreateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("POST", "/now/table/{tableName}", data) as any
  },
})
