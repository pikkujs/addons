import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseCountInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const CaseCountOutput = z.record(z.string(), z.unknown())

export const caseCount = pikkuSessionlessFunc({
  description: "Count cases",
  input: CaseCountInput,
  output: CaseCountOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/count", data) as any
  },
})
