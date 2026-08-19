import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RowBatchCreateInput = z.object({
  tableId: z.string(),
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const RowBatchCreateOutput = z.record(z.string(), z.unknown())

export const rowBatchCreate = pikkuSessionlessFunc({
  description: "Create up to 200 rows in one request",
  input: RowBatchCreateInput,
  output: RowBatchCreateOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("POST", "/api/database/rows/table/{tableId}/batch/", data) as any
  },
})
