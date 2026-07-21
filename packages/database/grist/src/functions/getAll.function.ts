import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetAllInput = z.object({
  docId: z.string(),
  tableId: z.string(),
  limit: z.number().int().optional(),
  sort: z.string().optional(),
  filter: z.string().optional(),
})

export const GetAllOutput = z.object({
  records: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const getAll = pikkuSessionlessFunc({
  description: "Get many rows from a table",
  input: GetAllInput,
  output: GetAllOutput,
  func: async ({ grist }, data) => {
    return grist.call("GET", "/docs/{docId}/tables/{tableId}/records", data) as any
  },
})
