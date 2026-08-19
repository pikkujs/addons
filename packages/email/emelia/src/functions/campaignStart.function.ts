import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignStartInput = z.object({
  campaignId: z.string(),
})

export const CampaignStartOutput = z.object({
  success: z.boolean().optional(),
})

export const campaignStart = pikkuSessionlessFunc({
  description: "Start a campaign",
  input: CampaignStartInput,
  output: CampaignStartOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/campaigns/{campaignId}/start", data) as any
  },
})
