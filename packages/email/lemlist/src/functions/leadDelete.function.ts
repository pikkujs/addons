import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadDeleteInput = z.object({
  campaignId: z.string(),
  email: z.string(),
  action: z.string().optional(),
})

export const LeadDeleteOutput = z.record(z.string(), z.unknown())

export const leadDelete = pikkuSessionlessFunc({
  description: "Delete or unsubscribe a lead from a campaign",
  input: LeadDeleteInput,
  output: LeadDeleteOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("DELETE", "/campaigns/{campaignId}/leads/{email}", data) as any
  },
})
