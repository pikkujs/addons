import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetInput = z.object({
  campaignId: z.string(),
})

export const CampaignGetOutput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
})

export const campaignGet = pikkuSessionlessFunc({
  description: "Get a campaign",
  input: CampaignGetInput,
  output: CampaignGetOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("GET", "/campaigns/{campaignId}", data) as any
  },
})
