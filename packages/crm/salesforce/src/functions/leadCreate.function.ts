import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadCreateInput = z.object({
  lastName: z.string().optional(),
  company: z.string().optional(),
})

export const LeadCreateOutput = z.object({
  id: z.string().optional(),
  success: z.boolean().optional(),
})

export const leadCreate = pikkuSessionlessFunc({
  description: "Create Lead",
  input: LeadCreateInput,
  output: LeadCreateOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Lead", data) as any
  },
})
