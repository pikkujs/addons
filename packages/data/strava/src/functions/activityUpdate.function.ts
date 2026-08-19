import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityUpdateInput = z.object({
  activityId: z.string(),
  name: z.string().optional(),
  sport_type: z.string().optional(),
  description: z.string().optional(),
  commute: z.boolean().optional(),
})

export const ActivityUpdateOutput = z.record(z.string(), z.unknown())

export const activityUpdate = pikkuSessionlessFunc({
  description: "Update an activity",
  input: ActivityUpdateInput,
  output: ActivityUpdateOutput,
  func: async ({ strava }, data) => {
    return strava.call("PUT", "/activities/{activityId}", data) as any
  },
})
