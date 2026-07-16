import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableCountInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const ObservableCountOutput = z.record(z.string(), z.unknown())

export const observableCount = pikkuSessionlessFunc({
  description: "Count observables",
  input: ObservableCountInput,
  output: ObservableCountOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/observable/count", data) as any
  },
})
