import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityDeleteInput = z.object({
  id: z.string(),
})

export const OpportunityDeleteOutput = z.record(z.string(), z.unknown())

export const opportunityDelete = pikkuSessionlessFunc({
  description: "Delete Opportunity",
  input: OpportunityDeleteInput,
  output: OpportunityDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Opportunity/{id}", data) as any
  },
})
