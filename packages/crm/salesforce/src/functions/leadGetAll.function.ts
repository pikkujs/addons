import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadGetAllInput = z.object({
  q: z.string().optional(),
  limit: z.number().int().optional(),
})

export const LeadGetAllOutput = z.object({
  totalSize: z.number().int().optional(),
  done: z.boolean().optional(),
})

export const leadGetAll = pikkuSessionlessFunc({
  description: "Get many Lead",
  input: LeadGetAllInput,
  output: LeadGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/query/Lead", data) as any
  },
})
