import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityGetInput = z.object({
  activityId: z.string(),
})

export const ActivityGetOutput = z.record(z.string(), z.unknown())

export const activityGet = pikkuSessionlessFunc({
  description: "Get an activity",
  input: ActivityGetInput,
  output: ActivityGetOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities/{activityId}", data) as any
  },
})
