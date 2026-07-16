import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignSendInput = z.object({
  campaignId: z.string(),
})

export const CampaignSendOutput = z.record(z.string(), z.unknown())

export const campaignSend = pikkuSessionlessFunc({
  description: "Send a campaign",
  input: CampaignSendInput,
  output: CampaignSendOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/campaigns/{campaignId}/actions/send", data) as any
  },
})
