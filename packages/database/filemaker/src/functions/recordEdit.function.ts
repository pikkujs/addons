import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecordEditInput = z.object({
  database: z.string(),
  layout: z.string(),
  recordId: z.string(),
  fieldData: z.record(z.string(), z.unknown()).optional(),
  modId: z.number().optional(),
})

export const RecordEditOutput = z.record(z.string(), z.unknown())

export const recordEdit = pikkuSessionlessFunc({
  description: "Edit a record",
  input: RecordEditInput,
  output: RecordEditOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("PATCH", "/databases/{database}/layouts/{layout}/records/{recordId}", data) as any
  },
})
