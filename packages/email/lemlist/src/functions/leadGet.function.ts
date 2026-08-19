import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadGetInput = z.object({
  email: z.string(),
})

export const LeadGetOutput = z.record(z.string(), z.unknown())

export const leadGet = pikkuSessionlessFunc({
  description: "Get a specific lead by email",
  input: LeadGetInput,
  output: LeadGetOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/leads/{email}", data) as any
  },
})
