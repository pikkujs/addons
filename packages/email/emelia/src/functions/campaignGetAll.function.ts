import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const CampaignGetAllOutput = z.object({
  campaigns: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
})

export const campaignGetAll = pikkuSessionlessFunc({
  description: "Get many campaigns",
  input: CampaignGetAllInput,
  output: CampaignGetAllOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("GET", "/campaigns", data) as any
  },
})
