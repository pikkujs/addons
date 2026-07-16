import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignContactRemoveInput = z.object({
  campaignId: z.string(),
  contactId: z.string(),
})

export const CampaignContactRemoveOutput = z.record(z.string(), z.unknown())

export const campaignContactRemove = pikkuSessionlessFunc({
  description: "Remove a contact from a campaign",
  input: CampaignContactRemoveInput,
  output: CampaignContactRemoveOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/campaigns/{campaignId}/contact/{contactId}/remove", data) as any
  },
})
