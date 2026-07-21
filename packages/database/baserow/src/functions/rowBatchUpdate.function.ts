import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RowBatchUpdateInput = z.object({
  tableId: z.string(),
  items: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const RowBatchUpdateOutput = z.record(z.string(), z.unknown())

export const rowBatchUpdate = pikkuSessionlessFunc({
  description: "Update up to 200 rows in one request",
  input: RowBatchUpdateInput,
  output: RowBatchUpdateOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("PATCH", "/api/database/rows/table/{tableId}/batch/", data) as any
  },
})
