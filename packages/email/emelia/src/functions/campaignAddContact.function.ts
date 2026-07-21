import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignAddContactInput = z.object({
  campaignId: z.string(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const CampaignAddContactOutput = z.object({
  contactId: z.string().optional(),
})

export const campaignAddContact = pikkuSessionlessFunc({
  description: "Add a contact to a campaign",
  input: CampaignAddContactInput,
  output: CampaignAddContactOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/campaigns/{campaignId}/contacts", data) as any
  },
})
