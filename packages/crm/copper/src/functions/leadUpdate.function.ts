import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadUpdateInput = z.object({
  leadId: z.string(),
  name: z.string().optional(),
  details: z.string().optional(),
  title: z.string().optional(),
})

export const LeadUpdateOutput = z.record(z.string(), z.unknown())

export const leadUpdate = pikkuSessionlessFunc({
  description: "Update a lead",
  input: LeadUpdateInput,
  output: LeadUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/leads/{leadId}", data) as any
  },
})
