import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateInput = z.object({
  docId: z.string(),
  tableId: z.string(),
  records: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const UpdateOutput = z.record(z.string(), z.unknown())

export const update = pikkuSessionlessFunc({
  description: "Update rows in a table",
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ grist }, data) => {
    return grist.call("PATCH", "/docs/{docId}/tables/{tableId}/records", data) as any
  },
})
