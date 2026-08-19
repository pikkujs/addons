import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecordFindInput = z.object({
  database: z.string(),
  layout: z.string(),
  query: z.array(z.record(z.string(), z.unknown())).optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export const RecordFindOutput = z.record(z.string(), z.unknown())

export const recordFind = pikkuSessionlessFunc({
  description: "Find records",
  input: RecordFindInput,
  output: RecordFindOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("POST", "/databases/{database}/layouts/{layout}/_find", data) as any
  },
})
