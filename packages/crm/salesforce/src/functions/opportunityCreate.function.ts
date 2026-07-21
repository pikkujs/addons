import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityCreateInput = z.object({
  name: z.string().optional(),
  closeDate: z.string().optional(),
  stageName: z.string().optional(),
})

export const OpportunityCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const opportunityCreate = pikkuSessionlessFunc({
  description: "Create Opportunity",
  input: OpportunityCreateInput,
  output: OpportunityCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Opportunity", data) as any
  },
})
