import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignReplicateInput = z.object({
  campaignId: z.string(),
})

export const CampaignReplicateOutput = z.record(z.string(), z.unknown())

export const campaignReplicate = pikkuSessionlessFunc({
  description: "Replicate a campaign",
  input: CampaignReplicateInput,
  output: CampaignReplicateOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/campaigns/{campaignId}/actions/replicate", data) as any
  },
})
