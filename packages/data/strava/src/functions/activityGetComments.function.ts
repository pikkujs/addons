import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityGetCommentsInput = z.object({
  activityId: z.string(),
})

export const ActivityGetCommentsOutput = z.record(z.string(), z.unknown())

export const activityGetComments = pikkuSessionlessFunc({
  description: "Get all activity comments",
  input: ActivityGetCommentsInput,
  output: ActivityGetCommentsOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities/{activityId}/comments", data) as any
  },
})
