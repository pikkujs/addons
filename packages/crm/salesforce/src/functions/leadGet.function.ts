import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadGetInput = z.object({
  id: z.string(),
})

export const LeadGetOutput = z.record(z.string(), z.unknown())

export const leadGet = pikkuSessionlessFunc({
  description: "Get Lead",
  input: LeadGetInput,
  output: LeadGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Lead/{id}", data) as any
  },
})
