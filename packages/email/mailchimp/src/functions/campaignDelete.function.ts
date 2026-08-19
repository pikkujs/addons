import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignDeleteInput = z.object({
  campaignId: z.string(),
})

export const CampaignDeleteOutput = z.record(z.string(), z.unknown())

export const campaignDelete = pikkuSessionlessFunc({
  description: "Delete a campaign",
  input: CampaignDeleteInput,
  output: CampaignDeleteOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("DELETE", "/campaigns/{campaignId}", data) as any
  },
})
