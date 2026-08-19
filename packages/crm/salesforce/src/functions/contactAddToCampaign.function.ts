import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactAddToCampaignInput = z.object({
  campaignId: z.string().optional(),
})

export const ContactAddToCampaignOutput = z.record(z.string(), z.unknown())

export const contactAddToCampaign = pikkuSessionlessFunc({
  description: "Add contact to campaign",
  input: ContactAddToCampaignInput,
  output: ContactAddToCampaignOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Contact/campaign-members", data) as any
  },
})
