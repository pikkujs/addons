import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetSummaryOutput = z.record(z.string(), z.unknown())

export const contactGetSummary = pikkuSessionlessFunc({
  description: "Get Contact summary",
  output: ContactGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Contact/summary") as any
  },
})
