import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityGetSummaryOutput = z.record(z.string(), z.unknown())

export const opportunityGetSummary = pikkuSessionlessFunc({
  description: "Get Opportunity summary",
  output: OpportunityGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Opportunity/summary") as any
  },
})
