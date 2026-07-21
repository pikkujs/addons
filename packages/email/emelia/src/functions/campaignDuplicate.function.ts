import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignDuplicateInput = z.object({
  campaignId: z.string(),
  name: z.string().optional(),
  copyContacts: z.boolean().optional(),
  copyProvider: z.boolean().optional(),
  copyMails: z.boolean().optional(),
  copySettings: z.boolean().optional(),
})

export const CampaignDuplicateOutput = z.object({
  id: z.string().optional(),
})

export const campaignDuplicate = pikkuSessionlessFunc({
  description: "Duplicate a campaign",
  input: CampaignDuplicateInput,
  output: CampaignDuplicateOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/campaigns/{campaignId}/duplicate", data) as any
  },
})
