import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseGetSummaryOutput = z.record(z.string(), z.unknown())

export const caseGetSummary = pikkuSessionlessFunc({
  description: "Get Case summary",
  output: CaseGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Case/summary") as any
  },
})
