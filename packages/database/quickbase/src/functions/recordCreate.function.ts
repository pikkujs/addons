import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordCreateInput = z.object({
  to: z.string().optional(),
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const RecordCreateOutput = z.record(z.string(), z.unknown())

export const recordCreate = pikkuSessionlessFunc({
  description: "Create records",
  input: RecordCreateInput,
  output: RecordCreateOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("POST", "/records", data) as any
  },
})
