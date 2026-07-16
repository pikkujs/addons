import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecordDeleteInput = z.object({
  database: z.string(),
  layout: z.string(),
  recordId: z.string(),
})

export const RecordDeleteOutput = z.record(z.string(), z.unknown())

export const recordDelete = pikkuSessionlessFunc({
  description: "Delete a record",
  input: RecordDeleteInput,
  output: RecordDeleteOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("DELETE", "/databases/{database}/layouts/{layout}/records/{recordId}", data) as any
  },
})
