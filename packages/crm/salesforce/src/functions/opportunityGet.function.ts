import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityGetInput = z.object({
  id: z.string(),
})

export const OpportunityGetOutput = z.record(z.string(), z.unknown())

export const opportunityGet = pikkuSessionlessFunc({
  description: "Get Opportunity",
  input: OpportunityGetInput,
  output: OpportunityGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Opportunity/{id}", data) as any
  },
})
