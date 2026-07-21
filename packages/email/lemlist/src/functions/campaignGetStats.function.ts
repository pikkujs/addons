import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CampaignGetStatsInput = z.object({
  campaignId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  timezone: z.string(),
})

export const CampaignGetStatsOutput = z.record(z.string(), z.unknown())

export const campaignGetStats = pikkuSessionlessFunc({
  description: "Get campaign stats",
  input: CampaignGetStatsInput,
  output: CampaignGetStatsOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/campaigns/{campaignId}/stats", data) as any
  },
})
