import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordDeleteInput = z.object({
  from: z.string().optional(),
  where: z.string().optional(),
})

export const RecordDeleteOutput = z.record(z.string(), z.unknown())

export const recordDelete = pikkuSessionlessFunc({
  description: "Delete records",
  input: RecordDeleteInput,
  output: RecordDeleteOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("DELETE", "/records", data) as any
  },
})
