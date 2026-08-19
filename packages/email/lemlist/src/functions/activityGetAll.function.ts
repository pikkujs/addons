import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetAllInput = z.object({
  limit: z.number().optional(),
  campaignId: z.string().optional(),
  type: z.string().optional(),
  leadId: z.string().optional(),
})

export const ActivityGetAllOutput = z.record(z.string(), z.unknown())

export const activityGetAll = pikkuSessionlessFunc({
  description: "Get many activities",
  input: ActivityGetAllInput,
  output: ActivityGetAllOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/activities", data) as any
  },
})
