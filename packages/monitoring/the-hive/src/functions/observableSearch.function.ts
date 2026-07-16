import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ObservableSearchInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const ObservableSearchOutput = z.record(z.string(), z.unknown())

export const observableSearch = pikkuSessionlessFunc({
  description: "Search observables",
  input: ObservableSearchInput,
  output: ObservableSearchOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/artifact/_search", data) as any
  },
})
