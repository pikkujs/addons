import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignCreateInput = z.object({
  name: z.string().optional(),
})

export const CampaignCreateOutput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
})

export const campaignCreate = pikkuSessionlessFunc({
  description: "Create a campaign",
  input: CampaignCreateInput,
  output: CampaignCreateOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("POST", "/campaigns", data) as any
  },
})
