import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadGetInput = z.object({
  leadId: z.string(),
})

export const LeadGetOutput = z.record(z.string(), z.unknown())

export const leadGet = pikkuSessionlessFunc({
  description: "Get a lead",
  input: LeadGetInput,
  output: LeadGetOutput,
  func: async ({ copper }, data) => {
    return copper.call("GET", "/leads/{leadId}", data) as any
  },
})
