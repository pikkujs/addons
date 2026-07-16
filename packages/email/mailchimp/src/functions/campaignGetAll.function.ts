import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetAllInput = z.object({
  count: z.number().int().optional(),
  offset: z.number().int().optional(),
  status: z.string().optional(),
  list_id: z.string().optional(),
})

export const CampaignGetAllOutput = z.record(z.string(), z.unknown())

export const campaignGetAll = pikkuSessionlessFunc({
  description: "Get many campaigns",
  input: CampaignGetAllInput,
  output: CampaignGetAllOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("GET", "/campaigns", data) as any
  },
})
