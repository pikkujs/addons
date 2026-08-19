import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AnalyzerExecuteInput = z.object({
  analyzerId: z.string(),
  dataType: z.string().optional(),
  data: z.string().optional(),
  tlp: z.number().optional(),
})

export const AnalyzerExecuteOutput = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
})

export const analyzerExecute = pikkuSessionlessFunc({
  description: "Run an analyzer on an observable",
  input: AnalyzerExecuteInput,
  output: AnalyzerExecuteOutput,
  func: async ({ cortex }, data) => {
    return cortex.call("POST", "/analyzer/{analyzerId}/run", data) as any
  },
})
