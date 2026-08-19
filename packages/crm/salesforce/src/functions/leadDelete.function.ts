import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadDeleteInput = z.object({
  id: z.string(),
})

export const LeadDeleteOutput = z.record(z.string(), z.unknown())

export const leadDelete = pikkuSessionlessFunc({
  description: "Delete Lead",
  input: LeadDeleteInput,
  output: LeadDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Lead/{id}", data) as any
  },
})
