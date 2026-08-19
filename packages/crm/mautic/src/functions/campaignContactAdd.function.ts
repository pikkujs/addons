import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignContactAddInput = z.object({
  campaignId: z.string(),
  contactId: z.string(),
})

export const CampaignContactAddOutput = z.record(z.string(), z.unknown())

export const campaignContactAdd = pikkuSessionlessFunc({
  description: "Add a contact to a campaign",
  input: CampaignContactAddInput,
  output: CampaignContactAddOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/campaigns/{campaignId}/contact/{contactId}/add", data) as any
  },
})
