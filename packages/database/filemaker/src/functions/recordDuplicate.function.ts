import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordDuplicateInput = z.object({
  database: z.string(),
  layout: z.string(),
  recordId: z.string(),
})

export const RecordDuplicateOutput = z.record(z.string(), z.unknown())

export const recordDuplicate = pikkuSessionlessFunc({
  description: "Duplicate a record",
  input: RecordDuplicateInput,
  output: RecordDuplicateOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("POST", "/databases/{database}/layouts/{layout}/records/{recordId}", data) as any
  },
})
