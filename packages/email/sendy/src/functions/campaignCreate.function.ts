import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CampaignCreateInput = z.object({
  from_name: z.string().optional(),
  from_email: z.string().optional(),
  reply_to: z.string().optional(),
  title: z.string().optional(),
  subject: z.string().optional(),
  html_text: z.string().optional(),
  list_ids: z.string().optional(),
  brand_id: z.string().optional(),
})

export const CampaignCreateOutput = z.object({
  message: z.string().optional(),
})

export const campaignCreate = pikkuSessionlessFunc({
  description: "Create a campaign",
  input: CampaignCreateInput,
  output: CampaignCreateOutput,
  func: async ({ sendy }, data) => {
    return sendy.call("POST", "/api/campaigns/create.php", data) as any
  },
})
