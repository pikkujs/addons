import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadDeleteInput = z.object({
  leadId: z.string(),
})

export const LeadDeleteOutput = z.record(z.string(), z.unknown())

export const leadDelete = pikkuSessionlessFunc({
  description: "Delete a lead",
  input: LeadDeleteInput,
  output: LeadDeleteOutput,
  func: async ({ copper }, data) => {
    return copper.call("DELETE", "/leads/{leadId}", data) as any
  },
})
