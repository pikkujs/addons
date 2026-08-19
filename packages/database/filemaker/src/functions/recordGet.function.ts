import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordGetInput = z.object({
  database: z.string(),
  layout: z.string(),
  recordId: z.string(),
})

export const RecordGetOutput = z.record(z.string(), z.unknown())

export const recordGet = pikkuSessionlessFunc({
  description: "Get a record by ID",
  input: RecordGetInput,
  output: RecordGetOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("GET", "/databases/{database}/layouts/{layout}/records/{recordId}", data) as any
  },
})
