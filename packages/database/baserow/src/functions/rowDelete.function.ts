import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RowDeleteInput = z.object({
  tableId: z.string(),
  rowId: z.string(),
})

export const RowDeleteOutput = z.record(z.string(), z.unknown())

export const rowDelete = pikkuSessionlessFunc({
  description: "Delete a row",
  input: RowDeleteInput,
  output: RowDeleteOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("DELETE", "/api/database/rows/table/{tableId}/{rowId}/", data) as any
  },
})
