import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RowBatchDeleteInput = z.object({
  tableId: z.string(),
  items: z.array(z.string()).optional(),
})

export const RowBatchDeleteOutput = z.record(z.string(), z.unknown())

export const rowBatchDelete = pikkuSessionlessFunc({
  description: "Delete up to 200 rows in one request",
  input: RowBatchDeleteInput,
  output: RowBatchDeleteOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("POST", "/api/database/rows/table/{tableId}/batch-delete/", data) as any
  },
})
