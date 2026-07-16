import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityCreateInput = z.object({
  name: z.string().optional(),
  sport_type: z.string().optional(),
  start_date_local: z.string().optional(),
  elapsed_time: z.number().optional(),
  description: z.string().optional(),
  distance: z.number().optional(),
})

export const ActivityCreateOutput = z.record(z.string(), z.unknown())

export const activityCreate = pikkuSessionlessFunc({
  description: "Create a new activity",
  input: ActivityCreateInput,
  output: ActivityCreateOutput,
  func: async ({ strava }, data) => {
    return strava.call("POST", "/activities", data) as any
  },
})
