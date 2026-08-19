import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordUpdateInput = z.object({
  to: z.string().optional(),
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const RecordUpdateOutput = z.record(z.string(), z.unknown())

export const recordUpdate = pikkuSessionlessFunc({
  description: "Update records",
  input: RecordUpdateInput,
  output: RecordUpdateOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("PUT", "/records", data) as any
  },
})
