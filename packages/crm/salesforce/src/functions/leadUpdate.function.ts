import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadUpdateInput = z.object({
  id: z.string(),
  lastName: z.string().optional(),
  company: z.string().optional(),
})

export const LeadUpdateOutput = z.record(z.string(), z.unknown())

export const leadUpdate = pikkuSessionlessFunc({
  description: "Update Lead",
  input: LeadUpdateInput,
  output: LeadUpdateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("PATCH", "/sobjects/Lead/{id}", data) as any
  },
})
