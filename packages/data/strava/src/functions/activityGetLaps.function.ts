import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityGetLapsInput = z.object({
  activityId: z.string(),
})

export const ActivityGetLapsOutput = z.record(z.string(), z.unknown())

export const activityGetLaps = pikkuSessionlessFunc({
  description: "Get all activity laps",
  input: ActivityGetLapsInput,
  output: ActivityGetLapsOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities/{activityId}/laps", data) as any
  },
})
