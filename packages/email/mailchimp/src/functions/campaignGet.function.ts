import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetInput = z.object({
  campaignId: z.string(),
})

export const CampaignGetOutput = z.record(z.string(), z.unknown())

export const campaignGet = pikkuSessionlessFunc({
  description: "Get a campaign",
  input: CampaignGetInput,
  output: CampaignGetOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("GET", "/campaigns/{campaignId}", data) as any
  },
})
