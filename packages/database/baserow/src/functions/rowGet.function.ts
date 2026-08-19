import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RowGetInput = z.object({
  tableId: z.string(),
  rowId: z.string(),
})

export const RowGetOutput = z.record(z.string(), z.unknown())

export const rowGet = pikkuSessionlessFunc({
  description: "Retrieve a row",
  input: RowGetInput,
  output: RowGetOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("GET", "/api/database/rows/table/{tableId}/{rowId}/", data) as any
  },
})
