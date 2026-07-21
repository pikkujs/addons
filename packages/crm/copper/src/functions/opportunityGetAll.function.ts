import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OpportunityGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const OpportunityGetAllOutput = z.record(z.string(), z.unknown())

export const opportunityGetAll = pikkuSessionlessFunc({
  description: "List opportunities",
  input: OpportunityGetAllInput,
  output: OpportunityGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/opportunities/search", data) as any
  },
})
