import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecordListInput = z.object({
  database: z.string(),
  layout: z.string(),
  _offset: z.number().optional(),
  _limit: z.number().optional(),
})

export const RecordListOutput = z.record(z.string(), z.unknown())

export const recordList = pikkuSessionlessFunc({
  description: "Get records from a layout",
  input: RecordListInput,
  output: RecordListOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("GET", "/databases/{database}/layouts/{layout}/records", data) as any
  },
})
