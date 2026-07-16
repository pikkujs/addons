import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RowCreateInput = z.object({
  tableId: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const RowCreateOutput = z.record(z.string(), z.unknown())

export const rowCreate = pikkuSessionlessFunc({
  description: "Create a row",
  input: RowCreateInput,
  output: RowCreateOutput,
  func: async ({ baserow }, data) => {
    return baserow.call("POST", "/api/database/rows/table/{tableId}/", data) as any
  },
})
