import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RecordPerformScriptInput = z.object({
  database: z.string(),
  layout: z.string(),
  scriptName: z.string(),
  "script.param": z.string().optional(),
})

export const RecordPerformScriptOutput = z.record(z.string(), z.unknown())

export const recordPerformScript = pikkuSessionlessFunc({
  description: "Perform a script",
  input: RecordPerformScriptInput,
  output: RecordPerformScriptOutput,
  func: async ({ filemaker }, data) => {
    return filemaker.call("GET", "/databases/{database}/layouts/{layout}/script/{scriptName}", data) as any
  },
})
