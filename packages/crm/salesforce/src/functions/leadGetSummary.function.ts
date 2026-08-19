import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadGetSummaryOutput = z.record(z.string(), z.unknown())

export const leadGetSummary = pikkuSessionlessFunc({
  description: "Get Lead summary",
  output: LeadGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Lead/summary") as any
  },
})
