import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetKudosInput = z.object({
  activityId: z.string(),
})

export const ActivityGetKudosOutput = z.record(z.string(), z.unknown())

export const activityGetKudos = pikkuSessionlessFunc({
  description: "Get all activity kudos",
  input: ActivityGetKudosInput,
  output: ActivityGetKudosOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities/{activityId}/kudos", data) as any
  },
})
