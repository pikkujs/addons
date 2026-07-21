import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignResendInput = z.object({
  campaignId: z.string(),
})

export const CampaignResendOutput = z.record(z.string(), z.unknown())

export const campaignResend = pikkuSessionlessFunc({
  description: "Resend a campaign to non-openers",
  input: CampaignResendInput,
  output: CampaignResendOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/campaigns/{campaignId}/actions/create-resend", data) as any
  },
})
