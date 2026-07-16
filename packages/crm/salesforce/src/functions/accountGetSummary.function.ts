import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountGetSummaryOutput = z.record(z.string(), z.unknown())

export const accountGetSummary = pikkuSessionlessFunc({
  description: "Get Account summary",
  output: AccountGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Account/summary") as any
  },
})
