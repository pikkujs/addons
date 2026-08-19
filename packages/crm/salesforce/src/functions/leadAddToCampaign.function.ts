import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LeadAddToCampaignInput = z.object({
  campaignId: z.string().optional(),
})

export const LeadAddToCampaignOutput = z.record(z.string(), z.unknown())

export const leadAddToCampaign = pikkuSessionlessFunc({
  description: "Add lead to campaign",
  input: LeadAddToCampaignInput,
  output: LeadAddToCampaignOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Lead/campaign-members", data) as any
  },
})
