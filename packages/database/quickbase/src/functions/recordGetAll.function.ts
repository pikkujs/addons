import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordGetAllInput = z.object({
  from: z.string().optional(),
})

export const RecordGetAllOutput = z.record(z.string(), z.unknown())

export const recordGetAll = pikkuSessionlessFunc({
  description: "Query records",
  input: RecordGetAllInput,
  output: RecordGetAllOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("POST", "/records/query", data) as any
  },
})
