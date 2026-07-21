import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetAllInput = z.object({
  limit: z.number().optional(),
})

export const CampaignGetAllOutput = z.record(z.string(), z.unknown())

export const campaignGetAll = pikkuSessionlessFunc({
  description: "Get many campaigns",
  input: CampaignGetAllInput,
  output: CampaignGetAllOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/campaigns", data) as any
  },
})
