import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordUpsertInput = z.object({
  to: z.string().optional(),
  mergeFieldId: z.string().optional(),
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const RecordUpsertOutput = z.record(z.string(), z.unknown())

export const recordUpsert = pikkuSessionlessFunc({
  description: "Upsert records",
  input: RecordUpsertInput,
  output: RecordUpsertOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("PATCH", "/records", data) as any
  },
})
