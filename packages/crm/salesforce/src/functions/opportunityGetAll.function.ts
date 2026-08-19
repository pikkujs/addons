import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OpportunityGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const OpportunityGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const opportunityGetAll = pikkuSessionlessFunc({
  description: "Get many Opportunity",
  input: OpportunityGetAllInput,
  output: OpportunityGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Opportunity", data) as any
  },
})
