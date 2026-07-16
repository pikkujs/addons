import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecordCreateInput = z.object({
  database: z.string(),
  layout: z.string(),
  fieldData: z.record(z.string(), z.unknown()).optional(),
})

export const RecordCreateOutput = z.record(z.string(), z.unknown())

export const recordCreate = pikkuSessionlessFunc({
  description: "Create a record",
  input: RecordCreateInput,
  output: RecordCreateOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("POST", "/databases/{database}/layouts/{layout}/records", data) as any
  },
})
