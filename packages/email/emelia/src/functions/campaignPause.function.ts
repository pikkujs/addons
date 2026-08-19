import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignPauseInput = z.object({
  campaignId: z.string(),
})

export const CampaignPauseOutput = z.object({
  success: z.boolean().optional(),
})

export const campaignPause = pikkuSessionlessFunc({
  description: "Pause a campaign",
  input: CampaignPauseInput,
  output: CampaignPauseOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/campaigns/{campaignId}/pause", data) as any
  },
})
