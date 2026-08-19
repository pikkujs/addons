import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const LeadGetAllOutput = z.record(z.string(), z.unknown())

export const leadGetAll = pikkuSessionlessFunc({
  description: "List leads",
  input: LeadGetAllInput,
  output: LeadGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/leads/search", data) as any
  },
})
