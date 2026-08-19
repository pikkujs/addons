import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RowUpdateInput = z.object({
  tableId: z.string(),
  rowId: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const RowUpdateOutput = z.record(z.string(), z.unknown())

export const rowUpdate = pikkuSessionlessFunc({
  description: "Update a row",
  input: RowUpdateInput,
  output: RowUpdateOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("PATCH", "/api/database/rows/table/{tableId}/{rowId}/", data) as any
  },
})
