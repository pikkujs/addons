import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableExecuteAnalyzerInput = z.object({
  id: z.string(),
  analyzerId: z.string().optional(),
})

export const ObservableExecuteAnalyzerOutput = z.record(z.string(), z.unknown())

export const observableExecuteAnalyzer = pikkuSessionlessFunc({
  description: "Execute an analyzer on an observable",
  input: ObservableExecuteAnalyzerInput,
  output: ObservableExecuteAnalyzerOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/artifact/{id}/analyzer", data) as any
  },
})
