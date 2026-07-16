import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LeadCreateInput = z.object({
  name: z.string().optional(),
  details: z.string().optional(),
  title: z.string().optional(),
})

export const LeadCreateOutput = z.record(z.string(), z.unknown())

export const leadCreate = pikkuSessionlessFunc({
  description: "Create a lead",
  input: LeadCreateInput,
  output: LeadCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/leads", data) as any
  },
})
