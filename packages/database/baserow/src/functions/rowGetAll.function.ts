import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RowGetAllInput = z.object({
  tableId: z.string(),
  page: z.number().int().optional(),
  size: z.number().int().optional(),
  search: z.string().optional(),
  order_by: z.string().optional(),
})

export const RowGetAllOutput = z.record(z.string(), z.unknown())

export const rowGetAll = pikkuSessionlessFunc({
  description: "List rows in a table",
  input: RowGetAllInput,
  output: RowGetAllOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("GET", "/api/database/rows/table/{tableId}/", data) as any
  },
})
