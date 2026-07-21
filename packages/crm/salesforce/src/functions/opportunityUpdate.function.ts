import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  closeDate: z.string().optional(),
  stageName: z.string().optional(),
})

export const OpportunityUpdateOutput = z.record(z.string(), z.unknown())

export const opportunityUpdate = pikkuSessionlessFunc({
  description: "Update Opportunity",
  input: OpportunityUpdateInput,
  output: OpportunityUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Opportunity/{id}", data) as any
  },
})
